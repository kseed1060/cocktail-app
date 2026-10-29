// 한글|영문|별칭(쉼표)|base|세부 종류|맛 노트(쉼표)
const BRAND_RAW=`바카디 카르타 블랑카|Bacardi Carta Blanca|바카디,바카디 화이트,바카디 슈페리어,bacardi superior,bacardi|rum|화이트 럼|가벼움,깔끔함,은은한 바닐라
바카디 카르타 오로|Bacardi Carta Oro|바카디 골드,bacardi gold|rum|골드 럼|캐러멜,바닐라,부드러움
바카디 카르타 네그라|Bacardi Carta Negra|바카디 블랙,bacardi black|rum|다크 럼|당밀,캐러멜,묵직함
바카디 8년|Bacardi Reserva Ocho|바카디 8,bacardi 8|rum|다크 럼|오크,바닐라,말린 과일
하바나 클럽 3년|Havana Club 3 Años|하바나클럽,하바나 클럽,havana club|rum|화이트 럼|바나나,바닐라,가벼움
하바나 클럽 7년|Havana Club 7 Años|하바나 7,havana club 7|rum|다크 럼|코코아,담배잎,오크
마이어스 다크|Myers's Original Dark|마이어스,마이어스 럼,myers,myers's|rum|다크 럼|당밀,캐러멜,커피
캡틴 모건 스파이스드|Captain Morgan Original Spiced|캡틴모건,캡틴 모건,captain morgan|rum|스파이스드 럼|바닐라,계피,캐러멜
크라켄|The Kraken Black Spiced|크라켄 럼,kraken|rum|스파이스드 럼|당밀,계피,정향,진한 바닐라
세일러 제리|Sailor Jerry Spiced|세일러제리,sailor jerry|rum|스파이스드 럼|바닐라,계피,라임 껍질
고슬링 블랙씰|Gosling's Black Seal|고슬링,goslings,black seal|rum|다크 럼|당밀,버터스카치,묵직함
애플턴 에스테이트|Appleton Estate|애플턴,appleton|rum|골드 럼|오렌지 껍질,바닐라,자메이카 펑크
마운트 게이 이클립스|Mount Gay Eclipse|마운트게이,mount gay|rum|골드 럼|바나나,바닐라,토스트
플랜테레이 3 스타|Planteray 3 Stars|플랜테이션 3스타,plantation 3 stars,planteray|rum|화이트 럼|열대 과일,사탕수수,깔끔함
플랜테레이 파인애플|Planteray Stiggins' Fancy Pineapple|플랜테이션 파인애플,plantation pineapple|rum|골드 럼|구운 파인애플,바닐라,향신료
론 자카파 23|Ron Zacapa 23|자카파,zacapa|rum|다크 럼|꿀,버터스카치,말린 과일
디플로마티코 레세르바|Diplomático Reserva Exclusiva|디플로마티코,diplomatico|rum|다크 럼|토피,오렌지,초콜릿
엘 도라도 12년|El Dorado 12|엘도라도,el dorado|rum|다크 럼|데메라라 설탕,건포도,오크
스미스 앤 크로스|Smith & Cross|smith and cross|rum|오버프루프 럼|자메이카 펑크,바나나,향신료,강함
레이 앤 네퓨 오버프루프|Wray & Nephew White Overproof|레이앤네퓨,wray and nephew|rum|오버프루프 럼|강렬함,풀 향,파인애플
렁 블랑|Rhum J.M Blanc|rhum jm,jm 럼|rum|아그리콜 럼|사탕수수,풀 향,후추
클레망 블랑|Rhum Clément Blanc|클레망,clement|rum|아그리콜 럼|사탕수수,꽃,시트러스
브루갈 아녜호|Brugal Añejo|브루갈,brugal|rum|골드 럼|드라이,오크,견과
돈 큐 크리스탈|Don Q Cristal|돈큐,don q|rum|화이트 럼|가벼움,시트러스,깔끔함
말리부|Malibu|말리부 코코넛,malibu|liqueur|과일 리큐르|코코넛,달콤함,가벼움
카샤사 51|Cachaça 51|51 카샤사,cachaca 51|rum|카샤사|사탕수수,풀 향,가벼움
레블론 카샤사|Leblon Cachaça|leblon|rum|카샤사|사탕수수,바나나,부드러움
짐 빔 화이트|Jim Beam White Label|짐빔,짐 빔,jim beam|whiskey|버번|바닐라,옥수수 단맛,오크
짐 빔 라이|Jim Beam Rye|짐빔 라이|whiskey|라이 위스키|후추,바닐라,가벼움
메이커스 마크|Maker's Mark|메이커스마크,makers mark|whiskey|버번|캐러멜,바닐라,밀의 부드러움
와일드 터키 101|Wild Turkey 101|와일드터키,wild turkey|whiskey|버번|진한 캐러멜,후추,오크
와일드 터키 라이|Wild Turkey Rye|와일드터키 라이|whiskey|라이 위스키|후추,허브,캐러멜
버팔로 트레이스|Buffalo Trace|버팔로트레이스,buffalo trace|whiskey|버번|토피,바닐라,민트
우드포드 리저브|Woodford Reserve|우드포드,woodford|whiskey|버번|말린 과일,초콜릿,향신료
포 로지스|Four Roses Bourbon|포로지스,four roses|whiskey|버번|배,꽃,부드러운 향신료
노브 크릭|Knob Creek 9|노브크릭,knob creek|whiskey|버번|견과,오크,메이플
불렛 버번|Bulleit Bourbon|불렛,불릿,bulleit|whiskey|버번|바닐라,넛맥,라이의 스파이스
불렛 라이|Bulleit Rye|불렛 라이,bulleit rye|whiskey|라이 위스키|후추,허브,드라이
에반 윌리엄스|Evan Williams Black|에반윌리엄스,evan williams|whiskey|버번|캐러멜,바닐라,가벼움
엘라이자 크레이그|Elijah Craig Small Batch|엘리자 크레이그,elijah craig|whiskey|버번|토스트한 오크,캐러멜,넛맥
블랜튼스|Blanton's Original|블랜튼,blantons|whiskey|버번|오렌지,꿀,바닐라
이글 레어|Eagle Rare 10|이글레어,eagle rare|whiskey|버번|토피,오렌지 껍질,가죽
잭 다니엘스|Jack Daniel's Old No.7|잭다니엘,잭 다니엘,jack daniels,jd|whiskey|테네시 위스키|바나나,캐러멜,숯 필터의 부드러움
젠틀맨 잭|Gentleman Jack|젠틀맨잭,gentleman jack|whiskey|테네시 위스키|부드러움,바닐라,꿀
사제락 라이|Sazerac Rye|sazerac rye|whiskey|라이 위스키|정향,아니스,시트러스
리튼하우스 라이|Rittenhouse Rye|리튼하우스,rittenhouse|whiskey|라이 위스키|후추,코코아,묵직함
미치터스 US1 버번|Michter's US*1 Bourbon|미치터스,michters|whiskey|버번|캐러멜,바닐라,과일
엔젤스 엔비|Angel's Envy|엔젤스엔비,angels envy|whiskey|버번|포트 와인,바닐라,베리
베이질 헤이든|Basil Hayden|basil hayden|whiskey|버번|가벼움,라이 스파이스,꿀
조니워커 레드|Johnnie Walker Red Label|조니 워커 레드,조니워커레드,johnnie walker red,레드라벨|whiskey|스카치 블렌디드|후추,가벼운 스모크,사과
조니워커 블랙|Johnnie Walker Black Label|조니 워커 블랙,조니워커블랙,johnnie walker black,블랙라벨,조니워커|whiskey|스카치 블렌디드|은은한 스모크,바닐라,말린 과일
조니워커 더블 블랙|Johnnie Walker Double Black|조니워커 더블블랙,double black|whiskey|스카치 블렌디드|진한 스모크,오크,말린 과일
조니워커 그린|Johnnie Walker Green Label|조니워커그린,green label|whiskey|블렌디드 몰트|풀 향,배,스모크
조니워커 블루|Johnnie Walker Blue Label|조니워커블루,blue label|whiskey|스카치 블렌디드|꿀,스모크,실키함
시바스 리갈 12|Chivas Regal 12|시바스,시바스리갈,chivas|whiskey|스카치 블렌디드|꿀,사과,바닐라
발렌타인 파이니스트|Ballantine's Finest|발렌타인,ballantines|whiskey|스카치 블렌디드|가벼움,바닐라,사과
발렌타인 17년|Ballantine's 17|발렌타인17,ballantines 17|whiskey|스카치 블렌디드|꿀,오크,은은한 스모크
듀어스 화이트 라벨|Dewar's White Label|듀어스,dewars|whiskey|스카치 블렌디드|꿀,바닐라,부드러움
페이머스 그라우스|The Famous Grouse|페이머스그라우스,famous grouse|whiskey|스카치 블렌디드|셰리,과일,부드러움
몽키 숄더|Monkey Shoulder|몽키숄더,monkey shoulder|whiskey|블렌디드 몰트|바닐라,오렌지,꿀
커티삭|Cutty Sark|커티 삭,cutty sark|whiskey|스카치 블렌디드|가벼움,시트러스,바닐라
제이앤비|J&B Rare|J&B,jnb,제이엔비|whiskey|스카치 블렌디드|가벼움,사과,드라이
로열 살루트 21|Royal Salute 21|로얄살루트,royal salute|whiskey|스카치 블렌디드|말린 과일,꿀,오크
윈저 12|Windsor 12|윈저,windsor|whiskey|스카치 블렌디드|부드러움,꿀,바닐라
그란츠|Grant's Triple Wood|그란츠,grants|whiskey|스카치 블렌디드|바닐라,사과,가벼움
글렌피딕 12|Glenfiddich 12|글렌피딕,glenfiddich|whiskey|싱글몰트 스카치|배,사과,가벼운 오크
글렌리벳 12|The Glenlivet 12|글렌리벳,glenlivet|whiskey|싱글몰트 스카치|파인애플,꽃,바닐라
맥캘란 12 셰리 오크|The Macallan 12 Sherry Oak|맥캘란,맥켈란,macallan|whiskey|싱글몰트 스카치|셰리,말린 과일,생강
맥캘란 12 더블 캐스크|The Macallan 12 Double Cask|맥캘란 더블캐스크|whiskey|싱글몰트 스카치|꿀,셰리,바닐라
글렌모렌지 오리지널|Glenmorangie The Original|글렌모렌지,glenmorangie|whiskey|싱글몰트 스카치|오렌지 꽃,바닐라,복숭아
발베니 12 더블우드|The Balvenie 12 DoubleWood|발베니,balvenie|whiskey|싱글몰트 스카치|꿀,셰리,바닐라
글렌드로낙 12|GlenDronach 12|글렌드로낙,glendronach|whiskey|싱글몰트 스카치|셰리,건포도,초콜릿
달모어 12|The Dalmore 12|달모어,dalmore|whiskey|싱글몰트 스카치|오렌지,초콜릿,셰리
글렌파클라스 12|Glenfarclas 12|글렌파클라스,glenfarclas|whiskey|싱글몰트 스카치|셰리,견과,말린 과일
아벨라워 아부나흐|Aberlour A'bunadh|아벨라워,aberlour|whiskey|싱글몰트 스카치|셰리,향신료,강함
오반 14|Oban 14|오반,oban|whiskey|싱글몰트 스카치|바다 소금,오렌지,은은한 스모크
스프링뱅크 10|Springbank 10|스프링뱅크,springbank|whiskey|싱글몰트 스카치|바다 소금,은은한 피트,과일
하이랜드 파크 12|Highland Park 12|하이랜드파크,highland park|whiskey|싱글몰트 스카치|헤더 꿀,은은한 피트,셰리
탈리스커 10|Talisker 10|탈리스커,talisker|whiskey|피티 스카치|후추,바다 소금,스모크
라프로익 10|Laphroaig 10|라프로익,laphroaig|whiskey|피티 스카치|강한 피트,요오드,해초,바닐라
라가불린 16|Lagavulin 16|라가불린,lagavulin|whiskey|피티 스카치|진한 피트,셰리,바다
아드벡 10|Ardbeg 10|아드벡,ardbeg|whiskey|피티 스카치|강한 스모크,레몬,후추
쿨일라 12|Caol Ila 12|쿨 일라,caol ila|whiskey|피티 스카치|스모크,레몬,바다 소금
보모어 12|Bowmore 12|보모어,bowmore|whiskey|피티 스카치|은은한 스모크,꿀,시트러스
킬호만 마키어 베이|Kilchoman Machir Bay|킬호만,kilchoman|whiskey|피티 스카치|스모크,레몬,바닐라
포트 샬롯|Port Charlotte 10|포트샬롯,port charlotte|whiskey|피티 스카치|강한 피트,바다,보리
브룩라디 클래식 랫디|Bruichladdich The Classic Laddie|브룩라디,bruichladdich|whiskey|싱글몰트 스카치|보리,꽃,바다 (피트 없음)
제임슨|Jameson|jameson,제임슨 아이리시|whiskey|아이리시 위스키|부드러움,바닐라,견과
부시밀즈 오리지널|Bushmills Original|부시밀,bushmills|whiskey|아이리시 위스키|꿀,사과,가벼움
털라모어 듀|Tullamore D.E.W.|털라모어,tullamore|whiskey|아이리시 위스키|부드러움,사과,바닐라
레드브레스트 12|Redbreast 12|레드브레스트,redbreast|whiskey|아이리시 위스키|셰리,향신료,크리미함
파워스 골드 라벨|Powers Gold Label|파워스,powers|whiskey|아이리시 위스키|향신료,꿀,묵직함
산토리 가쿠빈|Suntory Kakubin|가쿠빈,카쿠빈,산토리 카쿠,kakubin,산토리 위스키|whiskey|재패니즈 위스키|가벼움,꿀,드라이
산토리 토키|Suntory Toki|토키,toki|whiskey|재패니즈 위스키|녹차,청사과,가벼움
히비키 하모니|Hibiki Japanese Harmony|히비키,hibiki|whiskey|재패니즈 위스키|꿀,오렌지 껍질,화이트 초콜릿
야마자키 12|Yamazaki 12|야마자키,yamazaki|whiskey|재패니즈 위스키|복숭아,미즈나라 오크,코코넛
하쿠슈 12|Hakushu 12|하쿠슈,hakushu|whiskey|재패니즈 위스키|풋사과,민트,은은한 스모크
닛카 프롬 더 배럴|Nikka From the Barrel|닛카,프롬더배럴,nikka|whiskey|재패니즈 위스키|향신료,캐러멜,진함
닛카 요이치|Nikka Yoichi Single Malt|요이치,yoichi|whiskey|재패니즈 위스키|스모크,바다,몰트
닛카 미야기쿄|Nikka Miyagikyo Single Malt|미야기쿄,miyagikyo|whiskey|재패니즈 위스키|과일,꽃,셰리
닛카 코페이 그레인|Nikka Coffey Grain|코페이 그레인,coffey grain|whiskey|재패니즈 위스키|바닐라,옥수수,열대 과일
크라운 로열|Crown Royal|크라운로얄,크라운 로얄,crown royal|whiskey|캐나디안 위스키|부드러움,바닐라,캐러멜
캐나디안 클럽|Canadian Club|캐나디안클럽,canadian club|whiskey|캐나디안 위스키|가벼움,바닐라,호밀
카발란 클래식|Kavalan Classic|카발란,kavalan|whiskey|월드 위스키|망고,바닐라,꿀
암룻 퓨전|Amrut Fusion|암룻,amrut|whiskey|월드 위스키|열대 과일,은은한 피트,향신료
봄베이 사파이어|Bombay Sapphire|봄베이,bombay|gin|런던 드라이 진|주니퍼,시트러스,부드러운 향신료
탱커레이|Tanqueray London Dry|탱크레이,탱커레이 진,tanqueray|gin|런던 드라이 진|강한 주니퍼,고수 씨앗,드라이
탱커레이 넘버 텐|Tanqueray No. Ten|탱커레이 10,넘버텐,tanqueray ten|gin|런던 드라이 진|자몽,라임,카모마일
비피터|Beefeater London Dry|비피터 진,beefeater|gin|런던 드라이 진|주니퍼,오렌지,클래식
고든스|Gordon's London Dry|고든스 진,gordons|gin|런던 드라이 진|주니퍼,레몬,가벼움
헨드릭스|Hendrick's|헨드릭스 진,헨드릭,hendricks|gin|뉴웨스턴 진|오이,장미,부드러움
몽키 47|Monkey 47|몽키47,monkey 47|gin|뉴웨스턴 진|크랜베리,허브,주니퍼,복합적
더 보타니스트|The Botanist|보타니스트,botanist|gin|런던 드라이 진|허브,꽃,주니퍼
플리머스 진|Plymouth Gin|플리머스,plymouth|gin|플리머스 진|부드러운 주니퍼,흙 향,시트러스
시핑스미스|Sipsmith London Dry|시프스미스,sipsmith|gin|런던 드라이 진|주니퍼,레몬 타르트,드라이
로쿠|Roku Gin|로쿠 진,roku|gin|재패니즈 진|유자,사쿠라,녹차
키노비|Ki No Bi Kyoto Dry|키노비,kinobi|gin|재패니즈 진|유자,산초,녹차
진 마레|Gin Mare|진마레,gin mare|gin|뉴웨스턴 진|올리브,로즈마리,바질
에비에이션 진|Aviation American Gin|에비에이션 아메리칸,aviation gin|gin|뉴웨스턴 진|라벤더,카다멈,부드러움
헤이먼스 올드 톰|Hayman's Old Tom|헤이먼스,haymans|gin|올드 톰 진|달콤함,주니퍼,시트러스
랜섬 올드 톰|Ransom Old Tom|ransom|gin|올드 톰 진|몰트,오크,향신료
노르데스|Nordés Atlantic Galician Gin|노르데스 진,nordes|gin|뉴웨스턴 진|알바리뇨 포도,허브,바다
불독 진|Bulldog Gin|불독,bulldog|gin|런던 드라이 진|라벤더,용안,부드러움
포 필러스 레어 드라이|Four Pillars Rare Dry|포필러스,four pillars|gin|뉴웨스턴 진|오렌지,후추,허브
말피 콘 리모네|Malfy Gin Con Limone|말피,malfy|gin|플레이버드 진|레몬,주니퍼,상큼함
고든스 핑크|Gordon's Premium Pink|고든스핑크,gordons pink|gin|플레이버드 진|딸기,라즈베리,달콤함
위틀리 닐|Whitley Neill Original|위틀리닐,whitley neill|gin|런던 드라이 진|바오밥,케이프 구스베리,시트러스
브록맨스|Brockmans|brockmans|gin|뉴웨스턴 진|블루베리,블랙베리,코리앤더
앱솔루트|Absolut Vodka|앱솔,absolut|vodka|플레인 보드카|깔끔함,곡물 단맛,후추
앱솔루트 시트론|Absolut Citron|앱솔루트 레몬,absolut citron|vodka|플레이버드 보드카|레몬,라임,상큼함
앱솔루트 바닐리아|Absolut Vanilia|앱솔루트 바닐라,absolut vanilia|vodka|플레이버드 보드카|바닐라,버터스카치,달콤함
스미노프 No.21|Smirnoff No. 21|스미노프,smirnoff|vodka|플레인 보드카|깔끔함,가벼움,중립적
그레이 구스|Grey Goose|그레이구스,grey goose|vodka|플레인 보드카|부드러움,아몬드,밀
벨베데레|Belvedere|벨베디어,belvedere|vodka|플레인 보드카|바닐라,크리미함,호밀
시락|Cîroc|씨록,시록,ciroc|vodka|플레인 보드카|포도,시트러스,부드러움
케텔 원|Ketel One|케텔원,ketel one|vodka|플레인 보드카|시트러스,깔끔함,실키함
스톨리치나야|Stolichnaya|스톨리,stoli|vodka|플레인 보드카|곡물,후추,깔끔함
러시안 스탠다드|Russian Standard|russian standard|vodka|플레인 보드카|곡물,깔끔함,부드러움
핀란디아|Finlandia|핀란디아 보드카,finlandia|vodka|플레인 보드카|깔끔함,보리,가벼움
티토스|Tito's Handmade|티토,titos|vodka|플레인 보드카|옥수수 단맛,부드러움,후추
쇼팽 포테이토|Chopin Potato|쇼팽,chopin|vodka|플레인 보드카|크리미함,흙 향,감자
즈브로브카|Żubrówka Bison Grass|주브로브카,zubrowka|vodka|플레이버드 보드카|들풀,바닐라,계피
스카이|SKYY Vodka|skyy|vodka|플레인 보드카|가벼움,깔끔함,중립적
벨루가 노블|Beluga Noble|벨루가,beluga|vodka|플레인 보드카|크리미함,곡물,부드러움
크리스탈 헤드|Crystal Head|crystal head|vodka|플레인 보드카|깔끔함,바닐라,가벼운 단맛
스베드카|Svedka|svedka|vodka|플레인 보드카|가벼움,깔끔함,중립적
호세 쿠엘보 에스페셜|Jose Cuervo Especial Gold|호세쿠엘보,호세 쿠엘보,쿠엘보,jose cuervo,cuervo|tequila|골드 데킬라(믹스토)|캐러멜,아가베,가벼움
호세 쿠엘보 실버|Jose Cuervo Especial Silver|쿠엘보 실버,cuervo silver|tequila|블랑코 데킬라|아가베,시트러스,후추
패트론 실버|Patrón Silver|패트론,patron|tequila|블랑코 데킬라|아가베,시트러스,후추
패트론 레포사도|Patrón Reposado|패트론 레포사도|tequila|레포사도 데킬라|아가베,바닐라,오크
패트론 아녜호|Patrón Añejo|패트론 아네호|tequila|아녜호 데킬라|바닐라,캐러멜,오크
돈 훌리오 블랑코|Don Julio Blanco|돈훌리오,don julio|tequila|블랑코 데킬라|시트러스,아가베,후추
돈 훌리오 레포사도|Don Julio Reposado|돈훌리오 레포사도|tequila|레포사도 데킬라|캐러멜,초콜릿,아가베
돈 훌리오 1942|Don Julio 1942|1942,돈훌리오1942|tequila|아녜호 데킬라|캐러멜,토피,바닐라
카사미고스 블랑코|Casamigos Blanco|카사미고스,casamigos|tequila|블랑코 데킬라|바닐라,아가베,부드러움
카사미고스 레포사도|Casamigos Reposado|카사미고스 레포사도|tequila|레포사도 데킬라|캐러멜,코코아,부드러움
에라두라 레포사도|Herradura Reposado|에라두라,herradura|tequila|레포사도 데킬라|구운 아가베,오크,향신료
에스포론 블랑코|Espolòn Blanco|에스폴론,espolon|tequila|블랑코 데킬라|아가베,후추,열대 과일
올메카 알토스 플라타|Olmeca Altos Plata|올메카,알토스,olmeca altos|tequila|블랑코 데킬라|시트러스,아가베,허브
사우자 실버|Sauza Silver|사우자,sauza|tequila|블랑코 데킬라|아가베,가벼움,후추
1800 실버|1800 Silver|1800 데킬라,1800|tequila|블랑코 데킬라|아가베,후추,깔끔함
클라세 아술 레포사도|Clase Azul Reposado|클라세아줄,클라세 아줄,clase azul|tequila|레포사도 데킬라|바닐라,캐러멜,부드러움
엘 히마도르|El Jimador Blanco|엘히마도르,el jimador|tequila|블랑코 데킬라|아가베,시트러스,가벼움
포르탈레자 블랑코|Fortaleza Blanco|포르탈레자,fortaleza|tequila|블랑코 데킬라|구운 아가베,올리브,버터
타파티오 블랑코|Tapatio Blanco|타파티오,tapatio|tequila|블랑코 데킬라|아가베,후추,허브
델 마게이 비다|Del Maguey Vida|델마게이,vida mezcal,del maguey|tequila|메즈칼|스모크,구운 아가베,시트러스
몬테 알반|Monte Alban Mezcal|몬테알반,monte alban|tequila|메즈칼|스모크,아가베,흙 향
일레갈 메즈칼 호벤|Ilegal Mezcal Joven|일레갈,ilegal|tequila|메즈칼|스모크,시트러스,후추
400 코네호스|400 Conejos Joven|400 conejos|tequila|메즈칼|스모크,구운 아가베,부드러움
헤네시 VS|Hennessy V.S|헤네시,hennessy|brandy|코냑|오크,바닐라,견과
헤네시 XO|Hennessy X.O|헤네시xo,hennessy xo|brandy|코냑|초콜릿,후추,말린 과일
레미 마르탱 VSOP|Rémy Martin VSOP|레미마르탱,레미 마틴,remy martin|brandy|코냑|바닐라,살구,꽃
레미 마르탱 XO|Rémy Martin XO|레미 xo,remy xo|brandy|코냑|무화과,계피,오렌지
마텔 VS|Martell VS|마텔,martell|brandy|코냑|과일,가벼운 오크,드라이
마텔 코르동 블루|Martell Cordon Bleu|코르동블루,cordon bleu|brandy|코냑|말린 과일,모카,오렌지
쿠르부아지에 VSOP|Courvoisier VSOP|쿠르보아지에,courvoisier|brandy|코냑|꽃,바닐라,토스트
까뮈 XO|Camus XO|까뮤,camus|brandy|코냑|꽃,말린 과일,향신료
피에르 페랑 1840|Pierre Ferrand 1840 Original|피에르페랑,ferrand 1840|brandy|코냑|과일,향신료,칵테일용 고도수
샤토 드 로바드|Château de Laubade|로바드,laubade|brandy|아르마냑|자두,오크,묵직함
크리스찬 드루앵|Christian Drouin Calvados|드루앵,drouin|brandy|칼바도스/애플 브랜디|사과,배,오크
불라르 칼바도스|Boulard Calvados|불라르,boulard|brandy|칼바도스/애플 브랜디|사과,바닐라,부드러움
페르 마글루아|Père Magloire Calvados|페르마글루아,pere magloire|brandy|칼바도스/애플 브랜디|사과,오크,꽃
레어즈 애플잭|Laird's Applejack|레어즈,lairds,applejack,애플잭|brandy|칼바도스/애플 브랜디|사과,바닐라,오크
피스코 포르톤|Pisco Portón|포르톤,porton|brandy|피스코|포도,꽃,시트러스
바르솔 케브란타|Barsol Quebranta|바르솔,barsol|brandy|피스코|포도,흙 향,바나나
카펠 피스코|Capel Pisco|카펠,capel|brandy|피스코|포도,가벼움,달콤함
카를로스 프리메로|Carlos I|카를로스1세,carlos primero|brandy|스페인 브랜디|셰리,건포도,바닐라
토레스 10|Torres 10 Gran Reserva|토레스,torres 10|brandy|스페인 브랜디|바닐라,캐러멜,말린 과일
메탁사 7스타|Metaxa 7 Stars|메탁사,metaxa|brandy|그리스 브랜디|꿀,무스카트 와인,허브
쿠앵트로|Cointreau|쿠엥트로,cointreau|liqueur|오렌지 리큐르|오렌지 껍질,깔끔한 단맛,강함
그랑 마르니에|Grand Marnier Cordon Rouge|그랑마니에,그랑 마니에,grand marnier|liqueur|오렌지 리큐르|오렌지,코냑,바닐라
드카이퍼 트리플 섹|DeKuyper Triple Sec|트리플섹,triple sec,dekuyper|liqueur|오렌지 리큐르|오렌지,달콤함,가벼움
피에르 페랑 드라이 퀴라소|Pierre Ferrand Dry Curaçao|드라이 퀴라소,dry curacao|liqueur|오렌지 리큐르|쓴 오렌지,향신료,드라이
볼스 블루 큐라소|Bols Blue Curaçao|블루큐라소,blue curacao,볼스|liqueur|오렌지 리큐르|오렌지,달콤함,파란색
깔루아|Kahlúa|칼루아,kahlua|liqueur|커피 리큐르|커피,바닐라,캐러멜
티아 마리아|Tia Maria|티아마리아,tia maria|liqueur|커피 리큐르|커피,바닐라,덜 단맛
미스터 블랙|Mr Black Cold Brew|미스터블랙,mr black|liqueur|커피 리큐르|진한 콜드브루,쌉싸름,덜 단맛
베일리스|Baileys Original Irish Cream|베일리스 아이리시 크림,baileys|liqueur|크림 리큐르|크림,초콜릿,위스키
아마룰라|Amarula|amarula|liqueur|크림 리큐르|마룰라 열매,캐러멜,크림
디사론노|Disaronno Originale|디사로노,아마레또,disaronno,amaretto|liqueur|너트 리큐르|아몬드 향,마지판,달콤함
프란젤리코|Frangelico|frangelico|liqueur|너트 리큐르|헤이즐넛,바닐라,코코아
예거마이스터|Jägermeister|예거,jagermeister,jager|liqueur|허브 리큐르|감초,허브,쌉싸름
그린 샤르트뢰즈|Green Chartreuse|샤르트뢰즈,샤르트뢰즈 그린,chartreuse|liqueur|허브 리큐르|강한 허브,민트,감초
옐로 샤르트뢰즈|Yellow Chartreuse|샤르트뢰즈 옐로,yellow chartreuse|liqueur|허브 리큐르|꿀,사프란,허브
베네딕틴|Bénédictine D.O.M.|베네딕틴 돔,benedictine|liqueur|허브 리큐르|꿀,허브,향신료
드람뷔|Drambuie|드램뷰이,drambuie|liqueur|허브 리큐르|위스키,헤더 꿀,허브
갈리아노|Galliano L'Autentico|갈리아노 리큐르,galliano|liqueur|허브 리큐르|바닐라,아니스,허브
스트레가|Strega|strega|liqueur|허브 리큐르|사프란,민트,아니스
페르노|Pernod|pernod|liqueur|아니스 리큐르|아니스,감초,허브
리카르|Ricard Pastis|리카,ricard,pastis|liqueur|아니스 리큐르|아니스,감초,허브
삼부카 몰리나리|Molinari Sambuca|삼부카,sambuca|liqueur|아니스 리큐르|아니스,달콤함,강함
압생트 페르노|Pernod Absinthe|압생트,absinthe|liqueur|아니스 리큐르|쑥,아니스,펜넬
캄파리|Campari|campari|liqueur|비터 아페리티보|쓴 오렌지,허브,붉은 과일
아페롤|Aperol|aperol|liqueur|비터 아페리티보|오렌지,루바브,가벼운 쓴맛
셀렉트|Select Aperitivo|select|liqueur|비터 아페리티보|주니퍼,루바브,쓴맛
페르넷 브랑카|Fernet-Branca|페르넷,fernet|liqueur|아마로|민트,사프란,강한 쓴맛
아마로 몬테네그로|Amaro Montenegro|몬테네그로,montenegro|liqueur|아마로|오렌지 껍질,바닐라,장미
아베르나|Averna|averna|liqueur|아마로|캐러멜,감초,오렌지
아마로 노니노|Amaro Nonino Quintessentia|노니노,nonino|liqueur|아마로|오렌지,캐러멜,허브
시나르|Cynar|cynar,치나르|liqueur|아마로|아티초크,허브,캐러멜
라마조티|Ramazzotti Amaro|라마조티,ramazzotti|liqueur|아마로|오렌지,커피,허브
미도리|Midori|midori|liqueur|과일 리큐르|멜론,달콤함,초록색
체리 헤링|Heering Cherry Liqueur|체리헤링,heering|liqueur|과일 리큐르|체리,아몬드,향신료
룩사르도 마라스키노|Luxardo Maraschino|룩사르도,마라스키노,maraschino,luxardo|liqueur|과일 리큐르|체리씨,꽃,드라이한 단맛
샹보르|Chambord|chambord|liqueur|과일 리큐르|라즈베리,블랙베리,바닐라
르제 크렘 드 카시스|Lejay Crème de Cassis|카시스,크렘드카시스,cassis|liqueur|과일 리큐르|블랙커런트,진한 단맛
드카이퍼 피치트리|DeKuyper Peachtree|피치트리,피치 슈냅스,peachtree|liqueur|과일 리큐르|복숭아,달콤함
빌라 마사 리몬첼로|Villa Massa Limoncello|리몬첼로,limoncello|liqueur|과일 리큐르|레몬 껍질,달콤함,상큼함
사던 컴포트|Southern Comfort|서던컴포트,southern comfort|liqueur|과일 리큐르|복숭아,오렌지,향신료
생 제르맹|St-Germain|생제르망,st germain,엘더플라워|liqueur|꽃 리큐르|엘더플라워,배,자몽
로트만 앤 윈터 크렘 드 바이올렛|Rothman & Winter Crème de Violette|크렘드바이올렛,violette|liqueur|꽃 리큐르|제비꽃,베리,달콤함
핌스 No.1|Pimm's No.1|핌스,pimms|liqueur|진 베이스 리큐르|허브,오렌지,향신료
마티니 로쏘|Martini Rosso|마티니 로소,martini rosso|liqueur|스위트 베르무트|허브,캐러멜,쌉싸름
마티니 엑스트라 드라이|Martini Extra Dry|마티니 드라이,martini extra dry|liqueur|드라이 베르무트|허브,시트러스,드라이
친자노 로쏘|Cinzano Rosso|친자노,cinzano|liqueur|스위트 베르무트|허브,바닐라,달콤함
카르파노 안티카 포뮬러|Carpano Antica Formula|카르파노,carpano antica|liqueur|스위트 베르무트|바닐라,코코아,쌉싸름
돌린 드라이|Dolin Dry|돌린,dolin|liqueur|드라이 베르무트|허브,꽃,드라이
노일리 프랏|Noilly Prat Original Dry|노이 프라,noilly prat|liqueur|드라이 베르무트|허브,바다,드라이
코키 아메리카노|Cocchi Americano|코키,cocchi|liqueur|아페리티프 와인|키나 쓴맛,오렌지,꽃
릴레 블랑|Lillet Blanc|릴레,lillet|liqueur|아페리티프 와인|오렌지,꿀,꽃
티오 페페|Tio Pepe Fino|티오페페,tio pepe,피노 셰리|wine|셰리|짠맛,아몬드,드라이
참이슬 후레쉬|Chamisul Fresh|참이슬,참이슬후레쉬,chamisul|soju|희석식 소주|깔끔함,가벼움,부드러움
참이슬 오리지널|Chamisul Original|참이슬 빨간뚜껑,참이슬오리지널|soju|희석식 소주|쓴맛,묵직함,깔끔함
처음처럼|Chum Churum|처음처럼 소주,chum churum|soju|희석식 소주|부드러움,가벼움,깔끔함
진로|Jinro Is Back|진로이즈백,두꺼비 소주,jinro|soju|희석식 소주|부드러움,은은한 단맛
새로|Saero|새로 소주,saero|soju|희석식 소주|제로 슈거,부드러움,가벼움
좋은데이|Good Day|좋은데이 소주,good day|soju|희석식 소주|순함,가벼움,부드러움
대선|Daesun|대선 소주,c1|soju|희석식 소주|깔끔함,가벼움
한라산|Hallasan|한라산 소주,hallasan|soju|희석식 소주|깔끔함,제주 화산암반수,드라이
화요|Hwayo|화요 소주,hwayo|soju|증류식 소주|쌀,깔끔함,은은한 단맛
일품진로|Ilpum Jinro|일품 진로|soju|증류식 소주|쌀,오크,부드러움
안동소주|Andong Soju|안동 소주,andong soju|soju|증류식 소주|누룩,쌀,강함
문배주|Munbae-ju|문배술,munbaeju|soju|증류식 소주|문배 향,조,수수
려|Ryeo|려 소주,ryeo|soju|증류식 소주|고구마,쌀,은은한 단맛
자몽에이슬|Jinro Grapefruit|자몽 에이슬,자몽소주|soju|과일 소주|자몽,달콤함,가벼움
청포도에이슬|Jinro Green Grape|청포도 에이슬,청포도소주|soju|과일 소주|청포도,달콤함,가벼움
순하리 복숭아|Soonhari Peach|순하리,soonhari|soju|과일 소주|복숭아,달콤함,가벼움
장수 생막걸리|Jangsu Makgeolli|장수막걸리,서울장수,jangsu|makgeolli|생막걸리|탄산,새콤함,가벼움
지평 생막걸리|Jipyeong Makgeolli|지평막걸리,jipyeong|makgeolli|생막걸리|부드러움,은은한 단맛,탄산
국순당 생막걸리|Kooksoondang Makgeolli|국순당,kooksoondang|makgeolli|생막걸리|새콤함,탄산,부드러움
느린마을 막걸리|Neurinmaeul Makgeolli|느린마을,배상면주가|makgeolli|생막걸리|감미료 없음,쌀,크리미함
복순도가 손막걸리|Boksoon Doga Makgeolli|복순도가,boksoon doga|makgeolli|생막걸리|강한 천연 탄산,새콤함,샴페인 같은
해창 막걸리|Haechang Makgeolli|해창,haechang|makgeolli|생막걸리|진함,쌀,감미료 없음
백세주|Baekseju|백세주 약주,baekseju|makgeolli|약주/청주|구기자,허브,은은한 단맛
청하|Chungha|청하 청주,chungha|makgeolli|약주/청주|쌀,깔끔함,가벼운 단맛
보해 복분자주|Bohae Bokbunja|복분자주,복분자,bokbunja|wine|과실주|복분자,달콤함,베리
카스|Cass Fresh|카스 맥주,cass|beer|라거|가벼움,탄산,깔끔함
테라|Terra|테라 맥주,terra|beer|라거|탄산,깔끔함,가벼움
켈리|Kelly|켈리 맥주,kelly|beer|라거|부드러움,몰트,깔끔함
하이트|Hite Extra Cold|하이트 맥주,hite|beer|라거|가벼움,탄산,깔끔함
클라우드|Kloud|클라우드 맥주,kloud|beer|라거|몰트,풍부한 거품,부드러움
하이네켄|Heineken|하이네켄 맥주,heineken|beer|라거|가벼운 홉,깔끔함,약간의 과일
버드와이저|Budweiser|버드,budweiser|beer|라거|가벼움,쌀,깔끔함
코로나 엑스트라|Corona Extra|코로나,corona|beer|라거|가벼움,깔끔함,라임과 궁합
아사히 슈퍼 드라이|Asahi Super Dry|아사히,asahi|beer|라거|드라이,깔끔함,탄산
삿포로 프리미엄|Sapporo Premium|삿포로,sapporo|beer|라거|몰트,깔끔함,가벼운 홉
기린 이치방|Kirin Ichiban|기린,kirin|beer|라거|몰트,부드러움,깔끔함
칭따오|Tsingtao|칭다오,tsingtao|beer|라거|가벼움,쌀,깔끔함
스텔라 아르투아|Stella Artois|스텔라,stella artois|beer|라거|몰트,가벼운 홉,깔끔함
칼스버그|Carlsberg|칼스버그 맥주,carlsberg|beer|라거|가벼운 홉,깔끔함
필스너 우르켈|Pilsner Urquell|필스너우르켈,pilsner urquell|beer|라거|사츠 홉,몰트,쌉싸름
산 미겔|San Miguel Pale Pilsen|산미구엘,san miguel|beer|라거|가벼움,몰트,깔끔함
기네스 드래프트|Guinness Draught|기네스,guinness|beer|스타우트|볶은 보리,커피,크리미한 거품
호가든|Hoegaarden|호가든 맥주,hoegaarden|beer|밀맥주|오렌지 껍질,고수 씨앗,부드러움
블루문|Blue Moon Belgian White|블루 문,blue moon|beer|밀맥주|오렌지,고수 씨앗,부드러움
파울라너 헤페바이스|Paulaner Hefe-Weissbier|파울라너,paulaner|beer|밀맥주|바나나,정향,부드러움
바이엔슈테판 헤페바이스|Weihenstephaner Hefeweissbier|바이엔슈테판,weihenstephaner|beer|밀맥주|바나나,정향,크리미함
크로넨버그 1664 블랑|Kronenbourg 1664 Blanc|1664 블랑,1664 blanc,크로넨버그|beer|밀맥주|시트러스,꽃,달콤함
듀벨|Duvel|듀벨 맥주,duvel|beer|에일|배,후추,드라이,강함
시메이 블루|Chimay Blue|시메이,chimay|beer|에일|건포도,캐러멜,향신료
브루독 펑크 IPA|BrewDog Punk IPA|브루독,펑크ipa,brewdog|beer|에일|열대 과일,자몽,쌉싸름
구스 아일랜드 IPA|Goose Island IPA|구스아일랜드,goose island|beer|에일|자몽,솔,쌉싸름
라구니타스 IPA|Lagunitas IPA|라구니타스,lagunitas|beer|에일|자몽,솔,몰트
시에라 네바다 페일 에일|Sierra Nevada Pale Ale|시에라네바다,sierra nevada|beer|에일|캐스케이드 홉,솔,시트러스
제주 위트 에일|Jeju Wit Ale|제주맥주,제주 위트에일|beer|밀맥주|감귤 껍질,부드러움,꽃
밀러 제뉴인 드래프트|Miller Genuine Draft|밀러,miller|beer|라거|가벼움,깔끔함
쿠어스 라이트|Coors Light|쿠어스,coors|beer|라거|아주 가벼움,깔끔함
모엣 샹동 앙페리알|Moët & Chandon Impérial|모엣,모엣샹동,moet|wine|샴페인|청사과,브리오슈,시트러스
뵈브 클리코 옐로 라벨|Veuve Clicquot Yellow Label|뵈브클리코,veuve clicquot|wine|샴페인|피노 누아의 바디,배,브리오슈
돔 페리뇽|Dom Pérignon|돔페리뇽,dom perignon|wine|샴페인|토스트,흰 꽃,시트러스
라 마르카 프로세코|La Marca Prosecco|라마르카,la marca|wine|프로세코|청사과,복숭아,꽃
미오네토 프로세코|Mionetto Prosecco|미오네토,mionetto|wine|프로세코|사과,배,가벼움
프레시넷 코르돈 네그로|Freixenet Cordon Negro|프레시넷,freixenet,카바|wine|카바|시트러스,사과,드라이
몬테스 알파 카베르네 소비뇽|Montes Alpha Cabernet Sauvignon|몬테스,몬테스 알파,montes|wine|레드 와인|블랙커런트,오크,초콜릿
1865 카베르네 소비뇽|1865 Cabernet Sauvignon|1865 와인|wine|레드 와인|블랙베리,오크,묵직함
카시예로 델 디아블로|Casillero del Diablo|까시예로,casillero|wine|레드 와인|체리,자두,바닐라
옐로 테일 쉬라즈|Yellow Tail Shiraz|옐로테일,yellow tail|wine|레드 와인|자두,후추,부드러움
클라우디 베이 소비뇽 블랑|Cloudy Bay Sauvignon Blanc|클라우디베이,cloudy bay|wine|화이트 와인|패션프루트,라임,풀 향
빌라 엠|Villa M Bianco|빌라엠,villa m|wine|화이트 와인|모스카토,복숭아,달콤한 약발포
`;
const BRANDS=BRAND_RAW.trim().split("\n").map(l=>{const[ko,en,al,base,sub,notes]=l.split("|");return{ko,en,al:al?al.split(","):[],base,sub,notes:notes.split(",")}});
