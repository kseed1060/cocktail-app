// 박스 전용: 구독 코드를 추가하고 GitHub Actions 비밀값 SUBSCRIPTIONS를 갱신해요.
//   node tools/add-sub.mjs 'CKT1.xxxx'   |  --list  |  --remove N  |  --sync-secrets
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
const DIR = "/home/box/.cocktail-app", SUBS = DIR + "/subscriptions.json", REPO = "kseed1060/cocktail-app";
const subs = JSON.parse(readFileSync(SUBS, "utf8"));
const setSecret = (name, val) => execFileSync("gh", ["secret", "set", name, "-R", REPO], { input: val, stdio: ["pipe", "inherit", "inherit"] });
const save = () => { writeFileSync(SUBS, JSON.stringify(subs, null, 1), { mode: 0o600 }); setSecret("SUBSCRIPTIONS", JSON.stringify(subs)); console.log(`구독 ${subs.length}개 → 비밀값 갱신 완료`); };
const [a, b] = process.argv.slice(2);
if (a === "--list") subs.forEach((s, i) => console.log(i, new URL(s.e).host, s.added));
else if (a === "--remove") { subs.splice(+b, 1); save(); }
else if (a === "--sync-secrets") { const v = JSON.parse(readFileSync(DIR + "/vapid.json", "utf8")); setSecret("VAPID_PUBLIC", v.publicKey); setSecret("VAPID_PRIVATE", v.privateKey); save(); }
else {
  const m = /^CKT1\.([A-Za-z0-9_-]+)$/.exec((a || "").trim());
  if (!m) { console.error("구독 코드 형식이 아니에요 (CKT1.로 시작)"); process.exit(1); }
  const j = JSON.parse(Buffer.from(m[1], "base64url").toString());
  if (!/^https:\/\//.test(j.e) || !j.p || !j.a) { console.error("코드 내용이 올바르지 않아요"); process.exit(1); }
  if (subs.some(s => s.e === j.e)) console.log("이미 등록된 기기예요");
  else { subs.push({ ...j, added: new Date().toISOString() }); save(); }
}
