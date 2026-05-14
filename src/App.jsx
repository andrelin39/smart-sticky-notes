import { useState, useEffect, useReducer } from 'react';
import { COLORS, STATUSES, PRIORITIES, TAGS } from './utils/constants';
import { defaultNote, loadData, sampleNotes, daysBetween, todayStr } from './utils/helpers';
import { reducer } from './utils/reducer';
import StickyNote from './components/StickyNote';
import EditModal from './components/EditModal';
import StatsDashboard from './components/StatsDashboard';
import DueBadge from './components/DueBadge';
import './App.css';

const initState = {
  notes: loadData() || sampleNotes(),
  view: "board",
  filter: { status: "all", priority: "all", tag: "all" },
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const [editNote, setEditNote] = useState(null);
  const [sortBy, setSortBy] = useState("priority");

  // Notification
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    const iv = setInterval(() => {
      const overdue = state.notes.filter(n => n.dueDate && daysBetween(n.dueDate, todayStr()) < 0 && n.status !== "done");
      if (overdue.length > 0 && "Notification" in window && Notification.permission === "granted") {
        new Notification("📌 Smart Sticky Notes", { body: "你有 " + overdue.length + " 項任務已逾期！" });
      }
    }, 60000);
    return () => clearInterval(iv);
  }, [state.notes]);

  const filtered = state.notes.filter(n => {
    if (state.filter.status !== "all" && n.status !== state.filter.status) return false;
    if (state.filter.priority !== "all" && n.priority !== state.filter.priority) return false;
    if (state.filter.tag !== "all" && !n.tags.includes(state.filter.tag)) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "priority") return PRIORITIES.find(p => p.key === a.priority).sort - PRIORITIES.find(p => p.key === b.priority).sort;
    if (sortBy === "dueDate") return (a.dueDate || "9999").localeCompare(b.dueDate || "9999");
    if (sortBy === "status") return STATUSES.findIndex(s => s.key === a.status) - STATUSES.findIndex(s => s.key === b.status);
    return 0;
  });

  const boardGroups = STATUSES.map(s => ({ ...s, notes: sorted.filter(n => n.status === s.key) }));

  const addNew = () => {
    const n = defaultNote();
    dispatch({ type: "ADD_NOTE", payload: n });
    setEditNote(n);
  };

  const chip = (active) => ({
    fontSize: 11, padding: "4px 12px", borderRadius: 99, cursor: "pointer", fontWeight: active ? 700 : 500,
    background: active ? "#1E293B" : "#F1F5F9", color: active ? "white" : "#64748B", border: "none", transition: "all 0.15s",
  });

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ padding: "20px 24px 0", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#1E293B", letterSpacing: -0.5 }}>
              <span style={{ display: "inline-block", transform: "rotate(-3deg)", marginRight: 8 }}>📌</span>
              Smart Sticky Notes
            </h1>
            <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>你的研究任務，一目了然</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {["board", "list", "stats"].map(v => (
              <button key={v} onClick={() => dispatch({ type: "SET_VIEW", view: v })} style={{ ...chip(state.view === v), padding: "6px 14px", fontSize: 12 }}>
                {v === "board" ? "📋 看板" : v === "list" ? "📄 列表" : "📊 統計"}
              </button>
            ))}
            <button onClick={addNew} style={{ fontSize: 13, padding: "6px 16px", borderRadius: 99, background: "#1E293B", color: "white", border: "none", cursor: "pointer", fontWeight: 700, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
              ＋ 新增
            </button>
          </div>
        </div>

        {/* Filters */}
        {state.view !== "stats" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16, marginBottom: 8, padding: "12px 16px", background: "rgba(255,255,255,0.7)", borderRadius: 12, backdropFilter: "blur(8px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600 }}>狀態</span>
              {[{ key: "all", label: "全部" }, ...STATUSES].map(s => (
                <button key={s.key} onClick={() => dispatch({ type: "SET_FILTER", payload: { status: s.key } })} style={chip(state.filter.status === s.key)}>{s.label}</button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600 }}>優先</span>
              {[{ key: "all", label: "全部", icon: "" }, ...PRIORITIES].map(p => (
                <button key={p.key} onClick={() => dispatch({ type: "SET_FILTER", payload: { priority: p.key } })} style={chip(state.filter.priority === p.key)}>{p.icon ? p.icon + " " : ""}{p.label}</button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600 }}>標籤</span>
              <button onClick={() => dispatch({ type: "SET_FILTER", payload: { tag: "all" } })} style={chip(state.filter.tag === "all")}>全部</button>
              {TAGS.map(t => (
                <button key={t} onClick={() => dispatch({ type: "SET_FILTER", payload: { tag: t } })} style={chip(state.filter.tag === t)}>#{t}</button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600 }}>排序</span>
              {[{ key: "priority", label: "優先級" }, { key: "dueDate", label: "到期日" }, { key: "status", label: "狀態" }].map(s => (
                <button key={s.key} onClick={() => setSortBy(s.key)} style={chip(sortBy === s.key)}>{s.label}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "8px 24px 40px" }}>
        {state.view === "stats" ? <StatsDashboard notes={state.notes} /> :
         state.view === "board" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 8 }}>
            {boardGroups.map(group => (
              <div key={group.key}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, paddingLeft: 4 }}>
                  <span style={{ fontSize: 14, color: group.color, fontWeight: 800 }}>{group.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#475569" }}>{group.label}</span>
                  <span style={{ fontSize: 11, background: "#F1F5F9", borderRadius: 99, padding: "1px 8px", color: "#94A3B8", fontWeight: 600 }}>{group.notes.length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {group.notes.map(n => <StickyNote key={n.id} note={n} onEdit={setEditNote} />)}
                  {group.notes.length === 0 && (
                    <div style={{ padding: 24, textAlign: "center", color: "#CBD5E1", fontSize: 12, border: "2px dashed #E2E8F0", borderRadius: 8 }}>沒有任務</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
            {sorted.map(n => {
              const st = STATUSES.find(s => s.key === n.status);
              return (
                <div key={n.id} onClick={() => setEditNote(n)} className="fade-in"
                  style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.8)", borderRadius: 10, padding: "10px 16px",
                    cursor: "pointer", borderLeft: "4px solid " + (COLORS[n.colorIdx] || COLORS[0]).border, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", transition: "transform 0.1s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = ""}>
                  <button onClick={e => { e.stopPropagation(); const next = n.status === "todo" ? "doing" : n.status === "doing" ? "done" : "todo"; dispatch({ type: "UPDATE_NOTE", id: n.id, payload: { status: next } }); }}
                    style={{ fontSize: 18, background: "none", border: "none", cursor: "pointer", color: st.color, padding: 0, lineHeight: 1 }}>{st.icon}</button>
                  <span style={{ fontSize: 12 }}>{PRIORITIES.find(p => p.key === n.priority).icon}</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "#1E293B", textDecoration: n.status === "done" ? "line-through" : "none", opacity: n.status === "done" ? 0.5 : 1 }}>{n.title || "未命名"}</span>
                  {n.tags.map(t => <span key={t} style={{ fontSize: 10, padding: "1px 6px", borderRadius: 99, background: "#F1F5F9", color: "#64748B" }}>#{t}</span>)}
                  {n.subtasks.length > 0 && <span style={{ fontSize: 10, color: "#94A3B8" }}>☑{n.subtasks.filter(s => s.done).length}/{n.subtasks.length}</span>}
                  <DueBadge dueDate={n.dueDate} status={n.status} />
                </div>
              );
            })}
            {sorted.length === 0 && <div style={{ padding: 40, textAlign: "center", color: "#94A3B8", fontSize: 14 }}>沒有符合篩選條件的任務</div>}
          </div>
        )}
      </div>

      {editNote && <EditModal note={editNote} dispatch={dispatch} onClose={() => setEditNote(null)} />}
    </div>
  );
}
