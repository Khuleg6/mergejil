export type AnswerOption = {
  id: string;
  text: string;
  dimension?: "I" | "E" | "T" | "F" | "S" | "N" | "J" | "P";
  value?: number;
};

export type Question = {
  id: string;
  text: string;
  subtext?: string;
  options: AnswerOption[];
  category?: string;
};

// MBTI Questions (20 sample)
export const mbtiQuestions: Question[] = [
  {
    id: "mbti-001",
    text: 'Та ихэвчлэн хэрхэн "цэнэглэдэг" вэ?',
    subtext: "Ядарч сульдсан үедээ юу хийх дуртай вэ?",
    options: [
      {
        id: "mbti-001-a",
        text: "Ганцаараа байж, номоо уншиж, тайван орчинд цэнэглэдэг",
        dimension: "I",
      },
      {
        id: "mbti-001-b",
        text: "Найз нөхөдтэйгөө уулзаж, яриа хөөрөөнд цэнэглэдэг",
        dimension: "E",
      },
    ],
  },
  {
    id: "mbti-002",
    text: "Шинэ мэдээлэл авахдаа та юуд анхаардаг вэ?",
    options: [
      {
        id: "mbti-002-a",
        text: "Тодорхой баримт, нарийн дэлгэрэнгүй мэдээлэлд анхаардаг",
        dimension: "S",
      },
      {
        id: "mbti-002-b",
        text: "Ерөнхий дүр зураг, ирээдүйн боломжид анхаардаг",
        dimension: "N",
      },
    ],
  },
  {
    id: "mbti-003",
    text: "Шийдвэр гаргахдаа та юунд тулгуурладаг вэ?",
    options: [
      {
        id: "mbti-003-a",
        text: "Логик дүн шинжилгээ, объектив баримт",
        dimension: "T",
      },
      {
        id: "mbti-003-b",
        text: "Хүмүүст нөлөөлөх байдал, үнэт зүйлс",
        dimension: "F",
      },
    ],
  },
  {
    id: "mbti-004",
    text: "Таны ажлын хэв маяг ямар байдаг вэ?",
    options: [
      {
        id: "mbti-004-a",
        text: "Урьдчилан төлөвлөж, цагтаа дуусгахыг хүсдэг",
        dimension: "J",
      },
      {
        id: "mbti-004-b",
        text: "Уян хатан байж, нөхцөл байдлаас хамааруулан өөрчилдөг",
        dimension: "P",
      },
    ],
  },
  {
    id: "mbti-005",
    text: "Нийгмийн арга хэмжээнд оролцохдоо та ямар байдаг вэ?",
    options: [
      {
        id: "mbti-005-a",
        text: "Хэдэн ойрын найзтайгаа гүнзгий ярилцахыг илүүд үздэг",
        dimension: "I",
      },
      {
        id: "mbti-005-b",
        text: "Олон шинэ хүнтэй танилцаж, яриа хөөрөөнд оролцохыг хүсдэг",
        dimension: "E",
      },
    ],
  },
  {
    id: "mbti-006",
    text: "Асуудал шийдэхдээ та ямар хандлагатай байдаг вэ?",
    options: [
      {
        id: "mbti-006-a",
        text: "Туршлагаас суралцаж, батлагдсан аргуудыг ашигладаг",
        dimension: "S",
      },
      {
        id: "mbti-006-b",
        text: "Шинэ, бүтээлч шийдэл хайж, туршилт хийдэг",
        dimension: "N",
      },
    ],
  },
  {
    id: "mbti-007",
    text: "Маргаан гарвал та хэрхэн ханддаг вэ?",
    options: [
      {
        id: "mbti-007-a",
        text: "Логик, баримтаар маргааныг шийддэг",
        dimension: "T",
      },
      {
        id: "mbti-007-b",
        text: "Харилцаанд нөлөөлөхгүйн тулд зөвшилцлийг хайдаг",
        dimension: "F",
      },
    ],
  },
  {
    id: "mbti-008",
    text: "Амралтын өдрөө хэрхэн өнгөрүүлэхийг хүсдэг вэ?",
    options: [
      {
        id: "mbti-008-a",
        text: "Урьдчилан төлөвлөсөн арга хэмжээтэй",
        dimension: "J",
      },
      {
        id: "mbti-008-b",
        text: "Спонтан, нөхцөл байдлаас хамааран",
        dimension: "P",
      },
    ],
  },
  {
    id: "mbti-009",
    text: "Та ихэвчлэн хэрхэн ажилладаг вэ?",
    options: [
      {
        id: "mbti-009-a",
        text: "Тайван, чимээгүй орчинд ганцаараа",
        dimension: "I",
      },
      {
        id: "mbti-009-b",
        text: "Багаар хамтран, идэвхтэй харилцааны дунд",
        dimension: "E",
      },
    ],
  },
  {
    id: "mbti-010",
    text: "Та ямар мэдээллийг илүү итгэдэг вэ?",
    options: [
      {
        id: "mbti-010-a",
        text: "5 мэдрэхүйгээрээ шууд мэдэрч болох зүйл",
        dimension: "S",
      },
      {
        id: "mbti-010-b",
        text: "Зөн совин, дотоод мэдрэмж, хэв маяг",
        dimension: "N",
      },
    ],
  },
  {
    id: "mbti-011",
    text: "Найзынхаа асуудлыг сонсоход та юу хийдэг вэ?",
    options: [
      {
        id: "mbti-011-a",
        text: "Практик шийдэл санал болгодог",
        dimension: "T",
      },
      {
        id: "mbti-011-b",
        text: "Дэмжиж, ойлгосноо илэрхийлдэг",
        dimension: "F",
      },
    ],
  },
  {
    id: "mbti-012",
    text: "Дуусаагүй ажил байвал та ямар мэдрэмж төрдөг вэ?",
    options: [
      {
        id: "mbti-012-a",
        text: "Тайвшрахгүй, дуусгах хүсэлтэй",
        dimension: "J",
      },
      {
        id: "mbti-012-b",
        text: "Тийм ч зовдоггүй, хожим дуусгана",
        dimension: "P",
      },
    ],
  },
  {
    id: "mbti-013",
    text: "Шинэ хүнтэй танилцахад та хэрхэн байдаг вэ?",
    options: [
      {
        id: "mbti-013-a",
        text: "Ихэвчлэн нөгөө хүн эхлэн ярьдаг",
        dimension: "I",
      },
      {
        id: "mbti-013-b",
        text: "Би өөрөө эхлэн ярьж, нэрээ танилцуулдаг",
        dimension: "E",
      },
    ],
  },
  {
    id: "mbti-014",
    text: "Ном унших эсвэл кино үзэхдээ та юуд татагддаг вэ?",
    options: [
      {
        id: "mbti-014-a",
        text: "Бодит үйл явдалд суурилсан, практик агуулга",
        dimension: "S",
      },
      {
        id: "mbti-014-b",
        text: "Уран зөгнөлт, гүн санааны агуулга",
        dimension: "N",
      },
    ],
  },
  {
    id: "mbti-015",
    text: "Хэн нэгнийг магтахдаа та юуд анхаардаг вэ?",
    options: [
      { id: "mbti-015-a", text: "Тэдний ажлын чанар, үр дүн", dimension: "T" },
      {
        id: "mbti-015-b",
        text: "Тэдний хүчин чармайлт, хандлага",
        dimension: "F",
      },
    ],
  },
  {
    id: "mbti-016",
    text: "Таны ширээ, ажлын орчин ихэвчлэн ямар байдаг вэ?",
    options: [
      {
        id: "mbti-016-a",
        text: "Цэгцтэй, бүх зүйл өөрийн газартаа",
        dimension: "J",
      },
      {
        id: "mbti-016-b",
        text: "Олон зүйл гарч ирдэг, бага зэрэг эмх замбараагүй",
        dimension: "P",
      },
    ],
  },
  {
    id: "mbti-017",
    text: "Урт удаан яриа хийсний дараа та ямар мэдрэмж авдаг вэ?",
    options: [
      {
        id: "mbti-017-a",
        text: "Ядарсан мэт, ганцаараа байх хүсэлтэй",
        dimension: "I",
      },
      {
        id: "mbti-017-b",
        text: "Сэргэсэн, илүү их харилцах хүсэлтэй",
        dimension: "E",
      },
    ],
  },
  {
    id: "mbti-018",
    text: "Хичээл сурах, мэдлэг олж авахдаа та ямар хандлагатай байдаг вэ?",
    options: [
      {
        id: "mbti-018-a",
        text: "Алхам алхмаар, нарийвчилсан дэлгэрэнгүйгээр",
        dimension: "S",
      },
      {
        id: "mbti-018-b",
        text: "Ерөнхий ойлголтыг эхлээд авч, нарийвчилна",
        dimension: "N",
      },
    ],
  },
  {
    id: "mbti-019",
    text: "Хэн нэгэн тантай буруу ханддаг гэж үзвэл та юу хийдэг вэ?",
    options: [
      {
        id: "mbti-019-a",
        text: "Шууд, тодорхой хэлж, асуудлыг шийдэхийг хичээдэг",
        dimension: "T",
      },
      {
        id: "mbti-019-b",
        text: "Харилцааны зохицол алдагдахгүйн тулд болгоомжтой хандана",
        dimension: "F",
      },
    ],
  },
  {
    id: "mbti-020",
    text: "Та ихэвчлэн хэдэн хоногийн өмнөөс бэлддэг вэ?",
    options: [
      {
        id: "mbti-020-a",
        text: "Хангалттай урьдчилж бэлдэж, цагт нь дуусгадаг",
        dimension: "J",
      },
      {
        id: "mbti-020-b",
        text: "Сүүлийн мөчид идэвхжиж, яаравчлан дуусгадаг",
        dimension: "P",
      },
    ],
  },
];

