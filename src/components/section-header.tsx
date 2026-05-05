import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  invert?: boolean;
};

export function SectionHeader({ label, title, description, align = "center", className, invert = false }: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {label && <span className="section-label">{label}</span>}
      <div
        className={cn(align === "center" ? "section-divider" : "section-divider-left")}
        aria-hidden
      />
      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl lg:text-5xl text-balance",
          invert ? "text-white" : "text-text"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed text-balance",
            invert ? "text-white/70" : "text-text-secondary"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
