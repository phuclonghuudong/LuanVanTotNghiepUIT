// TeamSection.jsx
import React from "react";
import TeamCardSkeleton from "./TeamCardSkeleton";
import TeamCard from "./TeamCard";

const OurTeam = ({teams = [], loading = false}) => {
  const showSkeletons = loading || teams.length === 0;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-2xl lg:text-3xl font-semibold">Meet Our Teams</h3>
          <p className="text-zinc-600 mt-2">
            Discover exceptional experiences through testimonials from our satisfied customers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory">
          {showSkeletons
            ? Array.from({length: 4}).map((_, i) => <TeamCardSkeleton key={i} />)
            : teams.map((m) => <TeamCard key={m.id} member={m} />)}
        </div>
      </div>
    </section>
  );
};
export default OurTeam;
