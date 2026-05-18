import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Layers, FileCheck, AlertCircle, List } from 'lucide-react';

const translations = {
  en: {
    headerSub: 'Services & Pricing',
    backToPortfolio: '← Back to Portfolio',
    whatIDo: 'Drawing · Design · Documentation',
    heroTitle1: 'Architectural Drawing &',
    heroTitle2: 'Documentation Services',
    heroTagline:
      'Providing professional architectural drawings and documentation for residential and commercial projects. With experience in both Australian and Thai standards, I deliver clear, buildable, and approval-ready drawings tailored to each project.',
    heroCredentials: '3+ years experience in architectural drafting · Bachelor of Design in Architecture (UTS)',
    packagesLabel: 'Services & Pricing',
    mostPopular: 'Most Popular',
    pricing: 'Pricing',
    startingFrom: 'Starting from',
    orText: 'or',
    includes: 'Includes',
    pricingNote: 'Final pricing will be confirmed based on project size, complexity, and scope of work.',
    addOnsLabel: 'Additional Services',
    addOnsDesc: 'Available as standalone services or combined with any package',
    addOnTag: 'Add-On',
    disclaimerLabel: 'Important Note',
    disclaimer:
      'All drawings are prepared for design and documentation purposes. For permit approval and construction, collaboration with a licensed architect or engineer may be required.',
    readyToStart: 'Get a Quote',
    ctaTitle: 'Have a project in mind?',
    ctaSubtitle:
      "Send through your plans or brief, and I'll provide a tailored quote based on your project needs.",
    ctaButton: 'Contact Me',
    viewPortfolio: 'View Portfolio',
    footerSub: 'Sam Saenpao · Architectural Designer',

    packages: [
      {
        id: '01',
        tier: 'Basic',
        badge: null as string | null,
        name: 'Permit Drawings',
        description: 'For simple approvals and small-scale projects',
        includes: [
          'Floor plans, elevations, and sections',
          'Basic layout for submission',
          'Suitable for building approval (ขออนุญาต)',
        ],
        pricePerSqm: '250 – 400 THB/m²',
        priceLump: '30,000 – 80,000 THB',
        priceLumpNote: 'small projects' as string | null,
      },
      {
        id: '02',
        tier: 'Standard',
        badge: 'Most Popular' as string | null,
        name: 'Construction Drawings',
        description: 'Ideal for construction-ready projects',
        includes: [
          'Detailed plans, sections, and elevations',
          'Door and window schedules',
          'Basic construction details',
          'Drawings prepared for coordination',
        ],
        pricePerSqm: '400 – 700 THB/m²',
        priceLump: '80,000 – 250,000 THB',
        priceLumpNote: null as string | null,
      },
      {
        id: '03',
        tier: 'Premium',
        badge: null as string | null,
        name: 'Detailed Documentation',
        description: 'For complex or high-end projects',
        includes: [
          'Full construction documentation set',
          'Joinery details (kitchen, built-ins, custom elements)',
          'Material indication',
          'Coordination with consultants',
        ],
        pricePerSqm: '700 – 1,000+ THB/m²',
        priceLump: '250,000 – 600,000+ THB',
        priceLumpNote: null as string | null,
      },
    ],

    addOns: [
      {
        title: '3D Rendering',
        description: 'High-quality interior and exterior renders for presentations, marketing, or client approvals.',
        price: '3,000 – 8,000 THB / image',
        deliverables: [
          '1 high-res render per image (JPG/PNG, 3000px+)',
          '2 rounds of minor revisions (angle, lighting, materials)',
          'Delivery within 3–5 working days',
        ],
      },
      {
        title: 'Concept & Schematic Design',
        description: 'Early-stage layouts and spatial concepts to explore ideas before committing to full documentation.',
        price: '5,000 – 30,000 THB',
        deliverables: [
          '1–2 concept layout options',
          'Floor plan & basic 3D massing',
          '2 revision rounds included',
        ],
      },
      {
        title: 'Additional Revisions',
        description: 'Extra drawing revisions beyond the inclusions of your package.',
        price: '+5% – 10% of total fee',
        deliverables: [
          'Up to 5 minor changes per revision round',
          'Applies to drawings already issued',
          'Major redesigns quoted separately',
        ],
      },
      {
        title: 'Site Visit / Measurement',
        description: 'On-site assessment and accurate as-built measurements for existing spaces.',
        price: '2,000 – 5,000 THB / visit',
        deliverables: [
          'On-site measurements & as-built sketch',
          'Site photos for reference',
          'Travel surcharge may apply outside Bangkok',
        ],
      },
    ],
  },

  th: {
    headerSub: 'บริการและราคา',
    backToPortfolio: '← กลับสู่ผลงาน',
    whatIDo: 'เขียนแบบ · ออกแบบ · เอกสาร',
    heroTitle1: 'บริการเขียนแบบและ',
    heroTitle2: 'เอกสารสถาปัตยกรรม',
    heroTagline:
      'ให้บริการเขียนแบบสถาปัตยกรรมและจัดทำเอกสารมืออาชีพ สำหรับโครงการที่พักอาศัยและพาณิชย์ ด้วยประสบการณ์ทั้งมาตรฐานออสเตรเลียและไทย ฉันส่งมอบแบบที่ชัดเจน ก่อสร้างได้จริง และพร้อมขออนุมัติ ปรับแต่งตามแต่ละโครงการ',
    heroCredentials:
      'ประสบการณ์มากกว่า 3 ปีในการเขียนแบบสถาปัตยกรรม · ปริญญาตรีสาขาการออกแบบสถาปัตยกรรม (UTS)',
    packagesLabel: 'บริการและราคา',
    mostPopular: 'ยอดนิยม',
    pricing: 'ราคา',
    startingFrom: 'เริ่มต้น',
    orText: 'หรือ',
    includes: 'รายการที่รวม',
    pricingNote: 'ราคาสุดท้ายจะยืนยันตามขนาด ความซับซ้อน และขอบเขตงานของโครงการ',
    addOnsLabel: 'บริการเสริม',
    addOnsDesc: 'ใช้เป็นบริการเดี่ยวหรือรวมกับแพ็คเกจใดก็ได้',
    addOnTag: 'บริการเสริม',
    disclaimerLabel: 'หมายเหตุสำคัญ',
    disclaimer:
      'แบบทั้งหมดจัดทำเพื่อวัตถุประสงค์ด้านการออกแบบและเอกสาร สำหรับการขออนุญาตและการก่อสร้าง อาจต้องร่วมงานกับสถาปนิกหรือวิศวกรที่มีใบอนุญาต',
    readyToStart: 'ขอใบเสนอราคา',
    ctaTitle: 'มีโครงการในใจแล้วหรือ?',
    ctaSubtitle:
      'ส่งแปลนหรือบรีฟของคุณมา แล้วฉันจะจัดทำใบเสนอราคาที่ปรับแต่งตามความต้องการของโครงการ',
    ctaButton: 'ติดต่อฉัน',
    viewPortfolio: 'ดูผลงาน',
    footerSub: 'แซม แสนเปา · นักออกแบบสถาปัตยกรรม',

    packages: [
      {
        id: '01',
        tier: 'เบสิก',
        badge: null as string | null,
        name: 'แบบขออนุญาต',
        description: 'สำหรับการขออนุมัติอย่างง่ายและโครงการขนาดเล็ก',
        includes: [
          'แปลน รูปด้าน และหน้าตัด',
          'ผังพื้นฐานเพื่อยื่นขออนุมัติ',
          'เหมาะสำหรับการขออนุญาตก่อสร้าง (ขออนุญาต)',
        ],
        pricePerSqm: '250 – 400 บาท/ตรม.',
        priceLump: '30,000 – 80,000 บาท',
        priceLumpNote: 'สำหรับโครงการขนาดเล็ก' as string | null,
      },
      {
        id: '02',
        tier: 'สแตนดาร์ด',
        badge: 'ยอดนิยม' as string | null,
        name: 'แบบก่อสร้าง',
        description: 'เหมาะสำหรับโครงการพร้อมก่อสร้าง',
        includes: [
          'แปลน หน้าตัด และรูปด้านละเอียด',
          'ตารางประตูและหน้าต่าง',
          'รายละเอียดก่อสร้างเบื้องต้น',
          'แบบพร้อมประสานงาน',
        ],
        pricePerSqm: '400 – 700 บาท/ตรม.',
        priceLump: '80,000 – 250,000 บาท',
        priceLumpNote: null as string | null,
      },
      {
        id: '03',
        tier: 'พรีเมียม',
        badge: null as string | null,
        name: 'เอกสารแบบครบถ้วน',
        description: 'สำหรับโครงการซับซ้อนหรือระดับพรีเมียม',
        includes: [
          'ชุดเอกสารก่อสร้างครบถ้วน',
          'รายละเอียดงานไม้ (ครัว ตู้บิ้วอิน องค์ประกอบสั่งทำ)',
          'ระบุวัสดุ',
          'ประสานงานกับที่ปรึกษา',
        ],
        pricePerSqm: '700 – 1,000+ บาท/ตรม.',
        priceLump: '250,000 – 600,000+ บาท',
        priceLumpNote: null as string | null,
      },
    ],

    addOns: [
      {
        title: 'เรนเดอร์ 3D',
        description: 'ภาพเรนเดอร์คุณภาพสูงภายในและภายนอก สำหรับการนำเสนอ การตลาด หรือการขออนุมัติจากลูกค้า',
        price: '3,000 – 8,000 บาท / ภาพ',
        deliverables: [
          '1 ภาพความละเอียดสูงต่อครั้ง (JPG/PNG, 3000px+)',
          'แก้ไข 2 รอบ (มุมกล้อง แสง วัสดุ)',
          'ส่งงานภายใน 3–5 วันทำการ',
        ],
      },
      {
        title: 'ออกแบบแนวคิดและแผนผัง',
        description: 'ผังและแนวคิดพื้นที่ในช่วงเริ่มต้น เพื่อสำรวจไอเดียก่อนเริ่มทำเอกสารเต็มรูปแบบ',
        price: '5,000 – 30,000 บาท',
        deliverables: [
          '1–2 ตัวเลือกผังแนวคิด',
          'แปลนและโมเดล 3D มวลพื้นฐาน',
          'แก้ไข 2 รอบ',
        ],
      },
      {
        title: 'การแก้ไขเพิ่มเติม',
        description: 'การแก้ไขแบบเพิ่มเติมนอกเหนือจากจำนวนที่รวมอยู่ในแพ็คเกจ',
        price: '+5% – 10% ของค่าบริการรวม',
        deliverables: [
          'แก้ไขได้สูงสุด 5 รายการต่อรอบ',
          'สำหรับแบบที่ออกไปแล้ว',
          'การออกแบบใหม่ทั้งหมดคิดราคาแยกต่างหาก',
        ],
      },
      {
        title: 'เยี่ยมชมไซต์งาน / วัดพื้นที่',
        description: 'ประเมินพื้นที่จริงและรังวัดแม่นยำสำหรับพื้นที่ที่มีอยู่เดิม',
        price: '2,000 – 5,000 บาท / ครั้ง',
        deliverables: [
          'รังวัดพื้นที่และร่างแบบ as-built',
          'ถ่ายภาพอ้างอิง',
          'อาจมีค่าเดินทางเพิ่มเติมนอกกรุงเทพฯ',
        ],
      },
    ],
  },
};

