import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const icons = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  layers: <><path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z"/><path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5"/></>,
  compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z"/></>,
  archive: <><path d="M4 7h16M5 7v12h14V7M7 4h10l2 3H5l2-3ZM9 11h6"/></>,
  settings: <><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/><path d="m19.4 15 .1.1a2 2 0 0 1-2.8 2.8l-.1-.1a2 2 0 0 0-3.4 1.4v.2a2 2 0 0 1-4 0v-.2a2 2 0 0 0-3.4-1.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A2 2 0 0 0 1.7 12a2 2 0 0 1 0-4h.2a2 2 0 0 0 1.4-3.4l-.1-.1A2 2 0 1 1 6 1.7l.1.1A2 2 0 0 0 9.5.4V.2a2 2 0 0 1 4 0v.2a2 2 0 0 0 3.4 1.4l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A2 2 0 0 0 21.1 8h.2a2 2 0 0 1 0 4h-.2a2 2 0 0 0-1.7 3Z" transform="translate(0 4) scale(.67)"/></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/></>,
  more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/></>,
  zap: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  trend: <><path d="m4 16 5-5 3 3 7-8"/><path d="M14 6h5v5"/></>,
  spark: <><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2ZM19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z"/></>
};

function Icon({ name, size = 18, className = '' }) {
  return <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}

const initialPlan = [
  { id: 1, label: 'Ship the workspace skeleton', note: 'Build the essential loop, not the full platform.', tag: 'Focus', done: true },
  { id: 2, label: 'Write the first-run story', note: 'Make the value obvious before the first click.', tag: 'Design', done: false },
  { id: 3, label: 'Decide persistence shape', note: 'Leave the seams ready for a real data layer.', tag: 'Architecture', done: false },
  { id: 4, label: 'Invite two sharp testers', note: 'Look for friction, not compliments.', tag: 'Later', done: false }
];

const activity = [
  { time: '09:42', title: 'Loop moved to Build', detail: 'The workspace skeleton became the active objective.', type: 'move' },
  { time: '09:18', title: 'Signal added to Now', detail: 'Write the first-run story was added to the plan.', type: 'add' },
  { time: 'Yesterday', title: 'Momentum checkpoint', detail: 'You completed 4 of 6 planned actions this week.', type: 'trend' }
];

function Sidebar({ active, setActive }) {
  const links = [['grid', 'Overview'], ['layers', 'Projects'], ['compass', 'Build loops'], ['archive', 'Library']];
  return <aside className="sidebar">
    <div className="brand"><span className="brand-mark"><span></span><span></span></span><span>loopforge</span></div>
    <div className="workspace-switcher"><div className="workspace-avatar">S</div><div><strong>Sovereign OS</strong><small>Personal workspace</small></div><Icon name="more" size={17}/></div>
    <nav aria-label="Primary navigation"><p className="nav-label">Workspace</p>{links.map(([icon, label]) => <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => setActive(label)}><Icon name={icon}/><span>{label}</span>{label === 'Build loops' && <span className="nav-count">1</span>}</button>)}</nav>
    <div className="sidebar-bottom"><button className="nav-item"><Icon name="settings"/><span>Settings</span></button><div className="sidebar-note"><span className="status-dot"></span><div><strong>Local-first mode</strong><small>Your work stays yours.</small></div></div><div className="profile"><div className="avatar">AS</div><div><strong>Abhii Sir</strong><small>Builder account</small></div><Icon name="more" size={17}/></div></div>
  </aside>;
}

function Topbar({ active, focusMode, setFocusMode }) {
  return <header className="topbar"><div className="breadcrumb"><span className="muted">{active}</span><Icon name="arrow" size={14}/><strong>Workspace pulse</strong></div><div className="top-actions"><button className={`focus-button ${focusMode ? 'is-on' : ''}`} onClick={() => setFocusMode(!focusMode)}><Icon name="zap" size={16}/>{focusMode ? 'Focus active' : 'Start focus'}<span className="shortcut">⌘ F</span></button><button className="icon-button" aria-label="Notifications"><Icon name="bell" size={18}/><span className="notification-dot"></span></button><div className="top-avatar">AS</div></div></header>;
}

function BuildLoop({ focusMode, setFocusMode, progress }) {
  return <section className={`hero-card panel-grid noise-card ${focusMode ? 'focus-active' : ''}`}><div className="hero-copy"><div className="eyebrow"><span className="live-pulse"></span>{focusMode ? 'Focus mode' : 'Active build loop'} <span className="eyebrow-divider">/</span> 04 of 06</div><h1>{focusMode ? <>Protect the<br/><em>signal.</em></> : <>Make the next<br/><em>useful thing.</em></>}</h1><p className="hero-subtitle">{focusMode ? 'Notifications are quiet. The next useful action has the floor.' : 'A small, opinionated command center for turning ideas into momentum.'}</p><div className="hero-meta"><span><Icon name="clock" size={15}/>{focusMode ? 'Deep work started' : 'Started today'}</span><span><Icon name="trend" size={15}/>+18% this week</span></div></div><div className="loop-orbit" role="progressbar" aria-label="Build loop progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}><div className="orbit-ring ring-back"></div><div className="orbit-ring ring-progress"></div><div className="orbit-core"><span>{progress}</span><small>%</small><label>in motion</label></div><span className="orbit-node node-one"></span><span className="orbit-node node-two"></span><span className="orbit-node node-three"></span></div><div className="hero-footer"><div><span className="footer-label">Current objective</span><strong>Ship the workspace skeleton</strong></div><button className="arrow-button" onClick={() => setFocusMode(!focusMode)} aria-label={focusMode ? 'Exit focus mode' : 'Enter focus mode'}><Icon name="arrow" size={20}/></button></div></section>;
}

