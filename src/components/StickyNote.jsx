import { COLORS, PRIORITIES, STATUSES } from '../utils/constants';
import { daysBetween, todayStr, getFileIcon } from '../utils/helpers';
import DueBadge from './DueBadge';
import ProgressBar from './ProgressBar';

export default function StickyNote({ note, onEdit }) {
  const c = COLORS[note.colorIdx] || COLORS[0];
  const pri = PRIORITIES.find(p => p.key === note.priority);
  const st = STATUSES.find(s => s.key === note.status);
  const diff = note.dueDate ? daysBetween(note.dueDate, todayStr()) : null;
  const isOverdue = diff !== null && diff < 0 && note.status !== "done";

  return (
    <div onClick={() => onEdit(note)} className="fade-in" style={{
      background: c.bg, borderLeft: "4px solid " + c.border, borderRadius: 6, padding: "14px 16px",
      cursor: "pointer", position: "relative",
      boxShadow: isOverdue ? "0 0 0 2px #EF4444, 0 4px 16px rgba(0,0,0,0.08)" : "0 2px 8px rgba(0,0,0,0.06)",
      transition: "transform 0.15s ease, box-shadow 0.15s ease",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = isOverdue ? "0 0 0 2px #EF4444, 0 4px 16px rgba(0,0,0,0.08)" : "0 2px 8px rgba(0,0,0,0.06)"; }}>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12 }}>{pri.icon}</span>
          <span style={{ fontSize: 11, color: st.color, fontWeight: 600 }}>{st.icon} {st.label}</span>
        </div>
        <DueBadge dueDate={note.dueDate} status={note.status} />
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 700, color: c.text, margin: "4px 0 6px", lineHeight: 1.4,
        textDecoration: note.status === "done" ? "line-through" : "none", opacity: note.status === "done" ? 0.6 : 1 }}>
        {note.title || "未命名便利貼"}
      </h3>

      {note.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 4 }}>
          {note.tags.map(t => <span key={t} style={{ fontSize: 10, padding: "1px 6px", borderRadius: 99, background: c.border + "22", color: c.accent, fontWeight: 500 }}>#{t}</span>)}
        </div>
      )}

      {note.memo && (
        <div style={{ fontSize: 11, color: "#64748B", marginTop: 4, padding: "4px 6px", background: "rgba(255,255,255,0.5)", borderRadius: 4, lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          📝 {note.memo}
        </div>
      )}

      {note.fileLinks && note.fileLinks.length > 0 && (
        <div style={{ fontSize: 11, color: "#64748B", marginTop: 4, display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
          <span>📎</span>
          {note.fileLinks.slice(0, 3).map(f => (
            <span key={f.id} style={{ padding: "1px 6px", borderRadius: 4, background: "rgba(255,255,255,0.6)", fontSize: 10, maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block" }}>
              {getFileIcon(f.url, f.name)} {f.name}
            </span>
          ))}
          {note.fileLinks.length > 3 && <span style={{ fontSize: 10, color: "#94A3B8" }}>+{note.fileLinks.length - 3}</span>}
        </div>
      )}

      {note.subtasks.length > 0 && (
        <div style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>☑ {note.subtasks.filter(s => s.done).length}/{note.subtasks.length} 子任務</div>
      )}

      <ProgressBar note={note} />
    </div>
  );
}
