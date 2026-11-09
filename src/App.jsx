import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "shadow-system-v1";

const ranks = [
  { name: "E", xp: 0, color: "#9ca3af", title: "Awakened" },
  { name: "D", xp: 800, color: "#60a5fa", title: "Novice Hunter" },
  { name: "C", xp: 2200, color: "#34d399", title: "Skilled Hunter" },
  { name: "B", xp: 5000, color: "#a78bfa", title: "Elite Hunter" },
  { name: "A", xp: 9000, color: "#f59e0b", title: "Master Hunter" },
  { name: "S", xp: 15000, color: "#ef4444", title: "National Level" },
  { name: "SS", xp: 25000, color: "#e879f9", title: "Shadow Commander" },
  { name: "SSS", xp: 40000, color: "#22d3ee", title: "Monarch Candidate" },
  { name: "SHADOW MONARCH", xp: 60000, color: "#c084fc", title: "The One Who Rules Death" },
];

const studyPlan = [
  {
    subject: "شیمی دارویی",
    topic: "مبانی شیمی دارویی، رابطه ساختار و فعالیت (SAR)",
    task: "یک دارو انتخاب کن، ساختار شیمیایی و گروه‌های عاملی آن را بررسی کن.",
    duration: 60,
  },
  {
    subject: "فارماکولوژی",
    topic: "فارماکودینامیک و فارماکوکینتیک",
    task: "مفهوم گیرنده، آگونیست، آنتاگونیست، نیمه‌عمر و حجم توزیع را یاد بگیر.",
    duration: 60,
  },
  {
    subject: "دارودرمانی",
    topic: "اصول انتخاب درمان و ارزیابی بیمار",
    task: "یک بیماری شایع انتخاب کن و اهداف درمانی و گروه‌های دارویی آن را مطالعه کن.",
    duration: 60,
  },
  {
    subject: "فیزیکال فارماسی",
    topic: "حلالیت، انحلال و خواص فیزیکوشیمیایی دارو",
    task: "رابطه pH و pKa با یونیزاسیون و حلالیت دارو را بررسی کن.",
    duration: 60,
  },
  {
    subject: "فارماسیوتیکس",
    topic: "اشکال دارویی و سیستم‌های رهایش دارو",
    task: "قرص، کپسول، سوسپانسیون و سیستم‌های آهسته‌رهش را مقایسه کن.",
    duration: 60,
  },
  {
    subject: "بیوتکنولوژی دارویی",
    topic: "پروتئین‌های نوترکیب و آنتی‌بادی‌های مونوکلونال",
    task: "مراحل تولید یک داروی بیولوژیک را به زبان خودت توضیح بده.",
    duration: 60,
  },
  {
    subject: "مرور هفتگی",
    topic: "مرور و بازیابی فعال مطالب هفته",
    task: "بدون نگاه کردن به جزوه، مطالب هفته را یادآوری و سپس اشکالاتت را اصلاح کن.",
    duration: 90,
  },
];

const focusPlan = [
  {
    title: "تمرین توجه به تنفس",
    instruction:
      "۱۰ دقیقه بنشین. توجهت را روی تنفس بگذار. هر بار ذهنت منحرف شد، بدون سرزنش به تنفس برگرد.",
    duration: 10,
  },
  {
    title: "تمرین تمرکز نقطه‌ای",
    instruction:
      "به یک نقطه ثابت نگاه کن. به مدت ۳ دقیقه نگاهت را حفظ کن و سپس ۲ دقیقه با چشمان بسته تصویر آن نقطه را تجسم کن.",
    duration: 5,
  },
  {
    title: "تمرین حافظه فعال",
    instruction:
      "۱۰ کلمه انتخاب کن. آن‌ها را بخوان، سپس بدون نگاه کردن به فهرست، کلمات را به خاطر بیاور. نتیجه را ثبت کن.",
    duration: 10,
  },
  {
    title: "تمرین مطالعه عمیق",
    instruction:
      "۲۵ دقیقه فقط روی یک موضوع مطالعه کن. تلفن را کنار بگذار. در پایان، ۵ نکته را از حافظه بنویس.",
    duration: 30,
  },
  {
    title: "تجسم ذهنی",
    instruction:
      "یک محیط آشنا را با جزئیات تجسم کن. رنگ‌ها، صداها، مسیرها و اشیا را در ذهن بازسازی کن.",
    duration: 10,
  },
  {
    title: "تمرین مشاهده",
    instruction:
      "یک شیء را انتخاب کن. ۵ دقیقه جزئیات آن را بررسی کن و سپس بدون نگاه کردن، تمام ویژگی‌هایش را بنویس.",
    duration: 10,
  },
  {
    title: "آزمون سکوت ذهن",
    instruction:
      "۱۰ دقیقه در محیط آرام بنشین. افکار را مشاهده کن، بدون اینکه دنبالشان بروی یا آن‌ها را سرکوب کنی.",
    duration: 10,
  },
];

