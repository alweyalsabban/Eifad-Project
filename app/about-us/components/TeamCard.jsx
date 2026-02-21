import { HiOutlineUsers } from "react-icons/hi";

export default function TeamCard({ team }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl px-6 py-8 shadow-sm my-10 hover:scale-105 hover:shadow duration-500">
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-full bg-linear-to-b from-slate-200 to-slate-100 flex items-center justify-center">
          <HiOutlineUsers className="text-sky-700 text-5xl" />
        </div>
      </div>

      <div className="mt-8 text-center space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900">{team.name}</h3>
        <p className="text-sky-700 font-semibold">{team.role}</p>
      </div>
    </div>
  );
}
