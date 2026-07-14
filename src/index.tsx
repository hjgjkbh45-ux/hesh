import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()
app.use('/static/*', serveStatic({ root: './public' }))

const programs = [
  ['fa-cow','مشروع الأضاحي','فرحة تصل إلى البيوت المستحقة في المواسم والأعياد.','gold'],
  ['fa-bowl-food','إطعام الطعام','كراتين رمضان ووجبات ساخنة تحفظ كرامة الأسرة.','coral'],
  ['fa-heart-pulse','الدعم الصحي','دواء وعلاج وعمليات لمن أثقل المرض كاهلهم.','blue'],
  ['fa-book-quran','مسابقات القرآن','حلقات ومسابقات تغرس نور القرآن في قلوب الأطفال.','emerald'],
  ['fa-graduation-cap','الدعم التعليمي','مصروفات وأدوات ورعاية تفتح أبواب المستقبل.','violet'],
  ['fa-people-roof','مبادرات المجتمع','كسوة وهدايا ومبادرات تصنع مجتمعًا أكثر رحمة.','cyan'],
]

const campaigns = [
  {id:'medicine',cat:'صحة',title:'دواء كل شهر',text:'ساهم في توفير العلاج الشهري لمرضى لا يملكون ثمن الدواء.',raised:32000,goal:50000,icon:'fa-capsules',urgent:true},
  {id:'food',cat:'غذاء',title:'مائدة تكفي بيتًا',text:'كراتين غذائية متكاملة تكفي الأسرة وتصل إليها بكرامة.',raised:18500,goal:30000,icon:'fa-basket-shopping',urgent:false},
  {id:'school',cat:'تعليم',title:'حقيبة تفتح بابًا',text:'أدوات ومصروفات مدرسية تساعد طفلًا على استكمال تعليمه.',raised:12400,goal:25000,icon:'fa-school',urgent:false},
  {id:'surgery',cat:'صحة',title:'عملية تنقذ حياة',text:'مساهمة عاجلة في تكاليف العمليات للحالات غير القادرة.',raised:41000,goal:60000,icon:'fa-stethoscope',urgent:true},
  {id:'quran',cat:'قرآن',title:'جيل يحمل النور',text:'دعم حلقات التحفيظ والمسابقات وجوائز المتفوقين.',raised:9000,goal:20000,icon:'fa-book-open',urgent:false},
  {id:'eid',cat:'مجتمع',title:'كسوة وفرحة عيد',text:'ملابس جديدة وهدايا تجعل العيد أجمل في عيون الأطفال.',raised:15000,goal:22000,icon:'fa-gift',urgent:false},
]

const news = [
  ['دعم مستشفى كفر العنانية','الصحة','تجهيز عيادة الأنف والأذن وتحسين البنية الكهربائية لخدمة المرضى بأمان.','fa-hospital'],
  ['زيارة أوائل الطلبة في بيوتهم','التعليم','لحظات تقدير حقيقية تشجع أبناءنا وتشارك أسرهم فرحة النجاح.','fa-medal'],
  ['قافلة دفء إلى الأسر الأولى بالرعاية','المجتمع','متطوعونا يصلون بالمساعدات إلى البيوت في القرى الأكثر احتياجًا.','fa-hands-holding-child']
]

const routeNames: Record<string,string> = {
  '/about':'من نحن','/campaigns':'الحملات','/achievements':'الإنجازات','/success-stories':'قصص النجاح',
  '/events':'الفعاليات','/gallery':'معرض الصور','/donate':'تبرّع الآن','/volunteers':'التطوع','/careers':'الوظائف',
  '/news':'الأخبار','/transparency':'الشفافية المالية','/faq':'الأسئلة الشائعة','/contact':'تواصل معنا',
  '/login':'تسجيل الدخول','/profile':'حسابي','/dashboard':'لوحة التحكم'
}

const icon = (name:string) => <i class={`fa-solid ${name}`} aria-hidden="true"></i>

function Header(){
  return <>
    <header class="site-header" id="site-header">
      <a class="brand" href="/" aria-label="الرئيسية">
        <img src="/static/foundation-logo.png" alt="شعار مؤسسة الدكتور عمر هشام" />
        <span><b>مؤسسة الدكتور</b><strong>عمر هشام الخيرية</strong></span>
      </a>
      <nav class="desktop-nav" aria-label="التنقل الرئيسي">
        <a href="/">الرئيسية</a><a href="/about">من نحن</a><a href="/campaigns">الحملات</a><a href="/achievements">أثرنا</a><a href="/news">الأخبار</a><a href="/contact">تواصل</a>
      </nav>
      <div class="header-actions">
        <button class="icon-btn" id="theme-toggle" aria-label="تغيير المظهر">{icon('fa-moon')}</button>
        <button class="icon-btn menu-toggle" id="menu-toggle" aria-label="فتح القائمة">{icon('fa-bars-staggered')}</button>
        <a class="donate-pill magnetic" href="/donate"><span>تبرّع الآن</span>{icon('fa-heart')}</a>
      </div>
    </header>
    <aside class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
      <button id="menu-close" class="drawer-close" aria-label="إغلاق">{icon('fa-xmark')}</button>
      <p class="eyebrow">اصنع أثرًا يبقى</p>
      <nav>{Object.entries(routeNames).slice(0,13).map(([href,label])=><a href={href}>{label}<i class="fa-solid fa-arrow-left"></i></a>)}</nav>
    </aside>
    <div class="drawer-backdrop" id="drawer-backdrop"></div>
  </>
}

