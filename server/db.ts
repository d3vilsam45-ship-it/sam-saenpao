import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'portfolio.db');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    location TEXT,
    year TEXT,
    image TEXT,
    category TEXT,
    role TEXT,
    description TEXT,
    read_time TEXT,
    client TEXT,
    builder TEXT,
    area TEXT,
    design_team TEXT,
    photographer TEXT,
    gallery TEXT DEFAULT '[]',
    sort_order INTEGER DEFAULT 0,
    featured INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    image TEXT,
    category TEXT,
    date TEXT,
    read_time TEXT,
    featured INTEGER DEFAULT 0,
    gallery TEXT DEFAULT '[]',
    sort_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS makers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT,
    image TEXT,
    origin TEXT,
    description TEXT,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year TEXT,
    title TEXT,
    company TEXT,
    description TEXT,
    logo TEXT,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

function seedIfEmpty() {
  const projectCount = (db.prepare('SELECT COUNT(*) as c FROM projects').get() as { c: number }).c;
  if (projectCount > 0) return;

  const insertProject = db.prepare(`
    INSERT INTO projects (id, title, location, year, image, category, role, description, read_time, client, builder, area, design_team, photographer, gallery, sort_order)
    VALUES (@id, @title, @location, @year, @image, @category, @role, @description, @read_time, @client, @builder, @area, @design_team, @photographer, @gallery, @sort_order)
  `);

  const projects = [
    { id: 1, title: "Something by Grace II", location: "Botany Bay, NSW", year: "2023", image: "/photos/grace-ii/660ad8_f390d4e37655476096007a47d0eae7dc~mv2.jpg", category: "Interior", role: "Design Team Member", description: "A luxury beauty salon interior defined by warmth, tactility, and quiet refinement. Fluted white panels, warm brass accents, and soft terrazzo surfaces create an atmosphere of calm indulgence — a space designed to make every visitor feel unhurried.", read_time: "6 min read", client: "Something by Grace & Co Pty Ltd", builder: "DT Corporation Pty Ltd", area: "100 sqm", design_team: "Shaun Khai, Dario D'ongas, Chloe Lam, Brian Yung & Sam Saenpao", photographer: null, gallery: JSON.stringify(["/photos/grace-ii/660ad8_f390d4e37655476096007a47d0eae7dc~mv2.jpg","/photos/grace-ii/660ad8_b42890e0abb343a4992b1991319aadb1~mv2.jpg","/photos/grace-ii/660ad8_0193d037fcf244cda118265271e60a26~mv2.jpg","/photos/grace-ii/660ad8_6bcad393f26b4d46b90711ba6b3ac05b~mv2.jpg","/photos/grace-ii/660ad8_99c31a346caa453ba47019dcfdafdd0b~mv2.jpg","/photos/grace-ii/660ad8_7032265d2ebc44d78f56a982457430d1~mv2.jpg","/photos/grace-ii/660ad8_288f9785a85e4f94aa9dd8ff0f849bec~mv2.jpg","/photos/grace-ii/660ad8_eff3c0bea7a04ac8acd19315e97b145c~mv2.jpg","/photos/grace-ii/660ad8_834fc78f8ca3477484ec91633c128ce7~mv2.jpg","/photos/grace-ii/660ad8_20c44ba6a94c46f89543b3286fe384d0~mv2.jpg","/photos/grace-ii/660ad8_124041fabfc4462ebfa84c25890fbd24~mv2.jpg"]), sort_order: 1 },
    { id: 6, title: "Garden Cafe Kiosk", location: "Alexandria, NSW", year: "2023", image: "/photos/garden-cafe/660ad8_655a9f3ce81d4542b8ff04ba94b86820~mv2.jpg", category: "Food & Beverage", role: "Design Team Member", description: "A compact kiosk design for BYD Australia's Alexandria site — balancing high-throughput serviceability with a warm, garden-adjacent materiality. Every detail was resolved within a 50m² footprint without compromising on spatial quality.", read_time: "4 min read", client: "BYD Australia Pty Ltd", builder: "DT Corporation Pty Ltd", area: "50 sqm", design_team: "Carla D'Angelo, Shaun Khor, Theresa Helen, Brian Yung, Chloe Lam & Sam Saenpao", photographer: null, gallery: JSON.stringify(["/photos/garden-cafe/660ad8_04835a228ead4a51a6f4c2aceb3e5907~mv2.jpg","/photos/garden-cafe/660ad8_1c93c68b00bc4469bff049fd8dc44bbd~mv2.jpg","/photos/garden-cafe/660ad8_525fdf2bf26940f2a75f3b85303ed20c~mv2.jpg","/photos/garden-cafe/660ad8_61b81e99147141b280ceb192df3f5345~mv2.jpg","/photos/garden-cafe/660ad8_655a9f3ce81d4542b8ff04ba94b86820~mv2.jpg","/photos/garden-cafe/660ad8_f9726792bef4442b8613c64e37916427~mv2.jpg"]), sort_order: 2 },
    { id: 7, title: "Lylo Brisbane", location: "Fortitude Valley, QLD", year: "2023", image: "/photos/lylo/660ad8_d460304d689e4a40b5217c5628921e44~mv2.jpg", category: "Food & Beverage", role: "Design Team Member", description: "A rooftop bar and recreational area for EVT Limited in Fortitude Valley — a 250m² sky-level escape that layers casual hospitality with sweeping city views.", read_time: "5 min read", client: "EVT Limited", builder: "Urban Core Pty Ltd", area: "250 sqm", design_team: "Carla D'Angelo, Shaun Khor, Sam Saenpao, Clarita Rojas, Chloe Lam & Carson Kwong", photographer: null, gallery: JSON.stringify(["/photos/lylo/660ad8_03b493d6b2a543efa4cde2b00b78eb95~mv2.jpg","/photos/lylo/660ad8_0d7f031606854021bffc2d41d7b7c509~mv2.jpg","/photos/lylo/660ad8_417c13e9a60f415486bbb0e2a72e901a~mv2.jpg","/photos/lylo/660ad8_5977287bfd144225bc82033fd1b6f722~mv2.jpg","/photos/lylo/660ad8_d460304d689e4a40b5217c5628921e44~mv2.jpg","/photos/lylo/660ad8_d48631208cae4e8e9dc81b25c75a1a87~mv2.jpg","/photos/lylo/660ad8_da12e0d71faa48298f41d580d062e977~mv2.jpg","/photos/lylo/660ad8_ddbd8184786f40b6be31964ed0bfc4ec~mv2.jpg"]), sort_order: 3 },
    { id: 8, title: "Betta Home Living", location: "Seaford, SA", year: "2023", image: "/photos/betta-home/660ad8_8f18a55bbdea4efa81ad5ebcbbecc49a~mv2.jpg", category: "Retail", role: "Design Team Member", description: "A large-format home appliances and furniture retail environment spanning 1000m² in Seaford. The design prioritises intuitive customer flow and aspirational product presentation.", read_time: "5 min read", client: "Betta Home Living Pty Ltd", builder: "Betta Home Living Pty Ltd", area: "1000 sqm", design_team: "Carla D'Angelo, Shaun Khor, Chloe Lam, Carson Kwong, Clarita Rojas & Sam Saenpao", photographer: "Aaron Citti Photography", gallery: JSON.stringify(["/photos/betta-home/660ad8_8f18a55bbdea4efa81ad5ebcbbecc49a~mv2.jpg","/photos/betta-home/660ad8_2e5c94929efb406e81deb3cd9ee7742e~mv2.jpg","/photos/betta-home/660ad8_c3b44de2c3fc40659088327c3789c8d8~mv2.jpg","/photos/betta-home/660ad8_ebb9c495fea64934bf01e0d8b4502af1~mv2.jpg","/photos/betta-home/660ad8_c64cd1d942134032b7f3955b09549fd6~mv2.jpg","/photos/betta-home/660ad8_1ac66218658f4bfdbe0632f27aed408c~mv2.jpg","/photos/betta-home/660ad8_19c028017afe4c06bcb6b9aa3176edf2~mv2.jpg","/photos/betta-home/660ad8_5a56a94683754cbabe7dfc1c7bc1c03f~mv2.jpg","/photos/betta-home/660ad8_71ad66a4a3ca4b7586a7f88ee1297af1~mv2.jpg"]), sort_order: 4 },
    { id: 9, title: "K5 Furniture Sydney", location: "Surry Hills, NSW", year: "2023", image: "/photos/k5-furniture/660ad8_8b8840617ea14411aa1e9e67bb7a0449~mv2.jpg", category: "Retail", role: "Design Team Member", description: "A 250m² furniture showroom in Surry Hills designed to feel less like a store and more like a considered living environment.", read_time: "4 min read", client: "K5 Furniture Pty Ltd", builder: "Passion Living Pty Ltd", area: "250 sqm", design_team: "Chloe Lam, Sam Saenpao, Carla D'Angelo & Shaun Khor", photographer: null, gallery: JSON.stringify(["/photos/k5-furniture/660ad8_8b8840617ea14411aa1e9e67bb7a0449~mv2.jpg","/photos/k5-furniture/660ad8_3b5bca8cf9344854b5567cd5c40adba0~mv2.jpg","/photos/k5-furniture/660ad8_6e2da2d7cbe14eebb02ffc88a72c2e29~mv2.jpg","/photos/k5-furniture/660ad8_dfe249d382b94d7a9df0d4f8e516fd80~mv2.jpg","/photos/k5-furniture/660ad8_06f58efc1cce43cf926d016ae3d45922~mv2.jpg","/photos/k5-furniture/660ad8_f75b8fb05e2c49229c9a704bc0d77294~mv2.jpg","/photos/k5-furniture/660ad8_47dbe33dc25d40b2b4959ba3efc19e54~mv2.jpg","/photos/k5-furniture/660ad8_996c27079e8341e592b0784667b9bf1c~mv2.jpg"]), sort_order: 5 },
    { id: 10, title: "Field to Fork", location: "Paddington, NSW", year: "2023", image: "/photos/field-to-fork/660ad8_efc788e9926d4fc8b788d66908dffd4c~mv2.jpg", category: "Food & Beverage", role: "Design Team Member", description: "A butcher shop and commercial kitchen for Alamour in Paddington — 250m² where provenance and craft are expressed through every material decision.", read_time: "5 min read", client: "Alamour", builder: "Urban Core Pty Ltd", area: "250 sqm", design_team: "Sam Saenpao, Chloe Lam, Carla D'Angelo & Shaun Khor", photographer: null, gallery: JSON.stringify(["/photos/field-to-fork/660ad8_efc788e9926d4fc8b788d66908dffd4c~mv2.jpg","/photos/field-to-fork/660ad8_7aae0eacf7fe45718fd2ac819dfe861f~mv2.jpg","/photos/field-to-fork/660ad8_22372125b78e468191c3c011970f72cb~mv2.jpg","/photos/field-to-fork/660ad8_3b356c0754634f71ae642148f23f26f6~mv2.jpg","/photos/field-to-fork/660ad8_03ed02f3e1dc46a084bb8375aa9203e3~mv2.jpg","/photos/field-to-fork/660ad8_ab37ebbe6b8c4c488b35e99c8887bd02~mv2.jpg","/photos/field-to-fork/660ad8_0990011f65224013b49707f26d28a34e~mv2.jpg","/photos/field-to-fork/660ad8_af9067ae616c41a286573954a60595c0~mv2.jpg","/photos/field-to-fork/660ad8_61a50b4524ca42e19e171f453302fc68~mv2.jpg"]), sort_order: 6 },
    { id: 11, title: "Alamour", location: "Paddington, NSW", year: "2023", image: "/photos/alamour/660ad8_a6f9596a3cda48baa42a7ae9df202b38~mv2.jpg", category: "Retail", role: "Design Team Member", description: "A boutique gowns and accessories store in Paddington — 150m² of considered luxury where the architecture recedes to let the garments speak.", read_time: "4 min read", client: "Alamour", builder: "DT Corporation Pty Ltd", area: "150 sqm", design_team: "Carla D'Angelo, Chloe Lam, Clarita Rojas, Carson Kwong & Sam Saenpao", photographer: null, gallery: JSON.stringify(["/photos/alamour/660ad8_a6f9596a3cda48baa42a7ae9df202b38~mv2.jpg","/photos/alamour/660ad8_40395b4164e9416e8bc12e38aeb68f9a~mv2.jpg","/photos/alamour/660ad8_976a52b3cc1443c7bb888956010e4a19~mv2.jpg","/photos/alamour/660ad8_bf3ab1c1ff7d4028b38511bb645a94d3~mv2.jpg","/photos/alamour/660ad8_8358c18561314f2d8d8bd881e554cef2~mv2.jpg","/photos/alamour/660ad8_f703100c72504c348b5ec87e278c5be3~mv2.jpg","/photos/alamour/660ad8_bdcb1603c1dd441c80e10a0961352a4e~mv2.jpg","/photos/alamour/660ad8_500b4b9054004341be46520796e85384~mv2.jpg","/photos/alamour/660ad8_16846eadc80e45daa782b991323d9ee8~mv2.jpg"]), sort_order: 7 },
    { id: 12, title: "BYD Service Centre", location: "Mascot, NSW", year: "2023", image: "/photos/byd-service/660ad8_7839a370d3a446e8a0803c4f9f32d6c3~mv2.jpg", category: "Commercial", role: "Design Team Member", description: "A 6,500m² service centre for BYD Australia in Mascot — a large-scale commercial fitout balancing the operational demands of an automotive service environment with a clean, brand-forward spatial identity.", read_time: "5 min read", client: "BYD Australia Pty Ltd", builder: "DT Corporation Pty Ltd", area: "6,500 sqm", design_team: "Carla D'Angelo, Shaun Khor, Theresa Helen, Chloe Lam & Sam Saenpao", photographer: null, gallery: JSON.stringify(["/photos/byd-service/660ad8_7839a370d3a446e8a0803c4f9f32d6c3~mv2.jpg","/photos/byd-service/660ad8_d9c6acb19a5041d7853daa079e21fe3d~mv2.jpg","/photos/byd-service/660ad8_7fabfe3c73e74d37b94c18943591619b~mv2.jpg","/photos/byd-service/660ad8_a2b29df447b6467c8cf92b1069e17196~mv2.jpg","/photos/byd-service/660ad8_3ce9acce2eb84d9c89b88b2b05df8ab0~mv2.jpg","/photos/byd-service/660ad8_68debef6fe034d04a828d823da666241~mv2.jpg","/photos/byd-service/660ad8_fed239b18010406a8f15137686bd1102~mv2.jpg","/photos/byd-service/660ad8_bf4b9ce148b343258f0f873a466ebfe9~mv2.jpg","/photos/byd-service/660ad8_f3f1f45c762a4939a12a57f4e1c69cf6~mv2.jpg","/photos/byd-service/660ad8_3a33b91702cd43d397710ce42a54e1a3~mv2.jpg","/photos/byd-service/660ad8_250ede72696a4d938d9b2120155bd7bf~mv2.jpg"]), sort_order: 8 },
    { id: 13, title: "KII International College", location: "Surry Hills, NSW", year: "2023", image: "/photos/kii-college/660ad8_e9fe37bc42d74f0bb15afc7f23941fd6~mv2.jpg", category: "Commercial", role: "Design Team Member", description: "A 350m² college fitout for Kingsford International Institute in Surry Hills — an educational environment designed to inspire focus, collaboration, and a sense of place.", read_time: "4 min read", client: "Kingsford International Institute Pty Ltd", builder: null, area: "350 sqm", design_team: "Carla D'Angelo, Chloe Lam & Sam Saenpao", photographer: null, gallery: JSON.stringify(["/photos/kii-college/660ad8_e9fe37bc42d74f0bb15afc7f23941fd6~mv2.jpg","/photos/kii-college/660ad8_f4e5fa3dc31a46ce8ae9aa508aa92730~mv2.jpg","/photos/kii-college/660ad8_7a1c4fa2a9394395825099133c5800bf~mv2.jpg","/photos/kii-college/660ad8_11ceb6b7fa8043aab9de1566ebd13489~mv2.jpg","/photos/kii-college/660ad8_3118529e5d3e4510a5eb92c2da96ea28~mv2.jpg","/photos/kii-college/660ad8_f159d1cde07d4965b08affc82a6786fa~mv2.jpg","/photos/kii-college/660ad8_e60d731899e14034aa7c592707a5746f~mv2.jpg"]), sort_order: 9 },
    { id: 14, title: "BYD Megastore", location: "Mascot, NSW", year: "2023", image: "/photos/byd-megastore/660ad8_17028e80b0e14c16b2da8ea9473ce68c~mv2.jpg", category: "Commercial", role: "Design Team Member", description: "A flagship showroom and megastore for BYD Australia in Mascot — a large-format automotive retail environment designed to showcase the full BYD vehicle lineup with an emphasis on brand immersion.", read_time: "5 min read", client: "BYD Australia Pty Ltd", builder: "DT Corporation Pty Ltd", area: null, design_team: "Carla D'Angelo, Shaun Khor, Theresa Helen, Chloe Lam & Sam Saenpao", photographer: null, gallery: JSON.stringify(["/photos/byd-megastore/660ad8_17028e80b0e14c16b2da8ea9473ce68c~mv2.jpg","/photos/byd-megastore/660ad8_40c0d3b84f4941fb81e72393c688602d~mv2.jpg","/photos/byd-megastore/660ad8_50ddbaef47f64dda9da1d3621b51922c~mv2.jpg","/photos/byd-megastore/660ad8_7f874ca8c502419282c8e657ee97391a~mv2.jpg","/photos/byd-megastore/660ad8_970fde96b9df4e6a9205eaed37a21ca2~mv2.jpg","/photos/byd-megastore/660ad8_d6c243e117d3407d893c9350fd8fc199~mv2.jpg","/photos/byd-megastore/660ad8_da61aff8b018487894c4e3896c7e6355~mv2.jpg","/photos/byd-megastore/660ad8_e2209ef2648a416ca3ac72576d584adb~mv2.jpg","/photos/byd-megastore/660ad8_e4cd51a17ff34b2bbac828d3ec821483~mv2.jpg","/photos/byd-megastore/660ad8_fc6f26a7dcaf4a1983e5decb02c4d5f4~mv2.jpg","/photos/byd-megastore/660ad8_fdc92f63e0b8431f88f37aa807407535~mv2.jpg"]), sort_order: 10 },
    { id: 15, title: "BYD Cafe Kiosk", location: "Mascot, NSW", year: "2023", image: "/photos/byd-cafe-kiosk/garden_cafe_perspective_interior.png", category: "Food & Beverage", role: "Design Team Member", description: "A refined cafe kiosk concept for BYD Australia's Mascot precinct — an intimate, hospitality-forward space designed to complement the broader BYD showroom campus.", read_time: "3 min read", client: "BYD Australia Pty Ltd", builder: "DT Corporation Pty Ltd", area: null, design_team: "Carla D'Angelo, Shaun Khor, Theresa Helen, Brian Yung, Chloe Lam & Sam Saenpao", photographer: null, gallery: JSON.stringify(["/photos/byd-cafe-kiosk/garden_cafe_perspective_interior.png","/photos/byd-cafe-kiosk/garden_cafe_perspective_counter.png","/photos/byd-cafe-kiosk/garden_cafe_perspective_seating.png","/photos/byd-cafe-kiosk/garden_cafe_axo_view01.png","/photos/byd-cafe-kiosk/garden_cafe_axo_view02.png"]), sort_order: 11 },
  ];

  const insertMany = db.transaction((rows: typeof projects) => {
    for (const p of rows) insertProject.run(p);
  });
  insertMany(projects);

  const insertArticle = db.prepare(`
    INSERT INTO articles (id, title, excerpt, image, category, date, read_time, featured, gallery, sort_order)
    VALUES (@id, @title, @excerpt, @image, @category, @date, @read_time, @featured, @gallery, @sort_order)
  `);

  const articles = [
    { id: 13, title: "155 & 155A Stuart Street — Blakehurst", excerpt: "A dual-occupancy residential project in Blakehurst — two architecturally resolved dwellings designed for a tight suburban site.", image: "/photos/stuart-st-blakehurst/VIEW 01.jpg", category: "Current Project", date: "2023 — In Progress", read_time: "5 min read", featured: 1, gallery: JSON.stringify(["/photos/stuart-st-blakehurst/VIEW 01.jpg","/photos/stuart-st-blakehurst/VIEW 02.jpg","/photos/stuart-st-blakehurst/VIEW 03.jpg","/photos/stuart-st-blakehurst/GARAGE OPEN.jpg","/photos/stuart-st-blakehurst/GARAGE CLOSED.jpg","/photos/stuart-st-blakehurst/GARAGE OPEN_TIMBER.jpg","/photos/stuart-st-blakehurst/GARAGE CLOSED_TIMBER.jpg","/photos/stuart-st-blakehurst/AXO.jpg","/photos/stuart-st-blakehurst/stuart_overall_view01.png","/photos/stuart-st-blakehurst/stuart_overall_view02.png","/photos/stuart-st-blakehurst/stuart_overall_view03.png","/photos/stuart-st-blakehurst/stuart_axonometric_view.png"]), sort_order: 1 },
    { id: 12, title: "613–615 Pittwater Road — Dee Why", excerpt: "The largest project in the studio — a large-scale residential development on Pittwater Road, Dee Why. Spanning over 1,688 hours of design work.", image: "/photos/pittwater-rd-dee-why/building-a-option-1.jpg", category: "Current Project", date: "2023–2024", read_time: "8 min read", featured: 1, gallery: JSON.stringify(["/photos/pittwater-rd-dee-why/building-a-option-1.jpg","/photos/pittwater-rd-dee-why/building-a-option-2.jpg","/photos/pittwater-rd-dee-why/building-a-option-3.jpg","/photos/pittwater-rd-dee-why/building-a-option-4.jpg","/photos/pittwater-rd-dee-why/unit-ag04-view-01.jpg","/photos/pittwater-rd-dee-why/unit-ag04-view-02.jpg","/photos/pittwater-rd-dee-why/unit-ag04-view-03.jpg","/photos/pittwater-rd-dee-why/unit-ag04-view-04.jpg","/photos/pittwater-rd-dee-why/type-l-axo-01.png","/photos/pittwater-rd-dee-why/type-l-axo-02.png"]), sort_order: 2 },
    { id: 11, title: "27 Tyrwhitt Street — Maroubra", excerpt: "A residential architecture project in Maroubra — a considered street-facing home that negotiates a sloping site with clarity and restraint.", image: "/photos/tyrwhitt-maroubra/ext-01.png", category: "Current Project", date: "2024 — In Progress", read_time: "5 min read", featured: 1, gallery: JSON.stringify(["/photos/tyrwhitt-maroubra/ext-01.png","/photos/tyrwhitt-maroubra/ext-02.png","/photos/tyrwhitt-maroubra/ext-03.png"]), sort_order: 3 },
    { id: 10, title: "Macquarie Park — Mixed-Use Development", excerpt: "A mixed-use development study for Macquarie Park exploring building massing, height limits, and design options.", image: "/photos/macquarie-park/display-render-01.jpg", category: "Current Project", date: "2025 — In Progress", read_time: "5 min read", featured: 1, gallery: JSON.stringify(["/photos/macquarie-park/display-render-01.jpg","/photos/macquarie-park/display-render-02.jpg","/photos/macquarie-park/display-render-03.jpg","/photos/macquarie-park/height-diagram-01.jpg","/photos/macquarie-park/height-diagram-02.jpg","/photos/macquarie-park/height-diagram-03.jpg","/photos/macquarie-park/height-diagram-04.jpg"]), sort_order: 4 },
    { id: 4, title: "68 Harbour Street — Furama Darling Harbour: Lobby & Canteen", excerpt: "An ongoing hospitality transformation at the iconic Furama Hotel on Harbour Street — reimagining the lobby and canteen as a warm, layered welcome.", image: "/photos/furama-haymarket/furama-01.jpg", category: "Current Project", date: "2025 — In Progress", read_time: "5 min read", featured: 1, gallery: JSON.stringify(["/photos/furama-haymarket/furama-01.jpg","/photos/furama-haymarket/furama-02.jpg","/photos/furama-haymarket/furama-03.jpg","/photos/furama-haymarket/furama-04.jpg","/photos/furama-haymarket/furama-05.jpg","/photos/furama-haymarket/furama-06.jpg","/photos/furama-haymarket/furama-07.jpg"]), sort_order: 5 },
    { id: 5, title: "58 & 60 Belemba Avenue — Roselands", excerpt: "An ongoing residential transformation across two adjoining properties in Roselands — thoughtfully designed to balance privacy, connection, and the rhythms of everyday life.", image: "/photos/belemba-roselands/img-009.jpg", category: "Current Project", date: "2025 — In Progress", read_time: "5 min read", featured: 1, gallery: JSON.stringify(["/photos/belemba-roselands/img-009.jpg","/photos/belemba-roselands/img-018.jpg","/photos/belemba-roselands/img-027.jpg","/photos/belemba-roselands/img-029.jpg","/photos/belemba-roselands/img-031.jpg","/photos/belemba-roselands/img-033.jpg","/photos/belemba-roselands/img-040.jpg","/photos/belemba-roselands/img-047.jpg","/photos/belemba-roselands/img-054.jpg","/photos/belemba-roselands/img-061.jpg","/photos/belemba-roselands/img-067.jpg","/photos/belemba-roselands/img-073.jpg","/photos/belemba-roselands/img-079.jpg","/photos/belemba-roselands/img-085.jpg","/photos/belemba-roselands/img-091.jpg","/photos/belemba-roselands/img-094.jpg","/photos/belemba-roselands/img-097.jpg"]), sort_order: 6 },
    { id: 6, title: "K5 Monash Civic — Furniture & Interior Concept", excerpt: "An ongoing furniture and interior concept for the K5 Monash Civic fitout — curating a palette of considered pieces that balance civic function with warmth.", image: "/photos/k5-monash-civic/k5-monash-01.jpg", category: "Current Project", date: "2025 — In Progress", read_time: "4 min read", featured: 1, gallery: JSON.stringify(["/photos/k5-monash-civic/k5-monash-01.jpg","/photos/k5-monash-civic/k5-monash-02.jpg","/photos/k5-monash-civic/k5-monash-03.jpg","/photos/k5-monash-civic/k5-monash-04.jpg","/photos/k5-monash-civic/k5-monash-05.jpg","/photos/k5-monash-civic/k5-monash-06.jpg","/photos/k5-monash-civic/k5-monash-07.jpg","/photos/k5-monash-civic/k5-monash-08.jpg","/photos/k5-monash-civic/k5-monash-09.jpg","/photos/k5-monash-civic/k5-monash-10.jpg","/photos/k5-monash-civic/k5-monash-11.jpg","/photos/k5-monash-civic/k5-monash-12.jpg","/photos/k5-monash-civic/k5-monash-13.jpg","/photos/k5-monash-civic/k5-monash-14.jpg"]), sort_order: 7 },
    { id: 7, title: "1 Kirby Walk — Zetland", excerpt: "An ongoing concept design for the lobby and residential amenity spaces at 1 Kirby Walk, Zetland — exploring how warmth and materiality can be introduced into a large-scale residential development.", image: "/photos/kirby-walk-zetland/kirby-01.jpg", category: "Current Project", date: "2025 — In Progress", read_time: "5 min read", featured: 1, gallery: JSON.stringify(["/photos/kirby-walk-zetland/kirby-01.jpg","/photos/kirby-walk-zetland/kirby-02.jpg","/photos/kirby-walk-zetland/kirby-03.jpg","/photos/kirby-walk-zetland/kirby-04.jpg","/photos/kirby-walk-zetland/kirby-05.jpg","/photos/kirby-walk-zetland/kirby-06.jpg","/photos/kirby-walk-zetland/kirby-07.jpg","/photos/kirby-walk-zetland/kirby-08.jpg","/photos/kirby-walk-zetland/kirby-09.jpg","/photos/kirby-walk-zetland/kirby-10.jpg","/photos/kirby-walk-zetland/kirby-11.jpg","/photos/kirby-walk-zetland/kirby-12.jpg"]), sort_order: 8 },
    { id: 9, title: "1 West Street — North Sydney", excerpt: "A commercial office fitout in the heart of North Sydney — designed to foster collaboration and focus within a compact floor plate.", image: "/photos/west-st-north-sydney/Riedel_building_view1.jpg", category: "Current Project", date: "2024 — Completed", read_time: "3 min read", featured: 1, gallery: JSON.stringify(["/photos/west-st-north-sydney/Riedel_building_view1.jpg","/photos/west-st-north-sydney/Riedel_building_view2.jpg"]), sort_order: 9 },
    { id: 8, title: "12 Stuart Street — Wahroonga Residence", excerpt: "A warm residential interior for a Wahroonga family home — centred on a refined kitchen and dining space that balances everyday functionality with considered materiality.", image: "/photos/stuart-st-wahroonga/dining-view.png", category: "Current Project", date: "2023 — Completed", read_time: "4 min read", featured: 1, gallery: JSON.stringify(["/photos/stuart-st-wahroonga/dining-view.png","/photos/stuart-st-wahroonga/formal-dining.png","/photos/stuart-st-wahroonga/kitchen-view.png","/photos/stuart-st-wahroonga/kitchen-view2.png"]), sort_order: 10 },
  ];

  const insertManyArticles = db.transaction((rows: typeof articles) => {
    for (const a of rows) insertArticle.run(a);
  });
  insertManyArticles(articles);

  const insertMaker = db.prepare(`
    INSERT INTO makers (id, name, type, image, origin, description, sort_order)
    VALUES (@id, @name, @type, @image, @origin, @description, @sort_order)
  `);
  insertMaker.run({ id: 1, name: "Haiku Stone", type: "Material / Stone", image: "https://picsum.photos/seed/maker-stone/800/600", origin: "Sydney, NSW", description: "Locally quarried sandstone surfaces, handcut and finished for bespoke architectural applications.", sort_order: 1 });
  insertMaker.run({ id: 2, name: "Form & Flux", type: "Furniture / Objects", image: "https://picsum.photos/seed/maker-form/800/600", origin: "Melbourne, VIC", description: "Studio practice producing limited-edition furniture objects at the intersection of craft and industrial process.", sort_order: 2 });
  insertMaker.run({ id: 3, name: "Lumen Studio", type: "Lighting Design", image: "https://picsum.photos/seed/maker-lumen/800/600", origin: "Brisbane, QLD", description: "Handcrafted lighting that explores how form can shape the quality of light within architectural space.", sort_order: 3 });

  const insertExp = db.prepare(`
    INSERT INTO experience (year, title, company, description, logo, sort_order)
    VALUES (@year, @title, @company, @description, @logo, @sort_order)
  `);
  insertExp.run({ year: "Feb 2020 — Dec 2022", title: "Bachelor of Design in Architecture", company: "University of Technology Sydney, Australia", description: "Studied architecture with a focus on spatial design, technical documentation, and the relationship between built form and human experience.", logo: "/logos/uts.png", sort_order: 1 });
  insertExp.run({ year: "Jan 2023 — Feb 2023", title: "Architectural Intern", company: "M.A.R.S (Marcellino Sain Architects), Sydney, Australia", description: "Introductory placement developing foundational skills in architectural drawings, SketchUp modelling, and studio workflow.", logo: "/logos/mars.png", sort_order: 2 });
  insertExp.run({ year: "Feb 2023 — Present", title: "Architectural Drafter", company: "M.A.R.S (Marcellino Sain Architects), Sydney, Australia", description: "Full-time role producing architectural and construction drawings across a range of commercial, retail, and hospitality projects.", logo: "/logos/mars.png", sort_order: 3 });
  insertExp.run({ year: "2025 — Present", title: "Architectural Drafter", company: "Nissa Group, Khon Kaen, Thailand", description: "Senior role overseeing architectural and construction documentation while managing project coordination and team workflows.", logo: "/logos/nissa.png", sort_order: 4 });

  const setSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
  setSetting.run('hero_title', 'SAM SAENPAO');
  setSetting.run('hero_subtitle', 'Documenting architecture and design across Australia and beyond — where precision meets poetic vision.');
  setSetting.run('about_bio', 'Architectural drafter and designer based in Sydney, Australia. Eight years building a career across interior, retail, and commercial design.');
  setSetting.run('available', 'true');
  setSetting.run('site_title', 'Sam Saenpao — Architecture & Design');
  setSetting.run('meta_description', 'Portfolio of Sam Saenpao — architectural drafter and designer documenting projects across Australia.');
}

seedIfEmpty();

export default db;
