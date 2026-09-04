/* ════════════════════════════════════════
   script.js  –  Lacheee Website
   ════════════════════════════════════════ */

// ─────────────────────────────────────────────
// DATA ALAT LABORATORIUM KIMIA
// ─────────────────────────────────────────────
const ALAT = [

  // ══ ALAT GELAS ══
  {
    id: 1,
    nama: "Gelas Ukur",
    kat: "gelas",
    icon:"./foto/gelas-ukur.png",
    sketchfab: "https://sketchfab.com/models/9a824c1e1d5b4d789464bef36d26f3bc/embed",
    desc: "Tabung kaca berskala berbentuk silinder ramping yang digunakan untuk mengukur volume larutan. Tersedia berbagai ukuran mulai dari 10 mL hingga 2.000 mL. Meski tidak sepresisi labu ukur, gelas ukur adalah andalan laboratorium untuk pengukuran volume rutin yang cepat dan praktis.",
    fungsi: [
      "Mengukur volume cairan",
      "Menyiapkan larutan dalam jumlah tertentu"
    ]
  },
  {
    id: 2,
    nama: "Gelas Kimia (Beaker)",
    kat: "gelas",
    icon: "./foto/gelas-kimia.png",
    sketchfab: "https://sketchfab.com/models/c1560b532f1d4f9f808f4963d6c877c8/embed",
    desc: "Gelas silinder pendek berdinding tebal dengan bibir menuang (paruh) di bagian atas. Tersedia dari ukuran 50 mL hingga beberapa liter. Bentuknya yang lebar memudahkan pengadukan dan pemanasan, menjadikannya salah satu alat paling serbaguna di laboratorium kimia.",
    fungsi: [
      "Memanaskan larutan",
      "Mencampur bahan kimia",
      "Menampung cairan sementara"
    ]
  },
  {
    id: 3,
    nama: "Pipet",
    kat: "gelas",
    icon: "./foto/pipet.png",
    sketchfab: "https://sketchfab.com/models/b3b91e6c8316402a8db2f73164cfc6df/embed",
    desc: "Alat kaca berbentuk tabung tipis panjang yang dirancang khusus untuk memindahkan cairan dalam volume kecil dengan kendali penuh. Terdapat tiga jenisnya: pipet tetes (untuk meneteskan reagen), pipet volume (volume tepat satu titik), dan pipet ukur (berskala banyak untuk volume bervariasi).",
    fungsi: [
      "Memindahkan volume kecil larutan",
      "Titrasi (pipet volume)",
      "Meneteskan reagen (pipet tetes)"
    ]
  },
  {
    id: 4,
    nama: "Tabung Reaksi",
    kat: "gelas",
    icon: "./foto/tabung-reaksi.png",
    sketchfab: "https://sketchfab.com/models/5267ea89d50b4cb4a14b6520e639af1a/embed",
    desc: "Tabung kaca silinder kecil berujung membulat yang menjadi 'arena' percobaan kimia skala mini. Terbuat dari kaca borosilikat tahan panas sehingga aman dipanaskan langsung. Ukurannya yang kecil menghemat bahan kimia, dan bentuknya yang transparan memudahkan pengamatan perubahan warna, endapan, maupun gelembung gas.",
    fungsi: [
      "Melakukan reaksi kimia skala kecil",
      "Memanaskan bahan kimia dalam jumlah sedikit"
    ]
  },
  {
    id: 5,
    nama: "Labu Erlenmeyer",
    kat: "gelas",
    icon: "./foto/labu-erlenmeyer.png",
    sketchfab: "https://sketchfab.com/models/b38e5b30eeef43a99b17c724a5d5b12f/embed",
    desc: "Labu ikonik berbentuk kerucut terpancung dengan leher sempit, diciptakan oleh kimiawan Jerman Emil Erlenmeyer pada 1861. Bentuk dasarnya yang lebar menjaga stabilitas saat di meja, sementara leher sempitnya meminimalkan penguapan dan percikan saat diaduk. Pilihan utama untuk titrasi karena mudah digoyang tanpa tumpah.",
    fungsi: [
      "Titrasi",
      "Memanaskan larutan",
      "Menyimpan reagen sementara"
    ]
  },
  {
    id: 6,
    nama: "Kaca Arloji",
    kat: "gelas",
    icon: "./foto/kaca-arloji.png",
    youtube: "https://www.youtube.com/embed/a2Evz5NOMow?autoplay=1&mute=1&start=15&end=56",
    desc: "Kepingan kaca tipis cekung berbentuk bundar menyerupai kaca jam tangan, itulah asal usul namanya! Meski tampak sederhana, kaca arloji sangat multifungsi: bisa jadi alas timbang padatan di neraca, penutup gelas kimia saat memanaskan, hingga tempat penguapan larutan dalam jumlah kecil.",
    fungsi: [
      "Menimbang padatan di neraca",
      "Menutup gelas kimia saat memanaskan",
      "Tempat penguapan larutan encer"
    ]
  },
  {
    id: 7,
    nama: "Buret",
    kat: "gelas",
    icon: "./foto/buret.png",
    sketchfab: "https://sketchfab.com/models/af289afdde494d7d94a4b16cb0eae27b/embed",
    desc: "Tabung kaca berskala panjang (biasanya 50 mL) dengan keran presisi di ujung bawahnya. Buret adalah bintang utama dalam titrasi karena kerannya memungkinkan pengeluaran larutan titran setetes demi setetes dengan kontrol penuh, sehingga titik ekuivalen dapat ditentukan seakurat mungkin. Ketelitiannya bisa mencapai ±0,05 mL.",
    fungsi: [
      "Mengukur volume larutan titran secara akurat",
      "Titrasi asam-basa, redoks, dan kompleksometri"
    ]
  },
  {
    id: 8,
    nama: "Labu Ukur",
    kat: "gelas",
    icon: "./foto/labu-ukur.png",
    sketchfab: "https://sketchfab.com/models/e7349e27d83c4a01b9118ebfecf68b0c/embed",
    desc: "Labu beleher panjang dan ramping dengan satu tanda batas volume yang sangat tepat di bagian lehernya. Dibuat dari kaca borosilikat berkualitas tinggi dan dikalibrasi secara akurat di pabrik. Jika kamu perlu membuat larutan 0,1 M NaCl tepat 250 mL, inilah alat yang tidak bisa digantikan.",
    fungsi: [
      "Membuat larutan standar dengan volume tepat",
      "Pengenceran larutan pekat"
    ]
  },
  {
    id: 9,
    nama: "Corong Pisah",
    kat: "gelas",
    icon: "./foto/corong-pisah.png",
    youtube: "https://www.youtube.com/embed/r1MVwXL4bqg?autoplay=1&mute=1&start=12&end=147",
    desc: "Wadah kaca berbentuk buah pir dengan keran di bawahnya, dirancang untuk memisahkan dua cairan yang tidak saling bercampur (seperti air dan minyak). Teknik ini disebut ekstraksi cair-cair: setelah dikocok dan didiamkan, kedua fase terpisah, dan keran memungkinkan pemisahan yang bersih dan presisi.",
    fungsi: [
      "Ekstraksi pelarut (liquid-liquid)",
      "Memisahkan dua fase cairan yang tidak bercampur"
    ]
  },
  {
    id: 10,
    nama: "Batang Pengaduk",
    kat: "gelas",
    icon: "./foto/batang-pengaduk.png",
    youtube: "https://www.youtube.com/embed/-BAVF7Nvrmo?autoplay=1&mute=1&start=15&end=100",
    desc: "Batang kaca panjang berbentuk silinder ramping yang digunakan untuk mengaduk larutan atau campuran kimia secara manual. Terbuat dari kaca borosilikat yang tahan panas dan tidak reaktif terhadap sebagian besar bahan kimia. Ujungnya biasanya tumpul dan halus agar tidak merusak wadah kaca saat digunakan.",
    fungsi: [
      "Mengaduk larutan atau campuran kimia",
      "Membantu melarutkan padatan ke dalam pelarut",
      "Memindahkan cairan dengan cara menuang menggunakan bantuan batang"
    ]
  },
  {
    id: 11,
    nama: "Desikator",
    kat: "gelas",
    icon: "./foto/desikator.png",
    sketchfab: "https://sketchfab.com/models/817cd3321e6e436b842e7e152dfe689b/embed",
    desc: "Wadah kaca atau plastik tebal berbentuk silinder tertutup rapat yang di dalamnya terdapat bahan pengering (desikan) seperti silika gel atau kalsium klorida. Desikator menciptakan lingkungan bebas kelembapan di dalamnya, ideal untuk mendinginkan padatan panas setelah dari oven tanpa menyerap uap air dari udara.",
    fungsi: [
      "Mengeringkan dan mendinginkan bahan",
      "Menyimpan bahan sensitif kelembapan"
    ]
  },

  // ══ ALAT UKUR ══
  {
    id: 12,
    nama: "Neraca Analitik",
    kat: "ukur",
    icon: "./foto/neraca-analitik.png",
    youtube: "https://www.youtube.com/embed/ssBvgpDmRso?autoplay=1&mute=1&start=35&end=220",
    desc: "Timbangan presisi tinggi dalam lemari kaca pelindung yang mampu menimbang massa hingga empat angka desimal (0,0001 gram alias 0,1 miligram!). Lemari pelindungnya bukan sekadar aksesori, ia menghalangi angin mikro dan getaran yang bisa mengacaukan pembacaan. Neraca analitik adalah jantung dari pembuatan larutan standar.",
    fungsi: [
      "Menimbang bahan kimia dengan sangat akurat",
      "Membuat larutan standar"
    ]
  },
  {
    id: 13,
    nama: "Termometer",
    kat: "ukur",
    icon: "./foto/termometer.png",
    sketchfab: "https://sketchfab.com/models/ad8506a2c12144158e7ecb4eb037e376/embed",
    desc: "Alat pengukur suhu yang memanfaatkan pemuaian raksa atau alkohol dalam tabung kapiler untuk membaca temperatur. Di lab kimia, termometer hadir dalam rentang yang luas (dari −10 °C hingga 360 °C) dan kini banyak digantikan sensor digital yang lebih aman. Perubahan suhu sering menjadi tanda pertama reaksi kimia berlangsung.",
    fungsi: [
      "Mengukur suhu larutan dan campuran",
      "Memantau perubahan suhu selama reaksi"
    ]
  },
  {
    id: 14,
    nama: "pH Meter",
    kat: "ukur",
    icon: "./foto/pH-meter.png",
    sketchfab: "https://sketchfab.com/models/99d5d2372d4c45ce9a0b8604e4b8f38b/embed",
    desc: "Instrumen elektronik dengan elektroda gelas sensitif yang mendeteksi aktivitas ion H⁺ dalam larutan dan menampilkan nilai pH secara digital. Jauh lebih akurat dari kertas lakmus atau indikator warna, pH meter bisa membaca hingga dua angka desimal. Wajib dikalibrasi dengan larutan buffer standar sebelum digunakan.",
    fungsi: [
      "Mengukur pH larutan secara akurat",
      "Menentukan sifat asam atau basa suatu larutan"
    ]
  },
  {
    id: 15,
    nama: "Spektrofotometer",
    kat: "ukur",
    icon: "./foto/spektrofotometer.png",
    sketchfab: "https://sketchfab.com/models/4f280b451be843138255c3c9874f444d/embed",
    desc: "Instrumen analitik canggih yang memancarkan cahaya pada panjang gelombang tertentu ke dalam larutan, lalu mengukur seberapa banyak cahaya yang terserap. Berdasarkan Hukum Lambert-Beer, serapan berbanding lurus dengan konsentrasi, sehingga alat ini bisa menentukan konsentrasi larutan berwarna dengan sangat teliti tanpa reaksi kimia destruktif.",
    fungsi: [
      "Mengukur konsentrasi larutan berwarna",
      "Analisis kualitatif dan kuantitatif senyawa kimia"
    ]
  },
  {
    id: 16,
    nama: "Pipet Tetes",
    kat: "ukur",
    icon: "./foto/pipet-tetes.png",
    sketchfab: "https://sketchfab.com/models/48053cf00f5949458d211c3028a790e6/embed",
    desc: "Pipet mungil berujung karet yang menjadi sahabat setia di laboratorium untuk menangani cairan dalam jumlah sangat kecil (hitungannya per tetes)! Satu tetes setara dengan sekitar 0,05 mL. Meski tampak sederhana, pipet tetes sangat penting saat menambahkan indikator, reagen pengujian, atau menetralkan larutan setetes demi setetes.",
    fungsi: [
      "Memindahkan cairan tetes demi tetes",
      "Menambahkan reagen dalam jumlah sangat sedikit"
    ]
  },
  {
    id: 17,
    nama: "Pipet Volume",
    kat: "ukur",
    icon: "./foto/pipet-volume.png",
    youtube: "https://www.youtube.com/embed/Q_s-FH8BP_E?autoplay=1&mute=1&start=13&end=147",
    desc: "Pipet kaca berjentik dengan satu tanda batas kalibrasi (biasanya 5, 10, 25, atau 50 mL) yang menjamin pemindahan volume secara sangat tepat. Dikombinasikan dengan bulb (bola hisap) karet, pipet volume adalah alat wajib ketika kamu perlu mengambil volume larutan yang benar-benar presisi untuk titrasi atau pembuatan larutan standar.",
    fungsi: [
      "Memindahkan volume larutan yang akurat",
      "Persiapan larutan untuk titrasi"
    ]
  },
  {
    id: 18,
    nama: "Pipet Ukur",
    kat: "ukur",
    icon: "./foto/pipet-ukur.png",
    youtube: "https://www.youtube.com/embed/RSe6KZLpm6s?autoplay=1&mute=1&start=7&end=400",
    desc: "Pipet kaca berskala banyak yang menawarkan fleksibilitas lebih dibanding pipet volume (satu alat dapat mengukur berbagai volume sesuai kebutuhan). Skala graduasinya memungkinkan pengambilan volume berapa pun dalam rentangnya, misalnya 1,5 mL atau 7,3 mL, kemampuan yang tidak dimiliki pipet volume.",
    fungsi: [
      "Mengukur berbagai volume cairan",
      "Lebih fleksibel dibanding pipet volume"
    ]
  },

  // ══ ALAT PEMANAS ══
  {
    id: 19,
    nama: "Pembakar Bunsen",
    kat: "pemanas",
    icon: "./foto/bunsen.png",
    sketchfab: "https://sketchfab.com/models/45330536365b4471839fb45127fd0844/embed",
    desc: "Pembakar gas ikonik yang menghasilkan nyala api terbuka dan terkendali yang diciptakan oleh Robert Bunsen pada 1857 dan masih menjadi standar laboratorium hingga hari ini! Celah udara di bagian bawahnya bisa diatur untuk menghasilkan nyala biru (panas, ~1.500 °C) atau nyala kuning (lebih dingin, untuk sterilisasi).",
    fungsi: [
      "Memanaskan bahan kimia",
      "Sterilisasi alat menggunakan panas",
      "Pembakaran dan uji nyala"
    ]
  },
  {
    id: 20,
    nama: "Hotplate Stirrer",
    kat: "pemanas",
    icon: "./foto/hotplate-stirrer.png",
    youtube: "https://www.youtube.com/embed/T0WGYjCYNug?autoplay=1&mute=1&start=15&end=100",
    desc: "Alat modern yang menggabungkan dua fungsi dalam satu badan: pemanas elektrik bersuhu terkontrol dan pengaduk magnetik otomatis. Di dalamnya terdapat magnet berputar yang menggerakkan stir bar (batang magnet kecil) di dalam wadah. Hasil pemanasan dan pengadukan yang seragam menjadikannya pilihan utama untuk reaksi yang memerlukan suhu dan homogenitas stabil.",
    fungsi: [
      "Memanaskan larutan secara terkontrol",
      "Mengaduk larutan secara otomatis menggunakan magnet"
    ]
  },
  {
    id: 21,
    nama: "Mantel Pemanas",
    kat: "pemanas",
    icon: "./foto/mantel-pemanas.png",
    youtube: "https://www.youtube.com/embed/es_IuItipuM?autoplay=1&mute=1&start=30&end=105",
    desc: "Pemanas berbentuk mangkuk berlapis kawat nikrom yang mengitari labu dasar bulat secara merata dari segala sisi. Berbeda dengan nyala api terbuka Bunsen yang fokus di satu titik, mantel pemanas mendistribusikan panas secara seragam ke seluruh permukaan labu sehingga aman digunakan dengan pelarut mudah terbakar dan ideal untuk proses refluks maupun destilasi berjam-jam.",
    fungsi: [
      "Memanaskan labu dasar bulat secara merata",
      "Destilasi dan proses refluks"
    ]
  },

  // ══ ALAT PENUNJANG ══
  {
    id: 22,
    nama: "Penjepit Kayu",
    kat: "penunjang",
    icon: "./foto/penjepit-kayu.png",
    youtube: "https://www.youtube.com/embed/4BGQBdzU7pk?autoplay=1&mute=1&start=13&end=70",
    desc: "Penjepit sederhana namun krusial yang terbuat dari kayu (material yang tidak menghantarkan panas dengan baik), itulah kunci keunggulannya! Digunakan untuk memegang tabung reaksi yang sedang dipanaskan di atas nyala Bunsen tanpa membakar tangan. Ingat: selalu arahkan mulut tabung menjauhi diri dan orang lain saat memanaskan.",
    fungsi: [
      "Memegang tabung reaksi panas",
      "Mencegah luka bakar saat memanaskan"
    ]
  },
  {
    id: 23,
    nama: "Tang Krus",
    kat: "penunjang",
    icon: "./foto/tang-krus.png",
    youtube: "https://www.youtube.com/embed/LP009Kvl_cY?autoplay=1&mute=1&start=0&end=80",
    desc: "Tang logam berlengan panjang dengan rahang melengkung yang dirancang khusus untuk mencengkeram krus porselen atau cawan panas yang baru dikeluarkan dari tanur suhu tinggi (bisa lebih dari 1.000 °C!). Panjangnya melindungi tangan dari radiasi panas, sementara bentuk rahangnya mencegah krus tergelincir dan tumpah.",
    fungsi: [
      "Memegang krus atau cawan panas",
      "Memindahkan bahan dari tanur/oven"
    ]
  },
  {
    id: 24,
    nama: "Centrifuge",
    kat: "penunjang",
    icon: "./foto/centrifuge.png",
    sketchfab: "https://sketchfab.com/models/843d5b9c344c48ca8a44ba3d61d84979/embed",
    desc: "Alat pemusing bermotor yang berputar dengan kecepatan tinggi (hingga ribuan RPM) dan memanfaatkan gaya sentrifugal untuk memaksa partikel yang lebih berat bergerak ke bawah tabung lebih cepat dari yang mungkin terjadi secara gravitasi biasa. Dalam hitungan menit, endapan yang sulit terpisah bisa terkumpul rapi di dasar tabung.",
    fungsi: [
      "Memisahkan endapan dari larutan",
      "Memisahkan komponen berdasarkan perbedaan massa jenis"
    ]
  },
  {
    id: 25,
    nama: "Spatula",
    kat: "penunjang",
    icon: "./foto/spatula.png",
    youtube: "https://www.youtube.com/embed/hWYu5_ZdfcQ?autoplay=1&mute=1&start=15&end=55",
    desc: "Perkakas logam kecil pipih mirip sendok mini atau ujung pisau yang digunakan untuk mengambil, memindahkan, dan menimbang bahan padat. Ujungnya yang pipih memudahkan pengerokan bahan dari dalam botol sempit, sementara sisi lainnya sering berbentuk sendok kecil untuk mengambil jumlah lebih banyak. Terbuat dari stainless steel agar tidak bereaksi dengan bahan kimia.",
    fungsi: [
      "Mengambil padatan kimia dari wadah",
      "Memindahkan bahan ke neraca analitik"
    ]
  },
  {
    id: 26,
    nama: "Statif dan Klem",
    kat: "penunjang",
    icon: "./foto/statif-dan-klem.png",
    youtube: "https://www.youtube.com/embed/J0YOEXV3QYw?autoplay=1&mute=1&start=15&end=175",
    desc: "Duo penopang laboratorium yang tak terpisahkan: statif adalah tiang besi berat yang berdiri tegak di atas alas logam kokoh, sementara klem adalah penjepit yang menggigit batang statif dan bisa dikunci di posisi manapun. Bersama-sama, mereka menopang buret saat titrasi, menyangga labu destilasi, atau memegang kondenser di udara (menggantikan peran 'tangan ketiga' di lab).",
    fungsi: [
      "Menopang buret saat titrasi",
      "Menopang labu destilasi",
      "Menyangga berbagai alat selama percobaan berlangsung"
    ]
  },
  {
    id: 27,
    nama: "Rak Tabung Reaksi",
    kat: "penunjang",
    icon: "./foto/rak-tabung-reaksi.png",
    sketchfab: "https://sketchfab.com/models/ea40676ae43340a58b4f1cd44d5a1360/embed",
    desc: "Rangka kayu atau plastik berlubang-lubang yang menjadi 'parkiran' resmi tabung reaksi di laboratorium. Fungsinya simpel namun vital: menjaga tabung berdiri tegak agar isinya tidak tumpah, memudahkan identifikasi sampel yang berbaris rapi, dan memberi ruang tabung mendingin setelah dipanaskan tanpa risiko menggelinding dan pecah.",
    fungsi: [
      "Menyimpan tabung reaksi dengan aman",
      "Mendinginkan tabung setelah dipanaskan"
    ]
  },

  // ══ KESELAMATAN ══
  {
    id: 28,
    nama: "Simbol Keselamatan",
    kat: "keselamatan",
    icon: "./foto/simbol-keselamatan.png",
    desc: "Piktogram (label bergambar) berwarna merah-putih pada kemasan bahan kimia yang merupakan bagian dari sistem GHS (Globally Harmonized System) atau standar internasional untuk komunikasi bahaya. Setiap simbol mewakili jenis bahaya spesifik; mengenalinya bukan sekadar pengetahuan akademis, tapi bisa menyelamatkan nyawa di laboratorium.",
    fungsi: [
      "Memberi peringatan bahaya bahan kimia",
      "Panduan penanganan dan penyimpanan bahan berbahaya"
    ]
  },
  {
    id: 29,
    nama: "Jas Laboratorium",
    kat: "keselamatan",
    icon: "./foto/jas-laboratorium.png",
    sketchfab: "https://sketchfab.com/models/b91528de867e4acd8de5d9b20f7a429d/embed",
    desc: "Pakaian pelindung ikonik berwarna putih dengan lengan panjang yang menjadi 'seragam wajib' di laboratorium kimia. Dibuat dari bahan katun atau poliester yang mampu menahan percikan bahan kimia dan memberikan waktu reaksi untuk menghapus kontaminan sebelum merusak kulit. Warna putihnya juga memudahkan deteksi noda atau percikan bahan berbahaya.",
    fungsi: [
      "Melindungi pakaian dan kulit dari percikan bahan kimia",
      "Mencegah kontaminasi silang bahan kimia"
    ]
  },
  {
    id: 30,
    nama: "Kacamata Lab",
    kat: "keselamatan",
    icon: "./foto/kacamata.png",
    sketchfab: "https://sketchfab.com/models/ab88027edcd44b5b97048ec6acc1f45c/embed",
    desc: "Kacamata pelindung dari plastik keras (polisulfon atau polikarbonat) yang menutupi mata dan area sekitarnya secara menyeluruh. Berbeda dari kacamata biasa, kacamata lab dirancang agar percikan bahan kimia tidak bisa masuk dari sisi mana pun. Ingat: kerusakan mata akibat bahan kimia bisa permanen, satu detik percikan bisa mengubah segalanya.",
    fungsi: [
      "Melindungi mata dari percikan cairan kimia",
      "Wajib dipakai selama praktikum berlangsung"
    ]
  },
  {
    id: 31,
    nama: "Sarung Tangan",
    kat: "keselamatan",
    icon: "./foto/sarung-tangan.png",
    sketchfab: "https://sketchfab.com/models/4a469b88762440618d4e5b4b78f1953c/embed",
    desc: "Pelindung tangan dari lateks, nitril, atau neoprene yang membentuk penghalang antara kulit dan bahan kimia berbahaya. Nitril lebih direkomendasikan karena tahan terhadap lebih banyak jenis bahan kimia dan cocok bagi pengguna yang alergi lateks. Perlu diingat: tidak ada sarung tangan yang 100% tahan semua bahan kimia. Selalu cek kompatibilitas sebelum digunakan.",
    fungsi: [
      "Melindungi tangan dari bahan korosif dan berbahaya",
      "Mencegah kontaminasi bahan kimia ke kulit"
    ]
  },
  {
    id: 32,
    nama: "Mortar dan Alu",
    kat: "penunjang",
    icon: "./foto/mortar-dan-alu.png",
    sketchfab: "https://sketchfab.com/models/ea8a394d509340d6b3a4d67fa8236f17/embed",
    desc: "Pasangan klasik yang telah digunakan manusia sejak ribuan tahun lalu. Mortar adalah mangkuk tebal dari porselen, batu, atau baja, sementara alu adalah batang penumbuknya. Di laboratorium kimia modern, keduanya digunakan untuk menggerus padatan menjadi serbuk halus agar lebih mudah larut, bereaksi, atau dianalisis. Semakin halus partikelnya, semakin luas permukaannya, dan semakin cepat reaksi berlangsung.",
    fungsi: [
      "Menghaluskan dan menggerus padatan kimia",
      "Mencampur bahan padat hingga homogen",
      "Memperkecil ukuran partikel bahan kimia"
    ]
  },
  {
    id: 33,
    nama: "Kawat Kasa",
    kat: "penunjang",
    icon: "./foto/kawat-kasa.png",
    sketchfab: "https://sketchfab.com/models/ca61928ef3284c82b93c065f930e4183/embed",
    desc: "Lempengan anyaman kawat baja berdiameter kecil yang sering dilapis asbes atau keramik di bagian tengahnya. Diletakkan di atas kaki tiga (tripod), kawat kasa berfungsi sebagai landasan yang mendistribusikan panas nyala Bunsen secara merata ke dasar gelas kimia atau beaker (mencegah pemanasan tidak merata yang bisa memecahkan alat gelas).",
    fungsi: [
      "Menopang gelas kimia atau labu saat dipanaskan",
      "Mendistribusikan panas secara merata ke dasar alat gelas",
      "Digunakan bersama kaki tiga dan pembakar Bunsen"
    ]
  },
];

