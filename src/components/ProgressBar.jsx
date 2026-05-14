export default function ProgressBar({ note }) {
  const sub = note.subtasks;
  const pct = sub.length > 0
    ? Math.round(sub.filter(s => s.done).length / sub.length * 100)
    : note.progress;
  const clr = pct === 100 ? "#10B981" : pct > 50 ? "#3B82F6" : pct > 0 ? "#EAB308" : "#CBD5E1";

  return (
    <div style={{ width: "100%", marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 10, color: "#64748B" }}>進度</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: clr }}>{pct}%</span>
      </div>
      <div style={{ height: 4, borderRadius: 4, background: "#E2E8F0", overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", borderRadius: 4, background: clr, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}
