/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
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

interface Maker {
  id: number;
  name: string;
  type: string;
  image: string;
  origin: string;
  description: string;
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
    description: "A butcher shop and commercial kitchen for Alamour in Paddington — 250m² where provenance and craft are expressed through every material decision. Raw timber, honed stone, and exposed refrigeration create a space that is honest about the food it serves.",
    readTime: "5 min read",
    client: "Alamour",
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
];

const ARTICLES: Article[] = [
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
    id: 1,
    title: "Modern Homes Forecast 2025: The Return of the Organic Form",
    excerpt: "As the design industry looks ahead, organic shapes, natural materials, and biophilic principles are emerging as the defining language of contemporary residential architecture.",
    image: "https://picsum.photos/seed/article-forecast/1200/800",
    category: "Insights",
    date: "March 2025",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "The Architecture of Stillness",
    excerpt: "How a new generation of designers is embracing minimalism not as an aesthetic, but as a philosophy of restraint.",
    image: "https://picsum.photos/seed/article-stillness/1200/800",
    category: "Editorial",
    date: "February 2025",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Parametric Facades: Tools Shaping Tomorrow's Skylines",
    excerpt: "From Rhino to Grasshopper, a deep dive into the software workflows transforming architectural surfaces.",
    image: "https://picsum.photos/seed/article-parametric/1200/800",
    category: "Technology",
    date: "January 2025",
    readTime: "6 min read",
  },
];

const MAKERS: Maker[] = [
  {
    id: 1,
    name: "Haiku Stone",
    type: "Material / Stone",
    image: "https://picsum.photos/seed/maker-stone/800/600",
    origin: "Sydney, NSW",
    description: "Locally quarried sandstone surfaces, handcut and finished for bespoke architectural applications.",
  },
  {
    id: 2,
    name: "Form & Flux",
    type: "Furniture / Objects",
    image: "https://picsum.photos/seed/maker-form/800/600",
    origin: "Melbourne, VIC",
    description: "Studio practice producing limited-edition furniture objects at the intersection of craft and industrial process.",
  },
  {
    id: 3,
    name: "Lumen Studio",
    type: "Lighting Design",
    image: "https://picsum.photos/seed/maker-lumen/800/600",
    origin: "Brisbane, QLD",
    description: "Handcrafted lighting that explores how form can shape the quality of light within architectural space.",
  },
];