// ─────────────────────────────────────────────
// DATA VIRTUAL LAB: CARA PENGGUNAAN SEMUA ALAT
// ─────────────────────────────────────────────
const CARA_PENGGUNAAN = {
  1: {
    tujuan: "Mengukur volume cairan secara tepat untuk pekerjaan laboratorium rutin.",
    persiapan: "Gelas ukur bersih, cairan, dan wadah tujuan.",
    k3: "Gunakan ukuran yang sesuai dan jangan mengukur cairan panas dengan gelas ukur yang tidak dirancang tahan panas.",
    langkah: [
      { judul: "Periksa alat", detail: "Pastikan gelas ukur bersih, tidak retak, dan diletakkan tegak pada permukaan yang rata." },
      { judul: "Masukkan cairan", detail: "Tuangkan cairan perlahan sampai volumenya sedikit di bawah angka yang dituju agar tidak melewati batas." },
      { judul: "Sesuaikan volume", detail: "Tambahkan cairan tetes demi tetes hingga bagian bawah meniskus tepat pada garis skala yang diinginkan." },
      { judul: "Baca dan pindahkan", detail: "Baca skala sejajar mata untuk menghindari paralaks, lalu tuangkan melalui bibir gelas ukur ke wadah tujuan." }
    ]
  },
  2: {
    tujuan: "Menampung, mencampur, atau memanaskan larutan dalam volume yang tidak memerlukan ketelitian tinggi.",
    persiapan: "Gelas kimia, bahan, batang pengaduk, dan pemanas bila diperlukan.",
    k3: "Jangan gunakan skala beaker untuk pengukuran presisi dan jangan memanaskan beaker yang retak.",
    langkah: [
      { judul: "Periksa beaker", detail: "Pilih kapasitas yang menyisakan ruang cukup, lalu pastikan dinding dan bibir beaker tidak retak." },
      { judul: "Masukkan bahan", detail: "Tambahkan bahan ke dalam beaker secara perlahan dan hindari mengisi terlalu penuh agar tidak mudah tumpah." },
      { judul: "Campur atau panaskan", detail: "Aduk dengan batang pengaduk. Jika dipanaskan, gunakan hotplate atau kawat kasa dan naikkan suhu bertahap." },
      { judul: "Tuang dan bersihkan", detail: "Tuangkan cairan melalui paruh beaker, lalu dinginkan sebelum mencuci dan menyimpan alat." }
    ]
  },
  3: {
    tujuan: "Memindahkan cairan dalam volume kecil menggunakan jenis pipet yang sesuai.",
    persiapan: "Pipet yang tepat, pipette filler, cairan, dan wadah tujuan.",
    k3: "Jangan pernah mengisap cairan dengan mulut. Selalu gunakan pipette filler atau bulb.",
    langkah: [
      { judul: "Pilih jenis pipet", detail: "Gunakan pipet tetes untuk penambahan per tetes, pipet volume untuk satu volume tepat, atau pipet ukur untuk volume yang bervariasi." },
      { judul: "Bilas dan pasang filler", detail: "Bilas pipet volume/ukur dengan sedikit larutan, lalu pasang pipette filler pada ujung atas tanpa memaksakan kaca terlalu dalam." },
      { judul: "Aspirasi cairan", detail: "Pegang pipet tegak, pertahankan ujung tetap terendam, lalu isap perlahan agar tidak ada gelembung. Untuk pipet volume/ukur, naikkan cairan sedikit di atas tanda awal." },
      { judul: "Setel dan dispensasi", detail: "Setel bawah meniskus sejajar mata, pindahkan ke wadah tujuan, sentuhkan ujung ke dinding, lalu biarkan cairan mengalir sesuai jenis dan tanda kalibrasi pipet." }
    ]
  },
  4: {
    tujuan: "Melakukan reaksi kimia atau pemanasan bahan dalam skala kecil.",
    persiapan: "Tabung reaksi, rak, penjepit kayu, dan bahan percobaan.",
    k3: "Saat dipanaskan, arahkan mulut tabung menjauhi diri sendiri dan orang lain.",
    langkah: [
      { judul: "Periksa tabung", detail: "Pastikan tabung bersih, kering sesuai kebutuhan, dan tidak memiliki retak atau serpihan pada bibirnya." },
      { judul: "Masukkan bahan", detail: "Isi tabung secukupnya, umumnya tidak lebih dari sepertiga volume untuk memberi ruang reaksi." },
      { judul: "Jepit bagian atas", detail: "Pasang penjepit kayu pada sepertiga atas tabung, jauh dari bagian cairan yang akan dipanaskan, lalu arahkan mulut tabung menjauhi semua orang." },
      { judul: "Miringkan dan panaskan bagian bawah", detail: "Pegang tabung sekitar 45° dan gerakkan bagian bawah yang berisi cairan maju-mundur melintasi nyala. Jangan memanaskan bagian tengah/atas atau memusatkan api pada satu titik." }
    ]
  },
  5: {
    tujuan: "Mencampur, menampung, memanaskan larutan, atau menjadi wadah saat titrasi.",
    persiapan: "Erlenmeyer bersih, larutan, dan pemanas atau perangkat titrasi bila diperlukan.",
    k3: "Jangan menutup rapat Erlenmeyer ketika dipanaskan karena tekanan dapat meningkat.",
    langkah: [
      { judul: "Pilih ukuran", detail: "Pilih Erlenmeyer yang cukup besar agar larutan dapat digoyang tanpa mengenai tutup atau tumpah." },
      { judul: "Masukkan larutan", detail: "Tuangkan larutan melalui leher labu dan tambahkan indikator atau bahan lain sesuai prosedur." },
      { judul: "Campurkan", detail: "Pegang leher labu dan gerakkan melingkar secara perlahan sampai campuran homogen." },
      { judul: "Proses dan bersihkan", detail: "Lakukan titrasi atau pemanasan sesuai SOP, kemudian dinginkan dan cuci labu setelah selesai." }
    ]
  },
  6: {
    tujuan: "Menimbang padatan, menutup beaker, atau menguapkan sedikit larutan.",
    persiapan: "Kaca arloji bersih dan kering, spatula, serta neraca bila digunakan untuk menimbang.",
    k3: "Kaca arloji tipis dan mudah pecah; hindari perubahan suhu mendadak dan jangan menyentuhnya saat masih panas.",
    langkah: [
      { judul: "Periksa permukaan", detail: "Pastikan kaca arloji bersih, kering, dan tidak retak sebelum diletakkan pada permukaan datar." },
      { judul: "Siapkan penggunaan", detail: "Untuk menimbang, letakkan di neraca dan lakukan tara. Untuk penutup, pilih diameter yang sesuai dengan beaker." },
      { judul: "Tambahkan bahan", detail: "Pindahkan padatan dengan spatula atau teteskan larutan sedikit demi sedikit ke bagian cekung." },
      { judul: "Akhiri proses", detail: "Pindahkan bahan, biarkan kaca dingin bila dipanaskan, kemudian bersihkan dan keringkan." }
    ]
  },
  7: {
    tujuan: "Mengeluarkan titran secara terukur dan terkendali dalam proses titrasi.",
    persiapan: "Buret, statif-klem, corong, titran, dan wadah limbah.",
    k3: "Pastikan buret terjepit tegak dan keran tidak bocor. Lepaskan corong sebelum titrasi dimulai.",
    langkah: [
      { judul: "Bilas dan pasang", detail: "Bilas buret dengan sedikit titran, pasang tegak pada statif, lalu pastikan keran tertutup." },
      { judul: "Isi dan priming ujung", detail: "Isi titran menggunakan corong hingga di atas skala awal, buka keran sesaat sampai jet bawah terisi penuh dan tidak ada gelembung, lalu pastikan tidak bocor." },
      { judul: "Catat volume awal", detail: "Lepaskan corong dan baca bagian bawah meniskus sejajar mata. Catat volume awal dengan teliti." },
      { judul: "Lakukan titrasi", detail: "Buka keran perlahan sambil menggoyang Erlenmeyer. Mendekati titik akhir, keluarkan titran setetes demi setetes." },
      { judul: "Hitung volume", detail: "Catat volume akhir, hitung selisihnya, lalu kosongkan dan bilas buret sesuai prosedur." }
    ]
  },
  8: {
    tujuan: "Membuat atau mengencerkan larutan sampai volume yang sangat tepat.",
    persiapan: "Labu ukur, corong, pipet tetes, zat terlarut, dan pelarut.",
    k3: "Jangan memanaskan labu ukur dan pastikan larutan sudah bersuhu ruang sebelum menepatkan volume.",
    langkah: [
      { judul: "Masukkan zat", detail: "Masukkan zat terlarut atau larutan pekat ke labu ukur menggunakan corong bila diperlukan." },
      { judul: "Larutkan", detail: "Tambahkan pelarut hingga sekitar dua pertiga volume, lalu putar perlahan sampai zat larut sempurna." },
      { judul: "Tepatkan volume", detail: "Tambahkan pelarut mendekati tanda batas, kemudian gunakan pipet tetes sampai bawah meniskus tepat pada garis." },
      { judul: "Homogenkan", detail: "Pasang penutup, balikkan labu beberapa kali dengan menahan penutup, lalu beri label larutan." }
    ]
  },
  9: {
    tujuan: "Memisahkan dua fase cair yang tidak saling bercampur melalui ekstraksi cair-cair.",
    persiapan: "Corong pisah, statif-klem, dua fase cair, dan wadah penampung berlabel.",
    k3: "Selalu lepaskan tekanan dengan membuka keran menjauhi wajah, terutama saat memakai pelarut mudah menguap.",
    langkah: [
      { judul: "Periksa keran", detail: "Pastikan keran tertutup dan tidak bocor, lalu pasang corong pisah dengan stabil pada statif." },
      { judul: "Masukkan cairan", detail: "Tambahkan kedua fase tanpa mengisi lebih dari sekitar dua pertiga volume, lalu pasang penutup." },
      { judul: "Kocok dan ventilasi", detail: "Balikkan corong, pegang penutup dan keran, kocok perlahan, lalu buka keran sesaat untuk melepaskan tekanan. Ulangi beberapa kali." },
      { judul: "Pisahkan fase", detail: "Diamkan sampai batas fase jelas, lepaskan penutup, lalu alirkan fase bawah ke wadah berlabel dan tampung fase atas terpisah." }
    ]
  },
  10: {
    tujuan: "Mengaduk campuran atau membantu menuang cairan secara terarah.",
    persiapan: "Batang pengaduk bersih, wadah, dan campuran yang akan diaduk.",
    k3: "Jangan membenturkan batang pengaduk ke dinding atau dasar alat gelas karena dapat menyebabkan pecah.",
    langkah: [
      { judul: "Periksa batang", detail: "Pastikan batang pengaduk bersih, tidak retak, dan kedua ujungnya halus." },
      { judul: "Masukkan perlahan", detail: "Celupkan batang ke dalam cairan tanpa menjatuhkan atau membenturkannya pada wadah." },
      { judul: "Aduk campuran", detail: "Gerakkan melingkar dengan kecepatan stabil sampai bahan tercampur atau padatan larut." },
      { judul: "Arahkan penuangan", detail: "Saat menuang, tempelkan batang pada bibir wadah agar aliran mengikuti batang, lalu bilas setelah digunakan." }
    ]
  },
  11: {
    tujuan: "Mendinginkan atau menyimpan sampel dalam lingkungan rendah kelembapan.",
    persiapan: "Desikator, desikan aktif, cawan sampel, dan tang yang sesuai.",
    k3: "Buka tutup dengan cara menggeser, bukan mengangkat paksa. Gunakan pelindung mata saat memakai desikator vakum.",
    langkah: [
      { judul: "Periksa desikan", detail: "Pastikan desikan masih aktif, bagian dalam bersih, dan tepi penutup dalam kondisi baik." },
      { judul: "Buka dengan aman", detail: "Pegang badan desikator dan geser tutup secara mendatar dengan kedua tangan." },
      { judul: "Masukkan sampel", detail: "Letakkan sampel pada pelat porselen menggunakan tang, lalu hindari menyentuh desikan." },
      { judul: "Tutup dan tunggu", detail: "Geser tutup kembali hingga rapat dan biarkan sampel mencapai suhu atau kondisi yang dibutuhkan sebelum diambil." }
    ]
  },
  12: {
    tujuan: "Menimbang massa bahan kimia dengan ketelitian tinggi.",
    persiapan: "Neraca analitik, wadah timbang, spatula, dan sampel.",
    k3: "Jangan menaruh bahan langsung pada piring neraca dan jangan menimbang benda panas atau basah.",
    langkah: [
      { judul: "Siapkan neraca", detail: "Pastikan neraca rata, bersih, menyala, dan menunjukkan nol dengan semua pintu tertutup." },
      { judul: "Lakukan tara", detail: "Letakkan wadah timbang di tengah piring, tutup pintu, tunggu stabil, lalu tekan tombol tara." },
      { judul: "Tambahkan sampel", detail: "Buka pintu seperlunya dan tambahkan sampel sedikit demi sedikit menggunakan spatula." },
      { judul: "Catat massa", detail: "Tutup semua pintu, tunggu indikator stabil, catat massa, lalu keluarkan wadah dan bersihkan area neraca." }
    ]
  },
  13: {
    tujuan: "Mengukur dan memantau suhu bahan atau campuran selama percobaan.",
    persiapan: "Termometer dengan rentang sesuai, statif bila perlu, dan sampel.",
    k3: "Jangan menggunakan termometer retak dan jangan melebihi batas suhu yang tertera pada alat.",
    langkah: [
      { judul: "Pilih rentang", detail: "Pilih termometer dengan rentang pengukuran yang mencakup perkiraan suhu sampel." },
      { judul: "Posisikan bulb", detail: "Turunkan bulb sampai terendam cukup dalam di bagian tengah sampel, tetapi jangan menyentuh dasar maupun dinding wadah." },
      { judul: "Tunggu stabil", detail: "Diamkan sampai angka atau kolom cairan berhenti berubah. Jangan memakai termometer sebagai pengaduk." },
      { judul: "Baca dan bersihkan", detail: "Baca skala sejajar mata, catat suhu beserta satuannya, lalu bersihkan sensor setelah digunakan." }
    ]
  },
  14: {
    tujuan: "Mengukur pH larutan secara akurat menggunakan elektroda gelas.",
    persiapan: "pH meter, larutan buffer, akuades, tisu bebas serat, dan sampel.",
    k3: "Elektroda sangat rapuh; jangan menggosok bulb dan jangan membiarkannya kering.",
    langkah: [
      { judul: "Nyalakan dan kalibrasi", detail: "Nyalakan alat, celupkan elektroda ke buffer pertama dan berikutnya sesuai instrumen, lalu tunggu setiap nilai stabil sebelum menerima kalibrasi." },
      { judul: "Bilas elektroda", detail: "Bilas elektroda dengan akuades dan tepuk perlahan menggunakan tisu bebas serat tanpa menggosok." },
      { judul: "Ukur sampel", detail: "Celupkan bulb dan junction elektroda ke sampel tanpa menyentuh dasar, aduk perlahan, lalu tunggu indikator pembacaan stabil." },
      { judul: "Bilas dan simpan", detail: "Catat nilai pH, bilas elektroda, lalu simpan dalam larutan penyimpanan yang direkomendasikan, bukan akuades." }
    ]
  },
  15: {
    tujuan: "Mengukur absorbansi atau transmitansi sampel pada panjang gelombang tertentu.",
    persiapan: "Spektrofotometer, blanko, sampel, kuvet bersih, dan tisu bebas serat.",
    k3: "Gunakan kuvet yang sesuai panjang gelombang dan jangan menyentuh sisi optik dengan jari.",
    langkah: [
      { judul: "Siapkan instrumen", detail: "Nyalakan alat, biarkan stabil sesuai petunjuk, lalu pilih mode dan panjang gelombang pengukuran." },
      { judul: "Siapkan kuvet", detail: "Isi kuvet blanko dan sampel dengan volume cukup, hilangkan gelembung, lalu bersihkan sisi optiknya." },
      { judul: "Atur blanko", detail: "Masukkan blanko dengan orientasi yang benar, tutup kompartemen, lalu lakukan pengaturan nol atau baseline." },
      { judul: "Ukur sampel", detail: "Ganti dengan kuvet sampel pada orientasi yang sama, baca hasil, kemudian keluarkan dan bersihkan kuvet." }
    ]
  },
  16: {
    tujuan: "Memindahkan atau menambahkan cairan dalam jumlah sangat kecil, tetes demi tetes.",
    persiapan: "Pipet tetes bersih, cairan, dan wadah tujuan.",
    k3: "Jangan membalik pipet berisi cairan agar cairan tidak masuk ke bulb dan menyebabkan kontaminasi.",
    langkah: [
      { judul: "Tekan bulb", detail: "Tekan bulb sebelum ujung pipet dimasukkan ke dalam cairan." },
      { judul: "Ambil cairan", detail: "Celupkan ujung pipet, lalu lepaskan tekanan pada bulb secara perlahan agar cairan terisap." },
      { judul: "Pindahkan", detail: "Pegang pipet tegak di atas wadah tujuan tanpa menyentuhkan ujungnya pada permukaan lain." },
      { judul: "Teteskan", detail: "Pegang pipet vertikal dan tekan bulb perlahan sehingga tetes terbentuk satu per satu; jangan memasukkan ujung yang sudah menyentuh sampel kembali ke botol stok." }
    ]
  },
  17: {
    tujuan: "Memindahkan satu volume larutan yang telah dikalibrasi dengan ketelitian tinggi.",
    persiapan: "Pipet volume, pipette filler, larutan, dan wadah tujuan.",
    k3: "Gunakan filler, bukan mulut. Pipet volume umumnya dibiarkan mengalir sendiri dan tidak ditiup kecuali memiliki tanda blow-out.",
    langkah: [
      { judul: "Bilas pipet", detail: "Bilas pipet dengan sedikit larutan yang akan dipindahkan, lalu buang bilasan ke wadah limbah." },
      { judul: "Ambil larutan", detail: "Pasang filler dan isap larutan sedikit di atas tanda kalibrasi sambil menjaga ujung tetap terendam." },
      { judul: "Atur meniskus", detail: "Turunkan cairan perlahan sampai bagian bawah meniskus tepat pada tanda saat dilihat sejajar mata." },
      { judul: "Pindahkan volume", detail: "Tempelkan ujung pada dinding wadah dan biarkan cairan mengalir oleh gravitasi. Setelah aliran berhenti, tunggu beberapa detik; jangan meniup sisa yang memang dirancang tertinggal di ujung." }
    ]
  },
  18: {
    tujuan: "Mengukur dan memindahkan volume cairan yang bervariasi menggunakan skala graduasi.",
    persiapan: "Pipet ukur, pipette filler, larutan, dan wadah tujuan.",
    k3: "Jangan mengisap dengan mulut dan pastikan jenis skala pipet dipahami sebelum menentukan volume akhir.",
    langkah: [
      { judul: "Bilas dan pasang", detail: "Bilas pipet dengan larutan, lalu pasang pipette filler pada ujung atas." },
      { judul: "Ambil cairan", detail: "Isap larutan melewati skala awal dan atur meniskus pada angka awal yang dipilih." },
      { judul: "Keluarkan terukur", detail: "Pegang pipet tegak dan alirkan cairan ke dinding wadah sampai bawah meniskus mencapai angka akhir yang dibutuhkan." },
      { judul: "Hitung dan catat", detail: "Hitung selisih pembacaan awal dan akhir sebagai volume yang dipindahkan, lalu bilas pipet." }
    ]
  },
  19: {
    tujuan: "Menghasilkan nyala api terkendali untuk pemanasan, sterilisasi, atau uji nyala.",
    persiapan: "Pembakar Bunsen, sumber gas, pemantik, alas tahan panas, dan APAR yang sesuai.",
    k3: "Ikat rambut, jauhkan pelarut mudah terbakar, gunakan kacamata, dan jangan meninggalkan nyala tanpa pengawasan.",
    langkah: [
      { judul: "Periksa area", detail: "Pastikan selang terpasang baik, tidak bocor, dan area di atas pembakar bebas dari bahan mudah terbakar." },
      { judul: "Nyalakan", detail: "Tutup lubang udara, siapkan pemantik di sisi atas pembakar, lalu buka gas sedikit dan nyalakan." },
      { judul: "Putar collar udara", detail: "Putar collar untuk membuka lubang udara perlahan. Nyala kuning melebar akan menyempit menjadi nyala biru stabil dengan kerucut dalam yang jelas." },
      { judul: "Gunakan dan matikan", detail: "Panaskan bahan sesuai prosedur, lalu tutup sumber gas sepenuhnya dan tunggu pembakar dingin." }
    ]
  },
  20: {
    tujuan: "Memanaskan sekaligus mengaduk larutan secara terkendali dan merata.",
    persiapan: "Hotplate stirrer, wadah tahan panas, stir bar, dan larutan.",
    k3: "Permukaan dapat tetap panas setelah alat dimatikan. Jangan memanaskan pelarut mudah terbakar tanpa penilaian risiko dan ventilasi yang sesuai.",
    langkah: [
      { judul: "Siapkan alat", detail: "Pastikan permukaan hotplate kering, kabel baik, dan wadah sesuai untuk pemanasan." },
      { judul: "Posisikan sampel", detail: "Masukkan stir bar ke wadah, lalu letakkan wadah tepat di tengah permukaan hotplate." },
      { judul: "Atur pengadukan", detail: "Nyalakan pengadukan dari kecepatan rendah, kemudian tingkatkan sampai terbentuk putaran yang stabil tanpa percikan." },
      { judul: "Atur panas dan akhiri", detail: "Naikkan suhu bertahap sambil dipantau. Setelah selesai, matikan pemanas dan pengaduk lalu tunggu hingga dingin." }
    ]
  },
  21: {
    tujuan: "Memanaskan labu dasar bulat secara merata untuk refluks, destilasi, atau reaksi lain.",
    persiapan: "Mantel pemanas sesuai ukuran, labu dasar bulat, statif-klem, dan pengendali suhu.",
    k3: "Jangan memanaskan labu kosong atau sistem tertutup. Tambahkan batu didih sebelum pemanasan dimulai bila diperlukan.",
    langkah: [
      { judul: "Pilih ukuran", detail: "Gunakan mantel yang sesuai diameter labu dan periksa kabel serta permukaan pemanas." },
      { judul: "Susun peralatan", detail: "Letakkan labu di dalam mantel, pasang klem tanpa memberi tekanan berlebih, lalu rangkai kondensor bila diperlukan." },
      { judul: "Mulai pemanasan", detail: "Atur daya dari tingkat rendah dan naikkan secara bertahap sambil mengamati campuran dan suhu." },
      { judul: "Matikan dan dinginkan", detail: "Setelah proses selesai, matikan daya, cabut sesuai SOP, dan biarkan labu serta mantel dingin sebelum dibongkar." }
    ]
  },
  22: {
    tujuan: "Memegang tabung reaksi dengan aman ketika dipanaskan.",
    persiapan: "Penjepit kayu, tabung reaksi, rak, dan sumber panas.",
    k3: "Jepit tabung sebelum mendekatkannya ke api dan selalu arahkan mulut tabung menjauhi semua orang.",
    langkah: [
      { judul: "Periksa penjepit", detail: "Pastikan penjepit kering, tidak retak, dan mekanismenya dapat mencengkeram dengan baik." },
      { judul: "Buka rahang", detail: "Tekan kedua ujung pegangan di belakang engsel agar rahang depan terbuka, lalu arahkan rahang ke sepertiga atas tabung." },
      { judul: "Kunci cengkeraman", detail: "Kurangi tekanan pada pegangan secara perlahan sampai pegas menutup rahang pada tabung. Uji cengkeraman sebelum mengangkat; jangan menjepit terlalu dekat mulut atau bagian yang dipanaskan." },
      { judul: "Miringkan dan panaskan", detail: "Angkat tabung, arahkan mulut menjauhi semua orang, lalu gerakkan bagian berisi cairan maju-mundur melintasi nyala agar panas merata." },
      { judul: "Dinginkan", detail: "Letakkan tabung pada rak tahan panas. Lepaskan penjepit hanya setelah posisi tabung stabil." }
    ]
  },
  23: {
    tujuan: "Memegang dan memindahkan krus atau cawan yang bersuhu tinggi.",
    persiapan: "Tang krus yang bersih, krus, dan permukaan tahan panas atau desikator.",
    k3: "Anggap semua krus yang berada dekat pemanas masih panas. Gunakan kacamata dan sepatu tertutup.",
    langkah: [
      { judul: "Periksa tang", detail: "Pastikan ujung tang bersih, kering, tidak bengkok, dan dapat membuka-menutup dengan lancar." },
      { judul: "Uji cengkeraman", detail: "Posisikan rahang mengelilingi badan atau tepi krus sesuai bentuknya, lalu tekan secukupnya." },
      { judul: "Pindahkan krus", detail: "Angkat perlahan dengan satu gerakan stabil dan jauhkan krus dari tubuh serta benda mudah terbakar." },
      { judul: "Letakkan aman", detail: "Turunkan krus pada alas tahan panas atau ke dalam desikator, kemudian lepaskan tang perlahan." }
    ]
  },
  24: {
    tujuan: "Memisahkan komponen campuran berdasarkan perbedaan massa jenis dengan gaya sentrifugal.",
    persiapan: "Centrifuge, tabung kompatibel, pasangan penyeimbang, dan sampel.",
    k3: "Tabung harus seimbang berdasarkan massa dan ditempatkan saling berhadapan. Jangan membuka tutup saat rotor bergerak.",
    langkah: [
      { judul: "Periksa tabung", detail: "Gunakan tabung yang sesuai, tidak retak, dan ditutup dengan benar. Samakan massa pasangan tabung." },
      { judul: "Seimbangkan rotor", detail: "Tempatkan tabung dengan massa sama pada posisi yang saling berhadapan secara simetris." },
      { judul: "Atur proses", detail: "Tutup dan kunci alat, lalu atur kecepatan serta waktu sesuai SOP sampel." },
      { judul: "Ambil sampel", detail: "Mulai putaran dan tunggu rotor berhenti sepenuhnya sebelum membuka tutup serta mengeluarkan tabung." }
    ]
  },
  25: {
    tujuan: "Mengambil, memindahkan, atau menimbang bahan kimia padat dalam jumlah kecil.",
    persiapan: "Spatula bersih dan kering, botol reagen, serta wadah timbang.",
    k3: "Gunakan spatula berbeda untuk tiap bahan dan jangan mengembalikan sisa bahan ke botol asal.",
    langkah: [
      { judul: "Pilih spatula", detail: "Gunakan ukuran dan bahan spatula yang kompatibel dengan reagen, lalu pastikan bersih dan kering." },
      { judul: "Ambil padatan", detail: "Buka tutup wadah, masukkan ujung sendok atau bilah spatula yang bersih, lalu angkat gundukan kecil tanpa menyentuh dinding luar botol." },
      { judul: "Pindahkan", detail: "Bawa spatula mendatar di atas meja, turunkan ke wadah timbang, lalu miringkan atau ketuk ringan sampai padatan terlepas tanpa tercecer." },
      { judul: "Akhiri penggunaan", detail: "Buang kelebihan ke wadah limbah yang sesuai, tutup reagen, lalu bersihkan spatula." }
    ]
  },
  26: {
    tujuan: "Menopang buret, labu, kondensor, atau alat lain pada posisi yang stabil.",
    persiapan: "Statif, bosshead, klem yang sesuai, dan alat yang akan ditopang.",
    k3: "Letakkan alat berat dekat dasar statif dan jangan mengencangkan klem pada kaca secara berlebihan.",
    langkah: [
      { judul: "Posisikan statif", detail: "Letakkan alas statif pada meja yang rata dengan sisi berat mengarah ke rangkaian alat." },
      { judul: "Pasang klem", detail: "Hubungkan bosshead dan klem pada tiang, lalu atur tinggi serta arah sebelum dikencangkan." },
      { judul: "Jepit alat", detail: "Tempatkan alat pada rahang klem, gunakan pelapis bila ada, dan kencangkan sampai stabil tanpa menekan berlebih." },
      { judul: "Uji kestabilan", detail: "Periksa pusat massa dan goyangkan perlahan untuk memastikan rangkaian tidak mudah bergeser atau terbalik." }
    ]
  },
  27: {
    tujuan: "Menjaga tabung reaksi tetap tegak, teratur, dan aman selama percobaan atau pendinginan.",
    persiapan: "Rak tabung reaksi yang bersih, tabung, dan label sampel.",
    k3: "Letakkan rak jauh dari tepi meja dan gunakan lubang yang sesuai ukuran tabung.",
    langkah: [
      { judul: "Periksa rak", detail: "Pastikan rak stabil, kering, bersih, dan tidak memiliki bagian tajam atau rusak." },
      { judul: "Labeli tabung", detail: "Beri label pada tabung sebelum diisi agar sampel tidak tertukar." },
      { judul: "Susun tabung", detail: "Masukkan tabung secara tegak ke lubang yang sesuai dengan label menghadap ke arah yang mudah dibaca." },
      { judul: "Ambil dengan aman", detail: "Biarkan tabung panas mendingin, lalu ambil satu per satu tanpa menarik atau mendorong tabung lain." }
    ]
  },
  28: {
    tujuan: "Mengidentifikasi bahaya bahan kimia dan menentukan tindakan pencegahan sebelum bekerja.",
    persiapan: "Label bahan, lembar data keselamatan (SDS), dan daftar simbol GHS.",
    k3: "Jangan menggunakan bahan yang labelnya hilang atau tidak terbaca. Minta konfirmasi laboran.",
    langkah: [
      { judul: "Baca label", detail: "Periksa nama bahan, konsentrasi, piktogram GHS, kata sinyal, dan pernyataan bahaya pada kemasan." },
      { judul: "Cocokkan simbol", detail: "Identifikasi arti setiap simbol dan buka SDS untuk melihat bahaya, pertolongan pertama, dan penyimpanan." },
      { judul: "Tentukan pengendalian", detail: "Pilih APD, ventilasi, alat penanganan, dan jumlah bahan yang sesuai dengan tingkat bahayanya." },
      { judul: "Kelola setelah digunakan", detail: "Tutup, simpan, dan buang limbah sesuai kompatibilitas serta prosedur bahan berbahaya." }
    ]
  },
  29: {
    tujuan: "Melindungi kulit dan pakaian dari percikan serta kontaminasi selama bekerja di laboratorium.",
    persiapan: "Jas laboratorium yang sesuai ukuran, bersih, dan berbahan sesuai risiko pekerjaan.",
    k3: "Jangan memakai jas laboratorium di kantin atau area umum dan segera ganti jika terkontaminasi.",
    langkah: [
      { judul: "Periksa jas", detail: "Pastikan jas tidak robek, kering, bersih, dan panjang lengan serta ukurannya sesuai." },
      { judul: "Kenakan", detail: "Masukkan kedua lengan, rapikan manset, lalu kancingkan jas dari atas hingga bawah." },
      { judul: "Gunakan dengan benar", detail: "Jaga jas tetap tertutup selama praktikum dan jangan menyimpan benda berbahaya di saku." },
      { judul: "Lepaskan", detail: "Buka kancing tanpa menyentuh bagian yang terkontaminasi, lepaskan dari bahu, lalu simpan atau cuci sesuai prosedur." }
    ]
  },
  30: {
    tujuan: "Melindungi mata dari percikan cairan, partikel, dan risiko kimia lain.",
    persiapan: "Kacamata lab yang sesuai risiko, bersih, dan tidak tergores parah.",
    k3: "Kacamata biasa bukan pengganti goggles kimia yang menutup area mata dari samping.",
    langkah: [
      { judul: "Periksa lensa", detail: "Pastikan lensa bersih, tidak retak, dan tali atau gagang masih berfungsi baik." },
      { judul: "Pasang", detail: "Letakkan kacamata menutupi mata sepenuhnya dan atur tali hingga pas tanpa menekan berlebihan." },
      { judul: "Pertahankan posisi", detail: "Gunakan sepanjang praktikum dan jangan menaikkannya ke dahi saat masih berada di area kerja." },
      { judul: "Bersihkan", detail: "Setelah digunakan, cuci atau disinfeksi sesuai petunjuk, keringkan, lalu simpan di tempat terlindung." }
    ]
  },
  31: {
    tujuan: "Membatasi kontak kulit dengan bahan kimia dan mencegah kontaminasi silang.",
    persiapan: "Sarung tangan dengan bahan dan ukuran yang kompatibel terhadap zat yang digunakan.",
    k3: "Tidak ada sarung tangan yang tahan semua bahan. Periksa tabel kompatibilitas dan ganti segera jika rusak atau terkontaminasi.",
    langkah: [
      { judul: "Pilih dan periksa", detail: "Pilih bahan serta ukuran yang sesuai, lalu periksa lubang, sobekan, atau perubahan warna." },
      { judul: "Kenakan", detail: "Masukkan tangan yang bersih dan kering, tarik sarung tangan hingga menutup pergelangan jas laboratorium." },
      { judul: "Gunakan", detail: "Hindari menyentuh wajah, ponsel, gagang pintu, dan benda bersih dengan sarung tangan terkontaminasi." },
      { judul: "Lepaskan", detail: "Lepaskan dengan membalik bagian luar ke dalam tanpa menyentuh kulit, buang sesuai prosedur, lalu cuci tangan." }
    ]
  },
  32: {
    tujuan: "Menghaluskan, mencampur, atau memperkecil ukuran partikel bahan padat.",
    persiapan: "Mortar dan alu bersih-kering, padatan, spatula, dan wadah hasil.",
    k3: "Hindari menghirup debu; kerjakan bahan berdebu atau berbahaya di ventilasi yang sesuai.",
    langkah: [
      { judul: "Siapkan alat", detail: "Pastikan mortar dan alu bersih, kering, tidak retak, dan kompatibel dengan bahan." },
      { judul: "Masukkan padatan", detail: "Tambahkan bahan dalam jumlah kecil agar tersedia ruang untuk gerakan penggerusan." },
      { judul: "Gerus", detail: "Tekan alu sambil membuat gerakan melingkar dari tengah ke dinding hingga ukuran partikel merata." },
      { judul: "Pindahkan dan bersihkan", detail: "Kumpulkan serbuk dengan spatula, pindahkan ke wadah berlabel, lalu bersihkan mortar dan alu." }
    ]
  },
  33: {
    tujuan: "Menopang alat gelas dan menyebarkan panas saat pemanasan dengan pembakar Bunsen.",
    persiapan: "Kawat kasa utuh, kaki tiga atau cincin statif, beaker, dan pembakar.",
    k3: "Jangan gunakan kasa rusak atau bahan pusat yang diduga mengandung asbes. Kasa tetap panas setelah api dimatikan.",
    langkah: [
      { judul: "Periksa kasa", detail: "Pastikan anyaman rata, bagian tengah tidak retak, dan tidak ada kawat tajam yang menonjol." },
      { judul: "Pasang penopang", detail: "Letakkan kasa tepat di tengah kaki tiga atau cincin statif yang sudah stabil." },
      { judul: "Posisikan wadah", detail: "Tempatkan beaker atau labu di tengah kasa agar beban dan panas terdistribusi merata." },
      { judul: "Panaskan dan dinginkan", detail: "Nyalakan pembakar di bawah pusat kasa, panaskan bertahap, lalu matikan api dan biarkan kasa dingin sebelum dipindahkan." }
    ]
  }
};

