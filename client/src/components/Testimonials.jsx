import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "ResumeExpert helped me land my dream job in just two weeks! The templates are modern, clean, and easy to customize.",
      userImage:
        "https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg",
      name: "Emily Carter",
      title: "Marketing Specialist, HubSpot",
    },
    {
      quote:
        "I built a professional resume in minutes. The AI suggestions saved me so much time and made my resume stand out.",
      userImage:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      name: "Italo Kim",
      title: "Software Engineer, Microsoft",
    },
    {
      quote:
        "The customizable designs are amazing! I received multiple interview calls within a week after updating my resume.",
      userImage:
        "https://images.pexels.com/photos/672444/pexels-photo-672444.jpeg",
      name: "Sophia Lee",
      title: "UX Designer, Airbnb",
    },
    {
      quote:
        "Simple, efficient, and professional — exactly what I needed to create a resume that impressed recruiters.",
      userImage:
        "https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg",
      name: "Liam Thompson",
      title: "Project Manager, Deloitte",
    },
  ];
  return (
    <section className="flex  pt-16 md:pt-26 flex-col items-start px-6 md:px-16 lg:px-24 text-sm max-w-6xl mx-auto">
      <h3 className="text-3xl font-medium mx-auto">
        What Our Users Are Saying
      </h3>
      <p className="text-slate-600 mt-6 max-w-2xl mx-auto text-center">
        Don’t just take our word for it - hear from professionals who turned
        their job search around with ResumeExpert.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            quote={testimonial.quote}
            userImage={testimonial.userImage}
            name={testimonial.name}
            title={testimonial.title}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
