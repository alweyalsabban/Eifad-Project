"use client";
import { useContext } from "react";
import { PersentProfileContext } from "../../context/PersentProfileContext";
export default function ProfileCompletionCard({
  statusText = "مكتمل",
  hintText = "أكمل ملفك لزيادة فرص الظهور",
}) {
  const { numberOfPersent, setnumberOfPersent } = useContext(
    PersentProfileContext,
  );
  return (
    <section className="w-full rounded-2xl bg-linear-to-b from-blue-500 to-blue-600 p-6 text-auxiliaryColorWhite">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold">اكتمال الملف</h3>
        <span className="text-xl font-bold">
          {numberOfPersent > 100 ? 100 : String(numberOfPersent)}%
        </span>
      </div>

      <h1 className="mt-4 text-sm opacity-90">{statusText}</h1>

      <div className="mt-4 h-3 w-full rounded-full bg-auxiliaryColorWhite/25">
        <div
          className={`h-3 rounded-full bg-white`}
          style={{
            width: numberOfPersent > 100 ? `100%` : `${numberOfPersent}%`,
          }}
        />
      </div>

      <p className="mt-4 text-sm opacity-90">{hintText}</p>
    </section>
  );
}