function Footer(){
  return <footer class="site-footer">
    <div class="footer-glow"></div>
    <section class="footer-main">
      <article class="footer-story">
        <img src="/static/foundation-logo.png" alt="" />
        <h2>الخير لا يغيب،<br/><em>بل يتحوّل إلى أثر.</em></h2>
        <p>مؤسسة إنسانية تعمل لتفريج الكرب، ودعم المرضى، ونشر العلم، وتعليم القرآن بروح من الإيمان والإحسان.</p>
        <span class="licensed">{icon('fa-shield-heart')} جهة مرخصة ومعتمدة</span>
      </article>
      <nav class="footer-links"><h3>اكتشف</h3><a href="/about">قصة عمر</a><a href="/campaigns">الحملات</a><a href="/achievements">الإنجازات</a><a href="/gallery">معرض الصور</a><a href="/faq">الأسئلة الشائعة</a></nav>
      <nav class="footer-links"><h3>شاركنا</h3><a href="/donate">تبرّع الآن</a><a href="/volunteers">كن متطوعًا</a><a href="/careers">الوظائف</a><a href="/transparency">الشفافية</a><a href="/contact">تواصل معنا</a></nav>
      <article class="newsletter"><p class="eyebrow">رسالة أثر</p><h3>خيرٌ صغير في بريدك،<br/>كل شهر.</h3><form class="ajax-form" data-endpoint="/api/newsletter"><label class="sr-only" for="newsletter-email">البريد الإلكتروني</label><div class="input-action"><input id="newsletter-email" name="email" type="email" placeholder="بريدك الإلكتروني" required/><button aria-label="اشتراك">{icon('fa-arrow-left')}</button></div></form><div class="socials"><a href="https://www.facebook.com/share/1Dj3HrELjY/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="صفحة المؤسسة على فيسبوك"><i class="fa-brands fa-facebook-f"></i></a><a href="https://www.instagram.com/dr.omarheshamfoundation?igsh=MWZiMXRjOTh2bm4zZA==" target="_blank" rel="noopener noreferrer" aria-label="حساب المؤسسة على إنستجرام"><i class="fa-brands fa-instagram"></i></a></div></article>
    </section>
    <div class="footer-bottom"><p>© 2026 مؤسسة الدكتور عمر هشام الخيرية</p><div class="footer-signature"><a class="developer-credit" href="https://peso-is-here.vercel.app" target="_blank" rel="noopener noreferrer" aria-label="Visit PESO website"><span class="credit-label">Developed by</span><span class="credit-brand"><strong>PESO</strong><i class="fa-solid fa-heart" aria-hidden="true"></i></span><span class="credit-arrow"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span></a></div></div>
  </footer>
}

function Layout({children,title='مؤسسة الدكتور عمر هشام الخيرية',description='عطاء مستمر لتنمية الإنسان والمجتمع'}:{children:any,title?:string,description?:string}){
  return <html lang="ar" dir="rtl"><head>
    <meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="description" content={description}/><meta name="theme-color" content="#f9f6ee"/><meta name="color-scheme" content="light dark"/>
    <meta property="og:title" content={title}/><meta property="og:description" content={description}/><meta property="og:image" content="/static/foundation-logo.png"/>
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
    <link href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Manrope:wght@400;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet"/>
    <link rel="icon" type="image/png" href="/static/foundation-logo.png"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/css/all.min.css"/>
    <link rel="stylesheet" href="/static/style.css"/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({'@context':'https://schema.org','@type':'NGO',name:'مؤسسة الدكتور عمر هشام الخيرية',url:'https://omarhesham.org',telephone:'+201060920249',address:'كفر العنانية، الدقهلية، مصر'})}}></script>
  </head><body>
    <div class="preloader" id="preloader"><div class="preloader-orbit"><img src="/static/foundation-logo.png" alt=""/><span></span></div><p>يبدأ الأثر من قلبٍ يؤمن بالخير</p></div>
    <div class="noise"></div><div class="cursor-dot" id="cursor-dot"></div><div class="cursor-ring" id="cursor-ring"></div>
    <Header/><main>{children}</main><Footer/>
    <button class="scroll-top" id="scroll-top" aria-label="إلى أعلى">{icon('fa-arrow-up')}</button>
    <div class="toast" id="toast" role="status" aria-live="polite" aria-atomic="true"><span class="toast-icon"><i class="fa-solid fa-check"></i></span><span class="toast-content"><strong>تم بنجاح</strong><span class="toast-message"></span></span><span class="toast-progress" aria-hidden="true"></span></div>
    <nav class="mobile-bottom" aria-label="تنقل سريع"><a href="/">{icon('fa-house')}<span>الرئيسية</span></a><a href="/campaigns">{icon('fa-seedling')}<span>الحملات</span></a><a class="bottom-donate" href="/donate">{icon('fa-heart')}<span>تبرّع</span></a><a href="/volunteers">{icon('fa-hand-holding-hand')}<span>تطوع</span></a><a href="/contact">{icon('fa-comment-dots')}<span>تواصل</span></a></nav>
    <script src="/static/app.js"></script>
  </body></html>
}

function SectionHead({kicker,title,text}:{kicker:string,title:string,text?:string}){
  return <header class="section-head reveal"><p class="eyebrow"><span></span>{kicker}</p><h2 dangerouslySetInnerHTML={{__html:title}}></h2>{text&&<p class="section-copy">{text}</p>}</header>
}

function CampaignCard({c}:{c:typeof campaigns[number]}){
  const progress=Math.round(c.raised/c.goal*100)
  return <article class="campaign-card reveal tilt-card">
    <div class="campaign-visual"><span class="visual-orb"></span>{icon(c.icon)}<b>{c.cat}</b>{c.urgent&&<em>عاجل</em>}</div>
    <div class="campaign-body"><h3>{c.title}</h3><p>{c.text}</p><div class="progress-meta"><strong>{c.raised.toLocaleString('ar-EG')} ج.م</strong><span>من {c.goal.toLocaleString('ar-EG')} ج.م</span></div><div class="progress-track"><i style={`width:${progress}%`}></i></div><a href={`/campaigns/${c.id}`}>اكتشف الحملة <i class="fa-solid fa-arrow-left"></i></a></div>
  </article>
}

