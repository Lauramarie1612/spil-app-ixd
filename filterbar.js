// Hjælpere
const $ = (s, scope = document) => scope.querySelector(s);
const $$ = (s, scope = document) => Array.from(scope.querySelectorAll(s));


// Tilbage-knap
$("#backBtn")?.addEventListener("click", () => {
 if (history.length > 1) history.back();
});


// Range labels + farvet spor
const duration = $("#duration");
const age = $("#age");
const durationVal = $("#durationVal");
const ageVal = $("#ageVal");


const fmtMin = (v) => `${v} min.`;
const fmtAge = (v) => (parseInt(v, 10) >= 18 ? "18+" : `${v} år`);


function setRangeFill(input, color = "#A3302D") {
 const min = parseFloat(input.min || 0);
 const max = parseFloat(input.max || 100);
 const val = parseFloat(input.value);
 const pct = ((val - min) / (max - min)) * 100;
 input.style.background = `linear-gradient(to right, ${color} 0% ${pct}%, #eee ${pct}% 100%)`;
}
function updateRanges() {
 durationVal.textContent = fmtMin(duration.value);
 ageVal.textContent = fmtAge(age.value);
 setRangeFill(duration);
 setRangeFill(age);
}
["input", "change"].forEach((ev) => {
 duration.addEventListener(ev, updateRanges);
 age.addEventListener(ev, updateRanges);
});
updateRanges();


// Sprog – multi-select
const languages = $("#languages");
languages.addEventListener("click", (e) => {
 const btn = e.target.closest(".chip");
 if (!btn) return;
 btn.classList.toggle("is-on");
});


// Sværhedsgrad – single-select
const levels = $("#levels");
levels.addEventListener("click", (e) => {
 const btn = e.target.closest(".level");
 if (!btn) return;
 $$(".level", levels).forEach((b) => b.classList.remove("is-on"));
 btn.classList.add("is-on");
});
