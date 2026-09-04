export interface ToolKnowledge {
  tipEn: string;
  tipHi: string;
  whatEn: string;
  whatHi: string;
  casesEn: { title: string; desc: string }[];
  casesHi: { title: string; desc: string }[];
}

export const toolKnowledgeBase: Record<string, ToolKnowledge> = {
  // 1. PDF 2-in-1 / 4-in-1
  'pdf-nup': {
    tipEn: 'Pick "4-in-1" to create compact pocket-sized revision cheat-sheets.',
    tipHi: 'रिवीजन नोट्स और फॉर्मूला शीट को छोटा बनाने के लिए "4-in-1" विकल्प चुनें।',
    whatEn: 'PDF 2-in-1 / 4-in-1 places multiple consecutive pages onto a single printed sheet, drastically reducing paper and printing costs.',
    whatHi: 'यह टूल 2 या 4 पन्नों को एक ही शीट पर प्रिंट करने के लिए सेट करता है, जिससे कागज़ और प्रिंटिंग का खर्च आधा हो जाता है।',
    casesEn: [
      { title: 'College Lecture Notes', desc: 'Print 100-page slide decks on just 25 or 50 sheets.' },
      { title: 'Pocket Formula Guides', desc: 'Create miniature reference sheets for exams and meetings.' },
      { title: 'Eco-Friendly Printing', desc: 'Reduce paper waste and courier parcel weights significantly.' }
    ],
    casesHi: [
      { title: 'कॉलेज नोट्स प्रिंटिंग', desc: '100 पन्नों की लंबी PDF को सिर्फ 25 या 50 पन्नों में प्रिंट करवाएँ।' },
      { title: 'पॉकेट रिवीजन गाइड', desc: 'एग्जाम से पहले दोहराने के लिए छोटी फॉर्मूला बुकलेट बनाएँ।' },
      { title: 'कागज़ और पैसे की बचत', desc: 'साइबर कैफे में प्रिंट का बिल 50% से 75% तक कम करें।' }
    ]
  },

  // 2. Extract Text from PDF
  'pdf-extract-text': {
    tipEn: 'Copy plain text directly or download a clean .txt file without formatting mess.',
    tipHi: 'PDF से केवल शुद्ध टेक्स्ट कॉपी करें या सीधे .txt फाइल डाउनलोड करें।',
    whatEn: 'Extract Text pulls raw editable text content out of your document pages, letting you copy quotes, articles, or data without layout interference.',
    whatHi: 'यह टूल PDF के अंदर मौजूद टेक्स्ट को बाहर निकालकर एडिटेबल बनाता है, ताकि आप उसे कहीं भी कॉपी-पेस्ट कर सकें।',
    casesEn: [
      { title: 'Research & Citations', desc: 'Pull paragraphs and tables from academic papers without retyping.' },
      { title: 'Scraped Data Analysis', desc: 'Convert reports and whitepapers into raw text for analysis.' },
      { title: 'Language Translation', desc: 'Quickly feed document text into translation tools.' }
    ],
    casesHi: [
      { title: 'नोट्स और असाइनमेंट', desc: 'किताबों या गाइड की PDF से जरूरी पैराग्राफ बिना दोबारा टाइप किए कॉपी करें।' },
      { title: 'प्रोजेक्ट रिपोर्ट', desc: 'सरकारी नोटिफिकेशन या सर्कुलर से काम की जानकारी निकालकर वर्ड में पेस्ट करें।' },
      { title: 'आसान ट्रांसलेशन', desc: 'अंग्रेजी PDF के टेक्स्ट को कॉपी करके गूगल ट्रांसलेटर में डालें।' }
    ]
  },

  // 3. Compress PDF
  'pdf-compress': {
    tipEn: 'Enter your exact target in KB (e.g., 100 or 200) for strict upload portals.',
    tipHi: 'सरकारी पोर्टल की तय लिमिट के हिसाब से सटीक KB (जैसे 100 या 200) टाइप करें।',
    whatEn: 'Compress PDF optimizes document streams, removing excessive metadata and redundant objects to shrink file size with minimal visual loss.',
    whatHi: 'यह टूल PDF की क्वालिटी खराब किए बिना उसका साइज़ बहुत छोटा कर देता है ताकि वह आसानी से अपलोड हो सके।',
    casesEn: [
      { title: 'Job Application Portals', desc: 'Pass strict 100KB–300KB upload limits on ATS and government portals.' },
      { title: 'Email Attachments', desc: 'Send heavy PDF files easily through 25MB email size boundaries.' },
      { title: 'Fast Web Hosting', desc: 'Optimize downloadable PDFs so they load instantaneously on mobile devices.' }
    ],
    casesHi: [
      { title: 'सरकारी नौकरी फॉर्म', desc: 'SSC, UPSC, रेलवे फॉर्म में माँगी गई 100KB/200KB लिमिट में फिट करें।' },
      { title: 'WhatsApp व ईमेल शेयरिंग', desc: 'बड़ी PDF का साइज़ कम करके बिना रुके तेजी से भेजें।' },
      { title: 'फोन मेमोरी की बचत', desc: 'किताबों और भारी फाइलों को हल्का करके मोबाइल स्टोरेज खाली करें।' }
    ]
  },

  // 4. Merge PDF
  'pdf-merge': {
    tipEn: 'Use the up/down arrows to reorder pages before merging into a single document.',
    tipHi: 'PDF को जोड़ने से पहले तीर के निशानों (↑/↓) से उनका सही क्रम सेट कर लें।',
    whatEn: 'Merge PDF combines multiple separate PDF documents into one single, cohesive, and professionally indexed file.',
    whatHi: 'यह टूल अलग-अलग PDF फाइलों को एक के पीछे एक जोड़कर एक सिंगल और व्यवस्थित फाइल बना देता है।',
    casesEn: [
      { title: 'Job Application Dossier', desc: 'Combine your Resume, Cover Letter, and Degree Certificates together.' },
      { title: 'Legal Case Bundles', desc: 'Unite agreements, affidavits, and annexures into a single dossier.' },
      { title: 'Financial Reports', desc: 'Stitch monthly bank statements and receipts into one annual tax file.' }
    ],
    casesHi: [
      { title: 'नौकरी के दस्तावेज', desc: 'रिज्यूमे, 10वीं-12वीं की मार्कशीट और आधार कार्ड को एक ही फाइल में जोड़ें।' },
      { title: 'दुकान व बिजनेस बिल', desc: 'महीने भर के सारे इनवॉइस और रसीदें एक साथ नत्थी करें।' },
      { title: 'कॉलेज असाइनमेंट', desc: 'अलग-अलग चैप्टर्स को जोड़कर पूरी प्रोजेक्ट फाइल तैयार करें।' }
    ]
  },

  // 5. Split PDF
  'pdf-split': {
    tipEn: 'Specify comma-separated pages or ranges (e.g., 1-3, 5, 8) to cut precisely.',
    tipHi: 'पेज अलग करने के लिए कॉमा या रेंज का प्रयोग करें (जैसे 1-3, 5, 8)।',
    whatEn: 'Split PDF breaks a large multi-page document into smaller, standalone PDF files based on your exact page selections.',
    whatHi: 'यह टूल बड़ी PDF में से आपके मनपसंद पेजों को काटकर अलग-अलग छोटी PDF में बाँट देता है।',
    casesEn: [
      { title: 'Share Specific Chapters', desc: 'Extract and send just one relevant chapter from a massive textbook.' },
      { title: 'Extract Invoices', desc: 'Pull a single client bill out of a 200-page batch accounting export.' },
      { title: 'Remove Clutter', desc: 'Keep only the pages that matter and discard the rest.' }
    ],
    casesHi: [
      { title: 'किताब से सिर्फ जरूरी पाठ', desc: '500 पेज की किताब से केवल वही चैप्टर निकालें जो आपको पढ़ना है।' },
      { title: 'सैलरी स्लिप अलग करना', desc: 'कंपनी की पूरी लिस्ट से सिर्फ अपनी स्लिप काटकर सेव करें।' },
      { title: 'फॉर्म के मुख्य पेज', desc: 'नोटिफिकेशन के 50 पन्नों में से सिर्फ आवेदन फॉर्म वाले 2 पेज अलग करें।' }
    ]
  },

  // 6. Watermark PDF
  'pdf-watermark': {
    tipEn: 'Keep opacity between 15% and 25% so the text stays legible while preventing theft.',
    tipHi: 'ओपेसिटी 15% से 25% के बीच रखें ताकि पढ़ाई में रुकावट न हो और चोरी भी रुके।',
    whatEn: 'Watermark PDF stamps customizable copyright text, brand names, or status markers across every page to protect your intellectual property.',
    whatHi: 'यह टूल आपकी PDF के हर पन्ने पर आपकी कोचिंग, ब्रांड या नाम का हल्का ठप्पा (वॉटरमार्क) लगा देता है ताकि कोई चुरा न सके।',
    casesEn: [
      { title: 'Copyright Protection', desc: 'Prevent unauthorized re-distribution of your coaching or agency material.' },
      { title: 'Confidentiality Labels', desc: 'Stamp "DRAFT", "CONFIDENTIAL", or "INTERNAL ONLY" on enterprise files.' },
      { title: 'Brand Visibility', desc: 'Embed your website URL or phone number across shared research notes.' }
    ],
    casesHi: [
      { title: 'कोचिंग नोट्स सुरक्षा', desc: 'अपने कोचिंग के नोट्स पर नाम या फोन नंबर का ठप्पा लगाएँ ताकि कोई कॉपी न करे।' },
      { title: 'गोपनीय दस्तावेज', desc: 'ऑफिस की फाइलों पर "CONFIDENTIAL" या "DRAFT" की मुहर लगाएँ।' },
      { title: 'ब्रांड प्रमोशन', desc: 'अपने स्टडी मटेरियल पर अपनी वेबसाइट या यूट्यूब चैनल का नाम जोड़ें।' }
    ]
  },

  // 7. Invoice & Receipt Cleaner
  'invoice-pdf-cleaner': {
    tipEn: 'Select "Darken Faded Print Text" to restore barely-visible thermal paper bills.',
    tipHi: 'दुकान के हल्के थर्मल बिल को गहरा करने के लिए "Darken Faded Print Text" चुनें।',
    whatEn: 'Invoice & Receipt Cleaner brightens dull mobile camera scans, wipes away gray shadows, and darkens weak dot-matrix or thermal fonts for razor-sharp printing.',
    whatHi: 'यह टूल मोबाइल से खींची गई रसीदों की काली परछाईं मिटाता है और हल्के पड़ चुके बिल के अक्षरों को गहरा काला कर देता है।',
    casesEn: [
      { title: 'Tax & Audit Filing', desc: 'Prepare crystal-clear expense receipts for tax deduction verification.' },
      { title: 'Faded Thermal Slips', desc: 'Restore fading supermarket, fuel, or courier bills before they vanish.' },
      { title: 'Ink-Efficient Printing', desc: 'Clean muddy grey backgrounds to avoid wasting black printer toner.' }
    ],
    casesHi: [
      { title: 'टैक्स और सीए फाइलिंग', desc: 'पेट्रोल और दुकान के बिल साफ करके सीए (CA) या आईटीआर में लगाने लायक बनाएँ।' },
      { title: 'मिटते हुए थर्मल बिल', desc: 'दुकान के हल्के पड़ चुके बिलों के अक्षर पक्के और काले करें।' },
      { title: 'साफ ज़ेरॉक्स प्रिंट', desc: 'ग्रे और काली परछाईं हटाकर सफेद बैकग्राउंड पर साफ प्रिंट निकालें।' }
    ]
  },

  // 8. Duplex Page Sorter
  'pdf-duplex-sorter': {
    tipEn: 'Scanned 1,3,5 then flipped the stack? Choose "Backs Inverted" for automated 1,2,3 ordering.',
    tipHi: 'अगर आपने पन्ने पलटकर उल्टे स्कैन किए हैं, तो "Backs Inverted" चुनते ही पेज 1,2,3 क्रम में आ जाएँगे।',
    whatEn: 'Duplex Page Sorter automatically weaves alternating front and back scanned pages into a seamless chronological sequence.',
    whatHi: 'यह टूल दोनों तरफ छपे पन्नों के आगे-पीछे स्कैन हुए पन्नों को अपने आप 1, 2, 3, 4 के सही क्रम में सजा देता है।',
    casesEn: [
      { title: 'Non-Duplex Scanners', desc: 'Scan 50 double-sided sheets on a basic single-sided scanner effortlessly.' },
      { title: 'Book & Agreement Scans', desc: 'Interleave odd and even page batches without manual re-arranging.' },
      { title: 'Digitization Projects', desc: 'Save hours of manual page shuffling in office scanning workflows.' }
    ],
    casesHi: [
      { title: 'साधारण स्कैनर से दोनों तरफ स्कैन', desc: 'बिना महंगे डुप्लेक्स स्कैनर के, साधारण स्कैनर से दोनों तरफ के पेज सही क्रम में लगाएँ।' },
      { title: 'किताब व एग्रीमेंट', desc: 'आगे और पीछे स्कैन हुए पन्नों को बिना हाथ से हिलाए एक सेकंड में सीधा करें।' },
      { title: 'ऑफिस का समय बचाना', desc: 'सैकड़ों पेजों को री-ऑर्डर करने का घंटों का काम एक क्लिक में निपटाएँ।' }
    ]
  },

  // 9. PDF DPI & Info Checker
  'pdf-dpi-checker': {
    tipEn: 'Files measuring 300 DPI are perfect for high-end offset printing, while 150 DPI is ideal for web.',
    tipHi: '300 DPI वाली फाइलें प्रेस प्रिंटिंग के लिए श्रेष्ठ होती हैं, और 150 DPI मोबाइल व वेब के लिए।',
    whatEn: 'PDF DPI & Info Checker performs technical diagnostics on your document, reporting exact millimeter/inch dimensions, page count, and print-resolution suitability.',
    whatHi: 'यह टूल आपकी PDF की पूरी टेक्निकल कुंडली खोलकर बताता है—DPI क्वालिटी, पेज का साइज (इंच/सेंटीमीटर में) और प्रिंटिंग ग्रेड।',
    casesEn: [
      { title: 'Pre-Press Inspection', desc: 'Verify book covers and banners meet 300 DPI resolution requirements.' },
      { title: 'Government Spec Checks', desc: 'Ensure uploaded certificates match specific height and width guidelines.' },
      { title: 'Metadata Discovery', desc: 'Check document title, creation tools, and embedded author details.' }
    ],
    casesHi: [
      { title: 'प्रेस और फ्लैक्स प्रिंटिंग', desc: 'छपाई से पहले चेक करें कि फाइल फटेगी तो नहीं (300 DPI है या नहीं)।' },
      { title: 'सरकारी भर्ती साइज चेक', desc: 'नापें कि आपकी मार्कशीट का साइज A4 स्टैंडर्ड में सही बैठ रहा है या नहीं।' },
      { title: 'फाइल की पूरी जानकारी', desc: 'पेज की लंबाई, चौड़ाई और ऑथर की जानकारी एक सेकंड में देखें।' }
    ]
  },

  // 10. Flatten PDF Form
  'flatten-pdf': {
    tipEn: 'Flattening merges active form fields directly into the page layer so they can never be modified.',
    tipHi: 'फ्लैटन करने से भरे हुए फॉर्म फील्ड्स हमेशा के लिए लॉक हो जाते हैं और कोई उन्हें बदल नहीं सकता।',
    whatEn: 'Flatten PDF Form converts interactive fillable form elements, checkboxes, and signatures into static, uneditable graphic elements.',
    whatHi: 'यह टूल आपके द्वारा भरे गए फॉर्म, टिक-मार्क और साइन को स्थायी प्रिंट बना देता है ताकि कोई उनमें छेड़छाड़ न कर सके।',
    casesEn: [
      { title: 'Signed Contract Finalization', desc: 'Lock signatures and contract values so other parties cannot edit them.' },
      { title: 'Government Submissions', desc: 'Ensure form dropdowns render identically on any viewer or print device.' },
      { title: 'Reduce Glitches', desc: 'Fix font errors where fillable text fields appear blank when opened on phones.' }
    ],
    casesHi: [
      { title: 'दस्तखत व कॉन्ट्रैक्ट सुरक्षा', desc: 'साइन किए हुए फॉर्म को लॉक करें ताकि दूसरा कोई नाम या पैसे न बदल सके।' },
      { title: 'मोबाइल रेंडरिंग सुधार', desc: 'कई बार फोन में भरे हुए फॉर्म खाली दिखते हैं, फ्लैटन करने से सब साफ दिखता है।' },
      { title: 'सरकारी टेंडर फॉर्म', desc: 'भरे हुए फॉर्म को फाइनल सबमिट करने के लिए सुरक्षित और लॉक बनाएँ।' }
    ]
  }
};

