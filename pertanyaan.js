const allQuestions = [
  {
    question: "Apa aplikasi favorit saat ini?",
    options: ["Tiktok", "Youtube", "Chrome", "Google"],
    correct: 0,
    explanation: "Tiktok adalah aplikasi populer saat ini.",
  },
  {
    question: "UU yang berbicara tentang penggunaan media sosial?",
    options: [
      "Undang-Undang Nomor 28 Tahun 2024 tentang Hak Cipta",
      "Undang-Undang Nomor 23 Tahun 2002 tentang Perlindungan Anak",
      "Undang-Undang Nomor 19 Tahun 2016 tentang Informasi dan Transaksi Elektronik",
      "Undang-Undang Nomor 13 Tahun 2003 tentang Ketenagakerjaan",
    ],
    correct: 2,
    explanation:
      "Undang-Undang Nomor 19 Tahun 2016 tentang Informasi dan Transaksi Elektronik adalah UU yang berbicara tentang media sosial.",
  },
  {
    question: "Apa dampak dari penggunaan Tiktok secara berlebihan?",
    options: [
      "Membuat kita menjadi pintar",
      "Membuat penurunan moral",
      "Menjadi seorang yang peduli",
      "Menjadi menarik",
    ],
    correct: 1,
    explanation:
      "Dampak dari penggunaan Tiktok secara berlebihan adalah penurunan moral.",
  },
  {
    question:
      "Berapa banyak hukuman yang akan diterima pelaku pelanggaran hukum akibat media sosial?",
    options: ["1-2 Tahun", "6-12 Tahun", "10-15 Tahun", "5-10 Tahun"],
    correct: 1,
    explanation:
      "Hukuman yang akan diterima pelaku pelanggaran hukum akibat media sosial adalah 6-12 Tahun.",
  },
  {
    question: "Siapa yang bertanggung jawab untuk pengembang siswa di sekolah?",
    options: ["Guru", "Orang tua", "Dokter", "Polisi"],
    correct: 0,
    explanation:
      "Yang bertanggung jawab untuk pengembang siswa di sekolah adalah guru.",
  },
  {
    question:
      "Program apa yang dapat mendukung kemajuan remaja akibat penggunaan Tiktok secara berlebihan?",
    options: ["SOSMED", "SOBAT", "AKRAB", "PARAS"],
    correct: 3,
    explanation:
      "Program yang dapat mendukung kemajuan remaja akibat penggunaan Tiktok secara berlebihan adalah PARAS.",
  },
  {
    question: "Pasal berapakah yang membahas tentang UU ITE?",
    options: [
      "Pasal 45 Ayat 1",
      "Pasal 27 Ayat 3",
      "Pasal 28 Ayat 2",
      "Pasal 29",
    ],
    correct: 0,
    explanation: "Pasal yang membahas UU ITE adalah Pasal 45 Ayat 1.",
  },
  {
    question: "Sistem pemerintahan di Indonesia?",
    options: ["Monarki", "Demokrasi", "Republik", "Presiden"],
    correct: 2,
    explanation: "Sistem pemerintahan di Indonesia adalah Republik.",
  },
  {
    question: "Apa yang membuat moral remaja sekarang menurun?",
    options: [
      "Keterampilan dalam mengolah media sosial",
      "Penggunaan Tiktok secara berlebihan",
      "Memposting poster 'Free Palestine'",
      "Kurangnya pendidikan karakter",
    ],
    correct: 1,
    explanation:
      "Penggunaan Tiktok secara berlebihan dapat menyebabkan penurunan moral remaja.",
  },
  {
    question: "Apa yang membuat aplikasi Tiktok banyak diminati remaja?",
    options: [
      "Karena aplikasi tersebut memiliki fitur dan jenis konten yang beragam",
      "Karena tren",
      "Karena banyak peminatnya",
      "Karena tidak membutuhkan kuota",
    ],
    correct: 0,
    explanation:
      "Fitur dan jenis konten yang beragam membuat Tiktok diminati remaja.",
  },
  {
    question:
      "Sebutkan fitur apa saja yang gemar digunakan para remaja di aplikasi Tiktok?",
    options: [
      "Fitur rekaman, filter, efek, dan live streaming",
      "Pengeditan",
      "Vidio",
      "Duet dan stitch",
    ],
    correct: 0,
    explanation:
      "Fitur yang sering digunakan remaja di Tiktok adalah rekaman, filter, efek, dan live streaming.",
  },
  {
    question:
      "Berikut dampak negatif penggunaan Tiktok yang berlebihan pada kesehatan remaja, kecuali:",
    options: [
      "Mengganggu waktu belajar dan waktu tidur",
      "Pengaruh negatif pada tingkat fokus dan pola pikir",
      "Memiliki wawasan yang luas",
      "Mengalami kecemasan berlebih",
    ],
    correct: 2,
    explanation:
      "Memiliki wawasan yang luas bukan dampak negatif penggunaan Tiktok berlebihan.",
  },
  {
    question: "Apa dampak negatif AI pada dunia pendidikan?",
    options: [
      "Membuat pekerjaan menjadi lebih mudah",
      "Ketergantungan kepada AI sehingga membuat para remaja malas membaca dan hanya meng-copypaste jawaban yang ada",
      "Adanya AI lebih memperlihatkan maksud dari 'zaman modern' yang serba canggih dan kemajuan teknologi",
      "Membantu guru menyusun materi",
    ],
    correct: 1,
    explanation:
      "Ketergantungan pada AI membuat siswa cenderung malas dan hanya menyalin jawaban.",
  },
  {
    question: "Apa dampak dari cyberbullying?",
    options: [
      "Memiliki risiko depresi yang tinggi",
      "Menjadi pribadi yang kuat",
      "Meningkatkan ketahanan mental",
      "Menjadi lebih terkenal",
    ],
    correct: 0,
    explanation: "Cyberbullying dapat menyebabkan risiko depresi yang tinggi.",
  },
  {
    question:
      "Mengapa anak berusia kurang dari 10 tahun tidak diperbolehkan mengakses media sosial?",
    options: [
      "Karena belum memiliki kemampuan untuk memahami konten yang tidak sesuai usia",
      "Karena takut lebih populer dari orang tuanya",
      "Karena memiliki kecerdasan di atas rata-rata",
      "Karena harus fokus belajar dan bermain",
    ],
    correct: 0,
    explanation:
      "Anak usia <10 tahun belum mampu menyaring konten yang tidak sesuai usia.",
  },
  {
    question: "Apa saja peluang bisnis yang populer di era digital?",
    options: [
      "Influencer dan content creator",
      "Gamers",
      "Comedian",
      "Dropshipper dan affiliate marketing",
    ],
    correct: 0,
    explanation:
      "Influencer dan content creator adalah bisnis populer di era digital.",
  },
  {
    question: "Apa itu media sosial?",
    options: [
      "Alat komunikasi tradisional",
      "Hanya untuk bisnis",
      "Platform untuk berbagi informasi",
      "Surat kabar digital",
    ],
    correct: 2,
    explanation: "Media sosial adalah platform untuk berbagi informasi.",
  },
  {
    question: "Apa tujuan utama dari media sosial?",
    options: [
      "Berkomunikasi dan berbagi informasi",
      "Menghabiskan waktu",
      "Hiburan",
      "Menjual barang",
    ],
    correct: 0,
    explanation:
      "Tujuan utama media sosial adalah berkomunikasi dan berbagi informasi.",
  },
  {
    question: "Apa yang dimaksud 'viral' di media sosial?",
    options: [
      "Konten yang tidak menarik",
      "Konten yang dibagikan secara luas",
      "Konten yang berbayar",
      "Konten lawas yang diangkat kembali",
    ],
    correct: 1,
    explanation: "'Viral' berarti konten yang tersebar luas dengan cepat.",
  },
  {
    question: "Apa yang dimaksud dengan 'influencer'?",
    options: [
      "Seseorang yang memiliki pengaruh di media sosial",
      "Seorang jurnalis",
      "Seorang pengiklan",
      "Pemilik perusahaan media",
    ],
    correct: 0,
    explanation:
      "Influencer adalah orang yang memiliki pengaruh di media sosial.",
  },
];
