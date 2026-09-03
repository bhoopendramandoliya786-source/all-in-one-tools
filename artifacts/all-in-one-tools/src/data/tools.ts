export type Category = 'PDF Tools' | 'Image Tools' | 'Text Tools' | 'Calculators' | 'Generators & Developer Utilities' | 'Converters & Other Utilities';

export type Tool = {
  slug: string;
  name: string;
  category: Category;
  description: string;
  icon: string;
  popular?: boolean;
};

export const categoryInfo: Record<Category, { label: string; short: string; icon: string; color: string }> = {
  'PDF Tools': { label: 'PDF Tools', short: 'Tidy, join and reshape documents in a few clicks.', icon: 'FileText', color: '#e87959' },
  'Image Tools': { label: 'Image Tools', short: 'Quick edits that happen right in your browser.', icon: 'Image', color: '#3d9c7d' },
  'Text Tools': { label: 'Text Tools', short: 'Make words cleaner, clearer and ready to use.', icon: 'Type', color: '#cf9a3d' },
  Calculators: { label: 'Calculators', short: 'Answers for everyday decisions, without the spreadsheet.', icon: 'Calculator', color: '#8d6aaf' },
  'Generators & Developer Utilities': { label: 'Dev Utilities', short: 'Small, dependable helpers for building and shipping.', icon: 'Terminal', color: '#397ba7' },
  'Converters & Other Utilities': { label: 'Converters', short: 'Translate formats and values with no upload.', icon: 'ArrowLeftRight', color: '#bc6657' },
};

const make = (category: Category, icon: string, entries: [string, string, string, boolean?][]): Tool[] =>
  entries.map(([slug, name, description, popular]) => ({ slug, name, description, category, icon, popular }));

