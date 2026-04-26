// ─────────────────────────────────────────────
//  DATA LANDING PAGE — SIGMA
//  Semua data statis untuk halaman utama
// ─────────────────────────────────────────────

export const SITE_NAME = 'Sigma'
export const SITE_TAGLINE = 'Platform Kalkulus Interaktif'
export const SITE_DESC =
  'platform pembelajaran kalkulus berbasis teknologi yang membantu pengguna memahami konsep secara lebih mudah dan interaktif.'

// ── NAVBAR LINKS (anchor ke section di landing page) ─────────────────
export const NAV_LINKS = [
  { label: 'Tentang',        href: '#tentang' },
  { label: 'Fitur',          href: '#fitur' },
  { label: 'Tim Pengembang', href: '#tim' },
]

// ── MENU HAMBURGER (navigasi ke halaman lain) ────────────────────────
export const HAMBURGER_MENU = [
  { label: 'Home',         href: '/',         icon: 'home' },
  { label: 'Materi',       href: '/materi',   icon: 'book' },
  { label: 'Latihan Soal', href: '/latihan',  icon: 'pencil' },
  { label: 'Games',        href: '/games',    icon: 'gamepad' },
]

// ── FEATURES / FITUR ─────────────────────────────────────────────────
export const FEATURES = [
  {
    icon: '📖',
    title: 'Materi',
    slug: '/materi',
    color: '#3b82f6',      // blue-500
    colorLight: '#eff6ff', // blue-50
    desc:
      'Pelajari konsep kalkulus secara mendalam — dari limit hingga integral — dengan visualisasi interaktif, rumus lengkap, dan grafik yang bisa kamu ubah sendiri.',
    tags: ['Turunan', 'Integral', 'Limit', 'Barisan & Deret'],
  },
  {
    icon: '✏️',
    title: 'Latihan',
    slug: '/latihan',
    color: '#10b981',      // emerald-500
    colorLight: '#ecfdf5', // emerald-50
    desc:
      'Uji kemampuanmu dengan 10 soal per topik bergaya kuis interaktif. Salah? Tenang — ada pembahasan lengkap untuk setiap soal.',
    tags: ['10 Soal/Topik', 'Pembahasan', 'Pilihan Ganda', 'Progress Tracker'],
  },
  {
    icon: '⚔️',
    title: 'Game',
    slug: '/games',
    color: '#8b5cf6',      // violet-500
    colorLight: '#f5f3ff', // violet-50
    desc:
      'Tantang temanmu dalam Kalkulus Duel! Siapa yang lebih dulu menjawab benar, dialah pemenang ronde. Real-time dan seru!',
    tags: ['Multiplayer', 'Real-time', 'Duel 1v1', 'Live Score'],
  },
]

// ── TOPIK MATERI ─────────────────────────────────────────────────────
export const TOPICS = [
  { title: 'Limit',            symbol: 'lim',   desc: 'Fondasi dari kalkulus — memahami nilai pendekatan fungsi.' },
  { title: 'Turunan',          symbol: "f'(x)", desc: 'Laju perubahan fungsi terhadap variabelnya.' },
  { title: 'Integral',         symbol: '∫',     desc: 'Penjumlahan kontinu dan luas di bawah kurva.' },
  { title: 'Barisan & Deret',  symbol: 'Σ',     desc: 'Pola angka dan konvergensi deret tak hingga.' },
  { title: 'Turunan Parsial',  symbol: '∂',     desc: 'Turunan fungsi multivariabel terhadap satu variabel.' },
  { title: 'Aplikasi',         symbol: '📈',    desc: 'Penerapan kalkulus dalam kehidupan nyata & teknik.' },
]

// ── QUOTE ─────────────────────────────────────────────────────────────
export const QUOTE = {
  text: 'Kalkulus mengajarkan bahwa setiap perubahan memiliki makna dan pola. Tidak semua hal bisa dipahami secara instan, karena proses adalah bagian penting dari hasil. Seperti dalam hidup, memahami langkah demi langkah akan membawa kita pada jawaban yang lebih jelas.',
}

