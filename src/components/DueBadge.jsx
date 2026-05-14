import { daysBetween, todayStr, formatDate } from '../utils/helpers';

export default function DueBadge({ dueDate, status }) {
  if (!dueDate) return null;
  const diff = daysBetween(dueDate, todayStr());
  const isDone = status === "done";
  let label, bg, color;

  if (isDone) {
    label = "✓ " + formatDate(dueDate); bg = "#D1FAE5"; color = "#065F46";
  } else if (diff < 0) {
    label = "逾期 " + (-diff) + " 天"; bg = "#FEE2E2"; color = "#DC2626";
  } else if (diff === 0) {
    label = "今天到期！"; bg = "#FEF3C7"; color = "#B45309";
  } else if (diff <= 2) {
    label = "剩 " + diff + " 天"; bg = "#FFEDD5"; color = "#C2410C";
  } else {
    label = formatDate(dueDate); bg = "#F1F5F9"; color = "#64748B";
  }

  return (
    <span
      style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: bg, color, fontWeight: 600, whiteSpace: "nowrap" }}
      className={diff < 0 && !isDone ? "animate-pulse" : ""}
    >
      {label}
    </span>
  );
}
