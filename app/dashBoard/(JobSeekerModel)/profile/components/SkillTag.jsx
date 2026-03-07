import { XMarkIcon } from "@heroicons/react/24/outline";

export default function SkillTag({ skill, onRemove }) {
  return (
    <div
      className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl 
    hover:bg-blue-200 transition hover:cursor-pointer w-fit"
      onClick={onRemove}
    >
      <XMarkIcon className="w-4 h-4 hover:cursor-pointer" />

      <span className="text-sm font-medium">{skill}</span>
    </div>
  );
}