const occultPlan = [
  {
    title: "تاریخ جادوگری",
    topic: "تاریخ جادوگری در مصر باستان",
    task: "درباره باورهای مصر باستان در مورد مرگ، زندگی پس از مرگ و آیین‌های تدفین مطالعه کن.",
  },
  {
    title: "نکرومنسی",
    topic: "نکرومنسی در اسطوره‌شناسی",
    task: "بازنمایی ارتباط با مردگان در اسطوره‌های یونان و مصر را بررسی کن.",
  },
  {
    title: "چاکرا",
    topic: "هفت چاکرا در سنت‌های هندی",
    task: "مفهوم هفت چاکرا و ارتباط نمادین آن‌ها با بدن و خودشناسی را مطالعه کن.",
  },
  {
    title: "چشم سوم",
    topic: "مفهوم آجنا در سنت‌های هندی",
    task: "درباره مفهوم آجنا، شهود و جایگاه آن در سنت‌های معنوی تحقیق کن.",
  },
  {
    title: "متافیزیک",
    topic: "تاریخ فلسفه متافیزیک",
    task: "تفاوت متافیزیک فلسفی، عرفان و ادعاهای فراطبیعی را بررسی کن.",
  },
  {
    title: "اسطوره‌شناسی",
    topic: "خدایان جهان زیرین",
    task: "هادس، آنوبیس و دیگر شخصیت‌های مرتبط با جهان مردگان را مقایسه کن.",
  },
  {
    title: "خودشناسی",
    topic: "سایه در روان‌شناسی یونگ",
    task: "مفهوم Shadow در نظریات یونگ را مطالعه و درباره جنبه‌های ناشناخته شخصیت خودت یادداشت‌برداری کن.",
  },
];

const initialProfile = {
  name: "Shadow Hunter",
  age: 22,
  gender: "ثبت نشده",
  height: 173,
  weight: 93,
  calories: 0,
  dailyWater: 0,
  sugar: "",
  sleepHours: 8,
};

const defaultData = {
  profile: initialProfile,
  totalXP: 0,
  startDate: new Date().toISOString().slice(0, 10),
  history: {},
  completedDays: 0,
};

function getDateKey(date = new Date()) {
  return date.toLocaleDateString("en-CA");
}

function getDayNumber(startDate) {
  const start = new Date(startDate + "T00:00:00");
  const today = new Date(getDateKey() + "T00:00:00");

  return Math.max(
    1,
    Math.floor((today.getTime() - start.getTime()) / 86400000) + 1
  );
}

function getRank(xp) {
  return [...ranks].reverse().find((rank) => xp >= rank.xp) || ranks[0];
}

function getNextRank(xp) {
  return ranks.find((rank) => rank.xp > xp) || null;
}