// ─────────────────────────────────────────────
// URL PERMAINAN EDUCANDY
// ─────────────────────────────────────────────
// Link 1: noughts & crosses, crosswords, match-up, memory, multiple choice
// Link 2: word search, spell it, anagrams
const GAME_URLS = {
  paket1: "https://www.educandy.com/site/resource_embedded.php?activity-code=14b0cb",
  paket2: "https://www.educandy.com/site/resource_embedded.php?activity-code=14b0c7"
};

const GAME_LABELS = {
  paket1: "🎮 Paket 1 – Noughts & Crosses · Crosswords · Match Up · Memory · Multiple Choice",
  paket2: "🕹️ Paket 2 – Word Search · Spell It · Anagrams"
};

// ─────────────────────────────────────────────
// HELPER: LABEL KATEGORI
// ─────────────────────────────────────────────
function catLabel(kat) {
  const map = {
    gelas:       "🧪 Alat Gelas",
    ukur:        "📏 Alat Ukur",
    pemanas:     "🔥 Alat Pemanas",
    penunjang:   "🗜️ Alat Penunjang",
    keselamatan: "🛡️ Keselamatan"
  };
  return map[kat] || kat;
}

// ─────────────────────────────────────────────
// RENDER KARTU ALAT
// ─────────────────────────────────────────────
function renderGrid(filter) {
  const grid = document.getElementById("alatGrid");
  const data = filter === "semua" ? ALAT : ALAT.filter(a => a.kat === filter);

  grid.innerHTML = data.map(a => `
    <div class="alat-card" onclick="openModal(${a.id})">
      <div class="alat-icon">
        <img src="${a.icon}" alt="${a.nama}" class="alat-icon-img">
      </div>
      <div class="alat-name">${a.nama}</div>
      <div class="alat-cat">${catLabel(a.kat)}</div>
    </div>
  `).join("");
}

