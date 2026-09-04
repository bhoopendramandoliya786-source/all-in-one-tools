import React, { useState } from 'react';
import { Calculator, Check, Copy, Download } from 'lucide-react';
import type { Tool } from '@/data/tools';
import {
  calculateCAGR,
  calculateHRA,
  calculateLumpsum,
  calculatePPF,
  calculateSIP,
  calculateStockAverage,
  formatNumber,
} from '@/lib/tool-engine';

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
      />
    </label>
  );
}

function ResultBox({
  result,
  onCopy,
  onDownload,
}: {
  result: string;
  onCopy: () => void;
  onDownload: () => void;
}) {
  return (
    <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/[.06] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-primary">
          <Check size={14} /> Result Summary
        </span>
        <div className="flex gap-1">
          <button
            title="Copy result"
            onClick={onCopy}
            className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"
          >
            <Copy size={15} />
          </button>
          <button
            title="Download result"
            onClick={onDownload}
            className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"
          >
            <Download size={15} />
          </button>
        </div>
      </div>
      <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-words font-mono-app text-sm leading-6">
        {result}
      </pre>
    </div>
  );
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function FinancialTool({ tool }: { tool: Tool }) {
  const [values, setValues] = useState<Record<string, string>>({ a: '', b: '', c: '', d: '' });
  const [isMetro, setIsMetro] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const update = (key: string) => (value: string) =>
    setValues((old) => ({ ...old, [key]: value }));

  const calc = () => {
    const a = Number(values.a),
      b = Number(values.b),
      c = Number(values.c),
      d = Number(values.d);
    setError('');

    // 1. SIP Calculator
    if (tool.slug === 'sip-calculator') {
      if (!a || !b || !c) {
        setError('Please enter monthly investment, expected return rate, and time period.');
        return;
      }
      const res = calculateSIP(a, b, c);
      setResult(
        `Total Invested Amount: ₹${formatNumber(res.invested)}\nEstimated Wealth Gained: ₹${formatNumber(
          res.returns
        )}\nTotal Maturity Value: ₹${formatNumber(res.total)}`
      );
      return;
    }

    // 2. Lumpsum Calculator
    if (tool.slug === 'lumpsum-calculator') {
      if (!a || !b || !c) {
        setError('Enter total investment, expected return rate, and years.');
        return;
      }
      const res = calculateLumpsum(a, b, c);
      setResult(
        `Invested Amount: ₹${formatNumber(res.invested)}\nEstimated Wealth Gained: ₹${formatNumber(
          res.returns
        )}\nTotal Future Value: ₹${formatNumber(res.total)}`
      );
      return;
    }

    // 3. PPF Calculator
    if (tool.slug === 'ppf-calculator') {
      if (!a) {
        setError('Enter annual investment amount.');
        return;
      }
      const res = calculatePPF(a, b || 7.1, c || 15);
      setResult(
        `Total Investment (15 Yrs): ₹${formatNumber(res.invested)}\nTotal Interest Earned: ₹${formatNumber(
          res.returns
        )}\nMaturity Amount: ₹${formatNumber(res.total)}`
      );
      return;
    }

    // 4. Stock Average Calculator
    if (tool.slug === 'stock-average-calculator') {
      if (!a || !b || !c || !d) {
        setError('Enter quantity and price for both 1st and 2nd buy.');
        return;
      }
      const res = calculateStockAverage(a, b, c, d);
      setResult(
        `Total Shares Held: ${res.totalQty}\nTotal Money Invested: ₹${formatNumber(
          res.totalCost
        )}\nNew Average Buying Price: ₹${res.avgPrice} per share`
      );
      return;
    }

    // 5. HRA Exemption Calculator
    if (tool.slug === 'hra-calculator') {
      if (!a || !b || !c) {
        setError('Enter basic monthly salary, HRA received, and rent paid.');
        return;
      }
      const res = calculateHRA(a, 0, b, c, isMetro);
      setResult(
        `Exempt HRA (Tax-Free): ₹${formatNumber(res.exemptHRA)}\nTaxable HRA: ₹${formatNumber(
          res.taxableHRA
        )}`
      );
      return;
    }

    // 6. Fuel Cost & Mileage Calculator
    if (tool.slug === 'fuel-cost-calculator') {
      if (!a || !b || !c) {
        setError('Enter total distance (km), vehicle mileage (km/l), and fuel price.');
        return;
      }
      const litersNeeded = a / b;
      const totalCost = litersNeeded * c;
      const perPerson = d > 0 ? totalCost / d : totalCost;
      setResult(
        `Total Fuel Required: ${litersNeeded.toFixed(1)} Liters\nTotal Fuel Expense: ₹${formatNumber(
          Math.round(totalCost)
        )}${
          d > 0
            ? `\nCost per person (${d} people): ₹${formatNumber(Math.round(perPerson))}`
            : ''
        }`
      );
      return;
    }

    // 7. Salary In-Hand Calculator
    if (tool.slug === 'salary-calculator') {
      if (!a) {
        setError('Enter your monthly CTC or Gross Salary.');
        return;
      }
      const pf = Math.min(1800, a * 0.12);
      const profTax = 200;
      const inHand = a - pf - profTax;
      setResult(
        `Gross Monthly Salary: ₹${formatNumber(a)}\nEstimated EPF Deduction: ₹${formatNumber(
          Math.round(pf)
        )}\nProfessional Tax: ₹${profTax}\nApprox. In-Hand Monthly Pay: ₹${formatNumber(
          Math.round(inHand)
        )}`
      );
      return;
    }

    // 8. CAGR Calculator
    if (tool.slug === 'cagr-calculator') {
      if (!a || !b || !c) {
        setError('Enter initial value, final value, and years.');
        return;
      }
      const cagr = calculateCAGR(a, b, c);
      setResult(`Compound Annual Growth Rate (CAGR): ${cagr}% per year`);
      return;
    }

    // 9. Calorie / TDEE Calculator
    if (tool.slug === 'calorie-calculator') {
      if (!a || !b || !c) {
        setError('Enter weight (kg), height (cm), and age.');
        return;
      }
      const bmr = 10 * a + 6.25 * b - 5 * c + 5;
      setResult(
        `Daily Maintenance (TDEE): ~${Math.round(
          bmr * 1.375
        )} kcal\nWeight Loss Goal: ~${Math.round(
          bmr * 1.375 - 400
        )} kcal/day\nWeight Gain Goal: ~${Math.round(bmr * 1.375 + 400)} kcal/day`
      );
      return;
    }

    // 10. Water Intake Calculator
    if (tool.slug === 'water-intake-calculator') {
      if (!a) {
        setError('Enter body weight in kg.');
        return;
      }
      const waterLiters = (a * 0.033).toFixed(1);
      setResult(
        `Recommended Daily Water Intake: ${waterLiters} Liters (~${Math.round(
          Number(waterLiters) * 4
        )} glasses)`
      );
      return;
    }

    // 11. Tip & Bill Splitter
    if (tool.slug === 'tip-calculator') {
      if (!a) {
        setError('Enter bill amount.');
        return;
      }
      const tipAmount = a * ((b || 10) / 100);
      const total = a + tipAmount;
      const split = c > 0 ? total / c : total;
      setResult(
        `Tip Amount: ₹${formatNumber(tipAmount)}\nTotal Bill: ₹${formatNumber(total)}${
          c > 0 ? `\nPer Person (${c} people): ₹${formatNumber(Math.round(split))}` : ''
        }`
      );
      return;
    }

    // 12. FD Calculator
    if (tool.slug === 'fd-calculator') {
      const total = a * (1 + b / 400) ** (4 * c);
      setResult(
        `Total Maturity Amount: ₹${formatNumber(Math.round(total))}\nInterest Earned: ₹${formatNumber(
          Math.round(total - a)
        )}`
      );
      return;
    }

    // 13. RD Calculator
    if (tool.slug === 'rd-calculator') {
      const n = c * 12;
      const totalDeposit = a * n;
      const r = b / 100;
      const interest = a * ((n * (n + 1)) / 24) * r;
      setResult(
        `Total Deposited: ₹${formatNumber(totalDeposit)}\nTotal Interest: ₹${formatNumber(
          Math.round(interest)
        )}\nMaturity Value: ₹${formatNumber(Math.round(totalDeposit + interest))}`
      );
      return;
    }

    // 14. Inflation Calculator
    if (tool.slug === 'inflation-calculator') {
      const future = a * (1 + (b || 6) / 100) ** c;
      setResult(
        `Purchasing Cost in ${c} Years: ₹${formatNumber(
          Math.round(future)
        )}\nPrice Increase: ₹${formatNumber(Math.round(future - a))}`
      );
      return;
    }

    // 15. Dividend Yield Calculator
    if (tool.slug === 'dividend-yield-calculator') {
      if (!a || !b) {
        setError('Enter annual dividend per share and current share price.');
        return;
      }
      const yieldPct = (a / b) * 100;
      setResult(`Dividend Yield: ${yieldPct.toFixed(2)}% per year`);
      return;
    }
  };

  return (
    <div className="max-w-2xl">
      {tool.slug === 'sip-calculator' ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Monthly Investment (₹)"
            value={values.a}
            onChange={update('a')}
            type="number"
            placeholder="5000"
          />
          <Field
            label="Expected Return Rate (%)"
            value={values.b}
            onChange={update('b')}
            type="number"
            placeholder="12"
          />
          <Field
            label="Time Period (Years)"
            value={values.c}
            onChange={update('c')}
            type="number"
            placeholder="10"
          />
        </div>
      ) : tool.slug === 'stock-average-calculator' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 rounded-xl border p-3">
            <p className="col-span-2 text-xs font-bold text-primary">First Purchase</p>
            <Field
              label="Quantity"
              value={values.a}
              onChange={update('a')}
              type="number"
              placeholder="100"
            />
            <Field
              label="Buy Price (₹)"
              value={values.b}
              onChange={update('b')}
              type="number"
              placeholder="250"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 rounded-xl border p-3">
            <p className="col-span-2 text-xs font-bold text-accent">
              Second Purchase (Dip Buy)
            </p>
            <Field
              label="Quantity"
              value={values.c}
              onChange={update('c')}
              type="number"
              placeholder="100"
            />
            <Field
              label="Buy Price (₹)"
              value={values.d}
              onChange={update('d')}
              type="number"
              placeholder="200"
            />
          </div>
        </div>
      ) : tool.slug === 'hra-calculator' ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field
              label="Monthly Basic Pay (₹)"
              value={values.a}
              onChange={update('a')}
              type="number"
              placeholder="40000"
            />
            <Field
              label="Monthly HRA Received (₹)"
              value={values.b}
              onChange={update('b')}
              type="number"
              placeholder="15000"
            />
            <Field
              label="Monthly Rent Paid (₹)"
              value={values.c}
              onChange={update('c')}
              type="number"
              placeholder="18000"
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={isMetro}
              onChange={(e) => setIsMetro(e.target.checked)}
            />
            Living in Metro City (Delhi, Mumbai, Kolkata, Chennai)
          </label>
        </div>
      ) : tool.slug === 'fuel-cost-calculator' ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Total Distance (in KM)"
            value={values.a}
            onChange={update('a')}
            type="number"
            placeholder="350"
          />
          <Field
            label="Vehicle Mileage (KM / Liter)"
            value={values.b}
            onChange={update('b')}
            type="number"
            placeholder="16"
          />
          <Field
            label="Fuel Price per Liter (₹)"
            value={values.c}
            onChange={update('c')}
            type="number"
            placeholder="96"
          />
          <Field
            label="Split Between Passengers (Optional)"
            value={values.d}
            onChange={update('d')}
            type="number"
            placeholder="4"
          />
        </div>
      ) : tool.slug === 'cagr-calculator' ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Initial Investment (₹)"
            value={values.a}
            onChange={update('a')}
            type="number"
            placeholder="100000"
          />
          <Field
            label="Final Value (₹)"
            value={values.b}
            onChange={update('b')}
            type="number"
            placeholder="250000"
          />
          <Field
            label="Years"
            value={values.c}
            onChange={update('c')}
            type="number"
            placeholder="5"
          />
        </div>
      ) : tool.slug === 'dividend-yield-calculator' ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Annual Dividend Per Share (₹)"
            value={values.a}
            onChange={update('a')}
            type="number"
            placeholder="10"
          />
          <Field
            label="Current Share Price (₹)"
            value={values.b}
            onChange={update('b')}
            type="number"
            placeholder="200"
          />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {tool.slug === 'calorie-calculator' ? (
            <>
              <Field
                label="Weight (kg)"
                value={values.a}
                onChange={update('a')}
                type="number"
                placeholder="70"
              />
              <Field
                label="Height (cm)"
                value={values.b}
                onChange={update('b')}
                type="number"
                placeholder="175"
              />
              <Field
                label="Age (Years)"
                value={values.c}
                onChange={update('c')}
                type="number"
                placeholder="25"
              />
            </>
          ) : tool.slug === 'water-intake-calculator' ? (
            <Field
              label="Body Weight (kg)"
              value={values.a}
              onChange={update('a')}
              type="number"
              placeholder="65"
            />
          ) : tool.slug === 'tip-calculator' ? (
            <>
              <Field
                label="Bill Amount (₹)"
                value={values.a}
                onChange={update('a')}
                type="number"
                placeholder="1500"
              />
              <Field
                label="Tip Percentage (%)"
                value={values.b}
                onChange={update('b')}
                type="number"
                placeholder="10"
              />
              <Field
                label="Number of People"
                value={values.c}
                onChange={update('c')}
                type="number"
                placeholder="3"
              />
            </>
          ) : tool.slug === 'salary-calculator' ? (
            <Field
              label="Gross Monthly CTC / Salary (₹)"
              value={values.a}
              onChange={update('a')}
              type="number"
              placeholder="50000"
            />
          ) : (
            <>
              <Field
                label="Principal / Monthly Deposit (₹)"
                value={values.a}
                onChange={update('a')}
                type="number"
                placeholder="10000"
              />
              <Field
                label="Annual Interest Rate (%)"
                value={values.b}
                onChange={update('b')}
                type="number"
                placeholder="7.5"
              />
              <Field
                label="Time Period (Years)"
                value={values.c}
                onChange={update('c')}
                type="number"
                placeholder="5"
              />
            </>
          )}
        </div>
      )}

      <div className="mt-5 flex gap-2">
        <button
          onClick={calc}
          className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground flex items-center gap-2"
        >
          <Calculator size={16} /> Calculate
        </button>
        <button
          onClick={() => {
            setValues({ a: '', b: '', c: '', d: '' });
            setResult('');
            setError('');
          }}
          className="rounded-xl border px-4 py-3 text-sm font-bold text-muted-foreground"
        >
          Reset
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {result && (
        <ResultBox
          result={result}
          onCopy={() => navigator.clipboard?.writeText(result)}
          onDownload={() => downloadText(`${tool.slug}.txt`, result)}
        />
      )}
    </div>
  );
}
