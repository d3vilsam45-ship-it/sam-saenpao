/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import {
  Github,
  Mail,
  Linkedin,
  Menu,
  X,
  Download,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Search,
  BookOpen,
  MapPin,
  Layers,
  Box,
  PenTool,
  Maximize2,
} from 'lucide-react';

// --- i18n ---
type Lang = 'en' | 'th';

const translations = {
  en: {
    // Nav
    navProjects: 'Projects', navArticles: 'Articles', navMakers: 'Clients',
    navStudio: 'Studio', navJournal: 'Journal', navWorld: 'World', navContact: 'Contact', navServices: 'Services',
    available: 'Available', subscribe: 'Subscribe',
    navTagline: 'Architecture & Design — Sydney, Australia & Khon Kaen, Thailand',
    // Hero
    heroBadge: 'Featured Studio — Sydney, Australia',
    heroSubtitle: 'Documenting architecture and design across Australia and beyond — where precision meets poetic vision.',
    exploreWork: 'Explore Work', readArticles: 'Read Articles', scroll: 'Scroll',
    // Pub strip
    pubLabel: 'Architecture & Design Publication', printEdition: 'Print Edition',
    // Articles
    editorial: 'Editorial', latestFeatures: 'Latest Features', readFeature: 'Read Feature',
    // 3D
    visualWork: 'Visual Work', rendering: 'Rendering', workflow: 'Workflow', modelling3D: '3D Modelling Process',
    // Who Am I
    whoAmI: 'Who Am I', fullStudioProfile: 'Full Studio Profile',
    whoAmIText1: "I am an Architectural Manager shaped by two worlds — the warmth and craft culture of Thailand, where I was born and raised, and the precision and professionalism of Sydney's architectural industry, where I spent eight formative years building my career.",
    whoAmIText2: "Growing up in Thailand instilled in me an appreciation for material culture, human-scale environments, and the quiet poetry of everyday spaces. Moving to Australia at 19 pushed me to grow independently — working part-time, studying English, earning my degree at UTS, and eventually finding my professional footing at M.A.R.S Architects across a diverse range of commercial, retail, and hospitality projects.",
    whoAmIText3: "That journey across cultures, cities, and disciplines is what defines how I approach design — with curiosity, adaptability, and a commitment to work that is both technically rigorous and deeply considered. I bring that breadth of experience to every project I take on.",
    // Projects
    featuredWork: 'Featured Work', completed: 'Completed', viewFullArchive: 'View Full Archive',
    // Clients
    clientsLabel: 'Selected Clients', clientsTitle: 'Collaborated With', clientsProjects: 'projects',
    // Stats
    involvingProjects: 'Involving Projects', projectsCompleted: 'Projects Completed',
    yearsExperience: 'Years Experience', cities: 'Cities', countries: 'Countries',
    // University / Credentials
    academicWork: 'Academic Work', university: 'University', academicBackground: 'Academic Background',
    degreeLabel: 'Degree', institutionLabel: 'Institution', locationLabel: 'Location', conferredLabel: 'Conferred',
    qualifications: 'Qualifications', credentials: 'Credentials',
    // Studio Profile
    studioProfile: 'Studio Profile', experienceEducation: 'Experience & Education', downloadCV: 'Download CV',
    studioQuote: '"I believe in an architecture that is as technically sound as it is emotionally resonant."',
    studioBio1: "A UTS Architecture graduate with a passion for the technical intricacies of design. With 8 years of experience in Sydney — studying at UTS and working at M.A.R.S (Marcellino Sain Architects) — I've honed my skills in bridging the gap between conceptual sketches and construction-ready documentation.",
    studioBio2: "I thrive in the details—whether it's coordinating construction drawings or refining the materiality of a facade. My goal is to grow into a versatile architect who understands every layer of the building process.",
    skillClarity: 'Clarity in Drawings', skillClarityDesc: 'Every plan communicates intent without ambiguity.',
    skill3D: '3D Visualization', skill3DDesc: 'Rhino & SketchUp to test spatial qualities.',
    skillBIM: 'BIM Coordination', skillBIMDesc: 'Complex model coordination across disciplines.',
    skillEnv: 'Environmental Design', skillEnvDesc: 'Sustainable principles from concept to detail.',
    // Journey
    personalNarrative: 'Personal Narrative', theJourney: 'The Journey',
    journeyCaption: 'Bangkok · Sydney · Bangkok',
    j01label: 'ORIGIN', j01text: 'Born and raised in Thailand. Shaped by craft, curiosity, and an early love of building things.',
    j02label: 'DEPARTURE', j02text: 'Left home to pursue architectural education in Australia — a leap of intent and ambition.',
    j03label: 'NEW CHAPTER', j03text: 'A year of beginnings — working part-time, absorbing a new city, studying English, and quietly searching for direction.',
    j04label: 'EDUCATION', j04text: 'Bachelor of Design in Architecture. Graduated with UTS Capstone Prize.',
    j05label: 'CAREER', j05text: 'From Intern to Architectural Drafter at Marcellino Sain Architects — honing technical precision across commercial projects.',
    j06label: 'THE RETURN', j06text: 'Bringing 8 years of study, studio practice, and life in Sydney — returning home with refined skills and a sharpened design sensibility.',
    // Contact section
    contactSectionLabel: 'Get In Touch', contactSectionTitle: 'Let\'s Work Together',
    contactSectionDesc: 'Have a project in mind? I\'d love to hear about it. Reach out directly or scan the QR code to connect on LINE.',
    contactEmail: 'Email', contactLine: 'LINE', contactLocation: 'Location',
    emailPlaceholder: 'Your email address', subscribeFree: 'Subscribe Free',
    // Footer
    footerDesc: 'Architectural Manager based in Khon Kaen, Thailand. Available for freelance projects and collaborations.',
    followStudio: 'Follow the Studio', navigate: 'Navigate',
    privacy: 'Privacy', terms: 'Terms', sitemap: 'Sitemap', allRightsReserved: 'All Rights Reserved.',
    // Inquiry modal
    startProject: 'Start a Project', newEnquiry: 'New Enquiry',
    messageSent: 'Message Sent', thankYou: "Thank you, I'll be in touch.",
    yourName: 'Your name', yourEmail: 'Your email', aboutProject: 'Tell me about your project',
    sending: 'Sending…', sendMessage: 'Send Message',
    fillFields: 'Please fill in all fields.', somethingWrong: 'Something went wrong. Please try again.',
    lineAlt: 'Or contact via LINE', lineDesc: 'Scan QR code to message me directly on LINE — in case email doesn\'t reach.',
    // Project modal
    roleLabel: 'Role', clientLabel: 'Client', builderLabel: 'Builder',
    areaLabel: 'Area', designTeamLabel: 'Design Team', photographyLabel: 'Photography',
    projectGallery: 'Project Gallery', imageLabel: 'Image', imagesLabel: 'Images',
    viewProject: 'View Project',
    // World map
    globalFootprint: 'Global Footprint', whereBeen: "Where I've Been",
    dragRotate: 'Drag · Rotate · Zoom · Click any country',
    livedWorked: 'Lived & Worked', travelled: 'Travelled', restOfWorld: 'Rest of World',
    // Archive
    projectArchive: 'Project Archive', sortLabel: 'Sort', hoursLabel: 'Hours',
    nameLabel: 'Name', totalHours: 'Total Hours', close: 'Close',
    searchPlaceholder: 'Search projects...',
  },
  th: {
    // Nav
    navProjects: 'โครงการ', navArticles: 'บทความ', navMakers: 'ลูกค้า',
    navStudio: 'สตูดิโอ', navJournal: 'บันทึก', navWorld: 'โลก', navContact: 'ติดต่อ', navServices: 'บริการ',
    available: 'ว่างงาน', subscribe: 'สมัครสมาชิก',
    navTagline: 'สถาปัตยกรรมและการออกแบบ — ซิดนีย์, ออสเตรเลีย & ขอนแก่น, ไทย',
    // Hero
    heroBadge: 'สตูดิโอเด่น — ซิดนีย์, ออสเตรเลีย',
    heroSubtitle: 'บันทึกสถาปัตยกรรมและการออกแบบทั่วออสเตรเลียและที่อื่น ๆ — ที่ความแม่นยำพบกับวิสัยทัศน์เชิงกวี',
    exploreWork: 'สำรวจผลงาน', readArticles: 'อ่านบทความ', scroll: 'เลื่อน',
    // Pub strip
    pubLabel: 'สิ่งพิมพ์สถาปัตยกรรมและการออกแบบ', printEdition: 'ฉบับพิมพ์',
    // Articles
    editorial: 'บทบรรณาธิการ', latestFeatures: 'บทความล่าสุด', readFeature: 'อ่านบทความ',
    // 3D
    visualWork: 'งานภาพ', rendering: 'งานเรนเดอร์', workflow: 'กระบวนการ', modelling3D: 'กระบวนการสร้างโมเดล 3 มิติ',
    // Who Am I
    whoAmI: 'ฉันคือใคร', fullStudioProfile: 'โปรไฟล์สตูดิโอทั้งหมด',
    whoAmIText1: 'ฉันเป็นผู้จัดการด้านสถาปัตยกรรมที่ถูกหล่อหลอมจากสองโลก — ความอบอุ่นและวัฒนธรรมงานฝีมือของไทย ที่ที่ฉันเกิดและเติบโต และความแม่นยำและความเป็นมืออาชีพของอุตสาหกรรมสถาปัตยกรรมในซิดนีย์ ที่ที่ฉันใช้เวลาแปดปีสร้างอาชีพ',
    whoAmIText2: 'การเติบโตในประเทศไทยทำให้ฉันซาบซึ้งกับวัฒนธรรมงานวัสดุ สภาพแวดล้อมในระดับมนุษย์ และบทกวีเงียบของพื้นที่ในชีวิตประจำวัน การย้ายไปออสเตรเลียตอนอายุ 19 ปีผลักดันให้ฉันเติบโตอย่างอิสระ — ทำงานพาร์ทไทม์ เรียนภาษาอังกฤษ สำเร็จการศึกษาที่ UTS และในที่สุดก็ก้าวสู่เส้นทางอาชีพที่ M.A.R.S Architects',
    whoAmIText3: 'การเดินทางข้ามวัฒนธรรม เมือง และสาขาวิชาต่าง ๆ คือสิ่งที่กำหนดแนวทางการออกแบบของฉัน — ด้วยความอยากรู้ ความยืดหยุ่น และความมุ่งมั่นในงานที่ทั้งเข้มแข็งทางเทคนิคและลึกซึ้งทางความคิด',
    // Projects
    featuredWork: 'ผลงานเด่น', completed: 'เสร็จสิ้น', viewFullArchive: 'ดูคลังทั้งหมด',
    // Clients
    clientsLabel: 'ลูกค้าที่เลือก', clientsTitle: 'ได้ร่วมงานกับ', clientsProjects: 'โครงการ',
    // Stats
    involvingProjects: 'โครงการที่เกี่ยวข้อง', projectsCompleted: 'โครงการที่เสร็จสิ้น',
    yearsExperience: 'ปีประสบการณ์', cities: 'เมือง', countries: 'ประเทศ',
    // University / Credentials
    academicWork: 'งานวิชาการ', university: 'มหาวิทยาลัย', academicBackground: 'ประวัติการศึกษา',
    degreeLabel: 'ปริญญา', institutionLabel: 'สถาบัน', locationLabel: 'ที่ตั้ง', conferredLabel: 'วันสำเร็จการศึกษา',
    qualifications: 'คุณสมบัติ', credentials: 'ใบรับรอง',
    // Studio Profile
    studioProfile: 'โปรไฟล์สตูดิโอ', experienceEducation: 'ประสบการณ์และการศึกษา', downloadCV: 'ดาวน์โหลด CV',
    studioQuote: '"ฉันเชื่อในสถาปัตยกรรมที่มีความแม่นยำทางเทคนิคควบคู่ไปกับการสะท้อนอารมณ์ความรู้สึก"',
    studioBio1: 'บัณฑิตสถาปัตยกรรมจาก UTS ที่มีความหลงใหลในรายละเอียดทางเทคนิคของการออกแบบ ด้วยประสบการณ์ 8 ปีในซิดนีย์ — ศึกษาที่ UTS และทำงานที่ M.A.R.S (Marcellino Sain Architects) — ฉันได้พัฒนาทักษะในการเชื่อมช่องว่างระหว่างภาพร่างแนวคิดและเอกสารพร้อมก่อสร้าง',
    studioBio2: 'ฉันเชี่ยวชาญในรายละเอียด — ไม่ว่าจะเป็นการประสานงานแบบก่อสร้างหรือการปรับปรุงวัสดุของด้านหน้าอาคาร เป้าหมายของฉันคือเติบโตเป็นสถาปนิกที่รอบด้านซึ่งเข้าใจทุกชั้นของกระบวนการก่อสร้าง',
    skillClarity: 'ความชัดเจนในแบบ', skillClarityDesc: 'แผนผังทุกแผ่นสื่อสารความตั้งใจได้อย่างไม่คลุมเครือ',
    skill3D: 'การแสดงภาพ 3 มิติ', skill3DDesc: 'Rhino และ SketchUp เพื่อทดสอบคุณภาพเชิงพื้นที่',
    skillBIM: 'การประสานงาน BIM', skillBIMDesc: 'การประสานงานโมเดลที่ซับซ้อนข้ามสาขา',
    skillEnv: 'การออกแบบสิ่งแวดล้อม', skillEnvDesc: 'หลักการยั่งยืนตั้งแต่แนวคิดจนถึงรายละเอียด',
    // Journey
    personalNarrative: 'เรื่องราวส่วนตัว', theJourney: 'การเดินทาง',
    journeyCaption: 'กรุงเทพฯ · ซิดนีย์ · กรุงเทพฯ',
    j01label: 'ต้นกำเนิด', j01text: 'เกิดและเติบโตในประเทศไทย ถูกหล่อหลอมด้วยงานฝีมือ ความอยากรู้ และความรักในการสร้างสิ่งต่าง ๆ',
    j02label: 'การออกเดินทาง', j02text: 'ออกจากบ้านเพื่อศึกษาสถาปัตยกรรมในออสเตรเลีย — ก้าวกล้าด้วยความตั้งใจและความทะเยอทะยาน',
    j03label: 'บทใหม่', j03text: 'ปีแห่งการเริ่มต้น — ทำงานพาร์ทไทม์ ซึมซับเมืองใหม่ เรียนภาษาอังกฤษ และค้นหาทิศทางอย่างเงียบ ๆ',
    j04label: 'การศึกษา', j04text: 'ปริญญาตรีสาขาการออกแบบสถาปัตยกรรม สำเร็จการศึกษาพร้อมรางวัล UTS Capstone',
    j05label: 'อาชีพ', j05text: 'จากนักศึกษาฝึกงานสู่นักเขียนแบบสถาปัตยกรรมที่ Marcellino Sain Architects — ฝึกฝนความแม่นยำทางเทคนิคในโครงการเชิงพาณิชย์',
    j06label: 'การกลับบ้าน', j06text: 'นำ 8 ปีของการศึกษา การปฏิบัติในสตูดิโอ และชีวิตในซิดนีย์ — กลับบ้านพร้อมทักษะที่ผ่านการฝึกฝนและประสาทการออกแบบที่เฉียบคม',
    // Contact section
    contactSectionLabel: 'ติดต่อเรา', contactSectionTitle: 'มาทำงานร่วมกัน',
    contactSectionDesc: 'มีโครงการในใจ? อยากฟังเรื่องราวของคุณ ติดต่อโดยตรงหรือสแกน QR Code เพื่อเชื่อมต่อทาง LINE',
    contactEmail: 'อีเมล', contactLine: 'LINE', contactLocation: 'ที่อยู่',
    emailPlaceholder: 'ที่อยู่อีเมลของคุณ', subscribeFree: 'สมัครฟรี',
    // Footer
    footerDesc: 'ผู้จัดการด้านสถาปัตยกรรม ตั้งอยู่ที่ขอนแก่น ประเทศไทย รับงานฟรีแลนซ์และงานร่วมมือ',
    followStudio: 'ติดตามสตูดิโอ', navigate: 'นำทาง',
    privacy: 'นโยบาย', terms: 'ข้อกำหนด', sitemap: 'แผนผัง', allRightsReserved: 'สงวนลิขสิทธิ์',
    // Inquiry modal
    startProject: 'เริ่มต้นโครงการ', newEnquiry: 'สอบถามใหม่',
    messageSent: 'ส่งข้อความแล้ว', thankYou: 'ขอบคุณ จะติดต่อกลับเร็ว ๆ นี้',
    yourName: 'ชื่อของคุณ', yourEmail: 'อีเมลของคุณ', aboutProject: 'เล่าถึงโครงการของคุณ',
    sending: 'กำลังส่ง…', sendMessage: 'ส่งข้อความ',
    fillFields: 'กรุณากรอกข้อมูลให้ครบถ้วน', somethingWrong: 'เกิดข้อผิดพลาด กรุณาลองใหม่',
    lineAlt: 'หรือติดต่อผ่าน LINE', lineDesc: 'สแกน QR Code เพื่อส่งข้อความหาผมโดยตรงทาง LINE — กรณีที่อีเมลอาจไม่ถึง',
    // Project modal
    roleLabel: 'บทบาท', clientLabel: 'ลูกค้า', builderLabel: 'ผู้รับเหมา',
    areaLabel: 'พื้นที่', designTeamLabel: 'ทีมออกแบบ', photographyLabel: 'การถ่ายภาพ',
    projectGallery: 'แกลเลอรีโครงการ', imageLabel: 'ภาพ', imagesLabel: 'ภาพ',
    viewProject: 'ดูโครงการ',
    // World map
    globalFootprint: 'รอยเท้าทั่วโลก', whereBeen: 'สถานที่ที่ไปมา',
    dragRotate: 'ลาก · หมุน · ซูม · คลิกที่ประเทศใดก็ได้',
    livedWorked: 'อาศัยและทำงาน', travelled: 'เดินทาง', restOfWorld: 'ส่วนอื่นของโลก',
    // Archive
    projectArchive: 'คลังโครงการ', sortLabel: 'จัดเรียง', hoursLabel: 'ชั่วโมง',
    nameLabel: 'ชื่อ', totalHours: 'ชั่วโมงรวม', close: 'ปิด',
    searchPlaceholder: 'ค้นหาโครงการ...',
  },
} as const;

type TKey = keyof typeof translations.en;

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'en',
  setLang: () => {},
});

const useLang = () => {
  const { lang, setLang } = useContext(LangContext);
  const t = (k: TKey): string => translations[lang][k] as string;
  return { lang, setLang, t };
};

// --- Types ---
interface Project {
  id: number;
  title: string;
  location: string;
  year: string;
  image: string;
  category: string;
  role: string;
  description: string;
  readTime: string;
  client?: string;
  builder?: string;
  area?: string;
  designTeam?: string;
  photographer?: string;
  gallery?: string[];
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
  gallery?: string[];
}

interface ClientLogo {
  id: number;
  name: string;
  sub: string;
  projects: number;
  logo?: string;
}

interface Experience {
  year: string;
  title: string;
  company: string;
  description: string;
  logo?: string;
}

