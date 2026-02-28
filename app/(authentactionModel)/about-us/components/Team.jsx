import React from "react";
import TeamCard from "./TeamCard";
import { team } from "../info";

function Team() {
  return (
    <section className="cusContaner m-auto text-center my-10 animate-fade-up">
      <h1 className="text-3xl font-bold">فريق العمل</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {team.map((t, index) => {
          return <TeamCard key={t.name} team={team[index]} />;
        })}
      </div>
    </section>
  );
}

export default Team;
