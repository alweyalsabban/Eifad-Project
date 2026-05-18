import { Brain } from "lucide-react";

type Props = {
  score: number;
};

function getStyles(score: number) {
  if (score >= 80) return { text: "text-green-600", bar: "bg-green-600" };
  if (score >= 60) return { text: "text-yellow-600", bar: "bg-yellow-500" };
  return { text: "text-red-600", bar: "bg-red-600" };
}

export default function ScoreBar({ score }: Props) {
  const styles = getStyles(score);

  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm font-semibold ${styles.text}`}>{score}%</span>

      <div className="h-2 w-28 rounded-full bg-gray-200">
        <div
          className={`h-2 rounded-full ${styles.bar}`}
          style={{ width: `${score}%` }}
        />
      </div>

      <Brain size={16} className={styles.text} />
    </div>
  );
}