// --- Constants ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Something by Grace II",
    location: "Botany Bay, NSW",
    year: "2023",
    image: "/photos/grace-ii/660ad8_f390d4e37655476096007a47d0eae7dc~mv2.jpg",
    category: "Interior",
    role: "Design Team Member",
    description: "A luxury beauty salon interior defined by warmth, tactility, and quiet refinement. Fluted white panels, warm brass accents, and soft terrazzo surfaces create an atmosphere of calm indulgence — a space designed to make every visitor feel unhurried.",
    readTime: "6 min read",
    client: "Something by Grace & Co Pty Ltd",
    builder: "DT Corporation Pty Ltd",
    area: "100 sqm",
    designTeam: "Shaun Khai, Dario D'ongas, Chloe Lam, Brian Yung & Sam Saenpao",
    gallery: [
      "/photos/grace-ii/660ad8_f390d4e37655476096007a47d0eae7dc~mv2.jpg",
      "/photos/grace-ii/660ad8_b42890e0abb343a4992b1991319aadb1~mv2.jpg",
      "/photos/grace-ii/660ad8_0193d037fcf244cda118265271e60a26~mv2.jpg",
      "/photos/grace-ii/660ad8_6bcad393f26b4d46b90711ba6b3ac05b~mv2.jpg",
      "/photos/grace-ii/660ad8_99c31a346caa453ba47019dcfdafdd0b~mv2.jpg",
      "/photos/grace-ii/660ad8_7032265d2ebc44d78f56a982457430d1~mv2.jpg",
      "/photos/grace-ii/660ad8_288f9785a85e4f94aa9dd8ff0f849bec~mv2.jpg",
      "/photos/grace-ii/660ad8_eff3c0bea7a04ac8acd19315e97b145c~mv2.jpg",
      "/photos/grace-ii/660ad8_834fc78f8ca3477484ec91633c128ce7~mv2.jpg",
      "/photos/grace-ii/660ad8_20c44ba6a94c46f89543b3286fe384d0~mv2.jpg",
      "/photos/grace-ii/660ad8_124041fabfc4462ebfa84c25890fbd24~mv2.jpg",
    ],
  },
  {
    id: 6,
    title: "Garden Cafe Kiosk",
    location: "Alexandria, NSW",
    year: "2023",
    image: "/photos/garden-cafe/660ad8_655a9f3ce81d4542b8ff04ba94b86820~mv2.jpg",
    category: "Food & Beverage",
    role: "Design Team Member",
    description: "A compact kiosk design for BYD Australia's Alexandria site — balancing high-throughput serviceability with a warm, garden-adjacent materiality. Every detail was resolved within a 50m² footprint without compromising on spatial quality.",
    readTime: "4 min read",
    client: "BYD Australia Pty Ltd",
    builder: "DT Corporation Pty Ltd",
    area: "50 sqm",
    designTeam: "Carla D'Angelo, Shaun Khor, Theresa Helen, Brian Yung, Chloe Lam & Sam Saenpao",
    gallery: [
      "/photos/garden-cafe/660ad8_04835a228ead4a51a6f4c2aceb3e5907~mv2.jpg",
      "/photos/garden-cafe/660ad8_1c93c68b00bc4469bff049fd8dc44bbd~mv2.jpg",
      "/photos/garden-cafe/660ad8_525fdf2bf26940f2a75f3b85303ed20c~mv2.jpg",
      "/photos/garden-cafe/660ad8_61b81e99147141b280ceb192df3f5345~mv2.jpg",
      "/photos/garden-cafe/660ad8_655a9f3ce81d4542b8ff04ba94b86820~mv2.jpg",
      "/photos/garden-cafe/660ad8_f9726792bef4442b8613c64e37916427~mv2.jpg",
    ],
  },
  {
    id: 7,
    title: "Lylo Brisbane",
    location: "Fortitude Valley, QLD",
    year: "2023",
    image: "/photos/lylo/660ad8_d460304d689e4a40b5217c5628921e44~mv2.jpg",
    category: "Food & Beverage",
    role: "Design Team Member",
    description: "A rooftop bar and recreational area for EVT Limited in Fortitude Valley — a 250m² sky-level escape that layers casual hospitality with sweeping city views. The design balances bold social moments with quieter retreat zones across the entire rooftop.",
    readTime: "5 min read",
    client: "EVT Limited",
    builder: "Urban Core Pty Ltd",
    area: "250 sqm",
    designTeam: "Carla D'Angelo, Shaun Khor, Sam Saenpao, Clarita Rojas, Chloe Lam & Carson Kwong",
    gallery: [
      "/photos/lylo/660ad8_03b493d6b2a543efa4cde2b00b78eb95~mv2.jpg",
      "/photos/lylo/660ad8_0d7f031606854021bffc2d41d7b7c509~mv2.jpg",
      "/photos/lylo/660ad8_417c13e9a60f415486bbb0e2a72e901a~mv2.jpg",
      "/photos/lylo/660ad8_5977287bfd144225bc82033fd1b6f722~mv2.jpg",
      "/photos/lylo/660ad8_d460304d689e4a40b5217c5628921e44~mv2.jpg",
      "/photos/lylo/660ad8_d48631208cae4e8e9dc81b25c75a1a87~mv2.jpg",
      "/photos/lylo/660ad8_da12e0d71faa48298f41d580d062e977~mv2.jpg",
      "/photos/lylo/660ad8_ddbd8184786f40b6be31964ed0bfc4ec~mv2.jpg",
    ],
  },
  {
    id: 8,
    title: "Betta Home Living",
    location: "Seaford, SA",
    year: "2023",
    image: "/photos/betta-home/660ad8_8f18a55bbdea4efa81ad5ebcbbecc49a~mv2.jpg",
    category: "Retail",
    role: "Design Team Member",
    description: "A large-format home appliances and furniture retail environment spanning 1000m² in Seaford. The design prioritises intuitive customer flow and aspirational product presentation, creating a showroom experience that feels curated rather than commercial.",
    readTime: "5 min read",
    client: "Betta Home Living Pty Ltd",
    builder: "Betta Home Living Pty Ltd",
    area: "1000 sqm",
    photographer: "Aaron Citti Photography",
    designTeam: "Carla D'Angelo, Shaun Khor, Chloe Lam, Carson Kwong, Clarita Rojas & Sam Saenpao",
    gallery: [
      "/photos/betta-home/660ad8_8f18a55bbdea4efa81ad5ebcbbecc49a~mv2.jpg",
      "/photos/betta-home/660ad8_2e5c94929efb406e81deb3cd9ee7742e~mv2.jpg",
      "/photos/betta-home/660ad8_c3b44de2c3fc40659088327c3789c8d8~mv2.jpg",
      "/photos/betta-home/660ad8_ebb9c495fea64934bf01e0d8b4502af1~mv2.jpg",
      "/photos/betta-home/660ad8_c64cd1d942134032b7f3955b09549fd6~mv2.jpg",
      "/photos/betta-home/660ad8_1ac66218658f4bfdbe0632f27aed408c~mv2.jpg",
      "/photos/betta-home/660ad8_19c028017afe4c06bcb6b9aa3176edf2~mv2.jpg",
      "/photos/betta-home/660ad8_5a56a94683754cbabe7dfc1c7bc1c03f~mv2.jpg",
      "/photos/betta-home/660ad8_71ad66a4a3ca4b7586a7f88ee1297af1~mv2.jpg",
    ],
  },
  {
    id: 9,
    title: "K5 Furniture Sydney",
    location: "Surry Hills, NSW",
    year: "2023",
    image: "/photos/k5-furniture/660ad8_8b8840617ea14411aa1e9e67bb7a0449~mv2.jpg",
    category: "Retail",
    role: "Design Team Member",
    description: "A 250m² furniture showroom in Surry Hills designed to feel less like a store and more like a considered living environment. Each vignette was crafted to show furniture in context, encouraging visitors to slow down and engage with the pieces spatially.",
    readTime: "4 min read",
    client: "K5 Furniture Pty Ltd",
    builder: "Passion Living Pty Ltd",
    area: "250 sqm",
    designTeam: "Chloe Lam, Sam Saenpao, Carla D'Angelo & Shaun Khor",
    gallery: [
      "/photos/k5-furniture/660ad8_8b8840617ea14411aa1e9e67bb7a0449~mv2.jpg",
      "/photos/k5-furniture/660ad8_3b5bca8cf9344854b5567cd5c40adba0~mv2.jpg",
      "/photos/k5-furniture/660ad8_6e2da2d7cbe14eebb02ffc88a72c2e29~mv2.jpg",
      "/photos/k5-furniture/660ad8_dfe249d382b94d7a9df0d4f8e516fd80~mv2.jpg",
      "/photos/k5-furniture/660ad8_06f58efc1cce43cf926d016ae3d45922~mv2.jpg",
      "/photos/k5-furniture/660ad8_f75b8fb05e2c49229c9a704bc0d77294~mv2.jpg",
      "/photos/k5-furniture/660ad8_47dbe33dc25d40b2b4959ba3efc19e54~mv2.jpg",
      "/photos/k5-furniture/660ad8_996c27079e8341e592b0784667b9bf1c~mv2.jpg",
    ],
  },
  {
    id: 10,
    title: "Field to Fork",
    location: "Paddington, NSW",
    year: "2023",
    image: "/photos/field-to-fork/660ad8_efc788e9926d4fc8b788d66908dffd4c~mv2.jpg",
    category: "Food & Beverage",
    role: "Design Team Member",
    description: "A butcher shop and commercial kitchen for Field to Fork in Paddington — 250m² where provenance and craft are expressed through every material decision. Raw timber, honed stone, and exposed refrigeration create a space that is honest about the food it serves.",
    readTime: "5 min read",
    client: "Field to Fork",
    builder: "Urban Core Pty Ltd",
    area: "250 sqm",
    designTeam: "Sam Saenpao, Chloe Lam, Carla D'Angelo & Shaun Khor",
    gallery: [
      "/photos/field-to-fork/660ad8_efc788e9926d4fc8b788d66908dffd4c~mv2.jpg",
      "/photos/field-to-fork/660ad8_7aae0eacf7fe45718fd2ac819dfe861f~mv2.jpg",
      "/photos/field-to-fork/660ad8_22372125b78e468191c3c011970f72cb~mv2.jpg",
      "/photos/field-to-fork/660ad8_3b356c0754634f71ae642148f23f26f6~mv2.jpg",
      "/photos/field-to-fork/660ad8_03ed02f3e1dc46a084bb8375aa9203e3~mv2.jpg",
      "/photos/field-to-fork/660ad8_ab37ebbe6b8c4c488b35e99c8887bd02~mv2.jpg",
      "/photos/field-to-fork/660ad8_0990011f65224013b49707f26d28a34e~mv2.jpg",
      "/photos/field-to-fork/660ad8_af9067ae616c41a286573954a60595c0~mv2.jpg",
      "/photos/field-to-fork/660ad8_61a50b4524ca42e19e171f453302fc68~mv2.jpg",
    ],
  },
  {
    id: 11,
    title: "Alamour",
    location: "Paddington, NSW",
    year: "2023",
    image: "/photos/alamour/660ad8_a6f9596a3cda48baa42a7ae9df202b38~mv2.jpg",
    category: "Retail",
    role: "Design Team Member",
    description: "A boutique gowns and accessories store in Paddington — 150m² of considered luxury where the architecture recedes to let the garments speak. Soft arches, tactile plaster walls, and bespoke joinery create an intimate, gallery-like atmosphere.",
    readTime: "4 min read",
    client: "Alamour",
    builder: "DT Corporation Pty Ltd",
    area: "150 sqm",
    designTeam: "Carla D'Angelo, Chloe Lam, Clarita Rojas, Carson Kwong & Sam Saenpao",
    gallery: [
      "/photos/alamour/660ad8_a6f9596a3cda48baa42a7ae9df202b38~mv2.jpg",
      "/photos/alamour/660ad8_40395b4164e9416e8bc12e38aeb68f9a~mv2.jpg",
      "/photos/alamour/660ad8_976a52b3cc1443c7bb888956010e4a19~mv2.jpg",
      "/photos/alamour/660ad8_bf3ab1c1ff7d4028b38511bb645a94d3~mv2.jpg",
      "/photos/alamour/660ad8_8358c18561314f2d8d8bd881e554cef2~mv2.jpg",
      "/photos/alamour/660ad8_f703100c72504c348b5ec87e278c5be3~mv2.jpg",
      "/photos/alamour/660ad8_bdcb1603c1dd441c80e10a0961352a4e~mv2.jpg",
      "/photos/alamour/660ad8_500b4b9054004341be46520796e85384~mv2.jpg",
      "/photos/alamour/660ad8_16846eadc80e45daa782b991323d9ee8~mv2.jpg",
    ],
  },
  {
    id: 12,
    title: "BYD Service Centre",
    location: "Mascot, NSW",
    year: "2023",
    image: "/photos/byd-service/660ad8_7839a370d3a446e8a0803c4f9f32d6c3~mv2.jpg",
    category: "Commercial",
    role: "Design Team Member",
    description: "A 6,500m² service centre for BYD Australia in Mascot — a large-scale commercial fitout balancing the operational demands of an automotive service environment with a clean, brand-forward spatial identity. Precision and efficiency informed every design decision.",
    readTime: "5 min read",
    client: "BYD Australia Pty Ltd",
    builder: "DT Corporation Pty Ltd",
    area: "6,500 sqm",
    designTeam: "Carla D'Angelo, Shaun Khor, Theresa Helen, Chloe Lam & Sam Saenpao",
    gallery: [
      "/photos/byd-service/660ad8_7839a370d3a446e8a0803c4f9f32d6c3~mv2.jpg",
      "/photos/byd-service/660ad8_d9c6acb19a5041d7853daa079e21fe3d~mv2.jpg",
      "/photos/byd-service/660ad8_7fabfe3c73e74d37b94c18943591619b~mv2.jpg",
      "/photos/byd-service/660ad8_a2b29df447b6467c8cf92b1069e17196~mv2.jpg",
      "/photos/byd-service/660ad8_3ce9acce2eb84d9c89b88b2b05df8ab0~mv2.jpg",
      "/photos/byd-service/660ad8_68debef6fe034d04a828d823da666241~mv2.jpg",
      "/photos/byd-service/660ad8_fed239b18010406a8f15137686bd1102~mv2.jpg",
      "/photos/byd-service/660ad8_bf4b9ce148b343258f0f873a466ebfe9~mv2.jpg",
      "/photos/byd-service/660ad8_f3f1f45c762a4939a12a57f4e1c69cf6~mv2.jpg",
      "/photos/byd-service/660ad8_3a33b91702cd43d397710ce42a54e1a3~mv2.jpg",
      "/photos/byd-service/660ad8_250ede72696a4d938d9b2120155bd7bf~mv2.jpg",
    ],
  },
  {
    id: 13,
    title: "KII International College",
    location: "Surry Hills, NSW",
    year: "2023",
    image: "/photos/kii-college/660ad8_e9fe37bc42d74f0bb15afc7f23941fd6~mv2.jpg",
    category: "Commercial",
    role: "Design Team Member",
    description: "A 350m² college fitout for Kingsford International Institute in Surry Hills — an educational environment designed to inspire focus, collaboration, and a sense of place for its international student community.",
    readTime: "4 min read",
    client: "Kingsford International Institute Pty Ltd",
    area: "350 sqm",
    designTeam: "Carla D'Angelo, Chloe Lam & Sam Saenpao",
    gallery: [
      "/photos/kii-college/660ad8_e9fe37bc42d74f0bb15afc7f23941fd6~mv2.jpg",
      "/photos/kii-college/660ad8_f4e5fa3dc31a46ce8ae9aa508aa92730~mv2.jpg",
      "/photos/kii-college/660ad8_7a1c4fa2a9394395825099133c5800bf~mv2.jpg",
      "/photos/kii-college/660ad8_11ceb6b7fa8043aab9de1566ebd13489~mv2.jpg",
      "/photos/kii-college/660ad8_3118529e5d3e4510a5eb92c2da96ea28~mv2.jpg",
      "/photos/kii-college/660ad8_f159d1cde07d4965b08affc82a6786fa~mv2.jpg",
      "/photos/kii-college/660ad8_e60d731899e14034aa7c592707a5746f~mv2.jpg",
    ],
  },
  {
    id: 14,
    title: "BYD Megastore",
    location: "Mascot, NSW",
    year: "2023",
    image: "/photos/byd-megastore/660ad8_17028e80b0e14c16b2da8ea9473ce68c~mv2.jpg",
    category: "Commercial",
    role: "Design Team Member",
    description: "A flagship showroom and megastore for BYD Australia in Mascot — a large-format automotive retail environment designed to showcase the full BYD vehicle lineup with an emphasis on brand immersion, spatial clarity, and a considered customer journey.",
    readTime: "5 min read",
    client: "BYD Australia Pty Ltd",
    builder: "DT Corporation Pty Ltd",
    designTeam: "Carla D'Angelo, Shaun Khor, Theresa Helen, Chloe Lam & Sam Saenpao",
    gallery: [
      "/photos/byd-megastore/660ad8_17028e80b0e14c16b2da8ea9473ce68c~mv2.jpg",
      "/photos/byd-megastore/660ad8_40c0d3b84f4941fb81e72393c688602d~mv2.jpg",
      "/photos/byd-megastore/660ad8_50ddbaef47f64dda9da1d3621b51922c~mv2.jpg",
      "/photos/byd-megastore/660ad8_7f874ca8c502419282c8e657ee97391a~mv2.jpg",
      "/photos/byd-megastore/660ad8_970fde96b9df4e6a9205eaed37a21ca2~mv2.jpg",
      "/photos/byd-megastore/660ad8_d6c243e117d3407d893c9350fd8fc199~mv2.jpg",
      "/photos/byd-megastore/660ad8_da61aff8b018487894c4e3896c7e6355~mv2.jpg",
      "/photos/byd-megastore/660ad8_e2209ef2648a416ca3ac72576d584adb~mv2.jpg",
      "/photos/byd-megastore/660ad8_e4cd51a17ff34b2bbac828d3ec821483~mv2.jpg",
      "/photos/byd-megastore/660ad8_fc6f26a7dcaf4a1983e5decb02c4d5f4~mv2.jpg",
      "/photos/byd-megastore/660ad8_fdc92f63e0b8431f88f37aa807407535~mv2.jpg",
    ],
  },
  {
    id: 15,
    title: "BYD Cafe Kiosk",
    location: "Mascot, NSW",
    year: "2023",
    image: "/photos/byd-cafe-kiosk/garden_cafe_perspective_interior.png",
    category: "Food & Beverage",
    role: "Design Team Member",
    description: "A refined cafe kiosk concept for BYD Australia's Mascot precinct — an intimate, hospitality-forward space designed to complement the broader BYD showroom campus. Warm materiality and considered spatial organisation create a welcoming environment for customers and visitors.",
    readTime: "3 min read",
    client: "BYD Australia Pty Ltd",
    builder: "DT Corporation Pty Ltd",
    designTeam: "Carla D'Angelo, Shaun Khor, Theresa Helen, Brian Yung, Chloe Lam & Sam Saenpao",
    gallery: [
      "/photos/byd-cafe-kiosk/garden_cafe_perspective_interior.png",
      "/photos/byd-cafe-kiosk/garden_cafe_perspective_counter.png",
      "/photos/byd-cafe-kiosk/garden_cafe_perspective_seating.png",
      "/photos/byd-cafe-kiosk/garden_cafe_axo_view01.png",
      "/photos/byd-cafe-kiosk/garden_cafe_axo_view02.png",
    ],
  },
];

const PROJECTS_TH: Record<number, { description: string; category: string }> = {
  1:  { category: 'การตกแต่งภายใน', description: 'การออกแบบภายในร้านเสริมสวยหรูหราที่กำหนดด้วยความอบอุ่น สัมผัส และความประณีตสงบ แผงขาวลายขีด ส่วนทองเหลืองอบอุ่น และพื้นผิวเทอร์ราซโซนุ่มนวลสร้างบรรยากาศแห่งความเพลิดเพลินสงบ — พื้นที่ที่ออกแบบให้ผู้มาเยือนทุกคนรู้สึกไม่เร่งรีบ' },
  6:  { category: 'อาหารและเครื่องดื่ม', description: 'การออกแบบคีออสก์ขนาดกะทัดรัดสำหรับไซต์อเล็กซานเดรียของ BYD ออสเตรเลีย — สร้างสมดุลระหว่างความสามารถในการให้บริการปริมาณสูงกับวัสดุอบอุ่นใกล้สวน ทุกรายละเอียดถูกแก้ปัญหาภายในพื้นที่ 50 ตร.ม. โดยไม่กระทบต่อคุณภาพเชิงพื้นที่' },
  7:  { category: 'อาหารและเครื่องดื่ม', description: 'บาร์บนดาดฟ้าและพื้นที่พักผ่อนสำหรับ EVT Limited ในฟอร์ติจูดวาลลีย์ — พื้นที่หลบหนีบนท้องฟ้า 250 ตร.ม. ที่ผสมผสานการบริการแบบสบาย ๆ กับวิวเมืองอันกว้างไกล การออกแบบสร้างสมดุลระหว่างช่วงเวลาสังสรรค์แบบโจ่งแจ้งกับพื้นที่พักผ่อนเงียบสงบทั่วดาดฟ้า' },
  8:  { category: 'ค้าปลีก', description: 'พื้นที่ค้าปลีกเครื่องใช้ในบ้านและเฟอร์นิเจอร์ขนาดใหญ่ 1,000 ตร.ม. ในซีฟอร์ด การออกแบบให้ความสำคัญกับการไหลของลูกค้าที่ใช้งานง่ายและการนำเสนอสินค้าที่สร้างแรงบันดาลใจ สร้างประสบการณ์โชว์รูมที่รู้สึกเป็นการคัดสรรมากกว่าเชิงพาณิชย์' },
  9:  { category: 'ค้าปลีก', description: 'โชว์รูมเฟอร์นิเจอร์ 250 ตร.ม. ในเซอร์รีฮิลส์ ออกแบบให้รู้สึกน้อยเหมือนร้านค้าและมากเหมือนสภาพแวดล้อมการอยู่อาศัยที่พิจารณาอย่างดี ทุกวิเนตต์ถูกสร้างขึ้นเพื่อแสดงเฟอร์นิเจอร์ในบริบท กระตุ้นให้ผู้มาเยือนชะลอความเร็วและมีส่วนร่วมกับชิ้นส่วนในเชิงพื้นที่' },
  10: { category: 'อาหารและเครื่องดื่ม', description: 'ร้านขายเนื้อและครัวเชิงพาณิชย์สำหรับ Alamour ในแพดดิงตัน — 250 ตร.ม. ที่แหล่งที่มาและงานฝีมือถูกแสดงออกผ่านทุกการตัดสินใจด้านวัสดุ ไม้ดิบ หินขัด และตู้เย็นเปิดโล่งสร้างพื้นที่ที่ซื่อสัตย์ต่ออาหารที่นำเสนอ' },
  11: { category: 'ค้าปลีก', description: 'ร้านชุดราตรีและเครื่องประดับบูติกในแพดดิงตัน — 150 ตร.ม. ของความหรูหราที่พิจารณาอย่างดีซึ่งสถาปัตยกรรมถอยลงเพื่อให้เสื้อผ้าพูดแทน ซุ้มโค้งนุ่มนวล ผนังปูนนุ่ม และงานไม้สั่งทำสร้างบรรยากาศส่วนตัวคล้ายแกลเลอรี' },
  12: { category: 'พาณิชยกรรม', description: 'ศูนย์บริการ 6,500 ตร.ม. สำหรับ BYD ออสเตรเลียในมาสคอต — การตกแต่งเชิงพาณิชย์ขนาดใหญ่ที่สร้างสมดุลระหว่างความต้องการด้านการปฏิบัติการของสภาพแวดล้อมบริการยานยนต์กับเอกลักษณ์เชิงพื้นที่ที่สะอาดและนำหน้าด้านแบรนด์' },
  13: { category: 'พาณิชยกรรม', description: 'การตกแต่งวิทยาลัย 350 ตร.ม. สำหรับ Kingsford International Institute ในเซอร์รีฮิลส์ — สภาพแวดล้อมการศึกษาที่ออกแบบเพื่อสร้างแรงบันดาลใจในการมุ่งเน้น การทำงานร่วมกัน และความรู้สึกเป็นของสถานที่สำหรับชุมชนนักศึกษานานาชาติ' },
  14: { category: 'พาณิชยกรรม', description: 'โชว์รูมหลักและเมกาสโตร์สำหรับ BYD ออสเตรเลียในมาสคอต — สภาพแวดล้อมค้าปลีกยานยนต์ขนาดใหญ่ที่ออกแบบเพื่อแสดงสายผลิตภัณฑ์รถยนต์ BYD ทั้งหมด โดยเน้นการดื่มด่ำกับแบรนด์ ความชัดเจนเชิงพื้นที่ และการเดินทางของลูกค้าที่พิจารณาอย่างดี' },
  15: { category: 'อาหารและเครื่องดื่ม', description: 'แนวคิดคีออสก์คาเฟ่ที่ประณีตสำหรับย่านมาสคอตของ BYD ออสเตรเลีย — พื้นที่การบริการที่เป็นมิตรและกะทัดรัดออกแบบเพื่อเสริมวิทยาเขตโชว์รูม BYD วัสดุอบอุ่นและการจัดพื้นที่ที่พิจารณาอย่างดีสร้างสภาพแวดล้อมต้อนรับสำหรับลูกค้าและผู้มาเยือน' },
};

// --- Archive Projects (Toggl Track — 204 projects) ---
interface ArchiveProject {
  name: string;
  hours: number;
  category: string;
}