function Home(){ return <Layout>
  <section class="hero" id="hero-section">
    <div class="hero-pattern"></div><div class="hero-halo halo-one"></div><div class="hero-halo halo-two"></div>
    <div class="hero-copy reveal"><div class="hero-badge"><span></span>صدقة جارية على روح الدكتور عمر هشام</div><h1>حين يرحلُ الجسد،<br/><em>يبقى الخيرُ حيًّا.</em></h1><p>نُكمل حلم طبيبٍ شاب أراد أن يداوي الناس، فنحوّل عطاءكم إلى دواءٍ وأملٍ وعلمٍ يصل إلى من يستحق.</p><div class="hero-actions"><a class="primary-btn magnetic" href="/donate">ابدأ أثرًا الآن {icon('fa-arrow-left')}</a><a class="story-link" href="/about"><i class="fa-solid fa-play"></i><span><small>اكتشف</small>حكاية عمر</span></a></div><div class="trust-row"><span>{icon('fa-circle-check')} جهة رسمية مرخصة</span><span>{icon('fa-location-dot')} كفر العنانية، الدقهلية</span></div></div>
    <div class="hero-art reveal">
      <div class="orbit orbit-a"><i></i><span>{icon('fa-heart-pulse')}</span></div><div class="orbit orbit-b"><i></i><span>{icon('fa-book-open')}</span></div>
      <div class="logo-sanctuary"><div class="arch"></div><img src="/static/foundation-logo.png" alt="مؤسسة الدكتور عمر هشام الخيرية"/><span class="spark s1">✦</span><span class="spark s2">✦</span><span class="spark s3">✦</span></div>
      <div class="floating-note"><i class="fa-solid fa-infinity"></i><span><small>عطاء</small>لا ينقطع</span></div>
    </div>
    <a href="#impact" class="scroll-cue"><span>اكتشف الأثر</span><i></i></a>
  </section>

  <section class="impact-ribbon" id="impact"><div><b class="counter" data-target="50">0</b><span>أسرة وصل إليها الدعم</span></div><i></i><div><b class="counter" data-target="80000">0</b><span>جنيه دعم مباشر</span></div><i></i><div><b>6</b><span>مسارات لصناعة الخير</span></div><i></i><div><b>∞</b><span>أثر نرجو ألا ينقطع</span></div></section>

  <section class="story-section section-pad">
    <div class="story-portrait reveal"><div class="portrait-frame"><img src="/static/omar-portrait.jpg" alt="الدكتور عمر هشام"/><span class="portrait-shine"></span></div><div class="portrait-caption"><i class="fa-solid fa-stethoscope"></i><p>كان يحلم<br/><strong>أن يداوي الناس</strong></p></div><span class="year-mark">رحمه الله</span></div>
    <article class="story-copy reveal"><p class="eyebrow"><span></span>الحكاية التي بدأت منها الرحلة</p><h2>حلمُ طبيبٍ شاب،<br/>صار <em>مؤسسةً للرحمة.</em></h2><blockquote>«عمر لم يكن مجرد ابن، كان طالب طب نابغًا يحلم بعلاج الناس… فأردتُ أن يستمر حلمه وألا ينقطع عمله الصالح.»</blockquote><p>أسّس المهندس هشام صبري هذه المؤسسة كصدقة جارية على روح ابنه، لتبقى يده ممتدة إلى كل مريض ومحتاج.</p><a class="text-arrow" href="/about">اقرأ الحكاية كاملة <i class="fa-solid fa-arrow-left-long"></i></a></article>
  </section>

  <section class="programs section-pad">
    <SectionHead kicker="مساحات العطاء" title={'ستةُ أبواب،<br/><em>ووجهةٌ واحدة: الإنسان.</em>'} text="نصل إلى الإنسان في صحته وتعليمه وغذائه وروحه؛ لأن التنمية الحقيقية لا تترك جانبًا من الحياة خلفها."/>
    <div class="program-grid">{programs.map((p,i)=><article class={`program-card reveal tone-${p[3]}`} style={`--delay:${i*70}ms`}><span class="program-index">0{i+1}</span><div class="program-icon">{icon(p[0])}</div><h3>{p[1]}</h3><p>{p[2]}</p><a href="/achievements" aria-label={`اعرف المزيد عن ${p[1]}`}><i class="fa-solid fa-arrow-left"></i></a></article>)}</div>
  </section>

  <section class="verse-break"><div class="verse-stars"></div><p class="reveal">﴿ مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ ﴾</p><span>البقرة — ٢٦١</span></section>

  <section class="campaigns-preview section-pad">
    <div class="head-row"><SectionHead kicker="الأثر ينتظرك" title={'اختر القصة التي<br/><em>تريد أن تغيّر نهايتها.</em>'}/><a class="outline-btn" href="/campaigns">كل الحملات {icon('fa-arrow-left')}</a></div>
    <div class="campaign-grid">{campaigns.slice(0,3).map(c=><CampaignCard c={c}/>)}</div>
  </section>

  <section class="process section-pad"><div class="process-bg-word">أثر</div><SectionHead kicker="من يدك إلى مستحقه" title={'طريقٌ واضح،<br/><em>وأمانةٌ محفوظة.</em>'}/><div class="steps">{[['fa-hand-holding-heart','تتبرّع','اختر المسار والمبلغ الذي يناسبك.'],['fa-magnifying-glass-chart','نبحث','ندرس الحالات ميدانيًا بعناية.'],['fa-box-open','نُوصل','نقدم الدعم بكرامة وخصوصية.'],['fa-chart-line','نُوثّق','نشاركك أين وكيف صُنع الأثر.']].map((s,i)=><article class="step reveal"><span>0{i+1}</span><div>{icon(s[0])}</div><h3>{s[1]}</h3><p>{s[2]}</p>{i<3&&<i class="step-line"></i>}</article>)}</div></section>

  <section class="quote-section section-pad"><div class="quote-mark">“</div><blockquote class="reveal">لسنا نمنحُ الناس مساعدةً عابرة،<br/>بل نقول لهم: <em>أنتم لستم وحدكم.</em></blockquote><div class="quote-person"><span>هـ ص</span><p><b>المهندس هشام صبري</b><small>المؤسس ورئيس مجلس الإدارة</small></p></div></section>

  <section class="news-section section-pad"><div class="head-row"><SectionHead kicker="يوميات الرحمة" title={'أخبارٌ لا تُقرأ فقط،<br/><em>بل تُشعرك أن الخير قريب.</em>'}/><a class="text-arrow" href="/news">كل الأخبار <i class="fa-solid fa-arrow-left-long"></i></a></div><div class="news-grid">{news.map((n,i)=><article class={`news-card reveal ${i===0?'featured':''}`}><div class="news-art">{icon(n[3])}<span>{n[1]}</span></div><div><time>١٢ يوليو ٢٠٢٦</time><h3>{n[0]}</h3><p>{n[2]}</p><a href="/news">اقرأ القصة <i class="fa-solid fa-arrow-left"></i></a></div></article>)}</div></section>

  <section class="final-cta"><div class="cta-rays"></div><img src="/static/foundation-logo.png" alt=""/><p class="eyebrow">قد تكون أنت الإجابة عن دعاء شخصٍ ما</p><h2>ازرع خيرًا اليوم،<br/><em>ودعه يُزهر إلى الأبد.</em></h2><div><a class="light-btn magnetic" href="/donate">تبرّع الآن {icon('fa-heart')}</a><a href="/volunteers">أو شارك بوقتك <i class="fa-solid fa-arrow-left"></i></a></div></section>
</Layout> }

