// 날짜(KST)별 알림 문구 선택. 앱과 같은 데이터·같은 날짜 계산을 씁니다.
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ctx = {}; vm.createContext(ctx);
for (const f of ["recipes", "recipes2", "stories"]) vm.runInContext(readFileSync(join(root, "js", f + ".js"), "utf8").replace(/^const /gm, "var "), ctx);
const { R, S } = ctx;
export const kst = (now = Date.now()) => new Date(now + 9 * 3600e3).toISOString().slice(0, 10);
const dayN = d => Math.floor(Date.parse(d + "T00:00:00Z") / 864e5);
const byEn = en => R.find(r => r[1] === en);
const SPECIAL = {
  "01-01": ["🎆 새해", ["Mimosa", "Bellini", "Champagne Cocktail"]],
  "02-14": ["💘 발렌타인데이", ["Kir Royal", "French 75", "Clover Club"]],
  "03-14": ["🤍 화이트데이", ["White Lady", "White Russian", "Ramos Gin Fizz"]],
  "10-31": ["🎃 핼러윈", ["Zombie", "Blood and Sand", "Corpse Reviver #2"]],
  "12-24": ["🎄 크리스마스 이브", ["Vin Chaud", "Hot Buttered Rum", "Irish Coffee"]],
  "12-25": ["🎅 크리스마스", ["Hot Toddy", "Vin Chaud", "Irish Coffee"]],
  "12-31": ["🥂 연말", ["Champagne Cocktail", "French 75", "Kir Royal"]]
};
const FRIDAY = ["Mojito", "Margarita", "Aperol Spritz", "Porn Star Martini", "Espresso Martini", "Paloma", "Piña Colada", "Sex on the Beach"];
const eul = w => { const c = w.charCodeAt(w.length - 1); return c >= 0xac00 && c <= 0xd7a3 && (c - 0xac00) % 28 ? w + "을" : w + "를"; };
const teaser = s => (s.length > 44 ? s.slice(0, 43) + "…" : s);
const url = (r, tab = "today") => `./?tab=${tab}&c=${encodeURIComponent(r[1])}`;
export function pick(mode, d = kst()) {
  const n = dayN(d), sp = SPECIAL[d.slice(5)], dow = new Date(d + "T00:00:00Z").getUTCDay();
  if (sp) {
    const r = byEn(sp[1][n % sp[1].length]);
    if (mode === "morning") {
      const ing = r[6].slice(0, 3).map(i => i[0]).join(", ");
      return { title: `${sp[0]} 준비해요`, body: `오늘 저녁엔 ${r[0]} 어때요? 🍸 ${ing} 미리 챙겨 두세요!`, url: url(r) };
    }
    return { title: "오늘의 한 잔", body: `오늘 밤은 ${r[0]} 한 잔과 함께 ${eul(sp[0].replace(/^\S+ /, ""))} 즐겨요 ${sp[0].split(" ")[0]}`, url: url(r) };
  }
  if (mode === "morning") return null; // 기념일이 아니면 아침 알림 없음
  if (dow === 5) {
    const r = byEn(FRIDAY[n % FRIDAY.length]);
    return { title: "🎉 불금이에요!", body: `주말 시작은 ${r[0]} 한 잔 어때요? 🍹 친구들과 함께라면 더 좋아요.`, url: url(r) };
  }
  const r = R[(n * 7) % R.length];
  return { title: "오늘의 한 잔", body: `오늘 밤은 ${r[0]} 어때요? 🍸\n📜 ${teaser(S[n % S.length])}`, url: url(r) };
}
export { R };
