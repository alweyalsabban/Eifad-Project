import { CalendarDaysIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { ApiFetchServer } from "../../../../lib/ApiFetchServer";
import { toast } from "react-toastify";

const STEPS = ["مقدّم", "مقبول"];

function getStepIndex(step) {
  const idx = STEPS.indexOf(step);
  return idx === -1 ? 0 : idx;
}

export default function ApplicationCard({
  applicationId,
  title,
  company,
  date, // "01-02-2024"
  statusLabel, // "مقابلة" | "مقبول" | ...
  statusVariant = "info", // "info" | "success"
  currentStep = "مراجعة",
  showWithdraw = false,
  onWithdrawSuccess,
}) {
  const activeIdx = getStepIndex(currentStep);
  async function onWithdraw() {
    const res = await ApiFetchServer(
      `/applications/${applicationId}/withdraw`,
      "POST",
    );
    if (res.isSusses) {
      toast.success("تم سحب الطلب");
      onWithdrawSuccess?.(applicationId);
    } else toast.error("هناك مشكلة في سحب الطلب");
  }

  const badge =
    statusVariant === "success"
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-blue-100 text-blue-700 border-blue-200";

  const Icon = statusVariant === "success" ? CheckCircleIcon : CalendarDaysIcon;

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 mt-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        {/* Right: job info */}
        <div className=" w-full">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{company}</p>
          <p className="mt-2 text-xs text-slate-500">تقديم: {date}</p>
        </div>

        {/* Left: Badge */}
        <div
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium ${badge}`}
        >
          <Icon className="h-5 w-5" />
          <span>{statusLabel === "Pending" ? "مقدّم" : "مقبول"}</span>
        </div>
      </div>

      {/* Steps bar */}
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className={`h-2 w-full rounded-full  bg-blue-600`} />
            <span className="text-xs text-slate-600">
              {statusLabel === "Pending" ? "مقدّم" : "مقبول"}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div
              className={`h-2 w-full rounded-full ${
                statusLabel !== "Pending" ? "bg-blue-600" : "bg-slate-200"
              }`}
            />
            <span className="text-xs text-slate-600">
              {statusLabel !== "Pending" ? "مقدّم" : "مقبول"}
            </span>
          </div>
        </div>
      </div>

      {/* Withdraw */}
      {showWithdraw && (
        <div className="mt-4 flex justify-start">
          <button
            type="button"
            onClick={onWithdraw}
            className="text-sm text-red-500 hover:text-red-600 hover:cursor-pointer"
          >
            سحب الطلب
          </button>
        </div>
      )}
    </section>
  );
}