function PageHero({kicker,title,text}:{kicker:string,title:string,text:string}){return <section class="page-hero"><div class="page-orb"></div><p class="eyebrow reveal"><span></span>{kicker}</p><h1 class="reveal" dangerouslySetInnerHTML={{__html:title}}></h1><p class="reveal">{text}</p><div class="breadcrumb"><a href="/">الرئيسية</a><i class="fa-solid fa-chevron-left"></i><span>{kicker}</span></div></section>}

function About(){return <Layout title="من نحن | مؤسسة الدكتور عمر هشام"><PageHero kicker="من نحن" title={'من الفقد وُلد نورٌ،<br/><em>ومن الحلم وُلد أثر.</em>'} text="حكاية إنسان لم يتوقف حلمه برحيله، بل صار بابًا للخير يدخل منه الجميع."/><section class="about-memorial section-pad"><div class="memorial-image reveal"><img src="/static/omar-portrait.jpg" alt="الدكتور عمر هشام"/><div class="image-prayer">رحمه الله رحمةً واسعة</div></div><article class="memorial-text reveal"><p class="eyebrow"><span></span>صدقة جارية</p><h2>كان عمر يحلمُ بالشفاء،<br/>فنحن نُكمل الحلم.</h2><p>في ذاكرة كل من عرفه، بقي الدكتور عمر هشام شابًا طموحًا، بشوشًا، يحمل حلم الطب ورسالة الرحمة. وحين اختاره الله، قرر والده المهندس هشام صبري أن يتحوّل الحزن إلى يدٍ تمتد لكل محتاج.</p><blockquote>«ليحمل اسمُه رسالة نشر الخير والرحمة والإحسان بين الناس.»</blockquote></article></section><section class="sacred-section"><div class="sacred-pattern"></div><p class="eyebrow">دعاءٌ يصل إلى السماء</p><h2>اللهم اغفر له وارحمه، وعافه واعف عنه،<br/>وأكرم نزله، ووسّع مدخله.</h2><div class="fatiha"><h3>الفاتحة</h3><p>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ <span class="ayah-number">١</span><br/>الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ <span class="ayah-number">٢</span> الرَّحْمَنِ الرَّحِيمِ <span class="ayah-number">٣</span> مَالِكِ يَوْمِ الدِّينِ <span class="ayah-number">٤</span> إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ <span class="ayah-number">٥</span> اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ <span class="ayah-number">٦</span> صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ <span class="ayah-number">٧</span></p></div><button class="light-btn toast-trigger" data-message="جزاك الله خيرًا، تقبّل الله دعاءك ورحم حبيبنا وأسكنه فسيح جناته">قرأتُ الفاتحة وأهديتُه الرحمة {icon('fa-heart')}</button></section><section class="values section-pad"><SectionHead kicker="ما نؤمن به" title={'قيمٌ لا نكتبها على الجدران،<br/><em>بل نمارسها كل يوم.</em>'}/><div class="value-grid">{[['الإخلاص','كل ما نقدمه خالصًا لوجه الله.'],['الشفافية','وضوحٌ وأمانة في كل خطوة.'],['المسؤولية','أثر حقيقي ومستدام في المجتمع.'],['الرحمة','نقف بجوار المحتاج بلطف وكرامة.'],['الشراكة','معًا يصبح أثر الخير أكبر.']].map((v,i)=><article class="value-card reveal"><span>0{i+1}</span><h3>{v[0]}</h3><p>{v[1]}</p></article>)}</div></section></Layout>}

function Campaigns(){return <Layout title="الحملات | مؤسسة الدكتور عمر هشام"><PageHero kicker="حملاتنا" title={'كل حملةٍ باب،<br/><em>وكل تبرّع حياة.</em>'} text="اختر المجال الأقرب إلى قلبك، واترك لنا مسؤولية أن يصل عطاؤك بكرامة وأمانة."/><section class="listing-section section-pad"><div class="filter-row" data-filter-group><button class="active" data-filter="all">الكل</button><button data-filter="صحة">الصحة</button><button data-filter="غذاء">الغذاء</button><button data-filter="تعليم">التعليم</button><button data-filter="قرآن">القرآن</button><button data-filter="مجتمع">المجتمع</button></div><div class="campaign-grid all-campaigns">{campaigns.map(c=><div data-category={c.cat}><CampaignCard c={c}/></div>)}</div></section></Layout>}