const ARCHIVE_PROJECTS: ArchiveProject[] = [
  { name: "1901_15 EDWIN ST_OATLANDS", hours: 90.85, category: "Architecture" },
  { name: "1937_41 MURRAY ST_LANE COVE_COMPLETED", hours: 2.98, category: "Architecture" },
  { name: "2020.02_257 CLARENCE ST_FACADE+FLOOR PLANS", hours: 23.37, category: "Architecture" },
  { name: "2020.04_MISO WORLD SQUARE_SYDNEY", hours: 4.37, category: "Commercial" },
  { name: "2020.04_MISO WORLD SQUAR_SYDNEY", hours: 9.45, category: "Commercial" },
  { name: "2103_22 WARRAWEE AVE_WARRAWEE", hours: 5.03, category: "Architecture" },
  { name: "2104_221 BURRANEER BAY RD_CARINGBAH SOUTH", hours: 16.53, category: "Architecture" },
  { name: "2108_84 HOLLYWOOD ST_MONTEREY", hours: 26.37, category: "Architecture" },
  { name: "2122.01_87_BELLAMY ST_PENNANT HILLS", hours: 79.93, category: "Architecture" },
  { name: "21 SWALLOW AVENUE_MODBURY HEIGHT_SA", hours: 28.28, category: "Architecture" },
  { name: "2201_AR_106 WARRIGAL RD_CAMBERWELL", hours: 4.52, category: "Architecture" },
  { name: "2211_5 COBA POINT_BEROWRA", hours: 18.00, category: "Architecture" },
  { name: "2225_ANTS_288 FOREST RD_HURSTVILLE", hours: 17.64, category: "Commercial" },
  { name: "2228_UNIT 7_53 MOORE PARK RD_CENTENNIAL PARK", hours: 10.14, category: "Architecture" },
  { name: "2229_38 HICKSON RD_MILLERS POINT", hours: 242.11, category: "Architecture" },
  { name: "2231_32 MCCLELLAND ST_WILLOUGHBY", hours: 24.66, category: "Architecture" },
  { name: "2232_20 SOMERSET STREET_HURSTVILLE", hours: 60.05, category: "Architecture" },
  { name: "2301.73_HOPETOUN AVENUE_VAUCLUSE", hours: 2.34, category: "Architecture" },
  { name: "2301PS_613-615_PITTWATER RD_DEE WHY", hours: 1688.81, category: "Architecture" },
  { name: "2302.01_1_ELIZABETH ST_SYDNEY", hours: 9.91, category: "Architecture" },
  { name: "2302_AR_U12_13 ONSLOW AVE_POTTS POINT", hours: 88.26, category: "Architecture" },
  { name: "2302_G2_3 MOOLTAN AVE_MACQUARIE PARK", hours: 5.78, category: "Architecture" },
  { name: "2302PS_12 STUART STREET_WAHROONGA", hours: 217.61, category: "Architecture" },
  { name: "2303_4 KINGSFORD STREET_FAIRY MEADOWS", hours: 46.51, category: "Architecture" },
  { name: "2303_AR_97 RENWICK STREET_REDFERN", hours: 2.72, category: "Architecture" },
  { name: "2303PS_L6_12 TOMAS ST_CHATSWOOD", hours: 1.89, category: "Architecture" },
  { name: "2304_181 KINGSLAND RD_NORTH BEXLEY", hours: 21.19, category: "Architecture" },
  { name: "2304_AR_SOUL BRIGHT_ST LEONARD", hours: 49.52, category: "Commercial" },
  { name: "2305_19 LINDEN STREET_SUTHERLAND", hours: 0.67, category: "Architecture" },
  { name: "2306_484 TUGGERAWONG RD_TUGGERAWONG", hours: 17.28, category: "Architecture" },
  { name: "2307_39 ALLEYNE AVE_NORTH NARRABEEN", hours: 11.17, category: "Architecture" },
  { name: "2308_3 SOUTHERN ST_OATLEY", hours: 3.14, category: "Architecture" },
  { name: "2309_30 GRAY SPENCE CRESENT_WEST PENANT HILLS", hours: 105.31, category: "Architecture" },
  { name: "2311_3 PORTER ST_RYDE", hours: 17.85, category: "Architecture" },
  { name: "2312_KII_16-22 WENTWORTH AVE_SURRY HILLS", hours: 3.85, category: "Commercial" },
  { name: "2313_SUITE 208_288 FOREST RD_HURSTVILLE", hours: 22.73, category: "Commercial" },
  { name: "2314_155&155A_STUART ST_BLAKEHURST", hours: 122.68, category: "Architecture" },
  { name: "2315_46 CLARENCE ST_BERRY", hours: 123.34, category: "Architecture" },
  { name: "2316_83-91_RENWICK STREET_REDFERN", hours: 307.89, category: "Architecture" },
  { name: "2318_KII_TENANCY 3_LEVEL 1_NO 1 TULLY RD_EAST PERTH", hours: 50.32, category: "Commercial" },
  { name: "2319_SKC_413-421 GEORGE ST_66-70 YORK ST_SYDNEY", hours: 6.87, category: "Commercial" },
  { name: "2320_GREENFIELD CARE_82 FAIREY ROAD_SOUTH WINDSOR", hours: 107.11, category: "Commercial" },
  { name: "2320_GREENFIELD CARE_82 FAIREY ROAD_SOUTH WINDSOR (B)", hours: 13.36, category: "Commercial" },
  { name: "2322_29 STANLEY STREET_RANDWICK", hours: 240.99, category: "Architecture" },
  { name: "2323_14 WEST PARADE_CHATSWOOD", hours: 92.69, category: "Architecture" },
  { name: "2401_10 ALBERT RD_CROYDON PARK", hours: 122.58, category: "Architecture" },
  { name: "2401PS_1 TEDMAN PARADE_SYLVANIA", hours: 274.62, category: "Architecture" },
  { name: "2402_58 & 60_BELEMBA AVE_ROSELANDS", hours: 469.08, category: "Architecture" },
  { name: "2402_AR_WINE BAR_SHOPS 1&2_34-36A DARLINGHURST RD", hours: 3.53, category: "Hospitality" },
  { name: "2402PS_82 CECIL AVE_CASTLE HILL", hours: 215.27, category: "Architecture" },
  { name: "2403_AR_LEVEL 1_92 PITT STREET", hours: 4.58, category: "Architecture" },
  { name: "2403_NEUTRAL BAY OFFICE_NEUTRAL BAY", hours: 31.22, category: "Commercial" },
  { name: "2403PS_24 RAIMONDE ROAD_EASTWOOD", hours: 43.30, category: "Architecture" },
  { name: "2404_14 TAYLOR STREET_KOGARAH", hours: 5.84, category: "Architecture" },
  { name: "2404_TILLEY RECREATION PARK_SURREY DOWNS", hours: 6.01, category: "Architecture" },
  { name: "2404_TILLEY RECREATION PARK_SURREY DOWNS_SA", hours: 22.62, category: "Architecture" },
  { name: "2405_1-142 GREAT NORTH ROAD_FIVE DOCK", hours: 2.11, category: "Architecture" },
  { name: "2405_54 LIPPIZIAN RD_AUSTRAL", hours: 86.36, category: "Architecture" },
  { name: "2406_KEN'S MEGA EMPIRE", hours: 4.85, category: "Commercial" },
  { name: "2406_KEN'S MEGA EMPIRE (B)", hours: 0.00, category: "Commercial" },
  { name: "2409_GIRDLERS CAFE_NARABEEN", hours: 3.53, category: "Hospitality" },
  { name: "2410_88 BARANGAROO AVENUE_BARANGAROO", hours: 32.99, category: "Architecture" },
  { name: "2411_27 TYRWHITT ST_MAROUBRA", hours: 278.02, category: "Architecture" },
  { name: "2413_6 COONRARDOO PL_CASTLE HILL", hours: 109.79, category: "Architecture" },
  { name: "2414_NEXT LEVEL ESCAPE_80 PITT ST_SYDNEY", hours: 18.21, category: "Commercial" },
  { name: "2415_MINISO_L11_257 CLARENCE ST_SYD", hours: 10.70, category: "Commercial" },
  { name: "2416_51_1-5 MACKEON ST_MAROUBA", hours: 31.53, category: "Architecture" },
  { name: "2416_51_1-5 MACKEON ST_MAROUBRA (B)", hours: 0.42, category: "Architecture" },
  { name: "2417_UNIT 1_56-60 FOSTER STREET_SURRY HILLS", hours: 34.96, category: "Architecture" },
  { name: "2417_UNIT 1_56-60 FOSTER ST_SURRY HILLS (B)", hours: 4.45, category: "Architecture" },
  { name: "2418_LEVEL 1_128A_ERSKINEVILLE RD_ERSKINEVILLE", hours: 6.84, category: "Architecture" },
  { name: "2419_3 CHAPMAN ST_SURRY HILLS", hours: 5.61, category: "Architecture" },
  { name: "2420_RAITA NODA OMAKASE_SURRY HILLS", hours: 0.92, category: "Hospitality" },
  { name: "2422_MEDIWORK_L9_257 CLARENCE ST_SYD", hours: 9.30, category: "Commercial" },
  { name: "2501_NEXT LVL ESCAPE_72 BATHURST ST_SYD", hours: 0.99, category: "Commercial" },
  { name: "2502_4 KERRIBEE PLACE_CARLINGFORD", hours: 65.81, category: "Architecture" },
  { name: "2503_6 KERRIBEE PLACE_CARLINGFORD", hours: 60.09, category: "Architecture" },
  { name: "2504_32 LAWSON ST_PADDINGTON", hours: 12.22, category: "Architecture" },
  { name: "2505_127 AVOCA STREET_RANDWICK", hours: 3.17, category: "Architecture" },
  { name: "2506_5C_56 MILITARY RD_DOVER HEIGHTS", hours: 6.76, category: "Architecture" },
  { name: "2508_UNIT 9_1 BRIGHTON BLV_BONDI BEACH", hours: 6.44, category: "Architecture" },
  { name: "2510_2 TOR ROAD_DEE WHY", hours: 161.06, category: "Architecture" },
  { name: "2511_L11_27_ARGYLE ST_PARRAMATTA", hours: 4.22, category: "Architecture" },
  { name: "2512_61 LAVENDER STREET_MILSONS POINT_NSW 206", hours: 18.10, category: "Architecture" },
  { name: "2513_59 BORONIA RD_BELLEVUE HILL", hours: 42.45, category: "Architecture" },
  { name: "2517_DULCET_655_KINGS ST_ST PETERS", hours: 20.87, category: "Commercial" },
  { name: "2518_HEALTHCARE HOMELOANS_ST LEONARD", hours: 9.07, category: "Commercial" },
  { name: "2520_KEN'S ARC_SYDNEY", hours: 0.33, category: "Commercial" },
  { name: "2521_9_ASTON MARTIN PLACE_GOULBURN", hours: 21.46, category: "Architecture" },
  { name: "2522_PICKLE BALL_BLDG 17_NORTH HEAD_MANLY", hours: 10.65, category: "Architecture" },
  { name: "2531_10 KIMBERLEY COURT_BELLA VISTA_NSW 2153", hours: 22.48, category: "Architecture" },
  { name: "2533_SHOP 7_599 PACIFIC HIGHWAY_ST LEONARDS", hours: 5.77, category: "Commercial" },
  { name: "2534_LV 22_56 PITT STREET_SYDNEY_NSW 2000", hours: 2.50, category: "Architecture" },
  { name: "2535_58 LAKE RD_SWANSEA", hours: 72.49, category: "Architecture" },
  { name: "2540_22 ST PAULS STREET_RANDWICK", hours: 22.09, category: "Architecture" },
  { name: "2541_1 KIRBY WALK_114-120 JOYNTON AVE_ZETLAND NSW 2017", hours: 97.75, category: "Architecture" },
  { name: "2542_KTA OFFICE FITOUT", hours: 26.70, category: "Commercial" },
  { name: "2545_NEXT LEVEL_ESCAPE_L1_259 GEORGE ST_SYDNEY", hours: 17.12, category: "Commercial" },
  { name: "2546_162 ALMA RD_PADSTOW", hours: 25.31, category: "Architecture" },
  { name: "2547_SHOP 119_2-8 DIXON STREET_SYDNEY NSW 2000", hours: 11.05, category: "Commercial" },
  { name: "2549_2-4 PORTER ST_RYDE_NSW", hours: 20.61, category: "Architecture" },
  { name: "2553_129 MEEHAN DRIVE_KIAMA DOWNS", hours: 17.17, category: "Architecture" },
  { name: "2604_68 HARBOUR STREET_HAYMARKET_NSW", hours: 164.29, category: "Hospitality" },
  { name: "29 MALTON ROAD_BEECROFT", hours: 4.62, category: "Architecture" },
  { name: "39 PENNANT PARADE_CARLINGFORD", hours: 12.42, category: "Architecture" },
  { name: "57_19A_YOUNG ST_NEUTRAL BAY", hours: 30.87, category: "Architecture" },
  { name: "7 ST NEOT AVE", hours: 0.00, category: "Architecture" },
  { name: "ADMIN", hours: 30.45, category: "Studio" },
  { name: "AKD-2102_34 STREATFIELD ROAD_BELLEVUE HILL", hours: 276.32, category: "Architecture" },
  { name: "BS-2201_QUIRK", hours: 11.01, category: "Commercial" },
  { name: "BS-2301_AUSTIN_NORTH CURL CURL", hours: 16.80, category: "Architecture" },
  { name: "CHIG-2001_SERVICE APARTMENTS DRAFTING", hours: 38.51, category: "Hospitality" },
  { name: "CIHG-2202_INFINITY CONFERENCE CENTER_CONFERENCE CENTRE", hours: 113.88, category: "Hospitality" },
  { name: "CIHG-2401_INFINITY CONFERENCE CENTER_BASE BUILDING UPGRADE", hours: 1.15, category: "Hospitality" },
  { name: "DT-2105_10 JAMES STREET_WATERLOO", hours: 28.16, category: "Commercial" },
  { name: "DT-2201_80 WILLIAM ST_DARLINGHURST", hours: 18.15, category: "Commercial" },
  { name: "DT-2201_80 WILLIAM STREET_DARLINGHURST", hours: 59.91, category: "Commercial" },
  { name: "DT-2210_60-70 WILLIAM ST_WOOLOOMOOLOO_GYM", hours: 1.25, category: "Commercial" },
  { name: "DT-2301_HAIR SALON II", hours: 1.25, category: "Commercial" },
  { name: "DT-2302_BYD MEGASTORE_MASCOT", hours: 104.13, category: "Automotive" },
  { name: "DT-2303_REJUVED", hours: 8.46, category: "Commercial" },
  { name: "DT-2304_PALMER STREET HOUSE", hours: 1.49, category: "Architecture" },
  { name: "DT-2305_BYD CAFE KIOSKS_MASCOT", hours: 34.34, category: "Automotive" },
  { name: "DT-2307_BETTA_SEAFORD", hours: 62.56, category: "Commercial" },
  { name: "DT-2308_BETTA_PIMPAMA", hours: 104.44, category: "Commercial" },
  { name: "DT-2310_BYD_SERVICE CENTRE_MASCOT", hours: 8.37, category: "Automotive" },
  { name: "DT-2310_BYD_WAREHOUSE_MASCOT", hours: 4.70, category: "Automotive" },
  { name: "DT-2311_L2_168 CHALMERS ST_SURRY HILLS", hours: 7.95, category: "Commercial" },
  { name: "DT-2312_114 DEVONSHIRE ST_SURRY HILLS", hours: 4.30, category: "Commercial" },
  { name: "DT-2313_483 RILEY STREET_SURRY HILLS", hours: 23.50, category: "Commercial" },
  { name: "DT-2317_L3_100 NEW SOUTH HEAD RD_EDGECLIFF", hours: 13.62, category: "Commercial" },
  { name: "DT-2318_35 TUMBALONG BLV_HAYMARKET", hours: 4.37, category: "Commercial" },
  { name: "DT-2319_CHROMA TUNNEL+STUDIO_APOLLO BAY", hours: 14.32, category: "Commercial" },
  { name: "DT-2320_834 ELIZABETH ST_WATERLOO", hours: 6.24, category: "Commercial" },
  { name: "DT-2401_BYD HABBERFIELD_107-113 PARRAMATTA RD", hours: 92.20, category: "Automotive" },
  { name: "DT-2401_BYD HABBERFIELD_107-113 PARRAMATTA RD (B)", hours: 0.00, category: "Automotive" },
  { name: "DT-2403_30 BOWDEN STREET", hours: 12.04, category: "Commercial" },
  { name: "DT-2405_BOURKE&BOWDEN_ALEXANDRIA", hours: 9.48, category: "Commercial" },
  { name: "DT-2407_645 HARRIS ST_ULTIMO", hours: 20.79, category: "Commercial" },
  { name: "DT-2408_SHOP 2_255 OXFORD ST_PADDINGTON", hours: 25.05, category: "Commercial" },
  { name: "DT-2409_SONDERS_834 ELIZABETH ST_WATERLOO_NSW 2017", hours: 1.52, category: "Commercial" },
  { name: "DT-2501_1-9 GLEBE POINT RD_GLEBE", hours: 19.93, category: "Commercial" },
  { name: "DT-2506_LEVEL 11_82 ELIZABETH ST_SYDNEY", hours: 50.60, category: "Commercial" },
  { name: "DT-2507_LEVEL 1_350 GEORGE ST_SYDNEY 2000", hours: 5.19, category: "Commercial" },
  { name: "DT-2508_7-13 PARRAWEEN ST_CREMORNE", hours: 2.25, category: "Commercial" },
  { name: "DT-2510_DENZA BYD_50 MCLACHLAN AVE_DARLINGHURST NSW 2010", hours: 15.09, category: "Automotive" },
  { name: "DT-2511_DENZA OFFICE_SHOP 159_BLDG E_50 MCLACHLAN AVE_DARLINGHURST", hours: 10.17, category: "Automotive" },
  { name: "DT-2512_1 WEST STREET_NORTH SYDNEY", hours: 33.80, category: "Commercial" },
  { name: "DT-2517_DENZA INTERIOR JOINERY DETAILS", hours: 22.91, category: "Automotive" },
  { name: "DT-2604_DENZA SERVICE CENTER_89 GRIFFTHS ROAD_LAMBTON", hours: 6.32, category: "Automotive" },
  { name: "EV-2301_BYD POD_377 HUME HWY_LIVERPOOL", hours: 23.18, category: "Automotive" },
  { name: "EV-2302_MAZDA SUTHERLAND_26-28 WARATAH STREET_KIRRAWEE", hours: 29.88, category: "Automotive" },
  { name: "EV-2303_MAZDA LIVERPOOL_365 HUME HWY_LIVERPOOL", hours: 10.97, category: "Automotive" },
  { name: "F2023_024_648 BOURKE STREET_REDFERN", hours: 16.28, category: "Architecture" },
  { name: "F2024_012_7 NEOT AVE_POTTS POINT", hours: 20.44, category: "Architecture" },
  { name: "F2024_013_GIRDLERS CAFE", hours: 6.24, category: "Hospitality" },
  { name: "HT-2101_LEVEL 5_40 MACLEAY ST_POTTS POINT", hours: 3.15, category: "Hospitality" },
  { name: "HT-2105_902_LEVEL 9&10_40 MACLEAY ST_POTTS POINT", hours: 125.49, category: "Hospitality" },
  { name: "HT-2106_12 WILLIAM LANE_WOOLLOOMOOLOO", hours: 22.84, category: "Hospitality" },
  { name: "K5_2206_KFIVE SHOWROOM_SURRY HILLS", hours: 8.68, category: "Interior & Furniture" },
  { name: "K5_2301_JOINERY OPTIONS", hours: 7.98, category: "Interior & Furniture" },
  { name: "K5_2302_GROUNDS FURNITURE", hours: 9.55, category: "Interior & Furniture" },
  { name: "K5_2303_EXAMINATION BED", hours: 1.34, category: "Interior & Furniture" },
  { name: "K5_2303_LORRETO SCHOOL", hours: 19.20, category: "Interior & Furniture" },
  { name: "K5_2305_TRUGANINA", hours: 1.96, category: "Interior & Furniture" },
  { name: "K5_2306_GHERKIN PADDING", hours: 1.12, category: "Interior & Furniture" },
  { name: "K5-2307_HIGHPOINT VALET", hours: 5.01, category: "Interior & Furniture" },
  { name: "K5-2401_LVL 4 RIVER ST_MELBOURNE", hours: 13.11, category: "Interior & Furniture" },
  { name: "K5-2403_SPORTS HOUSE", hours: 4.40, category: "Interior & Furniture" },
  { name: "K5-2405_DRUM THEATER_226_LONSDALE ST_DANDENONG", hours: 2.26, category: "Interior & Furniture" },
  { name: "K5_2513_MONASH CIVIC", hours: 9.80, category: "Interior & Furniture" },
  { name: "K5_2601_MELBOURNE EXHIBITION CENTRE", hours: 23.42, category: "Interior & Furniture" },
  { name: "OGC-2501_MACQUARIE PARK", hours: 87.41, category: "Commercial" },
  { name: "OGC-2502_EASTLAKES_MISC", hours: 19.66, category: "Commercial" },
  { name: "OGC-2503_INFINITY_MISC", hours: 2.76, category: "Commercial" },
  { name: "OGC-2602_SATUNG BALI", hours: 4.63, category: "Commercial" },
  { name: "PF-1902_L4 50 CARRINGTON ST_SYD", hours: 0.64, category: "Architecture" },
  { name: "PF-2301_LVL 13_SECURE PARKING_99 MOUNT ST_NORTH SYDNEY", hours: 26.52, category: "Architecture" },
  { name: "SG-2401_INFINITY CONFERENCE CENTER_BASE BUILDING UPGRADE", hours: 28.10, category: "Commercial" },
  { name: "TC-2402_PANDANUS PARK", hours: 1.69, category: "Architecture" },
  { name: "TC-2402_PHYSICAL MODEL", hours: 0.72, category: "Architecture" },
  { name: "TC-2402_WA PROJECT", hours: 12.42, category: "Architecture" },
  { name: "UFO-2006_2 WEETAWA RD_NORTHBRIDGE", hours: 13.84, category: "Architecture" },
  { name: "UFO-2009_4 ROYSTON ST_DARLINGHURST", hours: 14.74, category: "Architecture" },
  { name: "UFO-2206_BIKRAM YOGA_OXFORD ST_DARLINGHURST", hours: 60.83, category: "Commercial" },
  { name: "UFO-2208_BEIGENE_L4 GEORGE ST", hours: 23.28, category: "Commercial" },
  { name: "UFO-2214_2 WEETAWA RD_NORTHBRIDGE_INTERIOR", hours: 17.76, category: "Architecture" },
  { name: "UFO-2301_FAMILY SERVICES AUSTRALIA", hours: 1.90, category: "Commercial" },
  { name: "UFO-2305_CARPARK_757 NEW SOUTH HEAD RD_ROSE BAY", hours: 7.49, category: "Architecture" },
  { name: "UFO-2306_KING ISLAND MEAT CO_PADDINGTON", hours: 122.23, category: "Commercial" },
  { name: "UFO-2307_NDY_L13_90 ARTHUR ST_NORTH SYDNEY", hours: 9.22, category: "Commercial" },
  { name: "UFO-2308_489 PACIFIC HWY_PENRITH", hours: 5.94, category: "Architecture" },
  { name: "UFO-2309_DEPOT_18 ABBOTT RD_SEVEN HILLS", hours: 133.66, category: "Commercial" },
  { name: "UFO-2310_FRENCH CONSULATE", hours: 9.65, category: "Architecture" },
  { name: "UFO-2312_ETEX GROUP", hours: 1.26, category: "Commercial" },
  { name: "UFO-2314_LYLO ROOFTOP BAR_QLD", hours: 111.92, category: "Hospitality" },
  { name: "UFO-2315_120 SUSSEX STREET_SYDNEY", hours: 13.50, category: "Architecture" },
  { name: "UFO-2401_TERRY HILLS CLUB HOUSE_TERRY HILLS", hours: 18.49, category: "Architecture" },
  { name: "UFO-2404_DICKSON VILLAGE_ACT", hours: 3.59, category: "Architecture" },
  { name: "UFO-2407_477 PITT ST CAFE_SYDNEY", hours: 32.81, category: "Hospitality" },
  { name: "UFO-2412_SELECT PLANT AUSTRALIA_VIC", hours: 0.18, category: "Commercial" },
  { name: "UFO-2413_CROWN_1 BARANGAROO AVE", hours: 23.18, category: "Architecture" },
  { name: "UFO-2417_L21_83_CLARENCE ST_SYDNEY", hours: 0.50, category: "Architecture" },
  { name: "UFO-2502_PELOTON_20 MARTIN PLACE_SYDNEY", hours: 2.32, category: "Commercial" },
  { name: "UFO-2505_CAMMERAY SQUARE_SHOPPING CENTER", hours: 0.00, category: "Commercial" },
];

const ARCHIVE_CATEGORIES = ['All', 'Architecture', 'Commercial', 'Hospitality', 'Interior & Furniture', 'Automotive', 'Studio'];

