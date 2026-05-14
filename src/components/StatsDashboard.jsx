import { PRIORITIES, TAGS } from '../utils/constants';
import { daysBetween, todayStr } from '../utils/helpers';

export default function StatsDashboard({ notes }) {
  const total = notes.length;
  const done = notes.filter(n => n.status === "done").length;
  const doing = notes.filter(n => n.status === "doing").length;
  const todo = notes.filter(n => n.status === "todo").length;
  const overdue = notes.filter(n => n.dueDate && daysBetween(n.dueDate, todayStr()) < 0 && n.status !== "done").length;
  const rate = total > 0 ? Math.round(done / total * 100) : 0;
  const allSubs = notes.flatMap(n => n.subtasks);
  const subDone = allSubs.filter(s => s.done).length;
  const subTotal = allSubs.length;
  const byPriority = PRIORITIES.map(p => ({ ...p, count: notes.filter(n => n.priority === p.key && n.status !== "done").length }));
  const byTag = TAGS.map(t => ({ tag: t, count: notes.filter(n => n.tags.includes(t)).length })).filter(t => t.count > 0).sort((a, b) => b.count - a.count);

  const box = { background: "white", borderRadius: 12, padding: "16px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" };
  const big = { fontSize: 32, fontWeight: 800, lineHeight: 1 };
  const sm = { fontSize: 11, color: "#64748B", fontWeight: 500, marginTop: 4 };

  return (
    <div style={{ padding: "8px 0" }}>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1E293B", marginBottom: 16 }}>📊 數據總覽</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 520, marginBottom: 12 }}>
        <div style={box}>
          <div style={{ ...big, color: "#3B82F6" }}>{rate}%</div>
          <div style={sm}>完成率（{done}/{total}）</div>
          <div style={{ height: 6, borderRadius: 6, background: "#E2E8F0", marginTop: 8, overflow: "hidden" }}>
            <div style={{ width: rate + "%", height: "100%", borderRadius: 6, background: "linear-gradient(90deg, #3B82F6, #10B981)", transition: "width 0.8s" }} />
          </div>
        </div>
        <div style={box}>
          <div style={{ ...big, color: overdue > 0 ? "#EF4444" : "#10B981" }}>{overdue}</div>
          <div style={sm}>逾期任務</div>
          {overdue > 0 && <div style={{ fontSize: 11, color: "#EF4444", marginTop: 4 }}>⚠ 需要立即處理</div>}
        </div>
        <div style={box}>
          <div style={{ display: "flex", gap: 16 }}>
            <div><div style={{ ...big, fontSize: 24, color: "#94A3B8" }}>{todo}</div><div style={sm}>待辦</div></div>
            <div><div style={{ ...big, fontSize: 24, color: "#3B82F6" }}>{doing}</div><div style={sm}>進行中</div></div>
            <div><div style={{ ...big, fontSize: 24, color: "#10B981" }}>{done}</div><div style={sm}>完成</div></div>
          </div>
        </div>
        <div style={box}>
          <div style={{ ...big, fontSize: 24, color: "#8B5CF6" }}>{subDone}/{subTotal}</div>
          <div style={sm}>子任務完成</div>
        </div>
      </div>
      <div style={{ ...box, marginBottom: 12, maxWidth: 520 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 8 }}>未完成任務 — 優先級分佈</div>
        {byPriority.map(p => (
          <div key={p.key} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 12, width: 55 }}>{p.icon} {p.label}</span>
            <div style={{ flex: 1, height: 8, borderRadius: 4, background: "#F1F5F9", overflow: "hidden" }}>
              <div style={{ width: (total > 0 ? p.count / total * 100 : 0) + "%", height: "100%", borderRadius: 4, background: p.key === "urgent" ? "#EF4444" : p.key === "high" ? "#F97316" : p.key === "medium" ? "#EAB308" : "#22C55E" }} />
            </div>
            <span style={{ fontSize: 11, color: "#64748B", width: 20, textAlign: "right" }}>{p.count}</span>
          </div>
        ))}
      </div>
      {byTag.length > 0 && (
        <div style={{ ...box, maxWidth: 520 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 8 }}>標籤分佈</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {byTag.map(t => (
              <span key={t.tag} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 99, background: "#F1F5F9", color: "#475569", fontWeight: 500 }}>
                #{t.tag} <span style={{ fontWeight: 700, color: "#3B82F6" }}>{t.count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
