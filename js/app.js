const $=id=>document.getElementById(id);
const kst=()=>new Date(Date.now()+9*3600e3).toISOString().slice(0,10);
const dayN=d=>Math.floor(Date.parse(d+"T00:00:00Z")/864e5);
const hash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0};
const rng=seed=>()=>(seed=Math.imul(seed^seed>>>15,seed|1)+0x6D2B79F5>>>0,(seed>>>0)/4294967296);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ALIAS={gin:["진","gin","jin","런던드라이","london dry","jenever"],vodka:["보드카","vodka","보드까"],rum:["럼","rum","ron","rhum","바카디"],tequila:["데킬라","테킬라","tequila","메스칼","mezcal"],whiskey:["위스키","whisky","whiskey","버번","bourbon","스카치","scotch","라이","rye","아이리시","하이볼"],brandy:["브랜디","brandy","코냑","cognac","아르마냑"],liqueur:["리큐르","리큐어","liqueur","캄파리","campari","아페롤","aperol","아마레토","amaretto","깔루아","kahlua","커피 리큐르","미도리","샤르트뢰즈"],wine:["와인","wine","샴페인","champagne","프로세코","prosecco","스파클링","레드와인","화이트와인","포도주"],beer:["맥주","beer","라거","lager","에일","ale","스타우트","stout","비어"],soju:["소주","soju","참이슬","처음처럼"],makgeolli:["막걸리","makgeolli","탁주","동동주"]};
const API={gin:"Gin",vodka:"Vodka",rum:"Rum",tequila:"Tequila",whiskey:"Whiskey",brandy:"Brandy",wine:"Champagne",beer:"Beer"};
function baseOf(q){q=q.trim().toLowerCase();if(!q)return null;for(const[k,a]of Object.entries(ALIAS))if(a.some(x=>q.includes(x)||x===q))return k;return null}
const COL=[["크랜베리|캄파리|그레나딘|토마토|레드 와인|블랙베리|복분자|카시스|체리","#c2185b","#ff5c8a"],["커피|에스프레소|콜라|다크 럼|스타우트|카카오\(다크\)","#5d3a22","#c08552"],["민트|미도리|그린|녹차|망트","#2e7d4f","#7be0a0"],["바이올렛","#6a4c9c","#b79cff"],["오렌지|아페롤|자몽|선라이즈|유자|복숭아|백도","#e0702a","#ffb35c"],["생크림|코코넛|요구르트|막걸리|아마레토","#b89a7a","#fff1dc"],["위스키|버번|코냑|브랜디|스카치|라이|숙성|골드|맥주|라거|드람뷔|꿀","#b0661c","#ffc46b"]];
function colorOf(ing){const t=ing.map(i=>i[0]).join(" ");for(const[re,a,b]of COL)if(new RegExp(re).test(t))return[a,b];return["#8fb8c9","#e6f6ff"]}
let GID=0;function glassSvg(g,c,shine){const id="g"+(++GID);const k=/하이볼|콜린스|파인트|맥주잔|허리케인|구리|머그/.test(g)?"tall":/플루트/.test(g)?"flute":/칵테일|쿠프|소금/.test(g)?"mart":/와인/.test(g)?"wine":"rock";
const P={mart:["M14 18h72L50 58z","M22 24h56L50 52z","M50 58v30M34 90h32"],flute:["M38 8h24l-2 50a10 10 0 0 1-20 0z","M40 22h20l-1 34a9 9 0 0 1-18 0z","M50 68v20M38 90h24"],wine:["M28 10h44c0 34-8 46-22 46S28 44 28 10z","M30 26h40c-2 20-8 28-20 28s-18-8-20-28z","M50 56v32M34 90h32"],tall:["M30 10h40l-4 80H34z","M32 30h36l-3 56H35z",""],rock:["M22 34h56l-6 56H28z","M24 50h52l-4 36H28z",""]}[k];
return`<svg class="gl" viewBox="0 0 100 100"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[0]}"/></linearGradient></defs><path d="${P[1]}" fill="url(#${id})"/><path d="${P[0]}" fill="#ffffff10" stroke="#fff" stroke-opacity=".85" stroke-width="2.4" stroke-linejoin="round"/>${P[2]?`<path d="${P[2]}" stroke="#fff" stroke-opacity=".85" stroke-width="2.4" stroke-linecap="round" fill="none"/>`:""}${shine?'<path class="shine" d="M40 28l-4 20" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/>':""}</svg>`}
const garBox=g=>g.item==="없음"?`<div class="garb"><span>🌿 가니시</span><p>${g.method}</p></div>`:`<div class="garb"><span>🌿 가니시</span><b>${g.item} · ${g.form}</b><p>${g.method}</p></div>`;
const ingChips=ing=>`<div class="ings">${ing.map(([n,v])=>`<span class="ing" style="--h:${hash(n)%360}">${n} <b>${typeof v==="number"?v+"ml":v}</b></span>`).join("")}</div>`;
function card(r,mini){const[ko,en,b,g,m,gar,ing]=r,c=colorOf(ing);
if(!mini)return`<div class="card hero" style="--c1:${c[0]};--c2:${c[1]}">${glassSvg(g,c,1)}<h3>${ko}</h3><div class="en">${en}</div><div class="meta"><span class="pill">${r.sub||ING_BASE[b]}</span><span class="pill">${g}</span><span class="pill">${m}</span></div>${techChips(r.techniques)}${ingChips(ing)}${garBox(r.garnish)}${stepList(r.steps)}${r.tip?`<div class="tip">💡 대체 팁 · ${r.tip}</div>`:""}</div>`;
return`<div class="card mini"><div class="row">${glassSvg(g,c)}<div><h3>${ko}</h3><div class="en">${en}</div></div></div><div class="meta"><span class="pill">${r.sub||ING_BASE[b]}</span><span class="pill">${g}</span><span class="pill">${m}</span></div>${techChips(r.techniques)}${ingChips(ing)}${garBox(r.garnish)}${stepList(r.steps)}${r.tip?`<div class="tip">💡 대체 팁 · ${r.tip}</div>`:""}</div>`}
// 창의 레시피: 규칙 기반 조합
const CB={gin:["진",45],vodka:["보드카",45],rum:["화이트 럼",45],tequila:["데킬라",45],whiskey:["위스키",45],brandy:["브랜디",45],soju:["소주",60],makgeolli:["막걸리",120],wine:["스파클링 와인",90],beer:["라거 맥주",150],liqueur:["아마레토",40]};
const MOD=[["엘더플라워 리큐르",15,"꽃"],["캄파리",15,"쌉싸름"],["드라이 베르무트",20,"허브"],["커피 리큐르",15,"밤"],["복분자주",20,"붉은"],["유자청",15,"노을"],["오미자청",15,"다섯 맛"],["생강 시럽",15,"불씨"],["매실청",15,"초여름"],["녹차 시럽",15,"숲"]];
const SOUR=[["레몬 주스",20],["라임 주스",20],["자몽 주스",30],["유자 주스",20]];
const SWEET=[["꿀 시럽",10],["심플 시럽",10],["시나몬 시럽",10],["바닐라 시럽",10]];
const GAR=[{item:"로즈마리",form:"스프리그",method:"손바닥에 가볍게 쳐서 향을 깨운 뒤 얼음 위에 꽂기"},{item:"자몽",form:"필(껍질)",method:"잔 위에서 짜 오일을 뿌린 뒤 림에 걸치기"},{item:"오렌지",form:"구운 하프 휠",method:"토치로 살짝 그을려 림에 걸치기"},{item:"민트",form:"스프리그",method:"가볍게 두드려 빨대 옆에 꽂기"},{item:"생강",form:"얇은 슬라이스",method:"픽에 꽂아 림에 걸치기"},{item:"레몬",form:"휠",method:"림에 칼집 내어 걸치기"},{item:"대추",form:"통 1알(꼬치)",method:"픽에 꽂아 잔 위에 가로로 올리기"},{item:"바질",form:"잎 1장",method:"손바닥에 한 번 쳐서 표면에 띄우기"},{item:"설탕",form:"하프 림",method:"레몬으로 림 바깥 절반을 적시고 설탕 묻히기"}];
const TOP={beer:1,wine:1,makgeolli:1,soju:0};
const ADJ=["달빛","새벽","비밀의","골목","한밤의","황금","은은한","첫눈"],NOUN=["정원","항구","편지","산책","여우","등불","노래","서랍"];
const AFF=[[/스모크|피트|후추|향신료|생강|스파이스/,["생강 시럽"]],[/바닐라|캐러멜|토피|커피|초콜릿|코코아|당밀/,["커피 리큐르"]],[/꽃|엘더|장미|라벤더/,["엘더플라워 리큐르"]],[/베리|체리|자두|블랙커런트|붉은/,["복분자주"]],[/쓴|쌉싸름|허브|감초/,["캄파리","드라이 베르무트"]],[/유자|녹차|시트러스|레몬|오렌지|자몽|라임/,["유자청","녹차 시럽"]],[/사과|배|복숭아|청포도|멜론|과일/,["매실청","오미자청"]],[/꿀|헤더/,["생강 시럽","유자청"]]];
function creative(base,seed,brand){const r=rng(seed),p=a=>a[Math.floor(r()*a.length)];if(brand)base=brand.base;base=base||p(Object.keys(CB));
let mods=MOD;if(brand){const nt=brand.notes.join(" "),want=new Set();AFF.forEach(([re,ms])=>{if(re.test(nt))ms.forEach(x=>want.add(x))});const f=MOD.filter(m=>want.has(m[0]));if(f.length)mods=f}
const m=p(mods),s=p(SOUR),sw=/꿀/.test(brand?brand.notes.join(""):"")?SWEET[0]:p(SWEET),ing=[brand?[brand.ko,CB[base][1]]:CB[base],[m[0],m[1]],s,sw];const long=TOP[base]||r()<.4;if(long&&!TOP[base])ing.push(["소다수","적당량"]);
if(TOP[base])ing.splice(2,1);const name=`${p(ADJ)} ${m[2]} ${p(NOUN)}`;
const c=colorOf(ing),gl=long?"하이볼":"쿠프",gar=p(GAR),fr=[name,"Creative",base,gl,TOP[base]?"빌드":long?"셰이크 후 소다":"셰이크",gar.item,ing];fr.garnish=gar;const mt=methodsFor(fr);return`<div class="card hero" style="--c1:${c[0]};--c2:${c[1]}"><div style="text-align:center"><span class="tag">✨ 새 아이디어 · 아직 검증 전 조합</span></div>${glassSvg(gl,c,1)}<h3>${name}</h3><div class="meta"><span class="pill">${brand?brand.ko:ING_BASE[base]} 베이스</span><span class="pill">${gl}</span><span class="pill">${TOP[base]?"가볍게 섞기":"셰이크"}</span></div>${techChips(mt.t)}${ingChips(ing)}${brand?`<div class="tip">🎯 ${brand.ko}의 ${brand.notes.slice(0,2).join("·")} 느낌에 맞춰 ${m[0]}을(를) 골랐어요.</div>`:""}${garBox(gar)}${stepList(mt.s)}<div class="gar">🍋 한 모금 맛보고 단맛·신맛을 5ml씩 조절해 보세요.</div></div>`}
let curBase=null,curSeed;
let curBrand=null;function renderCreative(){$("creative").innerHTML=creative(curBase,curSeed,curBrand)}
const nz=x=>x.toLowerCase().replace(/[\s'’.\-&*]/g,"");
function findBrand(q,exactOnly){const nq=nz(q);if(nq.length<2)return null;let best=null,bl=0;for(const b of BRANDS)for(const n of [b.ko,b.en,...b.al]){const nn=nz(n);if(!nn)continue;const ex=nq===nn,ok=ex||!exactOnly&&(nq.length>=3&&nn.startsWith(nq)&&nq.length>=nn.length*.6)||(nn.length>=3&&nq.includes(nn));const sc=nn.length+(ex?100:0);if(ok&&sc>bl){best=b;bl=sc}}return best}
const LQ={"오렌지 리큐르":/트리플 섹|쿠앵트로|퀴라소|그랑 마르니에/,"커피 리큐르":/커피 리큐르/,"크림 리큐르":/아이리시 크림/,"너트 리큐르":/아마레토/,"비터 아페리티보":/캄파리|아페롤/,"아마로":/아마로|페르넷|아메르/,"아니스 리큐르":/압생트/,"스위트 베르무트":/스위트 베르무트/,"드라이 베르무트":/드라이 베르무트/,"아페리티프 와인":/릴레|코키/,"꽃 리큐르":/엘더플라워|바이올렛/,"진 베이스 리큐르":/핌스/};
const GEN=new Set(["그린","옐로","드라이","로쏘","오리지널","리큐르","크렘","드","오리지","no.1"]);
function brandScore(b,r){let sc=0;if(r.sub===b.sub)sc+=3;else if(r[2]===b.base&&r.sub&&b.sub.split(" ").some(w=>w.length>=2&&r.sub.includes(w)&&!/위스키|브랜디/.test(w)))sc+=1.5;if(r[2]===b.base&&b.base!=="liqueur")sc+=1;const names=r[6].map(i=>i[0]).join(" ");
if(LQ[b.sub]&&LQ[b.sub].test(names))sc+=3;if(b.base==="liqueur"){const w=[b.ko,...b.al].flatMap(x=>x.split(" ")).filter(x=>x.length>=2&&!GEN.has(x)&&/[가-힣]/.test(x));if(w.some(x=>names.includes(x)))sc+=4}return sc}
async function search(q){if(!q.trim())return;document.querySelectorAll("#chips .pill").forEach(c=>c.classList.toggle("on",c.textContent===q.trim()));const exactType=Object.entries(ALIAS).find(([k,a])=>a.includes(q.trim().toLowerCase()));const brand=findBrand(q,!!exactType);curBrand=brand;
if(brand){const list=R.map(r=>[brandScore(brand,r),r]).filter(x=>x[0]>0).sort((a,b)=>b[0]-a[0]).map(x=>x[1]);
$("results").innerHTML=`<div class="card brand"><span class="tag">🏷️ 브랜드</span><h3>${brand.ko}</h3><div class="en">${brand.en}</div><div class="meta"><span class="pill">${ING_BASE[brand.base]}</span><span class="pill">${brand.sub}</span></div><div class="ings">${brand.notes.map(n=>`<span class="ing" style="--h:${hash(n)%360}">${n}</span>`).join("")}</div><div class="gar">${list.length?`이 술과 어울리는 레시피 ${list.length}개를 찾았어요. 세부 종류가 같은 레시피부터 보여 드릴게요 👇`:"딱 맞는 레시피는 아직 없지만, 창작 탭에 이 술 맞춤 레시피를 만들어 뒀어요 ✨"}</div></div>`+list.slice(0,30).map(r=>card(r,1)).join("");
curBase=brand.base;curSeed=hash(q+kst());renderCreative();return}
const b=baseOf(q),ql=q.trim().toLowerCase();
const al=b?ALIAS[b]:[],isAl=n=>al.some(a=>n.toLowerCase()===a||n.toLowerCase().startsWith(a+" ")||n.toLowerCase().includes(" "+a));
let list=R.filter(r=>(b&&(r[2]===b||r[6].some(i=>isAl(i[0]))))||(!b&&ql&&(r[0].includes(q.trim())||r[1].toLowerCase().includes(ql)||r[6].some(i=>i[0].toLowerCase().includes(ql)))));
const nq2=nz(q);list.sort((a,c)=>(nz(c.sub||"").includes(nq2)?1:0)-(nz(a.sub||"").includes(nq2)?1:0));$("results").innerHTML=list.length?list.map(r=>card(r,1)).join(""):`<div class="empty"><div class="ei">🍹</div><b>앗, 아직 모르는 술이에요</b><span>위에서 술 종류(진·럼·위스키…)를 골라 보면 딱 맞는 레시피를 찾아 드릴게요!</span></div>`;
curBase=b;curSeed=hash(q+kst());renderCreative();
if(navigator.onLine&&(API[b]||(!b&&/^[a-z ]+$/.test(ql)&&ql))){$("results").insertAdjacentHTML("beforeend",'<div id="sk"><div class="skel"></div><div class="skel"></div></div>');try{const u=API[b]?`filter.php?i=${API[b]}`:`search.php?s=${encodeURIComponent(ql)}`;
const j=await (await fetch("https://www.thecocktaildb.com/api/json/v1/1/"+u)).json();const d=(j.drinks||[]).slice(0,6);$("sk")?.remove();
if(d.length)$("results").insertAdjacentHTML("beforeend",`<p class="sub2">🌍 세계 바텐더들의 레시피 (영어)</p>`+d.map(x=>`<div class="card mini"><img class="th" src="${esc(x.strDrinkThumb)}/preview" alt=""><h3>${esc(x.strDrink)}</h3><div class="en">${x.strInstructions?esc(x.strInstructions.slice(0,140)):"자세한 레시피는 thecocktaildb.com에서 볼 수 있어요."}</div><div style="clear:both"></div></div>`).join(""))}catch(e){}$("sk")?.remove()}}
function init(){const d=kst(),n=dayN(d);const[y,mo,da]=d.split("-");$("date").textContent=`${+mo}월 ${+da}일 · KST`;
const qs=new URLSearchParams(location.search),pc=qs.get("c")&&R.find(r=>r[1]===qs.get("c"));$("today").innerHTML=card(pc||R[(n*7)%R.length]);renderStories(n);
curSeed=hash(d);renderCreative();
$("chips").innerHTML=Object.values(ING_BASE).map(x=>`<span class="pill">${x}</span>`).join("");
$("chips").onclick=e=>{if(e.target.matches(".pill")){$("q").value=e.target.textContent;search($("q").value)}};
$("f").onsubmit=e=>{e.preventDefault();search($("q").value)};
$("again").onclick=()=>{curSeed=(curSeed*31+7)>>>0;const el=$("creative");el.classList.remove("shuffle");void el.offsetWidth;el.classList.add("shuffle");setTimeout(renderCreative,140)};
$("net").textContent=navigator.onLine?"🌍 온라인이라 세계 레시피도 함께 찾아 드려요":"📦 오프라인이에요. 앱에 담긴 레시피로 보여 드려요";
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tabs button").forEach(x=>x.classList.toggle("on",x===b));document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.dataset.v===b.dataset.t));scrollTo(0,0)});
const tb=qs.get("tab");if(tb)document.querySelector(`.tabs button[data-t="${tb}"]`)?.click();
setupPush();const si=qs.get("s");if(si!==null&&ST[+si])openStory(+si);
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js",{updateViaCache:"none"}).then(r=>r.update());let rl=0;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!rl){rl=1;location.reload()}})}
init();

function setupPush(){const out=$("nout"),btn=$("nbtn");if(!btn)return;
const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1),sa=navigator.standalone===true||matchMedia("(display-mode: standalone)").matches;
const sup="serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window;
const b64=s=>{const p="=".repeat((4-s.length%4)%4),r=atob((s+p).replace(/-/g,"+").replace(/_/g,"/"));return Uint8Array.from(r,c=>c.charCodeAt(0))};
const enc=o=>"CKT1."+btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(o)))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
const show=sub=>{const j=sub.toJSON(),code=enc({e:j.endpoint,p:j.keys.p256dh,a:j.keys.auth});
out.innerHTML=`<div class="gar">✅ 이 기기는 알림을 받고 있어요</div><button id="ncopy" class="linkbtn">기기 등록 코드 복사</button>`;
$("ncopy").onclick=async()=>{let ok=0;try{await navigator.clipboard.writeText(code);ok=1}catch(_){const t=document.createElement("textarea");t.value=code;t.setAttribute("readonly","");t.style.cssText="position:fixed;opacity:0;left:-9999px";document.body.appendChild(t);t.select();try{ok=document.execCommand("copy")}catch(_){}t.remove()}$("ncopy").textContent=ok?"복사했어요 · 저에게 붙여 보내 주세요":"복사에 실패했어요, 다시 눌러 주세요"}};
btn.onclick=async()=>{
if(ios&&!sa){out.innerHTML=`<div class="gar">📱 아이폰은 홈 화면 앱에서만 알림을 받을 수 있어요.<br>① 사파리 아래 <b>공유</b> 버튼 → ② <b>홈 화면에 추가</b> → ③ 홈 화면의 '오늘의 한 잔' 아이콘으로 열고 다시 눌러 주세요.</div>`;return}
if(!sup){out.innerHTML=`<div class="gar">이 브라우저는 알림을 지원하지 않아요. 아이폰은 iOS 16.4 이상, PC는 크롬·엣지·사파리 최신 버전에서 돼요.</div>`;return}
btn.disabled=true;btn.textContent="잠시만요…";
try{const perm=await Notification.requestPermission();if(perm!=="granted"){out.innerHTML=`<div class="gar">알림이 꺼져 있어요. 설정 → 알림 → '오늘의 한 잔'에서 허용해 주세요.</div>`;return}
const reg=await navigator.serviceWorker.ready;let sub=await reg.pushManager.getSubscription();
if(!sub)sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64(window.CKT_VAPID_PUBLIC)});show(sub)}
catch(e){out.innerHTML=`<div class="gar">앗, 알림 켜기에 실패했어요 (${esc(e.message)}). 잠시 뒤 다시 시도해 주세요.</div>`}
finally{btn.disabled=false;btn.textContent="알림 받기"}};
if(sup&&Notification.permission==="granted")navigator.serviceWorker.ready.then(r=>r.pushManager.getSubscription()).then(s=>{if(s)show(s)})}