function CampaignDetail({id}:{id:string}){const c=campaigns.find(x=>x.id===id)||campaigns[0]; const progress=Math.round(c.raised/c.goal*100);return <Layout title={`${c.title} | مؤسسة الدكتور عمر هشام`}><section class="detail-hero"><a href="/campaigns" class="back-link">{icon('fa-arrow-right')} كل الحملات</a><div class="detail-icon">{icon(c.icon)}</div><span class="category-chip">{c.cat}</span><h1>{c.title}</h1><p>{c.text} مساهمتك، مهما كانت، تقترب بنا من إنسان ينتظر باب الفرج.</p><div class="detail-progress"><div><strong>{c.raised.toLocaleString('ar-EG')} ج.م</strong><span>تم جمعها من {c.goal.toLocaleString('ar-EG')} ج.م</span></div><b>{progress}%</b><div class="progress-track"><i style={`width:${progress}%`}></i></div></div><a class="primary-btn" href="/donate">ساهم في الحملة {icon('fa-heart')}</a></section></Layout>}

function Donate(){return <Layout title="تبرّع الآن | مؤسسة الدكتور عمر هشام"><PageHero kicker="تبرّع الآن" title={'عطاؤك اليوم،<br/><em>قد يغيّر غدًا كاملًا.</em>'} text="اختر الطريقة الأنسب لك. كل بيانات التحويل أمامك بوضوح، وكل مساهمة موثّقة بأمانة."/><section class="donate-layout section-pad"><div class="donation-journey reveal"><p class="eyebrow"><span></span>حدد مساهمتك</p><h2>كم تريد أن تزرع من الخير؟</h2><form class="donation-form ajax-form" data-endpoint="/api/donations/add"><div class="amount-picks"><button type="button" data-amount="100">١٠٠</button><button type="button" class="active" data-amount="500">٥٠٠</button><button type="button" data-amount="1000">١٬٠٠٠</button><button type="button" data-amount="5000">٥٬٠٠٠</button></div><label>مبلغ التبرّع <span>بالجنيه المصري</span><input type="number" name="amount" id="amount-input" value="500" min="1" required/></label><div class="form-grid"><label>الاسم الكريم<input name="name" required placeholder="الاسم بالكامل"/></label><label>رقم الهاتف<input name="phone" required inputmode="tel" placeholder="01xxxxxxxxx"/></label></div><label>البريد الإلكتروني <span>اختياري</span><input type="email" name="email" placeholder="name@example.com"/></label><fieldset><legend>طريقة التحويل</legend><label class="method-option"><input type="radio" name="method" value="instapay" checked/><span>{icon('fa-building-columns')}<b>إنستاباي / تحويل بنكي</b><small>البنك الزراعي المصري</small></span></label><label class="method-option"><input type="radio" name="method" value="vodafone"/><span><i class="fa-solid fa-mobile-screen-button"></i><b>فودافون كاش</b><small>تحويل فوري من هاتفك</small></span></label><label class="method-option"><input type="radio" name="method" value="cash"/><span>{icon('fa-money-bill-wave')}<b>دفع نقدي مباشر</b><small>مع إيصال موثّق</small></span></label></fieldset><button class="primary-btn submit-btn" type="submit">تسجيل مساهمتي {icon('fa-arrow-left')}</button><p class="privacy-note">{icon('fa-lock')} بياناتك محفوظة ولا نشاركها مع أي طرف.</p></form></div><aside class="payment-panel reveal"><p class="eyebrow">بيانات التحويل</p><h2>انسخ. حوّل.<br/>وأرسل الأثر.</h2><article class="account-card bank"><div>{icon('fa-building-columns')}<span><small>البنك الزراعي المصري</small><b>حساب المؤسسة</b></span></div><strong dir="ltr">10010397596901014</strong><button class="copy-btn" data-copy="10010397596901014">{icon('fa-copy')} نسخ رقم الحساب</button></article><article class="account-card phone"><div>{icon('fa-mobile-screen')}<span><small>إنستاباي أو فودافون كاش</small><b>تحويل عبر الهاتف</b></span></div><strong dir="ltr">01060920249</strong><button class="copy-btn" data-copy="01060920249">{icon('fa-copy')} نسخ الرقم</button></article><article class="voucher-card"><span>{icon('fa-cow')}</span><div><small>صك الأضحية</small><h3>شارك في فرحة الموسم</h3><p><b>٥٠٠ ج.م</b> صك خيري <i></i> <b>١١٬٠٠٠ ج.م</b> أضحية كاملة</p></div></article></aside></section></Layout>}

function Achievements(){return <Layout title="الإنجازات | مؤسسة الدكتور عمر هشام"><PageHero kicker="أثرنا بالأرقام" title={'لا نعدُ بالكثير،<br/><em>نُريك ما تحقق.</em>'} text="الشفافية عندنا ليست صفحة؛ إنها الطريقة التي نعمل بها ونحفظ بها أمانة كل متبرع."/><section class="metrics-showcase section-pad"><article><span>أكثر من</span><b>٥٠</b><p>أسرة حصلت على دعم مباشر</p></article><article><span>إجمالي</span><b>٨٠ ألف</b><p>جنيه تم توجيهها للمستحقين</p></article><article><span>دعم الأسر</span><b>٦٠ ألف</b><p>جنيه لـ ٥٠ أسرة أولى بالرعاية</p></article><article><span>دعم المرضى</span><b>٢٠ ألف</b><p>جنيه علاج ومساعدات طبية</p></article></section><section class="achievement-tracks section-pad"><SectionHead kicker="ما وراء الأرقام" title={'أعمالٌ تلمس<br/><em>كل جانب من الحياة.</em>'}/><div class="track-grid">{[['fa-heart-pulse','الصحة','عيادة أنف وأذن، تطوير كهرباء المستشفى، دواء شهري، دعم مرضى السرطان، ومساهمات في العمليات.'],['fa-graduation-cap','التعليم','ماكينات تصوير للمدارس، تكريم المتفوقين، مصروفات وأدوات ومتابعة طوال العام.'],['fa-book-quran','القرآن','حلقات للأطفال بمناهج مناسبة، معلمون مؤهلون، مسابقات في الحفظ والتجويد وجوائز قيّمة.'],['fa-bowl-rice','الغذاء والأسرة','لحوم طازجة، كراتين رمضان، كسوة عيد، ووجبات ساخنة تصل إلى البيوت بكرامة.']].map(t=><article class="track-card reveal"><div>{icon(t[0])}</div><h3>{t[1]}</h3><p>{t[2]}</p></article>)}</div></section></Layout>}

