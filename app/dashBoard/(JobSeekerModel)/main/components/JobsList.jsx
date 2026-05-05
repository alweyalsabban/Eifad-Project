import React from "react";

function JobsList({ status, title, company, timeAgo }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 space-y-2 mainAnimation my-2">
      <div className="flex justify-between items-start">
        {status}

        <div className="text-right">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-600">{company}</p>
        </div>
      </div>

      <time className="block text-xs text-slate-500 text-right">{timeAgo}</time>
    </div>
  );
}

export default JobsList;
