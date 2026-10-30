// 기법(techniques)과 만드는 순서(steps): 모든 레시피에 r.techniques, r.steps를 붙여요.
const TECH={
build:["빌드","Build","잔에 재료를 바로 차례로 부어 만드는 기법이에요. 하이볼처럼 간단한 칵테일에 써요."],
stir:["스터","Stir","믹싱 글라스에 얼음과 술을 넣고 바 스푼으로 부드럽게 저어요. 술만 섞을 때 맑고 매끈한 질감이 나요."],
shake:["쉐이크","Shake","셰이커에 얼음과 재료를 넣고 세게 흔들어요. 주스·크림·시럽처럼 잘 안 섞이는 재료를 빠르게 차갑게 섞어요."],
dry:["드라이 쉐이크","Dry Shake","달걀흰자를 넣고 얼음 없이 먼저 흔들어 거품을 내는 기법이에요. 얼음과 먼저 흔든 뒤 얼음을 빼고 다시 흔드는 ‘리버스 드라이 쉐이크’도 있어요."],
dstrain:["더블 스트레인","Double Strain","호손 스트레이너에 고운 체를 한 번 더 받쳐 걸러요. 얼음 조각, 과육, 허브 찌꺼기가 들어가지 않게 해요."],
blend:["블렌드","Blend","블렌더에 재료와 얼음을 넣고 갈아요. 프로즌 칵테일처럼 부드러운 질감을 만들어요."],
float:["플로팅","Float","바 스푼 뒤쪽을 타고 천천히 부어 재료를 맨 위에 띄우는 기법이에요."],
layer:["레이어링","Layer","무거운(당도가 높은) 재료부터 차례로 천천히 부어 층을 쌓는 기법이에요."],
rolling:["롤링","Rolling","두 틴 사이로 재료를 천천히 주고받으며 섞어요. 토마토 주스처럼 거품이 나면 안 되는 재료에 좋아요."],
throw:["스로잉","Throwing","한쪽 틴을 높이 들고 다른 틴으로 길게 떨어뜨리며 주고받아요. 공기를 머금게 해 향을 열어 줘요."],
rim:["리밍","Rimming","잔 테두리를 과일로 적신 뒤 소금이나 설탕을 묻혀요. 보통 잔 바깥쪽에만 묻혀요."],
muddle:["머들","Muddle","머들러로 과일·허브·설탕을 눌러 즙과 향을 내요. 허브는 세게 짓이기면 쓴맛이 나니 살살 눌러요."],
rinse:["린스","Rinse","향이 강한 술을 잔에 조금 넣고 굴려 안쪽을 코팅한 뒤, 남은 술은 버려요."],
swizzle:["스위즐","Swizzle","크러시드 아이스에 스위즐 스틱(또는 바 스푼)을 꽂고 손바닥 사이로 비벼 돌려 섞어요. 잔 겉면에 성에가 껴요."],
top:["탑업","Top up","탄산·스파클링 재료를 마지막에 천천히 채워요. 김이 빠지지 않게 세게 젓지 않아요."],
heat:["데우기","Heat","잔과 재료를 따뜻하게 데워 만들어요. 술은 끓으면 알코올과 향이 날아가니 끓이지 않아요."]
};
const ORD=["heat","rim","muddle","rinse","dry","shake","stir","build","rolling","throw","blend","dstrain","swizzle","top","float","layer"];
(function(){
const amt=i=>i[1]===undefined?i[0]:/^[\d.\/]+$/.test(i[1])?`${i[0]} ${i[1]}ml`:i[1]==="선택"?`${i[0]}(선택)`:`${i[0]} ${i[1]}`;
const L=a=>a.map(amt).join(", ");
const TOPRE=/소다수|토닉워터|진저비어|진저에일|콜라|사이다|탄산수|자몽 소다|레모네이드|레몬 탄산음료|샴페인|프로세코|라거 맥주|스타우트|페일 에일|사과 사이더/;
const UP=/칵테일 글라스|쿠프|플루트|작은 와인 글라스|소금 리밍 글라스|스니프터/;
const CRUSH=new Set(["Mai Tai","Zombie","Painkiller"]);
const garStep=g=>!g||g.item==="없음"?(g&&g.method&&!/^가니시 없이 그대로$/.test(g.method)?g.method.replace(/^가니시 없이 ?/,"가니시 없이 ")+"(으)로 마무리해요.":"가니시 없이 그대로 내요."):`가니시(${g.form}): ${g.method}.`;
const rimOf=g=>g&&/림/.test(g.form)&&/소금|설탕/.test(g.form);
const rimStep=g=>`잔 테두리 리밍: ${g.method}.`;
function gen(r){const[,en,,gl,m,,ing]=r,g=r.garnish,steps=[],T=[];
 const rim=rimOf(g),up=UP.test(gl),noIce=/파인트|맥주잔/.test(gl)||en==="Kir"||(up&&!/쉐이크|셰이크|스터/.test(m));
 const doRim=()=>{if(rim){T.push("rim");steps.push(rimStep(g))}};
 const egg=ing.some(i=>/달걀흰자/.test(i[0])),eggOpt=ing.some(i=>/달걀흰자/.test(i[0])&&/선택/.test(i[1]||""));
 const tops=ing.filter(i=>TOPRE.test(i[0])),rest=ing.filter(i=>!TOPRE.test(i[0]));
 const after=/후 (소다|샴페인|진저비어)|소다$/.test(m);
 const prep=()=>{if(rim&&up){steps.push(`잔(${gl})을 냉동실에 넣어 차갑게 해 둬요(얼음물은 리밍을 녹여요).`);doRim();return}doRim();steps.push(up?`잔(${gl})에 얼음물을 채워 차갑게 식혀 두거나, 냉동실에 넣어 둬요.`:CRUSH.has(en)?`잔(${gl})에 크러시드 아이스를 채워 둬요.`:`잔(${gl})에 얼음을 가득 채워 둬요.`)};
 const tag=g&&g.item!=="없음"?()=>steps.push(garStep(g)):()=>steps.push(garStep(g));
 if(/셰이크/.test(m)&&!/스터/.test(m.split(" ")[0])){
  const shk=rest;
  prep();
  steps.push(`셰이커에 넣어요 — ${L(shk)}.`);
  if(egg){T.push("dry");steps.push(`${eggOpt?"달걀흰자를 넣었다면 ":""}뚜껑을 닫고 얼음 없이 10초쯤 세게 흔들어 거품을 내요(드라이 쉐이크).`)}
  T.push("shake");steps.push(`얼음을 가득 채우고 ${/강하게/.test(m)?"15초쯤 아주 세게":"10~12초 세게"} 흔들어요. 셰이커 겉이 차갑게 얼면 충분해요.`);
  if(up){T.push("dstrain");steps.push(rim?"리밍한 잔에 호손 스트레이너와 고운 체로 더블 스트레인해요.":"잔의 얼음물을 버리고 호손 스트레이너와 고운 체로 더블 스트레인해요.")}
  else steps.push(`${CRUSH.has(en)?"크러시드 아이스":"새 얼음"} 위로 스트레이너로 걸러 부어요.`);
  if(tops.length){T.push("top");steps.push(`천천히 채워요 — ${L(tops)}.`)}
 }else if(/스터/.test(m)){
  const rocks=!up;doRim();
  steps.push(rocks?`잔(${gl})에 큰 얼음을 넣어 차갑게 해 둬요.`:`잔(${gl})에 얼음물을 채워 차갑게 식혀 둬요.`);
  steps.push(`믹싱 글라스에 넣어요 — ${L(ing)}.`);
  T.push("stir");steps.push("얼음을 가득 넣고 바 스푼으로 20~30초 부드럽게 저어요. 거품이 나지 않게 잔 벽을 따라 돌려요.");
  steps.push(rocks?"줄렙 스트레이너로 걸러 잔의 얼음 위에 부어요.":"잔의 얼음물을 버리고 줄렙(또는 호손) 스트레이너로 걸러 부어요.");
 }else{
  T.push("build");doRim();
  steps.push(noIce?(up?`잔(${gl})을 차갑게 식혀 둬요(얼음은 넣지 않아요).`:`잔(${gl})을 차갑게 준비해요(얼음 없이).`):`잔(${gl})에 얼음을 가득 채워요.`);
  if(rest.length)steps.push(`먼저 부어요 — ${L(rest)}.`);
  if(tops.length){T.push("top");steps.push(`${noIce?"잔을 살짝 기울여 ":""}천천히 채워요 — ${L(tops)}.`)}
  steps.push(tops.length?"바 스푼으로 아래에서 위로 1~2번만 살짝 섞어요.":"바 스푼으로 가볍게 저어 섞어요.");
 }
 steps.push(rim?(g.form.includes("/")?"남은 가니시를 올려 마무리해요 (위 리밍 설명 참고).":"그대로 내요."):garStep(g));return[T,steps]}
const mojito=(sp,amtS)=>(r)=>{const ing=r[6],g=r.garnish;const by=n=>ing.find(i=>i[0].includes(n));const mu=ing.filter(i=>/민트|설탕|라임|레몬/.test(i[0])),liq=ing.filter(i=>!/민트|설탕|라임|레몬/.test(i[0])&&!TOPRE.test(i[0])),tp=ing.filter(i=>TOPRE.test(i[0]));
 return[["muddle","build","top"],[`잔(${r[3]})에 넣어요 — ${L(mu)}.`,"머들러로 민트를 살살 눌러 향을 내요. 세게 짓이기면 쓴맛이 나요.",`이어서 부어요 — ${L(liq)}.`,"얼음(또는 크러시드 아이스)을 가득 채워요.",`천천히 채워요 — ${L(tp)}.`,"바 스푼으로 바닥의 민트를 아래에서 위로 끌어 올리듯 섞어요.",garStep(g)]]};
const caipi=r=>{const ing=r[6];return[["muddle","build"],[`잔(${r[3]})에 넣어요 — ${L(ing.filter(i=>/라임|설탕/.test(i[0])))}.`,"머들러로 라임을 꾹꾹 눌러 즙과 껍질 오일을 짜내고 설탕을 녹여요.",`이어서 부어요 — ${L(ing.filter(i=>!/라임|설탕/.test(i[0])))}.`,"얼음(크러시드 아이스도 좋아요)을 가득 채워요.","바 스푼으로 아래에서 위로 저어 섞어요.",garStep(r.garnish)]]};
const bloody=r=>[["rolling","throw","build"],[`잔(${r[3]})에 얼음을 채워 둬요.`,`셰이커 틴에 넣어요 — ${L(r[6])}.`,"틴에 얼음을 넣고 다른 빈 틴과 4~6번 천천히 주고받으며 섞어요(롤링). 흔들면 토마토 주스에 거품이 생겨요.","바에서는 틴을 높이 들어 길게 떨어뜨리며 주고받는 스로잉으로 만들기도 해요.","잔의 얼음 위로 걸러 부어요.",garStep(r.garnish)]];
const smash=(what)=>r=>{const ing=r[6],mu=ing.filter(i=>what.test(i[0])),rest=ing.filter(i=>!what.test(i[0]));return[["muddle","shake","dstrain"],[`잔(${r[3]})에 얼음을 가득 채워 둬요.`,`셰이커에 넣고 머들러로 눌러 즙과 향을 내요 — ${L(mu)}.`,`나머지를 넣어요 — ${L(rest)}.`,"얼음을 가득 채우고 10~12초 세게 흔들어요.","고운 체를 받쳐 잔의 얼음 위로 더블 스트레인해요. 찌꺼기가 걸러져요.",garStep(r.garnish)]]};
const OV={
"Old Fashioned":r=>[["muddle","stir"],["잔(올드패션드)에 각설탕 1개를 넣고 앙고스투라 비터스 2대시, 물 1바스푼을 뿌려요.","머들러로 각설탕을 으깨 녹여요.","큰 얼음을 넣고 버번/라이 위스키 45ml를 부어요.","바 스푼으로 20~30초 저어 차갑게 하고 알맞게 희석해요.",garStep(r.garnish)]],
"Mojito":mojito(),"Soju Mojito":mojito(),"Makgeolli Mojito":mojito(),
"Caipirinha":caipi,"Caipiroska":caipi,"Bloody Mary":bloody,"Bloody Maria":bloody,
"Gin Basil Smash":smash(/바질/),"Whiskey Smash":smash(/레몬|민트/),
"White Russian":r=>[["build","float"],["잔(올드패션드)에 얼음을 채워요.","보드카 50ml, 커피 리큐르 20ml를 붓고 바 스푼으로 살짝 저어요.","생크림 30ml를 바 스푼 뒤쪽을 타고 천천히 부어 위에 띄워요.","마실 때 저어 섞어도 좋아요. "+garStep(r.garnish)]],
"Bramble":r=>[["shake","float"],["잔(올드패션드)에 크러시드 아이스를 채워 둬요.","셰이커에 진 40ml, 레몬 주스 15ml, 심플 시럽 10ml를 넣어요.","얼음을 채우고 10~12초 세게 흔들어요.","크러시드 아이스 위로 걸러 부어요.","블랙베리 리큐르 15ml를 위에서 천천히 둘러 뿌려 아래로 번지게 해요(드리즐).","크러시드 아이스를 조금 더 얹어요.",garStep(r.garnish)]],
"Sazerac":r=>[["rinse","muddle","stir"],["잔(올드패션드)에 얼음물을 채워 차갑게 식혀 둬요.","믹싱 글라스에 각설탕 1개, 페이쇼 비터스 2대시, 물 약간을 넣고 머들러로 녹여요.","코냑 또는 라이 50ml를 넣고 얼음을 채워 20~30초 저어요.","잔의 얼음물을 버리고 압생트 10ml를 넣어 잔을 굴려 안쪽을 코팅한 뒤 남은 압생트는 버려요(린스).","얼음 없이 잔에 걸러 부어요.",garStep(r.garnish)]],
"Mint Julep":r=>[["muddle","build","swizzle"],["줄렙 컵에 민트 4잎과 심플 시럽 10ml를 넣고 머들러로 살살 눌러 향을 내요.","버번 위스키 60ml를 부어요.","크러시드 아이스를 반쯤 채우고 바 스푼으로 휘저어 컵 겉에 성에가 끼게 해요.","크러시드 아이스를 수북하게 돔 모양으로 더 얹어요.",garStep(r.garnish)]],
"Irish Coffee":r=>[["heat","build","float"],["잔(아이리시 커피 잔)에 뜨거운 물을 부어 데운 뒤 비워요.","황설탕 1티스푼과 뜨거운 커피 120ml를 넣고 저어 설탕을 녹여요.","아이리시 위스키 50ml를 넣고 섞어요.","생크림 50ml를 흐를 정도로만 살짝 휘핑해요.","크림을 바 스푼 뒤쪽을 타고 천천히 부어 위에 띄워요. 젓지 않고 크림 사이로 마셔요."]],
"Penicillin":r=>[["shake","float"],["잔(올드패션드)에 큰 얼음을 넣어 둬요.","셰이커에 블렌디드 스카치 60ml, 레몬 주스 22.5ml, 허니-진저 시럽 22.5ml를 넣어요.","얼음을 채우고 10~12초 세게 흔들어요.","잔의 얼음 위로 걸러 부어요.","아일라 스카치 7.5ml를 바 스푼 뒤쪽을 타고 부어 위에 띄워요. 스모키한 향이 먼저 올라와요.",garStep(r.garnish)]],
"Piña Colada":r=>[["blend","shake"],["블렌더에 화이트 럼 50ml, 코코넛 크림 30ml, 파인애플 주스 50ml, 크러시드 아이스 한 컵을 넣어요.","매끈해질 때까지 15~20초 갈아요.","잔(허리케인)에 부어요. (블렌더가 없으면 얼음과 세게 흔든 뒤 크러시드 아이스 위로 걸러도 돼요.)",garStep(r.garnish)]],
"Tequila Sunrise":r=>[["build","layer"],["잔(하이볼)에 얼음을 가득 채워요.","데킬라 45ml, 오렌지 주스 90ml를 붓고 가볍게 저어요.","그레나딘 15ml를 잔 가장자리로 천천히 부어 바닥에 가라앉혀요. 젓지 않아야 노을 색이 나와요.",garStep(r.garnish)]],
"Sangria":r=>[["build","top"],["피처에 레드 와인, 브랜디, 오렌지 주스와 오렌지·레몬·사과 조각을 넣어요(1잔 기준: 와인 120ml, 브랜디 20ml, 오렌지 주스 30ml).","냉장고에서 2시간 이상, 가능하면 하룻밤 재워요.","잔(와인 글라스)에 얼음을 넣고 과일과 함께 따라요.","탄산수를 조금 채워 산뜻하게 마무리해요."]],
"Vin Chaud":r=>[["heat"],["냄비에 레드 와인 150ml, 꿀 15ml, 오렌지·레몬 조각, 시나몬·정향을 넣어요.","약불에서 5~10분, 끓기 직전까지만 데워요. 끓이면 알코올과 향이 날아가요.","머그를 뜨거운 물로 데운 뒤 비워요.","체에 걸러 머그에 부어요.",garStep(r.garnish)]],
"Hot Buttered Rum":r=>[["heat","build"],["머그를 뜨거운 물로 데운 뒤 비워요.","버터 1큰술, 황설탕 1티스푼, 시나몬·넛멕·정향을 넣어요.","뜨거운 물 90ml를 붓고 저어 버터와 설탕을 녹여요.","다크 럼 60ml를 넣고 섞어요.",garStep(r.garnish)]],
"Hot Toddy":r=>[["heat","build"],["머그를 뜨거운 물로 데운 뒤 비워요.","꿀 15ml, 레몬 주스 15ml, 뜨거운 물 90ml를 넣고 저어 꿀을 녹여요.","위스키 45ml를 넣고 섞어요.",garStep(r.garnish)]],
"Black Velvet":r=>[["layer"],["플루트를 차갑게 식혀 둬요.","잔을 기울여 샴페인 75ml를 먼저 천천히 부어요.","스타우트 75ml를 바 스푼 뒤쪽을 타고 아주 천천히 부어요.","젓지 않고 그대로 내요."]],
"Somaek":r=>[["build"],["맥주잔을 차갑게 준비해요.","소주 50ml를 먼저 부어요.","잔을 기울여 차가운 라거 맥주 150ml를 천천히 부어요.","숟가락으로 잔 바닥을 톡 쳐서 거품을 올려요."]],
"Ramos Gin Fizz":r=>[["dry","shake","top"],["잔(콜린스)을 냉동실에 넣어 차갑게 해 둬요(얼음은 넣지 않아요).","셰이커에 진 45ml, 생크림 30ml, 레몬·라임 주스 각 15ml, 심플 시럽 30ml, 달걀흰자 30ml, 오렌지 플라워 워터 3대시를 넣어요.","얼음 없이 15~20초 세게 흔들어요(드라이 쉐이크).","얼음을 넣고 최소 30초에서 1분까지 길게 흔들어요.","차가운 잔에 걸러 붓고 1~2분 두어 거품을 굳혀요.","소다수 60ml를 가운데로 천천히 부어 거품을 잔 위로 밀어 올려요."]],
"Porn Star Martini":r=>[["shake","dstrain"],["잔(쿠프)에 얼음물을 채워 차갑게 식혀 둬요.","패션프루트 반 개의 속을 셰이커에 긁어 넣어요.","바닐라 보드카 45ml, 패션프루트 리큐르 15ml, 라임 주스 15ml, 바닐라 시럽 7.5ml를 넣어요.","얼음을 채우고 10~12초 세게 흔들어요.","잔의 얼음물을 버리고 더블 스트레인해요.",garStep(r.garnish),"프로세코 60ml는 샷잔에 따로 담아 곁들여요."]],
"Harvey Wallbanger":r=>[["build","float"],["잔(하이볼)에 얼음을 가득 채워요.","보드카 45ml, 오렌지 주스 90ml를 붓고 저어요.","갈리아노 15ml를 바 스푼 뒤쪽을 타고 부어 위에 띄워요.",garStep(r.garnish)]],
"Mudslide":r=>[["shake"],["잔(올드패션드) 안쪽에 초콜릿 시럽을 빙 둘러 뿌려요.","잔에 얼음을 채워요.","셰이커에 보드카, 커피 리큐르, 아이리시 크림 리큐르를 각 30ml씩 넣어요.","얼음을 채우고 10초 세게 흔들어요.","잔의 얼음 위로 걸러 부어요."]],
"Ti' Punch":r=>[["build","swizzle"],["잔(올드패션드) 위에서 라임 조각을 짜 즙과 오일을 떨어뜨리고 조각을 넣어요.","사탕수수 시럽 1티스푼을 넣어요.","아그리콜 럼 60ml를 붓고 바 스푼(또는 스위즐 스틱)으로 저어 섞어요.","얼음은 넣지 않는 게 전통이지만, 원하면 1~2개 넣어도 돼요."]],
"Queen's Park Swizzle":r=>[["muddle","swizzle","float"],["잔(하이볼)에 민트 8잎, 데메라라 시럽 15ml, 라임 주스 25ml를 넣고 민트를 살살 눌러요.","데메라라 럼 60ml를 부어요.","크러시드 아이스를 3/4쯤 채워요.","스위즐 스틱을 꽂고 손바닥 사이로 비벼 돌려 잔 겉에 성에가 낄 때까지 섞어요.","크러시드 아이스를 수북하게 더 얹어요.","앙고스투라 비터스 4대시를 맨 위에 떨어뜨려 붉은 층을 만들어요.",garStep(r.garnish)]],
"Batanga":r=>{const g=r.garnish;return[["rim","build","top"],[rimStep(g),"잔(하이볼)에 얼음을 가득 채워요.","데킬라 50ml, 라임 주스 15ml를 부어요.","콜라 120ml를 천천히 채워요.","원조 바처럼 칼(또는 바 스푼)로 가볍게 저어 섞어요."]]},
"New York Sour":r=>[["shake","float"],["잔(올드패션드)에 얼음을 채워 둬요.","셰이커에 라이 위스키 60ml, 레몬 주스 30ml, 심플 시럽 22.5ml를 넣어요.","얼음을 채우고 10~12초 세게 흔들어요.","잔의 얼음 위로 걸러 부어요.","레드 와인 30ml를 바 스푼 뒤쪽을 타고 아주 천천히 부어 위에 붉은 층을 띄워요."]],
"Sherry Cobbler":r=>[["shake"],["잔(콜린스)에 크러시드 아이스를 채워 둬요.","셰이커에 아몬티야도 셰리 90ml, 심플 시럽 15ml, 오렌지 2조각을 넣어요.","얼음을 채우고 오렌지가 으깨지도록 10~12초 세게 흔들어요.","크러시드 아이스 위로 걸러 붓고 크러시드 아이스를 수북하게 더 얹어요.",garStep(r.garnish)+" 빨대를 꽂아 내요."]],
"B-52":r=>[["layer"],["샷잔을 준비해요.","커피 리큐르 20ml를 맨 아래에 부어요.","아이리시 크림 리큐르 20ml를 바 스푼 뒤쪽을 타고 천천히 부어 두 번째 층을 만들어요.","그랑 마르니에 20ml를 같은 방법으로 맨 위에 쌓아요.","젓지 않고 층을 보여 줘요."]],
"Boilermaker":r=>[["build"],["파인트 잔을 기울여 라거 맥주 330ml를 천천히 따라요.","샷잔에 위스키 45ml를 따라요.","둘을 함께 내고 번갈아 마셔요. 샷을 맥주에 넣어 마시기도 해요."]],
"Black and Tan":r=>[["layer"],["파인트 잔을 기울여 페일 에일 240ml를 먼저 부어요.","숟가락을 뒤집어 잔 위에 대고 스타우트 240ml를 그 위로 아주 천천히 부어요.","스타우트가 위에 떠서 두 층이 생기면 그대로 내요."]],
"Watermelon Soju":r=>[["blend","build"],["수박 과육 300ml 분량의 씨를 빼고 블렌더에 곱게 갈아요(원하면 체에 걸러요).","수박 껍질 그릇이나 볼에 얼음을 넣어요.","수박즙, 소주 120ml를 붓고 저어요.","사이다 100ml를 천천히 채워요.",garStep(r.garnish)]],
"Banana Makgeolli":r=>[["blend","build"],["블렌더에 바나나 1/2개, 우유 30ml, 막걸리 조금을 넣고 곱게 갈아요.","잔(하이볼)에 얼음을 채워요.","간 바나나와 나머지 막걸리를 부어 가볍게 저어요.",garStep(r.garnish)]],
"Champagne Cocktail":r=>[["build","top"],["플루트를 차갑게 식혀 둬요.","각설탕 1개를 잔에 넣고 앙고스투라 비터스 2대시로 적셔요.","코냑 10ml를 부어요.","샴페인 90ml를 천천히 채워요. 각설탕에서 기포가 계속 올라와요.",garStep(r.garnish)]],
"B&B":r=>[["build"],["스니프터를 준비해요(얼음 없이 상온).","코냑 30ml, 베네딕틴 30ml를 차례로 부어요.","잔을 살짝 돌려 섞어요."]],
"Cucumber Soju":r=>[["build","top"],["필러로 오이를 얇고 길게 리본 모양으로 깎아요.","잔(하이볼) 안쪽 벽에 오이 리본을 둘러 붙여요.","얼음을 가득 채우고 소주 60ml를 부어요.","토닉워터 90ml를 천천히 채우고 가볍게 한 번 섞어요."]],
"Makgeolli Lemonade":r=>[["build","top"],["막걸리 병을 살살 뒤집어 앙금을 풀어요(흔들면 넘쳐요).","잔(하이볼)에 얼음을 채워요.","막걸리 120ml, 레몬 주스 20ml를 부어요.","사이다 60ml를 천천히 채우고 한 번만 저어요.",garStep(r.garnish)]],
"Makgeolli & Cider":r=>[["build","top"],["막걸리 병을 살살 뒤집어 앙금을 풀어요(흔들면 넘쳐요).","사발이나 하이볼 잔에 얼음을 넣어요(생략해도 돼요).","막걸리 150ml를 부어요.","사이다 100ml를 천천히 채우고 한 번만 저어요."]],
"Stinger":r=>[["stir","shake"],["잔(올드패션드)에 크러시드 아이스나 얼음을 채워 둬요.","믹싱 글라스에 코냑 50ml, 크렘 드 망트(화이트) 20ml를 넣어요.","얼음과 20~30초 저어요(셰이크해도 돼요).","잔의 얼음 위로 걸러 부어요.",garStep(r.garnish)]]
};
window.methodsFor=r=>{const o=OV[r[1]];const[t,s]=o?o(r):gen(r);return{t:[...new Set(t)].sort((a,b)=>ORD.indexOf(a)-ORD.indexOf(b)),s}};
window.techChips=t=>`<div class="techs">${t.map(k=>`<button class="tch" data-k="${k}">${TECH[k][0]} <small>${TECH[k][1]}</small></button>`).join("")}</div><div class="tdesc" hidden></div>`;
window.stepList=s=>`<ol class="steps">${s.map(x=>`<li>${x}</li>`).join("")}</ol>`;
R.forEach(r=>{const m=methodsFor(r);r.techniques=m.t;r.steps=m.s});
})();