// ─────────────────────────────────────────────
// FILTER KATEGORI
// ─────────────────────────────────────────────
function filterAlat(kat, btn) {
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderGrid(kat);
}

// ─────────────────────────────────────────────
// VIRTUAL LAB INTERAKTIF
// ─────────────────────────────────────────────
const virtualLabState = {
  alatId: 1,
  langkah: 0,
  dipilih: null,
  dijalankan: false,
  salah: null,
  pesan: "",
  selesai: false
};

function openVirtualLab(id) {
  const selectedId = Number(id) || virtualLabState.alatId || 1;

  if (document.getElementById("modalOverlay").classList.contains("open")) {
    closeModalBtn();
  }

  showPage("virtualLab", null);
  selectVirtualAlat(selectedId, false);
}

function renderVirtualLabList() {
  const list = document.getElementById("virtualAlatList");
  const searchEl = document.getElementById("vlabSearch");
  const filterEl = document.getElementById("vlabFilter");
  if (!list || !searchEl || !filterEl) return;

  const keyword = searchEl.value.trim().toLowerCase();
  const kategori = filterEl.value;
  const hasil = ALAT.filter(alat => {
    const cocokNama = alat.nama.toLowerCase().includes(keyword);
    const cocokKategori = kategori === "semua" || alat.kat === kategori;
    return cocokNama && cocokKategori;
  });

  document.getElementById("vlabCount").textContent =
    `${hasil.length} dari ${ALAT.length} alat ditampilkan`;

  if (!hasil.length) {
    list.innerHTML = `
      <div class="vlab-list-empty">
        Alat tidak ditemukan. Coba nama atau kategori yang berbeda.
      </div>
    `;
    return;
  }

  list.innerHTML = hasil.map(alat => `
    <button
      class="vlab-tool-btn ${alat.id === virtualLabState.alatId ? "active" : ""}"
      type="button"
      role="option"
      aria-selected="${alat.id === virtualLabState.alatId}"
      onclick="selectVirtualAlat(${alat.id})"
    >
      <img class="vlab-tool-thumb" src="${alat.icon}" alt="" aria-hidden="true">
      <span class="vlab-tool-copy">
        <span class="vlab-tool-name">${alat.nama}</span>
        <span class="vlab-tool-cat">${catLabel(alat.kat)}</span>
      </span>
      <span class="vlab-tool-arrow" aria-hidden="true">›</span>
    </button>
  `).join("");
}

