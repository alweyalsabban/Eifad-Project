import { FiEdit2, FiEye } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { Undo2 } from "lucide-react";
import type { JobStatus } from "../../TypeAdmin";

type Props = {
  status: JobStatus;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onRestore: () => void;
};

export default function JobRowActions({
  status,
  onView,
  onEdit,
  onDelete,
  onRestore,
}: Props) {
  return (
    <div className="flex items-center gap-4">
      {status === "محذوفة" ? (
        <button
          type="button"
          onClick={onRestore}
          className="text-blue-600 transition hover:text-blue-700"
          title="إرجاع الوظيفة"
          aria-label="إرجاع الوظيفة"
        >
          <Undo2 size={17} />
        </button>
      ) : (
        <button
          type="button"
          onClick={onDelete}
          className="text-red-500 transition hover:text-red-600"
          title="حذف الوظيفة"
          aria-label="حذف الوظيفة"
        >
          <HiOutlineTrash size={18} />
        </button>
      )}

      <button
        type="button"
        onClick={onEdit}
        className="text-gray-700 transition hover:text-black"
        title="تعديل الوظيفة"
        aria-label="تعديل الوظيفة"
      >
        <FiEdit2 size={18} />
      </button>

      <button
        type="button"
        onClick={onView}
        className="text-gray-700 transition hover:text-black"
        title="عرض الوظيفة"
        aria-label="عرض الوظيفة"
      >
        <FiEye size={18} />
      </button>
    </div>
  );
}
