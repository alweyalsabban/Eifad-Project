import { Brain } from "lucide-react";

type Props = {
  score: number;
};

function getScoreStyles(score: number) {
  if (score >= 80) {
    return {
      text: "text-green-600",
      bar: "bg-green-600",
      icon: "text-green-600",
    };
  }

  if (score >= 60) {
    return {
      text: "text-yellow-600",
      bar: "bg-yellow-500",
      icon: "text-yellow-600",
    };
  }

  return {
    text: "text-red-600",
    bar: "bg-red-600",
    icon: "text-red-600",
  };
}

export default function AnalysisScoreBar({ score }: Props) {
  const styles = getScoreStyles(score);

  return (
    <div>
      <p className="mb-2 text-sm text-slate-500">AI Analysis</p>

      <div className="flex items-center gap-2">
        <Brain className={styles.icon} size={16} />
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className={`h-2 rounded-full ${styles.bar}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className={`text-sm font-bold ${styles.text}`}>{score}%</span>
      </div>
    </div>
  );
}
