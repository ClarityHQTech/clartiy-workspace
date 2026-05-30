export function TopBar() {
  return (
    <header className="topbar">
      <div className="brand">
        <svg className="star" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c.6 6.4 5 10.8 11.4 11.4C17 12 12.6 16.4 12 22.8 11.4 16.4 7 12 0 11.4 6.4 10.8 11.4 6.4 12 0z" />
        </svg>
        <div>
          <span className="brand-name">Clarity Workspace</span>
          <span className="brand-sub">Agency Operator View</span>
        </div>
      </div>
      <div className="topbar-right">
        <div className="live-pill">
          <span className="dot live" /> All systems live
        </div>
        <div className="operator">
          <div className="op-avatar">AJ</div>
          <div className="op-meta">
            <div className="op-name">Arihant Jain</div>
            <div className="op-role">Clarity HQ</div>
          </div>
        </div>
      </div>
    </header>
  );
}