function makeDailyTasks(day) {
  const odd = day % 2 === 1;
  const focus = focusPlan[(day - 1) % focusPlan.length];
  const study = studyPlan[(day - 1) % studyPlan.length];
  const occult = occultPlan[(day - 1) % occultPlan.length];

  return [
    {
      id: "pushups",
      category: "قدرت بدنی",
      title: `شنا سوئدی: ${10 + day - 1} عدد`,
      description: "با فرم صحیح اجرا کن. در صورت نیاز تعداد را به ست‌های کوچک تقسیم کن.",
      xp: 12,
    },
    {
      id: "situps",
      category: "قدرت بدنی",
      title: `دراز و نشست: ${40 + day - 1} عدد`,
      description: "حرکت کنترل‌شده و بدون فشار به گردن.",
      xp: 12,
    },
    {
      id: "plank",
      category: "قدرت بدنی",
      title: `پلانک: ${45 + day - 1} ثانیه`,
      description: "بدن را در یک خط نگه دار. در صورت افت فرم، تمرین را متوقف کن.",
      xp: 12,
    },
    {
      id: "training",
      category: "تمرین اصلی",
      title: odd ? "بوکس و طناب زدن" : "باشگاه",
      description: odd
        ? "یک ساعت تمرین متناسب با آمادگی بدنی؛ شدت را تدریجی افزایش بده."
        : "یک ساعت تمرین مقاومتی با گرم‌کردن و سردکردن مناسب.",
      xp: 25,
    },
    {
      id: "meditation",
      category: "ذهن",
      title: "مدیتیشن روزانه",
      description: "۱۰ تا ۱۵ دقیقه مدیتیشن تنفسی و مشاهده افکار.",
      xp: 10,
    },
    {
      id: "focus",
      category: "تمرکز",
      title: focus.title,
      description: focus.instruction,
      xp: 15,
    },
    {
      id: "study",
      category: "داروسازی",
      title: `مطالعه عمیق: ${study.subject}`,
      description: `${study.topic} — ${study.task}`,
      xp: 25,
    },
    {
      id: "occult",
      category: "دانش متافیزیکی",
      title: occult.title,
      description: `${occult.topic} — ${occult.task}`,
      xp: 10,
    },
    {
      id: "water",
      category: "سلامت",
      title: "نوشیدن ۸ لیوان آب",
      description: "هر لیوان حدود ۲۵۰ میلی‌لیتر.",
      xp: 8,
    },
    {
      id: "quran",
      category: "معنویت",
      title: "مطالعه یک صفحه قرآن",
      description: "با توجه به ترجمه و مفهوم آیات.",
      xp: 8,
    },
    {
      id: "fajr",
      category: "عبادت",
      title: "نماز صبح",
      description: "انجام نماز صبح.",
      xp: 8,
    },
    {
      id: "dhuhr",
      category: "عبادت",
      title: "نماز ظهر",
      description: "انجام نماز ظهر.",
      xp: 8,
    },
    {
      id: "isha",
      category: "عبادت",
      title: "نماز شب",
      description: "نماز شب/عشاء.",
      xp: 8,
    },
    {
      id: "sleep",
      category: "ریکاوری",
      title: "خواب سالم",
      description: "هدف ۷ تا ۹ ساعت خواب با ساعت خواب نسبتاً ثابت.",
      xp: 10,
    },
  ];
}