// ── HOW IT WORKS ──────────────────────────────────────────────────────
export const HOW_IT_WORKS = [
  {
    num: '01',
    title: 'Pilih Topik',
    desc: 'Pilih materi kalkulus yang ingin kamu pelajari — turunan, integral, limit, dan lainnya.',
  },
  {
    num: '02',
    title: 'Pelajari & Latihan',
    desc: 'Baca materi interaktif lengkap dengan visualisasi grafik, lalu uji pemahaman dengan soal latihan.',
  },
  {
    num: '03',
    title: 'Tantang Temanmu',
    desc: 'Sudah paham? Ajak temanmu duel kalkulus! Siapa yang paling cepat dan tepat?',
  },
]

// ── FOOTER ────────────────────────────────────────────────────────────
export const FOOTER = {
  desc: 'platform pembelajaran kalkulus interaktif berbasis teknologi yang tidak membuatmu bosan belajar.',
  year: new Date().getFullYear(),
}

// ── Team ──────────────────────────────────────────────────────────────────────
export interface TeamMember {
  id: number;
  name: string;
  nim: string;
  role: string;
  skills: string[];
  image: string;
}

export const teamData: TeamMember[] = [
  {
    id: 1,
    name: "Muhammad Azka Fakhri Fairuz",
    nim: "257006111019",
    role: "Lead Project",
    skills: ["Designer", "Full Stack Developer"],
    image: "/gift/plenger2.webp",
  },
  {
    id: 2,
    name: "Salma Fauziah",
    nim: "257006111020",
    role: "",
    skills: ["Designer", "Front-End Developer"],
    image: "/gift/plenger2.webp",
  },
  {
    id: 3,
    name: "Aulia Syakhira Raina Hakim",
    nim: "257006111021",
    role: "",
    skills: ["Designer", "Front-End Developer"],
    image: "/gift/plenger2.webp",
  },
  {
    id: 4,
    name: "Wildan Nurohim",
    nim: "257006111026",
    role: "",
    skills: ["Designer", "Front-End Developer"],
    image: "/gift/plenger2.webp",
  },
  {
    id: 5,
    name: "Zaki Khoirullah",
    nim: "257006111028",
    role: "",
    skills: ["Designer", "Front-End Developer"],
    image: "/gift/plenger2.webp",
  },
  {
    id: 6,
    name: "Natasya Ibnaty Salsabila",
    nim: "257006111033",
    role: "",
    skills: ["Designer", "Front-End Developer"],
    image: "/gift/plenger2.webp",
  },
];

// ── Feature Carousel ───────────────────────────────────────────────────────────
export interface Feature {
  id: number;
  label: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  video: string;
}

export const featuresData: Feature[] = [
  {
    id: 0,
    label: "Game",
    title: "Game",
    description:
      "SIGMA (Smart Interactive Graphing & Math Application) adalah platform pembelajaran matematika berbasis teknologi yang membantu pengguna memahami konsep secara lebih mudah dan interaktif.",
    cta: "lihat lebih lengkap",
    href: "/games",
    video: "/team/team-1.webp",
  },
  {
    id: 1,
    label: "Materi",
    title: "Materi",
    description:
      "Pelajari konsep kalkulus dari dasar hingga mahir. Setiap materi dilengkapi visualisasi interaktif, rumus yang bisa dieksplorasi, dan contoh soal yang membuat belajar terasa menyenangkan.",
    cta: "lihat lebih lengkap",
    href: "/materi",
    video: "/team/team-2.webp",
  },
  {
    id: 2,
    label: "Latihan",
    title: "Latihan",
    description:
      "Uji pemahamanmu dengan soal-soal latihan yang disertai pembahasan lengkap. Dapatkan feedback instan dan lacak perkembangan belajarmu dari waktu ke waktu.",
    cta: "lihat lebih lengkap",
    href: "/latihan",
    video: "/team/team-1.webp",
  },
];

// ── Materi Cards ───────────────────────────────────────────────────────────────
export interface MateriCard {
  id: number;
  symbol: string;
  title: string;
  description: string;
  color: string;
}

export const materiCardsData: MateriCard[] = [
  {
    id: 0,
    symbol: "f'(x)",
    title: "Turunan",
    description: "Laju perubahan fungsi terhadap variabelnya.",
    color: "text-indigo-500",
  },
  {
    id: 1,
    symbol: "f'(x)",
    title: "Turunan",
    description: "Laju perubahan fungsi terhadap variabelnya.",
    color: "text-indigo-500",
  },
];