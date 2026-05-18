import { RecentActivitiesProps } from "../../TypeAdmin";

export default function RecentActivities({
  heading = "آخر الأنشطة",
  activities,
}: RecentActivitiesProps) {
  return (
    <div className="w-full rounded-3xl border border-gray-200  p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-[#0b1b46]">{heading}</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between gap-4 py-5"
          >
            <div className="h-3 w-3 shrink-0 rounded-full bg-blue-600" />

            <div className="flex-1 text-right">
              <p className="font-medium text-[#0b1b46]">{activity.title}</p>
              <p className="mt-2 text-base text-[#6b7280]">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
