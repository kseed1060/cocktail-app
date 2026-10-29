// GitHub Actions에서 실행: MODE=evening|morning, 비밀값 VAPID_PRIVATE/VAPID_PUBLIC/SUBSCRIPTIONS
import webpush from "web-push";
import { pick, kst } from "./pick.mjs";
const mode = process.env.MODE === "morning" ? "morning" : "evening";
const d = process.env.DATE || kst();
const msg = pick(mode, d);
console.log(`[${d} KST, ${mode}]`, msg ? JSON.stringify(msg) : "보낼 알림 없음");
let subs = [];
try { subs = JSON.parse(process.env.SUBSCRIPTIONS || "[]"); } catch { console.log("SUBSCRIPTIONS 형식 오류 → 0명으로 처리"); }
if (!msg || !subs.length) { console.log(`구독자 ${subs.length}명, 종료`); process.exit(0); }
if (process.env.DRY_RUN === "1") { console.log("DRY_RUN: 보내지 않음"); process.exit(0); }
webpush.setVapidDetails("mailto:kseed1060@users.noreply.github.com", process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE);
let ok = 0, gone = 0, fail = 0;
for (const s of subs) {
  try { await webpush.sendNotification({ endpoint: s.e, keys: { p256dh: s.p, auth: s.a } }, JSON.stringify(msg), { TTL: 6 * 3600 }); ok++; }
  catch (e) { if (e.statusCode === 404 || e.statusCode === 410) gone++; else { fail++; console.log("실패", e.statusCode || e.message); } }
}
console.log(`성공 ${ok}, 만료 ${gone}, 실패 ${fail}`);
if (gone) console.log("만료된 구독은 박스에서 tools/add-sub.mjs --prune 으로 정리하세요.");
process.exit(fail && !ok ? 1 : 0);
