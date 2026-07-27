import clsx from "clsx";

export function Container({ children, className }) {
  return (
    <div className={clsx("mx-auto w-full max-w-6xl px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, description, align = "left", dark }) {
  return (
    <div
      className={clsx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        dark ? "text-white" : "text-ink",
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-5 text-lg leading-relaxed",
            dark ? "text-slate-300" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