function Volunteers(){const roles=[['fa-people-carry-box','تطوع ميداني'],['fa-user-doctor','تطوع طبي'],['fa-laptop-code','تطوع رقمي'],['fa-chalkboard-user','تطوع تعليمي'],['fa-bullhorn','توعية وحملات'],['fa-people-roof','رعاية أسر']];return <Layout title="تطوع معنا | مؤسسة الدكتور عمر هشام"><PageHero kicker="كن جزءًا من الحكاية" title={'قد لا تتبرع بالمال،<br/><em>لكن وقتك ثروة.</em>'} text="موهبتك، خبرتك، أو حتى ساعتان من يومك قد تصنع فرقًا حقيقيًا في حياة إنسان."/><section class="roles section-pad"><div class="role-grid">{roles.map(r=><article class="role-card reveal">{icon(r[0])}<h3>{r[1]}</h3><p>شارك بمهارتك ضمن فريق يؤمن أن العمل المنظم والرحيم يصنع أثرًا أكبر.</p></article>)}</div><form class="application-form ajax-form reveal" data-endpoint="/api/volunteers"><p class="eyebrow">طلب انضمام</p><h2>أخبرنا كيف تحب أن تساعد.</h2><div class="form-grid"><label>الاسم<input name="name" required/></label><label>العمر<input name="age" type="number" min="16"/></label><label>الهاتف<input name="phone" required/></label><label>المدينة<input name="city"/></label><label>المجال المفضل<select name="role">{roles.map(r=><option>{r[1]}</option>)}</select></label><label>مهاراتك<input name="skills"/></label></div><button class="primary-btn">أرسل طلبي {icon('fa-arrow-left')}</button></form></section></Layout>}

function News(){return <Layout title="الأخبار | مؤسسة الدكتور عمر هشام"><PageHero kicker="يوميات الأثر" title={'كل خبر هنا،<br/><em>وراءه قلبٌ ابتسم.</em>'} text="تابع أنشطتنا ومبادراتنا، وشاهد كيف يتحول العطاء إلى قصص حقيقية على الأرض."/><section class="listing-section section-pad"><div class="news-grid news-all">{[...news,...news].map((n,i)=><article class={`news-card reveal ${i===0?'featured':''}`}><div class="news-art">{icon(n[3])}<span>{n[1]}</span></div><div><time>١٢ يوليو ٢٠٢٦</time><h3>{n[0]}</h3><p>{n[2]}</p><a href="#">اقرأ القصة <i class="fa-solid fa-arrow-left"></i></a></div></article>)}</div></section></Layout>}

function FAQ(){const qs=[['كيف يمكنني التبرع للمؤسسة؟','يمكنك التبرع عبر إنستاباي بتحويل بنكي إلى البنك الزراعي المصري، حساب 10010397596901014، أو عبر إنستاباي/فودافون كاش على 01060920249، أو التبرع النقدي المباشر بالتنسيق مع الأستاذ جمال عبد الخالق.'],['ما مجالات عمل المؤسسة؟','نعمل في الدعم الصحي، وتوزيع الغذاء، ودعم التعليم، ومسابقات القرآن، والمشروعات الإنتاجية، وقنوات الزكاة والصدقة، والمشروعات المجتمعية.'],['أين يقع مقر المؤسسة؟','يقع مقر المؤسسة في كفر العنانية، محافظة الدقهلية، جمهورية مصر العربية.'],['هل المؤسسة مرخصة رسميًا؟','نعم، المؤسسة مسجلة ومرخصة لدى الجهات المختصة وتعمل بكامل الشفافية.'],['ما سعر صك الأضحية؟','الصك الخيري: 500 جنيه، والأضحية الكاملة: 11,000 جنيه. تقبل الله منا ومنكم.'],['كيف أتأكد من وصول تبرعي؟','نلتزم بأعلى معايير الشفافية، وننشر تقارير الإنفاق والإنجازات باستمرار على منصتنا.']];return <Layout title="الأسئلة الشائعة | مؤسسة الدكتور عمر هشام"><PageHero kicker="أسئلة شائعة" title={'الوضوح أولُ<br/><em>خطوات الثقة.</em>'} text="جمعنا أكثر الأسئلة التي تصلنا. وإن لم تجد إجابتك، نحن على بُعد رسالة."/><section class="faq-list section-pad">{qs.map((q,i)=><details class="faq-item reveal" open={i===0}><summary><span>0{i+1}</span><h3>{q[0]}</h3><i class="fa-solid fa-plus"></i></summary><p>{q[1]}</p></details>)}</section></Layout>}

function Contact(){return <Layout title="تواصل معنا | مؤسسة الدكتور عمر هشام"><PageHero kicker="نحن قريبون" title={'رسالتك تصلُ<br/><em>إلى قلبٍ يسمع.</em>'} text="لا تتردد في السؤال أو الاقتراح أو طلب الشراكة. نحن هنا لخدمتكم."/><section class="contact-layout section-pad"><aside class="contact-info reveal"><p class="eyebrow">بيانات التواصل</p><h2>بابنا مفتوح،<br/>وقلوبنا كذلك.</h2><a href="tel:01060920249">{icon('fa-phone')}<span><small>اتصل بنا</small><b dir="ltr">01060920249</b></span></a><a href="mailto:info@omarhesham.org">{icon('fa-envelope')}<span><small>راسلنا</small><b>info@omarhesham.org</b></span></a><div>{icon('fa-location-dot')}<span><small>تفضل بزيارتنا</small><b>كفر العنانية، الدقهلية، مصر</b></span></div><div>{icon('fa-clock')}<span><small>مواعيد العمل</small><b>متاحون لخدمتكم — الجمعة إجازة</b></span></div></aside><form class="contact-form ajax-form reveal" data-endpoint="/api/contacts"><div class="form-grid"><label>الاسم<input name="name" required/></label><label>البريد الإلكتروني<input name="email" type="email" required/></label><label>الهاتف<input name="phone"/></label><label>الموضوع<select name="subject"><option>استفسار عام</option><option>شراكة</option><option>شكوى أو اقتراح</option><option>إعلام وصحافة</option></select></label></div><label>رسالتك<textarea name="message" rows={6} required placeholder="اكتب رسالتك هنا..."></textarea></label><button class="primary-btn">إرسال الرسالة {icon('fa-paper-plane')}</button></form></section></Layout>}

