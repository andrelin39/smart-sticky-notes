import { useState, useRef } from 'react';
import { uid } from '../utils/helpers';

export default function SubtaskEditor({ subtasks, onChange }) {
  const [newText, setNewText] = useState("");
  const listEndRef = useRef(null);
  const inputRef = useRef(null);

  const toggle = (id) => onChange(subtasks.map(s => s.id === id ? { ...s, done: !s.done } : s));
  const remove = (id) => onChange(subtasks.filter(s => s.id !== id));
  const add = () => {
    if (newText.trim()) {
      onChange([...subtasks, { id: uid(), text: newText.trim(), done: false }]);
      setNewText("");
      setTimeout(() => {
        listEndRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 50);
    }
  };

  const doneCount = subtasks.filter(s => s.done).length;

  return (
    <div>
      {subtasks.length > 0 && (
        <div style={{ fontSize: 11, color: "#64748B", marginBottom: 6 }}>
          已完成 {doneCount}/{subtasks.length}
        </div>
      )}
      <div style={{ maxHeight: 240, overflowY: "auto", paddingRight: 4 }}>
        {subtasks.map((s, i) => (
          <div key={s.id}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0", borderBottom: "1px solid #F8FAFC" }}
            onMouseEnter={e => { const b = e.currentTarget.querySelector('.del-btn'); if (b) b.style.opacity = 1; }}
            onMouseLeave={e => { const b = e.currentTarget.querySelector('.del-btn'); if (b) b.style.opacity = 0; }}>
            <span style={{ fontSize: 10, color: "#CBD5E1", minWidth: 16, textAlign: "right" }}>{i + 1}.</span>
            <button onClick={() => toggle(s.id)}
              style={{ fontSize: 15, background: "none", border: "none", cursor: "pointer", color: s.done ? "#10B981" : "#CBD5E1", padding: 0, lineHeight: 1 }}>
              {s.done ? "☑" : "☐"}
            </button>
            <span style={{ fontSize: 12, flex: 1, textDecoration: s.done ? "line-through" : "none", color: s.done ? "#94A3B8" : "#334155" }}>{s.text}</span>
            <button className="del-btn" onClick={() => remove(s.id)}
              style={{ fontSize: 11, color: "#EF4444", cursor: "pointer", background: "none", border: "none", padding: "2px 4px", opacity: 0, transition: "opacity 0.2s" }}>✕</button>
          </div>
        ))}
        <div ref={listEndRef} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, padding: "6px 8px", background: "#F8FAFC", borderRadius: 8 }}>
        <span style={{ fontSize: 14, color: "#94A3B8" }}>＋</span>
        <input ref={inputRef} value={newText} onChange={e => setNewText(e.target.value)}
          placeholder="輸入子任務後按 Enter 新增…"
          onKeyDown={e => { if (e.key === "Enter") add(); }}
          style={{ fontSize: 12, border: "none", background: "transparent", outline: "none", flex: 1, padding: "2px 0", color: "#475569" }} />
        {newText.trim() && (
          <button onClick={add}
            style={{ fontSize: 11, padding: "2px 10px", borderRadius: 6, background: "#3B82F6", color: "white", border: "none", cursor: "pointer", fontWeight: 600 }}>
            新增
          </button>
        )}
      </div>
    </div>
  );
}