// Fallback for any other tools so it never repeats the same text
export function getToolKnowledge(slug: string, toolName: string): ToolKnowledge {
  if (toolKnowledgeBase[slug]) return toolKnowledgeBase[slug];

  return {
    tipEn: `Run ${toolName} locally without any server upload for guaranteed privacy.`,
    tipHi: `अपनी प्राइवेसी की 100% सुरक्षा के लिए ${toolName} को बिना किसी सर्वर अपलोड के चलाएँ।`,
    whatEn: `${toolName} is an ultra-fast client-side utility engineered to process your requests directly inside browser memory without third-party data tracking.`,
    whatHi: `${toolName} एक बेहद सुरक्षित और तेज़ ब्राउज़र टूल है जो आपकी फ़ाइल को बिना किसी सर्वर पर भेजे सीधे आपके फ़ोन/कंप्यूटर में प्रोसेस करता है।`,
    casesEn: [
      { title: 'Professional Workflows', desc: 'Speed up routine office tasks with zero file queues or download limits.' },
      { title: 'Student Projects', desc: 'Quickly format and prepare academic submissions directly on mobile.' },
      { title: 'Data Privacy & Security', desc: 'Ensure sensitive client data never leaves your device memory.' }
    ],
    casesHi: [
      { title: 'ऑफिस और दैनिक कार्य', desc: 'बिना किसी रुकावट या लिमिट के अपने रोजाना के काम तुरंत निपटाएँ।' },
      { title: 'छात्रों के लिए उपयोगी', desc: 'प्रोजेक्ट और पढ़ाई से जुड़े काम सीधे मोबाइल से एक क्लिक में करें।' },
      { title: 'डेटा सुरक्षा की गारंटी', desc: 'आपकी फाइल्स कहीं बाहर नहीं जातीं, इसलिए सुरक्षा की पूरी गारंटी है।' }
    ]
  };
}
