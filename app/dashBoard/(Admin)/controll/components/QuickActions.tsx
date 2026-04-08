import { QuickActionsProps } from "../../TypeAdmin";

export default function QuickActions({
  heading = "إجراءات سريعة",
  actions,
}: QuickActionsProps) {
  return (
    <div className="w-full h-90 rounded-[22px] border border-gray-200 p-6">
      <h2 className="mb-8 text-xl font-extrabold text-[#0b1b46]">{heading}</h2>

      <div className="space-y-4">
        {actions.map((action) => {
          return (
            <button
              key={action.id}
              type="button"
              onClick={action.onClick}
              className="flex w-full items-center gap-2  rounded-xl border border-gray-200 bg-white px-4 py-4 
               transition-all duration-200 hover:shadow-sm hover:cursor-pointer"
            >
              <action.icon className="text-[20px] text-gray-900" />
              <span className="text-md font-semibold text-[#111827]">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