function selectVirtualAlat(id, scrollWorkspace = true) {
  const alat = ALAT.find(item => item.id === Number(id));
  const panduan = CARA_PENGGUNAAN[Number(id)];
  if (!alat || !panduan) return;

  virtualLabState.alatId = alat.id;
  virtualLabState.langkah = 0;
  virtualLabState.dipilih = null;
  virtualLabState.dijalankan = false;
  virtualLabState.salah = null;
  virtualLabState.pesan = "";
  virtualLabState.selesai = false;

  renderVirtualLabList();
  renderVirtualWorkspace();

  if (scrollWorkspace && window.innerWidth <= 768) {
    document.getElementById("virtualWorkspace")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function getVirtualActionOrder(total, seed) {
  const urutan = Array.from({ length: total }, (_, index) => index);
  let nilai = seed * 97 + 31;

  for (let i = urutan.length - 1; i > 0; i -= 1) {
    nilai = (nilai * 53 + 17) % 997;
    const j = nilai % (i + 1);
    [urutan[i], urutan[j]] = [urutan[j], urutan[i]];
  }
  return urutan;
}

function getVirtualAnimation(alat, stepIndex) {
  if (stepIndex === 0) return "sim-inspect";
  if (alat.id === 24) return "sim-spin";
  if ([10, 20].includes(alat.id)) return "sim-stir";
  if (alat.id === 32) return "sim-grind";
  if ([19, 21, 33].includes(alat.id)) return "sim-heat";
  if ([1, 3, 7, 8, 9, 16, 17, 18].includes(alat.id)) return "sim-pour";
  if ([12, 13, 14, 15].includes(alat.id)) return "sim-measure";
  if ([29, 30, 31].includes(alat.id)) return "sim-wear";
  return "sim-move";
}

function renderVirtualWorkspace() {
  const workspace = document.getElementById("virtualWorkspace");
  const alat = ALAT.find(item => item.id === virtualLabState.alatId);
  const panduan = CARA_PENGGUNAAN[virtualLabState.alatId];
  if (!workspace || !alat || !panduan) return;

  const index = Math.min(virtualLabState.langkah, panduan.langkah.length - 1);
  const langkah = panduan.langkah[index];
  const jumlahSelesai = virtualLabState.selesai
    ? panduan.langkah.length
    : index + (virtualLabState.dijalankan ? 1 : 0);
  const persentase = Math.round((jumlahSelesai / panduan.langkah.length) * 100);
  const tombolBerikutnya = index === panduan.langkah.length - 1
    ? "✓ Selesaikan simulasi"
    : "Langkah berikutnya →";
  const aksiBenarDipilih = virtualLabState.dipilih === index;
  const kelasAnimasi = virtualLabState.dijalankan
    ? `${getVirtualAnimation(alat, index)} sim-running`
    : "";
  const urutanAksi = getVirtualActionOrder(panduan.langkah.length, alat.id);
  const statusTeks = virtualLabState.dijalankan
    ? "Tahap berhasil dijalankan"
    : aksiBenarDipilih
      ? "Tindakan siap dijalankan"
      : "Menunggu pilihan tindakan";
  const statusKelas = virtualLabState.dijalankan
    ? "success"
    : aksiBenarDipilih
      ? "ready"
      : "";

  workspace.innerHTML = `
    <div class="vlab-workspace-head">
      <div>
        <div class="vlab-eyebrow">${catLabel(alat.kat)}</div>
        <h2 class="vlab-workspace-name">${alat.nama}</h2>
        <p class="vlab-purpose">${panduan.tujuan}</p>
      </div>
    </div>

    <div class="vlab-body">
      <div class="vlab-meta-grid">
        <div class="vlab-meta-card">
          <span class="vlab-meta-label">Sebelum mulai</span>
          <div class="vlab-meta-value">${panduan.persiapan}</div>
        </div>
        <div class="vlab-meta-card">
          <span class="vlab-meta-label">Jumlah langkah</span>
          <div class="vlab-meta-value">${panduan.langkah.length} tahap penggunaan</div>
        </div>
      </div>

      <div class="vlab-progress-top">
        <span class="vlab-progress-label">Progres simulasi</span>
        <span class="vlab-progress-count">${jumlahSelesai} dari ${panduan.langkah.length} tahap selesai</span>
      </div>
      <div
        class="vlab-progress-track"
        role="progressbar"
        aria-label="Progres simulasi"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${persentase}"
      >
        <div class="vlab-progress-bar" style="width:${persentase}%"></div>
      </div>

      <section class="vlab-sim-window" aria-label="Media simulasi ${alat.nama}">
        <div class="vlab-sim-toolbar">
          <div class="vlab-window-dots" aria-hidden="true"><span></span><span></span><span></span></div>
          <span>Media simulasi penggunaan</span>
          <span class="vlab-sim-step">Tahap ${index + 1}/${panduan.langkah.length}</span>
        </div>

        <div class="vlab-stage ${aksiBenarDipilih ? "is-ready" : ""} ${virtualLabState.dijalankan ? "is-complete" : ""}">
          <div class="vlab-grid-lines" aria-hidden="true"></div>
          <div class="vlab-stage-status ${statusKelas}">
            <span class="vlab-status-dot" aria-hidden="true"></span>${statusTeks}
          </div>

          <button
            class="vlab-object ${kelasAnimasi}"
            type="button"
            onclick="runVirtualAction()"
            aria-label="Jalankan tindakan pada ${alat.nama}"
            ${virtualLabState.dijalankan || virtualLabState.selesai ? "disabled" : ""}
          >
            <span class="vlab-object-ring" aria-hidden="true"></span>
            <img src="${alat.icon}" alt="${alat.nama}">
            <span class="vlab-object-hint">
              ${virtualLabState.dijalankan
                ? "✓ Tahap berhasil"
                : aksiBenarDipilih
                  ? "Klik untuk menjalankan"
                  : "Pilih tindakan di bawah"}
            </span>
          </button>

          <div class="vlab-stage-caption">
            <span>Objek aktif</span>
            <strong>${alat.nama}</strong>
          </div>
        </div>

        <div class="vlab-action-panel">
          <div class="vlab-action-heading">
            <div>
              <span class="vlab-action-kicker">Apa yang harus dilakukan sekarang?</span>
              <h3>Pilih tindakan, kemudian klik alat</h3>
            </div>
            <button class="vlab-reset-small" type="button" onclick="restartVirtualLab()">↻ Mulai ulang</button>
          </div>

          <div class="vlab-action-options" role="group" aria-label="Pilihan tindakan">
            ${urutanAksi.map(actionIndex => {
              const action = panduan.langkah[actionIndex];
              const sudahSelesai = actionIndex < index ||
                (actionIndex === index && virtualLabState.dijalankan);
              const sedangDipilih = actionIndex === virtualLabState.dipilih && !virtualLabState.dijalankan;
              const salahDipilih = actionIndex === virtualLabState.salah;
              return `
                <button
                  class="vlab-action-btn ${sudahSelesai ? "done" : ""} ${sedangDipilih ? "selected" : ""} ${salahDipilih ? "wrong" : ""}"
                  type="button"
                  onclick="chooseVirtualAction(${actionIndex})"
                  ${sudahSelesai || virtualLabState.dijalankan || virtualLabState.selesai ? "disabled" : ""}
                >
                  <span>${sudahSelesai ? "✓" : "○"}</span>${action.judul}
                </button>
              `;
            }).join("")}
          </div>

          <div class="vlab-feedback ${virtualLabState.dijalankan ? "success" : virtualLabState.salah !== null ? "wrong" : aksiBenarDipilih ? "ready" : ""}" role="status">
            ${virtualLabState.dijalankan
              ? `✓ Benar! <strong>${langkah.judul}</strong> telah disimulasikan pada alat.`
              : virtualLabState.pesan || "Pilih tindakan yang sesuai dengan urutan penggunaan alat."}
          </div>
        </div>
      </section>

      <div class="vlab-instruction ${virtualLabState.dijalankan ? "revealed" : ""}">
        <div class="vlab-instruction-number">${index + 1}</div>
        <div>
          <span>${virtualLabState.dijalankan ? "Penjelasan tahap" : "Misi tahap ini"}</span>
          <h3>${virtualLabState.dijalankan ? langkah.judul : "Tentukan tindakan berikutnya"}</h3>
          <p>${virtualLabState.dijalankan
            ? langkah.detail
            : "Amati alat dan pilih satu tindakan yang paling tepat untuk melanjutkan prosedur penggunaan."}</p>
        </div>
      </div>

      <div class="vlab-safety">
        <span aria-hidden="true">⚠️</span>
        <div><strong>Catatan K3:</strong> ${panduan.k3}</div>
      </div>

      ${virtualLabState.selesai ? `
        <div class="vlab-complete" role="status">
          🎉 Simulasi ${alat.nama} selesai. Ulangi langkah sampai urutannya benar-benar dipahami sebelum melakukan praktikum nyata.
        </div>
      ` : ""}

      <div class="vlab-controls">
        <button
          class="vlab-btn vlab-btn-secondary"
          type="button"
          onclick="previousVirtualStep()"
          ${index === 0 && !virtualLabState.selesai ? "disabled" : ""}
        >
          ← Sebelumnya
        </button>
        ${virtualLabState.selesai ? `
          <button class="vlab-btn vlab-btn-primary" type="button" onclick="restartVirtualLab()">
            ↻ Ulangi simulasi
          </button>
        ` : `
          <button class="vlab-btn vlab-btn-primary" type="button" onclick="nextVirtualStep()">
            ${tombolBerikutnya}
          </button>
        `}
      </div>
    </div>
  `;
}

function chooseVirtualAction(actionIndex) {
  if (virtualLabState.selesai || virtualLabState.dijalankan) return;

  if (Number(actionIndex) === virtualLabState.langkah) {
    virtualLabState.dipilih = Number(actionIndex);
    virtualLabState.salah = null;
    virtualLabState.pesan = "Pilihan benar. Sekarang klik gambar alat untuk menjalankan tindakan.";
  } else {
    virtualLabState.dipilih = null;
    virtualLabState.salah = Number(actionIndex);
    virtualLabState.pesan = "Belum tepat. Perhatikan urutan kerja, lalu pilih tindakan lain.";
  }
  renderVirtualWorkspace();
}

function runVirtualAction() {
  if (virtualLabState.selesai || virtualLabState.dijalankan) return;

  if (virtualLabState.dipilih !== virtualLabState.langkah) {
    virtualLabState.pesan = "Pilih tindakan yang benar terlebih dahulu sebelum mengklik alat.";
    virtualLabState.salah = null;
    renderVirtualWorkspace();
    return;
  }

  virtualLabState.dijalankan = true;
  virtualLabState.salah = null;
  virtualLabState.pesan = "";
  renderVirtualWorkspace();
}

function nextVirtualStep() {
  const panduan = CARA_PENGGUNAAN[virtualLabState.alatId];
  if (!panduan) return;

  if (!virtualLabState.dijalankan) {
    virtualLabState.pesan = "Selesaikan simulasi tahap ini terlebih dahulu.";
    renderVirtualWorkspace();
    return;
  }

  if (virtualLabState.langkah < panduan.langkah.length - 1) {
    virtualLabState.langkah += 1;
    virtualLabState.dipilih = null;
    virtualLabState.dijalankan = false;
    virtualLabState.salah = null;
    virtualLabState.pesan = "";
  } else {
    virtualLabState.selesai = true;
  }
  renderVirtualWorkspace();
}

function previousVirtualStep() {
  if (virtualLabState.selesai) {
    virtualLabState.selesai = false;
  } else if (virtualLabState.langkah > 0) {
    virtualLabState.langkah -= 1;
    virtualLabState.dipilih = null;
    virtualLabState.dijalankan = false;
    virtualLabState.salah = null;
    virtualLabState.pesan = "";
  }
  renderVirtualWorkspace();
}

function restartVirtualLab() {
  virtualLabState.langkah = 0;
  virtualLabState.dipilih = null;
  virtualLabState.dijalankan = false;
  virtualLabState.salah = null;
  virtualLabState.pesan = "";
  virtualLabState.selesai = false;
  renderVirtualWorkspace();
}

// ─────────────────────────────────────────────
// MESIN MINI-SIMULASI YANG DAPAT DIMAINKAN
// Tujuh pola interaksi digunakan untuk 33 alat.
// ─────────────────────────────────────────────
const SIMULASI_ALAT = {
  1:  { mode: "level", sample: "Air berwarna", control: "Volume cairan", target: 60, max: 100, step: 1, tolerance: 2, unit: "mL" },
  2:  { mode: "mix", sample: "Larutan + zat", control: "Kecepatan aduk", target: 82, unit: "% homogen" },
  3:  { mode: "transfer", sample: "Larutan", source: "Wadah sumber", destination: "Wadah tujuan" },
  4:  { mode: "heat", sample: "Sampel cair", control: "Besar pemanasan", target: 72, max: 100, unit: "°C" },
  5:  { mode: "mix", sample: "Larutan titrasi", control: "Kecepatan menggoyang", target: 80, unit: "% homogen" },
  6:  { mode: "measure", sample: "Padatan", result: 2.35, unit: "g", display: "Massa sampel" },
  7:  { mode: "level", sample: "Titran", control: "Volume titran keluar", target: 22.5, max: 50, step: 0.1, tolerance: 0.3, unit: "mL" },
  8:  { mode: "level", sample: "Pelarut", control: "Volume larutan", target: 100, max: 120, step: 1, tolerance: 1, unit: "mL" },
  9:  { mode: "process", sample: "Dua fase cair", control: "Intensitas ekstraksi", target: 100, unit: "% terpisah" },
  10: { mode: "mix", sample: "Larutan", control: "Kecepatan pengadukan", target: 85, unit: "% homogen" },
  11: { mode: "process", sample: "Sampel lembap", control: "Daya pengeringan", target: 100, unit: "% kering" },
  12: { mode: "measure", sample: "Serbuk NaCl", result: 1.2473, unit: "g", display: "Massa sampel" },
  13: { mode: "measure", sample: "Larutan hangat", result: 48.6, unit: "°C", display: "Suhu larutan" },
  14: { mode: "measure", sample: "Larutan uji", result: 4.72, unit: "pH", display: "Nilai pH", requiresCal: true },
  15: { mode: "measure", sample: "Kuvet sampel", result: 0.684, unit: "A", display: "Absorbansi", requiresCal: true },
  16: { mode: "level", sample: "Reagen", control: "Jumlah tetes", target: 8, max: 15, step: 1, tolerance: 0, unit: "tetes" },
  17: { mode: "level", sample: "Larutan", control: "Volume terambil", target: 10, max: 12, step: 0.1, tolerance: 0.1, unit: "mL" },
  18: { mode: "level", sample: "Larutan", control: "Volume terambil", target: 7.5, max: 10, step: 0.1, tolerance: 0.1, unit: "mL" },
  19: { mode: "heat", sample: "Nyala Bunsen", control: "Bukaan udara", target: 88, max: 100, unit: "% nyala biru" },
  20: { mode: "mix", sample: "Larutan + stir bar", control: "Kecepatan putar", target: 90, unit: "% homogen" },
  21: { mode: "heat", sample: "Labu dasar bulat", control: "Daya mantel", target: 78, max: 100, unit: "°C" },
  22: { mode: "transfer", sample: "Tabung panas", source: "Tabung reaksi", destination: "Area pemanasan" },
  23: { mode: "transfer", sample: "Krus panas", source: "Krus", destination: "Alas tahan panas" },
  24: { mode: "process", sample: "Tabung seimbang", control: "Kecepatan rotor", target: 100, unit: "% terpisah" },
  25: { mode: "transfer", sample: "Padatan", source: "Botol reagen", destination: "Wadah timbang" },
  26: { mode: "transfer", sample: "Buret", source: "Buret", destination: "Posisi tegak pada statif" },
  27: { mode: "transfer", sample: "Tabung reaksi", source: "Tabung", destination: "Lubang rak" },
  28: { mode: "safety", scenario: "Botol H₂SO₄ pekat memiliki simbol korosif. Pilih tindakan yang tepat.", options: ["Pegang tanpa sarung tangan", "Gunakan goggles dan sarung tangan tahan kimia", "Dekatkan ke nyala api"], correct: 1 },
  29: { mode: "safety", sample: "Jas laboratorium", destination: "Tubuh pengguna" },
  30: { mode: "safety", sample: "Kacamata lab", destination: "Area mata" },
  31: { mode: "safety", sample: "Sarung tangan", destination: "Tangan pengguna" },
  32: { mode: "mix", sample: "Padatan", control: "Kecepatan gerus", target: 88, unit: "% halus" },
  33: { mode: "heat", sample: "Beaker di atas kasa", control: "Daya pemanasan", target: 70, max: 100, unit: "°C" }
};

// Kondisi yang benar-benar diamati siswa pada awal, selama proses, dan setelah alat digunakan.
const TRANSFORMASI_ALAT = {
  1:  { preset: "volume", before: "Gelas ukur kosong", process: "Permukaan cairan naik", after: "Meniskus tepat 60 mL", observe: "Baca bagian bawah meniskus sejajar dengan mata." },
  2:  { preset: "solution", before: "Zat masih terpisah", process: "Partikel mulai menyebar", after: "Larutan homogen", observe: "Warna dan partikel menjadi merata di seluruh larutan." },
  3:  { preset: "liquid-transfer", before: "Pipet kosong di atas sumber", process: "Filler mengaspirasi cairan ke pipet", after: "Pipet mengalirkan cairan ke wadah tujuan", observe: "Pipet tetap tegak saat aspirasi; meniskus dan aliran berubah nyata selama pemindahan." },
  4:  { preset: "heated-liquid", before: "Tabung miring, cairan masih tenang", process: "Bagian bawah tabung disapu melintasi nyala; gelembung muncul", after: "Sampel mencapai 72 °C dan beruap", observe: "Api mengenai bagian bawah yang berisi cairan; penjepit tetap di sepertiga atas dan jauh dari nyala." },
  5:  { preset: "titration", before: "Titran belum tercampur", process: "Seluruh labu bergerak dan cairan berpusar", after: "Campuran merata", observe: "Badan labu, skala, meniskus, dan cairan bergerak bersama; permukaan cairan tetap menunjukkan efek gelombang." },
  6:  { preset: "mass", before: "Padatan belum ditimbang", process: "Angka neraca menstabil", after: "Massa terbaca 2,35 g", observe: "Kaca arloji menahan padatan agar tidak menyentuh neraca langsung." },
  7:  { preset: "burette", before: "Buret penuh dan stopcock tertutup", process: "Stopcock berputar; meniskus turun dan titran menetes", after: "22,5 mL terkumpul di Erlenmeyer", observe: "Volume terpakai adalah selisih bacaan awal–akhir, bukan tinggi cairan penerima saja." },
  8:  { preset: "volume", before: "Larutan masih di bawah tanda batas", process: "Pelarut ditambah perlahan", after: "Meniskus tepat pada tanda 100 mL", observe: "Tetes terakhir ditambahkan perlahan agar tidak melewati tanda batas." },
  9:  { preset: "separation", before: "Dua cairan masih keruh bercampur", process: "Batas antarfase mulai terbentuk", after: "Dua lapisan terpisah jelas", observe: "Fase lebih rapat berada di bawah dan dapat dikeluarkan melalui keran." },
  10: { preset: "solution", before: "Padatan mengendap di dasar", process: "Padatan larut saat diaduk", after: "Larutan homogen", observe: "Pengadukan mempercepat penyebaran zat terlarut." },
  11: { preset: "drying", before: "Sampel masih lembap", process: "Uap air diserap desikan", after: "Sampel kering dan stabil", observe: "Desikan menurunkan kelembapan di dalam ruang tertutup." },
  12: { preset: "mass", before: "Neraca belum ditara", process: "Pembacaan sedang menstabil", after: "Massa stabil 1,2473 g", observe: "Pintu neraca ditutup agar angin tidak mengubah hasil." },
  13: { preset: "temperature", before: "Bulb termometer berada di atas sampel", process: "Bulb terendam dan kolom merah naik", after: "Suhu stabil 48,6 °C", observe: "Bulb berada di tengah cairan tanpa menyentuh dasar atau dinding wadah." },
  14: { preset: "ph", before: "Elektroda berada di buffer kalibrasi", process: "Elektroda dibilas, dicelupkan, dan nilai menstabil", after: "pH sampel stabil 4,72", observe: "Bulb serta junction terendam, tetapi tidak menyentuh dasar beaker." },
  15: { preset: "absorbance", before: "Blanko belum diatur", process: "Cahaya melewati kuvet", after: "Absorbansi terbaca 0,684 A", observe: "Sisi bening kuvet harus berada pada jalur cahaya." },
  16: { preset: "drops", before: "Bulb sudah ditekan sebelum ujung dicelupkan", process: "Bulb mengembang lalu mengeluarkan tetes satu per satu", after: "Tepat 8 tetes ditambahkan", observe: "Pipet tegak dan tekanan bulb yang perlahan menghasilkan tetes lebih seragam." },
  17: { preset: "pipette", before: "Pipet volume kosong", process: "Larutan naik menuju tanda batas", after: "Volume tepat 10 mL", observe: "Meniskus disetel tepat pada satu tanda kalibrasi." },
  18: { preset: "pipette", before: "Pipet ukur kosong", process: "Larutan naik melewati skala", after: "Volume 7,5 mL terambil", observe: "Selisih skala awal dan akhir menunjukkan volume yang dipindahkan." },
  19: { preset: "flame", before: "Collar menutup lubang udara; nyala kuning melebar", process: "Collar berputar dan udara bercampur dengan gas", after: "Nyala biru sempit dengan kerucut dalam", observe: "Lubang udara yang tampak terbuka mengubah bentuk dan warna nyala." },
  20: { preset: "vortex", before: "Stir bar dan larutan masih diam", process: "Vorteks terbentuk", after: "Larutan homogen", observe: "Kecepatan dijaga agar vorteks tidak terlalu dalam dan menimbulkan percikan." },
  21: { preset: "heated-liquid", before: "Labu masih bersuhu ruang", process: "Panas menyebar merata", after: "Suhu labu mencapai 78 °C", observe: "Mantel memanaskan permukaan labu lebih merata daripada nyala langsung." },
  22: { preset: "hot-transfer", before: "Rahang terbuka saat pegangan ditekan", process: "Pegangan dilepas; pegas menutup rahang pada bagian atas tabung", after: "Tabung miring dan bergerak di atas nyala", observe: "Penjepit bekerja dengan engsel-pegas; mulut tabung selalu diarahkan menjauhi orang." },
  23: { preset: "hot-transfer", before: "Krus panas masih di pemanas", process: "Tang menjepit badan krus", after: "Krus berada di alas tahan panas", observe: "Benda panas dipindahkan tanpa disentuh tangan." },
  24: { preset: "centrifuge", before: "Suspensi masih keruh", process: "Tabung berputar dan partikel turun", after: "Supernatan dan endapan terbentuk", observe: "Gaya sentrifugal mengumpulkan partikel padat di dasar tabung." },
  25: { preset: "solid-transfer", before: "Botol terbuka; padatan masih di dalam", process: "Spatula mengangkat gundukan kecil secara mendatar", after: "Padatan jatuh ke kaca arloji", observe: "Bilah/sendok tetap bersih dan kelebihan tidak dikembalikan ke botol stok." },
  26: { preset: "mounting", before: "Buret belum terpasang", process: "Klem dikencangkan pada statif", after: "Buret tegak dan stabil", observe: "Posisi vertikal menjaga pembacaan volume tetap akurat." },
  27: { preset: "mounting", before: "Tabung tergeletak di meja", process: "Tabung dimasukkan ke lubang rak", after: "Tabung berdiri stabil", observe: "Rak mencegah tabung berguling, pecah, atau tumpah." },
  28: { preset: "hazard", before: "Bahaya korosif belum direspons", process: "Tindakan aman sedang dipilih", after: "Kulit dan mata terlindungi", observe: "Simbol bahaya menentukan APD dan cara kerja yang diperlukan." },
  29: { preset: "ppe", before: "Tubuh belum terlindungi", process: "Jas laboratorium dikenakan", after: "Pakaian dan kulit tertutup", observe: "Jas menjadi penghalang pertama terhadap percikan bahan kimia." },
  30: { preset: "ppe", before: "Mata belum terlindungi", process: "Kacamata dipasang", after: "Mata terlindungi dari percikan", observe: "Kacamata harus menutup area depan dan samping mata." },
  31: { preset: "ppe", before: "Tangan masih terbuka", process: "Sarung tangan dikenakan", after: "Tangan terlindungi", observe: "Jenis sarung tangan harus sesuai dengan bahan kimia yang ditangani." },
  32: { preset: "grinding", before: "Padatan masih berupa butiran kasar", process: "Butiran pecah saat digerus", after: "Serbuk menjadi halus dan merata", observe: "Gerakan memutar dan menekan memperkecil ukuran partikel." },
  33: { preset: "even-heating", before: "Beaker belum dipanaskan merata", process: "Kasa menyebarkan panas", after: "Cairan mencapai 70 °C", observe: "Kasa mendistribusikan nyala dan menyangga beaker dengan stabil." }
};

let playableLabState = {};
let playableCanvas = null;
let playableContext = null;
let playableToolImage = null;
let playableFrame = null;
let playableLastTime = 0;
let playable3DScene = null;

function renderVirtualWorkspace() {
  const workspace = document.getElementById("virtualWorkspace");
  const alat = ALAT.find(item => item.id === virtualLabState.alatId);
  const panduan = CARA_PENGGUNAAN[virtualLabState.alatId];
  const config = SIMULASI_ALAT[virtualLabState.alatId];
  if (!workspace || !alat || !panduan || !config) return;

  workspace.innerHTML = `
    <div class="vlab-workspace-head playlab-head">
      <div>
        <div class="vlab-eyebrow">${catLabel(alat.kat)} · Mini Simulation</div>
        <h2 class="vlab-workspace-name">${alat.nama}</h2>
        <p class="vlab-purpose">${panduan.tujuan}</p>
      </div>
      <span class="playlab-mode-badge">${playableModeLabel(config.mode)}</span>
    </div>

    <div class="vlab-body playlab-body">
      <section class="playlab-shell" aria-label="Simulasi interaktif ${alat.nama}">
        <div class="playlab-topbar">
          <div>
            <span class="playlab-top-kicker">Tantangan</span>
            <strong>${playableChallengeText(alat, config)}</strong>
          </div>
          <button type="button" class="playlab-reset" onclick="resetPlayableLab()">↻ Reset</button>
        </div>

        <div class="playlab-transformation" id="labTransformation" aria-label="Perubahan kondisi bahan">
          <div class="playlab-state-card is-active" id="labBeforeState">
            <span>Sebelum</span>
            <strong>${TRANSFORMASI_ALAT[alat.id].before}</strong>
          </div>
          <div class="playlab-change-flow">
            <span id="labPhaseIcon">1</span>
            <div class="playlab-change-track"><i id="labChangeProgress" style="width:0%"></i></div>
            <small id="labPhaseText">Kondisi awal</small>
          </div>
          <div class="playlab-state-card" id="labAfterState">
            <span>Sesudah</span>
            <strong>${TRANSFORMASI_ALAT[alat.id].after}</strong>
          </div>
        </div>

        <div class="playlab-main">
          <div class="playlab-canvas-wrap">
            <div class="playlab-3d-chip"><span></span> WebGL 3D · putar 360°</div>
            <canvas
              id="labCanvas"
              width="900"
              height="500"
              tabindex="0"
              aria-label="Area permainan ${alat.nama}. Seret objek menuju area yang ditandai."
            ></canvas>
            <div class="playlab-canvas-tip" id="labCanvasTip">↻ Seret pada layar untuk memutar alat 3D. Gunakan panel untuk menjalankan prosedur.</div>
          </div>
          <aside class="playlab-controls" id="labControls" aria-label="Panel kontrol simulasi"></aside>
        </div>

        <div class="playlab-status" id="labStatus" role="status" aria-live="polite"></div>
        <div class="playlab-observation">
          <span>🔎 Yang diamati</span>
          <p>${TRANSFORMASI_ALAT[alat.id].observe}</p>
        </div>
      </section>

      <div class="vlab-meta-grid playlab-meta">
        <div class="vlab-meta-card">
          <span class="vlab-meta-label">Sebelum mulai</span>
          <div class="vlab-meta-value">${panduan.persiapan}</div>
        </div>
        <div class="vlab-safety playlab-safety">
          <span aria-hidden="true">⚠️</span>
          <div><strong>Catatan K3:</strong> ${panduan.k3}</div>
        </div>
      </div>

      <section class="playlab-procedure">
        <div class="playlab-procedure-head">
          <div>
            <span>Ringkasan prosedur</span>
            <h3>Cara menggunakan ${alat.nama}</h3>
          </div>
          <span>${panduan.langkah.length} langkah</span>
        </div>
        <ol>
          ${panduan.langkah.map((item, index) => `
            <li>
              <span>${index + 1}</span>
              <div><strong>${item.judul}</strong><p>${item.detail}</p></div>
            </li>
          `).join("")}
        </ol>
      </section>
    </div>
  `;

  initPlayableLab(alat.id);
}

function playableModeLabel(mode) {
  const labels = {
    level: "Atur volume",
    mix: "Campur bahan",
    heat: "Kendalikan panas",
    measure: "Lakukan pengukuran",
    transfer: "Seret dan pindahkan",
    process: "Jalankan alat",
    safety: "Latihan keselamatan"
  };
  return labels[mode] || "Simulasi interaktif";
}

function playableChallengeText(alat, config) {
  if (config.mode === "level") return `Masukkan ${config.sample.toLowerCase()}, lalu capai ${formatPlayableValue(config.target, config)}.`;
  if (config.mode === "mix") return `Masukkan ${config.sample.toLowerCase()} dan capai tingkat ${config.target}${config.unit}.`;
  if (config.mode === "heat") return `Tempatkan ${config.sample.toLowerCase()}, lalu naikkan kondisi hingga ${config.target}${config.unit}.`;
  if (config.mode === "measure") return `Tempatkan ${config.sample.toLowerCase()} dan tampilkan hasil pengukurannya.`;
  if (config.mode === "transfer") return `Gunakan alat untuk memindahkan ${config.sample.toLowerCase()} ke ${config.destination.toLowerCase()}.`;
  if (config.mode === "process") return `Masukkan ${config.sample.toLowerCase()} dan jalankan proses sampai selesai.`;
  if (alat.id === 28) return "Kenali bahaya dan pilih tindakan keselamatan yang benar.";
  return `Seret ${config.sample.toLowerCase()} ke ${config.destination.toLowerCase()}.`;
}

function formatPlayableValue(value, config) {
  const decimals = Number(config.step) < 1 ? 1 : 0;
  return `${Number(value).toFixed(decimals)} ${config.unit}`;
}

function playableTransformation() {
  return TRANSFORMASI_ALAT[playableLabState.alatId] || {
    before: "Kondisi awal",
    process: "Alat sedang digunakan",
    after: "Prosedur selesai",
    observe: "Amati perubahan yang terjadi."
  };
}

function playablePhase() {
  const config = playableLabState.config || {};
  if (playableLabState.done) return "after";
  if (playableLabState.running || playableLabState.measuring || playableLabState.transferStage === 1) return "process";
  if (config.mode === "level" && playableLabState.value > 0) return "process";
  if (playableLabState.placed || playableLabState.calibrated || playableLabState.selectedSafety !== null) return "process";
  return "before";
}

function playableVisualProgress() {
  const config = playableLabState.config || {};
  if (playableLabState.done) return 1;
  if (config.mode === "level") return Math.min(0.96, Math.max(0, playableLabState.value / Math.max(1, config.target)));
  if (config.mode === "heat") return Math.min(0.96, Math.max(0, (playableLabState.value - 25) / Math.max(1, config.target - 25)));
  if (["mix", "process"].includes(config.mode)) return Math.min(0.96, Math.max(0, playableLabState.progress / Math.max(1, config.target)));
  if (config.mode === "measure") {
    if (playableLabState.measuring) return 0.45 + (playableLabState.measureProgress / 100) * 0.5;
    if (playableLabState.placed) return 0.42;
    if (playableLabState.calibrated) return 0.2;
  }
  if (config.mode === "transfer") {
    const eased = playableLabState.transferAnimating
      ? playableLabState.transferMotion * playableLabState.transferMotion * (3 - 2 * playableLabState.transferMotion)
      : 0;
    return Math.min(1, (playableLabState.transferStage + eased) / 2);
  }
  if (config.mode === "safety") return playableLabState.selectedSafety !== null || playableLabState.placed ? 0.5 : 0;
  return playableLabState.placed ? 0.25 : 0;
}

function initPlayableLab(alatId) {
  if (playableFrame) cancelAnimationFrame(playableFrame);
  playableFrame = null;
  playableLastTime = 0;
  if (playable3DScene) playable3DScene.dispose();
  playable3DScene = null;

  const alat = ALAT.find(item => item.id === alatId);
  const config = SIMULASI_ALAT[alatId];
  playableCanvas = document.getElementById("labCanvas");
  if (!alat || !config || !playableCanvas || typeof playableCanvas.getContext !== "function") return;

  playableLabState = {
    alatId,
    config,
    placed: false,
    running: false,
    done: false,
    value: config.mode === "heat" ? 25 : 0,
    power: 0,
    progress: 0,
    calibrated: false,
    measured: false,
    measuring: false,
    measureProgress: 0,
    displayedMeasure: null,
    transferStage: 0,
    transferMotion: 0,
    transferTargetStage: 0,
    transferAnimating: false,
    selectedSafety: null,
    drag: null,
    phase: 0,
    message: playableStartMessage(config)
  };

  const transformasi = TRANSFORMASI_ALAT[alatId];
  if (window.Lab3D && window.Lab3D.isSupported()) {
    try {
      playable3DScene = window.Lab3D.create(playableCanvas, {
        alatId,
        mode: config.mode,
        preset: transformasi.preset
      });
      playableContext = null;
    } catch (error) {
      playable3DScene = null;
      playableContext = playableCanvas.getContext("2d");
    }
  } else {
    playableContext = playableCanvas.getContext("2d");
    const tip = document.getElementById("labCanvasTip");
    if (tip) tip.textContent = "☝ Seret objek pada layar atau gunakan tombol kontrol.";
  }

  playableToolImage = new Image();
  playableToolImage.onload = () => drawPlayableLab();
  playableToolImage.onerror = () => drawPlayableLab();
  playableToolImage.src = alat.icon;

  playableCanvas.addEventListener("pointerdown", playablePointerDown);
  playableCanvas.addEventListener("pointermove", playablePointerMove);
  playableCanvas.addEventListener("pointerup", playablePointerUp);
  playableCanvas.addEventListener("pointercancel", playablePointerUp);

  renderPlayableControls();
  updatePlayableStatus();
  updatePlayableTransformation();
  drawPlayableLab();
}

function playableStartMessage(config) {
  if (config.mode === "transfer") return `Seret alat menuju ${config.source}, lalu pindahkan ke ${config.destination}.`;
  if (config.mode === "safety" && config.options) return config.scenario;
  if (config.mode === "safety") return `Seret ${config.sample} ke ${config.destination}.`;
  return `Seret ${config.sample} dari baki ke area alat untuk memulai.`;
}

function resetPlayableLab() {
  initPlayableLab(virtualLabState.alatId);
}

function renderPlayableControls() {
  const panel = document.getElementById("labControls");
  if (!panel || !playableLabState.config) return;
  const config = playableLabState.config;
  let controls = "";

  if (config.mode === "level") {
    controls = `
      ${playablePlacementButton(config.sample)}
      <label class="playlab-control-group">
        <span>${config.control}</span>
        <output id="labValue">${formatPlayableValue(playableLabState.value, config)}</output>
        <input id="labRange" type="range" min="0" max="${config.max}" step="${config.step}" value="${playableLabState.value}" oninput="setPlayableRange(this.value)" ${playableLabState.placed ? "" : "disabled"}>
      </label>
      <div class="playlab-target">Target <strong>${formatPlayableValue(config.target, config)}</strong></div>
    `;
  } else if (["mix", "heat", "process"].includes(config.mode)) {
    const liveValue = config.mode === "heat"
      ? `${Math.round(playableLabState.value)} ${config.unit}`
      : `${Math.round(playableLabState.progress)}${config.unit}`;
    controls = `
      ${playablePlacementButton(config.sample)}
      <label class="playlab-control-group">
        <span>${config.control}</span>
        <output id="labPower">${Math.round(playableLabState.power)}%</output>
        <input id="labRange" type="range" min="0" max="100" step="1" value="${playableLabState.power}" oninput="setPlayableRange(this.value)" ${playableLabState.placed ? "" : "disabled"}>
      </label>
      <button id="labRunBtn" class="playlab-primary" type="button" onclick="togglePlayableRun()" ${playableLabState.placed && playableLabState.power > 0 && !playableLabState.done ? "" : "disabled"}>
        ${playableLabState.running ? "⏸ Jeda" : "▶ Jalankan"}
      </button>
      <div class="playlab-live-readout"><span>Hasil langsung</span><strong id="labValue">${liveValue}</strong></div>
      <div class="playlab-mini-track"><span id="labMiniProgress" style="width:${playableProgressPercent()}%"></span></div>
    `;
  } else if (config.mode === "measure") {
    controls = `
      ${config.requiresCal ? `
        <button class="playlab-secondary ${playableLabState.calibrated ? "completed" : ""}" type="button" onclick="calibratePlayableLab()" ${playableLabState.calibrated ? "disabled" : ""}>
          ${playableLabState.calibrated ? "✓ Terkalibrasi" : "⚙ Kalibrasi alat"}
        </button>
      ` : ""}
      ${playablePlacementButton(config.sample)}
      <button class="playlab-primary" type="button" onclick="measurePlayableSample()" ${playableLabState.placed && (!config.requiresCal || playableLabState.calibrated) && !playableLabState.done && !playableLabState.measuring ? "" : "disabled"}>
        ${playableLabState.measuring ? "◌ Menstabilkan pembacaan..." : "◎ Mulai pengukuran"}
      </button>
      <div class="playlab-digital">
        <span>${config.display}</span>
        <strong id="labValue">${playableMeasureText()}</strong>
      </div>
    `;
  } else if (config.mode === "transfer") {
    const label = playableLabState.transferAnimating
      ? "Memindahkan alat..."
      : playableLabState.transferStage === 0
      ? `1. Ambil dari ${config.source}`
      : playableLabState.transferStage === 1
        ? `2. Pindahkan ke ${config.destination}`
        : "✓ Pemindahan selesai";
    controls = `
      <div class="playlab-instruction-card">
        <span>Kontrol pemindahan</span>
        <p>Seret gambar alat pada layar. Tombol ini dapat digunakan sebagai alternatif.</p>
      </div>
      <button class="playlab-primary" type="button" onclick="quickPlayablePlacement()" ${playableLabState.done || playableLabState.transferAnimating ? "disabled" : ""}>${label}</button>
      <div class="playlab-stage-chips">
        <span class="${playableLabState.transferStage > 0 ? "done" : "active"}">Ambil</span>
        <span class="${playableLabState.transferStage > 1 ? "done" : playableLabState.transferStage === 1 ? "active" : ""}">Pindahkan</span>
      </div>
    `;
  } else if (config.mode === "safety" && config.options) {
    controls = `
      <div class="playlab-scenario">${config.scenario}</div>
      <div class="playlab-choice-list">
        ${config.options.map((option, index) => `
          <button
            class="playlab-choice ${playableLabState.selectedSafety === index ? (index === config.correct ? "correct" : "wrong") : ""}"
            type="button"
            onclick="choosePlayableSafety(${index})"
            ${playableLabState.done ? "disabled" : ""}
          >${option}</button>
        `).join("")}
      </div>
    `;
  } else if (config.mode === "safety") {
    controls = `
      <div class="playlab-instruction-card">
        <span>Pasang APD</span>
        <p>Seret gambar APD menuju area tubuh yang ditandai.</p>
      </div>
      <button class="playlab-primary" type="button" onclick="quickPlayablePlacement()" ${playableLabState.done ? "disabled" : ""}>
        ${playableLabState.done ? "✓ APD terpasang" : `Kenakan ${config.sample}`}
      </button>
    `;
  }

  panel.innerHTML = `
    <div class="playlab-control-title">
      <span>Panel kontrol</span>
      <strong>${playableModeLabel(config.mode)}</strong>
    </div>
    ${controls}
  `;
}

function playablePlacementButton(label) {
  return `
    <button class="playlab-secondary ${playableLabState.placed ? "completed" : ""}" type="button" onclick="quickPlayablePlacement()" ${playableLabState.placed ? "disabled" : ""}>
      ${playableLabState.placed ? `✓ ${label} sudah ditempatkan` : `＋ Masukkan ${label}`}
    </button>
  `;
}

function playableProgressPercent() {
  const config = playableLabState.config || {};
  if (playableLabState.done) return 100;
  if (config.mode === "heat") return Math.min(100, Math.max(0, ((playableLabState.value - 25) / (config.target - 25)) * 100));
  return Math.min(100, Math.max(0, playableLabState.progress || 0));
}

function playableMeasureText() {
  const config = playableLabState.config || {};
  if (playableLabState.measured) return `${config.result} ${config.unit}`;
  if (playableLabState.measuring && Number.isFinite(playableLabState.displayedMeasure)) {
    const decimals = String(config.result).includes(".") ? String(config.result).split(".")[1].length : 0;
    return `${playableLabState.displayedMeasure.toFixed(decimals)} ${config.unit}`;
  }
  return `— ${config.unit || ""}`;
}

function setPlayableRange(rawValue) {
  const config = playableLabState.config;
  const value = Number(rawValue);
  if (!config || !playableLabState.placed) return;

  if (config.mode === "level") {
    playableLabState.value = value;
    const tepat = Math.abs(value - config.target) <= config.tolerance;
    playableLabState.done = tepat;
    playableLabState.message = tepat
      ? `Tepat! Nilai sudah mencapai ${formatPlayableValue(config.target, config)}.`
      : value > config.target
        ? "Volume melewati target. Kurangi perlahan hingga tepat."
        : "Volume masih kurang. Tambahkan cairan secara bertahap.";
  } else {
    playableLabState.power = value;
    playableLabState.message = value > 0
      ? "Kontrol sudah diatur. Tekan Jalankan untuk melihat perubahan."
      : "Geser kontrol ke kanan untuk memberi daya pada alat.";
  }

  renderPlayableControls();
  updatePlayableStatus();
  updatePlayableTransformation();
  drawPlayableLab();
}

function quickPlayablePlacement() {
  const config = playableLabState.config;
  if (!config || playableLabState.done) return;

  if (config.mode === "transfer") {
    advancePlayableTransfer();
    return;
  }
  if (config.mode === "safety") {
    playableLabState.done = true;
    playableLabState.placed = true;
    playableLabState.message = `${config.sample} telah dipasang pada ${config.destination}.`;
  } else {
    playableLabState.placed = true;
    playableLabState.message = `${config.sample} sudah berada pada alat. Atur kontrol berikutnya.`;
  }

  renderPlayableControls();
  updatePlayableStatus();
  drawPlayableLab();
}

function togglePlayableRun() {
  const config = playableLabState.config;
  if (!config || !playableLabState.placed || playableLabState.power <= 0 || playableLabState.done) return;
  playableLabState.running = !playableLabState.running;
  playableLabState.message = playableLabState.running
    ? "Simulasi berjalan. Amati perubahan nilai dan gerakan alat."
    : "Simulasi dijeda. Ubah kontrol atau lanjutkan kembali.";
  renderPlayableControls();
  updatePlayableStatus();
  drawPlayableLab();
  if (playableLabState.running) startPlayableLoop();
}

function calibratePlayableLab() {
  playableLabState.calibrated = true;
  playableLabState.message = "Kalibrasi selesai. Sekarang tempatkan sampel pada alat.";
  renderPlayableControls();
  updatePlayableStatus();
  drawPlayableLab();
}

function measurePlayableSample() {
  const config = playableLabState.config;
  if (!config || !playableLabState.placed || playableLabState.measuring || (config.requiresCal && !playableLabState.calibrated)) return;
  playableLabState.measuring = true;
  playableLabState.running = true;
  playableLabState.measureProgress = 0;
  playableLabState.displayedMeasure = Number(config.result) * 0.72;
  playableLabState.message = "Alat sedang membaca sampel. Amati angka yang bergerak hingga stabil.";
  renderPlayableControls();
  updatePlayableStatus();
  drawPlayableLab();
  startPlayableLoop();
}

function choosePlayableSafety(index) {
  const config = playableLabState.config;
  if (!config || !config.options || playableLabState.done) return;
  playableLabState.selectedSafety = Number(index);
  if (Number(index) === config.correct) {
    playableLabState.done = true;
    playableLabState.message = "Benar. APD dan tindakan tersebut sesuai untuk bahaya korosif.";
  } else {
    playableLabState.message = "Belum tepat. Pilih tindakan yang paling melindungi mata dan kulit.";
  }
  renderPlayableControls();
  updatePlayableStatus();
  drawPlayableLab();
}

function advancePlayableTransfer() {
  const config = playableLabState.config;
  if (!config || playableLabState.done || playableLabState.transferAnimating) return;
  playableLabState.transferTargetStage = Math.min(2, playableLabState.transferStage + 1);
  playableLabState.transferMotion = 0;
  playableLabState.transferAnimating = true;
  playableLabState.running = true;
  playableLabState.message = playableLabState.transferTargetStage === 1
    ? `${config.sample} sedang diambil dari ${config.source}.`
    : `${config.sample} sedang dipindahkan menuju ${config.destination}.`;
  renderPlayableControls();
  updatePlayableStatus();
  drawPlayableLab();
  startPlayableLoop();
}

function startPlayableLoop() {
  if (playableFrame) return;
  playableLastTime = performance.now();
  playableFrame = requestAnimationFrame(playableTick);
}

function playableTick(timestamp) {
  const delta = Math.min(0.05, (timestamp - playableLastTime) / 1000 || 0);
  playableLastTime = timestamp;
  const config = playableLabState.config;
  if (!config || !playableLabState.running) {
    playableFrame = null;
    return;
  }

  playableLabState.phase += delta * (1 + playableLabState.power / 18);
  if (config.mode === "transfer" && playableLabState.transferAnimating) {
    playableLabState.transferMotion = Math.min(1, playableLabState.transferMotion + delta * 1.05);
    if (playableLabState.transferMotion >= 1) {
      playableLabState.transferStage = playableLabState.transferTargetStage;
      playableLabState.transferAnimating = false;
      playableLabState.running = false;
      playableLabState.transferMotion = 0;
      playableLabState.done = playableLabState.transferStage >= 2;
      playableLabState.message = playableLabState.done
        ? `Berhasil! ${config.sample} telah dipindahkan ke ${config.destination}.`
        : `${config.sample} sudah diambil dari ${config.source}. Sekarang pindahkan ke ${config.destination}.`;
      playableFrame = null;
      renderPlayableControls();
      updatePlayableStatus();
      updatePlayableTransformation();
      drawPlayableLab(timestamp);
      return;
    }
  } else if (config.mode === "measure" && playableLabState.measuring) {
    playableLabState.measureProgress += 58 * delta;
    const remaining = Math.max(0, 1 - playableLabState.measureProgress / 100);
    const wobble = Math.sin(playableLabState.measureProgress * 0.34) * Number(config.result) * 0.035 * remaining;
    playableLabState.displayedMeasure = Number(config.result) * (1 - remaining * 0.28) + wobble;
    if (playableLabState.measureProgress >= 100) {
      playableLabState.measureProgress = 100;
      playableLabState.displayedMeasure = Number(config.result);
      playableLabState.measured = true;
      playableLabState.measuring = false;
      playableLabState.done = true;
    }
  } else if (config.mode === "heat") {
    playableLabState.value += (playableLabState.power / 100) * 18 * delta;
    if (playableLabState.value >= config.target) {
      playableLabState.value = config.target;
      playableLabState.done = true;
    }
  } else {
    playableLabState.progress += (playableLabState.power / 100) * 30 * delta;
    if (playableLabState.progress >= config.target) {
      playableLabState.progress = config.target;
      playableLabState.done = true;
    }
  }

  if (playableLabState.done) {
    playableLabState.running = false;
    playableLabState.message = config.mode === "measure"
      ? `Pengukuran stabil: ${config.display} adalah ${config.result} ${config.unit}.`
      : config.mode === "heat"
        ? `Target tercapai pada ${Math.round(playableLabState.value)} ${config.unit}.`
        : "Proses selesai. Kondisi sampel telah mencapai target.";
    playableFrame = null;
    renderPlayableControls();
    updatePlayableStatus();
    drawPlayableLab(timestamp);
    return;
  }

  updatePlayableReadings();
  updatePlayableTransformation();
  drawPlayableLab(timestamp);
  playableFrame = requestAnimationFrame(playableTick);
}

function updatePlayableReadings() {
  const config = playableLabState.config;
  const valueEl = document.getElementById("labValue");
  const progressEl = document.getElementById("labMiniProgress");
  if (valueEl && config) {
    valueEl.textContent = config.mode === "measure"
      ? playableMeasureText()
      : config.mode === "heat"
        ? `${Math.round(playableLabState.value)} ${config.unit}`
        : `${Math.round(playableLabState.progress)}${config.unit}`;
  }
  if (progressEl) progressEl.style.width = `${playableProgressPercent()}%`;
}

function updatePlayableStatus() {
  const status = document.getElementById("labStatus");
  if (!status) return;
  status.className = `playlab-status ${playableLabState.done ? "success" : playableLabState.running ? "running" : ""}`;
  status.innerHTML = `
    <span class="playlab-status-icon">${playableLabState.done ? "✓" : playableLabState.running ? "●" : "i"}</span>
    <div><strong>${playableLabState.done ? "Tantangan selesai" : playableLabState.running ? "Simulasi sedang berjalan" : "Petunjuk"}</strong><p>${playableLabState.message}</p></div>
  `;
  updatePlayableTransformation();
}

function updatePlayableTransformation() {
  const beforeCard = document.getElementById("labBeforeState");
  const afterCard = document.getElementById("labAfterState");
  const phaseIcon = document.getElementById("labPhaseIcon");
  const phaseText = document.getElementById("labPhaseText");
  const progress = document.getElementById("labChangeProgress");
  if (!beforeCard || !afterCard || !phaseIcon || !phaseText || !progress) return;

  const phase = playablePhase();
  const transformasi = playableTransformation();
  const labels = {
    before: ["1", "Kondisi awal"],
    process: ["2", transformasi.process],
    after: ["✓", "Perubahan selesai"]
  };
  beforeCard.classList.toggle("is-active", phase === "before");
  beforeCard.classList.toggle("is-complete", phase !== "before");
  afterCard.classList.toggle("is-active", phase === "after");
  phaseIcon.textContent = labels[phase][0];
  phaseText.textContent = labels[phase][1];
  progress.style.width = `${Math.round(playableVisualProgress() * 100)}%`;
}

function playablePointerPosition(event) {
  const rect = playableCanvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (playableCanvas.width / rect.width),
    y: (event.clientY - rect.top) * (playableCanvas.height / rect.height)
  };
}

function playablePointerDown(event) {
  if (playable3DScene) {
    playable3DScene.pointerDown(event);
    return;
  }
  const config = playableLabState.config;
  if (!config || playableLabState.done || (config.mode === "safety" && config.options)) return;
  const point = playablePointerPosition(event);
  const position = playableDraggablePosition();
  const distance = Math.hypot(point.x - position.x, point.y - position.y);
  const canDrag = config.mode === "transfer" || config.mode === "safety" || !playableLabState.placed;
  if (!canDrag || distance > 105) return;

  playableLabState.drag = { x: point.x, y: point.y };
  playableCanvas.setPointerCapture?.(event.pointerId);
  drawPlayableLab();
}

function playablePointerMove(event) {
  if (playable3DScene) {
    playable3DScene.pointerMove(event);
    return;
  }
  if (!playableLabState.drag) return;
  const point = playablePointerPosition(event);
  playableLabState.drag.x = point.x;
  playableLabState.drag.y = point.y;
  drawPlayableLab();
}

function playablePointerUp(event) {
  if (playable3DScene) {
    playable3DScene.pointerUp(event);
    return;
  }
  if (!playableLabState.drag) return;
  const point = playablePointerPosition(event);
  playableLabState.drag = null;
  const config = playableLabState.config;
  const target = playableDropTarget();
  const inside = Math.hypot(point.x - target.x, point.y - target.y) <= target.radius;

  if (inside) {
    if (config.mode === "transfer") advancePlayableTransfer();
    else if (config.mode === "safety") quickPlayablePlacement();
    else quickPlayablePlacement();
  } else {
    playableLabState.message = "Objek belum berada pada area yang tepat. Coba seret ke lingkaran sasaran.";
    updatePlayableStatus();
    drawPlayableLab();
  }
}

function playableDraggablePosition() {
  const config = playableLabState.config || {};
  if (playableLabState.drag) return playableLabState.drag;
  if (config.mode === "transfer") {
    if (playableLabState.transferStage === 1) return { x: 360, y: 255 };
    if (playableLabState.transferStage >= 2) return { x: 720, y: 255 };
  }
  if (config.mode === "safety" && playableLabState.done) return { x: 680, y: 255 };
  return { x: 145, y: 255 };
}

function playableDropTarget() {
  const config = playableLabState.config || {};
  if (config.mode === "transfer") {
    return playableLabState.transferStage === 0
      ? { x: 360, y: 255, radius: 115 }
      : { x: 720, y: 255, radius: 120 };
  }
  if (config.mode === "safety") return { x: 680, y: 255, radius: 135 };
  return { x: 625, y: 255, radius: 145 };
}

function drawPlayableLab(timestamp = performance.now()) {
  if (playable3DScene && playableLabState.config) {
    playable3DScene.update(playableLabState, playableLabState.config, playableTransformation(), timestamp);
    playable3DScene.render();
    return;
  }
  if (!playableContext || !playableCanvas || !playableLabState.config) return;
  const ctx = playableContext;
  const config = playableLabState.config;
  const alat = ALAT.find(item => item.id === playableLabState.alatId);
  ctx.clearRect(0, 0, playableCanvas.width, playableCanvas.height);

  const background = ctx.createLinearGradient(0, 0, 0, 500);
  background.addColorStop(0, "#d8f4ef");
  background.addColorStop(0.69, "#f8fffd");
  background.addColorStop(0.691, "#8bc7ba");
  background.addColorStop(1, "#5fa99c");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, 900, 500);

  ctx.strokeStyle = "rgba(0, 98, 88, 0.075)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= 900; x += 45) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 350); ctx.stroke();
  }
  for (let y = 0; y <= 350; y += 45) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(900, y); ctx.stroke();
  }

  ctx.fillStyle = "rgba(255,255,255,0.58)";
  playableRoundRect(ctx, 22, 16, 162, 34, 17);
  ctx.fill();
  ctx.fillStyle = "rgba(5, 62, 54, 0.78)";
  ctx.font = "800 13px Nunito, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("MEJA PRAKTIKUM", 39, 38);

  drawPlayablePhaseChip(ctx);

  if (config.mode === "transfer") drawPlayableTransferScene(ctx, config, alat);
  else if (config.mode === "safety") drawPlayableSafetyScene(ctx, config, alat);
  else drawPlayableInstrumentScene(ctx, config, alat, timestamp);

  if (playableLabState.done) drawPlayableSuccess(ctx);
}

function playableRoundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawPlayablePhaseChip(ctx) {
  const phase = playablePhase();
  const transformasi = playableTransformation();
  const label = phase === "after" ? "SESUDAH" : phase === "process" ? "SEDANG BERUBAH" : "SEBELUM";
  const color = phase === "after" ? "#207a3a" : phase === "process" ? "#9a6a00" : "#006d61";
  const fill = phase === "after" ? "rgba(225,248,224,0.94)" : phase === "process" ? "rgba(255,246,196,0.94)" : "rgba(224,248,243,0.94)";
  ctx.save();
  ctx.fillStyle = fill;
  playableRoundRect(ctx, 616, 15, 258, 54, 16);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.42;
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.fillStyle = color;
  ctx.font = "900 11px Nunito, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(label, 632, 34);
  ctx.font = "800 13px Nunito, sans-serif";
  const stateText = phase === "after" ? transformasi.after : phase === "process" ? transformasi.process : transformasi.before;
  ctx.fillText(shortPlayableText(stateText, 29), 632, 54);
  ctx.restore();
}

function shortPlayableText(text, maxLength) {
  const value = String(text || "");
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;
}

function playableLerp(start, end, amount) {
  return start + (end - start) * Math.max(0, Math.min(1, amount));
}

function playableMixColor(start, end, amount, alpha = 1) {
  const p = Math.max(0, Math.min(1, amount));
  const rgb = start.map((channel, index) => Math.round(playableLerp(channel, end[index], p)));
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
}