export const tools: Tool[] = [
  ...make('PDF Tools', 'FileText', [
    ['pdf-merge', 'Merge PDF', 'Join multiple PDFs into one clean document.', true],
    ['pdf-split', 'Split PDF', 'Break a PDF into smaller files by page.', true],
    ['pdf-compress', 'Compress PDF', 'Make a PDF lighter for sharing and storage.', true],
    ['pdf-to-images', 'PDF to Images', 'Turn every page into a downloadable image.'],
    ['images-to-pdf', 'Images to PDF', 'Bundle images into a tidy PDF.'],
    ['pdf-rotate', 'Rotate PDF', 'Rotate pages to the right orientation.'],
    ['pdf-delete-pages', 'Delete PDF Pages', 'Remove pages you do not need.'],
    ['pdf-extract-pages', 'Extract PDF Pages', 'Save selected pages as a new PDF.'],
    ['pdf-watermark', 'Watermark PDF', 'Stamp a light text watermark on your document.'],
    ['pdf-metadata-remover', 'Remove PDF Metadata', 'Strip hidden document details before sharing.'],
  ]),
  ...make('Image Tools', 'Image', [
    ['image-resize', 'Resize Image', 'Set exact dimensions without leaving your browser.', true],
    ['image-compress', 'Compress Image', 'Reduce file size while keeping it looking sharp.', true],
    ['jpg-to-png', 'JPG to PNG', 'Convert JPG photos to transparent-friendly PNGs.'],
    ['png-to-jpg', 'PNG to JPG', 'Make PNGs lighter as universally supported JPGs.'],
    ['webp-converter', 'WebP Converter', 'Convert images to the fast WebP format.'],
    ['image-crop', 'Crop Image', 'Frame the part of an image that matters.'],
    ['image-rotate', 'Rotate Image', 'Turn an image by 90 degrees at a time.'],
    ['image-flip', 'Flip Image', 'Mirror an image horizontally or vertically.'],
    ['image-grayscale', 'Grayscale Image', 'Give an image a calm monochrome treatment.'],
    ['image-blur', 'Blur Image', 'Soften an image with a controlled blur.'],
    ['image-sharpen', 'Sharpen Image', 'Bring a little more definition to soft images.'],
    ['image-brightness', 'Adjust Brightness', 'Lighten or darken an image precisely.'],
    ['image-contrast', 'Adjust Contrast', 'Add or reduce separation between tones.'],
    ['image-watermark', 'Watermark Image', 'Add a subtle text mark to your image.'],
    ['favicon-generator', 'Favicon Generator', 'Create a ready-to-use favicon from an image.'],
  ]),
  ...make('Text Tools', 'Type', [
    ['word-counter', 'Word Counter', 'Count words, sentences and reading time instantly.', true],
    ['character-counter', 'Character Counter', 'Keep an eye on characters, with or without spaces.'],
    ['case-converter', 'Case Converter', 'Switch text between useful writing cases.'],
    ['remove-extra-spaces', 'Remove Extra Spaces', 'Turn messy spacing into clean, readable text.'],
    ['text-sorter', 'Text Sorter', 'Sort lines alphabetically or by length.'],
    ['duplicate-line-remover', 'Duplicate Line Remover', 'Keep only the first version of each line.'],
    ['text-reverser', 'Text Reverser', 'Reverse characters or the order of lines.'],
    ['text-cleaner', 'Text Cleaner', 'Remove invisible characters and tidy punctuation.'],
    ['slug-generator', 'Slug Generator', 'Create URL-friendly slugs from titles.'],
    ['lorem-ipsum-generator', 'Lorem Ipsum Generator', 'Generate placeholder copy in a chosen length.'],
  ]),
  ...make('Calculators', 'Calculator', [
    ['percentage-calculator', 'Percentage Calculator', 'Find percentages, increases and decreases.', true],
    ['age-calculator', 'Age Calculator', 'Calculate an exact age from two dates.'],
    ['bmi-calculator', 'BMI Calculator', 'Estimate body mass index from height and weight.'],
    ['discount-calculator', 'Discount Calculator', 'See sale prices and how much you save.'],
    ['gst-calculator', 'GST Calculator', 'Add or remove GST from a price.'],
    ['profit-loss-calculator', 'Profit & Loss', 'Understand margins from cost and sale prices.'],
    ['emi-calculator', 'EMI Calculator', 'Estimate monthly loan repayments.'],
    ['simple-interest-calculator', 'Simple Interest', 'Calculate interest on a principal amount.'],
    ['compound-interest-calculator', 'Compound Interest', 'See how money grows over time.'],
    ['date-difference-calculator', 'Date Difference', 'Count the days between two dates.'],
    ['time-calculator', 'Time Calculator', 'Add or subtract hours and minutes.'],
    ['average-calculator', 'Average Calculator', 'Find the mean of a list of numbers.'],
    ['ratio-calculator', 'Ratio Calculator', 'Scale and simplify ratios.'],
    ['fraction-calculator', 'Fraction Calculator', 'Add, subtract, multiply or divide fractions.'],
    ['unit-converter', 'Unit Converter', 'Convert common length, weight and temperature units.'],
  ]),
  ...make('Generators & Developer Utilities', 'Terminal', [
    ['qr-code-generator', 'QR Code Generator', 'Create a scannable QR from any short text or link.', true],
    ['barcode-generator', 'Barcode Generator', 'Create a simple Code 128 barcode.'],
    ['password-generator', 'Password Generator', 'Make strong random passwords locally.', true],
    ['uuid-generator', 'UUID Generator', 'Generate collision-resistant IDs for projects.'],
    ['random-number-generator', 'Random Number', 'Pick a genuinely random number in a range.'],
    ['color-picker', 'Color Picker', 'Choose a color and copy its useful formats.'],
    ['hex-to-rgb-converter', 'HEX to RGB', 'Translate color values between formats.'],
    ['timestamp-converter', 'Timestamp Converter', 'Move between Unix timestamps and dates.'],
    ['json-formatter', 'JSON Formatter', 'Validate and beautify JSON for humans.'],
    ['json-minifier', 'JSON Minifier', 'Shrink JSON for transport or storage.'],
  ]),
  ...make('Converters & Other Utilities', 'ArrowLeftRight', [
    ['number-to-words', 'Number to Words', 'Write a number out in plain English.'],
    ['text-encrypt-decrypt', 'Text Encrypt / Decrypt', 'Protect a note with a browser-local passphrase.'],
    ['base64-encoder-decoder', 'Base64 Encoder / Decoder', 'Encode or decode text safely.'],
    ['url-encoder-decoder', 'URL Encoder / Decoder', 'Make URL values safe, or read them back.'],
    ['html-formatter', 'HTML Formatter', 'Indent and clean up HTML markup.'],
    ['css-formatter', 'CSS Formatter', 'Make CSS easier to scan and edit.'],
    ['javascript-formatter', 'JavaScript Formatter', 'Add sensible indentation to JavaScript.'],
    ['xml-formatter', 'XML Formatter', 'Pretty-print XML with readable nesting.'],
    ['yaml-formatter', 'YAML Formatter', 'Tidy YAML indentation without a server.'],
  ]),
];

export const toolBySlug = Object.fromEntries(tools.map((tool) => [tool.slug, tool])) as Record<string, Tool>;
export const categories = Object.keys(categoryInfo) as Category[];