function App() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    } catch {
      return defaultData;
    }
  });

  const [now, setNow] = useState(new Date());
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProfile, setShowProfile] = useState(false);
  const [showDungeon, setShowDungeon] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [newWeight, setNewWeight] = useState("");
  const [newCalories, setNewCalories] = useState("");

  const today = getDateKey();
  const day = getDayNumber(data.startDate);
  const tasks = useMemo(() => makeDailyTasks(day), [day]);

  const todayData = data.history[today] || {
    completed: [],
    claimed: [],
  };

  const rank = getRank(data.totalXP);
  const nextRank = getNextRank(data.totalXP);

  const progress = nextRank
    ? ((data.totalXP - rank.xp) / (nextRank.xp - rank.xp)) * 100
    : 100;

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = (updater) => {
    setData((previous) =>
      typeof updater === "function" ? updater(previous) : updater
    );
  };

  function updateProfile(field, value) {
    updateData((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }));
  }

  function toggleTask(id, xp) {
    const isDone = todayData.completed.includes(id);

    if (isDone) {
      updateData((prev) => {
        const history = { ...prev.history };
        const current = history[today] || { completed: [], claimed: [] };

        history[today] = {
          ...current,
          completed: current.completed.filter((item) => item !== id),
          claimed: current.claimed.filter((item) => item !== id),
        };

        return {
          ...prev,
          history,
          totalXP: Math.max(0, prev.totalXP - (current.claimed.includes(id) ? xp : 0)),
        };
      });
    } else {
      updateData((prev) => {
        const history = { ...prev.history };
        const current = history[today] || { completed: [], claimed: [] };

        history[today] = {
          ...current,
          completed: [...current.completed, id],
          claimed: [...current.claimed, id],
        };

        return {
          ...prev,
          history,
          totalXP: prev.totalXP + xp,
        };
      });
    }
  }

  function addWater() {
    if (data.profile.dailyWater >= 8) return;

    updateProfile("dailyWater", data.profile.dailyWater + 1);
  }

  function resetWater() {
    updateProfile("dailyWater", 0);
  }

  function saveWeight() {
    if (!newWeight || Number(newWeight) <= 0) return;
    updateProfile("weight", Number(newWeight));
    setNewWeight("");
  }

  function saveCalories() {
    if (!newCalories || Number(newCalories) < 0) return;
    updateProfile("calories", Number(newCalories));
    setNewCalories("");
  }

  const completedCount = todayData.completed.length;
  const dailyPercent = Math.round((completedCount / tasks.length) * 100);

  const bmi = (
    data.profile.weight /
    ((data.profile.height / 100) ** 2)
  ).toFixed(1);

  const dateString = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(now);

  const clock = now.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const calendar = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const key = getDateKey(date);
    const record = data.history[key];
    return {
      date,
      key,
      completed: record?.completed?.length || 0,
    };
  });

  const categories = [...new Set(tasks.map((task) => task.category))];

  const secretMissions = [
    {
      title: "The Awakening",
      description: "سه روز متوالی حداقل ۷۰ درصد مأموریت‌ها را انجام بده.",
      condition: "پایداری و نظم",
      reward: 100,
    },
    {
      title: "Scholar of Shadows",
      description: "در یک روز ۹۰ دقیقه مطالعه عمیق انجام بده.",
      condition: "پیشرفت علمی",
      reward: 150,
    },
    {
      title: "Iron Body",
      description: "هفت روز فعالیت بدنی منظم و متناسب با توانت داشته باش.",
      condition: "قدرت و استقامت",
      reward: 200,
    },
    {
      title: "Silent Mind",
      description: "هفت روز تمرین تمرکز و مدیتیشن را ثبت کن.",
      condition: "انضباط ذهنی",
      reward: 150,
    },
  ];

  const dungeons = [
    {
      title: "Dungeon: Foundation",
      description: "مرور مبانی شیمی دارویی و فارماکولوژی",
      difficulty: "E",
      reward: 100,
    },
    {
      title: "Dungeon: Iron Discipline",
      description: "هفت روز پایبندی به برنامه ورزشی",
      difficulty: "D",
      reward: 150,
    },
    {
      title: "Dungeon: Shadow Library",
      description: "مطالعه و خلاصه‌نویسی سه مقاله علمی",
      difficulty: "C",
      reward: 250,
    },
    {
      title: "Dungeon: Pharmacology Master",
      description: "تسلط بر یک مبحث داروشناسی و حل ۳۰ سؤال",
      difficulty: "B",
      reward: 400,
    },
  ];

  function claimReward(reward, title) {
    const key = "mission-" + title;
    if (todayData.claimed.includes(key)) return;

    updateData((prev) => {
      const history = { ...prev.history };
      const current = history[today] || { completed: [], claimed: [] };

      history[today] = {
        ...current,
        claimed: [...current.claimed, key],
      };

      return {
        ...prev,
        history,
        totalXP: prev.totalXP + reward,
      };
    });
  }

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap');

        :root {
          --bg: #080914;
          --panel: #101426;
          --panel2: #151c32;
          --purple: #a855f7;
          --cyan: #22d3ee;
          --text: #e9e8f5;
          --muted: #929bb5;
          --border: rgba(168,85,247,.22);
        }

        * { box-sizing: border-box; }

        body {
          margin: 0;
          background: var(--bg);
          color: var(--text);
          font-family: 'Vazirmatn', sans-serif;
        }

        button, input, select {
          font-family: inherit;
        }

        button { cursor: pointer; }

        .app {
          min-height: 100vh;
          background:
            radial-gradient(ellipse at 80% 0%, rgba(109,40,217,.16), transparent 35%),
            radial-gradient(ellipse at 0% 50%, rgba(8,145,178,.08), transparent 40%),
            var(--bg);
        }

        .topbar {
          min-height: 78px;
          padding: 15px 5%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
          background: rgba(8,9,20,.9);
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: blur(15px);
          gap: 15px;
        }

        .logo {
          color: #c084fc;
          font-size: 20px;
          font-weight: 900;
          letter-spacing: 1px;
          text-shadow: 0 0 20px #a855f7;
        }

        .clock {
          text-align: left;
          color: var(--cyan);
          font-size: 13px;
        }

        .clock strong {
          display: block;
          font-size: 19px;
        }

        .layout {
          display: grid;
          grid-template-columns: 225px minmax(0,1fr);
          max-width: 1500px;
          margin: auto;
          min-height: calc(100vh - 78px);
        }

        .sidebar {
          padding: 25px 15px;
          border-left: 1px solid var(--border);
          background: rgba(12,15,30,.75);
        }

        .nav-title {
          color: var(--muted);
          font-size: 11px;
          padding: 10px;
        }

        .nav-btn {
          width: 100%;
          border: 1px solid transparent;
          background: transparent;
          color: #b6bfd7;
          padding: 13px;
          text-align: right;
          border-radius: 10px;
          margin: 3px 0;
          transition: .2s;
        }

        .nav-btn:hover, .nav-btn.active {
          background: rgba(168,85,247,.14);
          border-color: var(--border);
          color: #d8b4fe;
        }

        .content {
          padding: 28px;
          min-width: 0;
        }

        .hero {
          padding: 25px;
          border: 1px solid var(--border);
          border-radius: 17px;
          background:
            linear-gradient(120deg, rgba(88,28,135,.32), transparent 65%),
            var(--panel);
          position: relative;
          overflow: hidden;
        }

        .hero:after {
          content: '影';
          position: absolute;
          left: 30px;
          top: -45px;
          font-size: 190px;
          color: rgba(168,85,247,.07);
          pointer-events: none;
        }

        .hero-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .eyebrow {
          color: var(--cyan);
          font-size: 12px;
          letter-spacing: 2px;
        }

        h1 {
          font-size: clamp(22px, 3vw, 34px);
          margin: 8px 0;
        }

        .rank-badge {
          border: 1px solid;
          padding: 12px 22px;
          border-radius: 12px;
          font-size: 26px;
          font-weight: 900;
          text-align: center;
          background: rgba(255,255,255,.025);
          box-shadow: 0 0 25px rgba(168,85,247,.1);
        }

        .muted { color: var(--muted); font-size: 13px; }

        .stats {
          display: grid;
          grid-template-columns: repeat(4,minmax(0,1fr));
          gap: 13px;
          margin: 18px 0;
        }

        .card {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 13px;
          padding: 17px;
          min-width: 0;
        }

        .stat-value {
          font-size: 25px;
          font-weight: 800;
          margin: 8px 0;
        }

        .purple { color: #c084fc; }
        .cyan { color: var(--cyan); }
        .green { color: #4ade80; }
        .orange { color: #fbbf24; }

        .progress {
          height: 9px;
          border-radius: 10px;
          background: #242b40;
          overflow: hidden;
          margin: 12px 0;
        }

        .progress > div {
          height: 100%;
          background: linear-gradient(90deg,#7c3aed,#22d3ee);
          border-radius: 10px;
          transition: width .3s;
        }

        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin: 26px 0 13px;
        }

        .section-head h2 { font-size: 18px; margin: 0; }

        .grid2 {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 14px;
        }

        .task {
          border: 1px solid rgba(148,163,184,.16);
          background: var(--panel);
          border-radius: 12px;
          padding: 15px;
          transition: .2s;
        }

        .task.done {
          border-color: rgba(74,222,128,.45);
          background: rgba(20,83,45,.13);
        }

        .task-head {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: flex-start;
        }

        .task h3 { font-size: 14px; margin: 0 0 7px; }

        .tag {
          color: #c4b5fd;
          background: rgba(139,92,246,.13);
          padding: 3px 8px;
          border-radius: 20px;
          font-size: 10px;
          white-space: nowrap;
