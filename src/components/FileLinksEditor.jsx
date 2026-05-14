import { useState, useRef } from 'react';
import { uid, getFileIcon, getLinkType } from '../utils/helpers';

export default function FileLinksEditor({ fileLinks, onChange, accentColor }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [copied, setCopied] = useState(null);
  const nameRef = useRef(null);

  const add = () => {
    if (newUrl.trim()) {
      const name = newName.trim() || newUrl.trim().split(/[/\\]/).pop() || "未命名檔案";
      const type = getLinkType(newUrl.trim());
      onChange([...fileLinks, { id: uid(), name, url: newUrl.trim(), type }]);
      setNewName(""); setNewUrl(""); setShowAdd(false);
    }
  };

  const remove = (id) => onChange(fileLinks.filter(f => f.id !== id));

  const openLink = (e, f) => {
    e.stopPropagation();
    if (f.type === "cloud") {
      window.open(f.url, "_blank");
    } else {
      copyPath(e, f);
    }
  };

  const copyPath = (e, f) => {
    e.stopPropagation();
    navigator.clipboard.writeText(f.url).then(() => {
      setCopied(f.id);
      setTimeout(() => setCopied(null), 1500);
    }).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = f.url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(f.id);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  const btnStyle = {
    fontSize: 10, padding: "3px 8px", borderRadius: 5, border: "none",
    cursor: "pointer", fontWeight: 600, transition: "all 0.15s", whiteSpace: "nowrap",
  };

  return (
    <div>
      {fileLinks.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 8 }}>
          {fileLinks.map(f => (
            <div key={f.id}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: "#F8FAFC", borderRadius: 8, border: "1px solid #F1F5F9", transition: "border-color 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#CBD5E1"; const b = e.currentTarget.querySelector('.fdel'); if (b) b.style.opacity = 1; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#F1F5F9"; const b = e.currentTarget.querySelector('.fdel'); if (b) b.style.opacity = 0; }}>
              <span style={{ fontSize: 16 }}>{getFileIcon(f.url, f.name)}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#334155", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                <div style={{ fontSize: 10, color: "#94A3B8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.url}</div>
              </div>
              <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 99, background: f.type === "cloud" ? "#DBEAFE" : "#F1F5F9", color: f.type === "cloud" ? "#2563EB" : "#64748B", fontWeight: 600, whiteSpace: "nowrap" }}>
                {f.type === "cloud" ? "☁ 雲端" : "💾 本機"}
              </span>
              {f.type === "cloud" && (
                <button onClick={e => openLink(e, f)}
                  style={{ ...btnStyle, background: "#DBEAFE", color: "#2563EB" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#3B82F6"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#DBEAFE"; e.currentTarget.style.color = "#2563EB"; }}>
                  開啟 ↗
                </button>
              )}
              <button onClick={e => copyPath(e, f)}
                style={{ ...btnStyle, background: copied === f.id ? "#D1FAE5" : "#F1F5F9", color: copied === f.id ? "#059669" : "#64748B" }}
                onMouseEnter={e => { if (copied !== f.id) e.currentTarget.style.background = "#E2E8F0"; }}
                onMouseLeave={e => { if (copied !== f.id) e.currentTarget.style.background = "#F1F5F9"; }}>
                {copied === f.id ? "✓ 已複製" : "複製路徑"}
              </button>
              <button className="fdel" onClick={() => remove(f.id)}
                style={{ fontSize: 12, color: "#EF4444", cursor: "pointer", background: "none", border: "none", padding: "2px 4px", opacity: 0, transition: "opacity 0.2s" }}>✕</button>
            </div>
          ))}
        </div>
      )}

      {showAdd ? (
        <div style={{ padding: "10px 12px", background: "#F8FAFC", borderRadius: 8, border: "1px dashed #CBD5E1" }}>
          <input ref={nameRef} value={newName} onChange={e => setNewName(e.target.value)}
            placeholder="檔案名稱（選填，如：報告草稿.docx）"
            style={{ width: "100%", fontSize: 12, border: "none", borderBottom: "1px solid #E2E8F0", background: "transparent", outline: "none", padding: "4px 0", marginBottom: 8, color: "#334155" }} />
          <input value={newUrl} onChange={e => setNewUrl(e.target.value)}
            placeholder="貼上檔案路徑或雲端連結…"
            onKeyDown={e => { if (e.key === "Enter") add(); }}
            style={{ width: "100%", fontSize: 12, border: "none", borderBottom: "1px solid #E2E8F0", background: "transparent", outline: "none", padding: "4px 0", marginBottom: 10, color: "#334155" }} />
          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
            <button onClick={() => { setShowAdd(false); setNewName(""); setNewUrl(""); }}
              style={{ fontSize: 11, padding: "4px 12px", borderRadius: 6, background: "#F1F5F9", color: "#64748B", border: "none", cursor: "pointer" }}>取消</button>
            <button onClick={add}
              style={{ fontSize: 11, padding: "4px 12px", borderRadius: 6, background: newUrl.trim() ? (accentColor || "#3B82F6") : "#E2E8F0", color: newUrl.trim() ? "white" : "#94A3B8", border: "none", cursor: newUrl.trim() ? "pointer" : "default", fontWeight: 600 }}>新增連結</button>
          </div>
          <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 8, lineHeight: 1.6 }}>
            💡 支援格式：本機路徑（如 C:\Research\data.xlsx）、Google Drive、Dropbox、OneDrive、Notion 或任何網址
          </div>
        </div>
      ) : (
        <button onClick={() => { setShowAdd(true); setTimeout(() => nameRef.current?.focus(), 50); }}
          style={{ fontSize: 12, padding: "6px 12px", borderRadius: 8, background: "#F8FAFC", color: "#64748B", border: "1px dashed #CBD5E1", cursor: "pointer", width: "100%", textAlign: "left", transition: "all 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor || "#3B82F6"; e.currentTarget.style.color = "#334155"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#CBD5E1"; e.currentTarget.style.color = "#64748B"; }}>
          📎 新增檔案連結…
        </button>
      )}
    </div>
  );
}
