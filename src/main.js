const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const overlay = document.querySelector(".nav-overlay");
const closeBtn = document.querySelector(".close-menu");

function openMenu(open) {
  overlay?.classList.toggle("is-open", open);
  toggle?.classList.toggle("is-open", open);
  document.body.style.overflow = open ? "hidden" : "";
  toggle?.setAttribute("aria-expanded", String(open));
}

toggle?.addEventListener("click", () => openMenu(!overlay.classList.contains("is-open")));
closeBtn?.addEventListener("click", () => openMenu(false));
overlay?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => openMenu(false)));

window.addEventListener("scroll", () => {
  if (!header) return;
  const y = window.scrollY;
  header.classList.toggle("is-solid", y > 40);
  const about = document.querySelector("#about, .page-hero");
  if (about && !document.body.classList.contains("subpage")) {
    const top = about.getBoundingClientRect().top;
    header.classList.toggle("is-light", top < 60 && y > 80);
  }
}, { passive: true });

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-in");
    });
  },
  { threshold: 0.16 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

function bindSlider(selector, prevSel, nextSel) {
  const track = document.querySelector(selector);
  if (!track) return;
  const step = () => Math.min(track.clientWidth * 0.8, 320);
  document.querySelector(prevSel)?.addEventListener("click", () => {
    track.scrollBy({ left: -step(), behavior: "smooth" });
  });
  document.querySelector(nextSel)?.addEventListener("click", () => {
    track.scrollBy({ left: step(), behavior: "smooth" });
  });
}

bindSlider(".concert-slider", ".concert-prev", ".concert-next");
bindSlider(".gallery-track", ".gallery-prev", ".gallery-next");

const toast = document.querySelector(".toast");
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    showToast("送信しました。担当者よりご連絡いたします。");
    form.reset();
  });
});

const calRoot = document.querySelector("[data-calendar]");
if (calRoot) {
  const events = {
    "2026-6-19": "荒絵里子",
    "2026-7-8": "伊藤美歩",
    "2026-7-9": "ショパンの午後",
    "2026-8-13": "小原孝",
    "2026-9-18": "高橋多佳子",
    "2026-10-7": "宮谷理香",
    "2026-10-22": "藤村俊介",
  };
  const monthLabel = calRoot.querySelector("[data-month]");
  const grid = calRoot.querySelector(".cal-grid");
  let cursor = new Date(2026, 6, 1);

  function render() {
    const y = cursor.getFullYear();
    const m = cursor.getMonth();
    monthLabel.textContent = `${y}年 ${m + 1}月`;
    const first = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    grid.innerHTML = ["日", "月", "火", "水", "木", "金", "土"]
      .map((d) => `<span class="dow">${d}</span>`)
      .join("");
    for (let i = 0; i < first; i++) grid.innerHTML += "<span></span>";
    for (let d = 1; d <= days; d++) {
      const key = `${y}-${m}-${d}`;
      const has = events[key];
      grid.innerHTML += `<span class="${has ? "event" : ""}" title="${has || ""}">${d}</span>`;
    }
  }
  calRoot.querySelector("[data-prev]")?.addEventListener("click", () => {
    cursor.setMonth(cursor.getMonth() - 1);
    render();
  });
  calRoot.querySelector("[data-next]")?.addEventListener("click", () => {
    cursor.setMonth(cursor.getMonth() + 1);
    render();
  });
  render();
}