const MODEL_SLIDES = [
  // — Macquarie Park Tower (slides 01–20) —
  {
    image: "/photos/3d-process/slide-01.jpg",
    step: "01",
    title: "Massing Study — Front Elevation",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Front elevation of the proposed tower massing — establishing the vertical fin blade facade, the stepped podium base, and the distinctive looped crown element.",
  },
  {
    image: "/photos/3d-process/slide-02.jpg",
    step: "02",
    title: "Massing Study — Aerial Overview",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Aerial axonometric of the full tower showing the rooftop amenity deck, pool, and the planted crown pergola above the uppermost residential floor.",
  },
  {
    image: "/photos/3d-process/slide-03.jpg",
    step: "03",
    title: "Rooftop Crown — Close-up",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Close-up of the rooftop crown structure — the looped pergola frame, green planting, and the pool pavilion nestled within the amenity level.",
  },
  {
    image: "/photos/3d-process/slide-04.jpg",
    step: "04",
    title: "Massing Study — Aerial, Rear View",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Aerial view from the rear showing the tower's blade facade on the secondary elevation, ground-level landscape setbacks, and pool at podium level.",
  },
  {
    image: "/photos/3d-process/slide-05.jpg",
    step: "05",
    title: "Tower Elevation — Side View",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Side elevation study of the tower form with a simplified facade — testing massing proportions, floor-to-floor heights, and the podium-to-tower transition.",
  },
  {
    image: "/photos/3d-process/slide-06.jpg",
    step: "06",
    title: "Elevation — Mahogany Avenue",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Formal elevation facing Mahogany Avenue, showing the full height of the tower with vertical fin blades, glazed curtain wall, and landscaped podium base.",
  },
  {
    image: "/photos/3d-process/slide-07.jpg",
    step: "07",
    title: "Podium Entry — Street Perspective",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Street-level perspective of the podium lobby entry — showing the vertical fin canopy, cylindrical column feature, and the activated ground-floor facade.",
  },
  {
    image: "/photos/3d-process/slide-08.jpg",
    step: "08",
    title: "Podium Facade — Street View",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Street-level view of the podium facade from a second angle — capturing the blade fin rhythm, podium setback, and the landscape edge treatment.",
  },
  {
    image: "/photos/3d-process/slide-09.jpg",
    step: "09",
    title: "Podium Level — Aerial Close-up",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Aerial close-up looking down at the podium entry forecourt — showing the entry canopy, circular water feature, pool lanes, and surrounding landscape.",
  },
  {
    image: "/photos/3d-process/slide-10.jpg",
    step: "10",
    title: "Podium Pool — Aerial View",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Overhead aerial of the podium level showing the full pool extent, landscaped borders, and the relationship between the pool deck and the tower base.",
  },
  {
    image: "/photos/3d-process/slide-11.jpg",
    step: "11",
    title: "Podium Corner — Lower Floors",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Corner close-up of the podium and lower residential floors — studying the overhang, pool edge setback, and planted perimeter at ground level.",
  },
  {
    image: "/photos/3d-process/slide-12.jpg",
    step: "12",
    title: "Podium Pool Edge — Detail",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Detailed study of the podium pool edge — examining coping details, the pavilion column placement, and the blade fins framing the outdoor amenity space.",
  },
  {
    image: "/photos/3d-process/slide-13.jpg",
    step: "13",
    title: "Display Suite — SketchUp Model",
    tool: "SketchUp · Macquarie Park, Display Suite",
    description: "Early SketchUp massing model of the temporary display suite — a 2-storey sales pavilion used to market the tower to off-the-plan buyers on-site.",
  },
  {
    image: "/photos/3d-process/slide-14.jpg",
    step: "14",
    title: "Display Suite — Pavilion Interior",
    tool: "SketchUp · Macquarie Park, Display Suite",
    description: "Under-canopy perspective of the display suite pavilion — showing the open entry sequence, blade columns, and the glazed sales gallery beyond.",
  },
  {
    image: "/photos/3d-process/slide-15.jpg",
    step: "15",
    title: "Pool View 01",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Pool View 01 — street-level perspective of the ground-floor pool pavilion, showing the cylindrical column, pool coping, and surrounding landscaping.",
  },
  {
    image: "/photos/3d-process/slide-16.jpg",
    step: "16",
    title: "Pool View 02",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Pool View 02 — aerial perspective across the pool deck with the vertical fin facade visible above, framing the outdoor amenity space.",
  },
  {
    image: "/photos/3d-process/slide-17.jpg",
    step: "17",
    title: "Pool View 03",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Pool View 03 — eye-level view along the pool edge highlighting the column grid, overhead canopy beam, and the spa/plunge pool element.",
  },
  {
    image: "/photos/3d-process/slide-18.jpg",
    step: "18",
    title: "Pool View 04",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Pool View 04 — low-angle perspective along the pool length, with the tower's curved facade and louvred screen rising behind the water's edge.",
  },
  {
    image: "/photos/3d-process/slide-19.jpg",
    step: "19",
    title: "Pool View 05",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Pool View 05 — elevated aerial of the full pool deck showing the circular entry water feature, pool lanes, and the landscape buffer to the street.",
  },
  {
    image: "/photos/3d-process/slide-20.jpg",
    step: "20",
    title: "Pool View 06",
    tool: "SketchUp · Macquarie Park Tower",
    description: "Pool View 06 — overhead aerial of the pool and podium terrace, showing the full extent of the ground-floor amenity zone and planted setbacks.",
  },
  // — Macquarie Park Display Suite — Rendered Views (slides 21–23) —
  {
    image: "/photos/3d-process/slide-21.jpg",
    step: "21",
    title: "Display Suite — Street View",
    tool: "Lumion · Macquarie Park, Display Suite",
    description: "Photorealistic exterior render of the sales display suite — a 2-storey pavilion with timber screens, double-height glazing, and the 'one' project branding signage.",
  },
  {
    image: "/photos/3d-process/slide-22.jpg",
    step: "22",
    title: "Display Suite — View 02",
    tool: "Lumion · Macquarie Park, Display Suite",
    description: "Second exterior render of the display suite from a shifted street angle — capturing the canopy overhang, landscaped setback, and the tower marketing imagery on the facade.",
  },
  {
    image: "/photos/3d-process/slide-23.jpg",
    step: "23",
    title: "Display Suite — View 03",
    tool: "Lumion · Macquarie Park, Display Suite",
    description: "Wide exterior render of the display suite within its site context — showing the full building width, mature tree canopy, and the pedestrian arrival experience.",
  },
  // — 1 West Street, North Sydney — Riedel Showroom Fitout (slides 24–25) —
  {
    image: "/photos/3d-process/slide-24.jpg",
    step: "24",
    title: "Riedel Showroom — Front Elevation",
    tool: "SketchUp · 1 West Street, North Sydney",
    description: "Front elevation of the Riedel glassware showroom fitout — dark facade with red canopy signage band, full-height glazed shopfronts, and brand identity treatment.",
  },
  {
    image: "/photos/3d-process/slide-25.jpg",
    step: "25",
    title: "Riedel Showroom — Corner View",
    tool: "SketchUp · 1 West Street, North Sydney",
    description: "Corner perspective showing the Riedel, Spiegelau, and Nachtmann brand signage across both street-facing elevations, with the stepped gable entry canopy.",
  },
  // — 58 & 60 Belemba Avenue, Roselands (slides 26–37) —
  {
    image: "/photos/3d-process/slide-26.jpg",
    step: "26",
    title: "Exterior Model — Aerial Overview",
    tool: "SketchUp · 58 & 60 Belemba Avenue, Roselands",
    description: "Bird's-eye view of the dual-lot residential model, establishing site coverage, roof form, and the spatial relationship between both dwellings.",
  },
  {
    image: "/photos/3d-process/slide-27.jpg",
    step: "27",
    title: "Exterior Model — View 02",
    tool: "SketchUp · 58 & 60 Belemba Avenue, Roselands",
    description: "Exterior work-in-progress model exploring facade articulation, materiality, and the transition between the two adjoining properties.",
  },
  {
    image: "/photos/3d-process/slide-28.jpg",
    step: "28",
    title: "Exterior Model — View 03",
    tool: "SketchUp · 58 & 60 Belemba Avenue, Roselands",
    description: "Further exterior study refining roof pitches, window placement, and the landscaped edges that frame each dwelling.",
  },
  {
    image: "/photos/3d-process/slide-29.jpg",
    step: "29",
    title: "Exterior Model — View 04",
    tool: "SketchUp · 58 & 60 Belemba Avenue, Roselands",
    description: "Street-level perspective testing the facade composition, entry sequence, and visual privacy between the two residences.",
  },
  {
    image: "/photos/3d-process/slide-30.jpg",
    step: "30",
    title: "Exterior Model — View 05",
    tool: "SketchUp · 58 & 60 Belemba Avenue, Roselands",
    description: "Rear elevation study exploring outdoor living zones, setbacks, and the connection between interior spaces and the garden.",
  },
  {
    image: "/photos/3d-process/slide-31.jpg",
    step: "31",
    title: "Exterior Model — View 06",
    tool: "SketchUp · 58 & 60 Belemba Avenue, Roselands",
    description: "Final exterior model view consolidating all facade, roof, and landscape elements ahead of documentation.",
  },
  {
    image: "/photos/3d-process/slide-32.jpg",
    step: "32",
    title: "Interior Model — Living & Dining",
    tool: "SketchUp · Unit 01, Belemba Avenue",
    description: "Section perspective of the open-plan living, dining, and kitchen — testing spatial proportions, joinery layout, and the view to the rear garden.",
  },
  {
    image: "/photos/3d-process/slide-33.jpg",
    step: "33",
    title: "Interior Model — View 02",
    tool: "SketchUp · Unit 01, Belemba Avenue",
    description: "Interior study exploring the material palette — stone feature wall, timber joinery, and the quality of natural light through full-height glazing.",
  },
  {
    image: "/photos/3d-process/slide-34.jpg",
    step: "34",
    title: "Interior Model — View 03",
    tool: "SketchUp · Unit 01, Belemba Avenue",
    description: "Further interior development refining ceiling heights, lighting positions, and the spatial relationship between living zones.",
  },
  {
    image: "/photos/3d-process/slide-35.jpg",
    step: "35",
    title: "Interior Model — View 04",
    tool: "SketchUp · Unit 01, Belemba Avenue",
    description: "Kitchen and dining close-up study testing bench proportions, overhead cabinetry, and pendant lighting placement.",
  },
  {
    image: "/photos/3d-process/slide-36.jpg",
    step: "36",
    title: "Interior Model — View 05",
    tool: "SketchUp · Unit 01, Belemba Avenue",
    description: "Secondary living area study exploring furniture layout, storage integration, and the flow between internal and external spaces.",
  },
  {
    image: "/photos/3d-process/slide-37.jpg",
    step: "37",
    title: "Interior Model — View 06",
    tool: "SketchUp · Unit 01, Belemba Avenue",
    description: "Final interior model view with all finishes and furnishings resolved, ready for client presentation and construction documentation.",
  },
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
    title: "Architectural Drafter",
    company: "Nissa Group, Khon Kaen, Thailand",
    description: "Senior role overseeing architectural and construction documentation while managing project coordination and team workflows across a range of design projects.",
    logo: "/logos/nissa.png",
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Articles', href: '#articles' },
    { name: 'Makers', href: '#makers' },
    { name: 'Studio', href: '#about' },
    { name: 'Journal', href: '#journal' },
    { name: 'World', href: '#worldmap' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-white/95 backdrop-blur-xl py-4 shadow-sm border-b border-stone-100' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-8">
        {!isScrolled && (
          <div className="flex justify-center mb-4">
            <span className="text-[9px] uppercase tracking-[0.5em] text-white/60 font-bold">Architecture & Design — Sydney, Australia & Khon Kaen, Thailand</span>
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
          </div>

          <div className="flex items-center gap-4">
            <button className={`hidden lg:flex p-2 transition-colors ${isScrolled ? 'text-stone-400 hover:text-stone-900' : 'text-white/70 hover:text-white'}`}>
              <Search className="w-4 h-4" />
            </button>
            <a
              href="#contact"
              className={`hidden lg:flex items-center px-5 py-2 text-[9px] font-bold uppercase tracking-[0.3em] border transition-all duration-300 ${isScrolled ? 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white' : 'border-white/60 text-white hover:bg-white hover:text-stone-900'}`}
            >
              Subscribe
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Project Modal ---
const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
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
                <span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold mb-2 block">Role</span>
                <span className="text-xs text-stone-300 font-medium">{project.role}</span>
              </div>
              {project.client && (
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold mb-2 block">Client</span>
                  <span className="text-xs text-stone-300 font-medium">{project.client}</span>
                </div>
              )}
              {project.builder && (
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold mb-2 block">Builder</span>
                  <span className="text-xs text-stone-300 font-medium">{project.builder}</span>
                </div>
              )}
              {project.area && (
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold mb-2 block">Area</span>
                  <span className="text-xs text-stone-300 font-medium">{project.area}</span>
                </div>
              )}
              {project.designTeam && (
                <div className="col-span-2">
                  <span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold mb-2 block">Design Team</span>
                  <span className="text-xs text-stone-300 font-medium">{project.designTeam}</span>
                </div>
              )}
              {project.photographer && (
                <div className="col-span-2">
                  <span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold mb-2 block">Photography</span>
                  <span className="text-xs text-stone-300 font-medium">{project.photographer}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gallery grid */}
        <div>
          <h4 className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-600 mb-10">
            Project Gallery — {allImages.length} {allImages.length === 1 ? 'Image' : 'Images'}
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
const ProjectHeroCard = ({ project, onOpen }: { project: Project; onOpen: () => void }) => (
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
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/30 to-transparent" />
      {/* Top badges */}
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-[9px] font-bold uppercase tracking-[0.25em] text-white">
          {project.category}
        </span>
        <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-[9px] font-bold uppercase tracking-[0.25em] text-white/70">
          {project.year}
        </span>
      </div>
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-2xl">
        <div className="flex items-center gap-2 mb-4 text-[9px] font-mono text-white/50 uppercase tracking-widest">
          <MapPin className="w-3 h-3" /> {project.location}
        </div>
        <h3 className="text-4xl md:text-6xl font-display font-light text-white mb-5 leading-none tracking-tight">
          {project.title}
        </h3>
        <p className="text-sm text-white/70 font-light leading-relaxed mb-6 max-w-lg">
          {project.description}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-0.5">Role</span>
            <span className="text-xs text-white/80 font-medium">{project.role}</span>
          </div>
          {project.area && (
            <>
              <span className="text-white/20">|</span>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-0.5">Area</span>
                <span className="text-xs text-white/80 font-medium">{project.area}</span>
              </div>
            </>
          )}
          {project.client && (
            <>
              <span className="text-white/20">|</span>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-0.5">Client</span>
                <span className="text-xs text-white/80 font-medium">{project.client}</span>
              </div>
            </>
          )}
        </div>
      </div>
      {/* View cta */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 group-hover:text-white transition-colors duration-500">
        View Project <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  </motion.div>
);

// --- Grid Project Card (remaining items) ---
const ProjectItem = ({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 1.2, delay: (index % 2) * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
    className="group cursor-pointer flex flex-col"
    onClick={onOpen}
  >
    {/* Image with hover reveal */}
    <div className="aspect-[3/2] overflow-hidden bg-stone-100 soft-shadow relative rounded-xl">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
      {/* Category badge — always visible */}
      <div className="absolute top-5 left-5">
        <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[9px] font-bold uppercase tracking-[0.2em] text-stone-900">
          {project.category}
        </span>
      </div>
      {/* Dark gradient — fades in on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Slide-up content reveal */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
        <div className="flex items-center gap-1.5 mb-2 text-[9px] font-mono text-white/60 uppercase tracking-widest">
          <MapPin className="w-3 h-3" /> {project.location} · {project.year}
        </div>
        <h3 className="text-xl md:text-2xl font-display font-light text-white leading-tight mb-3">
          {project.title}
        </h3>
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
          View Project <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>

    {/* Below card — minimal */}
    <div className="pt-5 pb-2 border-t border-stone-200 mt-0 flex items-center justify-between">
      <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">{project.role}</span>
      <span className="text-[9px] font-mono text-stone-300 uppercase tracking-widest">{project.year}</span>
    </div>
  </motion.div>
);

// --- Maker Card ---
const MakerCard = ({ maker, delay = 0 }: { maker: Maker; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay }}
    className="group cursor-pointer"
  >
    <div className="aspect-[4/3] overflow-hidden bg-stone-100 mb-6 soft-shadow rounded-xl">
      <img
        src={maker.image}
        alt={maker.name}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
        referrerPolicy="no-referrer"
      />
    </div>
    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-stone-300 mb-3 block">{maker.type} · {maker.origin}</span>
    <h4 className="text-xl font-display font-light text-stone-800 mb-3 group-hover:text-stone-500 transition-colors">{maker.name}</h4>
    <p className="text-xs text-stone-400 font-light leading-relaxed">{maker.description}</p>
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
        <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-[rgba(200,169,110,0.4)] block mb-3">Global Footprint</span>
        <h2 className="text-3xl md:text-5xl font-display font-light text-[#e8dcc8]">Where I've Been</h2>
        <p className="text-xs text-[rgba(200,169,110,0.4)] mt-3 tracking-widest uppercase">Drag · Rotate · Zoom · Click any country</p>
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
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[rgba(200,169,110,0.6)]">Lived & Worked</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#4a7c6b' }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[rgba(200,169,110,0.6)]">Travelled</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#1a2540' }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[rgba(200,169,110,0.3)]">Rest of World</span>
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

// --- Main App ---
export default function App() {
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);



  return (
    <div className="min-h-screen font-sans selection:bg-[#f3e5d0] selection:text-[#3d3a35]">
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
                Featured Studio — Sydney, Australia
              </span>
              <h1 className="text-5xl md:text-8xl font-display font-light text-white leading-none tracking-tighter mb-6 golden-glow">
                SAM <br /><span className="italic">SAENPAO</span>
              </h1>
              <div className="h-px w-16 bg-white/40 mb-6" />
              <p className="text-base md:text-lg text-white/75 max-w-lg leading-relaxed font-light mb-10">
                Documenting architecture and design across Australia and beyond — where precision meets poetic vision.
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                <a
                  href="#projects"
                  className="flex items-center gap-3 px-8 py-4 bg-white text-stone-900 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-100 transition-colors"
                >
                  Explore Work <ArrowRight className="w-3 h-3" />
                </a>
                <a
                  href="#articles"
                  className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors"
                >
                  <BookOpen className="w-4 h-4" /> Read Articles
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-8 right-8 text-white/50 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[8px] uppercase tracking-[0.4em]">Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </section>

        {/* Publication strip */}
        <section className="py-5 bg-[#3d3a35]">
          <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold">Architecture & Design Publication</span>
            <div className="hidden md:flex items-center gap-6 text-[9px] uppercase tracking-[0.3em] text-stone-500 font-bold">
              <span>Projects</span><span>·</span>
              <span>Articles</span><span>·</span>
              <span>Makers</span><span>·</span>
              <span>Print Edition</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold">Vol. 01 · 2025</span>
          </div>
        </section>

        {/* Editorial Features — Carousel */}
        <section id="articles" className="py-24 md:py-36 bg-[#fdfaf6] overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex items-end justify-between mb-16 border-b border-stone-100 pb-8">
              <div>
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300 block mb-3">Editorial</span>
                <h2 className="text-3xl md:text-5xl font-display font-light text-stone-800">Latest Features</h2>
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
                {ARTICLES.map((article) => (
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
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-6 left-6">
                            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[9px] font-bold uppercase tracking-[0.2em] text-stone-900">
                              {article.category}
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
                          {article.title}
                        </h3>
                        <p className="text-sm text-stone-400 font-light leading-relaxed mb-8">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 group-hover:text-stone-900 transition-colors">
                          Read Feature <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-600 block mb-3">Behind the Work</span>
                <h2 className="text-3xl md:text-5xl font-display font-light text-stone-200">3D Modelling Process</h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setModelSlide((i) => Math.max(i - 1, 0))}
                  disabled={modelSlide === 0}
                  className="w-10 h-10 border border-stone-700 flex items-center justify-center text-stone-500 hover:border-stone-400 hover:text-stone-200 disabled:opacity-20 transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setModelSlide((i) => Math.min(i + 1, MODEL_SLIDES.length - 1))}
                  disabled={modelSlide === MODEL_SLIDES.length - 1}
                  className="w-10 h-10 border border-stone-700 flex items-center justify-center text-stone-500 hover:border-stone-400 hover:text-stone-200 disabled:opacity-20 transition-all duration-300"
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
                  className="w-full h-full object-cover"
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
                    Step {MODEL_SLIDES[modelSlide].step} · {MODEL_SLIDES[modelSlide].tool}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-light text-stone-100 mb-4 leading-tight">
                    {MODEL_SLIDES[modelSlide].title}
                  </h3>
                  <p className="text-sm text-stone-400 font-light max-w-lg leading-relaxed">
                    {MODEL_SLIDES[modelSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Click nav zones */}
            <button
              className="absolute left-0 top-0 h-full w-1/4 z-10"
              onClick={() => setModelSlide((i) => Math.max(i - 1, 0))}
            />
            <button
              className="absolute right-0 top-0 h-full w-1/4 z-10"
              onClick={() => setModelSlide((i) => Math.min(i + 1, MODEL_SLIDES.length - 1))}
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
              {MODEL_SLIDES.map((slide, i) => (
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
                    <span className="text-[8px] font-mono text-stone-400 uppercase tracking-widest leading-none block">{slide.step} — {slide.title}</span>
                  </div>
                </button>
              ))}
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
              <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/35 block mb-10">Who Am I</span>
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-display font-light text-white mb-10 leading-[1.05] tracking-tight">
                Sam <span className="italic">Saenpao</span>
              </h3>
              <div className="space-y-5 text-sm text-white/55 font-light leading-relaxed max-w-sm">
                <p>
                  I am an Architectural Designer and Drafter shaped by two worlds — the warmth and craft culture of Thailand, where I was born and raised, and the precision and professionalism of Sydney's architectural industry, where I spent eight formative years building my career.
                </p>
                <p>
                  Growing up in Thailand instilled in me an appreciation for material culture, human-scale environments, and the quiet poetry of everyday spaces. Moving to Australia at 19 pushed me to grow independently — working part-time, studying English, earning my degree at UTS, and eventually finding my professional footing at M.A.R.S Architects across a diverse range of commercial, retail, and hospitality projects.
                </p>
                <p>
                  That journey across cultures, cities, and disciplines is what defines how I approach design — with curiosity, adaptability, and a commitment to work that is both technically rigorous and deeply considered. I bring that breadth of experience to every project I take on.
                </p>
              </div>
              <a href="#about" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.35em] text-white/35 hover:text-white transition-colors mt-12">
                Full Studio Profile <ArrowRight className="w-3 h-3" />
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
            <div className="flex items-end justify-between mb-8 border-b border-stone-200 pb-8">
              <div>
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300 block mb-3">Featured Work</span>
                <h2 className="text-3xl md:text-5xl font-display font-light text-stone-800">Complete</h2>
              </div>
            </div>
          </div>
          {/* Sticky filter bar */}
          <div className="sticky top-14 z-40 bg-[#f9f6f2]/95 backdrop-blur-sm border-b border-stone-200">
            <div className="max-w-[1400px] mx-auto px-8 py-4 flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
              {['All', 'Interior', 'Retail', 'Food & Beverage', 'Commercial'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`transition-colors pb-0.5 ${activeFilter === cat ? 'text-stone-900 border-b border-stone-900' : 'hover:text-stone-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="max-w-[1400px] mx-auto px-8 mt-16">
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
              >
                View Full Archive
              </motion.button>
            </div>
          </div>
        </section>

        {/* Makers & Materials */}
        <section id="makers" className="py-24 md:py-36 bg-[#fdfaf6]">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex items-end justify-between mb-16 border-b border-stone-100 pb-8">
              <div>
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300 block mb-3">Marketplace</span>
                <h2 className="text-3xl md:text-5xl font-display font-light text-stone-800">Makers & Materials</h2>
              </div>
              <a href="#" className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-stone-900 transition-colors">
                View Marketplace <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {MAKERS.map((maker, i) => (
                <MakerCard key={maker.id} maker={maker} delay={i * 0.15} />
              ))}
            </div>
          </div>
        </section>

        {/* University */}
        <section id="university" className="py-24 md:py-36 bg-[#f9f6f2]">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex items-end justify-between mb-16 border-b border-stone-100 pb-8">
              <div>
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300 block mb-3">Academic Work</span>
                <h2 className="text-3xl md:text-5xl font-display font-light text-stone-800">University</h2>
              </div>
            </div>
            <UniversitySection />
          </div>
        </section>

        {/* Studio Profile — About */}
        <section id="about" className="py-24 md:py-36 bg-[#3d3a35] text-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
              <div className="lg:col-span-5">
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-500 block mb-8">Studio Profile</span>
                <h2 className="text-4xl md:text-6xl font-display font-light mb-10 tracking-tight leading-none">
                  Architectural <br />Designer & <br /><span className="italic">Drafter</span>
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
                  "I believe in an architecture that is as technically sound as it is emotionally resonant."
                </p>
                <p className="text-base text-stone-400 leading-relaxed font-light mb-8">
                  A UTS Architecture graduate with a passion for the technical intricacies of design.
                  With 8 years of experience in Sydney — studying at UTS and working at M.A.R.S (Marcellino Sain Architects) —
                  I've honed my skills in bridging the gap between conceptual sketches and construction-ready documentation.
                </p>
                <p className="text-sm text-stone-500 leading-relaxed font-light mb-16">
                  I thrive in the details—whether it's coordinating construction drawings or
                  refining the materiality of a facade. My goal is to grow into a versatile
                  architect who understands every layer of the building process.
                </p>

                <div className="grid grid-cols-2 gap-10 mb-16">
                  {[
                    { title: "Clarity in Drawings", desc: "Every plan communicates intent without ambiguity." },
                    { title: "3D Visualization", desc: "Rhino & SketchUp to test spatial qualities." },
                    { title: "BIM Coordination", desc: "Complex model coordination across disciplines." },
                    { title: "Environmental Design", desc: "Sustainable principles from concept to detail." },
                  ].map((skill) => (
                    <div key={skill.title}>
                      <h5 className="text-xs font-bold uppercase tracking-widest mb-3 text-stone-300">{skill.title}</h5>
                      <p className="text-xs text-stone-500 font-light leading-relaxed">{skill.desc}</p>
                    </div>
                  ))}
                </div>

                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-500 border-t border-stone-700 pt-12 mb-10">
                  Experience & Education
                </h4>
                <div className="space-y-10">
                  {EXPERIENCE.map((exp, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-6">
                      <div className="col-span-3">
                        <span className="text-[10px] font-mono text-stone-600">{exp.year}</span>
                      </div>
                      <div className="col-span-1 flex items-start pt-0.5">
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt=""
                            className="w-8 h-8 object-contain rounded"
                            onError={(e) => {
                              const el = e.currentTarget;
                              el.style.display = 'none';
                              if (el.nextElementSibling) (el.nextElementSibling as HTMLElement).style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className="w-8 h-8 rounded bg-stone-700 flex items-center justify-center text-[9px] font-bold text-stone-400 uppercase tracking-wide"
                          style={{ display: exp.logo ? 'none' : 'flex' }}
                        >
                          {exp.company.split(' ').slice(0, 2).map(w => w[0]).join('')}
                        </div>
                      </div>
                      <div className="col-span-8">
                        <h5 className="text-base font-display font-medium mb-1 text-stone-200">{exp.title}</h5>
                        <h6 className="text-xs text-stone-500 uppercase tracking-widest mb-2">{exp.company}</h6>
                        <p className="text-xs text-stone-600 font-light leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <motion.a
                    href="/cv.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 px-10 py-5 bg-[#fdfaf6] text-[#3d3a35] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                    Download CV
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Process */}
        <section id="process" className="py-24 md:py-36 bg-[#fdfaf6]">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="mb-20 text-center">
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-300 block mb-4">Methodology</span>
              <h2 className="text-3xl md:text-5xl font-display font-light text-stone-800">From Vision to Detail</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
              {PROCESS_STEPS.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.15 }}
                  className="p-10 border border-stone-100 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-500 group"
                >
                  <div className="text-stone-300 group-hover:text-white transition-colors duration-500 mb-8">
                    {step.icon}
                  </div>
                  <span className="text-[10px] font-mono text-stone-200 group-hover:text-stone-500 mb-4 block">0{idx + 1}</span>
                  <h4 className="text-lg font-display font-medium mb-4 text-stone-800 group-hover:text-white transition-colors">{step.title}</h4>
                  <p className="text-sm text-stone-400 font-light leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey */}
        <section id="journal" className="py-24 bg-[#0a0908]">
          <div className="max-w-[1400px] mx-auto px-8">

            {/* Header */}
            <div className="mb-14 border-b border-[rgba(200,169,110,0.15)] pb-8">
              <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-[rgba(200,169,110,0.45)] block mb-3">Personal Narrative</span>
              <div className="flex items-end justify-between">
                <h2 className="text-3xl md:text-5xl font-display font-light text-[#e8dcc8]">The Journey</h2>
                <span className="hidden md:block text-[10px] font-mono uppercase tracking-[0.35em] text-[rgba(200,169,110,0.4)]">Bangkok · Sydney · Bangkok</span>
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
                {
                  num: '01',
                  label: 'ORIGIN',
                  place: 'Bangkok, Thailand',
                  text: 'Born and raised in Thailand. Shaped by craft, curiosity, and an early love of building things.',
                },
                {
                  num: '02',
                  label: 'DEPARTURE',
                  place: 'Sydney, 2018',
                  text: 'Left home to pursue architectural education in Australia — a leap of intent and ambition.',
                },
                {
                  num: '03',
                  label: 'NEW CHAPTER',
                  place: 'Sydney, 2018–2019',
                  text: 'A year of beginnings — working part-time, absorbing a new city, studying English, and quietly searching for direction.',
                },
                {
                  num: '04',
                  label: 'EDUCATION',
                  place: 'UTS, 2020–2022',
                  text: 'Bachelor of Design in Architecture. Graduated with UTS Capstone Prize.',
                },
                {
                  num: '05',
                  label: 'CAREER',
                  place: 'M.A.R.S, 2023–Present',
                  text: 'From Intern to Architectural Drafter at Marcellino Sain Architects — honing technical precision across commercial projects.',
                },
                {
                  num: '06',
                  label: 'THE RETURN',
                  place: 'Bangkok, Thailand',
                  text: 'Bringing 8 years of study, studio practice, and life in Sydney — returning home with refined skills and a sharpened design sensibility.',
                },
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

        {/* Print Edition / Subscribe CTA */}
        <section className="py-24 bg-[#fdfaf6] border-t border-stone-100">
          <div className="max-w-[900px] mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-stone-300 block mb-6">Print Edition</span>
              <h2 className="text-4xl md:text-6xl font-display font-light text-stone-800 mb-8 leading-tight">
                The Annual Design <br /><span className="italic">Publication</span>
              </h2>
              <p className="text-sm text-stone-400 font-light leading-relaxed max-w-lg mx-auto mb-12">
                Three times a year, in-depth architectural stories, studio profiles, and design insights — curated and printed for those who look closer.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full sm:w-80 px-6 py-4 border border-stone-200 text-sm text-stone-600 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                />
                <button className="w-full sm:w-auto px-10 py-4 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-700 transition-colors whitespace-nowrap">
                  Subscribe Free
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
                Architectural Designer & Drafter based in Khon Kaen, Thailand.
                Available for freelance projects and collaborations.
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500 mb-4">Follow the Studio</p>
              <div className="flex gap-5 text-stone-500">
                <a href="https://www.instagram.com/sammy_architecture" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
                <a href="https://www.linkedin.com/in/sam-saenpao-a58373250" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-500 mb-8">Navigate</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Projects', href: '#projects' },
                  { label: 'Articles', href: '#articles' },
                  { label: 'Makers', href: '#makers' },
                  { label: 'Studio', href: '#about' },
                  { label: 'Journal', href: '#journal' },
                  { label: 'Contact', href: '#contact' },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-xs text-stone-400 hover:text-white transition-colors font-light">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-500 mb-8">Contact</h4>
              <ul className="space-y-4 text-xs font-light text-stone-400">
                <li className="flex items-start gap-2"><MapPin className="w-3 h-3 mt-0.5 text-stone-600 flex-shrink-0" /><span>888/141 Moo 5 Ban Pet<br />Khon Kaen 40000</span></li>
                <li className="flex items-center gap-2"><Mail className="w-3 h-3 text-stone-600" /><a href="mailto:sam.saenpao@outlook.com" className="hover:text-white transition-colors">sam.saenpao@outlook.com</a></li>
                <li className="flex items-center gap-2"><Linkedin className="w-3 h-3 text-stone-600" /><a href="https://www.linkedin.com/in/sam-saenpao-a58373250" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">sam-saenpao</a></li>
                <li className="flex items-center gap-2"><Instagram className="w-3 h-3 text-stone-600" /><a href="https://www.instagram.com/sammy_architecture" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@sammy_architecture</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-stone-600">
            <p>© {new Date().getFullYear()} SAM SAENPAO. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-stone-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-stone-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-stone-300 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
