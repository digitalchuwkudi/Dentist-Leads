import fs from 'fs';

const originalCss = `50:  font-size: 2rem;
59:.nav-links a { font-size: 0.85rem; color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
65:  font-size: 0.95rem; font-weight: 500;
103:  font-family: var(--sans); font-size: 1.5rem;
111:  margin-top: 1rem; font-size: 1rem;
143:  font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em;
156:  font-size: clamp(3rem, 7vw, 5.5rem);
170:  font-size: 1.1rem; color: var(--text-muted);
180:  font-size: 0.95rem; font-weight: 500;
196:  font-size: 0.95rem; font-weight: 500;
212:  font-size: 0.95rem; font-weight: 500;
263:  color: var(--cream); font-size: 0.9rem;
284:  font-size: 2.5rem; color: var(--white);
289:.stat-label { font-size: 0.8rem; color: var(--text-muted); margin-top: 2px; }
295:  font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em;
302:  font-size: clamp(2rem, 4vw, 3rem);
311:  font-size: 1rem; color: var(--text-muted);
379:  font-size: 1rem; font-weight: 500;
384:  font-size: 0.95rem; color: var(--text-muted); line-height: 1.7;
391:  margin: 0 auto 1.25rem !important; font-size: 16px;
439:  font-size: 0.7rem; font-weight: 500;
453:  font-size: 1.1rem; font-weight: 500;
458:  font-size: 0.95rem; color: var(--text-muted);
465:  font-size: 0.95rem; color: var(--text-muted);
472:  font-size: 3rem; color: rgba(255,255,255,0.06);
527:.testi-stars { color: var(--teal); font-size: 0.85rem; letter-spacing: 2px; }
530:  font-size: 1rem; color: var(--cream);
553:.testi-name { font-size: 0.95rem; font-weight: 500; color: var(--white); }
554:.testi-role { font-size: 0.85rem; color: var(--text-muted); margin-top: 2px; }
565:  font-size: 0.95rem; color: var(--cream-dark);
572:  font-size: 0.8rem; margin-top: 1px; flex-shrink: 0;
608:  font-size: 0.85rem; font-style: italic;
613:  font-size: 1rem; font-weight: 500;
617:.step p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.7; }
652:  font-size: 0.7rem; font-weight: 500;
659:  font-size: 1.1rem; font-weight: 500;
665:  font-size: 2.4rem; color: var(--white);
671:  font-size: 1rem; color: var(--text-muted);
676:  font-size: 0.95rem; color: var(--text-muted);
688:  font-size: 0.95rem; color: var(--cream-dark);
695:  font-size: 0.8rem; flex-shrink: 0; margin-top: 1px;
702:  font-size: 0.95rem; font-weight: 500;
760:  font-size: 0.92rem; font-weight: 500;
772:  font-size: 0.75rem; font-weight: 500;
777:  font-size: 0.95rem; color: var(--text-muted);
793:  font-size: 0.82rem; color: var(--text-muted);
820:  font-size: 1rem; color: var(--text-muted);
842:  font-size: 1.05rem;
849:  font-size: 0.95rem;
864:  font-size: 0.95rem;
902:  font-size: 0.85rem;
908:  font-size: 2.2rem;
936:  .hero h1 { font-size: 3.5rem; }
944:  .hero h1 { font-size: 3rem; line-height: 1.15; margin-bottom: 1rem; }
945:  .hero-sub { font-size: 1rem; margin-bottom: 2rem; }
953:  h2 { font-size: 2rem; line-height: 1.25; margin-bottom: 1.2rem; }
954:  .section-intro { font-size: 0.95rem; margin-bottom: 2.5rem; max-width: 100%; }`;

const mapCss = {};
for (const line of originalCss.split('\\n')) {
  const parts = line.split(':');
  if (parts.length >= 2) {
    const lineNo = parseInt(parts[0], 10);
    const content = parts.slice(1).join(':');
    mapCss[lineNo] = content;
  }
}

let cssFile = fs.readFileSync('src/index.css', 'utf8').split('\\n');
for (const [lineNo, content] of Object.entries(mapCss)) {
  cssFile[lineNo - 1] = content;
}
fs.writeFileSync('src/index.css', cssFile.join('\\n'));


