import React from "react";
import "./Body.css";

const Body = () => {
  // Same 3 tips, just displayed more nicely
  const tips = [
    {
      id: 1,
      title: "Healthy Daily Habits",
      tip: "Start your day with a nutritious breakfast, stay hydrated, and avoid junk food to keep your energy levels steady. Regular physical activity, even simple walking or stretching, improves overall fitness and reduces stress."
    },
    {
      id: 4,
      title: "Stress Management",
      tip: "Manage stress with deep breathing, meditation, or listening to music. Practicing mindfulness for just a few minutes a day can calm your mind and improve emotional well-being."
    },
    {
      id: 9,
      title: "Regular Health Checkups",
      tip: "Schedule routine medical checkups, including blood tests and dental visits, to detect health issues early and support long-term wellness."
    }
  ];

  return (
    <section className="body-container">
      <div className="body-inner">
        <h2 className="body-title">Latest Health Information</h2>
        <p className="body-subtitle">
          Simple wellness guidance to help you stay healthy and consistent with
          preventive care.
        </p>

        <div className="cards-wrapper">
          {tips.map((item, index) => (
            <article key={item.id} className="health-card">
              <div className="card-header-row">
                <span className="card-pill">Tip {index + 1}</span>
                <span className="card-label">Wellness</span>
              </div>

              <h3 className="health-card-title">{item.title}</h3>
              <p className="health-card-text">{item.tip}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Body;
