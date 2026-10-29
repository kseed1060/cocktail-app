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
const ingChips=ing=>`<div class="ings">${ing.map(([n,v])=>`<span class="ing" style="--h:${hash(n)%360}">${n} <b>${typeof v==="number"?v+"ml":v}</b></span>`).join("")}</div>`;
function card(r,mini){const[ko,en,b,g,m,gar,ing]=r,c=colorOf(ing);
if(!mini)return`<div class="card hero" style="--c1:${c[0]};--c2:${c[1]}">${glassSvg(g,c,1)}<h3>${ko}</h3><div class="en">${en}</div><div class="meta"><span class="pill">${ING_BASE[b]}</span><span class="pill">${g}</span><span class="pill">${m}</span></div>${ingChips(ing)}<div class="gar">🌿 가니시 · ${gar}</div></div>`;
return`<div class="card mini"><div class="row">${glassSvg(g,c)}<div><h3>${ko}</h3><div class="en">${en}</div></div></div><div class="meta"><span class="pill">${ING_BASE[b]}</span><span class="pill">${g}</span><span class="pill">${m}</span></div>${ingChips(ing)}<div class="gar">🌿 가니시 · ${gar}</div></div>`}
// 창의 레시피: 규칙 기반 조합
const CB={gin:["진",45],vodka:["보드카",45],rum:["화이트 럼",45],tequila:["데킬라",45],whiskey:["위스키",45],brandy:["브랜디",45],soju:["소주",60],makgeolli:["막걸리",120],wine:["스파클링 와인",90],beer:["라거 맥주",150],liqueur:["아마레토",40]};
const MOD=[["엘더플라워 리큐르",15,"꽃"],["캄파리",15,"쌉싸름"],["드라이 베르무트",20,"허브"],["커피 리큐르",15,"밤"],["복분자주",20,"붉은"],["유자청",15,"노을"],["오미자청",15,"다섯 맛"],["생강 시럽",15,"불씨"],["매실청",15,"초여름"],["녹차 시럽",15,"숲"]];
const SOUR=[["레몬 주스",20],["라임 주스",20],["자몽 주스",30],["유자 주스",20]];
const SWEET=[["꿀 시럽",10],["심플 시럽",10],["시나몬 시럽",10],["바닐라 시럽",10]];
const GAR=["로즈마리 한 줄기","자몽 껍질","구운 오렌지 슬라이스","민트 잎","생강 슬라이스","레몬 휠","대추 한 알","바질 잎"];
const TOP={beer:1,wine:1,makgeolli:1,soju:0};
const ADJ=["달빛","새벽","비밀의","골목","한밤의","황금","은은한","첫눈"],NOUN=["정원","항구","편지","산책","여우","등불","노래","서랍"];
function creative(base,seed){const r=rng(seed),p=a=>a[Math.floor(r()*a.length)];base=base||p(Object.keys(CB));
const m=p(MOD),s=p(SOUR),sw=p(SWEET),ing=[CB[base],[m[0],m[1]],s,sw];const long=TOP[base]||r()<.4;if(long&&!TOP[base])ing.push(["소다수","적당량"]);
if(TOP[base])ing.splice(2,1);const name=`${p(ADJ)} ${m[2]} ${p(NOUN)}`;
const c=colorOf(ing),gl=long?"하이볼":"쿠프";return`<div class="card hero" style="--c1:${c[0]};--c2:${c[1]}"><div style="text-align:center"><span class="tag">✨ 새 아이디어 · 아직 검증 전 조합</span></div>${glassSvg(gl,c,1)}<h3>${name}</h3><div class="meta"><span class="pill">${ING_BASE[base]} 베이스</span><span class="pill">${gl}</span><span class="pill">${TOP[base]?"가볍게 섞기":"셰이크"}</span></div>${ingChips(ing)}<div class="gar">🌿 가니시 · ${p(GAR)}<br>🍋 한 모금 맛보고 단맛·신맛을 5ml씩 조절해 보세요.</div></div>`}
let curBase=null,curSeed;
function renderCreative(){$("creative").innerHTML=creative(curBase,curSeed)}
async function search(q){if(!q.trim())return;document.querySelectorAll("#chips .pill").forEach(c=>c.classList.toggle("on",c.textContent===q.trim()));const b=baseOf(q),ql=q.trim().toLowerCase();
const al=b?ALIAS[b]:[],isAl=n=>al.some(a=>n.toLowerCase()===a||n.toLowerCase().startsWith(a+" ")||n.toLowerCase().includes(" "+a));
let list=R.filter(r=>(b&&(r[2]===b||r[6].some(i=>isAl(i[0]))))||(!b&&ql&&(r[0].includes(q.trim())||r[1].toLowerCase().includes(ql)||r[6].some(i=>i[0].toLowerCase().includes(ql)))));
$("results").innerHTML=list.length?list.map(r=>card(r,1)).join(""):`<div class="empty"><div class="ei">🍹</div><b>앗, 아직 모르는 술이에요</b><span>다른 이름이나 종류로 한 번 더 찾아봐요!</span></div>`;
curBase=b;curSeed=hash(q+kst());renderCreative();
if(navigator.onLine&&(API[b]||(!b&&/^[a-z ]+$/.test(ql)&&ql))){$("results").insertAdjacentHTML("beforeend",'<div id="sk"><div class="skel"></div><div class="skel"></div></div>');try{const u=API[b]?`filter.php?i=${API[b]}`:`search.php?s=${encodeURIComponent(ql)}`;
const j=await (await fetch("https://www.thecocktaildb.com/api/json/v1/1/"+u)).json();const d=(j.drinks||[]).slice(0,6);$("sk")?.remove();
if(d.length)$("results").insertAdjacentHTML("beforeend",`<p class="sub2">🌍 세계 바텐더들의 레시피 (영어)</p>`+d.map(x=>`<div class="card mini"><img class="th" src="${esc(x.strDrinkThumb)}/preview" alt=""><h3>${esc(x.strDrink)}</h3><div class="en">${x.strInstructions?esc(x.strInstructions.slice(0,140)):"자세한 레시피는 thecocktaildb.com에서 볼 수 있어요."}</div><div style="clear:both"></div></div>`).join(""))}catch(e){}$("sk")?.remove()}}
function init(){const d=kst(),n=dayN(d);const[y,mo,da]=d.split("-");$("date").textContent=`${+mo}월 ${+da}일 · KST`;
$("today").innerHTML=card(R[(n*7)%R.length]);$("story").textContent=S[n%S.length];
curSeed=hash(d);renderCreative();
$("chips").innerHTML=Object.values(ING_BASE).map(x=>`<span class="pill">${x}</span>`).join("");
$("chips").onclick=e=>{if(e.target.matches(".pill")){$("q").value=e.target.textContent;search($("q").value)}};
$("f").onsubmit=e=>{e.preventDefault();search($("q").value)};
$("again").onclick=()=>{curSeed=(curSeed*31+7)>>>0;const el=$("creative");el.classList.remove("shuffle");void el.offsetWidth;el.classList.add("shuffle");setTimeout(renderCreative,140)};
$("net").textContent=navigator.onLine?"🌍 온라인이라 세계 레시피도 함께 찾아 드려요":"📦 오프라인이에요. 앱에 담긴 레시피로 보여 드려요";
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tabs button").forEach(x=>x.classList.toggle("on",x===b));document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.dataset.v===b.dataset.t));scrollTo(0,0)});
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js")}
init();