const PACKAGE_ICONS = [
  <FileCheck className="w-6 h-6" />,
  <FileText className="w-6 h-6" />,
  <Layers className="w-6 h-6" />,
];

export default function ServicesPage() {
  const [lang, setLang] = useState<'en' | 'th'>('en');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#fdfaf6] font-sans">
      {/* Header */}
      <header className="border-b border-stone-100 bg-white sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
          <a href="/" className="text-xl font-display font-medium tracking-tight text-stone-800">
            SAM SAENPAO
          </a>
          <span className="hidden md:block text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300">
            {t.headerSub}
          </span>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
              className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-400 hover:text-stone-900 transition-colors border border-stone-200 px-3 py-1.5"
            >
              {lang === 'en' ? 'TH' : 'EN'}
            </button>
            <a
              href="/"
              className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-400 hover:text-stone-900 transition-colors"
            >
              {t.backToPortfolio}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 md:py-36 border-b border-stone-100">
        <div className="max-w-[1400px] mx-auto px-8">
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-stone-300 block mb-6">
              {t.whatIDo}
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-light text-stone-800 mb-8 leading-tight max-w-3xl">
              {t.heroTitle1}
              <br />
              <span className="italic">{t.heroTitle2}</span>
            </h1>
            <p className="text-base text-stone-600 font-light leading-relaxed mb-5 max-w-2xl">
              {t.heroTagline}
            </p>
            <p className="text-sm text-stone-400 font-light italic">{t.heroCredentials}</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-36 border-b border-stone-100">
        <div className="max-w-[1400px] mx-auto px-8">
          <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-stone-300 block mb-16">
            {t.packagesLabel}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-stone-100">

            {/* Additional Services card — left column */}
            <motion.div
              key={`${lang}-addons`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-[#fdfaf6] p-10 md:p-14 group hover:bg-white transition-colors duration-500"
            >
              <div className="h-7 mb-8" />
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 border border-stone-200 flex items-center justify-center text-stone-400 group-hover:border-stone-900 group-hover:text-stone-900 transition-all duration-300">
                  <List className="w-6 h-6" />
                </div>
              </div>
              <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300 mb-2">
                {t.addOnsLabel}
              </p>
              <h3 className="text-2xl font-display font-light text-stone-800 mb-3">{t.addOnsLabel}</h3>
              <p className="text-sm font-light italic text-stone-400 mb-8">{t.addOnsDesc}</p>
              <div className="border-t border-stone-100 pt-6 space-y-6">
                {t.addOns.map((addon, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-3 mb-1">
                      <span className="w-1 h-1 rounded-full bg-stone-300 flex-shrink-0 mt-2" />
                      <p className="text-sm font-display font-light text-stone-700">{addon.title}</p>
                    </div>
                    <p className="text-xs font-mono text-stone-400 pl-4 mb-2">{addon.price}</p>
                    <ul className="pl-4 space-y-1">
                      {addon.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-[10px] text-stone-400 font-light">
                          <span className="w-0.5 h-0.5 rounded-full bg-stone-200 flex-shrink-0 mt-1.5" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Package cards */}
            {t.packages.map((pkg, i) => {
              const highlighted = pkg.badge !== null;
              return (
                <motion.div
                  key={`${lang}-${pkg.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: (i + 1) * 0.1 }}
                  className={`p-10 md:p-14 relative ${
                    highlighted
                      ? 'bg-stone-900 text-white'
                      : 'bg-[#fdfaf6] group hover:bg-white transition-colors duration-500'
                  }`}
                >
                  {/* Badge row — fixed height so cards align */}
                  <div className="h-7 flex items-center mb-8">
                    {pkg.badge && (
                      <span className="text-[8px] uppercase tracking-[0.3em] font-bold px-3 py-1 border border-stone-600 text-stone-400">
                        ⭐ {pkg.badge}
                      </span>
                    )}
                  </div>

                  {/* Icon + ID */}
                  <div className="flex items-start justify-between mb-8">
                    <div
                      className={`w-12 h-12 border flex items-center justify-center transition-all duration-300 ${
                        highlighted
                          ? 'border-stone-600 text-stone-400'
                          : 'border-stone-200 text-stone-400 group-hover:border-stone-900 group-hover:text-stone-900'
                      }`}
                    >
                      {PACKAGE_ICONS[i]}
                    </div>
                    <span
                      className={`text-[10px] font-mono transition-colors ${
                        highlighted ? 'text-stone-600' : 'text-stone-200 group-hover:text-stone-400'
                      }`}
                    >
                      {pkg.id}
                    </span>
                  </div>

                  <p
                    className={`text-[9px] uppercase tracking-[0.4em] font-bold mb-2 ${
                      highlighted ? 'text-stone-500' : 'text-stone-300'
                    }`}
                  >
                    {pkg.tier}
                  </p>
                  <h3
                    className={`text-2xl font-display font-light mb-3 ${
                      highlighted ? 'text-white' : 'text-stone-800'
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`text-sm font-light italic mb-8 ${
                      highlighted ? 'text-stone-500' : 'text-stone-400'
                    }`}
                  >
                    {pkg.description}
                  </p>

                  {/* Pricing */}
                  <div className={`border-t pt-6 mb-8 ${highlighted ? 'border-stone-700' : 'border-stone-100'}`}>
                    <p
                      className={`text-[8px] uppercase tracking-[0.3em] font-bold mb-1 ${
                        highlighted ? 'text-stone-500' : 'text-stone-300'
                      }`}
                    >
                      {t.startingFrom}
                    </p>
                    <p
                      className={`text-xl font-mono font-light mb-2 ${
                        highlighted ? 'text-white' : 'text-stone-800'
                      }`}
                    >
                      {pkg.pricePerSqm}
                    </p>
                    <p className={`text-xs font-light ${highlighted ? 'text-stone-400' : 'text-stone-400'}`}>
                      {t.orText} {pkg.priceLump}
                      {pkg.priceLumpNote && (
                        <span className={`italic ml-1 ${highlighted ? 'text-stone-600' : 'text-stone-300'}`}>
                          ({pkg.priceLumpNote})
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Includes */}
                  <div className={`border-t pt-6 ${highlighted ? 'border-stone-700' : 'border-stone-100'}`}>
                    <p
                      className={`text-[8px] uppercase tracking-[0.3em] font-bold mb-4 ${
                        highlighted ? 'text-stone-500' : 'text-stone-300'
                      }`}
                    >
                      {t.includes}
                    </p>
                    <ul className="space-y-2">
                      {pkg.includes.map((item) => (
                        <li
                          key={item}
                          className={`flex items-start gap-3 text-xs font-light ${
                            highlighted ? 'text-stone-300' : 'text-stone-500'
                          }`}
                        >
                          <span
                            className={`w-1 h-1 rounded-full flex-shrink-0 mt-1.5 ${
                              highlighted ? 'bg-stone-600' : 'bg-stone-300'
                            }`}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pricing note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 text-[10px] text-stone-400 font-light italic text-center"
          >
            {t.pricingNote}
          </motion.p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 border-b border-stone-100">
        <div className="max-w-[1400px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-start gap-6 bg-stone-50 border border-stone-100 p-8 md:p-10"
          >
            <AlertCircle className="w-5 h-5 text-stone-300 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-stone-300 mb-3">
                {t.disclaimerLabel}
              </p>
              <p className="text-sm text-stone-500 font-light leading-relaxed">{t.disclaimer}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="max-w-xl">
            <p className="text-[9px] uppercase tracking-[0.5em] font-bold text-stone-500 mb-4">
              {t.readyToStart}
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-light mb-5">{t.ctaTitle}</h2>
            <p className="text-sm text-stone-400 font-light leading-relaxed">{t.ctaSubtitle}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 md:self-center">
            <a
              href="mailto:sam@nissa.co.th"
              className="px-10 py-4 bg-white text-stone-900 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-100 transition-colors duration-300 text-center"
            >
              {t.ctaButton}
            </a>
            <a
              href="/"
              className="px-10 py-4 border border-white/30 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-stone-900 transition-colors duration-300 text-center"
            >
              {t.viewPortfolio}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-stone-100 bg-[#fdfaf6]">
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300">{t.footerSub}</span>
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300">v1.6.0.1</span>
        </div>
      </footer>
    </div>
  );
}