const originalApp = `25:        <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0px', color: 'var(--white)', fontWeight: '600', fontSize: '1.4rem', letterSpacing: '0.5px' }}>
73:            <div style={{ marginTop: '-1rem', marginBottom: '2.5rem', fontSize: '1.05rem', fontWeight: 500, color: 'var(--teal)' }} className="w-full flex justify-center lg:justify-start">
80:                  <span style={{ fontSize: '0.95rem', color: 'var(--white)', fontWeight: 500, lineHeight: 1.2, margin: '2px 0 3px 0' }}>Chat with our AI</span>
81:                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>Get immediate answers 24/7</span>
172:           <h3 style={{ fontSize: '1.4rem', color: 'var(--teal)', fontWeight: 500, fontFamily: 'var(--serif)', fontStyle: 'italic', marginBottom: '0.5rem' }}>The issue isn’t traffic — it’s conversion</h3>
173:           <p style={{ fontSize: '1.1rem', color: 'var(--white)' }}>Your clinic isn’t losing visitors. <br />You’re losing patients at the point of decision.</p>
225:           <p style={{ fontSize: '1.2rem', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><ChevronRight size={20} color="var(--teal)" className="shrink-0" /> So instead of “website visitors”... <strong>you get patients ready to book</strong>.</p>
237:              <h3 style={{ color: 'var(--teal)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
245:              <h3 style={{ color: 'var(--teal)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
253:              <h3 style={{ color: 'var(--teal)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
261:              <h3 style={{ color: 'var(--teal)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
305:           <h3 style={{ fontSize: '1.3rem', color: 'var(--teal)', fontWeight: 500, fontFamily: 'var(--serif)', fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><ChevronRight size={20} color="var(--teal)" className="shrink-0" /> No gaps. No delays. No missed opportunities.</h3>
319:            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem'}}>Turn your existing website into a 24/7 patient conversion engine — without rebuilding it.</p>
338:            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem'}}>Turn your website into a 24/7 patient conversion engine.</p>
357:            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem'}}>Drive high-intent patients actively searching for treatment.</p>
376:            <p style={{fontSize: '0.85rem', color: 'rgba(0,194,168,0.7)', marginTop: '0.5rem'}}>Attract, convert, and deliver booked patients automatically.</p>
394:          <h3 style={{ fontSize: '1.4rem', color: 'var(--white)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
405:          <p style={{ fontSize: '1.2rem', color: 'var(--teal)', fontWeight: 500, fontFamily: 'var(--serif)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><ChevronRight size={20} color="var(--teal)" className="shrink-0" /> Even 1–2 patients/month = massive ROI.</p>
408:        <p style={{textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2rem'}}>Ad spend is paid directly to Google/Meta by you. We charge only for management.</p>
555:             <h3 style={{ fontSize: '1.2rem', color: 'var(--white)' }}>Simple & Direct</h3>
556:             <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', flex: 1 }}>Prefer a simple text or email? Reach out directly to our human team and we will reply instantly.</p>
570:             <h3 style={{ fontSize: '1.2rem', color: 'var(--white)' }}>Book a Strategy Call</h3>
571:             <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', flex: 1 }}>Pick a time that works for you. We'll run a live assessment of your current setup and show you the AI system in action.</p>
580:             <h3 style={{ fontSize: '1.2rem', color: 'var(--white)' }}>Ask AI Receptionist</h3>
581:             <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', flex: 1 }}>Have a quick question about pricing or features? Ask our own AI Sales Agent for an instant answer right now.</p>
596:            <div className="footer-logo" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '0px', width: '100%', color: 'var(--white)', fontWeight: '600', fontSize: '1.4rem', letterSpacing: '0.5px' }}>`;

const mapApp = {};
for (const line of originalApp.split('\\n')) {
  const parts = line.split(':');
  if (parts.length >= 2) {
    const lineNo = parseInt(parts[0], 10);
    const content = parts.slice(1).join(':');
    mapApp[lineNo] = content;
  }
}

let appFile = fs.readFileSync('src/App.tsx', 'utf8').split('\\n');
for (const [lineNo, content] of Object.entries(mapApp)) {
  appFile[lineNo - 1] = content;
}
fs.writeFileSync('src/App.tsx', appFile.join('\\n'));

console.log('Restoration Done!');
