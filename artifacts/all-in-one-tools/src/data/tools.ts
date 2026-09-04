export type Category =
  | 'PDF Tools'
  | 'Image Tools'
  | 'Text Tools'
  | 'Calculators'
  | 'Generators & Developer Utilities'
  | 'Converters & Other Utilities';

export type Tool = {
  slug: string;
  name: string;
  category: Category;
  description: string;
  icon: string;
  popular?: boolean;
  keywords: string[];
};

export const categoryInfo: Record<
  Category,
  { label: string; short: string; icon: string; color: string }
> = {
  'PDF Tools': {
    label: 'PDF Tools',
    short: 'Tidy, join, lock and reshape documents in a few clicks.',
    icon: 'FileText',
    color: '#e87959',
  },
  'Image Tools': {
    label: 'Image Tools',
    short: 'Quick edits, passport resizing and compression in browser.',
    icon: 'Image',
    color: '#3d9c7d',
  },
  'Text Tools': {
    label: 'Text Tools',
    short: 'Make words cleaner, clearer, sorted and ready to use.',
    icon: 'Type',
    color: '#cf9a3d',
  },
  Calculators: {
    label: 'Calculators',
    short: 'Answers for everyday decisions, wealth, loans and health.',
    icon: 'Calculator',
    color: '#8d6aaf',
  },
  'Generators & Developer Utilities': {
    label: 'Dev Utilities',
    short: 'Small, dependable helpers for building, coding and testing.',
    icon: 'Terminal',
    color: '#397ba7',
  },
  'Converters & Other Utilities': {
    label: 'Converters',
    short: 'Translate formats, encoding and values with no server upload.',
    icon: 'ArrowLeftRight',
    color: '#bc6657',
  },
};

const make = (
  category: Category,
  icon: string,
  entries: [string, string, string, string[], boolean?][]
): Tool[] =>
  entries.map(([slug, name, description, keywords, popular]) => ({
    slug,
    name,
    description,
    category,
    icon,
    popular,
    keywords,
  }));

