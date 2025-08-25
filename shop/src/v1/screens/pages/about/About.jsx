import React from "react";
import PageTitle from "../../../components/common/PageTitle";
import AboutContent from "./AboutContent";
import OurTeam from "../../../components/common/Teams/OurTeam";
import OurPolicy from "../../../components/common/OurPolicy";
import Testimonial from "../../../components/common/Testimonial/Testimonial";

const About = () => {
  return (
    <div>
      <PageTitle
        title="About Our Store"
        withBackground={true}
        breadcrumbAlign="center"
        breadcrumb={[{label: "Homepage", href: "/"}, {label: "Pages", href: "/"}, {label: "About Our Store"}]}
        About
        Our
        Store
      />
      <AboutContent loading />
      <OurTeam />
      <Testimonial loading />

      <Testimonial
        testimonials={[
          {
            title: "Variety of Styles!",
            text: "Fantastic shop! Great selection, fair prices, and friendly staff. Highly recommended.",
            author: "Sybil Sharp",
          },
          {
            title: "Quality of Clothing!",
            text: "I absolutely love this shop! The products are high-quality and the customer service is excellent.",
            author: "Mark G.",
          },
          {
            title: "Customer Service!",
            text: "The staff is incredibly friendly and helpful. Always top-quality products!",
            author: "Emily S.",
          },
        ]}
      />
      <OurPolicy />
    </div>
  );
};

export default About;