function drawPlayableGlass(ctx, x, y, width, height, fillRatio, colors = ["#67d9e8", "#168ec5"], surfaceWave = 0) {
  const ratio = Math.max(0, Math.min(1, fillRatio));
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.38)";
  ctx.strokeStyle = "rgba(10,103,93,0.68)";
  ctx.lineWidth = 3;
  playableRoundRect(ctx, x, y, width, height, Math.min(18, width * 0.16));
  ctx.fill();
  ctx.stroke();
  playableRoundRect(ctx, x + 6, y + 6, width - 12, height - 12, Math.min(13, width * 0.12));
  ctx.clip();
  const liquidHeight = (height - 12) * ratio;
  const liquidY = y + height - 6 - liquidHeight;
  const gradient = ctx.createLinearGradient(0, liquidY, 0, y + height);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(x + 6, liquidY);
  for (let px = x + 6; px <= x + width - 6; px += 8) {
    ctx.lineTo(px, liquidY + Math.sin((px - x) * 0.12 + playableLabState.phase) * surfaceWave);
  }
  ctx.lineTo(x + width - 6, y + height - 6);
  ctx.lineTo(x + 6, y + height - 6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawPlayableDroplets(ctx, x, startY, endY, count, color = "#32b8cf") {
  ctx.save();
  ctx.fillStyle = color;
  for (let index = 0; index < count; index += 1) {
    const cycle = (playableLabState.phase * 0.45 + index / Math.max(1, count)) % 1;
    const y = playableLerp(startY, endY, cycle);
    ctx.beginPath();
    ctx.ellipse(x + Math.sin(index * 2.4) * 3, y, 4, 7, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawPlayableZone(ctx, x, y, radius, label, active = true) {
  ctx.save();
  ctx.setLineDash([10, 8]);
  ctx.lineWidth = 3;
  ctx.strokeStyle = active ? "rgba(0, 125, 112, 0.72)" : "rgba(50, 90, 84, 0.28)";
  ctx.fillStyle = active ? "rgba(0, 180, 162, 0.07)" : "rgba(255,255,255,0.18)";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = active ? "#006d61" : "#66827d";
  ctx.font = "800 14px Nunito, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, x, y + radius + 26);
  ctx.restore();
}

function drawPlayableTool(ctx, x, y, width, height, alat) {
  ctx.save();
  ctx.shadowColor = "rgba(0, 70, 62, 0.28)";
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 12;
  if (playableToolImage && playableToolImage.complete && playableToolImage.naturalWidth) {
    const scale = Math.min(width / playableToolImage.naturalWidth, height / playableToolImage.naturalHeight);
    const drawW = playableToolImage.naturalWidth * scale;
    const drawH = playableToolImage.naturalHeight * scale;
    ctx.drawImage(playableToolImage, x - drawW / 2, y - drawH / 2, drawW, drawH);
  } else {
    ctx.fillStyle = "#007d70";
    playableRoundRect(ctx, x - width / 3, y - height / 3, width * 0.66, height * 0.66, 22);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "800 18px Nunito, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(alat.nama, x, y + 5, width * 0.58);
  }
  ctx.restore();
}

function drawPlayableToken(ctx, x, y, label) {
  ctx.save();
  ctx.shadowColor = "rgba(0, 90, 82, 0.3)";
  ctx.shadowBlur = 18;
  const gradient = ctx.createLinearGradient(x - 55, y - 55, x + 55, y + 55);
  gradient.addColorStop(0, "#00b4a2");
  gradient.addColorStop(1, "#5bcdf2");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, 54, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.font = "800 14px Nunito, sans-serif";
  ctx.textAlign = "center";
  const shortLabel = label.length > 16 ? `${label.slice(0, 14)}…` : label;
  ctx.fillText(shortLabel, x, y + 5);
  ctx.restore();
}

function drawPlayableInstrumentScene(ctx, config, alat, timestamp) {
  ctx.save();
  ctx.fillStyle = "rgba(8,72,63,0.16)";
  ctx.beginPath();
  ctx.ellipse(615, 365, 155, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  drawPlayableZone(ctx, 615, 245, 144, "AREA ALAT", !playableLabState.placed);
  drawPlayableTool(ctx, 615, 235, 225, 225, alat);

  if (!playableLabState.placed) {
    const pos = playableDraggablePosition();
    drawPlayableToken(ctx, pos.x, pos.y, config.sample);
    ctx.fillStyle = "#456e67";
    ctx.font = "700 13px Nunito, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("BAKI BAHAN", 145, 335);
  } else {
    ctx.fillStyle = "rgba(0, 125, 112, 0.92)";
    playableRoundRect(ctx, 530, 365, 190, 34, 17);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "800 13px Nunito, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${config.sample} ditempatkan`, 625, 387);
  }

  if (config.mode === "level") drawPlayableLevel(ctx, config);
  if (config.mode === "mix") drawPlayableParticles(ctx, config, timestamp);
  if (config.mode === "heat") drawPlayableHeat(ctx, config, timestamp);
  if (config.mode === "process") drawPlayableProcess(ctx, config, timestamp);
  if (config.mode === "measure") drawPlayableMeter(ctx, config);
}

function drawPlayableLevel(ctx, config) {
  const ratio = Math.max(0, Math.min(1, playableLabState.value / config.max));
  const transformasi = playableTransformation();
  const isBurette = transformasi.preset === "burette";
  const isPipette = transformasi.preset === "pipette";
  const isDrops = transformasi.preset === "drops";

  if (isBurette) {
    const remaining = 1 - ratio;
    drawPlayableGlass(ctx, 584, 98, 40, 232, remaining, ["#7ee5dd", "#228dcc"]);
    ctx.strokeStyle = "#174f49";
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(604, 330); ctx.lineTo(604, 365); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(584, 342); ctx.lineTo(624, 342); ctx.stroke();
    if (playableLabState.placed && playableLabState.value > 0) drawPlayableDroplets(ctx, 604, 365, 405, 3);
  } else if (isPipette) {
    ctx.fillStyle = "rgba(255,255,255,0.58)";
    playableRoundRect(ctx, 595, 100, 38, 245, 18); ctx.fill();
    ctx.strokeStyle = "#196c62"; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = "rgba(31,169,210,0.78)";
    playableRoundRect(ctx, 602, 333 - ratio * 205, 24, ratio * 205, 11); ctx.fill();
    ctx.strokeStyle = "#f0a12c"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(588, 170); ctx.lineTo(640, 170); ctx.stroke();
  } else if (isDrops) {
    drawPlayableGlass(ctx, 548, 235, 135, 115, 0.48, ["#d7f0ff", "#68b9dc"], 2);
    ctx.fillStyle = "#17675e";
    playableRoundRect(ctx, 595, 110, 40, 90, 18); ctx.fill();
    if (playableLabState.placed && playableLabState.value > 0) drawPlayableDroplets(ctx, 615, 198, 245, Math.min(5, Math.max(1, Math.round(playableLabState.value / 2))));
    ctx.fillStyle = "#0a5149"; ctx.font = "900 18px Nunito, sans-serif"; ctx.textAlign = "center";
    ctx.fillText(`${Math.round(playableLabState.value)} tetes`, 615, 385);
  } else {
    drawPlayableGlass(ctx, 555, 130, 120, 220, ratio, ["#66e4da", "#168fc5"], playableLabState.placed ? 2 : 0);
    const targetY = 344 - (config.target / config.max) * 208;
    ctx.save();
    ctx.setLineDash([7, 5]); ctx.strokeStyle = "#e7752e"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(535, targetY); ctx.lineTo(695, targetY); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "#9c4a1f"; ctx.font = "800 12px Nunito, sans-serif"; ctx.textAlign = "left";
    ctx.fillText("tanda batas", 700, targetY + 4); ctx.restore();
  }

  // Pengukur di sisi kanan tetap menampilkan nilai numerik saat bentuk cairan berubah.
  ctx.fillStyle = "rgba(255,255,255,0.84)";
  playableRoundRect(ctx, 790, 120, 62, 230, 22); ctx.fill();
  ctx.strokeStyle = "#007d70"; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = "rgba(22,157,209,0.76)";
  playableRoundRect(ctx, 807, 326 - 180 * ratio, 28, Math.max(5, 180 * ratio), 12); ctx.fill();
  ctx.fillStyle = "#0b5149";
  ctx.font = "800 15px Nunito, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(formatPlayableValue(playableLabState.value, config), 821, 392);
}

function drawPlayableParticles(ctx, config, timestamp) {
  const transformasi = playableTransformation();
  const progress = Math.max(0, Math.min(1, playableLabState.progress / Math.max(1, config.target)));

  if (transformasi.preset === "grinding") {
    ctx.save();
    ctx.fillStyle = "rgba(232,222,204,0.96)";
    ctx.beginPath(); ctx.ellipse(615, 285, 115, 60, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#8a7a65"; ctx.lineWidth = 6; ctx.stroke();
    const particleCount = Math.round(playableLerp(9, 34, progress));
    const size = playableLerp(15, 3, progress);
    for (let i = 0; i < particleCount; i += 1) {
      const angle = i * 2.37;
      const radius = 12 + (i % 6) * 13;
      ctx.fillStyle = i % 3 ? "#d49a55" : "#b87542";
      ctx.beginPath(); ctx.arc(615 + Math.cos(angle) * radius, 285 + Math.sin(angle) * radius * 0.38, size, 0, Math.PI * 2); ctx.fill();
    }
    ctx.translate(615, 220); ctx.rotate(-0.62 + Math.sin(playableLabState.phase) * 0.12);
    ctx.fillStyle = "#87745d"; playableRoundRect(ctx, -16, -95, 32, 170, 15); ctx.fill();
    ctx.restore();
  } else {
    drawPlayableGlass(ctx, 530, 145, 170, 205, 0.76, [
      playableMixColor([247,190,79], [84,188,190], progress, 0.82),
      playableMixColor([70,125,202], [90,115,203], progress, 0.88)
    ], playableLabState.running ? playableLerp(2, 9, playableLabState.power / 100) : 1);

    ctx.save();
    playableRoundRect(ctx, 536, 151, 158, 193, 14); ctx.clip();
    for (let i = 0; i < 24; i += 1) {
      const baseX = 548 + (i * 37) % 135;
      const settledY = 325 - (i % 4) * 4;
      const angle = i * 2.23 + playableLabState.phase * 0.72;
      const mixedX = 615 + Math.cos(angle) * (28 + (i % 5) * 12);
      const mixedY = 248 + Math.sin(angle) * (22 + (i % 4) * 14);
      const x = playableLerp(baseX, mixedX, progress);
      const y = playableLerp(settledY, mixedY, progress);
      ctx.fillStyle = i % 2 ? "rgba(132,73,214,0.78)" : "rgba(7,112,102,0.78)";
      ctx.globalAlpha = progress > 0.85 ? 1 - (progress - 0.85) * 4 : 1;
      ctx.beginPath(); ctx.arc(x, y, playableLerp(6, 3, progress), 0, Math.PI * 2); ctx.fill();
    }
    if (transformasi.preset === "vortex" && playableLabState.running) {
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = "#e7ffff"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.ellipse(615, 208, playableLerp(40, 72, playableLabState.power / 100), 13, 0, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.restore();
  }

  ctx.save();
  ctx.fillStyle = "#0b5149";
  ctx.font = "800 14px Nunito, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${Math.round(playableLabState.progress)}${config.unit}`, 810, 255);
  ctx.restore();
}

function drawPlayableHeat(ctx, config, timestamp) {
  const transformasi = playableTransformation();
  const ratio = Math.max(0, Math.min(1, (playableLabState.value - 25) / Math.max(1, config.target - 25)));
  const pulse = playableLabState.running ? Math.sin(timestamp / 130) * 6 : 0;

  if (transformasi.preset === "flame") {
    const airRatio = Math.max(0, Math.min(1, playableLabState.power / 100));
    ctx.save();
    ctx.fillStyle = "#3b5954";
    playableRoundRect(ctx, 580, 270, 70, 95, 14); ctx.fill();
    ctx.fillStyle = "#7b9993";
    playableRoundRect(ctx, 592, 205, 46, 90, 13); ctx.fill();
    const outerColor = playableMixColor([255,177,39], [45,132,255], airRatio, 0.9);
    const innerColor = playableMixColor([255,235,111], [164,225,255], airRatio, 0.94);
    ctx.fillStyle = outerColor;
    ctx.beginPath();
    ctx.moveTo(615, 205);
    ctx.bezierCurveTo(560 + airRatio * 25, 165, 594, 82 - airRatio * 26, 615, 93 - airRatio * 28);
    ctx.bezierCurveTo(636, 82 - airRatio * 26, 670 - airRatio * 25, 165, 615, 205);
    ctx.fill();
    ctx.fillStyle = innerColor;
    ctx.beginPath();
    ctx.moveTo(615, 195); ctx.quadraticCurveTo(593, 153, 615, 112 - airRatio * 18); ctx.quadraticCurveTo(638, 153, 615, 195); ctx.fill();
    ctx.restore();
  } else {
    drawPlayableGlass(ctx, 535, 150, 160, 190, 0.68, [
      playableMixColor([74,183,215], [248,156,75], ratio, 0.78),
      playableMixColor([29,129,184], [219,88,54], ratio, 0.88)
    ], playableLabState.running ? 5 : 1);

    if (playableLabState.running || ratio > 0.28) {
      ctx.save();
      const bubbleCount = 3 + Math.round(ratio * 10);
      for (let index = 0; index < bubbleCount; index += 1) {
        const x = 555 + (index * 31) % 120;
        const travel = (playableLabState.phase * 0.35 + index / bubbleCount) % 1;
        const y = 315 - travel * 130;
        ctx.strokeStyle = "rgba(255,255,255,0.72)";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(x, y, 3 + (index % 3), 0, Math.PI * 2); ctx.stroke();
      }
      ctx.globalAlpha = 0.24 + ratio * 0.56;
      ctx.fillStyle = "#ffffff";
      for (let index = 0; index < 5; index += 1) {
        const steamY = 148 - ((playableLabState.phase * 13 + index * 21) % 72);
        ctx.beginPath(); ctx.ellipse(580 + index * 18 + Math.sin(playableLabState.phase + index) * 8, steamY, 12, 20, 0, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }

    ctx.save();
    ctx.globalAlpha = playableLabState.running ? 0.82 : 0.45;
    const heatColor = transformasi.preset === "even-heating" ? "#ffb22e" : "#ff6f3d";
    ctx.fillStyle = heatColor;
    ctx.beginPath(); ctx.ellipse(615, 363, 46 + pulse, 18 + pulse / 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffe56a";
    ctx.beginPath(); ctx.ellipse(615, 358, 22 + pulse / 2, 10 + pulse / 4, 0, 0, Math.PI * 2); ctx.fill();
    if (transformasi.preset === "even-heating") {
      ctx.strokeStyle = "rgba(48,72,68,0.72)"; ctx.lineWidth = 3;
      for (let line = -45; line <= 45; line += 15) {
        ctx.beginPath(); ctx.moveTo(570, 346 + line * 0.12); ctx.lineTo(660, 346 - line * 0.12); ctx.stroke();
      }
    }
    ctx.restore();
  }

  ctx.fillStyle = "rgba(255,255,255,0.84)";
  playableRoundRect(ctx, 790, 120, 62, 230, 22);
  ctx.fill();
  ctx.strokeStyle = "#d55035";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#ff6b4a";
  playableRoundRect(ctx, 809, 315 - 170 * ratio, 24, Math.max(5, 170 * ratio), 12);
  ctx.fill();
  ctx.fillStyle = "#7d3024";
  ctx.font = "800 15px Nunito, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${Math.round(playableLabState.value)} ${config.unit}`, 821, 380);
}

function drawPlayableProcess(ctx, config, timestamp) {
  const preset = playableTransformation().preset;
  const progress = Math.max(0, Math.min(1, playableLabState.progress / Math.max(1, config.target)));

  if (preset === "separation") {
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.strokeStyle = "#176c62"; ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(535, 125); ctx.lineTo(695, 125); ctx.lineTo(665, 290); ctx.lineTo(630, 340); ctx.lineTo(630, 380); ctx.lineTo(600, 380); ctx.lineTo(600, 340); ctx.lineTo(565, 290); ctx.closePath();
    ctx.fill(); ctx.stroke(); ctx.clip();
    const boundary = playableLerp(0.35, 0.5, progress);
    ctx.fillStyle = playableMixColor([90,164,198], [61,133,195], progress, 0.84);
    ctx.fillRect(548, 140, 134, 205 * boundary);
    ctx.fillStyle = playableMixColor([232,181,78], [239,196,78], progress, 0.88);
    ctx.fillRect(548, 140 + 205 * boundary, 134, 205 * (1 - boundary));
    if (progress < 0.78) {
      ctx.globalAlpha = 1 - progress;
      for (let index = 0; index < 20; index += 1) {
        ctx.fillStyle = index % 2 ? "#7f68c5" : "#24a99a";
        ctx.beginPath(); ctx.arc(565 + (index * 27) % 100, 160 + (index * 43) % 150, 5, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.restore();
    ctx.strokeStyle = "#384e4a"; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(580, 362); ctx.lineTo(650, 362); ctx.stroke();
  } else if (preset === "drying") {
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.56)";
    ctx.strokeStyle = "#176c62"; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(615, 240, 118, Math.PI, 0); ctx.lineTo(733, 320); ctx.lineTo(497, 320); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = playableMixColor([102,147,175], [205,169,91], progress, 0.9);
    ctx.beginPath(); ctx.ellipse(615, 302, 86, 24, 0, 0, Math.PI * 2); ctx.fill();
    const droplets = Math.round(playableLerp(15, 1, progress));
    for (let index = 0; index < droplets; index += 1) {
      const travel = (playableLabState.phase * 0.24 + index / Math.max(1, droplets)) % 1;
      ctx.globalAlpha = 0.75 * (1 - progress * 0.7);
      ctx.fillStyle = "#52b7d2";
      ctx.beginPath(); ctx.ellipse(550 + (index * 31) % 130, 280 - travel * 125, 4, 7, 0, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  } else {
    const angle = playableLabState.running ? playableLabState.phase * 2.2 : 0;
    ctx.save();
    ctx.translate(615, 245);
    ctx.rotate(angle);
    ctx.fillStyle = "rgba(28,87,80,0.2)";
    ctx.beginPath(); ctx.arc(0, 0, 112, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(103,72,191,0.8)"; ctx.lineWidth = 9;
    for (let i = 0; i < 4; i += 1) {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath(); ctx.moveTo(22, 0); ctx.lineTo(76, 0); ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.78)";
      playableRoundRect(ctx, 68, -13, 62, 26, 11); ctx.fill();
      ctx.fillStyle = playableMixColor([93,145,197], [219,232,238], progress, 0.9);
      playableRoundRect(ctx, 76, -7, 45, 10, 5); ctx.fill();
      ctx.fillStyle = `rgba(111,73,54,${0.18 + progress * 0.72})`;
      playableRoundRect(ctx, 111, -7, 10, 10, 4); ctx.fill();
    }
    ctx.restore();
  }

  ctx.fillStyle = "#0b5149";
  ctx.font = "800 14px Nunito, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${Math.round(playableLabState.progress)}${config.unit}`, 810, 255);
}

function drawPlayableMeter(ctx, config) {
  const preset = playableTransformation().preset;
  const reading = playableLabState.measured
    ? String(config.result)
    : playableLabState.measuring && Number.isFinite(playableLabState.displayedMeasure)
      ? String(Number(playableLabState.displayedMeasure).toFixed(String(config.result).split(".")[1]?.length || 0))
      : "---";

  if (preset === "mass") {
    ctx.fillStyle = "#87958f"; playableRoundRect(ctx, 540, 285, 150, 40, 13); ctx.fill();
    ctx.fillStyle = playableLabState.placed ? "#d9ad6b" : "rgba(255,255,255,0.6)";
    ctx.beginPath(); ctx.ellipse(615, 275, 62, 17, 0, 0, Math.PI * 2); ctx.fill();
    if (playableLabState.placed) {
      for (let index = 0; index < 20; index += 1) {
        ctx.fillStyle = index % 2 ? "#f1e0b7" : "#ffffff";
        ctx.beginPath(); ctx.arc(575 + (index * 19) % 82, 267 - (index % 4) * 4, 3, 0, Math.PI * 2); ctx.fill();
      }
    }
  } else if (preset === "temperature") {
    drawPlayableGlass(ctx, 538, 205, 152, 140, 0.7, ["#68c7d2", "#277eb5"], 2);
    ctx.strokeStyle = "#555"; ctx.lineWidth = 8;
    ctx.beginPath(); ctx.moveTo(625, 110); ctx.lineTo(610, 285); ctx.stroke();
    ctx.strokeStyle = "#e65e42"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(625, 125); ctx.lineTo(612, 280); ctx.stroke();
  } else if (preset === "ph") {
    drawPlayableGlass(ctx, 540, 215, 145, 130, 0.7, ["#f4b1ba", "#c86d9d"], 2);
    ctx.strokeStyle = playableLabState.calibrated ? "#176c62" : "#846c65"; ctx.lineWidth = 12;
    ctx.beginPath(); ctx.moveTo(620, 115); ctx.lineTo(605, 290); ctx.stroke();
  } else if (preset === "absorbance") {
    ctx.fillStyle = "rgba(255,255,255,0.56)"; playableRoundRect(ctx, 572, 180, 85, 150, 12); ctx.fill();
    ctx.strokeStyle = "#237f77"; ctx.lineWidth = 4; ctx.stroke();
    ctx.fillStyle = "rgba(92,77,188,0.62)"; ctx.fillRect(580, 235, 69, 87);
    ctx.strokeStyle = playableLabState.placed ? "rgba(255,215,57,0.9)" : "rgba(255,215,57,0.18)"; ctx.lineWidth = 8;
    ctx.beginPath(); ctx.moveTo(500, 255); ctx.lineTo(730, 255); ctx.stroke();
  }

  ctx.fillStyle = "#082d28";
  playableRoundRect(ctx, 748, 175, 125, 90, 15);
  ctx.fill();
  ctx.fillStyle = "#a8e63d";
  ctx.font = "900 25px monospace";
  ctx.textAlign = "center";
  ctx.fillText(reading, 810, 220);
  ctx.font = "700 13px Nunito, sans-serif";
  ctx.fillText(config.unit, 810, 245);
  if (config.requiresCal) {
    ctx.fillStyle = playableLabState.calibrated ? "#007d70" : "#8a6450";
    ctx.font = "800 12px Nunito, sans-serif";
    ctx.fillText(playableLabState.calibrated ? "TERKALIBRASI" : "PERLU KALIBRASI", 810, 286);
  }
}

function drawPlayableTransferContainer(ctx, x, y, fillRatio, kind, isDestination = false) {
  const ratio = Math.max(0, Math.min(1, fillRatio));
  ctx.save();
  if (kind === "mounting") {
    ctx.strokeStyle = "#425f5a"; ctx.lineWidth = 8;
    ctx.beginPath(); ctx.moveTo(x, y - 78); ctx.lineTo(x, y + 72); ctx.moveTo(x - 70, y + 72); ctx.lineTo(x + 70, y + 72); ctx.stroke();
    ctx.strokeStyle = ratio > 0.5 ? "#15a091" : "rgba(66,95,90,0.25)"; ctx.lineWidth = 12;
    ctx.beginPath(); ctx.moveTo(x - 5, y - 65); ctx.lineTo(x - 5, y + 45); ctx.stroke();
  } else if (kind === "hot-transfer") {
    ctx.fillStyle = isDestination ? "#707b78" : "#4b5754";
    playableRoundRect(ctx, x - 75, y + 50, 150, 22, 8); ctx.fill();
    if (ratio > 0) {
      ctx.fillStyle = `rgba(255,89,44,${0.2 + ratio * 0.58})`;
      ctx.beginPath(); ctx.arc(x, y, 52, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#d76b3e"; ctx.lineWidth = 8;
      ctx.beginPath(); ctx.arc(x, y, 34, 0, Math.PI * 2); ctx.stroke();
    }
  } else {
    drawPlayableGlass(ctx, x - 62, y - 72, 124, 145, ratio, kind === "solid-transfer" ? ["#d8a75f", "#9c6034"] : ["#63d6d4", "#1b8fbd"], 1);
    if (kind === "solid-transfer" && ratio > 0) {
      for (let index = 0; index < Math.round(20 * ratio); index += 1) {
        ctx.fillStyle = index % 2 ? "#f0d49b" : "#c9864e";
        ctx.beginPath(); ctx.arc(x - 45 + (index * 19) % 90, y + 52 - (index % 5) * 6, 4, 0, Math.PI * 2); ctx.fill();
      }
    }
  }
  ctx.restore();
}

function drawPlayableTransferScene(ctx, config, alat) {
  const transformasi = playableTransformation();
  const stage = playableLabState.transferStage;
  drawPlayableZone(ctx, 360, 255, 112, config.source, playableLabState.transferStage === 0);
  drawPlayableZone(ctx, 720, 255, 118, config.destination, playableLabState.transferStage === 1);
  const sourceFill = stage === 0 ? 0.82 : stage === 1 ? 0.28 : 0.06;
  const destinationFill = stage >= 2 ? 0.78 : 0.04;
  drawPlayableTransferContainer(ctx, 360, 250, sourceFill, transformasi.preset, false);
  drawPlayableTransferContainer(ctx, 720, 250, destinationFill, transformasi.preset, true);

  if (stage === 1 && ["liquid-transfer", "solid-transfer"].includes(transformasi.preset)) {
    ctx.save();
    ctx.strokeStyle = "rgba(0,125,112,0.52)"; ctx.lineWidth = 4; ctx.setLineDash([9, 8]);
    ctx.beginPath(); ctx.moveTo(430, 180); ctx.quadraticCurveTo(540, 95, 650, 180); ctx.stroke(); ctx.setLineDash([]);
    ctx.restore();
  }

  const pos = playableDraggablePosition();
  drawPlayableTool(ctx, pos.x, pos.y, 170, 170, alat);
  ctx.fillStyle = "#315f57";
  ctx.font = "800 14px Nunito, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(playableLabState.transferStage === 0 ? "SERET ALAT KE SUMBER" : playableLabState.transferStage === 1 ? "SERET KE TUJUAN" : "PEMINDAHAN SELESAI", 540, 455);
}

function drawPlayableSafetyScene(ctx, config, alat) {
  if (config.options) {
    ctx.save();
    ctx.fillStyle = playableLabState.done ? "rgba(65,174,88,0.16)" : "rgba(233,74,67,0.14)";
    ctx.beginPath(); ctx.arc(450, 235, 145, 0, Math.PI * 2); ctx.fill();
    ctx.font = "58px serif"; ctx.textAlign = "center";
    ctx.fillText(playableLabState.done ? "🛡️" : "⚠️", 290, 150);
    ctx.restore();
    drawPlayableTool(ctx, 450, 235, 230, 230, alat);
    ctx.fillStyle = "rgba(255,255,255,0.82)";
    playableRoundRect(ctx, 190, 385, 520, 58, 16);
    ctx.fill();
    ctx.fillStyle = "#254f48";
    ctx.font = "800 14px Nunito, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(playableLabState.done ? "Tindakan aman dipilih: mata dan kulit terlindungi." : "Baca skenario lalu pilih tindakan yang benar.", 450, 420);
    return;
  }
  drawPlayableZone(ctx, 680, 255, 135, config.destination, !playableLabState.done);
  ctx.font = "110px serif";
  ctx.textAlign = "center";
  ctx.fillText("🧍", 680, 292);
  const pos = playableDraggablePosition();
  drawPlayableTool(ctx, pos.x, pos.y, 180, 180, alat);
  if (playableLabState.done) {
    ctx.save();
    ctx.strokeStyle = "rgba(47,165,76,0.82)"; ctx.lineWidth = 9;
    ctx.beginPath(); ctx.arc(680, 250, 105, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "rgba(47,165,76,0.92)";
    ctx.beginPath(); ctx.arc(765, 175, 32, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "white"; ctx.font = "900 28px Nunito, sans-serif"; ctx.textAlign = "center"; ctx.fillText("✓", 765, 185);
    ctx.restore();
  } else {
    ctx.save();
    ctx.fillStyle = "rgba(231,78,69,0.14)";
    ctx.beginPath(); ctx.arc(680, 250, 105, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#aa403b"; ctx.font = "900 13px Nunito, sans-serif"; ctx.textAlign = "center";
    ctx.fillText("BELUM TERLINDUNGI", 680, 395);
    ctx.restore();
  }
}

function drawPlayableSuccess(ctx) {
  ctx.save();
  ctx.fillStyle = "rgba(6, 45, 39, 0.86)";
  playableRoundRect(ctx, 285, 28, 330, 58, 29);
  ctx.fill();
  ctx.strokeStyle = "#a8e63d";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#a8e63d";
  ctx.font = "900 17px Nunito, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("✓ TANTANGAN BERHASIL DISELESAIKAN", 450, 64);
  ctx.restore();
}

// ─────────────────────────────────────────────
// DATA SIMBOL KESELAMATAN GHS
// ─────────────────────────────────────────────
const SIMBOL_GHS = [
  {
    kode: "GHS01",
    nama: "Mudah Meledak",
    warna: "#ff6b35",
    img: "./foto/mudah-meledak.png",
    contoh: "Dinamit, aseton peroksida",
    desc: "Bahan yang dapat meledak secara spontan akibat reaksi kimia yang menghasilkan gas dan panas dalam jumlah besar secara sangat cepat.",
    bahaya: ["Ledakan dapat menyebabkan cedera serius atau kematian", "Gelombang tekanan merusak area sekitar", "Pecahan material berbahaya terlempar jauh"],
    penanganan: ["Jauhkan dari sumber panas, api, dan gesekan", "Simpan di tempat berventilasi baik dan sejuk", "Hindari benturan fisik pada wadah", "Gunakan jumlah seminimal mungkin"],
    apd: ["Perisai wajah (face shield)", "Sarung tangan tebal", "Jaket pelindung ledakan", "Sepatu safety"]
  },
  {
    kode: "GHS02",
    nama: "Mudah Terbakar",
    warna: "#ff4500",
    img: "./foto/mudah-terbakar.png",
    contoh: "Etanol, hidrogen, bensin",
    desc: "Bahan yang mudah terbakar pada suhu ruang atau suhu rendah, termasuk cairan, gas, dan padatan yang dapat terbakar dengan cepat.",
    bahaya: ["Dapat menyebabkan kebakaran besar", "Uap mudah terbakar menyebar di udara", "Kebakaran sulit dikendalikan jika sudah besar"],
    penanganan: ["Jauhkan dari sumber api, panas, dan percikan listrik", "Simpan dalam wadah tertutup rapat", "Hindari penumpukan uap di ruang tertutup", "Sediakan alat pemadam kebakaran di dekatnya"],
    apd: ["Sarung tangan tahan api", "Kacamata pelindung", "Jas laboratorium tidak mudah terbakar", "Sepatu safety"]
  },
  {
    kode: "GHS03",
    nama: "Pengoksidasi",
    warna: "#ffa500",
    img: "./foto/pengoksidasi.png",
    contoh: "Kalium permanganat, hidrogen peroksida",
    desc: "Bahan yang dapat melepaskan oksigen sehingga memperkuat atau memulai pembakaran bahan lain di sekitarnya.",
    bahaya: ["Mempercepat dan memperparah kebakaran", "Reaksi hebat jika kontak dengan bahan mudah terbakar", "Dapat menyebabkan ledakan jika bercampur dengan bahan organik"],
    penanganan: ["Pisahkan dari bahan mudah terbakar", "Simpan di tempat sejuk dan kering", "Hindari kontaminasi dengan bahan organik", "Gunakan wadah khusus oksidator"],
    apd: ["Kacamata pelindung", "Sarung tangan kimia", "Jas laboratorium", "Perisai wajah untuk jumlah besar"]
  },
  {
    kode: "GHS04",
    nama: "Gas Bertekanan",
    warna: "#00a8cc",
    img: "./foto/gas-bertekanan.png",
    contoh: "Gas LPG, nitrogen, oksigen bertekanan",
    desc: "Gas yang disimpan dalam tabung bertekanan tinggi, termasuk gas terkompresi, gas cair, dan gas terlarut yang berbahaya jika bocor atau tabung rusak.",
    bahaya: ["Tabung dapat meledak jika dipanaskan", "Kebocoran gas dapat menyebabkan sesak napas", "Gas dapat bertekanan sangat tinggi dan berbahaya"],
    penanganan: ["Simpan tabung dalam posisi tegak dan diikat kuat", "Jauhkan dari sumber panas", "Periksa katup dan regulator secara rutin", "Bawa dan pindahkan menggunakan troli khusus"],
    apd: ["Kacamata pelindung", "Sarung tangan", "Sepatu safety", "Detektor gas jika di ruang tertutup"]
  },
  {
    kode: "GHS05",
    nama: "Korosif",
    warna: "#8b4513",
    img: "./foto/korosif.png",
    contoh: "Asam sulfat, natrium hidroksida",
    desc: "Bahan yang dapat merusak atau menghancurkan jaringan hidup (kulit, mata, selaput lendir) dan material lainnya melalui reaksi kimia.",
    bahaya: ["Luka bakar kimia pada kulit dan mata", "Kerusakan permanen jika tidak segera ditangani", "Uap korosif berbahaya jika terhirup"],
    penanganan: ["Gunakan selalu APD lengkap", "Hindari percikan saat menuang", "Sediakan air bersih di dekat area kerja", "Netralkan tumpahan sebelum dibersihkan"],
    apd: ["Kacamata goggle tertutup", "Sarung tangan karet tebal", "Jas laboratorium tahan asam", "Sepatu safety tertutup penuh"]
  },
  {
    kode: "GHS06",
    nama: "Toksik/Beracun",
    warna: "#2d2d2d",
    img: "./foto/beracun.png",
    contoh: "Sianida, merkuri, pestisida",
    desc: "Bahan beracun yang dapat menyebabkan kematian atau cedera serius bahkan dalam jumlah kecil, melalui kontak kulit, pernapasan, atau tertelan.",
    bahaya: ["Menyebabkan keracunan fatal meski dalam dosis kecil", "Dapat diserap melalui kulit", "Sangat berbahaya jika terhirup atau tertelan"],
    penanganan: ["Tangani hanya di lemari asam (fume hood)", "Gunakan sistem tertutup saat memindahkan", "Simpan terkunci dan jauh dari jangkauan", "Catat setiap penggunaan dengan teliti"],
    apd: ["Respirator / masker gas", "Sarung tangan nitril ganda", "Kacamata goggle", "Jas laboratorium + apron"]
  },
  {
    kode: "GHS07",
    nama: "Berbahaya (Iritan)",
    warna: "#ff8c00",
    img: "./foto/iritan.png",
    contoh: "Aseton, amonia encer, detergen industri",
    desc: "Bahan yang dapat menyebabkan iritasi kulit, mata, atau saluran pernapasan. Tidak seletal GHS06 tetapi tetap berbahaya bila kontak berulang.",
    bahaya: ["Iritasi dan kemerahan pada kulit dan mata", "Batuk dan iritasi saluran napas jika terhirup", "Paparan berulang dapat menyebabkan sensitisasi"],
    penanganan: ["Hindari kontak langsung dengan kulit dan mata", "Gunakan di ruangan berventilasi baik", "Cuci tangan setelah bekerja", "Simpan wadah selalu tertutup"],
    apd: ["Kacamata pelindung", "Sarung tangan lateks/nitril", "Jas laboratorium", "Masker jika ventilasi kurang"]
  },
  {
    kode: "GHS08",
    nama: "Bahaya Kesehatan",
    warna: "#9b59b6",
    img: "./foto/bahaya-bagi-kesehatan.png",
    contoh: "Benzena, formaldehida, asbes",
    desc: "Bahan yang menyebabkan bahaya kesehatan serius jangka panjang seperti kanker, kerusakan organ, gangguan reproduksi, atau efek mutagenik.",
    bahaya: ["Berpotensi karsinogenik (pemicu kanker)", "Kerusakan organ dalam jangka panjang", "Gangguan sistem reproduksi dan genetik"],
    penanganan: ["Minimalisir paparan sebisa mungkin", "Gunakan sistem tertutup dan lemari asam", "Lakukan pemeriksaan kesehatan rutin", "Dokumentasi paparan secara ketat"],
    apd: ["Respirator khusus (half/full face)", "Sarung tangan nitril tebal", "Kacamata goggle", "Pakaian pelindung kimia"]
  },
  {
    kode: "GHS09",
    nama: "Berbahaya bagi Lingkungan",
    warna: "#27ae60",
    img: "./foto/berbahaya-bagi-lingkungan.png",
    contoh: "DDT, merkuri organik, PCB",
    desc: "Bahan yang sangat beracun bagi organisme air, tanah, dan ekosistem secara luas, serta dapat menimbulkan efek jangka panjang di lingkungan.",
    bahaya: ["Merusak ekosistem air dan tanah", "Efek bioakumulasi dalam rantai makanan", "Sulit terurai di lingkungan (persisten)"],
    penanganan: ["Jangan buang ke saluran air atau tanah", "Tampung limbah di wadah khusus bertanda", "Serahkan ke unit pengelolaan limbah B3", "Gunakan sesedikit mungkin"],
    apd: ["Sarung tangan kimia", "Kacamata pelindung", "Jas laboratorium", "Sepatu safety"]
  }
];

// ─────────────────────────────────────────────
// MODAL DETAIL GHS
// ─────────────────────────────────────────────
function openGHSModal(kode) {
  const s = SIMBOL_GHS.find(g => g.kode === kode);
  if (!s) return;

  document.getElementById("ghsModalKode").textContent   = s.kode;
  document.getElementById("ghsModalNama").textContent   = s.nama;
  document.getElementById("ghsModalDesc").textContent   = s.desc;
  document.getElementById("ghsModalContoh").textContent = s.contoh;

  const imgEl = document.getElementById("ghsModalImg");
  imgEl.innerHTML = s.img
    ? `<img src="${s.img}" alt="${s.nama}">`
    : s.svg;

  document.getElementById("ghsModalBahaya").innerHTML =
    s.bahaya.map(b => `<li>${b}</li>`).join("");
  document.getElementById("ghsModalPenanganan").innerHTML =
    s.penanganan.map(p => `<li>${p}</li>`).join("");
  document.getElementById("ghsModalAPD").innerHTML =
    s.apd.map(a => `<span class="apd-chip">${a}</span>`).join("");

  document.getElementById("ghsModalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeGHSModal(event) {
  if (!event || event.target.id === "ghsModalOverlay") {
    document.getElementById("ghsModalOverlay").classList.remove("open");
    document.body.style.overflow = "";
  }
}

// ─────────────────────────────────────────────
// MODAL DETAIL ALAT
// ─────────────────────────────────────────────
function openModal(id) {
  const alat = ALAT.find(a => a.id === id);
  if (!alat) return;

  const iconEl = document.getElementById("mIcon");

  // Khusus Simbol Keselamatan: tampilkan grid piktogram GHS
  if (alat.id === 28) {
    iconEl.innerHTML = `
      <div class="ghs-grid">
        ${SIMBOL_GHS.map(s => `
          <div class="ghs-item" title="Klik untuk detail ${s.nama}" onclick="openGHSModal('${s.kode}')">
            <div class="ghs-svg">${s.img ? `<img src="${s.img}" alt="${s.nama}">` : s.svg}</div>
            <div class="ghs-kode">${s.kode}</div>
            <div class="ghs-nama">${s.nama}</div>
            <div class="ghs-contoh">${s.contoh}</div>
          </div>
        `).join("")}
      </div>
    `;
  } else if (alat.sketchfab) {
    iconEl.innerHTML = `
      <div class="sketchfab-wrap">
        <iframe
          src="${alat.sketchfab}?autostart=1&ui_infos=0&ui_controls=1&ui_watermark=0"
          frameborder="0"
          allowfullscreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
        ></iframe>
        <p class="sketchfab-credit">
          Model 3D via <a href="https://sketchfab.com" target="_blank" rel="nofollow">Sketchfab</a>
        </p>
      </div>
    `;
  } else if (alat.youtube) {
    iconEl.innerHTML = `
      <div class="youtube-wrap">
        <iframe
          src="${alat.youtube}"
          frameborder="0"
          allowfullscreen
          allow="autoplay; fullscreen"
          title="Video: ${alat.nama}"
        ></iframe>
        <p class="youtube-credit">
          Video via <a href="https://youtube.com" target="_blank" rel="nofollow">YouTube</a>
        </p>
      </div>
    `;
  } else {
    iconEl.innerHTML = `<img src="${alat.icon}" alt="${alat.nama}" class="modal-icon-img">`;
  }

  document.getElementById("mName").textContent = alat.nama;
  document.getElementById("mCat").textContent  = catLabel(alat.kat);
  document.getElementById("mDesc").textContent = alat.desc;
  document.getElementById("mFungsi").innerHTML = alat.fungsi
    .map(f => `<li>${f}</li>`)
    .join("");
  document.getElementById("mVirtualBtn").onclick = () => openVirtualLab(alat.id);

  document.getElementById("modalOverlay").classList.add("open");
}

function closeModal(event) {
  // Tutup hanya jika klik pada overlay (bukan isi modal)
  if (event.target.id === "modalOverlay") {
    closeModalBtn();
  }
}

function closeModalBtn() {
  // Hentikan video YouTube/Sketchfab dengan mereset src iframe
  const iframe = document.querySelector("#mIcon iframe");
  if (iframe) {
    const src = iframe.src;
    iframe.src = "";
    iframe.src = src;
  }
  document.getElementById("modalOverlay").classList.remove("open");
}

// Tutup modal dengan tombol Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeGHSModal();
    closeModalBtn();
  }
});

// ─────────────────────────────────────────────
// PILIH MODE PERMAINAN
// ─────────────────────────────────────────────
function selectGame(mode, card) {
  // Tandai kartu yang dipilih
  document.querySelectorAll(".game-mode-card").forEach(c => c.classList.remove("selected"));
  card.classList.add("selected");

  const url = GAME_URLS[mode];
  const wrap = document.getElementById("gameFrameWrap");

  wrap.innerHTML = `
    <div class="game-frame-header">
      <span class="game-frame-title">${GAME_LABELS[mode]}</span>
      <div style="display:flex;align-items:center;gap:12px;">
        <small style="color:rgba(255,255,255,.5)">Powered by Educandy</small>
        <button class="game-close-btn" onclick="closeGame()" title="Tutup permainan">✕ Tutup</button>
      </div>
    </div>
    <iframe
      src="${url}"
      style="width:100%;height:100%;min-height:800px;border:none;flex:1;"
      allowfullscreen
      title="${GAME_LABELS[mode]}"
    ></iframe>
  `;
}

function toggleZoom(btn) {
  const iframe = document.getElementById("gameIframe");
  if (!iframe) return;
  iframe.classList.toggle("zoomed");
  btn.classList.toggle("active");
  btn.textContent = iframe.classList.contains("zoomed") ? "🔎 Perkecil" : "🔍 Perbesar";
}
 
function closeGame() {
  document.querySelectorAll(".game-mode-card").forEach(c => c.classList.remove("selected"));
  document.getElementById("gameFrameWrap").innerHTML = `
    <div class="game-placeholder" id="gamePlaceholder">
      <div class="big-icon">🎯</div>
      <p>Pilih mode permainan di atas untuk mulai bermain!</p>
    </div>
  `;
}

// ─────────────────────────────────────────────
// NAVIGASI ANTAR HALAMAN
// ─────────────────────────────────────────────
function showPage(pageId, btn) {
  const targetPage = document.getElementById(pageId);
  if (!targetPage) return;

  // Sembunyikan semua halaman
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

  // Nonaktifkan semua tombol nav
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active-nav"));

  // Tampilkan halaman yang dipilih
  targetPage.classList.add("active");

  // Tandai tombol nav aktif
  if (btn) btn.classList.add("active-nav");

  if (pageId === "virtualLab") {
    renderVirtualLabList();
    renderVirtualWorkspace();
  }

  // Scroll ke atas
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goHome() {
  const homeBtn = document.querySelector('[data-page="home"]');
  showPage("home", homeBtn);
}

// ─────────────────────────────────────────────
// INISIALISASI
// ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  renderGrid("semua");
  selectVirtualAlat(1, false);
});

// ════════ IMAGE LIGHTBOX ════════
const imgLightbox      = document.getElementById('imgLightbox');
const imgLightboxImg   = document.getElementById('imgLightboxImg');
const imgLightboxClose = document.getElementById('imgLightboxClose');

function openLightbox(src) {
  imgLightboxImg.src = src;
  imgLightbox.classList.add('open');
}

function closeLightbox() {
  imgLightbox.classList.remove('open');
  imgLightboxImg.src = '';
}

// Tutup saat klik tombol ✕
imgLightboxClose.addEventListener('click', (e) => {
  e.stopPropagation();
  closeLightbox();
});

// Tutup saat klik area gelap di luar gambar
imgLightbox.addEventListener('click', (e) => {
  if (e.target === imgLightbox) closeLightbox();
});

// Klik gambar di dalam modal GHS → buka lightbox
document.addEventListener('click', (e) => {
  const ghsImg = e.target.closest('.ghs-modal-img');
  if (ghsImg) {
    const img = ghsImg.querySelector('img');
    if (img) openLightbox(img.src);
  }
});
