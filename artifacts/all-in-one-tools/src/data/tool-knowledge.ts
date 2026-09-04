export interface ToolKnowledge {
  tipEn: string;
  tipHi: string;
  whatEn: string;
  whatHi: string;
  casesEn: { title: string; desc: string }[];
  casesHi: { title: string; desc: string }[];
}

export const toolKnowledgeBase: Record<string, ToolKnowledge> = {
  // 1. PDF Merge
  'pdf-merge': {
    tipEn: 'Use the up/down arrows to order files correctly before merging into a single dossier.',
    tipHi: 'PDF को जोड़ने से पहले तीर के निशानों (↑/↓) से उनका सही क्रम सेट कर लें।',
    whatEn: 'Merge PDF combines multiple individual PDF files into a single, organized document with preserved page dimensions.',
    whatHi: 'यह टूल अलग-अलग PDF फाइलों को एक के पीछे एक जोड़कर एक व्यवस्थित फाइल बना देता है।',
    casesEn: [
      { title: 'Job Application Dossier', desc: 'Combine Resume, Cover Letter, and Degree Certificates into one upload.' },
      { title: 'Legal Case Bundles', desc: 'Unite agreements, affidavits, and annexures into a single dossier.' },
      { title: 'Tax Records', desc: 'Stitch monthly salary slips and receipts into one financial year file.' }
    ],
    casesHi: [
      { title: 'नौकरी के दस्तावेज', desc: 'रिज्यूमे, मार्कशीट और आधार कार्ड को एक ही फाइल में जोड़ें।' },
      { title: 'दुकान व बिजनेस बिल', desc: 'महीने भर के सारे इनवॉइस और रसीदें एक साथ नत्थी करें।' },
      { title: 'कॉलेज असाइनमेंट', desc: 'अलग-अलग चैप्टर्स को जोड़कर पूरी प्रोजेक्ट फाइल तैयार करें।' }
    ]
  },

  // 2. PDF Split
  'pdf-split': {
    tipEn: 'Use comma ranges like "1-3, 5, 8-10" to slice out custom sections accurately.',
    tipHi: 'पेज अलग करने के लिए कॉमा या रेंज का प्रयोग करें (जैसे 1-3, 5, 8)।',
    whatEn: 'Split PDF breaks a large multi-page document into smaller, targeted files by your exact page boundaries.',
    whatHi: 'यह टूल बड़ी PDF में से आपके चुने हुए पेजों को काटकर अलग-अलग छोटी PDF में बाँट देता है।',
    casesEn: [
      { title: 'Share Specific Chapters', desc: 'Extract and share just one chapter from an entire textbook.' },
      { title: 'Isolate Invoices', desc: 'Pull a single client bill out of a 200-page accounting export.' },
      { title: 'Remove Clutter', desc: 'Extract essential pages and discard bulky blank end sheets.' }
    ],
    casesHi: [
      { title: 'किताब से जरूरी पाठ', desc: '500 पेज की किताब से केवल वही चैप्टर निकालें जो आपको पढ़ना है।' },
      { title: 'सैलरी स्लिप अलग करना', desc: 'कंपनी की पूरी लिस्ट से सिर्फ अपनी स्लिप काटकर सेव करें।' },
      { title: 'आवेदन फॉर्म के पेज', desc: 'नोटिफिकेशन के 50 पन्नों में से सिर्फ फॉर्म वाले 2 पेज अलग करें।' }
    ]
  },

  // 3. PDF Compress
  'pdf-compress': {
    tipEn: 'Type your exact target in KB (e.g. 100 or 200) to meet recruitment portal limits.',
    tipHi: 'सरकारी पोर्टल की तय लिमिट के हिसाब से सटीक KB (जैसे 100 या 200) टाइप करें।',
    whatEn: 'Compress PDF optimizes document streams, removing duplicate fonts and metadata to shrink file size with clear text.',
    whatHi: 'यह टूल PDF की लिखावट धुंधली किए बिना उसका साइज़ बहुत छोटा कर देता है ताकि वह तुरंत अपलोड हो सके।',
    casesEn: [
      { title: 'Recruitment Portals', desc: 'Meet strict 100KB–300KB upload limits on government job applications.' },
      { title: 'Email Attachments', desc: 'Stay comfortably under standard 25MB email size boundaries.' },
      { title: 'Mobile Device Storage', desc: 'Lighten heavy e-books and study slides on low-storage devices.' }
    ],
    casesHi: [
      { title: 'सरकारी नौकरी फॉर्म', desc: 'SSC, UPSC, रेलवे फॉर्म में माँगी गई 100KB/200KB लिमिट में फिट करें।' },
      { title: 'WhatsApp व ईमेल शेयरिंग', desc: 'बड़ी PDF का साइज़ कम करके बिना रुके तेजी से भेजें।' },
      { title: 'फोन मेमोरी की बचत', desc: 'भारी फाइलों को हल्का करके मोबाइल स्टोरेज खाली करें।' }
    ]
  },

  // 4. PDF to Images
  'pdf-to-images': {
    tipEn: 'Select PNG for razor-sharp text clarity, or JPG for ultra-light mobile file sizes.',
    tipHi: 'साफ अक्षरों के लिए PNG चुनें, और कम साइज़ की हल्की फोटो के लिए JPG चुनें।',
    whatEn: 'PDF to Images converts every page of your PDF into high-definition, standalone image files ready for graphic use.',
    whatHi: 'यह टूल PDF के हर पन्ने को अलग-अलग हाई-क्वालिटी फोटो (JPG या PNG) में बदल देता है।',
    casesEn: [
      { title: 'Social Media Carousels', desc: 'Turn PDF slides and infographics into shareable image posts.' },
      { title: 'Presentation Slides', desc: 'Drop specific document diagrams directly into PowerPoint or Canva.' },
      { title: 'Quick Photo Proofs', desc: 'Send a single-page receipt image over chat without sending a full PDF.' }
    ],
    casesHi: [
      { title: 'सोशल मीडिया पोस्ट', desc: 'PDF नोट्स या जानकारी को फोटो बनाकर WhatsApp स्टेटस या इंस्टाग्राम पर डालें।' },
      { title: 'प्रेजेंटेशन व प्रोजेक्ट', desc: 'PDF के जरूरी चार्ट या डायग्राम को फोटो बनाकर PPT में लगाएँ।' },
      { title: 'ऑनलाइन फॉर्म डॉक्यूमेंट', desc: 'जहाँ सिर्फ फोटो (JPG) अपलोड करने को कहा गया हो, वहाँ PDF को फोटो बनाएँ।' }
    ]
  },

  // 5. Images to PDF
  'images-to-pdf': {
    tipEn: 'Choose "Portrait" and keep "Clean Margins" checked for formal, standardized A4 reports.',
    tipHi: 'ऑफिशियल A4 लुक के लिए "Portrait" और "Clean Margins" विकल्प चालू रखें।',
    whatEn: 'Images to PDF bundles multiple photos into a single, standardized, and professionally aligned PDF dossier.',
    whatHi: 'यह टूल कैमरे से खींची गई अलग-अलग फोटो को एक के पीछे एक जोड़कर एक व्यवस्थित PDF बना देता है।',
    casesEn: [
      { title: 'Homework & Assignments', desc: 'Snap photos of handwritten pages and export a unified PDF.' },
      { title: 'KYC Verification Bundles', desc: 'Pack Passport, Driving License, and utility bills into one document.' },
      { title: 'Receipt Aggregation', desc: 'Convert multiple expense slips into a single monthly expense claim.' }
    ],
    casesHi: [
      { title: 'हाथ से लिखे नोट्स', desc: 'कॉपी के पन्नों की फोटो खींचकर एक साफ कॉलेज असाइनमेंट PDF तैयार करें।' },
      { title: 'KYC और आईडी प्रूफ', desc: 'आधार, पैन और बैंक पासबुक की तस्वीरों को जोड़कर एक PDF बनाएँ।' },
      { title: 'बिल और रसीदें', desc: 'दुकान या यात्रा के सभी बिलों की फोटो को एक वाउचर PDF में बदलें।' }
    ]
  },

  // 6. Rotate PDF
  'pdf-rotate': {
    tipEn: 'Use 90° Clockwise to fix landscape scans that were inadvertently saved upright.',
    tipHi: 'उल्टे या आड़े स्कैन हुए पन्नों को सीधा करने के लिए 90° या 180° का उपयोग करें।',
    whatEn: 'Rotate PDF permanently re-aligns page orientation across 90°, 180°, or 270° without corrupting underlying text.',
    whatHi: 'यह टूल उल्टी या तिरछी स्कैन हुई PDF को हमेशा के लिए सीधा और पढ़ने लायक बना देता है।',
    casesEn: [
      { title: 'Upside-Down Mobile Scans', desc: 'Fix camera-scanned documents that exported upside down.' },
      { title: 'Landscape Spreadsheets', desc: 'Rotate financial balance sheets so they can be read without head-tilting.' },
      { title: 'Pre-Print Alignment', desc: 'Ensure all pages face the feeder direction before mass double-sided printing.' }
    ],
    casesHi: [
      { title: 'उल्टे स्कैन हुए पन्ने', desc: 'स्कैनर में गलती से उल्टे लगे पन्नों को एक क्लिक में सीधा करें।' },
      { title: 'आड़े चार्ट और टेबल', desc: 'चौड़े डेटा और एक्सेल शीट वाले पन्नों को पढ़ने लायक दिशा में घुमाएँ।' },
      { title: 'प्रिंटिंग से पहले सुधार', desc: 'प्रिंट निकालने से पहले सभी पन्नों की दिशा सीधी सुनिश्चित करें।' }
    ]
  },

  // 7. Delete PDF Pages
  'pdf-delete-pages': {
    tipEn: 'Enter specific pages like "1, 4-6" to purge redundant blank or index sheets.',
    tipHi: 'फालतू या खाली पन्नों को हटाने के लिए पेज नंबर लिखें (जैसे 1, 4-6)।',
    whatEn: 'Delete PDF Pages strips unwanted pages from your document while rebuilding internal references cleanly.',
    whatHi: 'यह टूल PDF में से बेकार, खाली या गलत छपे पन्नों को बीच में से हमेशा के लिए हटा देता है।',
    casesEn: [
      { title: 'Remove Blank Sheets', desc: 'Eliminate blank trailer pages generated by desktop scanners.' },
      { title: 'Purge Confidential Pages', desc: 'Strip private cover notes or pricing annexures before public distribution.' },
      { title: 'Trim Large Manuals', desc: 'Delete foreign language chapters from multi-lingual user manuals.' }
    ],
    casesHi: [
      { title: 'खाली पन्ने मिटाना', desc: 'स्कैनर से आए खाली या सफेद पेजों को बीच में से डिलीट करें।' },
      { title: 'प्राइवेट पेज हटाना', desc: 'किसी को फाइल भेजने से पहले उसमें से गोपनीय जानकारी वाला पेज हटाएँ।' },
      { title: 'किताब से फालतू पेज', desc: 'नोट्स में से विज्ञापन या कवर पेज हटाकर सिर्फ काम के पेज रखें।' }
    ]
  },

  // 8. Extract Pages
  'pdf-extract-pages': {
    tipEn: 'Ideal for pulling standalone certificates out of a complete 50-page academic file.',
    tipHi: 'बड़ी फाइल में से सिर्फ अपना सर्टिफिकेट या जरूरी पन्ना निकालकर अलग करने के लिए उत्तम।',
    whatEn: 'Extract Pages copies selected pages into a fresh, lightweight PDF without altering the original master file.',
    whatHi: 'यह टूल मूल PDF को छुए बिना, उसमें से आपके चुने हुए पेजों की एक नई अलग PDF बना देता है।',
    casesEn: [
      { title: 'Selective Quotations', desc: 'Send clients only the 2 pricing pages from a 40-page corporate pitch.' },
      { title: 'Degree Certificates', desc: 'Isolate graduation degrees from an aggregated academic transcript.' },
      { title: 'Court Filings', desc: 'Extract key clauses and annexures for immediate evidentiary filing.' }
    ],
    casesHi: [
      { title: 'सिर्फ काम का पन्ना', desc: '40 पेज के प्रोजेक्ट में से सिर्फ निष्कर्ष या बिल वाला पेज अलग करें।' },
      { title: 'सर्टिफिकेट अलग करना', desc: 'पूरी मार्कशीट बुकलेट में से केवल मुख्य डिग्री निकालकर सेव करें।' },
      { title: 'कोर्ट व सरकारी काम', desc: 'बड़ी फाइल से सिर्फ जरूरी शपथ पत्र या हलफनामा अलग निकालें।' }
    ]
  },

  // 9. Watermark PDF
  'pdf-watermark': {
    tipEn: 'Set opacity between 15% and 25% so study material remains legible while preventing piracy.',
    tipHi: 'ओपेसिटी 15% से 25% रखें ताकि लिखावट साफ दिखे और कोई नोट्स चुरा भी न सके।',
    whatEn: 'Watermark PDF stamps translucent branding, status marks, or copyright notices diagonally across every page.',
    whatHi: 'यह टूल आपकी PDF के हर पन्ने पर आपकी कोचिंग, ब्रांड या नाम का हल्का वॉटरमार्क लगा देता है।',
    casesEn: [
      { title: 'Coaching Notes Protection', desc: 'Prevent unauthorized re-selling and distribution of proprietary study notes.' },
      { title: 'Enterprise Status Stamps', desc: 'Stamp "DRAFT", "CONFIDENTIAL", or "FINAL APPROVED" across office memos.' },
      { title: 'Brand Watermarking', desc: 'Embed your contact number or company website across shared research PDFs.' }
    ],
    casesHi: [
      { title: 'कोचिंग नोट्स सुरक्षा', desc: 'स्टडी मटेरियल पर अपना नाम या फोन नंबर लगाएँ ताकि कोई कॉपी न करे।' },
      { title: 'ऑफिस स्टेटस मुहर', desc: 'फाइल पर "CONFIDENTIAL", "DRAFT" या "URGENT" का पक्का ठप्पा लगाएँ।' },
      { title: 'ब्रांड प्रमोशन', desc: 'नोट्स में अपनी वेबसाइट या यूट्यूब चैनल का नाम जोड़ें।' }
    ]
  },

  // 10. Remove Metadata
  'pdf-metadata-remover': {
    tipEn: 'Always sanitize files before public distribution to strip author names, dates, and software traces.',
    tipHi: 'पब्लिक में शेयर करने से पहले फाइल से अपना नाम, तारीख और कंप्यूटर की जानकारी हटाएँ।',
    whatEn: 'Remove Metadata strips hidden tracking data including author identities, edit histories, and scanner models.',
    whatHi: 'यह टूल PDF के अंदर छुपा हुआ ऑथर का नाम, कंप्यूटर सॉफ्टवेयर और एडिट तारीख पूरी तरह मिटा देता है।',
    casesEn: [
      { title: 'Anonymous Whistleblowing', desc: 'Publish investigative documents without revealing personal software traces.' },
      { title: 'Competitive Bidding', desc: 'Clean proprietary template names and revision dates before submitting RFPs.' },
      { title: 'Privacy Sanitization', desc: 'Remove GPS coordinates and camera models from PDF image attachments.' }
    ],
    casesHi: [
      { title: 'पहचान गोपनीय रखना', desc: 'फाइल से लेखक का नाम और लैपटॉप की जानकारी हटाकर 100% प्राइवेट बनाएँ।' },
      { title: 'सरकारी टेंडर और बिडिंग', desc: 'पुराने कोटेशन की तारीखें और सॉफ्टवेयर फुटप्रिंट साफ करें।' },
      { title: 'डिजिटल प्राइवेसी', desc: 'सोशल मीडिया पर शेयर करने से पहले डॉक्यूमेंट का आंतरिक डेटा हटाएं।' }
    ]
  },

  // 11. Protect PDF
  'protect-pdf': {
    tipEn: 'Use a strong mix of letters and numbers; the password will be required every time the file opens.',
    tipHi: 'मजबूत पासवर्ड रखें; फाइल जब भी खुलेगी, यह पासवर्ड डालना अनिवार्य होगा।',
    whatEn: 'Protect PDF encrypts your document with password-locked access, preventing unauthorized reading and copying.',
    whatHi: 'यह टूल आपकी PDF पर मजबूत पासवर्ड लॉक लगा देता है ताकि आपके बिना कोई उसे न खोल सके।',
    casesEn: [
      { title: 'Confidential Payroll', desc: 'Encrypt monthly employee salary slips before bulk emailing.' },
      { title: 'Client Tax Submissions', desc: 'Protect sensitive bank statements and audit reports from prying eyes.' },
      { title: 'Proprietary Research', desc: 'Lock pre-release research manuscripts and proprietary formulas.' }
    ],
    casesHi: [
      { title: 'सैलरी स्लिप सुरक्षा', desc: 'कर्मचारियों की सैलरी स्लिप पर पासवर्ड लगाएँ ताकि कोई दूसरा न देख सके।' },
      { title: 'बैंक व टैक्स दस्तावेज', desc: 'आईटीआर और बैंक स्टेटमेंट को पासवर्ड से सुरक्षित करके शेयर करें।' },
      { title: 'पर्सनल सर्टिफिकेट्स', desc: 'अपने निजी दस्तावेजों को पासवर्ड से लॉक करके ड्राइव पर रखें।' }
    ]
  },

  // 12. Unlock PDF
  'unlock-pdf': {
    tipEn: 'Enter the current password once to strip encryption permanently for restriction-free sharing.',
    tipHi: 'एक बार सही पासवर्ड डालें, फाइल हमेशा के लिए बिना पासवर्ड के खुलने लगेगी।',
    whatEn: 'Unlock PDF decrypts password-protected documents, removing access blocks permanently.',
    whatHi: 'यह टूल पासवर्ड लगी हुई PDF का लॉक हमेशा के लिए हटा देता है ताकि उसे बार-बार पासवर्ड न डालना पड़े।',
    casesEn: [
      { title: 'Bank Statement Automation', desc: 'Remove monthly e-statement passwords so accounting software can parse data.' },
      { title: 'Print Without Popups', desc: 'Send unlocked documents directly to office printers without password prompts.' },
      { title: 'Unified Merging', desc: 'Strip protection before combining multiple statements into a single file.' }
    ],
    casesHi: [
      { title: 'बैंक स्टेटमेंट का लॉक हटाना', desc: 'हर बार पासवर्ड डालने के झंझट से मुक्ति पाएँ और आसानी से प्रिंट निकालें।' },
      { title: 'आधार कार्ड PDF अनलॉक', desc: 'ई-आधार का पासवर्ड हमेशा के लिए हटाकर सामान्य PDF में बदलें।' },
      { title: 'अकाउंटेंट को फाइल भेजना', desc: 'पासवर्ड हटाकर सीए (CA) को भेजें ताकि वे सीधे काम कर सकें।' }
    ]
  },

  // 13. Add Page Numbers
  'pdf-page-number': {
    tipEn: 'Check "Skip First Page" so your cover or title page remains clean and unnumbered.',
    tipHi: 'कवर पेज या इंडेक्स को बिना नंबर के रखने के लिए "Skip First Page" चालू करें।',
    whatEn: 'Add Page Numbers stamps clean, customizable numbering (e.g. "Page 1 of N") across headers or footers.',
    whatHi: 'यह टूल PDF के सभी पन्नों पर नीचे या ऊपर सुंदर पेज नंबर (जैसे 1, 2, 3 या Page 1 of 10) डाल देता है।',
    casesEn: [
      { title: 'Academic Dissertations', desc: 'Meet university formatting guidelines requiring indexed page numbers.' },
      { title: 'Legal Court Submissions', desc: 'Ensure every page in evidence filings matches court index registries.' },
      { title: 'Printed Training Manuals', desc: 'Help trainees find sections quickly during workshops and classes.' }
    ],
    casesHi: [
      { title: 'कॉलेज थीसिस व प्रोजेक्ट', desc: 'यूनिवर्सिटी नियमों के अनुसार सभी पन्नों पर क्रमबद्ध पेज नंबर लगाएँ।' },
      { title: 'कोर्ट व कानूनी दस्तावेज', desc: 'वकालत और केस फाइलिंग में इंडेक्स के हिसाब से पेज नंबरिंग करें।' },
      { title: 'किताब व कोचिंग नोट्स', desc: 'छात्रों की सुविधा के लिए नोट्स के नीचे सुंदर पेज नंबर डालें।' }
    ]
  },

  // 14. Grayscale PDF
  'pdf-grayscale': {
    tipEn: 'Converts full-color PDFs to monochrome, drastically reducing ink consumption on office printers.',
    tipHi: 'रंगीन PDF को ब्लैक एंड व्हाइट बनाकर प्रिंटर की महंगी स्याही (इंक) बचाएँ।',
    whatEn: 'Grayscale PDF strips all color saturation, converting graphics and text into uniform black and grayscale tones.',
    whatHi: 'यह टूल रंगीन PDF को साफ ब्लैक एंड व्हाइट में बदल देता है ताकि ज़ेरॉक्स और प्रिंट सस्ता निकले।',
    casesEn: [
      { title: 'Cost-Effective Office Printing', desc: 'Prevent high-rate color cartridge billing for routine internal memos.' },
      { title: 'Official Xerox Submissions', desc: 'Ensure colored stamps and watermarks convert into high-contrast monochrome.' },
      { title: 'Clean Newspaper Archives', desc: 'Standardize historical news clippings into uniform grayscale archives.' }
    ],
    casesHi: [
      { title: 'प्रिंटिंग के पैसे बचाना', desc: 'ऑफिस और कॉलेज में रंगीन प्रिंट के महंगे खर्चे से बचें।' },
      { title: 'ज़ेरॉक्स मशीन के अनुकूल', desc: 'हल्के नीले या पीले बैकग्राउंड को सफेद और टेक्स्ट को गहरा काला करें।' },
      { title: 'सरकारी चालान व रसीद', desc: 'रंगीन चालान को साफ ब्लैक एंड व्हाइट बनाकर जमा करें।' }
    ]
  },

  // 15. Crop PDF
  'pdf-crop': {
    tipEn: 'Use 25pt to automatically trim away ugly scanner border shadows and punched-hole marks.',
    tipHi: 'स्कैनर से आए काले किनारों और पंच-होल के निशानों को काटने के लिए 25pt चुनें।',
    whatEn: 'Crop PDF trims excess white borders and scanner margins across every page uniformly.',
    whatHi: 'यह टूल PDF के चारों तरफ की फालतू खाली जगह और काले किनारों को काटकर बिल्कुल फिट कर देता है।',
    casesEn: [
      { title: 'Mobile E-Reader Optimization', desc: 'Trim margins so text expands to fill smartphone and Kindle screens.' },
      { title: 'Clean Scanned Borders', desc: 'Remove black scanner glass shadow lines from edge margins.' },
      { title: 'Slide Preparation', desc: 'Crop document pages into compact figures for digital presentation slides.' }
    ],
    casesHi: [
      { title: 'मोबाइल पर पढ़ाई आसान', desc: 'किनारे की सफेद खाली जगह काटकर टेक्स्ट बड़ा करें ताकि फोन में साफ दिखे।' },
      { title: 'स्कैनर के काले किनारे हटाना', desc: 'दस्तावेज स्कैन करते समय आई काली धारियों को ट्रिम करें।' },
      { title: 'प्रिंटिंग कटिंग लाइन', desc: 'पेज को बिल्कुल सही मार्जिन में सेट करके प्रिंट लायक बनाएँ।' }
    ]
  },

  // 16. PDF 2-in-1 / 4-in-1
  'pdf-nup': {
    tipEn: 'Pick "4-in-1" to create ultra-compact pocket-sized revision formula sheets.',
    tipHi: 'रिवीजन नोट्स और फॉर्मूला शीट को छोटा बनाने के लिए "4-in-1" विकल्प चुनें।',
    whatEn: 'PDF 2-in-1 / 4-in-1 arranges multiple pages onto a single sheet, cutting paper and printing costs.',
    whatHi: 'यह टूल 2 या 4 पन्नों को एक ही शीट पर प्रिंट करने के लिए सेट करता है, जिससे कागज़ का खर्च आधा हो जाता है।',
    casesEn: [
      { title: 'Lecture Slides Consolidation', desc: 'Print 100 presentation slides on just 25 or 50 sheets.' },
      { title: 'Pocket Formula Guides', desc: 'Generate miniature cheat-sheets for fast exam revision.' },
      { title: 'Eco-Friendly Printing', desc: 'Cut paper consumption and parcel postage weights significantly.' }
    ],
    casesHi: [
      { title: 'कॉलेज नोट्स प्रिंटिंग', desc: '100 पन्नों की लंबी PDF को सिर्फ 25 या 50 पन्नों में प्रिंट करवाएँ।' },
      { title: 'पॉकेट रिवीजन गाइड', desc: 'एग्जाम से पहले दोहराने के लिए छोटी फॉर्मूला बुकलेट बनाएँ।' },
      { title: 'कागज़ और पैसे की बचत', desc: 'साइबर कैफे में प्रिंट का बिल 50% से 75% तक कम करें।' }
    ]
  },

  // 17. Add Header & Footer
  'pdf-header-footer': {
    tipEn: 'Use dynamic tokens like date or organization names to brand formal documentation.',
    tipHi: 'हेडर में संस्थान का नाम और फुटर में जरूरी नोटिस या तारीख डालें।',
    whatEn: 'Add Header & Footer stamps running titles, dates, or legal notices across document margins.',
    whatHi: 'यह टूल PDF के ऊपरी हिस्से (हेडर) और निचले हिस्से (फुटर) में कंपनी का नाम या नोटिस जोड़ता है।',
    casesEn: [
      { title: 'Official Reports', desc: 'Stamp "CONFIDENTIAL / INTERNAL AUDIT" on corporate documentation.' },
      { title: 'Academic Submissions', desc: 'Add course codes and university enrollment numbers to assignments.' },
      { title: 'Client Quotations', desc: 'Ensure company registration numbers appear across all contract pages.' }
    ],
    casesHi: [
      { title: 'ऑफिस रिपोर्ट ब्रांडिंग', desc: 'हर पन्ने पर ऊपर अपनी कंपनी या विभाग का नाम हेडर में लगाएँ।' },
      { title: 'कॉलेज असाइनमेंट', desc: 'फुटर में अपना रोल नंबर और विषय का नाम पक्के तौर पर जोड़ें।' },
      { title: 'कोटेशन व बिल नोटिस', desc: 'नीचे नियम व शर्तें या "मान्य केवल 30 दिन" का नोटिस छापें।' }
    ]
  },

  // 18. Reverse PDF Pages
  'pdf-reverse-pages': {
    tipEn: 'Inverts the entire page sequence so the last page becomes page 1 instantly.',
    tipHi: 'पूरी PDF को उल्टा कर देता है जिससे अंतिम पेज पहला पेज बन जाता है।',
    whatEn: 'Reverse PDF Pages flips document page ordering from back-to-front in a single click.',
    whatHi: 'यह टूल उल्टे स्कैन हुए पन्नों के क्रम को पलटकर सीधा (1, 2, 3...) कर देता है।',
    casesEn: [
      { title: 'Face-Down Scans', desc: 'Fix documents fed face-down that ended up scanned in reverse order.' },
      { title: 'Flipped Book Binding', desc: 'Reverse print queues to match specific printer duplex trays.' },
      { title: 'Presentation Prep', desc: 'Reverse presentation decks to review summary slides first.' }
    ],
    casesHi: [
      { title: 'उल्टे स्कैन हुए डॉक्यूमेंट', desc: 'जब स्कैनर पीछे से आगे स्कैन कर दे, तो एक क्लिक में सही क्रम लाएँ।' },
      { title: 'प्रिंटर ट्रे की सेटिंग', desc: 'प्रिंटर में सही क्रम में निकलने के लिए पेजों का क्रम पलटें।' },
      { title: 'उलटी फाइल को सीधा करना', desc: 'अंतिम पेज से पहले पेज की तरफ जमी फाइल को सही करें।' }
    ]
  },

  // 19. Extract Embedded Images
  'pdf-extract-images': {
    tipEn: 'Extracts full-resolution raster photos, diagrams, and logos embedded inside the PDF.',
    tipHi: 'PDF के अंदर मौजूद ओरिजिनल क्वालिटी की तस्वीरें, लोगो और फोटो बाहर निकालें।',
    whatEn: 'Extract Embedded Images pulls isolated image files from your document without quality loss.',
    whatHi: 'यह टूल PDF में लगी पासपोर्ट साइज फोटो, नक्शे और लोगो को ओरिजिनल क्वालिटी में बाहर निकाल देता है।',
    casesEn: [
      { title: 'Passport Photo Retrieval', desc: 'Extract clean candidate photos from uploaded admission PDFs.' },
      { title: 'Design Asset Recovery', desc: 'Salvage high-res company logos and graphics from old reports.' },
      { title: 'Catalog Photography', desc: 'Pull product photos out of vendor PDF catalogs for web shop uploads.' }
    ],
    casesHi: [
      { title: 'पासपोर्ट फोटो निकालना', desc: 'एडमिट कार्ड या फॉर्म की PDF से अपनी ओरिजिनल पासपोर्ट फोटो बाहर निकालें।' },
      { title: 'कंपनी लोगो व ग्राफिक्स', desc: 'पुरानी ब्रोशर PDF से हाई-क्वालिटी लोगो और बैनर वापस पाएँ।' },
      { title: 'कैटलॉग से प्रोडक्ट फोटो', desc: 'सप्लायर की PDF से सामान की तस्वीरें निकालकर ई-कॉमर्स पर लगाएँ।' }
    ]
  },

  // 20. Extract Text from PDF
  'pdf-extract-text': {
    tipEn: 'Copy plain text directly or download a clean .txt file without formatting artifacts.',
    tipHi: 'PDF से केवल शुद्ध टेक्स्ट कॉपी करें या सीधे .txt फाइल डाउनलोड करें।',
    whatEn: 'Extract Text pulls raw editable text content out of document pages for instant copying.',
    whatHi: 'यह टूल PDF के अंदर मौजूद टेक्स्ट को बाहर निकालता है ताकि आप उसे कहीं भी कॉपी-पेस्ट कर सकें।',
    casesEn: [
      { title: 'Research & Citations', desc: 'Pull paragraphs and tables from academic papers without retyping.' },
      { title: 'Scraped Data Analysis', desc: 'Convert reports and whitepapers into raw text for analysis.' },
      { title: 'Language Translation', desc: 'Quickly feed document text into translation tools.' }
    ],
    casesHi: [
      { title: 'नोट्स और असाइनमेंट', desc: 'किताबों या गाइड की PDF से जरूरी पैराग्राफ बिना दोबारा टाइप किए कॉपी करें।' },
      { title: 'प्रोजेक्ट रिपोर्ट', desc: 'सरकारी नोटिफिकेशन से काम की जानकारी निकालकर वर्ड में पेस्ट करें।' },
      { title: 'आसान ट्रांसलेशन', desc: 'अंग्रेजी PDF के टेक्स्ट को कॉपी करके सीधे ट्रांसलेटर में डालें।' }
    ]
  },

  // 21. Lightweight PDF Viewer
  'pdf-viewer': {
    tipEn: 'Read, inspect, and verify documents privately inside your browser without installing Adobe Reader.',
    tipHi: 'बिना कोई भारी सॉफ्टवेयर या ऐप डाले सीधे ब्राउज़र में सुरक्षित रूप से PDF पढ़ें।',
    whatEn: 'Lightweight PDF Viewer renders documents locally in your browser with zero data tracking.',
    whatHi: 'यह टूल बिना एडोब रीडर डाउनलोड किए सीधे आपके फोन पर तेज गति से PDF पढ़ने की सुविधा देता है।',
    casesEn: [
      { title: 'Fast Document Inspection', desc: 'Check page contents before emailing or printing on public PCs.' },
      { title: 'Secure Contract Review', desc: 'Read private legal files without letting desktop readers phone home.' },
      { title: 'Low-Memory Devices', desc: 'Open complex PDFs smoothly on budget smartphones and Chromebooks.' }
    ],
    casesHi: [
      { title: 'बिना ऐप के PDF पढ़ना', desc: 'बिना भारी Adobe Reader इंस्टॉल किए किसी भी फोन में तुरंत फाइल खोलें।' },
      { title: 'सुरक्षित एग्रीमेंट रिव्यू', desc: 'गोपनीय फाइलों को बिना किसी सर्वर रिस्क के सुरक्षित स्क्रीन पर पढ़ें।' },
      { title: 'धीमे फोन में तेज परफॉर्मेंस', desc: 'कम रैम वाले सस्ते स्मार्टफोन में भी बिना हैंग हुए फाइल तुरंत खुलती है।' }
    ]
  },

  // 22. Flatten PDF Form
  'flatten-pdf': {
    tipEn: 'Flattening burns interactive form fields into permanent page graphics so entries cannot be altered.',
    tipHi: 'फ्लैटन करने से भरे हुए फॉर्म फील्ड्स हमेशा के लिए लॉक हो जाते हैं और कोई उन्हें बदल नहीं सकता।',
    whatEn: 'Flatten PDF Form converts interactive checkboxes and text fields into static graphic elements.',
    whatHi: 'यह टूल आपके द्वारा भरे गए फॉर्म, टिक-मार्क और साइन को स्थायी प्रिंट बना देता है ताकि कोई छेड़छाड़ न हो।',
    casesEn: [
      { title: 'Signed Contract Finalization', desc: 'Lock signatures and contract values so other parties cannot edit them.' },
      { title: 'Government Submissions', desc: 'Ensure form dropdowns render identically on any device or printer.' },
      { title: 'Eliminate Mobile Blank Glitches', desc: 'Fix font errors where fillable text fields appear blank on phones.' }
    ],
    casesHi: [
      { title: 'दस्तखत व कॉन्ट्रैक्ट सुरक्षा', desc: 'साइन किए हुए फॉर्म को लॉक करें ताकि दूसरा कोई नाम या पैसे न बदल सके।' },
      { title: 'मोबाइल रेंडरिंग सुधार', desc: 'कई बार फोन में भरे हुए फॉर्म खाली दिखते हैं, फ्लैटन करने से सब साफ दिखता है।' },
      { title: 'सरकारी टेंडर फॉर्म', desc: 'भरे हुए फॉर्म को फाइनल सबमिट करने के लिए सुरक्षित और लॉक बनाएँ।' }
    ]
  },

  // 23. PDF DPI & Info Checker
  'pdf-dpi-checker': {
    tipEn: '300 DPI files are suitable for commercial offset printing, while 150 DPI is ideal for web.',
    tipHi: '300 DPI वाली फाइलें प्रेस प्रिंटिंग के लिए श्रेष्ठ होती हैं, और 150 DPI मोबाइल व वेब के लिए।',
    whatEn: 'PDF DPI & Info Checker performs technical diagnostics, reporting exact millimeter dimensions, page counts, and DPI resolution.',
    whatHi: 'यह टूल आपकी PDF की पूरी टेक्निकल कुंडली खोलकर बताता है—DPI क्वालिटी, पेज का साइज और प्रिंटिंग ग्रेड।',
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

  // 24. Duplex Page Sorter
  'pdf-duplex-sorter': {
    tipEn: 'Scanned 1,3,5 then flipped the stack? Choose "Backs Inverted" for automated 1,2,3 ordering.',
    tipHi: 'अगर आपने पन्ने पलटकर उल्टे स्कैन किए हैं, तो "Backs Inverted" चुनते ही पेज 1,2,3 क्रम में आ जाएँगे।',
    whatEn: 'Duplex Page Sorter automatically weaves alternating front and back scanned pages into chronological order.',
    whatHi: 'यह टूल दोनों तरफ छपे पन्नों के आगे-पीछे स्कैन हुए पन्नों को अपने आप 1, 2, 3, 4 के सही क्रम में सजा देता है।',
    casesEn: [
      { title: 'Non-Duplex Scanners', desc: 'Scan 50 double-sided sheets on a basic single-sided scanner effortlessly.' },
      { title: 'Book & Agreement Scans', desc: 'Interleave odd and even page batches without manual re-arranging.' },
      { title: 'Digitization Projects', desc: 'Save hours of manual page shuffling in office scanning workflows.' }
    ],
    casesHi: [
      { title: 'साधारण स्कैनर से दोनों तरफ स्कैन', desc: 'बिना महंगे डुप्लेक्स स्कैनर के साधारण स्कैनर से दोनों तरफ के पेज क्रम में लगाएँ।' },
      { title: 'किताब व एग्रीमेंट', desc: 'आगे और पीछे स्कैन हुए पन्नों को बिना हाथ से हिलाए एक सेकंड में सीधा करें।' },
      { title: 'ऑफिस का समय बचाना', desc: 'सैकड़ों पेजों को री-ऑर्डर करने का घंटों का काम एक क्लिक में निपटाएँ।' }
    ]
  },

  // 25. Invoice & Receipt Cleaner
  'invoice-pdf-cleaner': {
    tipEn: 'Select "Darken Faded Print Text" to restore faint thermal store receipts for tax filing.',
    tipHi: 'दुकान के हल्के थर्मल बिल को गहरा करने के लिए "Darken Faded Print Text" चुनें।',
    whatEn: 'Invoice & Receipt Cleaner removes gray camera shadows and darkens faint dot-matrix or thermal fonts.',
    whatHi: 'यह टूल मोबाइल से खींची गई रसीदों की काली परछाईं मिटाता है और हल्के बिल के अक्षरों को गहरा काला करता है।',
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
  }
};

// Fallback logic
export function getToolKnowledge(slug: string, toolName: string): ToolKnowledge {
  if (toolKnowledgeBase[slug]) return toolKnowledgeBase[slug];

  return {
    tipEn: `Run ${toolName} locally without any server upload for guaranteed privacy.`,
    tipHi: `अपनी प्राइवेसी की 100% सुरक्षा के लिए ${toolName} को बिना किसी सर्वर अपलोड के चलाएँ।`,
    whatEn: `${toolName} is a client-side utility engineered to process requests directly inside browser memory.`,
    whatHi: `${toolName} एक सुरक्षित और तेज़ ब्राउज़र टूल है जो आपकी फ़ाइल को बिना सर्वर पर भेजे सीधे प्रोसेस करता है।`,
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
