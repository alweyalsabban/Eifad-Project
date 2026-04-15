type StatusTagProps = {
  text: string;
  variant: "success" | "warning" | "danger" | "neutral";
};

const variants = {
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
  neutral: "bg-gray-100 text-gray-700",
};

export default function StatusTag({ text, variant }: StatusTagProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${variants[variant]}`}
    >
      {text}
    </span>
  );
}