// IQ Questions (15 sample)
export const iqQuestions: Question[] = [
  {
    id: "iq-logic-001",
    category: "logic",
    text: "Дарааллын дараагийн тоог олно уу: 2, 6, 18, 54, ?",
    options: [
      { id: "iq-l001-a", text: "108", value: 0 },
      { id: "iq-l001-b", text: "162", value: 1 },
      { id: "iq-l001-c", text: "108", value: 0 },
      { id: "iq-l001-d", text: "216", value: 0 },
    ],
  },
  {
    id: "iq-logic-002",
    category: "logic",
    text: "Хэрэв бүх А нь В байдаг, бүх В нь С байдаг бол дараахь нь үнэн үү?",
    options: [
      { id: "iq-l002-a", text: "Бүх А нь С байдаг — ҮНЭН", value: 1 },
      { id: "iq-l002-b", text: "Бүх С нь А байдаг — ҮНЭН", value: 0 },
      { id: "iq-l002-c", text: "А ба С хамааралгүй — ҮНЭН", value: 0 },
      { id: "iq-l002-d", text: "Зарим А нь С биш — ҮНЭН", value: 0 },
    ],
  },
  {
    id: "iq-logic-003",
    category: "logic",
    text: "Дарааллын дараагийн тоог олно уу: 1, 4, 9, 16, 25, ?",
    options: [
      { id: "iq-l003-a", text: "30", value: 0 },
      { id: "iq-l003-b", text: "32", value: 0 },
      { id: "iq-l003-c", text: "36", value: 1 },
      { id: "iq-l003-d", text: "35", value: 0 },
    ],
  },
  {
    id: "iq-visual-001",
    category: "visual",
    text: "3×3 матрицад: Эхний мөрт ▲ ■ ●, хоёрдугаар мөрт ■ ● ▲, гуравдугаар мөрт ● ? ■ — асуултын тэмдгийн оронд юу орох вэ?",
    options: [
      { id: "iq-v001-a", text: "▲", value: 1 },
      { id: "iq-v001-b", text: "■", value: 0 },
      { id: "iq-v001-c", text: "●", value: 0 },
      { id: "iq-v001-d", text: "◆", value: 0 },
    ],
  },
  {
    id: "iq-visual-002",
    category: "visual",
    text: "Куб 3 удаа эргэлдэж байна. Нэг талд ★, эсрэг талд ○ байна. Дараахь байрлалд ★ хаана байна вэ?",
    options: [
      { id: "iq-v002-a", text: "Дээрх талд", value: 0 },
      { id: "iq-v002-b", text: "Доорх талд", value: 1 },
      { id: "iq-v002-c", text: "Баруун талд", value: 0 },
      { id: "iq-v002-d", text: "Зүүн талд", value: 0 },
    ],
  },
  {
    id: "iq-visual-003",
    category: "visual",
    text: "Том квадратын гадна тойрог байна, тойргийн дотор гурвалжин байна. Гурвалжин хаана байна вэ?",
    options: [
      { id: "iq-v003-a", text: "Квадратын доторх тойргийн дотор", value: 1 },
      { id: "iq-v003-b", text: "Тойргийн гадна, квадратын дотор", value: 0 },
      { id: "iq-v003-c", text: "Квадратын гадна", value: 0 },
      { id: "iq-v003-d", text: "Тойргийн дотор, квадратын гадна", value: 0 },
    ],
  },
  {
    id: "iq-language-001",
    category: "language",
    text: "Аналоги: НАР : ГЭРЭЛ = ЦАХИЛГААН : ?",
    options: [
      { id: "iq-lang001-a", text: "Усан цахилгаан станц", value: 0 },
      { id: "iq-lang001-b", text: "Дулаан", value: 0 },
      { id: "iq-lang001-c", text: "Гэрэлтүүлэг", value: 1 },
      { id: "iq-lang001-d", text: "Соронзон", value: 0 },
    ],
  },
  {
    id: "iq-language-002",
    category: "language",
    text: "Дараахь үгнүүдийн аль нь бусдаасаа ялгаатай вэ? Алим, Нийлэг, Лийр, Тавиур, Үзэм",
    options: [
      { id: "iq-lang002-a", text: "Алим", value: 0 },
      { id: "iq-lang002-b", text: "Нийлэг", value: 1 },
      { id: "iq-lang002-c", text: "Лийр", value: 0 },
      { id: "iq-lang002-d", text: "Тавиур", value: 0 },
    ],
  },
  {
    id: "iq-language-003",
    category: "language",
    text: 'Өгүүлбэрийг гүйцээнэ үү: "Чимэглэлгүй байшин нь _____ байшинтай адил."',
    options: [
      { id: "iq-lang003-a", text: "Цонхгүй", value: 0 },
      { id: "iq-lang003-b", text: "Сэтгэлгүй хүнтэй", value: 0 },
      { id: "iq-lang003-c", text: "Үзэмжгүй", value: 0 },
      { id: "iq-lang003-d", text: "Нүүрний илэрхийлэлгүй хүнтэй", value: 1 },
    ],
  },
  {
    id: "iq-divergent-001",
    category: "divergent",
    text: "Тоосго ямар олон хэрэглээтэй байж болох вэ? (Хамгийн бүтээлч хариултыг сонгоно уу)",
    options: [
      { id: "iq-d001-a", text: "Барилгад хэрэглэх, хашаа хийх", value: 0 },
      {
        id: "iq-d001-b",
        text: "Хавтан болгох, хайрцаг хийх, усны сав болгох, зур хийх, гар утасны дэр, ном хавчих",
        value: 1,
      },
      { id: "iq-d001-c", text: "Дулаалга болгох", value: 0 },
      { id: "iq-d001-d", text: "Хүнд жин болгох", value: 0 },
    ],
  },
  {
    id: "iq-divergent-002",
    category: "divergent",
    text: "Хэрэв цаг зогссон бол юу болох вэ? Хамгийн сонирхолтой үр дагаврыг сонгоно уу.",
    options: [
      { id: "iq-d002-a", text: "Хүмүүс цагаа мэдэхгүй болно", value: 0 },
      { id: "iq-d002-b", text: "Хуваарь алдагдана", value: 0 },
      {
        id: "iq-d002-c",
        text: "Хүн бүр өөрийн дотоод цагаар амьдарч, нийгмийн зохицуулалт шинэ хэлбэрт шилжинэ",
        value: 1,
      },
      {
        id: "iq-d002-d",
        text: "Цагийн дагуу ажилладаг машин бүр зогсоно",
        value: 0,
      },
    ],
  },
  {
    id: "iq-divergent-003",
    category: "divergent",
    text: "Дугуй ашиглан ямар олон бүтэц зохиож болох вэ?",
    options: [
      { id: "iq-d003-a", text: "Тэрэг, унадаг дугуй", value: 0 },
      { id: "iq-d003-b", text: "Гэрийн хаалга, цонх, ширээний хөл", value: 0 },
      {
        id: "iq-d003-c",
        text: "Тэрэг, унадаг дугуй, усан сан, цонхны хүрээ, ширээний хөл, ороолт, хашаа",
        value: 1,
      },
      { id: "iq-d003-d", text: "Зөвхөн тээврийн хэрэгсэлд", value: 0 },
    ],
  },
  {
    id: "iq-logic-004",
    category: "logic",
    text: "Хэрэв 5 хүн 5 минутад 5 ажлыг хийдэг бол 100 хүн 100 минутад хэдэн ажлыг хийх вэ?",
    options: [
      { id: "iq-l004-a", text: "100", value: 0 },
      { id: "iq-l004-b", text: "500", value: 0 },
      { id: "iq-l004-c", text: "2000", value: 1 },
      { id: "iq-l004-d", text: "1000", value: 0 },
    ],
  },
  {
    id: "iq-visual-004",
    category: "visual",
    text: 'Тусгалаас (зеркалаас) харахад "МЭРГЭЖИЛ" гэсэн үг ямар харагдах вэ?',
    options: [
      { id: "iq-v004-a", text: "ЛИЖЭГРЭМ", value: 0 },
      { id: "iq-v004-b", text: "ЛИЖЭГРЭМ (хэвтээ тусгал)", value: 1 },
      { id: "iq-v004-c", text: "МЭРГЭЖИЛ (өөрчлөлтгүй)", value: 0 },
      { id: "iq-v004-d", text: "Огт харагдахгүй", value: 0 },
    ],
  },
  {
    id: "iq-language-004",
    category: "language",
    text: "Дараахь үгнүүдийн нийтлэг шинжийг олно уу: Усан онгоц, Нисэх онгоц, Галт тэрэг, Автобус",
    options: [
      { id: "iq-lang004-a", text: "Бүгд хурдан", value: 0 },
      { id: "iq-lang004-b", text: "Бүгд зорчигч тээврийн хэрэгсэл", value: 1 },
      { id: "iq-lang004-c", text: "Бүгд дугуйтай", value: 0 },
      { id: "iq-lang004-d", text: "Бүгд агаараар нисдэг", value: 0 },
    ],
  },
];