// --- Project Archive Modal ---
function ProjectArchiveModal({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLang();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'hours' | 'name'>('hours');

  const totalHours = ARCHIVE_PROJECTS.reduce((sum, p) => sum + p.hours, 0);

  const filtered = ARCHIVE_PROJECTS
    .filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => sortBy === 'hours' ? b.hours - a.hours : a.name.localeCompare(b.name));

  const categoryCounts = ARCHIVE_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === 'All' ? ARCHIVE_PROJECTS.length : ARCHIVE_PROJECTS.filter(p => p.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  const categoryColors: Record<string, string> = {
    'Architecture': 'bg-stone-800 text-stone-100',
    'Commercial': 'bg-amber-100 text-amber-800',
    'Hospitality': 'bg-sky-100 text-sky-800',
    'Interior & Furniture': 'bg-rose-100 text-rose-800',
    'Automotive': 'bg-emerald-100 text-emerald-800',
    'Studio': 'bg-violet-100 text-violet-800',
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[#fdfaf6] flex flex-col"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="border-b border-stone-200 px-8 md:px-16 py-6 flex items-center justify-between flex-shrink-0">
        <div>
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-400 block mb-1">{t('projectArchive')}</span>
          <h2 className="text-2xl md:text-3xl font-display font-light text-stone-900">
            {ARCHIVE_PROJECTS.length} Projects · {Math.round(totalHours).toLocaleString()}h Total
          </h2>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-200 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Controls */}
      <div className="px-8 md:px-16 py-5 border-b border-stone-100 flex-shrink-0 flex flex-col md:flex-row gap-4 md:items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs border border-stone-200 bg-white focus:outline-none focus:border-stone-400 font-light text-stone-800 placeholder-stone-400"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-400">{t('sortLabel')}</span>
          <button
            onClick={() => setSortBy('hours')}
            className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.25em] border transition-all duration-200 ${sortBy === 'hours' ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-200 text-stone-500 hover:border-stone-400'}`}
          >{t('hoursLabel')}</button>
          <button
            onClick={() => setSortBy('name')}
            className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.25em] border transition-all duration-200 ${sortBy === 'name' ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-200 text-stone-500 hover:border-stone-400'}`}
          >{t('nameLabel')}</button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-8 md:px-16 py-4 border-b border-stone-100 flex-shrink-0 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {ARCHIVE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.25em] border transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'border-stone-200 text-stone-500 hover:border-stone-500 hover:text-stone-800'
              }`}
            >
              {cat} <span className="opacity-60">({categoryCounts[cat]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-8 md:px-16 py-3 flex-shrink-0">
        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-400">
          {filtered.length} {filtered.length === 1 ? 'project' : 'projects'} shown
        </span>
      </div>

      {/* Project List */}
      <div className="flex-1 overflow-y-auto px-8 md:px-16 pb-12">
        <div className="divide-y divide-stone-100">
          {filtered.map((project, idx) => (
            <motion.div
              key={project.name}
              className="flex items-center justify-between py-4 group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(idx * 0.01, 0.3) }}
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="text-[9px] font-mono text-stone-300 w-8 flex-shrink-0 text-right">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-light text-stone-700 tracking-wide truncate group-hover:text-stone-900 transition-colors">
                    {project.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                <span className={`hidden md:inline-block px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.2em] rounded-sm ${categoryColors[project.category] || 'bg-stone-100 text-stone-600'}`}>
                  {project.category}
                </span>
                <span className="text-[10px] font-mono text-stone-500 w-20 text-right">
                  {project.hours >= 10 ? `${project.hours.toFixed(0)}h` : `${project.hours.toFixed(2)}h`}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-sm font-light text-stone-400">{lang === 'th' ? `ไม่พบโครงการสำหรับ "${search}"` : `No projects found for "${search}"`}</p>
          </div>
        )}

        {/* Total hours footer */}
        {filtered.length > 0 && (
          <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-400">
              {filtered.length} projects
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-400">{t('totalHours')}</span>
              <span className="text-lg font-mono font-light text-stone-800">
                {filtered.reduce((sum, p) => sum + p.hours, 0).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}h
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

const ARTICLES: Article[] = [
  {
    id: 13,
    title: "155 & 155A Stuart Street — Blakehurst",
    excerpt: "A dual-occupancy residential project in Blakehurst — two architecturally resolved dwellings designed for a tight suburban site. The design negotiates street presentation, privacy, and natural light with a composed facade, considered garage integration, and a material palette suited to the leafy southern Sydney context.",
    image: "/photos/stuart-st-blakehurst/VIEW 01.jpg",
    category: "Current Project",
    date: "2023 — In Progress",
    readTime: "5 min read",
    featured: true,
    gallery: [
      "/photos/stuart-st-blakehurst/VIEW 01.jpg",
      "/photos/stuart-st-blakehurst/VIEW 02.jpg",
      "/photos/stuart-st-blakehurst/VIEW 03.jpg",
      "/photos/stuart-st-blakehurst/GARAGE OPEN.jpg",
      "/photos/stuart-st-blakehurst/GARAGE CLOSED.jpg",
      "/photos/stuart-st-blakehurst/GARAGE OPEN_TIMBER.jpg",
      "/photos/stuart-st-blakehurst/GARAGE CLOSED_TIMBER.jpg",
      "/photos/stuart-st-blakehurst/AXO.jpg",
      "/photos/stuart-st-blakehurst/stuart_overall_view01.png",
      "/photos/stuart-st-blakehurst/stuart_overall_view02.png",
      "/photos/stuart-st-blakehurst/stuart_overall_view03.png",
      "/photos/stuart-st-blakehurst/stuart_axonometric_view.png",
    ],
  },
  {
    id: 12,
    title: "613–615 Pittwater Road — Dee Why",
    excerpt: "The largest project in the studio — a large-scale residential development on Pittwater Road, Dee Why. Spanning over 1,688 hours of design work, the project encompasses multiple building options, unit typologies, and detailed documentation across a significant mixed-use site on Sydney's Northern Beaches.",
    image: "/photos/pittwater-rd-dee-why/building-a-option-1.jpg",
    category: "Current Project",
    date: "2023–2024",
    readTime: "8 min read",
    featured: true,
    gallery: [
      "/photos/pittwater-rd-dee-why/building-a-option-1.jpg",
      "/photos/pittwater-rd-dee-why/building-a-option-2.jpg",
      "/photos/pittwater-rd-dee-why/building-a-option-3.jpg",
      "/photos/pittwater-rd-dee-why/building-a-option-4.jpg",
      "/photos/pittwater-rd-dee-why/unit-ag04-view-01.jpg",
      "/photos/pittwater-rd-dee-why/unit-ag04-view-02.jpg",
      "/photos/pittwater-rd-dee-why/unit-ag04-view-03.jpg",
      "/photos/pittwater-rd-dee-why/unit-ag04-view-04.jpg",
      "/photos/pittwater-rd-dee-why/type-l-axo-01.png",
      "/photos/pittwater-rd-dee-why/type-l-axo-02.png",
    ],
  },
  {
    id: 11,
    title: "27 Tyrwhitt Street — Maroubra",
    excerpt: "A residential architecture project in Maroubra — a considered street-facing home that negotiates a sloping site with clarity and restraint. The exterior composition balances privacy with openness using clean geometric forms and a robust material palette suited to the coastal suburban context.",
    image: "/photos/tyrwhitt-maroubra/ext-01.png",
    category: "Current Project",
    date: "2024 — In Progress",
    readTime: "5 min read",
    featured: true,
    gallery: [
      "/photos/tyrwhitt-maroubra/ext-01.png",
      "/photos/tyrwhitt-maroubra/ext-02.png",
      "/photos/tyrwhitt-maroubra/ext-03.png",
    ],
  },
  {
    id: 10,
    title: "Macquarie Park — Mixed-Use Development",
    excerpt: "A mixed-use development study for Macquarie Park exploring building massing, height limits, and design options within the site's planning envelope. Detailed height limit analysis and volumetric modelling tested feasibility across multiple design scenarios.",
    image: "/photos/macquarie-park/display-render-01.jpg",
    category: "Current Project",
    date: "2025 — In Progress",
    readTime: "5 min read",
    featured: true,
    gallery: [
      "/photos/macquarie-park/display-render-01.jpg",
      "/photos/macquarie-park/display-render-02.jpg",
      "/photos/macquarie-park/display-render-03.jpg",
      "/photos/macquarie-park/height-diagram-01.jpg",
      "/photos/macquarie-park/height-diagram-02.jpg",
      "/photos/macquarie-park/height-diagram-03.jpg",
      "/photos/macquarie-park/height-diagram-04.jpg",
    ],
  },
  {
    id: 4,
    title: "68 Harbour Street — Furama Darling Harbour: Lobby & Canteen",
    excerpt: "An ongoing hospitality transformation at the iconic Furama Hotel on Harbour Street — reimagining the lobby and canteen as a warm, layered welcome for guests arriving at the edge of Darling Harbour. The design draws on soft materiality and considered lighting to create a sense of arrival that feels both refined and grounded.",
    image: "/photos/furama-haymarket/furama-01.jpg",
    category: "Current Project",
    date: "2025 — In Progress",
    readTime: "5 min read",
    featured: true,
    gallery: [
      "/photos/furama-haymarket/furama-01.jpg",
      "/photos/furama-haymarket/furama-02.jpg",
      "/photos/furama-haymarket/furama-03.jpg",
      "/photos/furama-haymarket/furama-04.jpg",
      "/photos/furama-haymarket/furama-05.jpg",
      "/photos/furama-haymarket/furama-06.jpg",
      "/photos/furama-haymarket/furama-07.jpg",
    ],
  },
  {
    id: 5,
    title: "58 & 60 Belemba Avenue — Roselands",
    excerpt: "An ongoing residential transformation across two adjoining properties in Roselands — thoughtfully designed to balance privacy, connection, and the rhythms of everyday life. The project explores how considered spatial planning and material warmth can elevate suburban living into something genuinely felt.",
    image: "/photos/belemba-roselands/img-009.jpg",
    category: "Current Project",
    date: "2025 — In Progress",
    readTime: "5 min read",
    featured: true,
    gallery: [
      "/photos/belemba-roselands/img-009.jpg",
      "/photos/belemba-roselands/img-018.jpg",
      "/photos/belemba-roselands/img-027.jpg",
      "/photos/belemba-roselands/img-029.jpg",
      "/photos/belemba-roselands/img-031.jpg",
      "/photos/belemba-roselands/img-033.jpg",
      "/photos/belemba-roselands/img-040.jpg",
      "/photos/belemba-roselands/img-047.jpg",
      "/photos/belemba-roselands/img-054.jpg",
      "/photos/belemba-roselands/img-061.jpg",
      "/photos/belemba-roselands/img-067.jpg",
      "/photos/belemba-roselands/img-073.jpg",
      "/photos/belemba-roselands/img-079.jpg",
      "/photos/belemba-roselands/img-085.jpg",
      "/photos/belemba-roselands/img-091.jpg",
      "/photos/belemba-roselands/img-094.jpg",
      "/photos/belemba-roselands/img-097.jpg",
    ],
  },
  {
    id: 6,
    title: "K5 Monash Civic — Furniture & Interior Concept",
    excerpt: "An ongoing furniture and interior concept for the K5 Monash Civic fitout — curating a palette of considered pieces that balance civic function with warmth and character. Each selection responds to the scale and purpose of the space, creating an environment that feels both purposeful and welcoming.",
    image: "/photos/k5-monash-civic/k5-monash-01.jpg",
    category: "Current Project",
    date: "2025 — In Progress",
    readTime: "4 min read",
    featured: true,
    gallery: [
      "/photos/k5-monash-civic/k5-monash-01.jpg",
      "/photos/k5-monash-civic/k5-monash-02.jpg",
      "/photos/k5-monash-civic/k5-monash-03.jpg",
      "/photos/k5-monash-civic/k5-monash-04.jpg",
      "/photos/k5-monash-civic/k5-monash-05.jpg",
      "/photos/k5-monash-civic/k5-monash-06.jpg",
      "/photos/k5-monash-civic/k5-monash-07.jpg",
      "/photos/k5-monash-civic/k5-monash-08.jpg",
      "/photos/k5-monash-civic/k5-monash-09.jpg",
      "/photos/k5-monash-civic/k5-monash-10.jpg",
      "/photos/k5-monash-civic/k5-monash-11.jpg",
      "/photos/k5-monash-civic/k5-monash-12.jpg",
      "/photos/k5-monash-civic/k5-monash-13.jpg",
      "/photos/k5-monash-civic/k5-monash-14.jpg",
    ],
  },
  {
    id: 7,
    title: "1 Kirby Walk — Zetland",
    excerpt: "An ongoing concept design for the lobby and residential amenity spaces at 1 Kirby Walk, Zetland — a project exploring how warmth and materiality can be introduced into a large-scale residential development without losing intimacy. Timber, stone, and considered lighting work together to create a sense of arrival that feels genuinely residential.",
    image: "/photos/kirby-walk-zetland/kirby-01.jpg",
    category: "Current Project",
    date: "2025 — In Progress",
    readTime: "5 min read",
    featured: true,
    gallery: [
      "/photos/kirby-walk-zetland/kirby-01.jpg",
      "/photos/kirby-walk-zetland/kirby-02.jpg",
      "/photos/kirby-walk-zetland/kirby-03.jpg",
      "/photos/kirby-walk-zetland/kirby-04.jpg",
      "/photos/kirby-walk-zetland/kirby-05.jpg",
      "/photos/kirby-walk-zetland/kirby-06.jpg",
      "/photos/kirby-walk-zetland/kirby-07.jpg",
      "/photos/kirby-walk-zetland/kirby-08.jpg",
      "/photos/kirby-walk-zetland/kirby-09.jpg",
      "/photos/kirby-walk-zetland/kirby-10.jpg",
      "/photos/kirby-walk-zetland/kirby-11.jpg",
      "/photos/kirby-walk-zetland/kirby-12.jpg",
    ],
  },
  {
    id: 9,
    title: "1 West Street — North Sydney",
    excerpt: "A commercial office fitout in the heart of North Sydney — designed to foster collaboration and focus within a compact floor plate. Clean lines, considered material selection, and a neutral palette create a professional environment that feels both refined and approachable.",
    image: "/photos/west-st-north-sydney/Riedel_building_view1.jpg",
    category: "Current Project",
    date: "2024 — Completed",
    readTime: "3 min read",
    featured: true,
    gallery: [
      "/photos/west-st-north-sydney/Riedel_building_view1.jpg",
      "/photos/west-st-north-sydney/Riedel_building_view2.jpg",
    ],
  },
  {
    id: 8,
    title: "12 Stuart Street — Wahroonga Residence",
    excerpt: "A warm residential interior for a Wahroonga family home — centred on a refined kitchen and dining space that balances everyday functionality with considered materiality. Timber joinery, soft stone surfaces, and layered lighting bring a sense of calm domesticity to the heart of the home.",
    image: "/photos/stuart-st-wahroonga/dining-view.png",
    category: "Current Project",
    date: "2023 — Completed",
    readTime: "4 min read",
    featured: true,
    gallery: [
      "/photos/stuart-st-wahroonga/dining-view.png",
      "/photos/stuart-st-wahroonga/formal-dining.png",
      "/photos/stuart-st-wahroonga/kitchen-view.png",
      "/photos/stuart-st-wahroonga/kitchen-view2.png",
    ],
  },
];

const ARTICLES_TH: Record<number, { title: string; excerpt: string; category: string }> = {
  13: {
    title: "155 & 155A ถนนสจ๊วต — เบลคเฮิร์สต์",
    excerpt: "โครงการที่อยู่อาศัยสองหน่วยในเบลคเฮิร์สต์ — สองยูนิตที่ออกแบบอย่างพิถีพิถันสำหรับที่ดินชานเมืองขนาดกะทัดรัด การออกแบบจัดการกับการนำเสนอหน้าถนน ความเป็นส่วนตัว และแสงธรรมชาติ ด้วยส่วนหน้าอาคารที่เป็นระเบียบ การจัดโรงรถที่พิจารณาอย่างดี และจานวัสดุที่เหมาะสมกับบริบทชานเมืองทางใต้ของซิดนีย์",
    category: "โครงการปัจจุบัน",
  },
  12: {
    title: "613–615 ถนนพิตต์วอเตอร์ — ดีไวย์",
    excerpt: "โครงการที่ใหญ่ที่สุดในสตูดิโอ — การพัฒนาที่อยู่อาศัยขนาดใหญ่บนถนนพิตต์วอเตอร์ ดีไวย์ ครอบคลุมชั่วโมงการออกแบบกว่า 1,688 ชั่วโมง โครงการรวมตัวเลือกอาคารหลายรูปแบบ ประเภทยูนิต และเอกสารรายละเอียดทั่วทั้งไซต์ผสมผสานขนาดใหญ่บนชายฝั่งทางเหนือของซิดนีย์",
    category: "โครงการปัจจุบัน",
  },
  11: {
    title: "27 ถนนไทร์วิตต์ — มาเรบรา",
    excerpt: "โครงการสถาปัตยกรรมที่อยู่อาศัยในมาเรบรา — บ้านหันหน้าสู่ถนนที่ออกแบบอย่างเหมาะเจาะ สร้างสมดุลบนที่ดินลาดเอียงด้วยความชัดเจนและความพอดี องค์ประกอบภายนอกสร้างสมดุลระหว่างความเป็นส่วนตัวและความเปิดโล่งด้วยรูปทรงเรขาคณิตสะอาดและจานวัสดุที่แข็งแกร่งเหมาะกับบริบทชานเมืองชายฝั่ง",
    category: "โครงการปัจจุบัน",
  },
  10: {
    title: "แมคควารีพาร์ค — การพัฒนาแบบผสมผสาน",
    excerpt: "การศึกษาการพัฒนาแบบผสมผสานสำหรับแมคควารีพาร์ค สำรวจขนาดอาคาร ข้อจำกัดความสูง และตัวเลือกการออกแบบภายในขอบเขตการวางผังไซต์ การวิเคราะห์ขีดจำกัดความสูงอย่างละเอียดและการสร้างแบบจำลองเชิงปริมาตรทดสอบความเป็นไปได้ในหลายสถานการณ์การออกแบบ",
    category: "โครงการปัจจุบัน",
  },
  4: {
    title: "68 ถนนฮาร์เบอร์ — ฟูรามา ดาร์ลิ่งฮาร์เบอร์: ล็อบบี้และโรงอาหาร",
    excerpt: "การเปลี่ยนแปลงด้านการบริการที่กำลังดำเนินอยู่ที่โรงแรมฟูรามาอันโดดเด่นบนถนนฮาร์เบอร์ — ออกแบบล็อบบี้และโรงอาหารใหม่ให้เป็นการต้อนรับที่อบอุ่นและมีชั้นเชิงสำหรับแขกที่มาถึงขอบดาร์ลิ่งฮาร์เบอร์ การออกแบบดึงเอาวัสดุนุ่มนวลและแสงสว่างที่ใส่ใจมาสร้างความรู้สึกแห่งการมาถึงที่ทั้งประณีตและกลมกลืน",
    category: "โครงการปัจจุบัน",
  },
  5: {
    title: "58 & 60 ถนนเบเลมบา — โรสแลนด์ส",
    excerpt: "การเปลี่ยนแปลงที่อยู่อาศัยที่กำลังดำเนินอยู่ทั่วสองที่ดินติดกันในโรสแลนด์ส — ออกแบบอย่างใส่ใจเพื่อสร้างสมดุลระหว่างความเป็นส่วนตัว การเชื่อมต่อ และจังหวะของชีวิตประจำวัน โครงการสำรวจว่าการวางแผนพื้นที่ที่รอบคอบและความอบอุ่นของวัสดุสามารถยกระดับการอยู่อาศัยในชานเมืองให้เป็นสิ่งที่รู้สึกได้จริงได้อย่างไร",
    category: "โครงการปัจจุบัน",
  },
  6: {
    title: "K5 Monash Civic — แนวคิดเฟอร์นิเจอร์และการตกแต่งภายใน",
    excerpt: "แนวคิดเฟอร์นิเจอร์และการตกแต่งภายในที่กำลังดำเนินอยู่สำหรับการตกแต่ง K5 Monash Civic — คัดเลือกชุดชิ้นส่วนที่พิจารณาอย่างดีซึ่งสร้างสมดุลระหว่างฟังก์ชันสาธารณะกับความอบอุ่นและเอกลักษณ์ การเลือกแต่ละชิ้นตอบสนองต่อขนาดและวัตถุประสงค์ของพื้นที่ สร้างสภาพแวดล้อมที่ทั้งมีจุดประสงค์และต้อนรับ",
    category: "โครงการปัจจุบัน",
  },
  7: {
    title: "1 เคิร์บบี้วอล์ค — เซตแลนด์",
    excerpt: "การออกแบบแนวคิดที่กำลังดำเนินอยู่สำหรับล็อบบี้และพื้นที่อำนวยความสะดวกของที่อยู่อาศัยที่ 1 Kirby Walk เซตแลนด์ — โครงการที่สำรวจว่าความอบอุ่นและวัสดุสามารถนำมาใช้ในการพัฒนาที่อยู่อาศัยขนาดใหญ่โดยไม่สูญเสียความเป็นส่วนตัวได้อย่างไร ไม้ หิน และแสงสว่างที่ใส่ใจทำงานร่วมกันเพื่อสร้างความรู้สึกแห่งการมาถึงที่รู้สึกเหมือนที่อยู่อาศัยจริง",
    category: "โครงการปัจจุบัน",
  },
  9: {
    title: "1 เวสต์สตรีท — นอร์ธซิดนีย์",
    excerpt: "การตกแต่งสำนักงานเชิงพาณิชย์ใจกลางนอร์ธซิดนีย์ — ออกแบบเพื่อส่งเสริมการทำงานร่วมกันและสมาธิภายในพื้นที่กะทัดรัด เส้นสะอาด การเลือกวัสดุที่พิจารณาอย่างดี และจานสีที่เป็นกลางสร้างสภาพแวดล้อมวิชาชีพที่รู้สึกทั้งประณีตและเข้าถึงได้",
    category: "โครงการปัจจุบัน",
  },
  8: {
    title: "12 ถนนสจ๊วต — บ้านพักวารูงา",
    excerpt: "การตกแต่งภายในที่อยู่อาศัยที่อบอุ่นสำหรับบ้านครอบครัววารูงา — มุ่งเน้นที่พื้นที่ครัวและห้องอาหารที่ประณีตซึ่งสร้างสมดุลระหว่างฟังก์ชันในชีวิตประจำวันและวัสดุที่ใส่ใจ งานไม้ พื้นผิวหินนุ่มนวล และแสงสว่างหลายชั้นนำความรู้สึกสงบของบ้านมาสู่หัวใจของบ้าน",
    category: "โครงการปัจจุบัน",
  },
};

const CLIENT_LOGOS: ClientLogo[] = [
  { id: 1,  name: "BYD",                  sub: "BYD Australia Pty Ltd",            projects: 4, logo: "/logos/byd.png" },
  { id: 2,  name: "LYLO",                 sub: "EVT Limited",                       projects: 1, logo: "/logos/lylo.jpg" },
  { id: 3,  name: "Grace & Co",           sub: "Something by Grace & Co",           projects: 1, logo: "/logos/grace.jpg" },
  { id: 4,  name: "Betta Home",           sub: "Betta Home Living Pty Ltd",         projects: 1, logo: "/logos/betta-home.png" },
  { id: 5,  name: "K5 Furniture",         sub: "K5 Furniture Pty Ltd",              projects: 1, logo: "/logos/k5-furniture.jpg" },
  { id: 6,  name: "Alamour",              sub: "Alamour",                            projects: 1, logo: "/logos/alamour.jpg" },
  { id: 7,  name: "Kii College",          sub: "Kingsford International Institute", projects: 1, logo: "/logos/kii-college.png" },
  { id: 8,  name: "Furama Hotels",        sub: "Furama Hotels & Apartments",        projects: 1 },
  { id: 9,  name: "Field to Fork",        sub: "Field to Fork",                     projects: 1, logo: "/logos/field-to-fork.png" },
  { id: 10, name: "One Capital Group",    sub: "One Capital Group",                 projects: 1, logo: "/logos/one-capital-group.jpg" },
  { id: 11, name: "Denza",               sub: "Denza",                              projects: 1, logo: "/logos/denza.jpg" },
  { id: 12, name: "BeiGene",             sub: "BeiGene",                            projects: 1, logo: "/logos/beigene.png" },
  { id: 13, name: "Healthcare Homeloans",sub: "Healthcare Homeloans",               projects: 1, logo: "/logos/healthcare-homeloans.jpg" },
  { id: 14, name: "Redel",              sub: "Redel — The Wine Glass",              projects: 1, logo: "/logos/redel.png" },
];

const MODEL_SLIDES = [
  // — BYD Megastore, Mascot —
  {
    image: "/photos/byd-megastore/660ad8_17028e80b0e14c16b2da8ea9473ce68c~mv2.jpg",
    step: "01",
    title: "Showroom Entry — Street View",
    tool: "Lumion · BYD Megastore, Mascot",
    description: "Photorealistic exterior render of the BYD Megastore entry — capturing the brand-forward facade, full-height glazing, and the curated approach sequence.",
  },
  {
    image: "/photos/byd-megastore/660ad8_40c0d3b84f4941fb81e72393c688602d~mv2.jpg",
    step: "02",
    title: "Showroom Interior — Display Floor",
    tool: "Lumion · BYD Megastore, Mascot",
    description: "Interior render of the main display floor — a wide, light-filled space designed to showcase BYD's full vehicle lineup with clarity and brand precision.",
  },
  {
    image: "/photos/byd-megastore/660ad8_50ddbaef47f64dda9da1d3621b51922c~mv2.jpg",
    step: "03",
    title: "Showroom — View 03",
    tool: "Lumion · BYD Megastore, Mascot",
    description: "Render exploring the spatial depth of the showroom floor — vehicle bays framed by a clean ceiling grid and considered lighting strategy.",
  },
  {
    image: "/photos/byd-megastore/660ad8_7f874ca8c502419282c8e657ee97391a~mv2.jpg",
    step: "04",
    title: "Showroom — View 04",
    tool: "Lumion · BYD Megastore, Mascot",
    description: "Side perspective of the showroom interior — emphasis on materiality, floor finish, and the relationship between vehicles and the surrounding retail environment.",
  },
  {
    image: "/photos/byd-megastore/660ad8_970fde96b9df4e6a9205eaed37a21ca2~mv2.jpg",
    step: "05",
    title: "Showroom — View 05",
    tool: "Lumion · BYD Megastore, Mascot",
    description: "Render of the rear showroom zone — capturing the full spatial volume and the coordinated brand signage across the back wall.",
  },
  {
    image: "/photos/byd-megastore/660ad8_d6c243e117d3407d893c9350fd8fc199~mv2.jpg",
    step: "06",
    title: "Showroom — View 06",
    tool: "Lumion · BYD Megastore, Mascot",
    description: "Evening render of the showroom with artificial lighting activated — demonstrating the lighting strategy and its effect on the brand environment.",
  },
  {
    image: "/photos/byd-megastore/660ad8_da61aff8b018487894c4e3896c7e6355~mv2.jpg",
    step: "07",
    title: "Showroom — View 07",
    tool: "Lumion · BYD Megastore, Mascot",
    description: "Wide-angle render of the showroom at full capacity — all vehicle bays occupied, demonstrating the spatial efficiency of the 6,500m² floor plan.",
  },
  {
    image: "/photos/byd-megastore/660ad8_e2209ef2648a416ca3ac72576d584adb~mv2.jpg",
    step: "08",
    title: "Showroom — View 08",
    tool: "Lumion · BYD Megastore, Mascot",
    description: "Focused render on the customer reception and consultation zone — balancing operational function with a warm, premium spatial experience.",
  },
  {
    image: "/photos/byd-megastore/660ad8_e4cd51a17ff34b2bbac828d3ec821483~mv2.jpg",
    step: "09",
    title: "Showroom — View 09",
    tool: "Lumion · BYD Megastore, Mascot",
    description: "Detail render of the display bay arrangement — vehicles presented against a refined material backdrop with controlled accent lighting.",
  },
  {
    image: "/photos/byd-megastore/660ad8_fc6f26a7dcaf4a1983e5decb02c4d5f4~mv2.jpg",
    step: "10",
    title: "Showroom — View 10",
    tool: "Lumion · BYD Megastore, Mascot",
    description: "Elevated perspective of the showroom — demonstrating the ceiling height, structural grid, and the interplay of natural and artificial light across the floor plate.",
  },
  {
    image: "/photos/byd-megastore/660ad8_fdc92f63e0b8431f88f37aa807407535~mv2.jpg",
    step: "11",
    title: "Showroom — View 11",
    tool: "Lumion · BYD Megastore, Mascot",
    description: "Final exterior dusk render of the BYD Megastore — showcasing the illuminated facade and the visual impact of the brand presence on the street.",
  },
  {
    image: "/photos/byd-megastore/ramp-view-01.jpg",
    step: "12",
    title: "Showroom Ramp — 3D Model View",
    tool: "SketchUp · BYD Megastore, Mascot",
    description: "3D model view of the internal vehicle ramp — demonstrating the structural geometry, clearance heights, and the flow of the multi-level showroom layout.",
  },
  // — BYD Cafe Kiosk, Mascot —
  {
    image: "/photos/byd-cafe-kiosk/garden_cafe_perspective_interior.png",
    step: "13",
    title: "Cafe Kiosk — Interior Perspective",
    tool: "Lumion · BYD Cafe Kiosk, Mascot",
    description: "Interior perspective render of the BYD Cafe Kiosk — a warm, garden-adjacent hospitality space designed to complement the broader showroom campus.",
  },
  {
    image: "/photos/byd-cafe-kiosk/garden_cafe_perspective_counter.png",
    step: "13",
    title: "Cafe Kiosk — Counter View",
    tool: "Lumion · BYD Cafe Kiosk, Mascot",
    description: "Render focused on the service counter — materiality, joinery detailing, and the relationship between the barista station and the garden outlook.",
  },
  {
    image: "/photos/byd-cafe-kiosk/garden_cafe_perspective_seating.png",
    step: "14",
    title: "Cafe Kiosk — Seating Area",
    tool: "Lumion · BYD Cafe Kiosk, Mascot",
    description: "Perspective render of the seating zone — compact, considered furniture placement within a 50m² footprint without compromising on spatial quality.",
  },
  // — Macquarie Park Display Suite —
  {
    image: "/photos/macquarie-park/display-render-01.jpg",
    step: "15",
    title: "Display Suite — Street View",
    tool: "Lumion · Macquarie Park, Display Suite",
    description: "Photorealistic exterior render of the sales display suite — a 2-storey pavilion with timber screens, double-height glazing, and the 'one' project branding signage.",
  },
  {
    image: "/photos/macquarie-park/display-render-02.jpg",
    step: "16",
    title: "Display Suite — View 02",
    tool: "Lumion · Macquarie Park, Display Suite",
    description: "Second exterior render of the display suite from a shifted street angle — capturing the canopy overhang, landscaped setback, and the tower marketing imagery on the facade.",
  },
  {
    image: "/photos/macquarie-park/display-render-03.jpg",
    step: "17",
    title: "Display Suite — View 03",
    tool: "Lumion · Macquarie Park, Display Suite",
    description: "Wide exterior render of the display suite within its site context — showing the full building width, mature tree canopy, and the pedestrian arrival experience.",
  },
  // — 27 Tyrwhitt Street, Maroubra —
  {
    image: "/photos/tyrwhitt-maroubra/ext-01.png",
    step: "18",
    title: "Street Facade — View 01",
    tool: "Lumion · 27 Tyrwhitt Street, Maroubra",
    description: "Exterior render of the Tyrwhitt Street residence — a considered street-facing composition that negotiates a sloping site with clean geometric forms and a robust material palette.",
  },
  {
    image: "/photos/tyrwhitt-maroubra/ext-02.png",
    step: "19",
    title: "Street Facade — View 02",
    tool: "Lumion · 27 Tyrwhitt Street, Maroubra",
    description: "Second exterior render exploring the facade depth, shadow play, and the relationship between solid and void across the street-facing elevation.",
  },
  {
    image: "/photos/tyrwhitt-maroubra/ext-03.png",
    step: "20",
    title: "Street Facade — View 03",
    tool: "Lumion · 27 Tyrwhitt Street, Maroubra",
    description: "Angled exterior view capturing the full building profile, entry sequence, and the materiality of the coastal suburban context.",
  },
  // — 613–615 Pittwater Road, Dee Why —
  {
    image: "/photos/pittwater-rd-dee-why/building-a-option-1.jpg",
    step: "21",
    title: "Building A — Option 01",
    tool: "Lumion · 613–615 Pittwater Road, Dee Why",
    description: "Rendered massing option for Building A — exploring the tower form, podium setback, and facade expression for the Pittwater Road mixed-use development.",
  },
  {
    image: "/photos/pittwater-rd-dee-why/building-a-option-2.jpg",
    step: "22",
    title: "Building A — Option 02",
    tool: "Lumion · 613–615 Pittwater Road, Dee Why",
    description: "Alternative facade treatment for Building A — refining the balcony grid, material zones, and the visual weight of the tower above the podium.",
  },
  {
    image: "/photos/pittwater-rd-dee-why/building-a-option-3.jpg",
    step: "23",
    title: "Building A — Option 03",
    tool: "Lumion · 613–615 Pittwater Road, Dee Why",
    description: "Third design option testing a contrasting facade palette — lighter upper floors against a heavier podium base, with articulated balcony edges.",
  },
  {
    image: "/photos/pittwater-rd-dee-why/building-a-option-4.jpg",
    step: "24",
    title: "Building A — Option 04",
    tool: "Lumion · 613–615 Pittwater Road, Dee Why",
    description: "Final preferred massing option consolidating facade articulation, materiality, and the street-level activation of the ground-floor retail podium.",
  },
  {
    image: "/photos/pittwater-rd-dee-why/unit-ag04-view-01.jpg",
    step: "25",
    title: "Unit AG04 — View 01",
    tool: "Lumion · 613–615 Pittwater Road, Dee Why",
    description: "Interior render of ground-floor apartment AG04 — open-plan living and dining with direct garden access and a considered material palette.",
  },
  {
    image: "/photos/pittwater-rd-dee-why/unit-ag04-view-02.jpg",
    step: "26",
    title: "Unit AG04 — View 02",
    tool: "Lumion · 613–615 Pittwater Road, Dee Why",
    description: "Kitchen and dining zone of AG04 — refined joinery, stone benchtops, and the connection between the indoor living space and the private outdoor garden.",
  },
  {
    image: "/photos/pittwater-rd-dee-why/unit-ag04-view-03.jpg",
    step: "27",
    title: "Unit AG04 — View 03",
    tool: "Lumion · 613–615 Pittwater Road, Dee Why",
    description: "Living area perspective of AG04 — full-height glazing, layered lighting, and a warm material palette create a sense of domestic calm within the residential development.",
  },
  {
    image: "/photos/pittwater-rd-dee-why/unit-ag04-view-04.jpg",
    step: "28",
    title: "Unit AG04 — View 04",
    tool: "Lumion · 613–615 Pittwater Road, Dee Why",
    description: "Final interior render of AG04 with all furnishings resolved — demonstrating the spatial quality and livability of the ground-floor typology.",
  },
  // — 155 & 155A Stuart Street, Blakehurst —
  {
    image: "/photos/stuart-st-blakehurst/VIEW 01.jpg",
    step: "29",
    title: "Stuart Street — View 01",
    tool: "Lumion · 155 & 155A Stuart Street, Blakehurst",
    description: "Exterior render of the Blakehurst dual-occupancy — street-facing facade composition with considered garage integration and a material palette suited to the leafy southern Sydney context.",
  },
  {
    image: "/photos/stuart-st-blakehurst/VIEW 02.jpg",
    step: "30",
    title: "Stuart Street — View 02",
    tool: "Lumion · 155 & 155A Stuart Street, Blakehurst",
    description: "Second exterior view — exploring the facade depth, shadow play, and the relationship between the two dwellings as a composed streetscape composition.",
  },
  {
    image: "/photos/stuart-st-blakehurst/VIEW 03.jpg",
    step: "31",
    title: "Stuart Street — View 03",
    tool: "Lumion · 155 & 155A Stuart Street, Blakehurst",
    description: "Angled street view capturing the full site width — both dwellings resolved as a unified yet distinct pair within the suburban streetscape.",
  },
  {
    image: "/photos/stuart-st-blakehurst/GARAGE OPEN.jpg",
    step: "32",
    title: "Stuart Street — Garage Open",
    tool: "Lumion · 155 & 155A Stuart Street, Blakehurst",
    description: "Render with garage doors open — demonstrating the visual integration of the garage into the facade composition and its impact on the street presentation.",
  },
  {
    image: "/photos/stuart-st-blakehurst/GARAGE CLOSED.jpg",
    step: "33",
    title: "Stuart Street — Garage Closed",
    tool: "Lumion · 155 & 155A Stuart Street, Blakehurst",
    description: "Render with garage doors closed — showing the preferred street-facing composition with the garage panel reading as a resolved element of the facade.",
  },
  // — 1 West Street, North Sydney —
  {
    image: "/photos/west-st-north-sydney/Riedel_building_view1.jpg",
    step: "34",
    title: "Riedel Showroom — Street View",
    tool: "Lumion · 1 West Street, North Sydney",
    description: "Exterior render of the Riedel glassware showroom at 1 West Street — dark facade, red canopy signage band, and full-height glazed shopfronts in a premium North Sydney address.",
  },
  {
    image: "/photos/west-st-north-sydney/Riedel_building_view2.jpg",
    step: "35",
    title: "Riedel Showroom — Corner View",
    tool: "Lumion · 1 West Street, North Sydney",
    description: "Corner perspective capturing the Riedel, Spiegelau, and Nachtmann brand signage across both street-facing elevations with the stepped gable entry canopy.",
  },
  // — BYD Haberfield, 107–113 Parramatta Road —
  {
    image: "/photos/byd-haberfield/EXT 01.jpg",
    step: "36",
    title: "Exterior — View 01",
    tool: "Lumion · BYD Haberfield, Parramatta Road",
    description: "Exterior render of the BYD Haberfield showroom on Parramatta Road — a brand-forward automotive retail facade designed for high street visibility and customer engagement.",
  },
  {
    image: "/photos/byd-haberfield/EXT 02.jpg",
    step: "37",
    title: "Exterior — View 02",
    tool: "Lumion · BYD Haberfield, Parramatta Road",
    description: "Second exterior view capturing the full facade width, signage placement, and the relationship between the showroom entry and the street edge.",
  },
  {
    image: "/photos/byd-haberfield/OFFICE 01.jpg",
    step: "38",
    title: "Office Interior — View 01",
    tool: "Lumion · BYD Haberfield, Parramatta Road",
    description: "Interior render of the staff office zone — a clean, functional workspace integrated within the showroom building with a considered material palette.",
  },
  {
    image: "/photos/byd-haberfield/OFFICE 02.jpg",
    step: "39",
    title: "Office Interior — View 02",
    tool: "Lumion · BYD Haberfield, Parramatta Road",
    description: "Second office interior view exploring desk layout, lighting strategy, and the spatial relationship between workstations and the glazed perimeter.",
  },
  {
    image: "/photos/byd-haberfield/OFFICE 03.jpg",
    step: "40",
    title: "Office Interior — View 03",
    tool: "Lumion · BYD Haberfield, Parramatta Road",
    description: "Third office interior render with all furnishings resolved — demonstrating the quality of the work environment within the BYD Haberfield campus.",
  },
  {
    image: "/photos/byd-haberfield/OFFICE AXO 01.jpg",
    step: "41",
    title: "Office Axonometric — View 01",
    tool: "Lumion · BYD Haberfield, Parramatta Road",
    description: "Axonometric render of the office fitout — revealing the spatial organisation, furniture arrangement, and the overall layout of the staff workspace.",
  },
  {
    image: "/photos/byd-haberfield/OFFICE AXO 02.jpg",
    step: "42",
    title: "Office Axonometric — View 02",
    tool: "Lumion · BYD Haberfield, Parramatta Road",
    description: "Second axonometric view of the office — showing the full extent of the fitout from an elevated angle, with all zones and circulation paths clearly resolved.",
  },
];

const MODEL_SLIDES_TH: { title: string; description: string }[] = [
  { title: "ทางเข้าโชว์รูม — มุมมองจากถนน", description: "เรนเดอร์ภายนอกแบบถ่ายจริงของทางเข้า BYD Megastore — จับภาพส่วนหน้าอาคารที่นำหน้าด้วยแบรนด์ กระจกเต็มความสูง และลำดับการเข้าถึงที่คัดสรร" },
  { title: "ภายในโชว์รูม — พื้นที่จัดแสดง", description: "เรนเดอร์ภายในพื้นที่จัดแสดงหลัก — พื้นที่กว้างและเต็มไปด้วยแสงออกแบบเพื่อแสดงสายผลิตภัณฑ์รถยนต์ BYD ทั้งหมดด้วยความชัดเจนและความแม่นยำด้านแบรนด์" },
  { title: "โชว์รูม — มุมมอง 03", description: "เรนเดอร์สำรวจความลึกเชิงพื้นที่ของพื้นจัดแสดง — ช่องจอดรถถูกกรอบด้วยกริดเพดานสะอาดและกลยุทธ์แสงสว่างที่ใส่ใจ" },
  { title: "โชว์รูม — มุมมอง 04", description: "มุมมองด้านข้างของภายในโชว์รูม — เน้นที่วัสดุ พื้นสำเร็จรูป และความสัมพันธ์ระหว่างรถยนต์กับสภาพแวดล้อมค้าปลีกโดยรอบ" },
  { title: "โชว์รูม — มุมมอง 05", description: "เรนเดอร์ของโซนโชว์รูมด้านหลัง — จับภาพปริมาตรเชิงพื้นที่ทั้งหมดและป้ายสัญลักษณ์แบรนด์ที่ประสานงานกันตลอดผนังด้านหลัง" },
  { title: "โชว์รูม — มุมมอง 06", description: "เรนเดอร์ยามเย็นของโชว์รูมที่เปิดใช้แสงประดิษฐ์ — แสดงกลยุทธ์แสงสว่างและผลกระทบต่อสภาพแวดล้อมแบรนด์" },
  { title: "โชว์รูม — มุมมอง 07", description: "เรนเดอร์มุมกว้างของโชว์รูมที่ความจุเต็ม — ช่องจอดรถทุกช่องถูกครอบครอง แสดงประสิทธิภาพเชิงพื้นที่ของผังพื้น 6,500 ตร.ม." },
  { title: "โชว์รูม — มุมมอง 08", description: "เรนเดอร์เจาะจงโซนรับลูกค้าและที่ปรึกษา — สร้างสมดุลระหว่างฟังก์ชันการปฏิบัติงานกับประสบการณ์เชิงพื้นที่ที่อบอุ่นและระดับพรีเมียม" },
  { title: "โชว์รูม — มุมมอง 09", description: "เรนเดอร์รายละเอียดของการจัดช่องจัดแสดง — รถยนต์นำเสนอบนฉากหลังวัสดุที่ประณีตพร้อมแสงเน้นที่ควบคุม" },
  { title: "โชว์รูม — มุมมอง 10", description: "มุมมองสูงของโชว์รูม — แสดงความสูงของเพดาน กริดโครงสร้าง และการผสมผสานของแสงธรรมชาติและแสงประดิษฐ์ตลอดแผ่นพื้น" },
  { title: "โชว์รูม — มุมมอง 11", description: "เรนเดอร์ภายนอกยามพลบค่ำสุดท้ายของ BYD Megastore — แสดงส่วนหน้าอาคารที่ส่องสว่างและผลกระทบทางสายตาของการมีอยู่ของแบรนด์บนถนน" },
  { title: "แรมป์โชว์รูม — มุมมองโมเดล 3D", description: "มุมมองโมเดล 3D ของแรมป์รถยนต์ภายใน — แสดงเรขาคณิตโครงสร้าง ความสูงช่องว่าง และการไหลของผังโชว์รูมหลายชั้น" },
  { title: "คีออสก์คาเฟ่ — มุมมองภายใน", description: "เรนเดอร์มุมมองภายในของ BYD Cafe Kiosk — พื้นที่การบริการที่อบอุ่นใกล้สวนออกแบบเพื่อเสริมวิทยาเขตโชว์รูมที่กว้างขวาง" },
  { title: "คีออสก์คาเฟ่ — มุมมองเคาน์เตอร์", description: "เรนเดอร์เจาะจงที่เคาน์เตอร์บริการ — วัสดุ รายละเอียดงานไม้ และความสัมพันธ์ระหว่างสถานีบาริสต้าและมุมมองสวน" },
  { title: "คีออสก์คาเฟ่ — พื้นที่นั่ง", description: "เรนเดอร์มุมมองของโซนนั่ง — การจัดวางเฟอร์นิเจอร์กะทัดรัดและใส่ใจภายในพื้นที่ 50 ตร.ม. โดยไม่กระทบต่อคุณภาพเชิงพื้นที่" },
  { title: "ห้องจัดแสดง — มุมมองจากถนน", description: "เรนเดอร์ภายนอกแบบถ่ายจริงของห้องจัดแสดงขาย — ศาลาสองชั้นพร้อมฉากไม้ กระจกสูงสองชั้น และป้ายสัญลักษณ์โครงการ 'one'" },
  { title: "ห้องจัดแสดง — มุมมอง 02", description: "เรนเดอร์ภายนอกที่สองจากมุมถนนที่เปลี่ยนไป — จับภาพหลังคาคลุม ร่นภูมิทัศน์ และภาพการตลาดหอคอยบนส่วนหน้าอาคาร" },
  { title: "ห้องจัดแสดง — มุมมอง 03", description: "เรนเดอร์ภายนอกกว้างของห้องจัดแสดงภายในบริบทไซต์ — แสดงความกว้างเต็มของอาคาร เรือนยอดต้นไม้ที่โตเต็มที่ และประสบการณ์การมาถึงของคนเดินเท้า" },
  { title: "ส่วนหน้าถนน — มุมมอง 01", description: "เรนเดอร์ภายนอกของที่พักอาศัยถนน Tyrwhitt — องค์ประกอบหันหน้าสู่ถนนที่พิจารณาอย่างดีซึ่งจัดการกับที่ดินลาดเอียงด้วยรูปทรงเรขาคณิตสะอาดและจานวัสดุที่แข็งแกร่ง" },
  { title: "ส่วนหน้าถนน — มุมมอง 02", description: "เรนเดอร์ภายนอกที่สองสำรวจความลึกของส่วนหน้าอาคาร เงาและแสง และความสัมพันธ์ระหว่างของแข็งและช่องว่างตลอดระดับชั้นหันหน้าสู่ถนน" },
  { title: "ส่วนหน้าถนน — มุมมอง 03", description: "มุมมองภายนอกเอียงจับภาพโปรไฟล์อาคารทั้งหมด ลำดับทางเข้า และวัสดุของบริบทชานเมืองชายฝั่ง" },
  { title: "อาคาร A — ตัวเลือก 01", description: "ตัวเลือกมวลสารเรนเดอร์สำหรับอาคาร A — สำรวจรูปแบบหอคอย การถอยร่นฐาน และการแสดงออกของส่วนหน้าอาคารสำหรับการพัฒนาแบบผสมผสานถนน Pittwater" },
  { title: "อาคาร A — ตัวเลือก 02", description: "การออกแบบส่วนหน้าอาคารทางเลือกสำหรับอาคาร A — ปรับปรุงกริดระเบียง โซนวัสดุ และน้ำหนักทางสายตาของหอคอยเหนือฐาน" },
  { title: "อาคาร A — ตัวเลือก 03", description: "ตัวเลือกการออกแบบที่สามทดสอบจานส่วนหน้าอาคารที่แตกต่าง — ชั้นบนสว่างกว่าเทียบกับฐานหนักกว่า พร้อมขอบระเบียงที่มีรายละเอียด" },
  { title: "อาคาร A — ตัวเลือก 04", description: "ตัวเลือกมวลสารที่ต้องการสุดท้ายรวบรวมการแสดงออกของส่วนหน้าอาคาร วัสดุ และการกระตุ้นระดับถนนของฐานค้าปลีกชั้นล่าง" },
  { title: "ยูนิต AG04 — มุมมอง 01", description: "เรนเดอร์ภายในของอพาร์ตเมนต์ชั้นล่าง AG04 — พื้นที่อยู่อาศัยและรับประทานอาหารแบบเปิดโล่งพร้อมเข้าถึงสวนโดยตรงและจานวัสดุที่พิจารณาอย่างดี" },
  { title: "ยูนิต AG04 — มุมมอง 02", description: "โซนครัวและรับประทานอาหารของ AG04 — งานไม้ประณีต หินคาวน์เตอร์ และการเชื่อมต่อระหว่างพื้นที่อยู่อาศัยภายในกับสวนส่วนตัวภายนอก" },
  { title: "ยูนิต AG04 — มุมมอง 03", description: "มุมมองพื้นที่อยู่อาศัยของ AG04 — กระจกเต็มความสูง แสงสว่างหลายชั้น และจานวัสดุอบอุ่นสร้างความสงบของบ้านภายในการพัฒนาที่อยู่อาศัย" },
  { title: "ยูนิต AG04 — มุมมอง 04", description: "เรนเดอร์ภายในสุดท้ายของ AG04 พร้อมเฟอร์นิเจอร์ครบครัน — แสดงคุณภาพเชิงพื้นที่และความสามารถในการอยู่อาศัยของประเภทชั้นล่าง" },
  { title: "ถนน Stuart — มุมมอง 01", description: "เรนเดอร์ภายนอกของที่พักอาศัยสองหน่วยเบลคเฮิร์สต์ — องค์ประกอบส่วนหน้าอาคารหันหน้าสู่ถนนพร้อมการรวมโรงรถที่พิจารณาอย่างดีและจานวัสดุที่เหมาะกับบริบทชานเมืองทางใต้ของซิดนีย์" },
  { title: "ถนน Stuart — มุมมอง 02", description: "มุมมองภายนอกที่สอง — สำรวจความลึกของส่วนหน้าอาคาร เงาและแสง และความสัมพันธ์ระหว่างสองยูนิตในฐานะองค์ประกอบภูมิทัศน์ถนนที่ประกอบกัน" },
  { title: "ถนน Stuart — มุมมอง 03", description: "มุมมองถนนเอียงจับภาพความกว้างเต็มของไซต์ — ทั้งสองยูนิตถูกแก้ปัญหาเป็นคู่ที่เป็นหนึ่งเดียวแต่แตกต่างกันภายในภูมิทัศน์ถนนชานเมือง" },
  { title: "ถนน Stuart — โรงรถเปิด", description: "เรนเดอร์พร้อมประตูโรงรถเปิด — แสดงการรวมทางสายตาของโรงรถเข้ากับองค์ประกอบส่วนหน้าอาคารและผลกระทบต่อการนำเสนอหน้าถนน" },
  { title: "ถนน Stuart — โรงรถปิด", description: "เรนเดอร์พร้อมประตูโรงรถปิด — แสดงองค์ประกอบที่หันหน้าสู่ถนนที่ต้องการโดยแผงโรงรถอ่านเป็นองค์ประกอบที่แก้ปัญหาแล้วของส่วนหน้าอาคาร" },
  { title: "โชว์รูม Riedel — มุมมองจากถนน", description: "เรนเดอร์ภายนอกของโชว์รูมแก้ว Riedel ที่ 1 West Street — ส่วนหน้าอาคารสีเข้ม แถบป้ายสีแดง และด้านหน้าร้านกระจกเต็มความสูงในที่อยู่ระดับพรีเมียมนอร์ธซิดนีย์" },
  { title: "โชว์รูม Riedel — มุมมองมุม", description: "มุมมองมุมจับภาพป้ายแบรนด์ Riedel, Spiegelau และ Nachtmann ตลอดทั้งสองระดับชั้นหันหน้าสู่ถนนพร้อมหลังคาทางเข้าจั่วขั้น" },
  { title: "ภายนอก — มุมมอง 01", description: "เรนเดอร์ภายนอกของโชว์รูม BYD Haberfield บนถนน Parramatta — ส่วนหน้าอาคารค้าปลีกยานยนต์ที่นำหน้าด้วยแบรนด์ออกแบบเพื่อการมองเห็นบนถนนสายหลักและการมีส่วนร่วมของลูกค้า" },
  { title: "ภายนอก — มุมมอง 02", description: "มุมมองภายนอกที่สองจับภาพความกว้างเต็มของส่วนหน้าอาคาร การวางป้าย และความสัมพันธ์ระหว่างทางเข้าโชว์รูมและขอบถนน" },
  { title: "ภายในสำนักงาน — มุมมอง 01", description: "เรนเดอร์ภายในของโซนสำนักงานพนักงาน — พื้นที่ทำงานที่สะอาดและใช้งานได้รวมอยู่ในอาคารโชว์รูมด้วยจานวัสดุที่พิจารณาอย่างดี" },
  { title: "ภายในสำนักงาน — มุมมอง 02", description: "มุมมองภายในสำนักงานที่สองสำรวจผังโต๊ะ กลยุทธ์แสงสว่าง และความสัมพันธ์เชิงพื้นที่ระหว่างสถานีทำงานและเส้นรอบนอกกระจก" },
  { title: "ภายในสำนักงาน — มุมมอง 03", description: "เรนเดอร์ภายในสำนักงานที่สามพร้อมเฟอร์นิเจอร์ครบครัน — แสดงคุณภาพของสภาพแวดล้อมการทำงานภายในวิทยาเขต BYD Haberfield" },
  { title: "ไอโซเมตริกสำนักงาน — มุมมอง 01", description: "เรนเดอร์ไอโซเมตริกของการตกแต่งสำนักงาน — เปิดเผยการจัดระเบียบเชิงพื้นที่ การจัดเฟอร์นิเจอร์ และผังรวมของพื้นที่ทำงานของพนักงาน" },
  { title: "ไอโซเมตริกสำนักงาน — มุมมอง 02", description: "มุมมองไอโซเมตริกที่สองของสำนักงาน — แสดงขอบเขตทั้งหมดของการตกแต่งจากมุมสูง พร้อมโซนและเส้นทางการสัญจรที่แก้ปัญหาชัดเจน" },
];

const EXPERIENCE: Experience[] = [
  {
    year: "Feb 2020 — Dec 2022",
    title: "Bachelor of Design in Architecture",
    company: "University of Technology Sydney, Australia",
    description: "Studied architecture with a focus on spatial design, technical documentation, and the relationship between built form and human experience.",
    logo: "/logos/uts.png",
  },
  {
    year: "Jan 2023 — Feb 2023",
    title: "Architectural Intern",
    company: "M.A.R.S (Marcellino Sain Architects), Sydney, Australia",
    description: "Introductory placement developing foundational skills in architectural drawings, SketchUp modelling, and studio workflow.",
    logo: "/logos/mars.png",
  },
  {
    year: "Feb 2023 — Present",
    title: "Architectural Drafter",
    company: "M.A.R.S (Marcellino Sain Architects), Sydney, Australia",
    description: "Full-time role producing architectural and construction drawings across a range of commercial, retail, and hospitality projects. Skills include architectural documentation, construction drawings, coordination, and 3D modelling.",
    logo: "/logos/mars.png",
  },
  {
    year: "2025 — Present",
    title: "Architectural Manager",
    company: "Nissa Group, Khon Kaen, Thailand",
    description: "Senior role overseeing architectural and construction documentation while managing project coordination and team workflows across a range of design projects.",
    logo: "/logos/nissa.png",
  },
];

const EXPERIENCE_TH: { title: string; company: string; description: string }[] = [
  {
    title: 'ปริญญาตรีสาขาการออกแบบสถาปัตยกรรม',
    company: 'มหาวิทยาลัยเทคโนโลยีซิดนีย์ ออสเตรเลีย',
    description: 'ศึกษาสถาปัตยกรรมโดยเน้นการออกแบบเชิงพื้นที่ เอกสารทางเทคนิค และความสัมพันธ์ระหว่างรูปแบบที่ก่อสร้างและประสบการณ์มนุษย์',
  },
  {
    title: 'นักศึกษาฝึกงานสถาปัตยกรรม',
    company: 'M.A.R.S (Marcellino Sain Architects), ซิดนีย์, ออสเตรเลีย',
    description: 'การฝึกงานเริ่มต้นเพื่อพัฒนาทักษะพื้นฐานด้านแบบสถาปัตยกรรม การสร้างโมเดล SketchUp และการทำงานในสตูดิโอ',
  },
  {
    title: 'นักเขียนแบบสถาปัตยกรรม',
    company: 'M.A.R.S (Marcellino Sain Architects), ซิดนีย์, ออสเตรเลีย',
    description: 'บทบาทประจำในการจัดทำแบบสถาปัตยกรรมและแบบก่อสร้างสำหรับโครงการเชิงพาณิชย์ ค้าปลีก และการบริการ ทักษะได้แก่ การจัดทำเอกสารสถาปัตยกรรม แบบก่อสร้าง การประสานงาน และการสร้างโมเดล 3 มิติ',
  },
  {
    title: 'ผู้จัดการสถาปัตยกรรม',
    company: 'Nissa Group, ขอนแก่น, ประเทศไทย',
    description: 'บทบาทอาวุโสดูแลงานเอกสารสถาปัตยกรรมและการก่อสร้าง พร้อมจัดการการประสานงานโครงการและกระบวนการทำงานของทีมในโครงการออกแบบต่าง ๆ',
  },
];

const PROCESS_STEPS = [
  {
    title: "Research & Site",
    description: "Deep dive into context, climate, and constraints to build a solid foundation.",
    icon: <Maximize2 className="w-6 h-6" />,
  },
  {
    title: "Concept Exploration",
    description: "Iterative sketching and massing to find the core design narrative.",
    icon: <PenTool className="w-6 h-6" />,
  },
  {
    title: "3D Development",
    description: "Refining forms in Rhino and SketchUp to test spatial qualities.",
    icon: <Box className="w-6 h-6" />,
  },
  {
    title: "Technical Documentation",
    description: "Precision drafting in AutoCAD to ensure buildability and clarity.",
    icon: <Layers className="w-6 h-6" />,
  },
];

// --- Navbar ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('navProjects'), href: '#projects' },
    { name: t('navArticles'), href: '#articles' },
    { name: t('navMakers'), href: '#makers' },
    { name: t('navStudio'), href: '#about' },
    { name: t('navJournal'), href: '#journal' },
    { name: t('navWorld'), href: '#worldmap' },
    { name: t('navContact'), href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-white/95 backdrop-blur-xl py-4 shadow-sm border-b border-stone-100' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-8">
        {!isScrolled && (
          <div className="flex justify-center mb-4">
            <span className="text-[9px] uppercase tracking-[0.5em] text-white/60 font-bold">{t('navTagline')}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            className={`text-xl font-display font-medium tracking-tight transition-colors ${isScrolled ? 'text-stone-800' : 'text-white'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            SAM SAENPAO
          </motion.a>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[10px] uppercase tracking-[0.25em] font-bold transition-colors duration-300 ${isScrolled ? 'text-stone-400 hover:text-stone-900' : 'text-white/70 hover:text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/services"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[10px] uppercase tracking-[0.25em] font-bold transition-colors duration-300 ${isScrolled ? 'text-stone-400 hover:text-stone-900' : 'text-white/70 hover:text-white'}`}
            >
              {t('navServices')}
            </a>
          </div>

          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
              className={`hidden lg:flex items-center gap-1 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] border transition-all duration-300 ${isScrolled ? 'border-stone-300 text-stone-500 hover:border-stone-900 hover:text-stone-900' : 'border-white/30 text-white/60 hover:border-white hover:text-white'}`}
              title="Toggle language"
            >
              {lang === 'en' ? 'TH' : 'EN'}
            </button>
            {/* Available for work badge */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isScrolled ? 'text-green-600' : 'text-green-400'}`}>{t('available')}</span>
            </div>
            <button className={`hidden lg:flex p-2 transition-colors ${isScrolled ? 'text-stone-400 hover:text-stone-900' : 'text-white/70 hover:text-white'}`}>
              <Search className="w-4 h-4" />
            </button>
            <a
              href="#contact"
              className={`hidden lg:flex items-center px-5 py-2 text-[9px] font-bold uppercase tracking-[0.3em] border transition-all duration-300 ${isScrolled ? 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white' : 'border-white/60 text-white hover:bg-white hover:text-stone-900'}`}
            >
              {t('navContact')}
            </a>
            <button
              className={`lg:hidden p-2 ${isScrolled ? 'text-stone-900' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-stone-100 p-10 flex flex-col gap-6 lg:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-display text-stone-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/services"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-display text-stone-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('navServices')}
            </a>
            {/* Mobile lang toggle */}
            <button
              onClick={() => { setLang(lang === 'en' ? 'th' : 'en'); setIsMobileMenuOpen(false); }}
              className="text-left text-sm font-bold uppercase tracking-[0.3em] text-stone-400 hover:text-stone-900 transition-colors"
            >
              {lang === 'en' ? '🇹🇭 ภาษาไทย' : '🇬🇧 English'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Project Modal ---
const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const { t } = useLang();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const allImages = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) setLightboxIndex(null);
        else onClose();
      }
      if (e.key === 'ArrowRight' && lightboxIndex !== null)
        setLightboxIndex((prev) => Math.min((prev ?? 0) + 1, allImages.length - 1));
      if (e.key === 'ArrowLeft' && lightboxIndex !== null)
        setLightboxIndex((prev) => Math.max((prev ?? 0) - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, onClose, allImages.length]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-0 z-50 bg-[#1a1917] overflow-y-auto"
    >
      {/* Cover hero image */}
      <div className="relative h-[65vh] md:h-[82vh] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1917] via-black/25 to-transparent" />

        {/* Close button — top right of image */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 w-10 h-10 flex items-center justify-center rounded-sm bg-[#1c1c1c] text-white hover:bg-[#333] transition-colors duration-200"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <div className="absolute bottom-0 left-0 w-full px-8 pb-16 max-w-[1400px] mx-auto">
          <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/40 block mb-5">
            {project.category} · {project.location} · {project.year}
          </span>
          <h2 className="text-5xl md:text-8xl font-display font-light text-white leading-none tracking-tight">
            {project.title}
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1400px] mx-auto px-8 py-16">

        {/* Description + metadata */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 border-b border-stone-800 pb-20">
          <div className="lg:col-span-7">
            <p className="text-xl md:text-2xl font-display font-light text-stone-300 leading-relaxed">{project.description}</p>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-x-8 gap-y-7">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold mb-2 block">{t('roleLabel')}</span>
                <span className="text-xs text-stone-300 font-medium">{project.role}</span>
              </div>
              {project.client && (
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold mb-2 block">{t('clientLabel')}</span>
                  <span className="text-xs text-stone-300 font-medium">{project.client}</span>
                </div>
              )}
              {project.builder && (
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold mb-2 block">{t('builderLabel')}</span>
                  <span className="text-xs text-stone-300 font-medium">{project.builder}</span>
                </div>
              )}
              {project.area && (
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold mb-2 block">{t('areaLabel')}</span>
                  <span className="text-xs text-stone-300 font-medium">{project.area}</span>
                </div>
              )}
              {project.designTeam && (
                <div className="col-span-2">
                  <span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold mb-2 block">{t('designTeamLabel')}</span>
                  <span className="text-xs text-stone-300 font-medium">{project.designTeam}</span>
                </div>
              )}
              {project.photographer && (
                <div className="col-span-2">
                  <span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold mb-2 block">{t('photographyLabel')}</span>
                  <span className="text-xs text-stone-300 font-medium">{project.photographer}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gallery grid */}
        <div>
          <h4 className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-600 mb-10">
            {t('projectGallery')} — {allImages.length} {allImages.length === 1 ? t('imageLabel') : t('imagesLabel')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {allImages.map((img, i) => (
              <motion.div
                key={i}
                className="aspect-[4/3] overflow-hidden bg-stone-900 cursor-zoom-in"
                whileHover={{ opacity: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={img}
                  alt={`${project.title} — ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 pb-8">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.4em] text-stone-600 hover:text-white transition-colors"
          >
            <X className="w-3 h-3" /> Close Project
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-6 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="w-6 h-6" />
            </button>
            {lightboxIndex > 0 && (
              <button
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/40 hover:text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}
            {lightboxIndex < allImages.length - 1 && (
              <button
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/40 hover:text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}
            <motion.img
              key={lightboxIndex}
              src={allImages[lightboxIndex]}
              alt=""
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-h-[88vh] max-w-[88vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/30 uppercase tracking-widest">
              {lightboxIndex + 1} / {allImages.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Project Feature Item ---
// --- Hero Project Card (first item, full-width) ---
const ProjectHeroCard = ({ project, onOpen }: { project: Project; onOpen: () => void }) => {
  const { lang, t } = useLang();
  const pth = lang === 'th' ? PROJECTS_TH[project.id] : undefined;
  return (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
    className="group cursor-pointer"
    onClick={onOpen}
  >
    <div className="relative overflow-hidden bg-stone-900 soft-shadow rounded-xl" style={{ aspectRatio: '16/7' }}>
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-105 opacity-75"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/30 to-transparent" />
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-[9px] font-bold uppercase tracking-[0.25em] text-white">
          {pth?.category ?? project.category}
        </span>
        <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-[9px] font-bold uppercase tracking-[0.25em] text-white/70">
          {project.year}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-2xl">
        <div className="flex items-center gap-2 mb-4 text-[9px] font-mono text-white/50 uppercase tracking-widest">
          <MapPin className="w-3 h-3" /> {project.location}
        </div>
        <h3 className="text-4xl md:text-6xl font-display font-light text-white mb-5 leading-none tracking-tight">
          {project.title}
        </h3>
        <p className="text-sm text-white/70 font-light leading-relaxed mb-6 max-w-lg">
          {pth?.description ?? project.description}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-0.5">{t('roleLabel')}</span>
            <span className="text-xs text-white/80 font-medium">{project.role}</span>
          </div>
          {project.area && (
            <>
              <span className="text-white/20">|</span>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-0.5">{t('areaLabel')}</span>
                <span className="text-xs text-white/80 font-medium">{project.area}</span>
              </div>
            </>
          )}
          {project.client && (
            <>
              <span className="text-white/20">|</span>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-0.5">{t('clientLabel')}</span>
                <span className="text-xs text-white/80 font-medium">{project.client}</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 group-hover:text-white transition-colors duration-500">
        {t('viewProject')} <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  </motion.div>
  );
};

// --- Grid Project Card (remaining items) ---
const ProjectItem = ({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) => {
  const { lang, t } = useLang();
  const pth = lang === 'th' ? PROJECTS_TH[project.id] : undefined;
  return (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 1.2, delay: (index % 2) * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
    className="group cursor-pointer flex flex-col"
    onClick={onOpen}
  >
    <div className="aspect-[3/2] overflow-hidden bg-stone-100 soft-shadow relative mb-0 rounded-xl">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-5 left-5 flex gap-2">
        <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[9px] font-bold uppercase tracking-[0.2em] text-stone-900">
          {pth?.category ?? project.category}
        </span>
      </div>
      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-700" />
    </div>

    <div className="flex-1 pt-7 pb-2 border-t border-stone-200 mt-0">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[9px] font-mono text-stone-300 uppercase tracking-widest flex items-center gap-1.5">
          <MapPin className="w-3 h-3" /> {project.location}
        </span>
        <span className="text-[9px] font-mono text-stone-300 uppercase tracking-widest">{project.year}</span>
      </div>

      <h3 className="text-2xl md:text-3xl font-display font-light mb-4 tracking-tight text-stone-800 group-hover:text-stone-500 transition-colors leading-tight">
        {project.title}
      </h3>

      <p className="text-sm text-stone-500 font-light leading-relaxed mb-6">
        {pth?.description ?? project.description}
      </p>

      <div className="flex flex-wrap gap-x-6 gap-y-3 pt-5 border-t border-stone-100">
        <div>
          <span className="text-[9px] uppercase tracking-widest text-stone-300 font-bold block mb-1">{t('roleLabel')}</span>
          <span className="text-xs text-stone-600 font-medium">{project.role}</span>
        </div>
        {project.area && (
          <div>
            <span className="text-[9px] uppercase tracking-widest text-stone-300 font-bold block mb-1">{t('areaLabel')}</span>
            <span className="text-xs text-stone-600 font-medium">{project.area}</span>
          </div>
        )}
        {project.client && (
          <div>
            <span className="text-[9px] uppercase tracking-widest text-stone-300 font-bold block mb-1">{t('clientLabel')}</span>
            <span className="text-xs text-stone-600 font-medium">{project.client}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-300 group-hover:text-stone-900 transition-colors">
        <span>{project.readTime}</span>
        <span>·</span>
        <span className="flex items-center gap-1.5">{t('viewProject')} <ArrowRight className="w-3 h-3" /></span>
      </div>
    </div>
  </motion.div>
  );
};

// --- Client Logo Tile ---
const ClientLogoTile = ({ client, delay = 0 }: { client: ClientLogo; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay }}
    className="group flex flex-col items-center justify-center gap-3 border border-stone-200 bg-white p-8 hover:border-stone-400 hover:shadow-sm transition-all duration-300 cursor-default"
  >
    {client.logo && (
      <img src={client.logo} alt={client.name} className="h-16 w-full object-contain transition-all duration-500" />
    )}
    <span className="text-sm font-light text-stone-400 group-hover:text-stone-600 transition-colors tracking-wide">{client.name}</span>
  </motion.div>
);

const HERO_VIDEOS = [
  // Architecture — city skyscrapers
  'https://assets.mixkit.co/videos/4366/4366-720.mp4',
  // Architecture — modern building facade
  'https://assets.mixkit.co/videos/4382/4382-720.mp4',
  // Architecture — Dubai Burj Khalifa high-rise timelapse
  'https://assets.mixkit.co/videos/20109/20109-720.mp4',
];

const HERO_IMAGES = [
  // Architecture — minimalist concrete facade
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1920&h=1080&q=85",
  // Landscape — lush architectural greenery
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1920&h=1080&q=85",
  // Interior — warm contemporary living space
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&h=1080&q=85",
  // Landscape — aerial park & garden paths
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&h=1080&q=85",
  // Landscape architecture — curated garden & water
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&h=1080&q=85",
  // Architecture — dramatic modern exterior
  "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1920&h=1080&q=85",
  // Landscape — sunlit forest path
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&h=1080&q=85",
  // Interior — minimal white space
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1920&h=1080&q=85",
  // Landscape — terraced green hillside
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&h=1080&q=85",
];

const UNI_PROJECTS = [
  {
    id: '01',
    title: 'Ultimo Powerhouse Museum',
    subtitle: 'UTS Capstone Prize Competition — 2nd Place',
    year: '2022',
    type: 'Capstone Competition',
    description: 'A civic proposal to repurpose the Ultimo Powerhouse site — layering public amenity, environmental systems, and urban connectivity into new cultural infrastructure for the city.',
    pages: [3, 4, 5, 6].map(n => `/photos/university/page-${String(n).padStart(2, '0')}.jpg`),
  },
  {
    id: '02',
    title: 'Student Housing',
    subtitle: 'Marcus Clark Building — The Goods Line, Haymarket',
    year: '2021',
    type: 'Design Studio 04',
    description: 'A high-density student housing tower alongside the Goods Line — unwrapping the conventional dormitory into a socially active mixed-use building animated by markets, gardens, and shared terraces.',
    pages: [7, 8, 9, 10, 11].map(n => `/photos/university/page-${String(n).padStart(2, '0')}.jpg`),
  },
  {
    id: '03',
    title: 'Rescaling the School',
    subtitle: 'Primary School — Edmondson Park',
    year: '2022',
    type: 'Architectural Studio 5',
    description: 'A demountable, biophilic primary school campus rooted in CLT construction, native vegetation, and outdoor learning — designed to grow with its community across multiple stages.',
    pages: [12, 13, 14, 15, 16].map(n => `/photos/university/page-${String(n).padStart(2, '0')}.jpg`),
  },
];

// --- 3D Process Slider ---
const PROCESS_SLIDES = Array.from({ length: 37 }, (_, i) =>
  `/photos/3d-process/slide-${String(i + 1).padStart(2, '0')}.jpg`
);

const ProcessSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = PROCESS_SLIDES.length;

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent((next + total) % total);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full bg-stone-950 overflow-hidden" style={{ aspectRatio: '16/9' }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.img
          key={current}
          src={PROCESS_SLIDES[current]}
          alt={`3D Process ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Counter */}
      <div className="absolute top-5 right-6 z-10 font-mono text-[10px] text-white/50 tracking-widest">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      {/* Prev / Next */}
      <button
        onClick={() => go(current - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center border border-white/20 bg-black/30 hover:bg-black/60 transition-all duration-200"
      >
        <ChevronLeft className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={() => go(current + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center border border-white/20 bg-black/30 hover:bg-black/60 transition-all duration-200"
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {PROCESS_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-0.5 transition-all duration-300 ${i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

const UniversitySection = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => { setActivePage(0); }, [activeProject]);

  const project = UNI_PROJECTS[activeProject];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-0">

      {/* Left — project list */}
      <div className="lg:border-r border-stone-200 lg:pr-12 mb-12 lg:mb-0">
        <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300 mb-8">
          UTS · Bachelor of Design in Architecture · 2020–2022
        </p>
        {UNI_PROJECTS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActiveProject(i)}
            className={`w-full text-left py-8 border-b border-stone-100 transition-all duration-300 group ${i === activeProject ? '' : 'opacity-35 hover:opacity-60'}`}
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-stone-400 block mb-3">
              {p.id} — {p.type}
            </span>
            <h3 className={`text-lg font-display font-light leading-tight mb-1 transition-colors ${i === activeProject ? 'text-stone-900' : 'text-stone-600'}`}>
              {p.title}
            </h3>
            <span className="text-[11px] text-stone-400">{p.year}</span>
            {i === activeProject && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '2rem' }}
                transition={{ duration: 0.4 }}
                className="h-px bg-stone-800 mt-4"
              />
            )}
          </button>
        ))}
      </div>

      {/* Right — viewer */}
      <div className="lg:pl-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Project header */}
            <div className="mb-8 pb-8 border-b border-stone-100">
              <div className="flex items-start justify-between gap-8 mb-4">
                <h2 className="text-3xl md:text-4xl font-display font-light text-stone-800 leading-tight">
                  {project.title}
                </h2>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-400 flex-shrink-0 pt-1">
                  {project.subtitle}
                </span>
              </div>
              <p className="text-sm text-stone-500 font-light leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </div>

            {/* Featured image */}
            <div className="relative overflow-hidden bg-stone-50 border border-stone-100 mb-4 rounded-xl" style={{ aspectRatio: '4/3' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activePage}
                  src={project.pages[activePage]}
                  alt={`${project.title} — page ${activePage + 1}`}
                  className="absolute inset-0 w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Nav arrows */}
              {activePage > 0 && (
                <button
                  onClick={() => setActivePage(p => p - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white border border-stone-200 shadow-sm transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-stone-600" strokeWidth={1.5} />
                </button>
              )}
              {activePage < project.pages.length - 1 && (
                <button
                  onClick={() => setActivePage(p => p + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white border border-stone-200 shadow-sm transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-stone-600" strokeWidth={1.5} />
                </button>
              )}

              {/* Counter */}
              <div className="absolute bottom-4 right-4 z-10 text-[9px] font-bold uppercase tracking-[0.35em] text-stone-400 bg-white/80 px-3 py-1 border border-stone-100">
                {activePage + 1} / {project.pages.length}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {project.pages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActivePage(i)}
                  className={`flex-shrink-0 overflow-hidden border transition-all duration-200 ${
                    i === activePage
                      ? 'border-stone-800 opacity-100'
                      : 'border-stone-200 opacity-40 hover:opacity-75'
                  }`}
                  style={{ width: '96px', height: '68px' }}
                >
                  <img src={src} alt="" className="w-full h-full object-contain bg-stone-50" />
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Journey Diagram ---
const JourneyDiagram = () => {
  const W = 1200, H = 400;
  const BKK = { x: 110, y: 285 };
  const SYD = { x: 1090, y: 285 };
  const fwdPath = `M ${BKK.x},${BKK.y} Q 600,55 ${SYD.x},${SYD.y}`;
  const retPath = `M ${SYD.x},${SYD.y} Q 600,210 ${BKK.x},${BKK.y}`;

  // Pre-computed bezier points for M 110,285 Q 600,55 1090,285
  // t=0.3: x≈404, y≈188  t=0.5: x=600, y≈170  t=0.7: x≈796, y≈188
  const milestones = [
    { x: 404, y: 188, labelY: 116, label: 'ARRIVED SYDNEY', sub: '2020' },
    { x: 600, y: 170, labelY: 98,  label: 'UTS ARCHITECTURE', sub: '2020 — 2022' },
    { x: 796, y: 188, labelY: 116, label: 'M.A.R.S ARCHITECTS', sub: '2023 — Present' },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" xmlns="http://www.w3.org/2000/svg">
      <rect width={W} height={H} fill="#0a0908" />

      {/* Subtle grid */}
      {[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9].map(t => (
        <line key={`v${t}`} x1={t*W} y1={0} x2={t*W} y2={H} stroke="rgba(255,255,255,0.025)" strokeWidth={1} />
      ))}
      {[0.25,0.5,0.75].map(t => (
        <line key={`h${t}`} x1={0} y1={t*H} x2={W} y2={t*H} stroke="rgba(255,255,255,0.025)" strokeWidth={1} />
      ))}

      {/* Return path — faded behind */}
      <path d={retPath} fill="none" stroke="#c8a96e" strokeWidth={1} strokeDasharray="4 10" opacity={0.2} />

      {/* Forward path — main */}
      <path d={fwdPath} fill="none" stroke="#c8a96e" strokeWidth={1.5} strokeDasharray="9 6" opacity={0.65} />

      {/* Distance label */}
      <text x={600} y={36} textAnchor="middle" fill="rgba(200,169,110,0.38)" fontSize="10" fontFamily="ui-monospace,monospace" letterSpacing="3">7,789 KM · ~9 HR FLIGHT</text>

      {/* Direction labels */}
      <text x={210} y={128} fill="rgba(200,169,110,0.35)" fontSize="9" fontFamily="ui-monospace,monospace" letterSpacing="3">OUTBOUND ›</text>
      <text x={880} y={262} fill="rgba(200,169,110,0.2)" fontSize="9" fontFamily="ui-monospace,monospace" letterSpacing="3">‹ RETURN</text>

      {/* Milestone markers — labels above the arc */}
      {milestones.map((m, i) => (
        <g key={i}>
          <line x1={m.x} y1={m.y - 5} x2={m.x} y2={m.labelY + 22} stroke="#c8a96e" strokeWidth={0.7} opacity={0.3} strokeDasharray="3 4" />
          <circle cx={m.x} cy={m.y} r={10} fill="none" stroke="#c8a96e" strokeWidth={0.6} opacity={0.25} />
          <circle cx={m.x} cy={m.y} r={4} fill="#c8a96e" opacity={0.85} />
          <text x={m.x} y={m.labelY} textAnchor="middle" fill="#c8a96e" fontSize="9" fontFamily="ui-monospace,monospace" letterSpacing="2.5" opacity={0.9}>{m.label}</text>
          <text x={m.x} y={m.labelY + 14} textAnchor="middle" fill="rgba(200,169,110,0.5)" fontSize="8.5" fontFamily="ui-monospace,monospace" letterSpacing="1.5">{m.sub}</text>
        </g>
      ))}

      {/* Bangkok marker */}
      <circle cx={BKK.x} cy={BKK.y} r={18} fill="none" stroke="#c8a96e" strokeWidth={0.5} opacity={0.15} />
      <circle cx={BKK.x} cy={BKK.y} r={10} fill="none" stroke="#c8a96e" strokeWidth={1} opacity={0.5} />
      <circle cx={BKK.x} cy={BKK.y} r={3.5} fill="#c8a96e" />
      <text x={BKK.x} y={BKK.y + 28} textAnchor="middle" fill="#c8a96e" fontSize="11.5" fontFamily="ui-sans-serif,sans-serif" fontWeight="600" letterSpacing="4" opacity={0.9}>BANGKOK</text>
      <text x={BKK.x} y={BKK.y + 44} textAnchor="middle" fill="rgba(200,169,110,0.45)" fontSize="9" fontFamily="ui-sans-serif,sans-serif" letterSpacing="3">THAILAND</text>

      {/* Sydney marker */}
      <circle cx={SYD.x} cy={SYD.y} r={18} fill="none" stroke="#c8a96e" strokeWidth={0.5} opacity={0.15} />
      <circle cx={SYD.x} cy={SYD.y} r={10} fill="none" stroke="#c8a96e" strokeWidth={1} opacity={0.5} />
      <circle cx={SYD.x} cy={SYD.y} r={3.5} fill="#c8a96e" />
      <text x={SYD.x} y={SYD.y + 28} textAnchor="middle" fill="#c8a96e" fontSize="11.5" fontFamily="ui-sans-serif,sans-serif" fontWeight="600" letterSpacing="4" opacity={0.9}>SYDNEY</text>
      <text x={SYD.x} y={SYD.y + 44} textAnchor="middle" fill="rgba(200,169,110,0.45)" fontSize="9" fontFamily="ui-sans-serif,sans-serif" letterSpacing="3">AUSTRALIA</text>

      {/* Animated forward plane */}
      <g fill="white" opacity={0.92}>
        <polygon points="11,0 -8,-5 -5,0 -8,5" />
        <animateMotion dur="8s" repeatCount="indefinite" rotate="auto" path={fwdPath} />
      </g>

      {/* Animated return plane — delayed, dimmer, warm gold */}
      <g fill="#c8a96e" opacity={0.55}>
        <polygon points="11,0 -8,-5 -5,0 -8,5" />
        <animateMotion dur="11s" begin="4s" repeatCount="indefinite" rotate="auto" path={retPath} />
      </g>
    </svg>
  );
};

// --- World Map ---

const LIVED    = new Set(["764", "36"]);   // Thailand=764, Australia=36
const TRAVELED = new Set([
  "156",  // China
  "344",  // Hong Kong
  "392",  // Japan
  "410",  // South Korea
  "418",  // Laos
  "704",  // Vietnam
  "458",  // Malaysia
  "702",  // Singapore
  "250",  // France
  "756",  // Switzerland
  "528",  // Netherlands
  "56",   // Belgium
  "203",  // Czech Republic
  "348",  // Hungary
  "360",  // Indonesia
  "116",  // Cambodia
]);

const COUNTRY_DATA: Record<string, { name: string; flag: string; city: string; type: 'lived' | 'traveled'; image: string; desc: string }> = {
  "764": { name: "Thailand",      flag: "🇹🇭", city: "Khon Kaen & Bangkok",  type: "lived",    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&h=500&q=80", desc: "Born and raised in Thailand. The place that shaped my sense of space, craft, and culture — and the destination I always return to." },
  "36":  { name: "Australia",     flag: "🇦🇺", city: "Sydney, NSW",           type: "lived",    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&h=500&q=80", desc: "Eight years in Sydney — studying architecture at UTS, working at M.A.R.S Architects, and building a career across interior, retail, and commercial design." },
  "156": { name: "China",         flag: "🇨🇳", city: "Beijing / Shanghai",    type: "traveled", image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=800&h=500&q=80", desc: "Visited China and experienced its extraordinary scale — from ancient heritage sites to breathtaking modern urban landscapes." },
  "344": { name: "Hong Kong",     flag: "🇭🇰", city: "Hong Kong",             type: "traveled", image: "https://images.unsplash.com/photo-1536599424071-0b215a388ba7?auto=format&fit=crop&w=800&h=500&q=80", desc: "Explored Hong Kong's dramatic skyline, dense vertical living, and the unique collision of East and West." },
  "392": { name: "Japan",         flag: "🇯🇵", city: "Tokyo / Kyoto",         type: "traveled", image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&h=500&q=80", desc: "Japan left a lasting impression — its obsessive attention to detail, quiet spatial discipline, and the beauty found in everyday design." },
  "410": { name: "South Korea",   flag: "🇰🇷", city: "Seoul",                 type: "traveled", image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=800&h=500&q=80", desc: "Experienced Seoul's dynamic energy — a city where cutting-edge contemporary culture meets deep-rooted tradition." },
  "418": { name: "Laos",          flag: "🇱🇦", city: "Luang Prabang / Vientiane", type: "traveled", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&h=500&q=80", desc: "Laos offered a slower, more contemplative pace — serene temples, golden light, and a landscape of quiet natural beauty." },
  "704": { name: "Vietnam",       flag: "🇻🇳", city: "Hanoi / Ho Chi Minh",   type: "traveled", image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&h=500&q=80", desc: "Explored Vietnam's rich layered history, vibrant street culture, and stunning coastal and mountainous landscapes." },
  "458": { name: "Malaysia",      flag: "🇲🇾", city: "Kuala Lumpur / Penang", type: "traveled", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&h=500&q=80", desc: "Visited Malaysia for its multicultural richness — a fascinating mix of Malay, Chinese and Indian influences woven into architecture and food." },
  "702": { name: "Singapore",     flag: "🇸🇬", city: "Singapore",             type: "traveled", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&h=500&q=80", desc: "Singapore impressed with its precision-engineered urban environment, world-class architecture, and seamless integration of nature and city." },
  "250": { name: "France",        flag: "🇫🇷", city: "Paris",                 type: "traveled", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&h=500&q=80", desc: "Paris — a city that defined architectural grandeur and cultural aspiration. Walking its boulevards and museums was profoundly inspiring." },
  "756": { name: "Switzerland",   flag: "🇨🇭", city: "Zurich / Alps",         type: "traveled", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&h=500&q=80", desc: "Switzerland's extraordinary precision — in its landscapes, its cities, and its design — left a deep impression." },
  "528": { name: "Netherlands",   flag: "🇳🇱", city: "Amsterdam",             type: "traveled", image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&h=500&q=80", desc: "Amsterdam's canal-side architecture, cycling culture, and world-class museums made it one of the most memorable cities I've visited." },
  "56":  { name: "Belgium",       flag: "🇧🇪", city: "Brussels / Bruges",     type: "traveled", image: "https://images.unsplash.com/photo-1559113202-c916b8e44373?auto=format&fit=crop&w=800&h=500&q=80", desc: "Belgium charmed with its medieval grandeur, intricate Gothic architecture, and a culture that takes craft and quality seriously." },
  "203": { name: "Czech Republic", flag: "🇨🇿", city: "Prague",               type: "traveled", image: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=800&h=500&q=80", desc: "Prague's fairy-tale skyline, cobblestone streets and preserved Baroque architecture made it one of Europe's most visually stunning cities." },
  "348": { name: "Hungary",       flag: "🇭🇺", city: "Budapest",              type: "traveled", image: "https://images.unsplash.com/photo-1551867633-194f125bddfa?auto=format&fit=crop&w=800&h=500&q=80", desc: "Budapest's grand Parliament building, thermal baths, and dramatic Danube riverscape left a lasting architectural impression." },
  "360": { name: "Indonesia",     flag: "🇮🇩", city: "Bali / Jakarta",        type: "traveled", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&h=500&q=80", desc: "Indonesia's extraordinary diversity of landscapes, temples, and culture made it one of the most memorable destinations across Southeast Asia." },
  "116": { name: "Cambodia",      flag: "🇰🇭", city: "Siem Reap / Phnom Penh", type: "traveled", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&h=500&q=80", desc: "Cambodia's ancient Angkor Wat complex is one of the world's greatest architectural achievements — a humbling reminder of the power of human craft and vision." },
};

const FANTASY_MARKERS = [
  {
    lat: 66, lng: 2, emoji: '🦑', title: 'Kraken', sub: 'Norse Mythology · Norwegian Sea',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&h=450&q=80',
    story: `The Kraken is a legendary sea monster of Norse and Scandinavian folklore, said to dwell in the depths of the Norwegian Sea. Sailors described it as so colossal it could be mistaken for an island — capable of dragging entire ships and their crews into the abyss with its vast tentacles.\n\nThe earliest written accounts appear in 13th-century Norse sagas. Its descent was said to create a deadly whirlpool that swallowed everything within reach. The legend is thought to have been inspired by real sightings of the giant squid (Architeuthis dux), which can reach over 13 metres in length and was a creature of genuine terror to open-water sailors.`,
  },
  {
    lat: 46, lng: 25, emoji: '🧛', title: 'Dracula', sub: 'Romanian Folklore · Transylvania',
    image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?auto=format&fit=crop&w=800&h=450&q=80',
    story: `Count Dracula — the immortal vampire of Transylvania — was inspired by the real historical figure Vlad III of Wallachia (1431–1476), known as Vlad the Impaler for his brutal method of executing enemies. His mountain fortress still stands today in the Carpathian region of Romania.\n\nBram Stoker immortalised the legend in his 1897 Gothic novel "Dracula," blending centuries of Eastern European vampire folklore with Victorian horror. The vampire myth itself predates Stoker by centuries — rooted in the belief across Slavic and Romanian cultures that the undead could return from the grave to drain the life force of the living.`,
  },
  {
    lat: 18, lng: -68, emoji: '🏴‍☠️', title: 'Blackbeard', sub: 'Golden Age of Pirates · Caribbean',
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=800&h=450&q=80',
    story: `Edward Teach — better known as Blackbeard — terrorised the Caribbean and Atlantic seaboard from 1716 to 1718. His flagship, Queen Anne's Revenge, was feared across the seas. In battle, he tied lit fuses beneath his hat to envelope himself in smoke, appearing demonic and invincible to his enemies.\n\nHis violent reign ended off the coast of North Carolina in 1718, but his legend never died. The Golden Age of Piracy (1650–1730) was very real — the Caribbean its stage, and treasure its prize. Rumours persist to this day that Blackbeard's plunder lies buried somewhere beneath the warm turquoise waters of these islands.`,
  },
  {
    lat: 35, lng: -155, emoji: '🐋', title: 'Moby Dick', sub: 'American Legend · Pacific Ocean',
    image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=800&h=450&q=80',
    story: `Herman Melville's 1851 novel "Moby-Dick" follows the obsessive Captain Ahab across the vast Pacific in pursuit of a great white sperm whale that had torn off his leg. It is one of the greatest works of American literature — part adventure, part philosophy, part warning about obsession.\n\nThe story was inspired partly by the true 1820 sinking of the whale ship Essex, rammed and sunk by a sperm whale in the Pacific Ocean, and partly by real accounts of an albino sperm whale known as "Mocha Dick." The Pacific — enormous, unknowable, and merciless — remains the perfect setting for such a myth.`,
  },
  {
    lat: -36, lng: 18, emoji: '👻', title: 'Flying Dutchman', sub: 'Dutch Legend · Cape of Good Hope',
    image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?auto=format&fit=crop&w=800&h=450&q=80',
    story: `The Flying Dutchman is the most feared ghost ship in all of maritime legend, said to haunt the treacherous waters rounding the Cape of Good Hope at Africa's southern tip. According to legend, a Dutch captain swore in a violent storm that he would round the Cape even if it took until Judgment Day — and was condemned to sail those waters forever, never reaching port.\n\nSailors believed that to sight the Flying Dutchman was an omen of doom. The legend has inspired Wagner's opera, countless maritime tales, and even a reported sighting logged by a young Prince George (later King George V) in 1881.`,
  },
  {
    lat: 30, lng: 128, emoji: '🐲', title: 'Chinese Dragon', sub: 'Chinese Mythology · East China Sea',
    image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=800&h=450&q=80',
    story: `Unlike the destructive dragons of Western folklore, the Chinese dragon (Lóng) is a benevolent and auspicious creature — a symbol of power, wisdom, strength, and imperial authority. In Chinese mythology, dragons are the rulers of seas and rivers, dwelling in vast underwater palaces at the bottom of the ocean.\n\nThe Emperor of China was considered the "Son of the Dragon," and the dragon remains one of the most enduring symbols of Chinese civilisation. The East China Sea, with its deep, mysterious waters, has long been regarded as the domain of the Dragon King — giver of rain, controller of tides, and protector of sailors.`,
  },
  {
    lat: 25, lng: -70, emoji: '🔺', title: 'Bermuda Triangle', sub: 'Maritime Mystery · North Atlantic',
    image: 'https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?auto=format&fit=crop&w=800&h=450&q=80',
    story: `Between Miami, Bermuda, and Puerto Rico lies a stretch of the North Atlantic where dozens of ships and aircraft have mysteriously vanished. Dubbed the "Bermuda Triangle" in 1964, the area became one of the 20th century's greatest unsolved mysteries.\n\nNotable disappearances include Flight 19 — a US Navy training squadron of five aircraft that vanished in 1945 — and the USS Cyclops, which disappeared with 309 crew in 1918. Scientists have proposed explanations from methane gas eruptions to compass anomalies to rogue waves. None have been conclusive. The mystery remains officially unexplained.`,
  },
  {
    lat: 37, lng: 24, emoji: '🧜', title: 'Sirens of Odyssey', sub: 'Greek Mythology · Aegean Sea',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&h=450&q=80',
    story: `In Homer's epic "The Odyssey" (8th century BC), the Sirens were beautiful but deadly creatures who lured sailors to their deaths with irresistible music and song. Ships would crash on the rocks of their island as crews, helpless against the enchantment, steered directly toward it.\n\nTo survive, Odysseus had himself lashed to the mast and ordered his crew to plug their ears with beeswax. He alone heard the Sirens' song and lived. Depicted in early Greek art as half-woman, half-bird, the Sirens became one of antiquity's most powerful metaphors for temptation, desire, and the dangers of beauty. Their island is thought to lie in the waters between Sicily and the Greek coast.`,
  },
  {
    lat: 28, lng: -30, emoji: '🏛️', title: 'Atlantis', sub: "Plato's Legend · Mid Atlantic",
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&h=450&q=80',
    story: `First described by the philosopher Plato around 360 BC, Atlantis was a powerful and advanced naval civilisation said to have sunk into the Atlantic Ocean "in a single day and night of misfortune." Plato described it as a sophisticated island empire that existed beyond the Pillars of Hercules — what we now call the Strait of Gibraltar.\n\nHistorians debate whether Atlantis was a moral allegory, a garbled cultural memory of the Bronze Age Minoan civilisation destroyed by the Thera volcanic eruption around 1600 BC, or something else entirely. The search for Atlantis has captivated explorers, archaeologists, and dreamers for over 2,000 years — and the ocean keeps its secrets well.`,
  },
  {
    lat: 28, lng: 85, emoji: '❄️', title: 'Yeti', sub: 'Himalayan Folklore · Nepal',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&h=450&q=80',
    story: `The Yeti — or Abominable Snowman — is a mythical creature said to roam the high glaciers and mountain passes of the Himalayas. Deeply embedded in the folklore of Nepal, Tibet, and Bhutan, it appears in Sherpa and Tibetan oral tradition as a wild, spiritual guardian of the high peaks.\n\nWestern fascination reached a peak in 1951 when mountaineer Eric Shipton photographed enormous, humanlike footprints on the Menlung Glacier. Subsequent expeditions produced hair samples, footprint casts, and blurry photographs. DNA analysis in 2017 matched alleged Yeti samples to local bear species — but in the shadow of Everest, where the clouds never quite clear, the legend endures.`,
  },
  {
    lat: 17, lng: 103, emoji: '🐍', title: 'Naga', sub: 'Thai & Lao Mythology · Mekong River',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&h=450&q=80',
    story: `The Naga is one of the most revered and powerful creatures in the mythology of Thailand, Laos, Cambodia, and across Southeast Asia. Depicted as a great serpent or dragon deity, the Naga is the divine guardian of rivers, lakes, and most powerfully — the Mekong River, which is believed to be its home.\n\nIn Thai and Lao tradition, the Naga is associated with rain, fertility, and the sacred cycle of water that sustains life. The mysterious "Naga fireballs" phenomenon — glowing orbs of light that rise silently from the Mekong on certain autumn nights — is attributed by local communities to the Naga's breath. It is not feared; it is honoured. A protector that flows through the heart of this land.`,
  },
  {
    lat: 57, lng: -4, emoji: '🦕', title: 'Loch Ness Monster', sub: 'Scottish Folklore · Loch Ness',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&h=450&q=80',
    story: `"Nessie" — the Loch Ness Monster — is Scotland's most beloved cryptid: a large, long-necked creature said to inhabit Loch Ness, a cold, deep freshwater lake in the Scottish Highlands stretching 37 kilometres long and reaching over 200 metres deep.\n\nThe modern legend began in 1933 when a local couple reported witnessing an enormous animal near the loch. The iconic 1934 "surgeon's photograph" — later revealed as a hoax using a toy submarine — showed a long-necked creature that launched decades of expeditions. Scientists have scoured the loch with sonar and environmental DNA. They found no monster. But Nessie remains one of the world's most beloved unsolved mysteries — and Scotland's most famous resident.`,
  },
  {
    lat: -33, lng: 148, emoji: '🦘', title: 'Bunyip', sub: 'Aboriginal Folklore · Australia',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&h=450&q=80',
    story: `The Bunyip is one of the most feared creatures in Aboriginal Australian mythology — a large, dangerous entity said to lurk in swamps, creek beds, riverbeds, and billabongs across the Australian interior. Different Aboriginal groups describe it differently: some say it resembles a large dog or seal, others describe a starfish-faced water horse or a creature with enormous tusks.\n\nEuropean settlers in the 19th century recorded numerous "sightings" and encounters, and colonial newspapers ran earnest reports of Bunyip attacks. Some researchers have speculated the legend may preserve a cultural memory of the Diprotodon — a giant wombat-like creature the size of a hippopotamus that roamed Australia until approximately 25,000 years ago.`,
  },
  {
    lat: -47, lng: -126, emoji: '👁️', title: "Cthulhu · R'lyeh", sub: 'Lovecraft · South Pacific Depths',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&h=450&q=80',
    story: `In H.P. Lovecraft's 1928 story "The Call of Cthulhu," a colossal cosmic entity — tentacled, ancient, and utterly incomprehensible to the human mind — lies dead but dreaming in the sunken city of R'lyeh, somewhere deep in the South Pacific. Its coordinates: 47°9′S, 126°43′W.\n\nCthulhu is not evil in the traditional sense — it is simply beyond human understanding entirely, its existence reducing rational minds to madness. While fictional, Lovecraft's Cthulhu Mythos became one of the most influential works of modern horror, the concept of vast, indifferent cosmic horror resonating deeply with 20th and 21st century anxieties. The city of R'lyeh waits. The stars will align again.`,
  },
  {
    lat: 33, lng: 137, emoji: '🌊', title: 'Ryūjin', sub: 'Japanese Mythology · Dragon Palace',
    image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&h=450&q=80',
    story: `Ryūjin — the Dragon King — is the ruler of the sea in Japanese mythology, residing in his magnificent underwater palace Ryūgū-jō at the very bottom of the ocean near Japan. The palace is built of red and white coral, and within its halls, a single day passes for every hundred years on the surface.\n\nRyūjin controls the tides using magical tide jewels and is the ancestor of the imperial family through his daughter Toyotama-hime. The legend of fisherman Urashima Tarō tells of a man who visited Ryūgū-jō for what seemed three days, returning to find 300 years had passed. Ryūjin is deeply venerated in Japanese coastal and fishing communities — a reminder that the sea gives, and the sea takes.`,
  },
];

type MarkerData = typeof FANTASY_MARKERS[number];

const WorldMapSection = () => {
  const { t } = useLang();
  const globeEl = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<{ id: string; name: string } | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const setMarkerRef = useRef(setSelectedMarker);
  setMarkerRef.current = setSelectedMarker;
  const info = selected ? COUNTRY_DATA[selected.id] : null;

  useEffect(() => {
    if (!globeEl.current) return;
    const container = globeEl.current;
    let cancelled = false;

    (async () => {
      const [{ default: Globe }, topojson] = await Promise.all([
        import('globe.gl'),
        import('topojson-client'),
      ]);
      const resp = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
      const world = await resp.json();
      if (cancelled) return;

      const countries = (topojson as any).feature(world, (world as any).objects.countries) as any;

      const globe = (new (Globe as any)(container))
        .globeImageUrl('')
        .backgroundColor('rgba(0,0,0,0)')
        .atmosphereColor('#c8a96e')
        .atmosphereAltitude(0.15)
        .polygonsData(countries.features)
        .polygonAltitude(0.006)
        .polygonCapColor((feat: any) => {
          const id = String(Number(feat.id));
          if (LIVED.has(id)) return '#c8a96e';
          if (TRAVELED.has(id)) return '#4a7c6b';
          return '#1a2540';
        })
        .polygonSideColor(() => 'rgba(10,20,40,0.5)')
        .polygonStrokeColor(() => '#081020')
        .polygonLabel((feat: any) => {
          const id = String(Number(feat.id));
          const d = COUNTRY_DATA[id];
          const name = d ? `${d.flag} ${d.name}` : feat.properties.name;
          const sub = d ? d.city : '';
          return `<div style="background:rgba(5,10,20,0.92);border:1px solid rgba(200,169,110,0.3);color:#c8a96e;padding:8px 14px;border-radius:3px;font-family:ui-sans-serif;font-size:11px;line-height:1.6"><strong>${name}</strong>${sub ? `<br/><span style="color:rgba(200,169,110,0.5);font-size:10px">${sub}</span>` : ''}</div>`;
        })
        .onPolygonClick((feat: any) => {
          const id = String(Number(feat.id));
          setSelected({ id, name: feat.properties.name });
        })
        .htmlElementsData(FANTASY_MARKERS)
        .htmlLat((d: any) => d.lat)
        .htmlLng((d: any) => d.lng)
        .htmlAltitude(0.02)
        .htmlElement((d: any) => {
          const wrap = document.createElement('div');
          wrap.style.cssText = 'position:relative;display:inline-block;cursor:pointer;pointer-events:auto';
          const icon = document.createElement('div');
          icon.style.cssText = 'font-size:22px;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.9));transition:transform 0.2s ease';
          icon.textContent = d.emoji;
          const tip = document.createElement('div');
          tip.style.cssText = 'position:absolute;bottom:140%;left:50%;transform:translateX(-50%);background:rgba(5,10,20,0.95);border:1px solid rgba(200,169,110,0.4);color:#c8a96e;padding:6px 10px;border-radius:3px;font-family:ui-sans-serif;font-size:10px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity 0.15s;line-height:1.5;text-align:center;z-index:10';
          tip.innerHTML = `<strong>${d.title}</strong><br/><span style="color:rgba(200,169,110,0.55);font-size:9px">${d.sub}</span><br/><span style="color:rgba(200,169,110,0.35);font-size:8px;letter-spacing:0.08em">click to read story</span>`;
          wrap.appendChild(icon);
          wrap.appendChild(tip);
          wrap.onmouseenter = () => { icon.style.transform = 'scale(1.6)'; tip.style.opacity = '1'; };
          wrap.onmouseleave = () => { icon.style.transform = 'scale(1)';   tip.style.opacity = '0'; };
          wrap.onclick = (e) => { e.stopPropagation(); setMarkerRef.current(d); };
          return wrap;
        })
        .width(container.clientWidth)
        .height(600);

      // Dark ocean
      const mat = globe.globeMaterial();
      mat.color.setHex(0x020c1b);
      mat.emissive.setHex(0x020c1b);
      mat.emissiveIntensity = 1;

      // Auto-rotate + zoom
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.5;
      globe.controls().enableZoom = true;

      // Start view over Asia-Pacific
      globe.pointOfView({ lat: 15, lng: 100, altitude: 2.2 }, 0);
    })();

    return () => {
      cancelled = true;
      container.innerHTML = '';
    };
  }, []);

  return (
  <section id="worldmap" className="py-24 bg-[#0e0d0c]">
    <div className="max-w-[1400px] mx-auto px-8">
      {/* Header */}
      <div className="mb-14">
        <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-[rgba(200,169,110,0.4)] block mb-3">{t('globalFootprint')}</span>
        <h2 className="text-3xl md:text-5xl font-display font-light text-[#e8dcc8]">{t('whereBeen')}</h2>
        <p className="text-xs text-[rgba(200,169,110,0.4)] mt-3 tracking-widest uppercase">{t('dragRotate')}</p>
      </div>

      {/* 3D Fantasy Globe */}
      <div className="relative rounded-sm overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, #020c1b 60%, #0a1628 100%)', minHeight: 600 }}>
        {/* Decorative corner labels */}
        <div className="absolute top-4 left-4 text-[8px] font-bold uppercase tracking-[0.3em] text-[rgba(200,169,110,0.2)] pointer-events-none select-none z-10">Here Be Dragons</div>
        <div className="absolute top-4 right-4 text-[8px] font-bold uppercase tracking-[0.3em] text-[rgba(200,169,110,0.2)] pointer-events-none select-none text-right z-10">Uncharted Seas</div>
        <div className="absolute bottom-14 left-4 text-[8px] font-bold uppercase tracking-[0.3em] text-[rgba(200,169,110,0.2)] pointer-events-none select-none z-10">Ye Olde World</div>
        <div className="absolute bottom-14 right-4 text-[8px] font-bold uppercase tracking-[0.3em] text-[rgba(200,169,110,0.2)] pointer-events-none select-none text-right z-10">Beyond the Horizon</div>

        {/* Globe container */}
        <div ref={globeEl} className="w-full" style={{ height: 600 }} />

        {/* Country legend */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#c8a96e' }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[rgba(200,169,110,0.6)]">{t('livedWorked')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#4a7c6b' }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[rgba(200,169,110,0.6)]">{t('travelled')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#1a2540' }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[rgba(200,169,110,0.3)]">{t('restOfWorld')}</span>
          </div>
        </div>

        {/* Fantasy marker legend */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-1 z-10 max-h-[340px] overflow-y-auto">
          <div className="text-[8px] font-bold uppercase tracking-[0.3em] text-[rgba(200,169,110,0.25)] mb-0.5">World Legends</div>
          {FANTASY_MARKERS.map(({ emoji, title, sub }) => (
            <div key={title} className="flex items-start gap-1.5">
              <span className="text-xs leading-none mt-px">{emoji}</span>
              <div>
                <div className="text-[8px] text-[rgba(200,169,110,0.45)] font-semibold leading-none mb-0.5">{title}</div>
                <div className="text-[7px] text-[rgba(200,169,110,0.25)] leading-none">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Country cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(200,169,110,0.1)] mt-px">
        {[
          { flag: '🇹🇭', country: 'Thailand', city: 'Khon Kaen & Bangkok', role: 'Origin · Home', desc: 'Born and raised in Thailand. The place that shaped my sense of space, craft, and culture — and the destination I always return to.' },
          { flag: '🇦🇺', country: 'Australia', city: 'Sydney, NSW', role: 'Study & Work · 2018–2025', desc: 'Eight years in Sydney — studying architecture at UTS, working at M.A.R.S Architects, and building a career across interior, retail, and commercial design.' },
        ].map((c) => (
          <div key={c.country} className="bg-[#0a0908] p-10">
            <span className="text-3xl block mb-5">{c.flag}</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[rgba(200,169,110,0.5)] block mb-1">{c.role}</span>
            <h3 className="text-2xl font-display font-light text-[#e8dcc8] mb-1">{c.country}</h3>
            <p className="text-xs text-[rgba(200,169,110,0.45)] mb-4 tracking-widest uppercase">{c.city}</p>
            <p className="text-sm text-[rgba(200,169,110,0.45)] font-light leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Country popup modal */}
    <AnimatePresence>
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.75)' }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-lg bg-[#0e0d0c] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/60 hover:bg-black/90 text-[rgba(200,169,110,0.7)] hover:text-[#c8a96e] transition-colors rounded-full text-sm"
            >
              ✕
            </button>

            {info ? (
              <>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={info.image} alt={info.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0c] via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] block mb-2"
                    style={{ color: info.type === 'lived' ? '#c8a96e' : '#4a7c6b' }}>
                    {info.type === 'lived' ? 'Lived & Worked' : 'Travelled'}
                  </span>
                  <h3 className="text-3xl font-display font-light text-[#e8dcc8] mb-1">{info.flag} {info.name}</h3>
                  <p className="text-xs text-[rgba(200,169,110,0.45)] mb-5 tracking-widest uppercase">{info.city}</p>
                  <p className="text-sm text-[rgba(200,169,110,0.55)] font-light leading-relaxed">{info.desc}</p>
                </div>
              </>
            ) : (
              <div className="p-12 flex flex-col items-center text-center">
                <span className="text-5xl mb-6">🌍</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[rgba(200,169,110,0.3)] block mb-3">Not Yet Visited</span>
                <h3 className="text-3xl font-display font-light text-[#e8dcc8] mb-4">{selected.name}</h3>
                <p className="text-sm text-[rgba(200,169,110,0.35)] font-light leading-relaxed max-w-xs">
                  This country is on the map — but not yet on the journey. Every destination is a future possibility.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Legend Story Modal */}
    <AnimatePresence>
      {selectedMarker && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setSelectedMarker(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.28 }}
            className="relative w-full max-w-lg bg-[#07080f] overflow-hidden"
            style={{ border: '1px solid rgba(200,169,110,0.15)', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedMarker(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/70 hover:bg-black/95 text-[rgba(200,169,110,0.7)] hover:text-[#c8a96e] transition-colors rounded-full text-sm"
            >✕</button>

            {/* Hero Image */}
            <div className="relative aspect-[16/8] overflow-hidden flex-shrink-0">
              <img
                src={selectedMarker.image}
                alt={selectedMarker.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080f] via-[rgba(7,8,15,0.3)] to-transparent" />
              {/* Emoji over image bottom-left */}
              <div className="absolute bottom-4 left-6 text-5xl drop-shadow-2xl">{selectedMarker.emoji}</div>
            </div>

            {/* Header */}
            <div className="px-8 pt-6 pb-5 border-b border-[rgba(200,169,110,0.1)] flex-shrink-0">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[rgba(200,169,110,0.4)] block mb-1">{selectedMarker.sub}</span>
              <h3 className="text-3xl font-display font-light text-[#e8dcc8]">{selectedMarker.title}</h3>
            </div>

            {/* Story — scrollable */}
            <div className="px-8 py-7 overflow-y-auto flex-1">
              {selectedMarker.story.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm text-[rgba(200,169,110,0.55)] font-light leading-relaxed mb-4 last:mb-0">{para}</p>
              ))}
            </div>

            {/* Footer */}
            <div className="px-8 py-4 border-t border-[rgba(200,169,110,0.08)] flex-shrink-0">
              <span className="text-[8px] uppercase tracking-[0.4em] text-[rgba(200,169,110,0.2)]">World Legends · Globe Lore</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </section>
  );
};

// --- Featured Project Slider ---
const FeaturedSlider = ({ projects, onOpen }: { projects: Project[]; onOpen: (p: Project) => void }) => {
  const featured = projects.slice(0, 5);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % featured.length), 5000);
    return () => clearInterval(t);
  }, [featured.length]);
  return (
    <section className="relative w-full overflow-hidden bg-stone-900" style={{ height: '85vh' }}>
      <AnimatePresence mode="sync">
        <motion.div key={active} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }} className="absolute inset-0">
          <img src={featured[active].image} alt={featured[active].title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 to-transparent" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute top-10 right-10 z-10 font-mono text-[10px] text-white/30 tracking-widest">
        {String(active + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 p-10 md:p-16">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }} className="max-w-xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1.5 border border-white/20 bg-white/10 backdrop-blur-sm text-[9px] font-bold uppercase tracking-[0.25em] text-white">{featured[active].category}</span>
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {featured[active].location}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-light text-white leading-none tracking-tight mb-4">{featured[active].title}</h2>
            <p className="hidden md:block text-sm text-white/55 font-light leading-relaxed mb-7 max-w-lg">{featured[active].description}</p>
            <button onClick={() => onOpen(featured[active])} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors">
              View Project <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center gap-4 mt-10">
          <button onClick={() => setActive(a => (a - 1 + featured.length) % featured.length)} className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-all"><ChevronLeft className="w-4 h-4" /></button>
          <div className="flex gap-2">
            {featured.map((_, i) => (<button key={i} onClick={() => setActive(i)} className={`transition-all duration-500 rounded-full ${i === active ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`} />))}
          </div>
          <button onClick={() => setActive(a => (a + 1) % featured.length)} className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-all"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </section>
  );
};

// --- Marquee Strip ---
const MarqueeStrip = () => (
  <div className="overflow-hidden py-4 bg-[#3d3a35] border-y border-stone-700">
    <style>{`@keyframes marquee-scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    <div style={{ animation: 'marquee-scroll 28s linear infinite', display: 'inline-flex', gap: '3rem' }}>
      {Array(18).fill(null).map((_, i) => (
        <span key={i} className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold flex-shrink-0 whitespace-nowrap">
          {['Architecture', 'Interior Design', 'Documentation', 'Spatial Design', 'Concept Design', 'Landscaping'][i % 6]}
          <span className="text-stone-700 mx-6">·</span>
        </span>
      ))}
    </div>
  </div>
);

// --- Stats Section ---
const StatItem = ({ value, suffix, label, delay = 0 }: { value: number; suffix: string; label: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = value / 40;
    const t = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(t);
  }, [inView, value]);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay }} className="text-center">
      <div className="text-5xl md:text-7xl font-display font-light text-stone-800 mb-2">{count}{suffix}</div>
      <div className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-bold">{label}</div>
    </motion.div>
  );
};
const StatsSection = () => {
  const { t } = useLang();
  return (
    <section className="py-20 bg-[#fdfaf6] border-t border-stone-100">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          <StatItem value={ARCHIVE_PROJECTS.length} suffix="" label={t('involvingProjects')} delay={0} />
          <StatItem value={12} suffix="+" label={t('projectsCompleted')} delay={0.1} />
          <StatItem value={3} suffix="+" label={t('yearsExperience')} delay={0.2} />
          <StatItem value={5} suffix="" label={t('cities')} delay={0.3} />
          <StatItem value={2} suffix="" label={t('countries')} delay={0.4} />
        </div>
      </div>
    </section>
  );
};

// --- Main App ---
export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const t = (k: TKey): string => translations[lang][k] as string;

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.2], [0, 10]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [articleIndex, setArticleIndex] = useState(0);
  const [modelSlide, setModelSlide] = useState(0);
  const [articleGallery, setArticleGallery] = useState<{ images: string[]; index: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', message: '' });
  const [inquirySent, setInquirySent] = useState(false);
  const [inquirySending, setInquirySending] = useState(false);
  const [inquiryError, setInquiryError] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [toast, setToast] = useState('');
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setModelSlide((prev) => (prev + 1) % MODEL_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbdqlobz';

  const handleInquirySubmit = async () => {
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.message) {
      setInquiryError(t('fillFields'));
      return;
    }
    setInquiryError('');
    setInquirySending(true);
    try {
      const formData = new FormData();
      formData.append('name', inquiryForm.name);
      formData.append('email', inquiryForm.email);
      formData.append('message', inquiryForm.message);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setInquirySent(true);
        setInquiryForm({ name: '', email: '', message: '' });
      } else {
        const data = await res.json().catch(() => ({}));
        setInquiryError(data?.error || t('somethingWrong'));
      }
    } catch {
      setInquiryError(t('somethingWrong'));
    } finally {
      setInquirySending(false);
    }
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setToast(`${email} copied!`);
    setTimeout(() => setToast(''), 2500);
  };



  return (
    <LangContext.Provider value={{ lang, setLang }}>
    <div className="min-h-screen font-sans selection:bg-[#f3e5d0] selection:text-[#3d3a35]">

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[300] bg-stone-900 text-white px-6 py-3 text-[9px] font-bold uppercase tracking-[0.3em]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Archive Modal */}
      <AnimatePresence>
        {showArchive && (
          <ProjectArchiveModal onClose={() => setShowArchive(false)} />
        )}
      </AnimatePresence>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-8 z-[90] w-10 h-10 bg-white border border-stone-200 flex items-center justify-center shadow-md hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300"
          >
            <ChevronDown className="w-4 h-4 rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="fixed inset-0 z-[300] bg-[#1a1917] flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-center"
            >
              <p className="text-[9px] uppercase tracking-[0.5em] text-white/40 font-bold mb-5">Architecture & Design</p>
              <h1 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight">Sam Saenpao</h1>
              <motion.div
                className="mt-8 h-px bg-white/20 mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.3 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Inquiry Button */}
      <motion.button
        onClick={() => setInquiryOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed bottom-8 right-8 z-[90] flex items-center gap-3 bg-stone-900 text-white px-6 py-3.5 text-[9px] font-bold uppercase tracking-[0.3em] shadow-xl hover:bg-stone-700 transition-colors duration-300"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        {t('startProject')}
      </motion.button>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {inquiryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setInquiryOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="bg-white w-full max-w-lg p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setInquiryOpen(false)} className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 transition-colors">
                <X className="w-4 h-4" />
              </button>
              {inquirySent ? (
                <div className="text-center py-8">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-3">{t('messageSent')}</p>
                  <h3 className="text-2xl font-display font-light text-stone-800">{t('thankYou')}</h3>
                </div>
              ) : (
                <>
                  <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-2">{t('newEnquiry')}</p>
                  <h3 className="text-2xl font-display font-light text-stone-800 mb-8">{t('startProject')}</h3>
                  <div className="space-y-5">
                    <input
                      type="text"
                      placeholder={t('yourName')}
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full border-b border-stone-200 pb-3 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 bg-transparent"
                    />
                    <input
                      type="email"
                      placeholder={t('yourEmail')}
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full border-b border-stone-200 pb-3 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 bg-transparent"
                    />
                    <textarea
                      placeholder={t('aboutProject')}
                      rows={4}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full border-b border-stone-200 pb-3 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 bg-transparent resize-none"
                    />
                    {inquiryError && (
                      <p className="text-[9px] text-red-500 uppercase tracking-[0.2em] font-bold">{inquiryError}</p>
                    )}
                    <button
                      onClick={handleInquirySubmit}
                      disabled={inquirySending}
                      className="w-full bg-stone-900 text-white py-4 text-[9px] font-bold uppercase tracking-[0.4em] hover:bg-stone-700 transition-colors duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {inquirySending ? t('sending') : t('sendMessage')}
                    </button>
                  </div>
                  <div className="mt-8 pt-8 border-t border-stone-100 flex items-center gap-6">
                    <img src="/line-qr.jpeg" alt="LINE QR Code" className="w-24 h-24 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-1">{t('lineAlt')}</p>
                      <p className="text-xs text-stone-500 font-light leading-relaxed">{t('lineDesc')}</p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      {/* Article Gallery Lightbox */}
      <AnimatePresence>
        {articleGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={() => setArticleGallery(null)}
          >
            <button
              onClick={() => setArticleGallery(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 z-10"
            >
              Close <X className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setArticleGallery(g => g && g.index > 0 ? { ...g, index: g.index - 1 } : g); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <motion.img
              key={articleGallery.index}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={articleGallery.images[articleGallery.index]}
              alt=""
              className="max-h-[85vh] max-w-[85vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); setArticleGallery(g => g && g.index < g.images.length - 1 ? { ...g, index: g.index + 1 } : g); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/40 uppercase tracking-widest">
              {articleGallery.index + 1} / {articleGallery.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar />

      <main>
        {/* Hero — Magazine Cover */}
        <section className="relative h-screen w-full overflow-hidden flex items-end justify-start">
          <motion.div
            className="absolute inset-0"
            style={{ opacity: heroOpacity, scale: heroScale, filter: `blur(${heroBlur}px)` }}
          >
            {/* Cycling background videos */}
            <AnimatePresence>
              <motion.video
                key={currentSlide}
                className="absolute inset-0 w-full h-full object-cover"
                src={HERO_VIDEOS[currentSlide]}
                autoPlay
                loop
                muted
                playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          </motion.div>

          {/* Slide indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {HERO_VIDEOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`transition-all duration-500 rounded-full ${
                  i === currentSlide
                    ? 'w-6 h-1.5 bg-white'
                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Editorial overlay — bottom left like a magazine */}
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 pb-20 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1] }}
              className="max-w-2xl"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/60 mb-6 block">
                {t('heroBadge')}
              </span>
              <h1 className="text-5xl md:text-8xl font-display font-light text-white leading-none tracking-tighter mb-6 golden-glow">
                SAM <br /><span className="italic">SAENPAO</span>
              </h1>
              <div className="h-px w-16 bg-white/40 mb-6" />
              <p className="text-base md:text-lg text-white/75 max-w-lg leading-relaxed font-light mb-10">
                {t('heroSubtitle')}
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                <a
                  href="#projects"
                  className="flex items-center gap-3 px-8 py-4 bg-white text-stone-900 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-100 transition-colors"
                >
                  {t('exploreWork')} <ArrowRight className="w-3 h-3" />
                </a>
                <a
                  href="#articles"
                  className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors"
                >
                  <BookOpen className="w-4 h-4" /> {t('readArticles')}
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-8 right-8 text-white/50 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[8px] uppercase tracking-[0.4em]">{t('scroll')}</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </section>

        <MarqueeStrip />

        {/* Publication strip */}
        <section className="py-5 bg-[#3d3a35]">
          <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold">{t('pubLabel')}</span>
            <div className="hidden md:flex items-center gap-6 text-[9px] uppercase tracking-[0.3em] text-stone-500 font-bold">
              <span>{t('navProjects')}</span><span>·</span>
              <span>{t('navArticles')}</span><span>·</span>
              <span>{t('navMakers')}</span><span>·</span>
              <span>{t('navContact')}</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold">v1.6.0.1 · 2025</span>
          </div>
        </section>

        {/* Editorial Features — Carousel */}
        <section id="articles" className="py-24 md:py-36 bg-[#fdfaf6] overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex items-end justify-between mb-16 border-b border-stone-100 pb-8">
              <div>
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300 block mb-3">{t('editorial')}</span>
                <h2 className="text-3xl md:text-5xl font-display font-light text-stone-800">{t('latestFeatures')}</h2>
              </div>
              {/* Nav arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setArticleIndex((i) => Math.max(i - 1, 0))}
                  disabled={articleIndex === 0}
                  className="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-400 hover:border-stone-900 hover:text-stone-900 disabled:opacity-20 transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setArticleIndex((i) => Math.min(i + 1, ARTICLES.length - 1))}
                  disabled={articleIndex === ARTICLES.length - 1}
                  className="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-400 hover:border-stone-900 hover:text-stone-900 disabled:opacity-20 transition-all duration-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sliding track */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-8"
                animate={{ x: `calc(-${articleIndex * 100}% - ${articleIndex * 2}rem)` }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              >
                {ARTICLES.map((article) => {
                  const ath = lang === 'th' ? ARTICLES_TH[article.id] : undefined;
                  return (
                  <div key={article.id} className="min-w-full group cursor-pointer">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      {/* Image — left */}
                      <div className="lg:col-span-7">
                        <div
                          className="aspect-[16/10] overflow-hidden bg-stone-100 soft-shadow relative"
                          onClick={() => article.gallery && setArticleGallery({ images: article.gallery, index: 0 })}
                          style={article.gallery ? { cursor: 'zoom-in' } : {}}
                        >
                          <img
                            src={article.image}
                            alt={ath?.title ?? article.title}
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-6 left-6">
                            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[9px] font-bold uppercase tracking-[0.2em] text-stone-900">
                              {ath?.category ?? article.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Text — right */}
                      <div className="lg:col-span-5 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-[9px] font-mono text-stone-300 uppercase tracking-widest">{article.date}</span>
                          <span className="text-stone-200">·</span>
                          <span className="text-[9px] font-mono text-stone-300 uppercase tracking-widest">{article.readTime}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-display font-light text-stone-800 mb-6 leading-tight group-hover:text-stone-500 transition-colors">
                          {ath?.title ?? article.title}
                        </h3>
                        <p className="text-sm text-stone-400 font-light leading-relaxed mb-8">
                          {ath?.excerpt ?? article.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 group-hover:text-stone-900 transition-colors">
                          {t('readFeature')} <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-2 mt-12">
              {ARTICLES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setArticleIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === articleIndex ? 'w-6 h-1.5 bg-stone-800' : 'w-1.5 h-1.5 bg-stone-300 hover:bg-stone-500'
                  }`}
                />
              ))}
              <span className="ml-4 text-[9px] font-mono text-stone-300 uppercase tracking-widest">
                {String(articleIndex + 1).padStart(2, '0')} / {String(ARTICLES.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </section>

        {/* 3D Modelling Process */}
        <section className="py-0 bg-[#0f0e0d] overflow-hidden">
          {/* Header */}
          <div className="max-w-[1400px] mx-auto px-8 pt-24 pb-12">
            <div className="flex items-end justify-between border-b border-stone-800 pb-8">
              <div>
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-600 block mb-3">{t('visualWork')}</span>
                <h2 className="text-3xl md:text-5xl font-display font-light text-stone-200">{t('rendering')}</h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setModelSlide((i) => (i - 1 + MODEL_SLIDES.length) % MODEL_SLIDES.length)}
                  className="w-10 h-10 border border-stone-700 flex items-center justify-center text-stone-500 hover:border-stone-400 hover:text-stone-200 transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setModelSlide((i) => (i + 1) % MODEL_SLIDES.length)}
                  className="w-10 h-10 border border-stone-700 flex items-center justify-center text-stone-500 hover:border-stone-400 hover:text-stone-200 transition-all duration-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Slideshow */}
          <div className="relative overflow-hidden" style={{ height: '70vh' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={modelSlide}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={MODEL_SLIDES[modelSlide].image}
                  alt={MODEL_SLIDES[modelSlide].title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0d] via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f0e0d]/60 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Slide info overlay */}
            <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-8 pb-16 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={modelSlide}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <span className="text-[9px] font-mono text-stone-500 uppercase tracking-[0.4em] block mb-3">
                    {MODEL_SLIDES[modelSlide].tool}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-light text-stone-100 mb-4 leading-tight">
                    {(lang === 'th' ? MODEL_SLIDES_TH[modelSlide]?.title : undefined) ?? MODEL_SLIDES[modelSlide].title}
                  </h3>
                  <p className="text-sm text-stone-400 font-light max-w-lg leading-relaxed">
                    {(lang === 'th' ? MODEL_SLIDES_TH[modelSlide]?.description : undefined) ?? MODEL_SLIDES[modelSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Click nav zones */}
            <button
              className="absolute left-0 top-0 h-full w-1/4 z-10"
              onClick={() => setModelSlide((i) => (i - 1 + MODEL_SLIDES.length) % MODEL_SLIDES.length)}
            />
            <button
              className="absolute right-0 top-0 h-full w-1/4 z-10"
              onClick={() => setModelSlide((i) => (i + 1) % MODEL_SLIDES.length)}
            />
          </div>

          {/* Dot indicators + counter */}
          <div className="max-w-[1400px] mx-auto px-8 py-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {MODEL_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setModelSlide(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === modelSlide ? 'w-6 h-1.5 bg-stone-300' : 'w-1.5 h-1.5 bg-stone-700 hover:bg-stone-500'
                  }`}
                />
              ))}
            </div>
            <span className="text-[9px] font-mono text-stone-600 uppercase tracking-widest">
              {String(modelSlide + 1).padStart(2, '0')} / {String(MODEL_SLIDES.length).padStart(2, '0')}
            </span>
          </div>

          {/* Thumbnail strip */}
          <div className="max-w-[1400px] mx-auto px-8 pb-24">
            <div className="flex gap-3 overflow-x-auto">
              {MODEL_SLIDES.map((slide, i) => {
                const sth = lang === 'th' ? MODEL_SLIDES_TH[i] : undefined;
                return (
                  <button
                    key={i}
                    onClick={() => setModelSlide(i)}
                    className={`flex-shrink-0 relative overflow-hidden transition-all duration-300 ${
                      i === modelSlide ? 'ring-1 ring-stone-400 opacity-100' : 'opacity-35 hover:opacity-65'
                    }`}
                    style={{ width: 140, height: 90 }}
                  >
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover bg-stone-900"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.background = '#1c1c1c'; }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2">
                      <span className="text-[8px] font-mono text-stone-400 uppercase tracking-widest leading-none block">{slide.step} — {sth?.title ?? slide.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Who Am I */}
        <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black">
          {/* Left — B&W portrait, full bleed */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="relative min-h-[60vh] lg:min-h-screen overflow-hidden"
          >
            <img
              src="/photos/me.jpeg"
              alt="Sam Saenpao"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'grayscale(100%)', minHeight: '100%' }}
            />
          </motion.div>

          {/* Right — dark text panel with diagram in bottom-right corner */}
          <div className="relative bg-black flex flex-col justify-center px-14 lg:px-20 py-20 lg:py-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/35 block mb-10">{t('whoAmI')}</span>
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-display font-light text-white mb-10 leading-[1.05] tracking-tight">
                Sam <span className="italic">Saenpao</span>
              </h3>
              <div className="space-y-5 text-sm text-white/55 font-light leading-relaxed max-w-sm">
                <p>{t('whoAmIText1')}</p>
                <p>{t('whoAmIText2')}</p>
                <p>{t('whoAmIText3')}</p>
              </div>
              <a href="#about" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.35em] text-white/35 hover:text-white transition-colors mt-12">
                {t('fullStudioProfile')} <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>

            {/* Architectural diagram — bottom-right corner of black panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.8 }}
              className="absolute bottom-0 right-0 w-48 md:w-60 p-4"
            >
              <svg viewBox="0 0 520 650" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <line x1="10" y1="595" x2="510" y2="595" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                {/* Rounded building envelope */}
                <rect x="65" y="65" width="380" height="530" rx="30" ry="30" stroke="white" strokeWidth="1.8" fill="none" opacity="0.55"/>
                <line x1="65" y1="123" x2="445" y2="123" stroke="white" strokeWidth="1" opacity="0.35"/>
                <line x1="65" y1="181" x2="445" y2="181" stroke="white" strokeWidth="1" opacity="0.35"/>
                <line x1="65" y1="239" x2="445" y2="239" stroke="white" strokeWidth="1" opacity="0.35"/>
                <line x1="65" y1="297" x2="445" y2="297" stroke="white" strokeWidth="1" opacity="0.35"/>
                <line x1="65" y1="355" x2="445" y2="355" stroke="white" strokeWidth="1" opacity="0.35"/>
                <line x1="65" y1="413" x2="445" y2="413" stroke="white" strokeWidth="1" opacity="0.35"/>
                <line x1="65" y1="471" x2="445" y2="471" stroke="white" strokeWidth="1" opacity="0.35"/>
                <line x1="65" y1="529" x2="445" y2="529" stroke="white" strokeWidth="1" opacity="0.35"/>
                <line x1="140" y1="65" x2="140" y2="595" stroke="white" strokeWidth="0.6" opacity="0.2"/>
                <line x1="255" y1="65" x2="255" y2="595" stroke="white" strokeWidth="0.5" opacity="0.15"/>
                <line x1="370" y1="65" x2="370" y2="595" stroke="white" strokeWidth="0.6" opacity="0.2"/>
                <path d="M150,65 C150,36 200,24 255,22 C310,24 360,36 360,65" stroke="white" strokeWidth="1.3" fill="none" opacity="0.5"/>
                <path d="M175,65 C175,46 210,38 255,36 C300,38 335,46 335,65" stroke="white" strokeWidth="0.6" fill="none" opacity="0.3"/>
                <line x1="215" y1="22" x2="215" y2="6" stroke="white" strokeWidth="0.8" opacity="0.45"/>
                <ellipse cx="215" cy="3" rx="9" ry="7" stroke="white" strokeWidth="0.8" fill="none" opacity="0.45"/>
                <line x1="255" y1="22" x2="255" y2="2" stroke="white" strokeWidth="0.8" opacity="0.45"/>
                <ellipse cx="255" cy="0" rx="11" ry="7" stroke="white" strokeWidth="0.8" fill="none" opacity="0.45"/>
                <line x1="295" y1="22" x2="295" y2="6" stroke="white" strokeWidth="0.8" opacity="0.45"/>
                <ellipse cx="295" cy="3" rx="9" ry="7" stroke="white" strokeWidth="0.8" fill="none" opacity="0.45"/>
                <path d="M318,595 C318,576 202,570 202,551 C202,538 318,531 318,529" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5"/>
                <path d="M202,529 C202,510 318,504 318,485 C318,472 202,465 202,471" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5"/>
                <path d="M318,471 C318,452 202,446 202,427 C202,414 318,407 318,413" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5"/>
                <path d="M202,413 C202,394 318,388 318,369 C318,356 202,349 202,355" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5"/>
                <path d="M318,355 C318,336 202,330 202,311 C202,298 318,291 318,297" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5"/>
                <path d="M202,297 C202,278 318,272 318,253 C318,240 202,233 202,239" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5"/>
                <path d="M318,239 C318,220 202,214 202,195 C202,182 318,175 318,181" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5"/>
                <path d="M202,181 C202,162 318,156 318,137 C318,124 202,117 202,123" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5"/>
                <path d="M318,123 C318,104 202,98 202,79 C202,66 318,59 318,65" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5"/>
                <line x1="445" y1="181" x2="468" y2="181" stroke="white" strokeWidth="0.9" opacity="0.4"/>
                <line x1="468" y1="123" x2="468" y2="181" stroke="white" strokeWidth="0.7" opacity="0.32"/>
                <line x1="445" y1="297" x2="468" y2="297" stroke="white" strokeWidth="0.9" opacity="0.4"/>
                <line x1="468" y1="239" x2="468" y2="297" stroke="white" strokeWidth="0.7" opacity="0.32"/>
                <line x1="445" y1="413" x2="468" y2="413" stroke="white" strokeWidth="0.9" opacity="0.4"/>
                <line x1="468" y1="355" x2="468" y2="413" stroke="white" strokeWidth="0.7" opacity="0.32"/>
                <line x1="445" y1="529" x2="468" y2="529" stroke="white" strokeWidth="0.9" opacity="0.4"/>
                <line x1="468" y1="471" x2="468" y2="529" stroke="white" strokeWidth="0.7" opacity="0.32"/>
                <line x1="168" y1="595" x2="168" y2="574" stroke="white" strokeWidth="0.8" opacity="0.38"/>
                <circle cx="168" cy="571" r="3.5" stroke="white" strokeWidth="0.7" fill="none" opacity="0.38"/>
                <line x1="182" y1="595" x2="182" y2="574" stroke="white" strokeWidth="0.8" opacity="0.38"/>
                <circle cx="182" cy="571" r="3.5" stroke="white" strokeWidth="0.7" fill="none" opacity="0.38"/>
                <line x1="30" y1="595" x2="30" y2="552" stroke="white" strokeWidth="1" opacity="0.38"/>
                <path d="M8,573 C8,547 52,547 52,573" stroke="white" strokeWidth="0.8" fill="none" opacity="0.38"/>
                <path d="M16,541 C16,522 44,522 44,541" stroke="white" strokeWidth="0.65" fill="none" opacity="0.3"/>
                <ellipse cx="30" cy="504" rx="9" ry="11" stroke="white" strokeWidth="0.65" fill="none" opacity="0.3"/>
                <line x1="490" y1="595" x2="490" y2="552" stroke="white" strokeWidth="1" opacity="0.38"/>
                <path d="M468,573 C468,547 512,547 512,573" stroke="white" strokeWidth="0.8" fill="none" opacity="0.38"/>
                <path d="M476,541 C476,522 504,522 504,541" stroke="white" strokeWidth="0.65" fill="none" opacity="0.3"/>
                <ellipse cx="490" cy="504" rx="9" ry="11" stroke="white" strokeWidth="0.65" fill="none" opacity="0.3"/>
              </svg>
            </motion.div>
          </div>
        </section>

        {/* Projects — Editorial Features */}
        <section id="projects" className="py-24 md:py-36 bg-[#f9f6f2]">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex items-end justify-between mb-20 border-b border-stone-200 pb-8">
              <div>
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300 block mb-3">{t('featuredWork')}</span>
                <h2 className="text-3xl md:text-5xl font-display font-light text-stone-800">{t('completed')}</h2>
              </div>
              <div className="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                {['All', 'Interior', 'Retail', 'Food & Beverage', 'Commercial'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`transition-colors ${activeFilter === cat ? 'text-stone-900 border-b border-stone-900 pb-0.5' : 'hover:text-stone-900'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            {(() => {
              const filtered = PROJECTS.filter((p) => activeFilter === 'All' || p.category === activeFilter);
              const [hero, ...rest] = filtered;
              return (
                <div className="space-y-16">
                  {hero && (
                    <ProjectHeroCard project={hero} onOpen={() => setSelectedProject(hero)} />
                  )}
                  {rest.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                      {rest.map((project, idx) => (
                        <ProjectItem key={project.id} project={project} index={idx} onOpen={() => setSelectedProject(project)} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
            <div className="mt-24 text-center">
              <motion.button
                className="px-16 py-5 border border-stone-300 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-500"
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowArchive(true)}
              >
                {t('viewFullArchive')}
              </motion.button>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section id="makers" className="py-24 md:py-36 bg-[#fdfaf6]">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="mb-16 border-b border-stone-100 pb-8">
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300 block mb-3">{t('clientsLabel')}</span>
              <h2 className="text-3xl md:text-5xl font-display font-light text-stone-800">{t('clientsTitle')}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CLIENT_LOGOS.map((client, i) => (
                <ClientLogoTile key={client.id} client={client} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <StatsSection />

        {/* University */}
        <section id="university" className="py-24 md:py-36 bg-[#f9f6f2]">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex items-end justify-between mb-16 border-b border-stone-100 pb-8">
              <div>
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300 block mb-3">{t('academicWork')}</span>
                <h2 className="text-3xl md:text-5xl font-display font-light text-stone-800">{t('university')}</h2>
              </div>
            </div>
            <UniversitySection />
          </div>
        </section>

        {/* 3D Modelling Process */}
        <section className="py-24 md:py-36 bg-stone-950">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex items-end justify-between mb-12 border-b border-stone-800 pb-8">
              <div>
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-600 block mb-3">{t('workflow')}</span>
                <h2 className="text-3xl md:text-5xl font-display font-light text-white">{t('modelling3D')}</h2>
              </div>
              <span className="hidden md:block text-[9px] uppercase tracking-[0.4em] font-bold text-stone-600">37 frames</span>
            </div>
            <ProcessSlider />
          </div>
        </section>

        {/* Credentials */}
        <section id="credentials" className="py-24 md:py-36 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex items-end justify-between mb-16 border-b border-stone-100 pb-8">
              <div>
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300 block mb-3">{t('qualifications')}</span>
                <h2 className="text-3xl md:text-5xl font-display font-light text-stone-800">{t('credentials')}</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Certificate image */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative shadow-xl"
              >
                <img
                  src="/certificate-uts.png"
                  alt="Bachelor of Design in Architecture — University of Technology Sydney"
                  className="w-full h-auto"
                />
              </motion.div>

              {/* Text side */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              >
                <img src="/logos/uts.png" alt="UTS" className="h-10 mb-8 object-contain object-left" />
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300 block mb-6">{t('academicBackground')}</span>
                <h4 className="text-xl md:text-2xl font-display font-light text-stone-800 mb-6 leading-snug">
                  A design education grounded in built environment thinking
                </h4>
                <p className="text-sm font-light text-stone-500 leading-relaxed mb-8">
                  Graduated from the University of Technology Sydney with a Bachelor of Design in Architecture — a programme that developed critical thinking across spatial design, documentation, technology, and sustainable practice. The degree provided the foundation for professional work across residential, commercial, and hospitality typologies in Sydney and Southeast Asia.
                </p>
                <div className="space-y-4">
                  {[
                    { label: t('degreeLabel'), value: 'Bachelor of Design in Architecture' },
                    { label: t('institutionLabel'), value: 'University of Technology Sydney' },
                    { label: t('locationLabel'), value: 'Ultimo, NSW, Australia' },
                    { label: t('conferredLabel'), value: '7 February 2023' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-baseline gap-4 border-b border-stone-100 pb-4">
                      <span className="text-[9px] uppercase tracking-[0.35em] font-bold text-stone-400 w-24 flex-shrink-0">{item.label}</span>
                      <span className="text-xs font-light text-stone-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Studio Profile — About */}
        <section id="about" className="py-24 md:py-36 bg-[#3d3a35] text-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
              <div className="lg:col-span-5">
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-500 block mb-8">{t('studioProfile')}</span>
                <h2 className="text-4xl md:text-6xl font-display font-light mb-10 tracking-tight leading-none">
                  Architectural <br /><span className="italic">Manager</span>
                </h2>
                <div className="aspect-[4/5] overflow-hidden mb-10 relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={HERO_IMAGES[currentSlide]}
                      alt="Sam Saenpao Studio"
                      className="w-full h-full object-cover absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2 }}
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#3d3a35] to-transparent z-10">
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-400">Sydney, Australia</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 pt-20">
                <p className="text-2xl font-display font-light text-stone-300 leading-relaxed mb-12 italic">
                  {t('studioQuote')}
                </p>
                <p className="text-base text-stone-400 leading-relaxed font-light mb-8">
                  {t('studioBio1')}
                </p>
                <p className="text-sm text-stone-500 leading-relaxed font-light mb-16">
                  {t('studioBio2')}
                </p>

                <div className="grid grid-cols-2 gap-10 mb-16">
                  {[
                    { title: t('skillClarity'), desc: t('skillClarityDesc') },
                    { title: t('skill3D'), desc: t('skill3DDesc') },
                    { title: t('skillBIM'), desc: t('skillBIMDesc') },
                    { title: t('skillEnv'), desc: t('skillEnvDesc') },
                  ].map((skill) => (
                    <div key={skill.title}>
                      <h5 className="text-xs font-bold uppercase tracking-widest mb-3 text-stone-300">{skill.title}</h5>
                      <p className="text-xs text-stone-500 font-light leading-relaxed">{skill.desc}</p>
                    </div>
                  ))}
                </div>

                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-500 border-t border-stone-700 pt-12 mb-10">
                  {t('experienceEducation')}
                </h4>
                <div className="space-y-10">
                  {EXPERIENCE.map((exp, idx) => {
                    const eth = lang === 'th' ? EXPERIENCE_TH[idx] : undefined;
                    return (
                      <div key={idx} className="grid grid-cols-12 gap-6">
                        <div className="col-span-3">
                          <span className="text-[10px] font-mono text-stone-600">{exp.year}</span>
                        </div>
                        <div className="col-span-1 flex items-start pt-0.5">
                          {exp.logo ? (
                            <div className="w-8 h-8 rounded bg-white flex items-start justify-center overflow-hidden flex-shrink-0 p-0.5">
                              <img
                                src={exp.logo}
                                alt=""
                                className="w-full h-full object-contain object-top"
                                onError={(e) => {
                                  const el = e.currentTarget;
                                  el.parentElement!.style.display = 'none';
                                  if (el.parentElement?.nextElementSibling) (el.parentElement.nextElementSibling as HTMLElement).style.display = 'flex';
                                }}
                              />
                            </div>
                          ) : null}
                          <div
                            className="w-8 h-8 rounded bg-stone-700 flex items-center justify-center text-[9px] font-bold text-stone-400 uppercase tracking-wide"
                            style={{ display: exp.logo ? 'none' : 'flex' }}
                          >
                            {exp.company.split(' ').slice(0, 2).map(w => w[0]).join('')}
                          </div>
                        </div>
                        <div className="col-span-8">
                          <h5 className="text-base font-display font-medium mb-1 text-stone-200">{eth?.title ?? exp.title}</h5>
                          <h6 className="text-xs text-stone-500 uppercase tracking-widest mb-2">{eth?.company ?? exp.company}</h6>
                          <p className="text-xs text-stone-600 font-light leading-relaxed">{eth?.description ?? exp.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12">
                  <motion.a
                    href={lang === 'th' ? '/cv-th.html' : '/cv.html'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 px-10 py-5 bg-[#fdfaf6] text-[#3d3a35] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                    {t('downloadCV')}
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Process */}
        <section id="process" className="py-24 md:py-40 bg-[#fdfaf6] overflow-hidden relative">
          {/* Decorative background circles */}
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-stone-100 pointer-events-none" />
          <div className="absolute -top-16 -right-16 w-[440px] h-[440px] rounded-full border border-stone-100 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[280px] h-[280px] rounded-full border border-stone-100 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full border border-stone-100 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-[220px] h-[220px] rounded-full border border-stone-100 pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-8 relative z-10">
            <div className="mb-24 text-center">
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300 block mb-4">Methodology</span>
              <h2 className="text-3xl md:text-5xl font-display font-light text-stone-800">From Vision to Detail</h2>
            </div>

            {/* Flow */}
            <div className="relative">
              {/* Dashed connector line (desktop only) */}
              <div className="hidden lg:block absolute top-[88px] left-[12.5%] right-[12.5%] pointer-events-none">
                <svg width="100%" height="2" className="overflow-visible">
                  <line x1="0" y1="1" x2="100%" y2="1" stroke="#d6d3d1" strokeWidth="1" strokeDasharray="8 6" />
                  {[0.33, 0.66].map((pos, i) => (
                    <polygon key={i} points="0,-5 10,0 0,5" fill="#d6d3d1"
                      transform={`translate(${pos * 100}%,1) translate(-5,0)`} />
                  ))}
                </svg>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {PROCESS_STEPS.map((step, idx) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.15 }}
                    className="flex flex-col items-center text-center group cursor-default"
                  >
                    {/* Circle node */}
                    <div className="w-20 h-20 rounded-full bg-white shadow-md border border-stone-100 flex items-center justify-center mb-8 relative group-hover:shadow-xl group-hover:border-stone-400 transition-all duration-500">
                      <div className="text-stone-400 group-hover:text-stone-800 transition-colors duration-300">
                        {step.icon}
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-stone-800 text-white text-[9px] font-bold flex items-center justify-center">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Card */}
                    <div className="bg-white border border-stone-100 p-7 w-full shadow-sm group-hover:shadow-md group-hover:border-stone-300 transition-all duration-500">
                      <h4 className="text-base font-display font-medium mb-3 text-stone-800">{step.title}</h4>
                      <p className="text-xs text-stone-400 font-light leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Journey */}
        <section id="journal" className="py-24 bg-[#0a0908]">
          <div className="max-w-[1400px] mx-auto px-8">

            {/* Header */}
            <div className="mb-14 border-b border-[rgba(200,169,110,0.15)] pb-8">
              <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-[rgba(200,169,110,0.45)] block mb-3">{t('personalNarrative')}</span>
              <div className="flex items-end justify-between">
                <h2 className="text-3xl md:text-5xl font-display font-light text-[#e8dcc8]">{t('theJourney')}</h2>
                <span className="hidden md:block text-[10px] font-mono uppercase tracking-[0.35em] text-[rgba(200,169,110,0.4)]">{t('journeyCaption')}</span>
              </div>
            </div>

            {/* Flight path diagram */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="mb-16 overflow-hidden rounded-sm"
            >
              <JourneyDiagram />
            </motion.div>

            {/* Milestone cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-px bg-[rgba(200,169,110,0.1)]">
              {[
                { num: '01', label: t('j01label'), place: 'Bangkok, Thailand', text: t('j01text') },
                { num: '02', label: t('j02label'), place: 'Sydney, 2018', text: t('j02text') },
                { num: '03', label: t('j03label'), place: 'Sydney, 2018–2019', text: t('j03text') },
                { num: '04', label: t('j04label'), place: 'UTS, 2020–2022', text: t('j04text') },
                { num: '05', label: t('j05label'), place: 'M.A.R.S, 2023–Present', text: t('j05text') },
                { num: '06', label: t('j06label'), place: 'Bangkok, Thailand', text: t('j06text') },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.1 }}
                  className="bg-[#0a0908] p-8"
                >
                  <span className="text-[9px] font-mono text-[rgba(200,169,110,0.35)] block mb-4 tracking-[0.4em]">{card.num}</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[rgba(200,169,110,0.6)] block mb-2">{card.label}</span>
                  <p className="text-sm font-display font-light text-[#c8a96e] mb-4 leading-tight">{card.place}</p>
                  <p className="text-[11px] text-[rgba(200,169,110,0.45)] font-light leading-relaxed">{card.text}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        <WorldMapSection />

        {/* Contact Section */}
        <section className="py-24 md:py-36 bg-[#fdfaf6] border-t border-stone-100">
          <div className="max-w-[1400px] mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Left */}
              <div>
                <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-stone-300 block mb-6">{t('contactSectionLabel')}</span>
                <h2 className="text-4xl md:text-6xl font-display font-light text-stone-800 mb-8 leading-tight">{t('contactSectionTitle')}</h2>
                <p className="text-sm text-stone-400 font-light leading-relaxed max-w-md mb-12">{t('contactSectionDesc')}</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 border border-stone-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-300 mb-1">{t('contactEmail')}</p>
                      <a href="mailto:sam@nissa.co.th" className="text-sm text-stone-700 hover:text-stone-900 transition-colors">sam@nissa.co.th</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 border border-stone-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-300 mb-1">{t('contactLocation')}</p>
                      <p className="text-sm text-stone-700">888/141 Moo 5 Ban Pet<br />Khon Kaen 40000, Thailand</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — QR + CTA */}
              <div className="flex flex-col items-center lg:items-end gap-8">
                <div className="bg-white border border-stone-100 p-8 shadow-sm flex flex-col items-center gap-4 w-full max-w-xs">
                  <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300">{t('contactLine')}</p>
                  <img src="/line-qr.jpeg" alt="LINE QR Code" className="w-40 h-40 object-contain" />
                  <p className="text-xs text-stone-400 font-light text-center">Scan to message on LINE</p>
                </div>
                <button
                  onClick={() => setInquiryOpen(true)}
                  className="w-full max-w-xs bg-stone-900 text-white py-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-stone-700 transition-colors duration-300"
                >
                  {t('startProject')}
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="py-20 bg-[#3d3a35] text-white border-t border-stone-700">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16 pb-16 border-b border-stone-700">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-display font-medium tracking-tight mb-6">SAM SAENPAO</h2>
              <p className="text-stone-400 max-w-sm leading-relaxed mb-8 font-light text-sm">
                {t('footerDesc')}
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500 mb-4">{t('followStudio')}</p>
              <div className="flex gap-5 text-stone-500">
                <a href="https://www.instagram.com/sammy_architecture" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
                <a href="https://www.linkedin.com/in/sam-saenpao-a58373250" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-500 mb-8">{t('navigate')}</h4>
              <ul className="space-y-4">
                {[
                  { label: t('navProjects'), href: '#projects' },
                  { label: t('navArticles'), href: '#articles' },
                  { label: t('navMakers'), href: '#makers' },
                  { label: t('navStudio'), href: '#about' },
                  { label: t('navJournal'), href: '#journal' },
                  { label: t('navContact'), href: '#contact' },
                ].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-xs text-stone-400 hover:text-white transition-colors font-light">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-500 mb-8">Contact</h4>
              <ul className="space-y-4 text-xs font-light text-stone-400">
                <li className="flex items-start gap-2"><MapPin className="w-3 h-3 mt-0.5 text-stone-600 flex-shrink-0" /><span>888/141 Moo 5 Ban Pet<br />Khon Kaen 40000</span></li>
                <li className="flex items-center gap-2"><Mail className="w-3 h-3 text-stone-600" /><button onClick={() => copyEmail('sam@nissa.co.th')} className="hover:text-white transition-colors text-left">sam@nissa.co.th</button></li>
                <li className="flex items-center gap-2"><Layers className="w-3 h-3 text-stone-600" /><a href="https://www.nissa.co.th/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">nissa.co.th</a></li>
                <li className="flex items-center gap-2"><Linkedin className="w-3 h-3 text-stone-600" /><a href="https://www.linkedin.com/in/sam-saenpao-a58373250" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">sam-saenpao</a></li>
                <li className="flex items-center gap-2"><Instagram className="w-3 h-3 text-stone-600" /><a href="https://www.instagram.com/sammy_architecture" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@sammy_architecture</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-stone-600">
            <p>© {new Date().getFullYear()} SAM SAENPAO. {t('allRightsReserved')}</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-stone-300 transition-colors">{t('privacy')}</a>
              <a href="#" className="hover:text-stone-300 transition-colors">{t('terms')}</a>
              <a href="#" className="hover:text-stone-300 transition-colors">{t('sitemap')}</a>
            </div>
          </div>
          <p className="mt-4 text-center text-[8px] font-mono text-stone-400 tracking-[0.2em]">v1.6.0.1</p>
        </div>
      </footer>
    </div>
    </LangContext.Provider>
  );
}
