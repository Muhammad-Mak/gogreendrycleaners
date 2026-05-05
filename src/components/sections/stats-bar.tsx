export function StatsBar() {
  const stats = [
    { value: "2010", label: "Founded in New York" },
    { value: "19", label: "Locations across FL, NY & CT" },
    { value: "500+", label: "Google reviews and counting" },
  ];

  return (
    <section className="bg-dark text-white py-20 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 text-center" data-animate>
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-5xl lg:text-6xl text-accent">{s.value}</div>
              <div className="mt-3 text-xs uppercase tracking-[0.25em] text-white/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