export const tools: Tool[] = [
  // ==========================================
  // 1. PDF TOOLS (25 Tools)
  // ==========================================
  ...make('PDF Tools', 'FileText', [
    ['pdf-merge', 'Merge PDF', 'Join multiple PDFs into one clean document.', ['combine pdf', 'pdf jodna', 'join pdf files', 'do pdf ek karna'], true],
    ['pdf-split', 'Split PDF', 'Break a PDF into smaller files by page range.', ['separate pdf', 'pdf alag karna', 'page splitter', 'tukde karna'], true],
    ['pdf-compress', 'Compress PDF', 'Make a PDF lighter for sharing and uploads.', ['reduce pdf size', 'pdf chhoti karna', 'under 100kb', 'size kam karna'], true],
    ['pdf-to-images', 'PDF to Images', 'Turn every page into a downloadable JPG or PNG image.', ['pdf se photo', 'convert pdf to jpg', 'pdf to picture']],
    ['images-to-pdf', 'Images to PDF', 'Bundle JPG/PNG images into a single tidy PDF.', ['photo se pdf', 'jpg to pdf', 'image combine pdf', 'photo jodna']],
    ['pdf-rotate', 'Rotate PDF', 'Rotate pages by 90 or 180 degrees permanently.', ['turn pdf', 'sidha karna', 'rotate pdf']],
    ['pdf-delete-pages', 'Delete PDF Pages', 'Remove unwanted pages from your document.', ['remove page', 'pdf se page hatana', 'page delete']],
    ['pdf-extract-pages', 'Extract Pages', 'Save selected specific pages as a new PDF.', ['save single page', 'pdf page nikalna', 'extract pdf']],
    ['pdf-watermark', 'Watermark PDF', 'Stamp light text or brand marks across your document.', ['pdf stamp', 'watermark lagana', 'naam likhna']],
    ['pdf-metadata-remover', 'Remove Metadata', 'Strip hidden document author and date details.', ['clean pdf', 'clear pdf info', 'privacy protection']],
    ['protect-pdf', 'Protect PDF', 'Encrypt your PDF with a secure password lock.', ['pdf par password', 'pdf me lock lagana', 'secure pdf', 'pdf password maker'], true],
    ['unlock-pdf', 'Unlock PDF', 'Remove password and protection from your PDF.', ['pdf ka lock todna', 'password hatana', 'decrypt pdf', 'open locked pdf'], true],
    ['pdf-page-number', 'Add Page Numbers', 'Add customizable numbering (1, 2, 3) to every page.', ['page number dalna', 'numbering', 'pdf pagination']],
    ['pdf-grayscale', 'Grayscale PDF', 'Convert color PDFs to clean black and white.', ['black and white pdf', 'bw pdf', 'ink saver print']],
    ['pdf-crop', 'Crop PDF', 'Trim margins and unwanted borders from PDF pages.', ['crop pages', 'pdf margin katna', 'trim pdf']],
    ['pdf-nup', 'PDF 2-in-1 / 4-in-1', 'Print multiple pages on a single sheet of paper.', ['multiple pages per sheet', 'notes print 2 in 1']],
    ['pdf-header-footer', 'Add Header & Footer', 'Add page titles, dates or notes to top and bottom.', ['header footer lagana', 'document styling']],
    ['pdf-reverse-pages', 'Reverse PDF Pages', 'Invert page order from last page to first.', ['ulta karna', 'reverse order', 'last to first']],
    ['extract-pdf-images', 'Extract Embedded Images', 'Pull all embedded photos out of a PDF document.', ['pdf ki photo nikalna', 'extract pictures']],
    ['pdf-text-extract', 'Extract Text from PDF', 'Copy raw text content directly from PDF pages.', ['pdf se text copy', 'copy content', 'pdf reader']],
    ['pdf-viewer', 'Lightweight PDF Viewer', 'Preview and read PDFs locally in your browser.', ['open pdf', 'view document', 'read pdf']],
    ['flatten-pdf', 'Flatten PDF Form', 'Make fillable form fields read-only and uneditable.', ['lock form fields', 'flatten annotations']],
    ['pdf-dpi-checker', 'PDF DPI & Info Checker', 'Check document dimensions, page sizes and DPI.', ['page size check', 'a4 dimensions', 'pdf resolution']],
    ['pdf-duplex-sorter', 'Duplex Page Sorter', 'Re-order scanned odd and even pages into correct order.', ['odd even sorter', 'scanned pages order']],
    ['invoice-pdf-cleaner', 'Invoice & Receipt Cleaner', 'Brighten scans and sharpen text for clear printing.', ['clean bill', 'sharp invoice print', 'receipt enhance']],
  ]),

  // ==========================================
  // 2. IMAGE TOOLS (35 Tools)
  // ==========================================
  ...make('Image Tools', 'Image', [
    ['image-compress', 'Compress Image', 'Reduce file size to exact KB for online forms without quality loss.', ['20kb', '50kb', '100kb', 'photo compress', 'photo chhoti karna', 'ssc form photo'], true],
    ['image-resize', 'Resize Image', 'Set exact width and height dimensions in pixels.', ['change photo size', 'passport size dimensions', 'photo resize', 'pixel badalna'], true],
    ['passport-photo-maker', 'Passport Photo Maker', 'Crop photos to official passport sizes (SSC, Police, Visa) with blue/white background.', ['passport photo', 'ssc form photo', 'form wali photo', 'nili background', 'passport size'], true],
    ['heic-to-jpg', 'HEIC to JPG Converter', 'Convert Apple iPhone HEIC pictures to widely supported JPG format locally.', ['heic to jpg', 'iphone photo convert', 'apple photo to jpg', 'heic nahi khul rahi'], true],
    ['svg-to-png', 'SVG to PNG Converter', 'Convert vector SVG graphics and logos into high-definition PNG images.', ['svg to png', 'vector to png', 'logo convert']],
    ['meme-generator', 'Meme Generator', 'Add top and bottom bold caption text to any photo to make custom memes.', ['meme maker', 'photo pe text likhna', 'meme creator', 'troll maker']],
    ['color-palette-extractor', 'Color Palette Extractor', 'Extract top dominant 5 HEX color palettes directly from any image.', ['extract colors', 'photo se color nikalna', 'hex code finder']],
    ['blur-face', 'Blur Face & Sensitive Info', 'Add privacy blur patches over faces, numbers, or confidential areas.', ['blur photo', 'face hide', 'chehra chhipana', 'censor photo']],
    ['jpg-to-png', 'JPG to PNG', 'Convert JPG photos to transparent-ready PNGs.', ['convert format', 'jpg se png']],
    ['png-to-jpg', 'PNG to JPG', 'Convert PNGs into lightweight, universally supported JPGs.', ['png se jpg', 'image format converter']],
    ['webp-converter', 'WebP Converter', 'Convert images to ultra-fast modern WebP format.', ['make webp', 'faster site images', 'webp to jpg']],
    ['image-crop', 'Crop Image', 'Cut out the exact part of the image you need.', ['cut photo', 'crop picture', 'photo katna']],
    ['image-rotate', 'Rotate Image', 'Turn images clockwise 90, 180, or 270 degrees.', ['turn photo', 'sidha karna']],
    ['image-flip', 'Flip Image', 'Mirror photo horizontally or upside down vertically.', ['mirror photo', 'ulta karna']],
    ['image-grayscale', 'Grayscale Image', 'Apply clean black and white monochrome treatment.', ['black and white', 'b&w photo']],
    ['image-blur', 'Blur Image', 'Soften images with a controlled blur slider.', ['censor photo', 'blur effect', 'dhundhla']],
    ['image-sharpen', 'Sharpen Image', 'Enhance edge definition and clarity on soft photos.', ['clear photo', 'photo saaf karna']],
    ['image-brightness', 'Adjust Brightness', 'Lighten or darken photos with live slider controls.', ['light barhana', 'photo bright karna']],
    ['image-contrast', 'Adjust Contrast', 'Enhance separation between light and dark tones.', ['contrast slider', 'photo deep karna']],
    ['image-watermark', 'Watermark Image', 'Stamp custom text or copyright mark on your picture.', ['photo pe naam likhna', 'watermark photo']],
    ['favicon-generator', 'Favicon Generator', 'Generate ready-to-use 32x32 website icons instantly.', ['make favicon', 'website icon']],
    ['signature-resizer', 'Exam Signature Resizer', 'Resize exam signatures to exact 10KB - 20KB for govt portals.', ['signature size', 'dastkhat resize', 'ssc signature 20kb', 'upsc sign size']],
    ['photo-date-namer', 'Add Name & Date on Photo', 'Stamp applicant name and date of photo (DOP) on candidate pictures.', ['name on photo', 'dop stamp', 'ssc photo date', 'photo pe tarikh']],
    ['pixelate-censor', 'Pixelate Privacy Censor', 'Pixelate passwords, bank details or license plates.', ['pixelate tool', 'privacy censor', 'hide number plate']],
    ['dpi-converter', 'DPI Converter (300 DPI)', 'Change image resolution metadata to 200 DPI or 300 DPI for forms.', ['300 dpi photo', 'dpi changer', 'print quality converter']],
    ['aspect-ratio-fitter', 'Aspect Ratio Fitter', 'Pad or fit photos into 16:9, 4:3, or 1:1 with blur background.', ['youtube thumbnail fit', 'instagram ratio', 'photo padding']],
    ['black-white-threshold', 'B&W Document Scanner', 'Clean up mobile document scans into stark black and white photocopies.', ['camscanner effect', 'document photocopy', 'xerox look']],
    ['image-color-inverter', 'Invert Colors (Negative)', 'Invert color photo into negative or dark mode inverted image.', ['negative photo', 'invert colors']],
    ['sepia-filter', 'Sepia Tone Filter', 'Apply vintage retro warm sepia tone to pictures.', ['vintage look', 'old photo effect']],
    ['png-metadata-stripper', 'Strip EXIF / Location', 'Delete GPS coordinates and camera model metadata from images.', ['remove exif', 'delete gps location', 'privacy photo']],
    ['image-splitter', 'Grid Image Splitter', 'Split a photo into 3x3 or 2x2 grid for social media posts.', ['grid photo', 'instagram grid cut']],
    ['round-corner-maker', 'Round Image Corners', 'Add custom rounded border radius with transparent corners.', ['circle photo', 'round edges']],
    ['bulk-image-resizer', 'Bulk Image Resizer', 'Resize dozens of images at once in local browser memory.', ['multiple image resize', 'batch resizer']],
    ['ascii-art-generator', 'Image to ASCII Art', 'Turn any portrait or picture into text-based ASCII art.', ['ascii picture', 'text photo']],
    ['transparent-color-remover', 'Replace Background Color', 'Replace background solid color with another color.', ['change background color', 'background rang badlo']],
  ]),

  // ==========================================
  // 3. TEXT TOOLS (25 Tools)
  // ==========================================
  ...make('Text Tools', 'Type', [
    ['word-counter', 'Word Counter', 'Count words, characters, sentences, and reading time.', ['count words', 'shabd ginti', 'essay word count'], true],
    ['character-counter', 'Character Counter', 'Track exact characters with and without spaces.', ['char count', 'letter counter', 'character limit']],
    ['case-converter', 'Case Converter', 'Convert between UPPERCASE, lowercase, Title Case, camelCase.', ['capital letters', 'bada chhota akshar', 'titlecase']],
    ['remove-extra-spaces', 'Remove Extra Spaces', 'Clean double spaces, empty tabs, and blank lines.', ['clean spaces', 'space hatana', 'trim text']],
    ['text-sorter', 'Text Sorter', 'Alphabetize lines A-Z or sort by length.', ['alphabetical sort', 'line order', 'a to z']],
    ['duplicate-line-remover', 'Duplicate Line Remover', 'Instantly purge repeating rows or email entries.', ['remove duplicates', 'unique lines', 'double line']],
    ['text-reverser', 'Text Reverser', 'Reverse entire paragraphs or character orders.', ['ulta text', 'flip words']],
    ['text-cleaner', 'Text Cleaner', 'Strip zero-width spaces and irregular unicode artifacts.', ['clean symbols', 'invisible characters remover']],
    ['slug-generator', 'Slug Generator', 'Turn headlines and titles into clean URL slugs.', ['url generator', 'seo slug', 'clean link']],
    ['lorem-ipsum-generator', 'Lorem Ipsum Generator', 'Generate clean dummy placeholder text for layouts.', ['dummy text', 'fake copy', 'sample text']],
    ['text-diff', 'Text Compare & Diff', 'Compare two texts side-by-side to highlight additions and deletions.', ['compare text', 'farak dekhna', 'text matching', 'antar dekhna'], true],
    ['markdown-to-html', 'Markdown to HTML', 'Convert Markdown syntax into clean formatted HTML code.', ['md to html', 'blog formatting']],
    ['html-to-markdown', 'HTML to Markdown', 'Strip HTML tags back into clean lightweight Markdown.', ['html to md', 'clean markdown']],
    ['keyword-density', 'Keyword Density Checker', 'Analyze top recurring words and search frequency percentage.', ['keyword density', 'seo keywords', 'shabd aavriti']],
    ['morse-code', 'Morse Code Translator', 'Encode text into Morse code dots and dashes or decode back.', ['morse code', 'dot dash translator', 'secret code']],
    ['binary-text-converter', 'Text to Binary Converter', 'Translate plain text into 01001000 binary bits and back.', ['text to binary', 'binary code', '0101']],
    ['rot13-cipher', 'ROT13 Cipher', 'Rotate letters by 13 positions for classic spoiler obfuscation.', ['rot13', 'caesar cipher', 'puzzles']],
    ['phonetic-alphabet', 'NATO Phonetic Alphabet', 'Spell words phonetically (Alpha, Bravo, Charlie) for clear phone calls.', ['nato spelling', 'alpha bravo', 'call spelling']],
    ['upside-down-text', 'Upside Down Text Flip', 'Flip your text upside down for social bios and captions.', ['ulta font', 'flip text ɐqɔ']],
    ['zalgo-glitch-text', 'Zalgo Glitch Text', 'Add spooky corrupt glitch marks over normal words.', ['glitch font', 'zalgo text', 'creepy words']],
    ['extract-emails', 'Extract Email Addresses', 'Filter and pull all clean email IDs out of bulk messy text.', ['email nikalna', 'email scraper', 'find emails']],
    ['extract-urls', 'Extract URLs & Links', 'Pull all web addresses and hyperlinks out of raw text.', ['link nikalna', 'extract links']],
    ['prefix-suffix-adder', 'Add Prefix & Suffix', 'Append words or symbols to beginning and end of every line.', ['har line me jodna', 'prefix suffix']],
    ['line-numberer', 'Add Line Numbers', 'Prepend ordered numbers (1., 2., 3.) to code or list items.', ['numbering lagana', 'line number']],
    ['text-statistics', 'Readability & Grade Level', 'Check Flesch Reading Ease score and estimated reading level.', ['reading grade', 'readability check', 'flesch score']],
  ]),

  // ==========================================
  // 4. CALCULATORS (40 Tools)
  // ==========================================
  ...make('Calculators', 'Calculator', [
    // Wealth & Savings
    ['sip-calculator', 'SIP Calculator', 'Calculate returns on Monthly Mutual Fund SIP investments.', ['sip calculator', 'mutual fund sip', 'sip me kitna milega', 'crorepati calculator'], true],
    ['lumpsum-calculator', 'Lumpsum Calculator', 'Calculate wealth growth on one-time mutual fund investments.', ['one time investment', 'lumpsum return', 'mutual fund']],
    ['ppf-calculator', 'PPF Calculator', 'Calculate 15-year Public Provident Fund returns and tax savings.', ['ppf return', 'sarkari yojna', 'ppf interest']],
    ['fd-calculator', 'FD Calculator', 'Calculate Fixed Deposit interest and final maturity value.', ['fixed deposit', 'bank fd byaj', 'fd maturity']],
    ['rd-calculator', 'RD Calculator', 'Calculate Recurring Deposit maturity on monthly savings.', ['recurring deposit', 'monthly post office rd']],
    ['cagr-calculator', 'CAGR Calculator', 'Calculate Compound Annual Growth Rate for stocks and business.', ['annual growth', 'cagr formula', 'cagr calculator']],
    ['stock-average-calculator', 'Stock Average Calculator', 'Calculate new average buying price when buying stock dips.', ['share average', 'stock down average', 'share market buy']],
    ['hra-calculator', 'HRA Exemption Calculator', 'Find how much house rent allowance (HRA) is tax exempt.', ['rent tax exemption', 'kiraye ki chhoot', 'hra calculation 80gg']],
    ['salary-calculator', 'Salary In-Hand Calculator', 'Estimate monthly take-home salary after PF and basic taxes.', ['in hand salary', 'take home pay', 'ctc to in hand']],
    ['fuel-cost-calculator', 'Fuel Cost & Mileage', 'Calculate total trip fuel cost and split per passenger.', ['petrol kharcha', 'mileage hisab', 'trip cost']],
    ['inflation-calculator', 'Inflation Calculator', 'See what today money will be worth in 10 or 20 years.', ['mehangai calculator', 'future value of money']],
    ['dividend-yield-calculator', 'Dividend Yield Calculator', 'Calculate annual dividend yield percentage on your stocks.', ['share dividend', 'dividend return']],
    ['step-up-sip-calculator', 'Step-Up SIP Calculator', 'Calculate returns when increasing SIP amount yearly by 10%.', ['step up sip', 'yearly increase sip', 'crorepati roadmap']],
    ['swp-calculator', 'SWP Calculator', 'Calculate monthly pension withdrawals from mutual fund balance.', ['systematic withdrawal', 'swp monthly income']],
    ['gratuity-calculator', 'Gratuity Calculator', 'Calculate statutory gratuity payout after 5+ years of employment.', ['gratuity calculation', 'company gratuity']],
    ['epf-calculator', 'EPF Retirement Calculator', 'Project your Employee Provident Fund balance till age 58.', ['pf balance check', 'epf interest', 'provident fund']],
    ['nps-calculator', 'NPS Pension Calculator', 'Calculate National Pension Scheme retirement corpus and annuity.', ['nps scheme', 'pension yojna']],
    ['car-loan-calculator', 'Car Loan EMI & Down Payment', 'Compute on-road vehicle loan EMI with road tax and down payment.', ['car emi', 'gaadi ki kist', 'bike loan']],
    ['home-loan-prepayment', 'Home Loan Prepayment Saver', 'See how prepaying part of home loan cuts years and saves interest.', ['prepayment loan', 'home loan jaldi chukana']],
    ['sukanya-samriddhi', 'Sukanya Samriddhi Calculator', 'Calculate maturity corpus for girl child savings scheme.', ['ssy calculator', 'beti yojna', 'sukanya samriddhi']],

    // Everyday Math & Health
    ['percentage-calculator', 'Percentage Calculator', 'Calculate percentages, discounts, increases, and decreases.', ['pratishat', 'percent nikalna'], true],
    ['age-calculator', 'Age Calculator', 'Find exact age in years, months, and days from birth date.', ['umra calculator', 'exact age', 'janam din'], true],
    ['emi-calculator', 'EMI Calculator', 'Calculate home, car, or personal loan monthly payments.', ['loan emi', 'kist calculator', 'monthly payment'], true],
    ['gst-calculator', 'GST Calculator', 'Add or deduct 5%, 12%, 18%, or 28% GST from any amount.', ['gst jodna', 'gst hatana', 'tax calculator'], true],
    ['bmi-calculator', 'BMI Calculator', 'Check Body Mass Index and healthy weight category.', ['vajan check', 'fat calculator', 'ideal weight']],
    ['discount-calculator', 'Discount Calculator', 'Determine final sale price and total money saved.', ['chhoot nikalna', 'sale offer', 'savings']],
    ['profit-loss-calculator', 'Profit & Loss', 'Calculate margins and financial gain or loss percentage.', ['labh hani', 'margin percentage']],
    ['simple-interest-calculator', 'Simple Interest', 'Compute basic interest on principal amount.', ['sadharan byaj', 'simple interest formula']],
    ['compound-interest-calculator', 'Compound Interest', 'Compute compound growth and future investment value.', ['chakravriddhi byaj', 'compounding calculator']],
    ['date-difference-calculator', 'Date Difference', 'Count the total number of days between two calendar dates.', ['din ginti', 'days between dates']],
    ['time-calculator', 'Time Calculator', 'Add or subtract hours and minutes cleanly.', ['ghante jodna', 'duration calculation']],
    ['average-calculator', 'Average Calculator', 'Find mathematical mean and sum of comma-separated numbers.', ['ausat nikalna', 'mean calculator']],
    ['ratio-calculator', 'Ratio Calculator', 'Simplify dimensions and ratios (e.g. 1920x1080 to 16:9).', ['anupat', 'aspect ratio simplifier']],
    ['fraction-calculator', 'Fraction Calculator', 'Add, subtract, multiply, and divide fractions.', ['bhinna ka jod', 'fraction solver']],
    ['unit-converter', 'Unit Converter', 'Convert length, weight, and temperature measurements.', ['meter to km', 'kg to pound']],
    ['calorie-calculator', 'Calorie & TDEE Calculator', 'Find your daily maintenance calories for weight loss/gain.', ['daily calories', 'diet plan calories']],
    ['water-intake-calculator', 'Water Intake Calculator', 'Calculate how many liters of water you must drink daily.', ['pani kitna piye', 'daily water goal']],
    ['tip-calculator', 'Tip & Bill Splitter', 'Calculate dining tip percentage and split bill evenly with friends.', ['hotel bill split', 'bill batna']],
    ['sleep-calculator', 'Sleep Cycle Calculator', 'Find optimal bedtime to wake up fresh based on 90-min cycles.', ['sleep cycles', 'subah kab uthe', 'nind calculator']],
    ['pregnancy-due-date', 'Pregnancy Due Date Calculator', 'Estimate delivery due date based on Last Menstrual Period (LMP).', ['due date', 'delivery date', 'pregnancy week']],
  ]),

  // ==========================================
  // 5. GENERATORS & DEV UTILITIES (24 Tools)
  // ==========================================
  ...make('Generators & Developer Utilities', 'Terminal', [
    ['qr-code-generator', 'QR Code Generator', 'Generate clean, high-resolution QR codes for URLs and text.', ['make qr', 'upi qr code', 'barcode scan'], true],
    ['password-generator', 'Password Generator', 'Create strong, uncrackable random passwords locally.', ['strong password', 'secure key', 'password banana'], true],
    ['barcode-generator', 'Barcode Generator', 'Generate Code128 barcodes ready for download.', ['bar code maker', 'product code']],
    ['uuid-generator', 'UUID Generator', 'Generate cryptographically unique v4 UUID identifiers.', ['guid maker', 'unique id']],
    ['random-number-generator', 'Random Number', 'Pick provably fair random numbers in any custom range.', ['lucky number', 'lottery number']],
    ['color-picker', 'Color Picker', 'Pick colors visually and copy HEX, RGB, and HSL values.', ['rang selector', 'color code finder']],
    ['hex-to-rgb-converter', 'HEX to RGB', 'Translate web hex color codes to RGB values.', ['hex code to rgb', 'color conversion']],
    ['timestamp-converter', 'Timestamp Converter', 'Convert Unix epoch timestamps to local date and time.', ['epoch to date', 'unix time']],
    ['json-formatter', 'JSON Formatter', 'Prettify, validate, and indent messy JSON structures.', ['clean json', 'json beautifier']],
    ['json-minifier', 'JSON Minifier', 'Compress JSON payload size by stripping whitespace.', ['shrink json', 'compact json']],
    ['regex-tester', 'Regex Pattern Tester', 'Test regular expressions with real-time match highlighting.', ['regex test', 'pattern check', 'regular expression']],
    ['jwt-decoder', 'JWT Token Decoder', 'Decode and inspect JSON Web Tokens headers and payload without secrets.', ['jwt decode', 'token inspector', 'jwt payload']],
    ['sql-formatter', 'SQL Query Formatter', 'Beautify messy SQL database queries with clean indentations.', ['clean sql', 'beautify query', 'format sql']],
    ['hash-generator', 'MD5 & SHA Hash Generator', 'Generate SHA-256, SHA-512, and MD5 cryptographic hashes.', ['sha256 hash', 'checksum maker', 'hash string']],
    ['upi-qr-generator', 'UPI Payment QR Generator', 'Generate direct scan-to-pay QR codes for GPay, PhonePe, Paytm.', ['phonepe qr', 'gpay qr', 'upi code', 'bhim qr']],
    ['wifi-qr-generator', 'WiFi Password QR Generator', 'Create scannable QR code for instant WiFi network connections.', ['wifi qr', 'wifi connect scan', 'wifi password code']],
    ['cron-expression', 'Cron Expression Builder', 'Generate and translate Linux cron schedule expressions.', ['cron syntax', 'crontab schedule', 'cron timing']],
    ['meta-tag-generator', 'SEO Meta Tag Generator', 'Build OpenGraph, Twitter card and search meta tags for websites.', ['seo tags', 'og image tags', 'website meta tags']],
    ['curl-to-fetch', 'cURL to Fetch Converter', 'Convert command-line cURL syntax into JavaScript Fetch code.', ['curl to js', 'api request converter']],
    ['credit-card-validator', 'Credit Card Luhn Validator', 'Validate payment card number formats using standard Luhn checks.', ['card validation', 'luhn check', 'card number test']],
    ['fake-data-generator', 'Mock / Fake Data Generator', 'Generate fake names, addresses, and phone numbers for prototyping.', ['dummy user data', 'test users maker']],
    ['html-entity-encoder', 'HTML Entities Encoder', 'Convert special characters (&lt;, &gt;) to web HTML entities.', ['html escape', 'special characters code']],
    ['user-agent-parser', 'User Agent Inspector', 'Inspect your current browser, operating system, and hardware details.', ['what is my browser', 'user agent check']],
    ['speed-typing-test', 'Typing Speed Test (WPM)', 'Test your English typing words per minute (WPM) and accuracy.', ['typing test', 'wpm test', 'speed typing']],
  ]),

  // ==========================================
  // 6. CONVERTERS & FORMATTERS (20 Tools)
  // ==========================================
  ...make('Converters & Other Utilities', 'ArrowLeftRight', [
    ['number-to-words', 'Number to Words', 'Spell out currency or numbers into words in English.', ['cheque writing', 'amount in words', 'shabdo me likhe']],
    ['text-encrypt-decrypt', 'Text Encrypt / Decrypt', 'Lock secret text with a local passphrase and unlock anytime.', ['secret code', 'text password lock']],
    ['base64-encoder-decoder', 'Base64 Encoder / Decoder', 'Safely encode plain text into Base64 format or decode it back.', ['base64 convert', 'decode string']],
    ['url-encoder-decoder', 'URL Encoder / Decoder', 'Encode special query parameters or decode URL strings.', ['percent encoding', 'clean url link']],
    ['html-formatter', 'HTML Formatter', 'Indent and clean up HTML tags for readability.', ['pretty html', 'html beautify']],
    ['css-formatter', 'CSS Formatter', 'Prettify and format stylesheets with neat braces.', ['clean css', 'css beautify']],
    ['javascript-formatter', 'JavaScript Formatter', 'Format JS code snippets with standard indentation.', ['beautify js', 'clean javascript']],
    ['xml-formatter', 'XML Formatter', 'Properly nest and format XML tags.', ['xml pretty print', 'tidy xml']],
    ['yaml-formatter', 'YAML Formatter', 'Align and validate YAML indentation.', ['yaml pretty', 'clean yaml']],
    ['csv-to-json', 'CSV to JSON Converter', 'Convert table spreadsheets and CSV files into JSON format.', ['csv se json', 'excel to json']],
    ['json-to-csv', 'JSON to CSV Converter', 'Flatten JSON arrays into spreadsheet-ready CSV tables.', ['json to csv', 'json se excel']],
    ['xml-to-json', 'XML to JSON Converter', 'Convert nested XML tree files into modern JSON objects.', ['xml se json', 'xml parser']],
    ['base64-to-image', 'Base64 to Image Preview', 'Convert data URI Base64 strings into downloadable images.', ['data url to image', 'base64 download']],
    ['hex-to-decimal', 'Hex / Binary / Decimal', 'Convert values between Base-2, Base-10, and Base-16 systems.', ['number base converter', 'hex to dec']],
    ['speed-converter', 'Speed Converter (km/h - mph)', 'Convert speed between km/h, mph, knots, and m/s.', ['kmph to mph', 'speed conversion']],
    ['storage-converter', 'Storage Size Converter (MB - GB)', 'Convert digital units between KB, MB, GB, TB, and PB.', ['mb to gb', 'data size converter']],
    ['pressure-converter', 'Pressure Converter (psi - bar)', 'Convert air and liquid pressure between PSI, Bar, and Pascals.', ['psi to bar', 'tyre pressure']],
    ['energy-converter', 'Energy & Power (Joules - Watts)', 'Convert energy units between Calories, Joules, and Kilowatt-hours.', ['calories to joules', 'kwh to watt']],
    ['angle-converter', 'Angle Converter (Deg - Rad)', 'Convert angles between degrees, radians, and gradians.', ['degree to radian', 'math angle']],
    ['world-clock-diff', 'Time Zone Converter', 'Compare time differences across IST, UTC, EST, and PST.', ['ist to est', 'time zone diff', 'utc to india']],
  ]),
];

export const toolBySlug = Object.fromEntries(tools.map((tool) => [tool.slug, tool])) as Record<string, Tool>;
export const categories = Object.keys(categoryInfo) as Category[];