function PlanColumn({ title, subtitle, items, onToggle, onAdd, accent }) {
  return <div className={`plan-column ${accent || ''}`}><div className="column-heading"><div><span className="column-kicker">{title}</span><small>{subtitle}</small></div><span className="item-count">{items.length}</span></div><div className="plan-items">{items.length ? items.map(item => <button className={`plan-item ${item.done ? 'done' : ''}`} key={item.id} onClick={() => onToggle(item.id)}><span className="check-box">{item.done && <Icon name="check" size={13}/>}</span><span className="plan-content"><strong>{item.label}</strong><small>{item.note}</small><span className="tag">{item.tag}</span></span><Icon name="more" size={16} className="item-more"/></button>) : <div className="empty-state"><Icon name="spark" size={15}/><span>Nothing queued here yet.</span></div>}</div>{title === 'Now' && <button className="add-item" onClick={onAdd}><Icon name="plus" size={15}/> Add a signal</button>}</div>;
}

function Metrics() {
  const metrics = [{ label: 'Throughput', value: '4.2', unit: 'actions / day', delta: '+12%', icon: 'trend', kind: 'orange' }, { label: 'Focus time', value: '6h 18m', unit: 'this week', delta: '+48m', icon: 'clock', kind: 'blue' }, { label: 'Momentum', value: '84', unit: 'out of 100', delta: 'healthy', icon: 'zap', kind: 'green' }];
  return <section className="metrics-section"><div className="section-heading"><div><span className="section-kicker">Signal check</span><h2>How the work is moving</h2></div><button className="text-button">Last 7 days <Icon name="arrow" size={15}/></button></div><div className="metric-grid">{metrics.map(metric => <article className="metric-card" key={metric.label}><div className={`metric-icon ${metric.kind}`}><Icon name={metric.icon} size={17}/></div><div className="metric-name">{metric.label}<span className="metric-delta">{metric.delta}</span></div><div className="metric-value">{metric.value}</div><div className="metric-unit">{metric.unit}</div><div className="sparkline"><span style={{ height: '35%' }}></span><span style={{ height: '48%' }}></span><span style={{ height: '42%' }}></span><span style={{ height: '60%' }}></span><span style={{ height: '54%' }}></span><span style={{ height: '73%' }}></span><span style={{ height: '88%' }}></span><span style={{ height: '76%' }}></span></div></article>)}</div></section>;
}

function ActivityFeed() {
  return <section className="activity-panel panel"><div className="section-heading compact"><div><span className="section-kicker">The trail</span><h2>Recent activity</h2></div><button className="icon-button subtle" aria-label="More activity options"><Icon name="more" size={18}/></button></div><div className="activity-list">{activity.map((item, index) => <div className="activity-item" key={item.time}><div className={`activity-icon activity-${item.type}`}><Icon name={item.type === 'trend' ? 'trend' : item.type === 'add' ? 'plus' : 'arrow'} size={15}/></div><div className="activity-copy"><strong>{item.title}</strong><p>{item.detail}</p></div><time>{item.time}</time>{index < activity.length - 1 && <span className="activity-line"/>}</div>)}</div><button className="view-all">View full history <Icon name="arrow" size={15}/></button></section>;
}

function App() {
  const [active, setActive] = useState('Overview');
  const [focusMode, setFocusMode] = useState(false);
  const [plan, setPlan] = useState(initialPlan);
  const togglePlan = id => setPlan(current => current.map(item => item.id === id ? { ...item, done: !item.done } : item));
  const addSignal = () => setPlan(current => [...current, { id: Date.now(), label: 'Name the next useful action', note: 'A small signal is better than an abstract ambition.', tag: 'New', done: false }]);
  const columns = useMemo(() => ({ now: plan.filter(item => item.id <= 2 || item.tag === 'New'), next: plan.filter(item => item.id === 3), later: plan.filter(item => item.id === 4) }), [plan]);
  const progress = Math.round((plan.filter(item => item.done).length / Math.max(plan.length, 1)) * 100);
  const dateLabel = new Intl.DateTimeFormat('en-US', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }).format(new Date());
  return <div className="app-shell"><Sidebar active={active} setActive={setActive}/><main className="main"><Topbar active={active} focusMode={focusMode} setFocusMode={setFocusMode}/><div className="content"><div className="welcome-row"><div><p className="greeting">{dateLabel} <span className="sun-dot">●</span></p><h2 className="page-title">Good morning, Abhii.</h2></div><div className="header-note"><span className="mini-line"></span><span>One clear loop<br/><strong>beats ten open tabs.</strong></span></div></div><BuildLoop focusMode={focusMode} setFocusMode={setFocusMode} progress={progress}/><section className="planning-section"><div className="section-heading"><div><span className="section-kicker">The plan</span><h2>Keep the signal clear</h2></div><button className="text-button" onClick={() => setActive('Build loops')}>Open planning view <Icon name="arrow" size={15}/></button></div><div className="plan-grid"><PlanColumn title="Now" subtitle="Do this next" items={columns.now} onToggle={togglePlan} onAdd={addSignal} accent="now-column"/><PlanColumn title="Next" subtitle="Queue with intent" items={columns.next} onToggle={togglePlan} accent="next-column"/><PlanColumn title="Later" subtitle="Not lost. Not now." items={columns.later} onToggle={togglePlan} accent="later-column"/></div></section><Metrics/><ActivityFeed/><footer className="footer"><span>Loopforge <b>v0.1</b></span><span>Built for deliberate momentum <span className="footer-spark">✦</span></span></footer></div></main></div>;
}

createRoot(document.getElementById('root')).render(<App />);