function Transparency(){return <Layout title="الشفافية المالية | مؤسسة الدكتور عمر هشام"><PageHero kicker="الشفافية المالية" title={'كل جنيهٍ أمانة،<br/><em>وكل خطوة موثّقة.</em>'} text="ثقتكم هي رأس مالنا الحقيقي؛ لذلك نلتزم بالوضوح من لحظة استلام التبرع حتى وصوله."/><section class="methodology section-pad">{[['fa-file-shield','توثيق التبرعات','نسجّل كل مساهمة ونربطها بالمسار الذي اختاره المتبرع.'],['fa-magnifying-glass-chart','مراجعة داخلية','مراجعة دورية للمصروفات والمستندات وحالات الاستحقاق.'],['fa-scale-balanced','إنفاق مسؤول','توجيه الموارد للأولوية والأكثر أثرًا مع تقليل التكلفة التشغيلية.']].map((m,i)=><article class="method-card reveal"><span>0{i+1}</span>{icon(m[0])}<h3>{m[1]}</h3><p>{m[2]}</p></article>)}</section><section class="promise section-pad"><p class="eyebrow">وعدنا للمتبرع</p><h2>لن نطلب ثقتك فقط،<br/><em>سنستحقّها كل يوم.</em></h2><p>نعمل على إصدار تقارير دورية أكثر تفصيلًا تشمل أبواب الصرف، أعداد المستفيدين، ونسب الإنجاز في كل حملة.</p></section></Layout>}

function Gallery(){return <Layout title="معرض الصور | مؤسسة الدكتور عمر هشام"><PageHero kicker="معرض الصور" title={'وجوهٌ ومواقف،<br/><em>تقول ما لا تقوله الأرقام.</em>'} text="لقطات من الميدان، صُنعت فيها الفرحة بأيدي المتطوعين وقلوب المتبرعين."/><section class="gallery-grid section-pad">{programs.concat(programs.slice(0,2)).map((p,i)=><article class={`gallery-tile tile-${i+1} reveal`}><div class={`gallery-art tone-${p[3]}`}>{icon(p[0])}<span>لحظة أثر</span></div><p>{p[1]}<small>كفر العنانية</small></p></article>)}</section></Layout>}

function Events(){return <Layout title="الفعاليات | مؤسسة الدكتور عمر هشام"><PageHero kicker="الفعاليات" title={'نلتقي على الخير،<br/><em>فتكبر الدائرة.</em>'} text="مواعيد قادمة ومساحات مفتوحة للمشاركة وصناعة الأثر معًا."/><section class="event-list section-pad">{[['٢٨','يوليو','قافلة طبية شاملة','مستشفى كفر العنانية','صحة'],['١٥','أغسطس','تكريم أوائل الطلبة','قاعة المؤسسة','تعليم'],['٠٥','سبتمبر','يوم المتطوعين المفتوح','كفر العنانية','مجتمع']].map(e=><article class="event-card reveal"><time><b>{e[0]}</b><span>{e[1]}</span></time><div><span class="category-chip">{e[4]}</span><h3>{e[2]}</h3><p>{icon('fa-location-dot')} {e[3]}</p></div><a href="#">التفاصيل {icon('fa-arrow-left')}</a></article>)}</section></Layout>}

function Stories(){return <Layout title="قصص النجاح | مؤسسة الدكتور عمر هشام"><PageHero kicker="قصص النجاح" title={'أثرٌ يُحكى،<br/><em>وأملٌ ينتقل.</em>'} text="نحفظ خصوصية المستفيدين، ونشارك كلماتهم التي تذكّرنا جميعًا بأن الخير يصل."/><section class="stories-grid section-pad">{[['أم محمد','إحدى المستفيدات','لم تكن المساعدة مجرد دواء؛ كانت رسالة تقول إننا لسنا وحدنا. جزاكم الله عنا كل خير.'],['والد طالبة','من برنامج التعليم','حين جاءت المؤسسة لتكريم ابنتي في بيتنا، شعرتُ أن تعبها وتعبنا لم يذهب سدى.'],['متطوع ميداني','فريق المؤسسة','دخلتُ لأساعد الآخرين، فوجدت أن التطوع غيّرني أنا أيضًا، وعلّمني معنى النعمة.']].map((s,i)=><article class="story-card reveal"><div class="stars">★★★★★</div><blockquote>“{s[2]}”</blockquote><div><span>{s[0].slice(0,2)}</span><p><b>{s[0]}</b><small>{s[1]}</small></p></div></article>)}</section></Layout>}

function Careers(){return <Layout title="الوظائف | مؤسسة الدكتور عمر هشام"><PageHero kicker="العمل معنا" title={'وظيفةٌ ذات معنى،<br/><em>ومكانٌ ينمو بك.</em>'} text="لا توجد وظائف شاغرة حاليًا، لكننا نرحب دائمًا بأصحاب الشغف والخبرة للانضمام إلى شبكة مواهبنا."/><section class="empty-state section-pad"><div>{icon('fa-briefcase')}<span></span></div><h2>لا توجد فرص مفتوحة الآن</h2><p>اترك لنا بياناتك وسنتواصل معك عندما تظهر فرصة تناسب خبرتك.</p><a class="primary-btn" href="/contact">أرسل سيرتك الذاتية {icon('fa-arrow-left')}</a></section></Layout>}

