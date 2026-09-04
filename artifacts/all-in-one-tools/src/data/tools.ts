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
  keywords: string[]; // सर्च और SEO के लिए हिंग्लिश/हिंदी कीवर्ड्स
};

export const categoryInfo: Record<
  Category,
  { label: string; short: string; icon: string; color: string }
> = {
  'PDF Tools': {
    label: 'PDF Tools',
    short: 'Tidy, join and reshape documents in a few clicks.',
    icon: 'FileText',
    color: '#e87959',
  },
  'Image Tools': {
    label: 'Image Tools',
    short: 'Quick edits that happen right in your browser.',
    icon: 'Image',
    color: '#3d9c7d',
  },
  'Text Tools': {
    label: 'Text Tools',
    short: 'Make words cleaner, clearer and ready to use.',
    icon: 'Type',
    color: '#cf9a3d',
  },
  Calculators: {
    label: 'Calculators',
    short: 'Answers for everyday decisions, without spreadsheets.',
    icon: 'Calculator',
    color: '#8d6aaf',
  },
  'Generators & Developer Utilities': {
    label: 'Dev Utilities',
    short: 'Small, dependable helpers for building and shipping.',
    icon: 'Terminal',
    color: '#397ba7',
  },
  'Converters & Other Utilities': {
    label: 'Converters',
    short: 'Translate formats and values with no server upload.',
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
  // 1. PDF TOOLS (10 Tools)
  // ==========================================
  ...make('PDF Tools', 'FileText', [
    ['pdf-merge', 'Merge PDF', 'Join multiple PDFs into one clean document.', ['combine pdf', 'pdf jodna', 'join pdf files', 'merge documents'], true],
    ['pdf-split', 'Split PDF', 'Break a PDF into smaller files by page range.', ['separate pdf', 'pdf alag karna', 'page splitter', 'extract pages'], true],
    ['pdf-compress', 'Compress PDF', 'Make a PDF lighter for sharing and uploads.', ['reduce pdf size', 'pdf chhoti karna', 'under 100kb', 'pdf compress online'], true],
    ['pdf-to-images', 'PDF to Images', 'Turn every page into a downloadable JPG or PNG image.', ['pdf se photo', 'convert pdf to jpg', 'pdf to picture']],
    ['images-to-pdf', 'Images to PDF', 'Bundle JPG/PNG images into a single tidy PDF.', ['photo se pdf', 'jpg to pdf', 'image combine pdf']],
    ['pdf-rotate', 'Rotate PDF', 'Rotate pages by 90 or 180 degrees permanently.', ['turn pdf', 'sidha karna', 'rotate pdf pages']],
    ['pdf-delete-pages', 'Delete PDF Pages', 'Remove unwanted pages from your document.', ['remove page', 'pdf se page hatana', 'cut pdf pages']],
    ['pdf-extract-pages', 'Extract PDF Pages', 'Save selected specific pages as a new PDF.', ['save single page', 'pdf page nikalna']],
    ['pdf-watermark', 'Watermark PDF', 'Stamp light text or brand marks across your document.', ['pdf stamp', 'watermark lagana', 'copyright mark']],
    ['pdf-metadata-remover', 'Remove PDF Metadata', 'Strip hidden document author and date details.', ['clean pdf', 'clear pdf info', 'privacy protection']],
  ]),

  // ==========================================
  // 2. IMAGE TOOLS (15 Tools)
  // ==========================================
  ...make('Image Tools', 'Image', [
    ['image-compress', 'Compress Image', 'Reduce file size to exact KB for forms without losing quality.', ['20kb', '50kb', '100kb', 'photo compress', 'photo chhoti karna', 'ssc form photo'], true],
    ['image-resize', 'Resize Image', 'Set exact width and height dimensions in pixels.', ['change photo size', 'passport size dimensions', 'photo resize', 'pixel setter'], true],
    ['jpg-to-png', 'JPG to PNG', 'Convert JPG photos to transparent-ready PNGs.', ['convert format', 'jpg se png']],
    ['png-to-jpg', 'PNG to JPG', 'Convert PNGs into lightweight, universally supported JPGs.', ['png se jpg', 'image format converter']],
    ['webp-converter', 'WebP Converter', 'Convert images to ultra-fast modern WebP format.', ['make webp', 'faster site images']],
    ['image-crop', 'Crop Image', 'Cut out the exact part of the image you need.', ['cut photo', 'crop picture', 'photo katna']],
    ['image-rotate', 'Rotate Image', 'Turn images clockwise 90, 180, or 270 degrees.', ['turn photo', 'sidha karna']],
    ['image-flip', 'Flip Image', 'Mirror photo horizontally or upside down vertically.', ['mirror photo', 'ulta karna']],
    ['image-grayscale', 'Grayscale Image', 'Apply clean black and white monochrome treatment.', ['black and white', 'b&w photo', 'shyam shwet']],
    ['image-blur', 'Blur Image', 'Soften images with a controlled blur slider.', ['censor photo', 'blur effect', 'dhundhla']],
    ['image-sharpen', 'Sharpen Image', 'Enhance edge definition and clarity on soft photos.', ['clear photo', 'photo saaf karna']],
    ['image-brightness', 'Adjust Brightness', 'Lighten or darken photos with live slider controls.', ['light barhana', 'photo bright karna']],
    ['image-contrast', 'Adjust Contrast', 'Enhance separation between light and dark tones.', ['contrast slider', 'photo deep karna']],
    ['image-watermark', 'Watermark Image', 'Stamp custom text or copyright mark on your picture.', ['photo pe naam likhna', 'watermark photo']],
    ['favicon-generator', 'Favicon Generator', 'Generate ready-to-use 32x32 website icons instantly.', ['make favicon', 'website icon', 'ico file']],
  ]),

  // ==========================================
  // 3. TEXT TOOLS (10 Tools)
  // ==========================================
  ...make('Text Tools', 'Type', [
    ['word-counter', 'Word Counter', 'Count words, characters, sentences, and reading time.', ['count words', 'shabd ginti', 'essay word count'], true],
    ['character-counter', 'Character Counter', 'Track exact characters with and without spaces.', ['char count', 'letter counter', 'twitter char limit']],
    ['case-converter', 'Case Converter', 'Convert between UPPERCASE, lowercase, Title Case, camelCase.', ['capital letters', 'bada chhota akshar', 'camelcase']],
    ['remove-extra-spaces', 'Remove Extra Spaces', 'Clean double spaces, empty tabs, and unnecessary blank lines.', ['clean spaces', 'space hatana', 'trim text']],
    ['text-sorter', 'Text Sorter', 'Alphabetize lines A-Z or sort by length.', ['alphabetical sort', 'line order', 'kram me lagana']],
    ['duplicate-line-remover', 'Duplicate Line Remover', 'Instantly purge repeating rows or email entries.', ['remove duplicates', 'unique lines', 'double line hatana']],
    ['text-reverser', 'Text Reverser', 'Reverse entire paragraphs or character orders.', ['ulta text', 'flip words', 'mirror text']],
    ['text-cleaner', 'Text Cleaner', 'Strip zero-width spaces and irregular unicode artifacts.', ['clean symbols', 'invisible characters remover']],
    ['slug-generator', 'Slug Generator', 'Turn headlines and titles into clean URL slugs.', ['url generator', 'seo slug', 'permalink maker']],
    ['lorem-ipsum-generator', 'Lorem Ipsum Generator', 'Generate clean dummy placeholder text for layouts.', ['dummy text', 'fake copy', 'sample text']],
  ]),

  // ==========================================
  // 4. CALCULATORS (15 Tools)
  // ==========================================
  ...make('Calculators', 'Calculator', [
    ['percentage-calculator', 'Percentage Calculator', 'Calculate percentages, discounts, increases, and decreases.', ['pratishat', 'percent nikalna', 'discount percentage'], true],
    ['age-calculator', 'Age Calculator', 'Find exact age in years, months, and days from birth date.', ['umra calculator', 'exact age', 'kitne saal ke hue'], true],
    ['emi-calculator', 'EMI Calculator', 'Calculate home, car, or personal loan monthly payments.', ['loan emi', 'kist calculator', 'monthly payment', 'byaj emi'], true],
    ['gst-calculator', 'GST Calculator', 'Add or deduct 5%, 12%, 18%, or 28% GST from any amount.', ['gst jodna', 'gst hatana', 'tax calculator'], true],
    ['bmi-calculator', 'BMI Calculator', 'Check Body Mass Index and healthy weight category.', ['vajan check', 'fat calculator', 'ideal weight']],
    ['discount-calculator', 'Discount Calculator', 'Determine final sale price and total money saved.', ['chhoot nikalna', 'sale offer', 'savings']],
    ['profit-loss-calculator', 'Profit & Loss', 'Calculate margins and financial gain or loss percentage.', ['labh hani', 'margin percentage', 'business calc']],
    ['simple-interest-calculator', 'Simple Interest', 'Compute basic interest on principal amount.', ['sadharan byaj', 'simple interest formula']],
    ['compound-interest-calculator', 'Compound Interest', 'Compute compound growth and future investment value.', ['chakravriddhi byaj', 'compounding calculator']],
    ['date-difference-calculator', 'Date Difference', 'Count the total number of days between two calendar dates.', ['din ginti', 'days between dates']],
    ['time-calculator', 'Time Calculator', 'Add or subtract hours and minutes cleanly.', ['ghante jodna', 'duration calculation']],
    ['average-calculator', 'Average Calculator', 'Find the mathematical mean and sum of comma-separated numbers.', ['ausat nikalna', 'mean calculator']],
    ['ratio-calculator', 'Ratio Calculator', 'Simplify dimensions and ratios (e.g. 1920x1080 to 16:9).', ['anupat', 'aspect ratio simplifier']],
    ['fraction-calculator', 'Fraction Calculator', 'Add, subtract, multiply, and divide fractions.', ['bhinna ka jod', 'fraction solver']],
    ['unit-converter', 'Unit Converter', 'Convert length, weight, and temperature measurements.', ['meter to km', 'kg to pound', 'celsius to fahrenheit']],
  ]),

  // ==========================================
  // 5. GENERATORS & DEV UTILITIES (10 Tools)
  // ==========================================
  ...make('Generators & Developer Utilities', 'Terminal', [
    ['qr-code-generator', 'QR Code Generator', 'Generate clean, high-resolution QR codes for URLs, text, and UPI.', ['make qr', 'upi qr code', 'barcode scan'], true],
    ['password-generator', 'Password Generator', 'Create strong, uncrackable random passwords locally.', ['strong password', 'secure key', 'password banana'], true],
    ['barcode-generator', 'Barcode Generator', 'Generate Code128 barcodes ready for download.', ['bar code maker', 'product code']],
    ['uuid-generator', 'UUID Generator', 'Generate cryptographically unique v4 UUID identifiers.', ['guid maker', 'unique id']],
    ['random-number-generator', 'Random Number', 'Pick provably fair random numbers in any custom range.', ['lucky number', 'lottery number', 'random choice']],
    ['color-picker', 'Color Picker', 'Pick colors visually and copy HEX, RGB, and HSL values.', ['rang selector', 'color code finder']],
    ['hex-to-rgb-converter', 'HEX to RGB', 'Translate web hex color codes to RGB values.', ['hex code to rgb', 'color conversion']],
    ['timestamp-converter', 'Timestamp Converter', 'Convert Unix epoch timestamps to local date and time.', ['epoch to date', 'unix time']],
    ['json-formatter', 'JSON Formatter', 'Prettify, validate, and indent messy JSON structures.', ['clean json', 'json beautifier']],
    ['json-minifier', 'JSON Minifier', 'Compress JSON payload size by stripping whitespace.', ['shrink json', 'compact json']],
  ]),

  // ==========================================
  // 6. CONVERTERS & FORMATTERS (9 Tools)
  // ==========================================
  ...make('Converters & Other Utilities', 'ArrowLeftRight', [
    ['number-to-words', 'Number to Words', 'Spell out currency or numbers into words in English.', ['cheque writing', 'shabdo me likhe', 'amount in words']],
    ['text-encrypt-decrypt', 'Text Encrypt / Decrypt', 'Lock secret text with a local passphrase and unlock anytime.', ['secret code', 'text password lock', 'chhipana']],
    ['base64-encoder-decoder', 'Base64 Encoder / Decoder', 'Safely encode plain text into Base64 format or decode it back.', ['base64 convert', 'decode string']],
    ['url-encoder-decoder', 'URL Encoder / Decoder', 'Encode special query parameters or decode URL strings.', ['percent encoding', 'clean url link']],
    ['html-formatter', 'HTML Formatter', 'Indent and clean up HTML tags for readability.', ['pretty html', 'html beautify']],
    ['css-formatter', 'CSS Formatter', 'Prettify and format stylesheets with neat braces.', ['clean css', 'css beautify']],
    ['javascript-formatter', 'JavaScript Formatter', 'Format JS code snippets with standard indentation.', ['beautify js', 'clean javascript']],
    ['xml-formatter', 'XML Formatter', 'Properly nest and format XML tags.', ['xml pretty print', 'tidy xml']],
    ['yaml-formatter', 'YAML Formatter', 'Align and validate YAML indentation.', ['yaml pretty', 'clean yaml']],
  ]),
];

export const toolBySlug = Object.fromEntries(tools.map((tool) => [tool.slug, tool])) as Record<string, Tool>;
export const categories = Object.keys(categoryInfo) as Category[];
