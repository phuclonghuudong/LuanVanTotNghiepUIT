import React from "react";
import TestimonialCard from "./TestimonialCard";
import TestimonialSkeleton from "./TestimonialSkeleton";

const Testimonial = ({testimonials = [], loading = false}) => {
  const showSkeleton = loading || testimonials.length === 0;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h3 className="text-2xl lg:text-3xl font-semibold">Customer Review</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory">
          {showSkeleton
            ? Array.from({length: 3}).map((_, i) => <TestimonialSkeleton key={i} />)
            : testimonials.map((t, i) => <TestimonialCard key={i} item={t} />)}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
