export default {
  async fetch(): Promise<Response> {
    const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Marketing Dashboard</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
--sidebar-w:260px;
--bg:#f0f2f5;
--card:#fff;
--shadow:0 2px 8px rgba(0,0,0,.08);
--radius:10px;
--font:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Roboto,sans-serif;
--topbar-h:0px;
}
html{overflow-x:hidden}
body{font-family:var(--font);background:var(--bg);color:#1a1a2e;display:flex;min-height:100vh;overflow-x:hidden}

/* Mobile top bar */
.mobile-topbar{display:none;position:fixed;top:0;left:0;right:0;height:56px;background:#111118;color:#fff;z-index:200;align-items:center;padding:0 16px;gap:12px}
.hamburger{background:none;border:none;color:#fff;font-size:28px;cursor:pointer;width:44px;height:44px;display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent}
.mobile-topbar .logo{font-size:18px;font-weight:700;letter-spacing:-.5px}
.mobile-topbar .logo span{color:#4a8cff}

/* Sidebar overlay backdrop */
.sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:149;-webkit-tap-highlight-color:transparent}

/* Sidebar */
.sidebar{width:var(--sidebar-w);min-height:100vh;background:#111118;color:#fff;position:fixed;top:0;left:0;bottom:0;overflow-y:auto;z-index:150;display:flex;flex-direction:column;transition:transform .3s ease}
.sidebar-logo{padding:24px 20px 16px;font-size:20px;font-weight:700;letter-spacing:-.5px;border-bottom:1px solid #222}
.sidebar-logo span{color:#4a8cff}
.sidebar nav{flex:1;padding:8px 0}
.nav-item{display:flex;align-items:center;gap:10px;padding:11px 20px;cursor:pointer;font-size:13.5px;color:#8a8a9a;transition:all .15s;border-left:3px solid transparent;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;-webkit-tap-highlight-color:transparent}
.nav-item:hover{background:#1a1a28;color:#ccc}
.nav-item.active{color:#fff;background:#1a1a28}
.nav-item .emoji{font-size:16px;flex-shrink:0}
.nav-sep{height:1px;background:#222;margin:8px 16px}

/* Main */
.main{margin-left:var(--sidebar-w);flex:1;padding:28px 32px;min-height:100vh;max-width:100%}
.page{display:none}
.page.active{display:block}
.page-header{margin-bottom:24px}
.page-header h1{font-size:26px;font-weight:700;margin-bottom:4px}
.page-header p{color:#666;font-size:14px}

/* Cards */
.card{background:var(--card);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow);margin-bottom:16px}
.card h3{font-size:15px;font-weight:600;margin-bottom:10px}
.card p{font-size:13px;color:#555;line-height:1.5}

/* Grid helpers */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.grid-6{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}

/* KPI Cards */
.kpi{text-align:center;padding:18px 12px}
.kpi .value{font-size:28px;font-weight:700}
.kpi .label{font-size:12px;color:#888;margin-top:4px}
.kpi .change{font-size:12px;margin-top:6px;font-weight:600}
.kpi .change.up{color:#22c55e}
.kpi .change.down{color:#ef4444}
.kpi .change.neutral{color:#f59e0b}

/* Badges */
.badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;color:#fff}
.badge-red{background:#ef4444}.badge-orange{background:#f59e0b}.badge-blue{background:#3b82f6}.badge-green{background:#22c55e}

/* Section header */
.section-title{font-size:17px;font-weight:700;margin:24px 0 12px;display:flex;align-items:center;gap:8px}
.section-title .dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}

/* Action Cards */
.action-card{background:#fff;border-radius:12px;padding:22px;box-shadow:0 3px 16px rgba(0,0,0,.1);border-left:4px solid #4a8cff;margin-bottom:16px;transition:transform .1s}
.action-card:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(0,0,0,.12)}
.action-card .ac-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px}
.action-card .ac-title{font-size:16px;font-weight:700}
.action-card .ac-meta{display:flex;gap:16px;margin:10px 0;font-size:12px;color:#666}
.action-card .ac-meta span{display:flex;align-items:center;gap:4px}
.action-card .ac-desc{font-size:13px;color:#555;line-height:1.5;margin-bottom:6px}
.action-card .ac-rec{font-size:13px;color:#4a8cff;font-weight:600;margin-bottom:14px}
.action-card .ac-actions{display:flex;gap:8px;flex-wrap:wrap}
.btn{padding:8px 18px;border-radius:8px;border:none;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;min-height:44px;display:inline-flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent}
.btn:hover{filter:brightness(1.1)}
.btn-approve{background:#22c55e;color:#fff}
.btn-edit{background:#3b82f6;color:#fff}
.btn-ignore{background:#e5e7eb;color:#666}
.btn-primary{background:#4a8cff;color:#fff}
.btn-outline{background:transparent;border:2px solid #ddd;color:#555}
.btn-outline:hover{border-color:#999}

/* Quick Actions */
.quick-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px}
.quick-actions .btn{padding:10px 20px;font-size:13px}

/* Alerts */
.alert-item{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:8px;margin-bottom:8px;font-size:13px}
.alert-item.critical{background:#fef2f2;border-left:4px solid #ef4444}
.alert-item.warning{background:#fffbeb;border-left:4px solid #f59e0b}
.alert-item.info{background:#eff6ff;border-left:4px solid #3b82f6}
.alert-item.opportunity{background:#f0fdf4;border-left:4px solid #22c55e}

/* Change items */
.change-item{padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;display:flex;align-items:center;gap:10px}
.change-item:last-child{border-bottom:none}
.change-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}

/* Tabs */
.tabs{display:flex;gap:0;margin-bottom:20px;border-bottom:2px solid #e5e7eb;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.tabs::-webkit-scrollbar{display:none}
.tab{padding:10px 20px;font-size:13px;font-weight:600;cursor:pointer;color:#888;border-bottom:2px solid transparent;margin-bottom:-2px;transition:.15s;white-space:nowrap;flex-shrink:0;min-height:44px;display:flex;align-items:center;-webkit-tap-highlight-color:transparent}
.tab.active{color:#1a1a2e;border-bottom-color:currentColor}

/* Pipeline */
.pipeline{display:flex;gap:12px;overflow-x:auto;padding-bottom:8px;-webkit-overflow-scrolling:touch}
.pipeline-stage{min-width:180px;flex:1;background:#f8f9fb;border-radius:10px;padding:14px}
.pipeline-stage h4{font-size:13px;font-weight:700;margin-bottom:10px;text-align:center}
.pipeline-card{background:#fff;border-radius:8px;padding:12px;margin-bottom:8px;box-shadow:0 1px 4px rgba(0,0,0,.06);font-size:12px}
.pipeline-card .pc-title{font-weight:600;margin-bottom:4px}

/* Kanban */
.kanban{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.kanban-col{background:#f8f9fb;border-radius:10px;padding:14px}
.kanban-col h4{font-size:13px;font-weight:700;margin-bottom:10px;text-align:center}

/* Competitor cards */
.competitor{display:flex;align-items:center;gap:14px;padding:14px;background:#fff;border-radius:10px;margin-bottom:10px;box-shadow:var(--shadow)}
.competitor .avatar{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:16px;flex-shrink:0}
.competitor .info{flex:1}
.competitor .info h4{font-size:14px;font-weight:600}
.competitor .info p{font-size:12px;color:#888}

/* Experiment card */
.exp-card{background:#fff;border-radius:10px;padding:16px;box-shadow:var(--shadow)}
.exp-card h4{font-size:14px;font-weight:600;margin-bottom:8px}
.exp-card .detail{font-size:12px;color:#666;margin-bottom:4px}

/* Accent color overrides per page */
[data-accent="blue"]{--accent:#4a8cff}
[data-accent="orange"]{--accent:#f97316}
[data-accent="green"]{--accent:#22c55e}
[data-accent="violet"]{--accent:#8b5cf6}
[data-accent="pink"]{--accent:#ec4899}
[data-accent="cyan"]{--accent:#06b6d4}
[data-accent="teal"]{--accent:#14b8a6}
[data-accent="yellow"]{--accent:#eab308}
[data-accent="darkblue"]{--accent:#1e40af}
[data-accent="lime"]{--accent:#84cc16}
[data-accent="red"]{--accent:#ef4444}
[data-accent="grey"]{--accent:#6b7280}
[data-accent="slate"]{--accent:#64748b}

.accent-bar{height:4px;border-radius:2px;margin-bottom:20px}

/* Responsive - Tablet */
@media(max-width:1200px){
.grid-6{grid-template-columns:repeat(3,1fr)}
.grid-4{grid-template-columns:repeat(2,1fr)}
}

@media(max-width:900px){
.grid-3{grid-template-columns:1fr 1fr}
.grid-2{grid-template-columns:1fr}
.kanban{grid-template-columns:repeat(2,1fr)}
}

/* Responsive - Mobile */
@media(max-width:768px){
:root{--topbar-h:56px}

/* Show mobile top bar */
.mobile-topbar{display:flex}

/* Sidebar becomes overlay */
.sidebar{transform:translateX(-100%);top:0;width:280px}
.sidebar.open{transform:translateX(0)}
.sidebar-overlay.open{display:block}

/* Main area */
.main{margin-left:0;padding:calc(var(--topbar-h) + 16px) 16px 16px;width:100%}

/* KPI grid: 2 columns */
.grid-6{grid-template-columns:1fr 1fr;gap:8px}

/* All grids single column */
.grid-2,.grid-3,.grid-4{grid-template-columns:1fr;gap:12px}

/* KPI smaller padding */
.kpi{padding:14px 10px}
.kpi .value{font-size:24px}

/* Page header */
.page-header h1{font-size:22px}

/* Action cards */
.action-card{padding:16px;border-radius:10px}
.action-card .ac-title{font-size:15px}
.action-card .ac-actions{flex-direction:column}
.action-card .ac-actions .btn{width:100%}

/* Quick actions stack */
.quick-actions{flex-direction:column}
.quick-actions .btn{width:100%}

/* Pipeline horizontal scroll */
.pipeline{flex-direction:row;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;padding-bottom:12px}
.pipeline-stage{min-width:240px;flex:none;scroll-snap-align:start}

/* Kanban single column */
.kanban{grid-template-columns:1fr}

/* Cards smaller padding */
.card{padding:16px}

/* Alerts */
.alert-item{font-size:12px;padding:10px 12px;gap:8px}

/* Buttons min touch target */
.btn{min-height:44px;font-size:14px}

/* Diff view stack */
.diff-grid{grid-template-columns:1fr !important}

/* Section title */
.section-title{font-size:16px;margin:20px 0 10px}

/* Nav items touch targets */
.nav-item{padding:14px 20px;font-size:15px;min-height:48px}

/* Hide hover effects on touch */
.action-card:hover{transform:none}
}

/* Extra small phones */
@media(max-width:380px){
.grid-6{grid-template-columns:1fr 1fr;gap:6px}
.kpi .value{font-size:20px}
.main{padding:calc(var(--topbar-h) + 12px) 12px 12px}
}
</style>
</head>
<body>

<!-- Mobile top bar -->
<div class="mobile-topbar">
<button class="hamburger" id="hamburger-btn" aria-label="Menu">☰</button>
<div class="logo">📈 <span>marketing</span>HUB</div>
</div>

<!-- Sidebar overlay backdrop -->
<div class="sidebar-overlay" id="sidebar-overlay"></div>

<aside class="sidebar" id="sidebar">
<div class="sidebar-logo">📈 <span>marketing</span><em style="font-style:normal;color:#fff">HUB</em></div>
<nav id="nav"></nav>
</aside>

<div class="main" id="main"></div>

<script>
const pages = [
{id:'home',emoji:'🏠',label:'Home / Briefing',accent:'blue'},
{id:'market',emoji:'🌍',label:'Market & Competitors',accent:'orange'},
{id:'performance',emoji:'📊',label:'Performance',accent:'green'},
{id:'campaigns',emoji:'🚀',label:'Campaigns',accent:'violet'},
{id:'content',emoji:'🎨',label:'Content Studio',accent:'pink'},
{id:'email',emoji:'✉️',label:'Email / Lifecycle',accent:'cyan'},
{id:'website',emoji:'🌐',label:'Website / Shop',accent:'teal'},
{id:'insights',emoji:'🧠',label:'Customer Insights',accent:'yellow'},
{id:'leads',emoji:'🎯',label:'Leads',accent:'darkblue'},
{id:'cro',emoji:'🧪',label:'CRO / Experiments',accent:'lime'},
{id:'reputation',emoji:'🚨',label:'Reputation / PR',accent:'red'},
{id:'ops',emoji:'⚙️',label:'Ops / Tasks',accent:'grey'},
{id:'settings',emoji:'🔧',label:'Settings',accent:'slate'},
];

const accentColors={blue:'#4a8cff',orange:'#f97316',green:'#22c55e',violet:'#8b5cf6',pink:'#ec4899',cyan:'#06b6d4',teal:'#14b8a6',yellow:'#eab308',darkblue:'#1e40af',lime:'#84cc16',red:'#ef4444',grey:'#6b7280',slate:'#64748b'};

// Mobile menu toggle
const sidebar=document.getElementById('sidebar');
const overlay=document.getElementById('sidebar-overlay');
const hamburger=document.getElementById('hamburger-btn');

function openSidebar(){sidebar.classList.add('open');overlay.classList.add('open');document.body.style.overflow='hidden'}
function closeSidebar(){sidebar.classList.remove('open');overlay.classList.remove('open');document.body.style.overflow=''}

hamburger.addEventListener('click',()=>{sidebar.classList.contains('open')?closeSidebar():openSidebar()});
overlay.addEventListener('click',closeSidebar);

// Build nav
const nav=document.getElementById('nav');
pages.forEach((p,i)=>{
if(i===11) nav.innerHTML+='<div class="nav-sep"></div>';
nav.innerHTML+=\`<div class="nav-item\${i===0?' active':''}" data-page="\${p.id}" style="\${i===0?'border-left-color:'+accentColors[p.accent]+';color:#fff':''}"><span class="emoji">\${p.emoji}</span><span class="nav-label">\${p.label}</span></div>\`;
});

function switchPage(id){
document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
document.querySelectorAll('.nav-item').forEach(n=>{n.classList.remove('active');n.style.borderLeftColor='transparent';n.style.color=''});
document.getElementById('page-'+id).classList.add('active');
const ni=document.querySelector(\`.nav-item[data-page="\${id}"]\`);
const pg=pages.find(p=>p.id===id);
ni.classList.add('active');
ni.style.borderLeftColor=accentColors[pg.accent];
ni.style.color='#fff';
closeSidebar();
window.scrollTo(0,0);
}
document.querySelectorAll('.nav-item').forEach(n=>n.addEventListener('click',()=>switchPage(n.dataset.page)));

// Build pages
const main=document.getElementById('main');

function hdr(title,desc,accent){return \`<div class="page-header"><div class="accent-bar" style="background:\${accentColors[accent]}"></div><h1>\${title}</h1><p>\${desc}</p></div>\`;}
function card(title,body){return \`<div class="card"><h3>\${title}</h3>\${body}</div>\`;}

// HOME
main.innerHTML+=\`<div class="page active" id="page-home" data-accent="blue">
\${hdr('🏠 Tägliches Briefing','In 60 Sekunden verstehen: Was ist passiert, was ist wichtig, was tun.','blue')}

<div class="section-title"><div class="dot" style="background:#4a8cff"></div> KPI Snapshot</div>
<div class="grid-6">
\${[['42.850','Traffic','↑ +12%','up'],['1.284','Leads','↑ +8%','up'],['3,2%','Conversion Rate','↓ -0,4%','down'],['€24,50','CPA / CAC','↑ +€2','down'],['€128.400','Revenue','↑ +15%','up'],['4,2x','ROAS','→ ±0','neutral']].map(k=>\`<div class="card kpi"><div class="value">\${k[0]}</div><div class="label">\${k[1]}</div><div class="change \${k[3]}">\${k[2]}</div></div>\`).join('')}
</div>

<div class="section-title"><div class="dot" style="background:#f59e0b"></div> Was hat sich seit gestern geändert?</div>
<div class="card">
\${[['#f97316','Competitor X hat Preise um 15% gesenkt'],['#ef4444','Conversion Rate auf Mobile um 0,8% gefallen'],['#22c55e','Blog-Artikel "KI im Marketing" viral – 12k Views'],['#3b82f6','Google Ads CTR gestiegen auf 4,1%']].map(c=>\`<div class="change-item"><div class="change-dot" style="background:\${c[0]}"></div>\${c[1]}</div>\`).join('')}
</div>

<div class="section-title"><div class="dot" style="background:#ef4444"></div> Alerts</div>
<div class="alert-item critical">🔴 <strong>Kritisch:</strong>&nbsp; Budget für Google Ads in 2 Tagen aufgebraucht – sofort prüfen</div>
<div class="alert-item warning">🟠 <strong>Wichtig:</strong>&nbsp; 3 negative Bewertungen auf Trustpilot in den letzten 24h</div>
<div class="alert-item info">🔵 <strong>Info:</strong>&nbsp; Neuer Branchenreport von Gartner verfügbar</div>
<div class="alert-item opportunity">🟢 <strong>Chance:</strong>&nbsp; Keyword "nachhaltige Verpackung" trending – Content-Lücke identifiziert</div>

<div class="section-title"><div class="dot" style="background:#22c55e"></div> Top 3 Wachstumschancen</div>
<div class="grid-3">
\${[['SEO-Lücke bei "nachhaltige Verpackung"','Suchvolumen +340% – kein Wettbewerber hat Content. Geschätzter Traffic: 8.000/Monat.'],['Retargeting-Segment reaktivieren','2.400 Warenkorbabbrecher letzte Woche. Erwarteter Umsatz: €18.000.'],['LinkedIn Thought Leadership','Branchen-Insights als Carousel-Posts. Erwartete Reichweite: 50k+.']].map(c=>\`<div class="card"><h3>🚀 \${c[0]}</h3><p>\${c[1]}</p></div>\`).join('')}
</div>

<div class="section-title" style="font-size:20px">⚡ Action Cards</div>

<div class="action-card" style="border-left-color:#ef4444">
<div class="ac-header"><div class="ac-title">Google Ads Budget erhöhen</div><span class="badge badge-red">Dringend</span></div>
<div class="ac-desc">Das aktuelle Tagesbudget ist in 2 Tagen aufgebraucht. Bei gleichbleibender Performance wird ein Umsatzverlust von ~€12.000 erwartet.</div>
<div class="ac-meta"><span>📊 Impact: <strong>9/10</strong></span><span>⚡ Aufwand: <strong>Gering</strong></span></div>
<div class="ac-rec">💡 Empfehlung: Budget um 25% erhöhen und Performance nach 48h prüfen.</div>
<div class="ac-actions"><button class="btn btn-approve">✓ Genehmigen</button><button class="btn btn-edit">✎ Bearbeiten</button><button class="btn btn-ignore">Ignorieren</button></div>
</div>

<div class="action-card" style="border-left-color:#f59e0b">
<div class="ac-header"><div class="ac-title">Trustpilot-Bewertungen beantworten</div><span class="badge badge-orange">Wichtig</span></div>
<div class="ac-desc">3 neue negative Bewertungen in den letzten 24h. Durchschnittliche Antwortzeit bisher: 4,2h. Branchenstandard: 2h.</div>
<div class="ac-meta"><span>📊 Impact: <strong>7/10</strong></span><span>⚡ Aufwand: <strong>Mittel</strong></span></div>
<div class="ac-rec">💡 Empfehlung: Vorbereitete Antwort-Templates nutzen. KI-Entwürfe liegen bereit.</div>
<div class="ac-actions"><button class="btn btn-approve">✓ Genehmigen</button><button class="btn btn-edit">✎ Bearbeiten</button><button class="btn btn-ignore">Ignorieren</button></div>
</div>

<div class="action-card" style="border-left-color:#22c55e">
<div class="ac-header"><div class="ac-title">SEO-Artikel "Nachhaltige Verpackung" erstellen</div><span class="badge badge-green">Chance</span></div>
<div class="ac-desc">Content-Lücke erkannt: Kein Wettbewerber rankt für dieses Keyword. Geschätztes Potenzial: 8.000 organische Besucher/Monat.</div>
<div class="ac-meta"><span>📊 Impact: <strong>8/10</strong></span><span>⚡ Aufwand: <strong>Mittel</strong></span></div>
<div class="ac-rec">💡 Empfehlung: Entwurf im Content Studio generieren und diese Woche veröffentlichen.</div>
<div class="ac-actions"><button class="btn btn-approve">✓ Genehmigen</button><button class="btn btn-edit">✎ Bearbeiten</button><button class="btn btn-ignore">Ignorieren</button></div>
</div>

<div class="action-card">
<div class="ac-header"><div class="ac-title">Retargeting-Kampagne für Warenkorbabbrecher</div><span class="badge badge-blue">Empfohlen</span></div>
<div class="ac-desc">2.400 Nutzer haben letzte Woche den Warenkorb verlassen. Basierend auf historischen Daten liegt die Recovery-Rate bei 12%.</div>
<div class="ac-meta"><span>📊 Impact: <strong>8/10</strong></span><span>⚡ Aufwand: <strong>Gering</strong></span></div>
<div class="ac-rec">💡 Empfehlung: Kampagne mit 10% Rabatt-Code starten. Erwarteter ROI: 6,8x.</div>
<div class="ac-actions"><button class="btn btn-approve">✓ Genehmigen</button><button class="btn btn-edit">✎ Bearbeiten</button><button class="btn btn-ignore">Ignorieren</button></div>
</div>

<div class="section-title"><div class="dot" style="background:#4a8cff"></div> Quick Actions</div>
<div class="quick-actions">
<button class="btn btn-primary">🚀 Neue Kampagne planen</button>
<button class="btn btn-primary">✍️ Content erstellen</button>
<button class="btn btn-outline">📋 Weekly Report generieren</button>
<button class="btn btn-outline">📊 Performance analysieren</button>
</div>
</div>\`;

// MARKET
main.innerHTML+=\`<div class="page" id="page-market" data-accent="orange">
\${hdr('🌍 Market & Competitors','Marktüberblick ohne eigene Recherche. Alles was du wissen musst, auf einen Blick.','orange')}

<div class="section-title"><div class="dot" style="background:#f97316"></div> Competitor Feed</div>
<div class="card"><p>Echtzeit-Updates zu Preisänderungen, Landing Pages, Ads, Messaging und Produktänderungen der Wettbewerber. <em>Daten werden automatisch gesammelt.</em></p></div>
\${[['C','#f97316','Competitor Alpha','Preis gesenkt um 15% · vor 2 Stunden'],['B','#3b82f6','Competitor Beta','Neue Landing Page live · vor 5 Stunden'],['G','#22c55e','Competitor Gamma','Google Ads Kampagne gestartet · vor 1 Tag']].map(c=>\`<div class="competitor"><div class="avatar" style="background:\${c[1]}">\${c[0]}</div><div class="info"><h4>\${c[2]}</h4><p>\${c[3]}</p></div></div>\`).join('')}

<div class="section-title"><div class="dot" style="background:#f97316"></div> Competitor Profiles</div>
<div class="grid-3">
\${['Alpha','Beta','Gamma'].map(n=>\`<div class="card"><h3>Competitor \${n}</h3><p><strong>Positionierung:</strong> Platzhalter<br><strong>Zielgruppe:</strong> Platzhalter<br><strong>Stärken:</strong> Platzhalter<br><strong>Schwächen:</strong> Platzhalter<br><strong>Letzte Aktivität:</strong> Platzhalter</p></div>\`).join('')}
</div>

<div class="section-title"><div class="dot" style="background:#f97316"></div> Trend Radar</div>
\${card('Markttrends & Keywords','Aktuelle Branchentrends, aufsteigende Keywords und relevante News. Daten werden laufend aktualisiert.')}

<div class="section-title"><div class="dot" style="background:#f97316"></div> Battlecards</div>
\${card('Battlecards','Vergleichskarten für Vertriebsgespräche: Feature-Vergleich, Preisvergleich, Messaging-Empfehlungen pro Wettbewerber.')}
</div>\`;

// PERFORMANCE
main.innerHTML+=\`<div class="page" id="page-performance" data-accent="green">
\${hdr('📊 Performance','Daten verstehen ohne Analyst. Jede Zahl mit Insight, Ursache und Empfehlung.','green')}
<div class="tabs">
<div class="tab active">Übersicht</div><div class="tab">Channels</div><div class="tab">Funnels</div><div class="tab">Anomalien</div><div class="tab">Empfehlungen</div>
</div>
<div class="grid-2">
\${card('Traffic-Übersicht','<strong>Insight:</strong> Traffic ist um 12% gestiegen.<br><strong>Ursache:</strong> Viraler Blog-Artikel und erhöhte Ads-Ausgaben.<br><strong>Empfehlung:</strong> Blog-Strategie fortsetzen, Ads-Budget beibehalten.')}
\${card('Conversion Funnel','<strong>Insight:</strong> Drop-off bei Checkout-Seite um 18% gestiegen.<br><strong>Ursache:</strong> Neue Zahlungsoption verursacht Fehler auf Mobile.<br><strong>Empfehlung:</strong> Hotfix priorisieren, A/B-Test für Checkout-Layout.')}
\${card('Channel Performance','<strong>Insight:</strong> LinkedIn übertrifft Facebook bei B2B Leads um 3x.<br><strong>Ursache:</strong> Neues Carousel-Format hat hohe Engagement-Rate.<br><strong>Empfehlung:</strong> Budget von Facebook zu LinkedIn umschichten.')}
\${card('Anomalie-Erkennung','<strong>Insight:</strong> Ungewöhnlicher Traffic-Spike aus Brasilien.<br><strong>Ursache:</strong> Bot-Traffic vermutet (hohe Bounce-Rate, 0s Verweildauer).<br><strong>Empfehlung:</strong> IP-Range in Analytics filtern.')}
</div>
</div>\`;

// CAMPAIGNS
main.innerHTML+=\`<div class="page" id="page-campaigns" data-accent="violet">
\${hdr('🚀 Campaigns','Pipeline-Ansicht aller Kampagnen. Von der Idee bis zu den Ergebnissen.','violet')}
<div style="margin-bottom:16px"><button class="btn" style="background:#8b5cf6;color:#fff">+ Kampagne generieren</button></div>
<div class="pipeline">
\${[['💡 Idee',['Q2 Brand Awareness','Sommer-Sale Teaser']],['📋 Planung',['LinkedIn Thought Leadership']],['✏️ Entwurf',['Newsletter Relaunch']],['👁️ Freigabe',['Retargeting Wave 3']],['🟢 Live',['Google Ads Spring','Social Proof Campaign']],['📊 Ergebnisse',['Winter Sale 2024']]].map(s=>\`<div class="pipeline-stage"><h4>\${s[0]}</h4>\${s[1].map(c=>\`<div class="pipeline-card"><div class="pc-title">\${c}</div><p style="font-size:11px;color:#888;margin-top:4px">Ziel · Zielgruppe · Budget</p></div>\`).join('')}</div>\`).join('')}
</div>
\${card('Kampagnen-Detail (Platzhalter)','<strong>Ziel:</strong> —<br><strong>Zielgruppe:</strong> —<br><strong>Message:</strong> —<br><strong>Budget:</strong> —<br><strong>Timeline:</strong> —<br><strong>Assets:</strong> —<br><strong>KPIs:</strong> —<br><strong>Learnings:</strong> —')}
</div>\`;

// CONTENT
main.innerHTML+=\`<div class="page" id="page-content" data-accent="pink">
\${hdr('🎨 Content Studio','Content generieren, anpassen und veröffentlichen – alles an einem Ort.','pink')}
<div class="grid-3">
\${card('Content Generator','KI-gestützte Content-Erstellung für alle Kanäle. Briefing eingeben → Entwurf erhalten.')}
\${card('Kanal-Anpassung','Ein Inhalt, viele Formate: Automatische Anpassung für Ads, Social, Blog, Landing Pages, Video Scripts.')}
\${card('Asset Library','Zentrale Medienbibliothek: Bilder, Videos, Templates, Brand-Elemente.')}
</div>
<div class="grid-2">
\${card('Posting-Kalender','Visuelle Übersicht aller geplanten Veröffentlichungen. Drag & Drop Planung.')}
\${card('Freigabe-Queue','Inhalte vor Veröffentlichung prüfen und freigeben. Status: Entwurf → Review → Freigegeben.')}
</div>
<div class="card"><h3>Output-Formate</h3><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
\${['Ads','Social Posts','Blog-Artikel','Landing Pages','Video Scripts'].map(f=>\`<span class="badge" style="background:#ec4899">\${f}</span>\`).join('')}
</div></div>
</div>\`;

// EMAIL
main.innerHTML+=\`<div class="page" id="page-email" data-accent="cyan">
\${hdr('✉️ Email / Lifecycle','E-Mail-Marketing und Lifecycle-Automatisierungen zentral steuern.','cyan')}
<div class="grid-3">
\${['Kampagnen','Segmente','Templates','Automatisierungen','A/B Tests','Send Time Optimizer'].map(s=>card(s,'Platzhalter – wird mit echten Daten gefüllt.')).join('')}
</div>
\${card('Personalisierung & Freigabe','KI-Vorschläge für Betreffzeilen, Inhalte und Versandzeiten. Jede E-Mail durchläuft einen Freigabeprozess vor dem Versand.')}
</div>\`;

// WEBSITE
main.innerHTML+=\`<div class="page" id="page-website" data-accent="teal">
\${hdr('🌐 Website / Shop','Änderungsvorschläge, SEO und Experimente für Website und Shop.','teal')}
<div class="grid-2">
\${card('Vorgeschlagene Änderungen','KI-basierte Vorschläge für Texte, CTAs und Layout. Mit Diff-View: Vorher/Nachher.')}
\${card('SEO-Vorschläge','Keyword-Chancen, Meta-Optimierungen, interne Verlinkung, technisches SEO.')}
\${card('Landing Pages','Übersicht aller Landing Pages mit Performance-Daten und Optimierungsvorschlägen.')}
\${card('Experimente','Laufende A/B-Tests auf der Website mit Ergebnissen und statistischer Signifikanz.')}
</div>
<div class="card"><h3>Diff-View: Vorher / Nachher</h3><div class="diff-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:12px">
<div style="background:#fef2f2;padding:14px;border-radius:8px;font-size:13px"><strong>Vorher:</strong><br><del>Jetzt kaufen und sparen</del></div>
<div style="background:#f0fdf4;padding:14px;border-radius:8px;font-size:13px"><strong>Nachher:</strong><br><ins>Heute bestellen – kostenloser Versand bis Freitag</ins></div>
</div></div>
</div>\`;

// INSIGHTS
main.innerHTML+=\`<div class="page" id="page-insights" data-accent="yellow">
\${hdr('🧠 Customer Insights','Kundenverständnis auf einen Blick. Pain Points, Motivationen, Trends.','yellow')}
<div class="grid-3">
\${card('Pain Points','• Zu lange Lieferzeiten<br>• Unklare Preisstruktur<br>• Fehlende Produktvergleiche')}
\${card('Motivationen','• Nachhaltigkeit & Umweltbewusstsein<br>• Preis-Leistungs-Verhältnis<br>• Markenvertrauen')}
\${card('Einwände','• "Zu teuer im Vergleich zu X"<br>• "Keine Erfahrungsberichte"<br>• "Retoure zu kompliziert"')}
</div>
<div class="grid-2">
\${card('Trends','Steigende Nachfrage nach personalisierten Produkten. Generationswechsel bei Kaufentscheidungen (Gen Z).')}
\${card('Kundenstimmen','<em>"Super Qualität, aber die Lieferung hat 8 Tage gedauert."</em><br><em>"Endlich ein Anbieter, der Nachhaltigkeit ernst nimmt."</em>')}
</div>
<div style="margin-top:12px"><button class="btn" style="background:#eab308;color:#000">🧠 Messaging-Verbesserungen generieren</button></div>
</div>\`;

// LEADS
main.innerHTML+=\`<div class="page" id="page-leads" data-accent="darkblue">
\${hdr('🎯 Leads','ICP definieren, Leads bewerten, Outreach automatisieren.','darkblue')}
<div class="grid-3">
\${card('ICP Builder','Ideales Kundenprofil definieren: Branche, Unternehmensgröße, Technologien, Budget, Entscheider.')}
\${card('Lead-Liste','Qualifizierte Leads mit Scoring, Kontaktdaten und Engagement-Historie.')}
\${card('Lead Scoring','Automatische Bewertung basierend auf Verhalten, Firmendaten und ICP-Match.')}
</div>
<div class="grid-3">
\${card('Outreach-Entwürfe','KI-generierte E-Mail- und LinkedIn-Nachrichten, personalisiert pro Lead.')}
\${card('Sequenzen','Multi-Touch-Sequenzen: E-Mail → Follow-up → LinkedIn → Anruf.')}
\${card('CRM-Integration','Bidirektionale Synchronisation mit HubSpot, Salesforce, Pipedrive etc.')}
</div>
</div>\`;

// CRO
main.innerHTML+=\`<div class="page" id="page-cro" data-accent="lime">
\${hdr('🧪 CRO / Experiments','Hypothesen testen, Ergebnisse messen, Learnings dokumentieren.','lime')}
<div class="kanban">
\${[['📋 Backlog',2],['🔬 Laufend',1],['📊 Ergebnisse',1],['📚 Learnings',1]].map(([title,n])=>\`<div class="kanban-col"><h4>\${title}</h4>\${Array.from({length:n},(_,i)=>\`<div class="exp-card"><h4>Experiment \${title[0]}\${i+1}</h4><div class="detail"><strong>Hypothese:</strong> Platzhalter</div><div class="detail"><strong>Varianten:</strong> A / B</div><div class="detail"><strong>KPI:</strong> Conversion Rate</div><div class="detail"><strong>Impact:</strong> Hoch</div></div>\`).join('')}</div>\`).join('')}
</div>
</div>\`;

// REPUTATION
main.innerHTML+=\`<div class="page" id="page-reputation" data-accent="red">
\${hdr('🚨 Reputation / PR','Mentions, Bewertungen, Sentiment und Krisen-Erkennung.','red')}
<div class="grid-2">
\${card('Mentions-Feed','Echtzeit-Übersicht aller Erwähnungen: Social Media, News, Foren, Bewertungsportale.')}
\${card('Sentiment-Analyse','Aktuelle Stimmung: <span class="badge badge-green">72% Positiv</span> <span class="badge badge-orange">18% Neutral</span> <span class="badge badge-red">10% Negativ</span>')}
</div>
\${card('Bewertungen','Aggregierte Bewertungen von Google, Trustpilot, Kununu etc. mit Trend-Anzeige.')}
<div class="card" style="border:2px solid #ef4444;background:#fef2f2"><h3>🚨 Crisis Mode</h3><p>Wird automatisch aktiviert wenn negative Trends erkannt werden. Eskalation, Response-Templates und Monitoring-Dashboard.</p></div>
</div>\`;

// OPS
main.innerHTML+=\`<div class="page" id="page-ops" data-accent="grey">
\${hdr('⚙️ Ops / Tasks','Aufgaben-Management und automatische Dokumentation.','grey')}
<div class="kanban">
\${[['📋 To Do',['Budget Review','Wettbewerbsanalyse']],['🔨 In Arbeit',['Social Media Plan Q2']],['👁️ Freigabe',['Newsletter Draft']],['✅ Erledigt',['Landing Page Update']]].map(([title,items])=>\`<div class="kanban-col"><h4>\${title}</h4>\${items.map(t=>\`<div class="pipeline-card"><div class="pc-title">\${t}</div></div>\`).join('')}</div>\`).join('')}
</div>
<div class="section-title" style="margin-top:24px"><div class="dot" style="background:#6b7280"></div> Auto-Docs</div>
<div class="grid-3">
\${card('Reports','Automatisch generierte Wochen- und Monatsberichte.')}
\${card('Slides','Präsentationen aus Daten und Insights erstellen.')}
\${card('Summaries','Zusammenfassungen von Meetings, Kampagnen und Ergebnissen.')}
</div>
</div>\`;

// SETTINGS
main.innerHTML+=\`<div class="page" id="page-settings" data-accent="slate">
\${hdr('🔧 Settings / Integrations','Verbindungen, Berechtigungen und Konfiguration.','slate')}
<div class="grid-2">
\${card('Connectors','Google Ads, Meta Ads, LinkedIn, HubSpot, Shopify, Analytics, Search Console, Trustpilot...')}
\${card('Berechtigungen','Team-Rollen und Zugriffsrechte verwalten. Wer darf was genehmigen?')}
\${card('Brand Voice','Ton, Sprache, Begriffe, Do\\'s & Don\\'ts für KI-generierte Inhalte.')}
\${card('Risk Limits','Budgetgrenzen, Genehmigungsschwellen, Alarm-Regeln konfigurieren.')}
</div>
\${card('Benachrichtigungen','Welche Alerts, an wen, über welchen Kanal (E-Mail, Slack, SMS).')}
</div>\`;
</script>
</body>
</html>`;
    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};
