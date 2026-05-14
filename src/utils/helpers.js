export const uid = () => Math.random().toString(36).slice(2, 10);

export const todayStr = () => new Date().toISOString().slice(0, 10);

export const daysBetween = (a, b) =>
  Math.ceil((new Date(a) - new Date(b)) / 86400000);

export const formatDate = (d) => {
  if (!d) return "";
  const dt = new Date(d + "T00:00:00");
  return dt.toLocaleDateString("zh-TW", { month: "short", day: "numeric" });
};

export const STORAGE_KEY = "smart-sticky-notes-data";

export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to save data:", e);
  }
};

export const loadData = () => {
  try {
    const d = localStorage.getItem(STORAGE_KEY);
    return d ? JSON.parse(d) : null;
  } catch (e) {
    return null;
  }
};

export const defaultNote = () => ({
  id: uid(),
  title: "",
  status: "todo",
  priority: "medium",
  colorIdx: 0,
  tags: [],
  dueDate: "",
  subtasks: [],
  createdAt: todayStr(),
  progress: 0,
  memo: "",
  fileLinks: [],
});

export function getFileIcon(url, name) {
  const lower = (name || url || "").toLowerCase();
  if (lower.match(/\.(pdf)$/)) return "📕";
  if (lower.match(/\.(docx?|rtf|odt)$/)) return "📘";
  if (lower.match(/\.(xlsx?|csv|tsv)$/)) return "📗";
  if (lower.match(/\.(pptx?|key)$/)) return "📙";
  if (lower.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) return "🖼️";
  if (lower.match(/\.(zip|rar|7z|tar|gz)$/)) return "📦";
  if (lower.match(/\.(py|r|js|ts|html|css|ipynb)$/)) return "💻";
  if (url && (url.includes("docs.google") || url.includes("drive.google"))) return "☁️";
  if (url && url.includes("dropbox.com")) return "☁️";
  if (url && (url.includes("onedrive") || url.includes("sharepoint"))) return "☁️";
  if (url && (url.includes("notion.so") || url.includes("notion.site"))) return "☁️";
  if (url && url.match(/^https?:\/\//)) return "🔗";
  return "📄";
}

export function getLinkType(url) {
  if (!url) return "local";
  if (url.match(/^https?:\/\//)) return "cloud";
  return "local";
}

export const sampleNotes = () => [
  {
    id: uid(), title: "完成文獻回顧第三章", status: "doing", priority: "urgent", colorIdx: 3,
    tags: ["研究", "寫作"], dueDate: "2026-02-14",
    subtasks: [
      { id: uid(), text: "整理 30 篇核心文獻", done: true },
      { id: uid(), text: "撰寫理論框架", done: false },
      { id: uid(), text: "交叉比對研究方法", done: false },
    ],
    createdAt: "2026-02-10", progress: 33,
    memo: "已完成文獻篩選，理論框架預計參考 Johnson (2024) 的分類方式",
    fileLinks: [
      { id: uid(), name: "文獻回顧草稿.docx", url: "C:\\Research\\Literature_Review_Ch3.docx", type: "local" },
      { id: uid(), name: "參考文獻清單", url: "https://docs.google.com/spreadsheets/d/example", type: "cloud" },
    ],
  },
  {
    id: uid(), title: "翻譯合作論文摘要", status: "todo", priority: "high", colorIdx: 4,
    tags: ["翻譯"], dueDate: "2026-02-18",
    subtasks: [
      { id: uid(), text: "英翻中初稿", done: false },
      { id: uid(), text: "校對專有名詞", done: false },
    ],
    createdAt: "2026-02-11", progress: 0,
    memo: "與李教授合作，注意 methodology 相關術語需統一",
    fileLinks: [
      { id: uid(), name: "原文論文.pdf", url: "C:\\Research\\Papers\\collaborative_paper.pdf", type: "local" },
    ],
  },
  {
    id: uid(), title: "提交 IRB 申請表", status: "todo", priority: "urgent", colorIdx: 5,
    tags: ["行政"], dueDate: "2026-02-13",
    subtasks: [], createdAt: "2026-02-08", progress: 0, memo: "", fileLinks: [],
  },
  {
    id: uid(), title: "整理實驗數據 Batch 5", status: "doing", priority: "medium", colorIdx: 1,
    tags: ["數據", "研究"], dueDate: "2026-02-20",
    subtasks: [
      { id: uid(), text: "清洗原始數據", done: true },
      { id: uid(), text: "跑統計分析", done: false },
    ],
    createdAt: "2026-02-09", progress: 50,
    memo: "原始數據有 12 筆異常值需確認是否排除",
    fileLinks: [
      { id: uid(), name: "Batch5 原始數據", url: "https://drive.google.com/file/d/example", type: "cloud" },
    ],
  },
  {
    id: uid(), title: "閱讀 Smith et al. (2025)", status: "done", priority: "low", colorIdx: 2,
    tags: ["閱讀"], dueDate: "2026-02-10",
    subtasks: [
      { id: uid(), text: "精讀方法論", done: true },
      { id: uid(), text: "摘錄重點筆記", done: true },
    ],
    createdAt: "2026-02-05", progress: 100,
    memo: "方法論部分對本研究有重要參考價值，已摘錄至 Notion",
    fileLinks: [],
  },
];
