import { useState, useRef, useEffect } from 'react';
import { COLORS, STATUSES, PRIORITIES, TAGS } from '../utils/constants';
import SubtaskEditor from './SubtaskEditor';
import FileLinksEditor from './FileLinksEditor';

export default function EditModal({ note, dispatch, onClose }) {
  const [form, setForm] = useState({ ...note });
  const c = COLORS[form.colorIdx] || COLORS[0];
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current && !form.title) titleRef.current.focus();
  }, []);

  const save = () => {
    dispatch({ type: "UPDATE_NOTE", id: note.id, payload: form });
    onClose();
  };

  const del = () => {
    if (confirm("確定要刪除這張便利貼嗎？")) {
      dispatch({ type: "DELETE_NOTE", id: note.id });
      onClose();
    }
  };

  const sel = {
    fontSize: 12, padding: "5px 10px", borderRadius: 8, border: "1px solid #E2E8F0",
    background: "white", color: "#334155", outline: "none", cursor: "pointer",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      onClick={onClose}>
      <div className="modal-in" onClick={e => e.stopPropagation()}
        style={{ background: "white", borderRadius: 16, padding: "28px 28px 20px", width: "100%", maxWidth: 520, maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.2)", borderTop: "4px solid " + c.border }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1E293B" }}>📝 編輯便利貼</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#94A3B8", lineHeight: 1 }}>✕</button>
        </div>

        <input ref={titleRef} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
          placeholder="輸入標題…"
          style={{ width: "100%", fontSize: 16, fontWeight: 700, border: "none", borderBottom: "2px solid " + c.border, padding: "8px 0", marginBottom: 20, outline: "none", background: "transparent", color: "#1E293B" }} />

        {/* Status, Priority, Due */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <div>
            <label style={{ fontSize: 11, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 4 }}>狀態</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={sel}>
              {STATUSES.map(s => <option key={s.key} value={s.key}>{s.icon} {s.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 4 }}>優先級</label>
            <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} style={sel}>
              {PRIORITIES.map(p => <option key={p.key} value={p.key}>{p.icon} {p.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 4 }}>到期日</label>
            <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} style={sel} />
          </div>
        </div>

        {/* Color */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 6 }}>顏色</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {COLORS.map((cl, i) => (
              <button key={i} onClick={() => setForm({ ...form, colorIdx: i })}
                style={{ width: 30, height: 30, borderRadius: "50%", background: cl.bg, border: form.colorIdx === i ? "3px solid " + cl.border : "2px solid #E2E8F0", cursor: "pointer", transition: "transform 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
                onMouseLeave={e => e.currentTarget.style.transform = ""} />
            ))}
          </div>
        </div>

        {/* Tags */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 6 }}>標籤</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {TAGS.map(t => {
              const active = form.tags.includes(t);
              return (
                <button key={t} onClick={() => setForm({ ...form, tags: active ? form.tags.filter(x => x !== t) : [...form.tags, t] })}
                  style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, cursor: "pointer", fontWeight: 500, transition: "all 0.15s",
                    background: active ? c.border + "22" : "#F1F5F9", color: active ? c.accent : "#94A3B8", border: active ? "1px solid " + c.border + "44" : "1px solid transparent" }}>
                  #{t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Memo */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 6 }}>備註</label>
          <textarea value={form.memo || ""} onChange={e => setForm({ ...form, memo: e.target.value })}
            placeholder="記錄執行情況、注意事項…" rows={3}
            style={{ width: "100%", fontSize: 12, padding: "8px 10px", borderRadius: 8, border: "1px solid #E2E8F0", background: "#FAFBFC", outline: "none", resize: "vertical", color: "#334155", lineHeight: 1.6, fontFamily: "inherit", boxSizing: "border-box" }} />
        </div>

        {/* File Links */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 6 }}>📎 檔案連結</label>
          <FileLinksEditor fileLinks={form.fileLinks || []} onChange={links => setForm({ ...form, fileLinks: links })} accentColor={c.border} />
        </div>

        {/* Subtasks */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 11, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 6 }}>子任務</label>
          <SubtaskEditor subtasks={form.subtasks} onChange={subs => setForm({ ...form, subtasks: subs })} />
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 12, borderTop: "1px solid #F1F5F9" }}>
          <button onClick={del}
            style={{ fontSize: 13, padding: "8px 16px", borderRadius: 8, background: "#FEE2E2", color: "#DC2626", border: "none", cursor: "pointer", fontWeight: 600 }}>
            🗑 刪除
          </button>
          <button onClick={save}
            style={{ fontSize: 13, padding: "8px 22px", borderRadius: 8, background: c.border, color: "white", border: "none", cursor: "pointer", fontWeight: 700, boxShadow: "0 2px 8px " + c.border + "44" }}>
            ✓ 儲存
          </button>
        </div>
      </div>
    </div>
  );
}