// Skills Questions (12 sample)
export const skillsQuestions: Question[] = [
  {
    id: "skills-tech-001",
    category: "technical",
    text: "Таны компьютер гэнэт удааширвал та юу хийх вэ?",
    options: [
      {
        id: "sk-t001-a",
        text: "Task Manager нээж, хэт их нөөц ашиглаж буй процессуудыг зогсооно",
        value: 3,
      },
      { id: "sk-t001-b", text: "Дахин ачааллах (restart) хийнэ", value: 2 },
      { id: "sk-t001-c", text: "Техникч дуудна", value: 1 },
      { id: "sk-t001-d", text: "Хэрхэн засахаа мэдэхгүй", value: 0 },
    ],
  },
  {
    id: "skills-tech-002",
    category: "technical",
    text: "Excel эсвэл Google Sheets-ийн хэрэглээний талаар та хэрхэн үнэлэх вэ?",
    options: [
      {
        id: "sk-t002-a",
        text: "Macro, Pivot table, advanced формула ашиглаж чаддаг",
        value: 3,
      },
      { id: "sk-t002-b", text: "Суурь формула, chart хийж чаддаг", value: 2 },
      { id: "sk-t002-c", text: "Зөвхөн мэдээлэл оруулж чаддаг", value: 1 },
      { id: "sk-t002-d", text: "Бараг ашиглаагүй", value: 0 },
    ],
  },
  {
    id: "skills-tech-003",
    category: "technical",
    text: "Программ хангамж (код бичих) талаар таны туршлага ямар вэ?",
    options: [
      {
        id: "sk-t003-a",
        text: "Нэг буюу түүнээс дээш программчлалын хэлийг ашиглаж чаддаг",
        value: 3,
      },
      {
        id: "sk-t003-b",
        text: "HTML/CSS буюу энгийн скрипт бичиж үзсэн",
        value: 2,
      },
      { id: "sk-t003-c", text: "Бага зэрэг сонирхолтой, сурч байна", value: 1 },
      { id: "sk-t003-d", text: "Огт туршлагагүй", value: 0 },
    ],
  },
  {
    id: "skills-social-001",
    category: "social",
    text: "Та шинэ хүнтэй яриа эхлүүлэхдээ ямар байдаг вэ?",
    options: [
      {
        id: "sk-s001-a",
        text: "Байгалийн жамаар яриа эхлүүлж, тухтай мэдрэмж бий болгодог",
        value: 3,
      },
      {
        id: "sk-s001-b",
        text: "Хэсэг хугацаанд дасахад бэрхшээлтэй боловч чаддаг",
        value: 2,
      },
      { id: "sk-s001-c", text: "Нөгөө хүн эхлэхийг хүлээдэг", value: 1 },
      { id: "sk-s001-d", text: "Маш хэцүү, зайлсхийдэг", value: 0 },
    ],
  },
  {
    id: "skills-social-002",
    category: "social",
    text: "Багийнхантайгаа зөрчил гарвал та хэрхэн шийддэг вэ?",
    options: [
      {
        id: "sk-s002-a",
        text: "Хоёр талын байр суурийг сонсож, зуучлалаар шийддэг",
        value: 3,
      },
      { id: "sk-s002-b", text: "Шууд ярьж, тодорхой шийдэлд хүрдэг", value: 2 },
      { id: "sk-s002-c", text: "Удирдагчид даалгадаг", value: 1 },
      {
        id: "sk-s002-d",
        text: "Зөрчлийг зайлсхийж, чимээгүй байдаг",
        value: 0,
      },
    ],
  },
  {
    id: "skills-social-003",
    category: "social",
    text: "Та олны өмнө илтгэл тавихдаа ямар байдаг вэ?",
    options: [
      {
        id: "sk-s003-a",
        text: "Тайван, итгэлтэй, чөлөөтэй илтгэдэг",
        value: 3,
      },
      { id: "sk-s003-b", text: "Бэлдсэний дараа сайн хийж чаддаг", value: 2 },
      { id: "sk-s003-c", text: "Нэлээд сандарч, хэцүүдэж байдаг", value: 1 },
      { id: "sk-s003-d", text: "Аль болох зайлсхийдэг", value: 0 },
    ],
  },
  {
    id: "skills-creative-001",
    category: "creative",
    text: "Та ажлын танилцуулга, постер эсвэл дизайн хийх шаардлага гарвал яадаг вэ?",
    options: [
      {
        id: "sk-c001-a",
        text: "Идэвхтэй хийж, өвөрмөц, анхаарал татахуйц байдлаар бүтээдэг",
        value: 3,
      },
      {
        id: "sk-c001-b",
        text: "Загвар (template) ашиглаж, дасгал хийдэг",
        value: 2,
      },
      {
        id: "sk-c001-c",
        text: "Хийж чадах боловч тийм ч сонирхолтой биш",
        value: 1,
      },
      { id: "sk-c001-d", text: "Хэн нэгнийг гуйдаг", value: 0 },
    ],
  },
  {
    id: "skills-creative-002",
    category: "creative",
    text: "Стандарт бус асуудалтай тулгарвал та ямар хандлагатай байдаг вэ?",
    options: [
      {
        id: "sk-c002-a",
        text: "Хэд хэдэн өөр арга замыг тооцоолж, шинэ шийдэл хайдаг",
        value: 3,
      },
      {
        id: "sk-c002-b",
        text: "Туршлагаасаа ижил төстэй нөхцөл хайдаг",
        value: 2,
      },
      { id: "sk-c002-c", text: "Хэн нэгний тусламж хүсдэг", value: 1 },
      { id: "sk-c002-d", text: "Хэцүүдэж, стрест ордог", value: 0 },
    ],
  },
  {
    id: "skills-creative-003",
    category: "creative",
    text: "Та чөлөөт цагаараа бүтээлч ажил хийх дуртай юу?",
    options: [
      {
        id: "sk-c003-a",
        text: "Тийм, байнга зурдаг / бичдэг / хийдэг / зохиодог",
        value: 3,
      },
      { id: "sk-c003-b", text: "Заримдаа, сонирхол татвал хийдэг", value: 2 },
      { id: "sk-c003-c", text: "Бага зэрэг, тийм ч идэвхтэй биш", value: 1 },
      { id: "sk-c003-d", text: "Үгүй, тийм ч сонирхолтой биш", value: 0 },
    ],
  },
  {
    id: "skills-leadership-001",
    category: "leadership",
    text: "Баг ажилд та ямар үүрэг гүйцэтгэхийг хүсдэг вэ?",
    options: [
      {
        id: "sk-l001-a",
        text: "Удирдагч, стратеги боловсруулж, хуваарилдаг",
        value: 3,
      },
      {
        id: "sk-l001-b",
        text: "Тэргүүлэгч гишүүн, санаачилга гаргадаг",
        value: 2,
      },
      { id: "sk-l001-c", text: "Гишүүн, даалгасан ажлыг хийдэг", value: 1 },
      { id: "sk-l001-d", text: "Ганцаараа ажиллахыг илүүд үздэг", value: 0 },
    ],
  },
  {
    id: "skills-leadership-002",
    category: "leadership",
    text: "Та хүмүүсийг удирдаж, урам зориг өгч байсан туршлага байна уу?",
    options: [
      {
        id: "sk-l002-a",
        text: "Тийм, багийн удирдагч, ангийн дарга, клубын ерөнхийлөгч байсан",
        value: 3,
      },
      { id: "sk-l002-b", text: "Зарим тохиолдолд удирдаж байсан", value: 2 },
      { id: "sk-l002-c", text: "Хааяа нэгдсэн боловч удирдагч биш", value: 1 },
      { id: "sk-l002-d", text: "Тийм туршлага байхгүй", value: 0 },
    ],
  },
  {
    id: "skills-leadership-003",
    category: "leadership",
    text: "Таны урт хугацааны зорилго тодорхойлох чадвар ямар вэ?",
    options: [
      {
        id: "sk-l003-a",
        text: "5-10 жилийн тодорхой төлөвлөгөөтэй, үе шаттай зорилготой",
        value: 3,
      },
      {
        id: "sk-l003-b",
        text: "1-3 жилийн зорилготой, тодорхой биш",
        value: 2,
      },
      { id: "sk-l003-c", text: "Зөвхөн ойрын зорилготой", value: 1 },
      { id: "sk-l003-d", text: "Тодорхой зорилгогүй", value: 0 },
    ],
  },
];

export const IQ_CATEGORIES = [
  {
    id: "iq-cat-logic",
    key: "logic",
    label: "Логик",
    icon: "🔢",
    color: "text-blue-600",
  },
  {
    id: "iq-cat-visual",
    key: "visual",
    label: "Орон зай",
    icon: "🔷",
    color: "text-violet-600",
  },
  {
    id: "iq-cat-language",
    key: "language",
    label: "Хэл",
    icon: "📝",
    color: "text-emerald-600",
  },
  {
    id: "iq-cat-divergent",
    key: "divergent",
    label: "Бүтээлч",
    icon: "💡",
    color: "text-amber-600",
  },
];

export const SKILLS_CATEGORIES = [
  {
    id: "skills-cat-technical",
    key: "technical",
    label: "Техник",
    icon: "⚙️",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "skills-cat-social",
    key: "social",
    label: "Нийгмийн",
    icon: "🤝",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "skills-cat-creative",
    key: "creative",
    label: "Бүтээлч",
    icon: "🎨",
    color: "bg-violet-100 text-violet-700",
  },
  {
    id: "skills-cat-leadership",
    key: "leadership",
    label: "Удирдлага",
    icon: "🏆",
    color: "bg-amber-100 text-amber-700",
  },
];