function Login(){return <Layout title="تسجيل الدخول | مؤسسة الدكتور عمر هشام"><section class="auth-page"><div class="auth-story"><img src="/static/foundation-logo.png" alt=""/><p class="eyebrow">مساحتك الخاصة</p><h1>تابع أثر عطائك،<br/><em>خطوةً بخطوة.</em></h1><p>سجّل الدخول لمتابعة تبرعاتك وحالة طلب التطوع وتحديث بياناتك.</p></div><form class="auth-form ajax-form" data-endpoint="/api/auth/login"><h2>مرحبًا بعودتك</h2><p>أدخل بياناتك للوصول إلى حسابك.</p><label>البريد الإلكتروني<input type="email" name="email" required/></label><label>كلمة المرور<input type="password" name="password" required/></label><button class="primary-btn">تسجيل الدخول {icon('fa-arrow-left')}</button><span>ليس لديك حساب؟ <a href="#">أنشئ حسابًا جديدًا</a></span></form></section></Layout>}

function Dashboard(){return <Layout title="لوحة التحكم | مؤسسة الدكتور عمر هشام"><section class="dashboard-wrap"><aside class="dash-sidebar"><div class="dash-brand"><img src="/static/foundation-logo.png"/><span>لوحة الأثر</span></div>{[['fa-chart-pie','نظرة عامة'],['fa-bullseye','الحملات'],['fa-hand-holding-dollar','التبرعات'],['fa-people-group','المتطوعون'],['fa-envelope','الرسائل'],['fa-newspaper','الأخبار'],['fa-calendar','الفعاليات']].map((n,i)=><a class={i===0?'active':''} href="#">{icon(n[0])}<span>{n[1]}</span>{i===4&&<b>6</b>}</a>)}</aside><div class="dash-main"><header><div><p>الأحد، ١٢ يوليو</p><h1>صباح الخير، هشام</h1></div><button class="icon-btn">{icon('fa-bell')}</button></header><div class="kpi-grid">{[['إجمالي التبرعات','٨٠٬٠٠٠ ج.م','+18%','fa-hand-holding-heart'],['الحملات النشطة','٦','+2','fa-bullseye'],['المتبرعون','١٤٨','+12%','fa-users'],['طلبات التطوع','٢٤','8 جديدة','fa-people-group']].map(k=><article><div>{icon(k[3])}</div><p>{k[0]}</p><b>{k[1]}</b><span>{k[2]}</span></article>)}</div><section class="chart-panel"><div><p>نمو التبرعات</p><h3>آخر ١٢ شهرًا</h3></div><div class="fake-chart">{[30,45,38,62,50,72,56,84,66,92,78,100].map((h,i)=><i style={`--h:${h}%`}><span>{i+1}</span></i>)}</div></section><section class="dash-table"><header><h3>أحدث التبرعات</h3><a href="#">عرض الكل</a></header><table><thead><tr><th>المتبرع</th><th>الحملة</th><th>المبلغ</th><th>الحالة</th></tr></thead><tbody>{[['فاعل خير','دواء كل شهر','٥٠٠ ج.م'],['أحمد محمد','حقيبة تفتح بابًا','١٬٠٠٠ ج.م'],['مريم علي','الصندوق العام','٢٥٠ ج.م']].map(r=><tr><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td><span>مكتمل</span></td></tr>)}</tbody></table></section></div></section></Layout>}

function GenericNotFound(){return <Layout title="الصفحة غير موجودة"><section class="not-found"><div>4<span>✦</span>4</div><h1>يبدو أن الصفحة ضلّت الطريق</h1><p>ربما تم نقلها أو لم تعد متاحة، لكن طريق الخير يبدأ دائمًا من الرئيسية.</p><a class="primary-btn" href="/">العودة للرئيسية {icon('fa-house')}</a></section></Layout>}

app.get('/', c=>c.html(<Home/>))
app.get('/about', c=>c.html(<About/>))
app.get('/campaigns', c=>c.html(<Campaigns/>))
app.get('/campaigns/:id', c=>c.html(<CampaignDetail id={c.req.param('id')}/>))
app.get('/donate', c=>c.html(<Donate/>))
app.get('/achievements', c=>c.html(<Achievements/>))
app.get('/volunteers', c=>c.html(<Volunteers/>))
app.get('/news', c=>c.html(<News/>))
app.get('/faq', c=>c.html(<FAQ/>))
app.get('/contact', c=>c.html(<Contact/>))
app.get('/transparency', c=>c.html(<Transparency/>))
app.get('/gallery', c=>c.html(<Gallery/>))
app.get('/events', c=>c.html(<Events/>))
app.get('/success-stories', c=>c.html(<Stories/>))
app.get('/careers', c=>c.html(<Careers/>))
app.get('/login', c=>c.html(<Login/>))
app.get('/register', c=>c.redirect('/login'))
app.get('/dashboard', c=>c.html(<Dashboard/>))
app.get('/profile', c=>c.redirect('/login'))

app.post('/api/:type{.+}', async c=>{let body:any={};try{body=await c.req.json()}catch{try{body=Object.fromEntries(await c.req.formData())}catch{}};return c.json({success:true,message:'تم استلام طلبك بنجاح، سنتواصل معك قريبًا.',received:Object.keys(body).length})})
app.get('/api/config', c=>c.json({organization:'مؤسسة الدكتور عمر هشام الخيرية',mode:'presentation'}))
app.get('/sitemap.xml', c=>c.body(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['','about','campaigns','achievements','success-stories','events','gallery','donate','volunteers','careers','news','transparency','faq','contact'].map(x=>`<url><loc>https://omarhesham.org/${x}</loc></url>`).join('')}</urlset>`,200,{'Content-Type':'application/xml'}))
app.notFound(c=>c.html(<GenericNotFound/>,404))

export default app
