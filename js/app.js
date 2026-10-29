const $=id=>document.getElementById(id);
const kst=()=>new Date(Date.now()+9*3600e3).toISOString().slice(0,10);
const dayN=d=>Math.floor(Date.parse(d+"T00:00:00Z")/864e5);
const hash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0};
const rng=seed=>()=>(seed=Math.imul(seed^seed>>>15,seed|1)+0x6D2B79F5>>>0,(seed>>>0)/4294967296);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ALIAS={gin:["진","gin","jin","런던드라이","london dry","jenever"],vodka:["보드카","vodka","보드까"],rum:["럼","rum","ron","rhum","바카디"],tequila:["데킬라","테킬라","tequila","메스칼","mezcal"],whiskey:["위스키","whisky","whiskey","버번","bourbon","스카치","scotch","라이","rye","아이리시","하이볼"],brandy:["브랜디","brandy","코냑","cognac","아르마냑"],liqueur:["리큐르","리큐어","liqueur","캄파리","campari","아페롤","aperol","아마레토","amaretto","깔루아","kahlua","커피 리큐르","미도리","샤르트뢰즈"],wine:["와인","wine","샴페인","champagne","프로세코","prosecco","스파클링","레드와인","화이트와인","포도주"],beer:["맥주","beer","라거","lager","에일","ale","스타우트","stout","비어"],soju:["소주","soju","참이슬","처음처럼"],makgeolli:["막걸리","makgeolli","탁주","동동주"]};
const API={gin:"Gin",vodka:"Vodka",rum:"Rum",tequila:"Tequila",whiskey:"Whiskey",brandy:"Brandy",wine:"Champagne",beer:"Beer"};
function baseOf(q){q=q.trim().toLowerCase();if(!q)return null;for(const[k,a]of Object.entries(ALIAS))if(a.some(x=>q.includes(x)||x===q))return k;return null}
function card(r,mini){const[ko,en,b,g,m,gar,ing]=r;return`<div class="card${mini?" mini":""}"><h3>${ko}</h3><div class="en">${en}</div><div class="meta"><span class="pill">${ING_BASE[b]}</span><span class="pill">${g}</span><span class="pill">${m}</span></div><ul>${ing.map(([n,v])=>`<li>${n} <b>${typeof v==="number"?v+" ml":v}</b></li>`).join("")}</ul><div class="muted">가니시: ${gar}</div></div>`}
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
return`<div class="card"><span class="tag">새 아이디어 · 아직 검증 전 조합</span><h3 style="margin-top:8px">${name}</h3><div class="meta"><span class="pill">${ING_BASE[base]} 베이스</span><span class="pill">${long?"하이볼":"쿠프"}</span><span class="pill">${TOP[base]?"가볍게 섞기":"셰이크"}</span></div><ul>${ing.map(([n,v])=>`<li>${n} <b>${typeof v==="number"?v+" ml":v}</b></li>`).join("")}</ul><div class="muted">가니시: ${p(GAR)} · 맛을 보고 단맛·신맛을 5ml씩 조절해 보세요.</div></div>`}
let curBase=null,curSeed;
function renderCreative(){$("creative").innerHTML=creative(curBase,curSeed)}
async function search(q){const b=baseOf(q),ql=q.trim().toLowerCase();
const al=b?ALIAS[b]:[],isAl=n=>al.some(a=>n.toLowerCase()===a||n.toLowerCase().startsWith(a+" ")||n.toLowerCase().includes(" "+a));
let list=R.filter(r=>(b&&(r[2]===b||r[6].some(i=>isAl(i[0]))))||(!b&&ql&&(r[0].includes(q.trim())||r[1].toLowerCase().includes(ql)||r[6].some(i=>i[0].toLowerCase().includes(ql)))));
$("results").innerHTML=list.length?list.map(r=>card(r,1)).join(""):`<div class="card mini muted">앱에 저장된 레시피 중엔 없어요. 다른 이름으로도 찾아보세요.</div>`;
curBase=b;curSeed=hash(q+kst());renderCreative();
if(navigator.onLine&&(API[b]||(!b&&/^[a-z ]+$/.test(ql)&&ql))){try{const u=API[b]?`filter.php?i=${API[b]}`:`search.php?s=${encodeURIComponent(ql)}`;
const j=await (await fetch("https://www.thecocktaildb.com/api/json/v1/1/"+u)).json();const d=(j.drinks||[]).slice(0,6);
if(d.length)$("results").insertAdjacentHTML("beforeend",`<h2 style="font-size:14px">세계 레시피 더 보기 <span class="tag" style="background:#2e3b1f;color:#d8f0c4">TheCocktailDB · 영어</span></h2>`+d.map(x=>`<div class="card mini"><img class="th" src="${esc(x.strDrinkThumb)}/preview" alt=""><h3>${esc(x.strDrink)}</h3><div class="en">${x.strInstructions?esc(x.strInstructions.slice(0,140)):"자세한 레시피는 thecocktaildb.com에서 볼 수 있어요."}</div><div style="clear:both"></div></div>`).join(""))}catch(e){}}}
function init(){const d=kst(),n=dayN(d);$("date").textContent=d.replace(/-/g,". ")+" (KST)";
$("today").innerHTML=card(R[(n*7)%R.length]);$("story").textContent=S[n%S.length];
curSeed=hash(d);renderCreative();
$("chips").innerHTML=Object.values(ING_BASE).map(x=>`<span class="pill">${x}</span>`).join("");
$("chips").onclick=e=>{if(e.target.matches(".pill")){$("q").value=e.target.textContent;search($("q").value)}};
$("f").onsubmit=e=>{e.preventDefault();search($("q").value)};
$("again").onclick=()=>{curSeed=(curSeed*31+7)>>>0;renderCreative()};
$("net").textContent=navigator.onLine?"온라인: 세계 레시피 검색도 함께 보여 줘요.":"오프라인: 앱에 저장된 레시피로 보여 줘요.";
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js")}
init();