function md(n,k){const d=new Date((n-k)*864e5);return `${d.getUTCMonth()+1}월 ${d.getUTCDate()}일`}
function renderStories(n){const i=n%ST.length,t=ST[i];
$("story").innerHTML=`<span class="big">🕯️</span><span class="badge">오늘의 술 이야기</span><h3>${esc(t.t)}</h3><p>${esc(t.s)}</p><span class="more">자세히 읽기 →</span>`;$("story").onclick=()=>openStory(i);
let h="";for(let k=1;k<=14;k++){const j=((n-k)%ST.length+ST.length)%ST.length,x=ST[j];h+=`<button class="pitem" data-i="${j}"><span class="pd">${md(n,k)}</span><b>${esc(x.t)}</b><span class="ps">${esc(x.s)}</span></button>`}
$("past").innerHTML=h;$("past").onclick=e=>{const b=e.target.closest(".pitem");if(b)openStory(+b.dataset.i)};initSheet()}
function openStory(i){const x=ST[i],sh=$("sheet");$("sbody").innerHTML=`<span class="badge">📜 술 이야기</span><h2>${esc(x.t)}</h2><p class="lead">${esc(x.s)}</p>${x.d.map(p=>`<p>${esc(p)}</p>`).join("")}<p class="foot">“~로 알려져 있어요”는 여러 설이 있거나 확실하지 않은 이야기예요.</p>`;
sh.classList.add("on");sh.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";sh.querySelector(".panel").scrollTop=0;sh.querySelector(".panel").style.transform="";if(!history.state||!history.state.sheet)history.pushState({sheet:1},"")}
function closeStory(fromPop){const sh=$("sheet");if(!sh.classList.contains("on"))return;sh.classList.remove("on");sh.setAttribute("aria-hidden","true");document.body.style.overflow="";if(!fromPop&&history.state&&history.state.sheet)history.back()}
function initSheet(){if(window._shI)return;window._shI=1;const sh=$("sheet"),pn=sh.querySelector(".panel");
sh.addEventListener("click",e=>{if(e.target.closest("[data-x]"))closeStory()});addEventListener("popstate",()=>closeStory(true));addEventListener("keydown",e=>{if(e.key==="Escape")closeStory()});
let y0=null,dy=0;pn.addEventListener("touchstart",e=>{if(pn.scrollTop<=0){y0=e.touches[0].clientY;dy=0;pn.style.transition="none"}},{passive:true});
pn.addEventListener("touchmove",e=>{if(y0===null)return;dy=e.touches[0].clientY-y0;if(dy>0){pn.style.transform=`translateY(${dy}px)`;e.cancelable&&e.preventDefault()}},{passive:false});
pn.addEventListener("touchend",()=>{if(y0===null)return;pn.style.transition="";pn.style.transform="";if(dy>110)closeStory();y0=null})}

document.addEventListener("click",e=>{const b=e.target.closest(".tch");if(!b)return;const box=b.parentElement.nextElementSibling,k=b.dataset.k,on=b.classList.contains("on");b.parentElement.querySelectorAll(".tch").forEach(x=>x.classList.remove("on"));if(on){box.hidden=true;return}b.classList.add("on");const t=TECH[k];box.innerHTML=`<b>${t[0]} · ${t[1]}</b> ${t[2]}`;box.hidden=false});
