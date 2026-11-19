function AppleIcon({
  src,
  width,
  height,
  color,
}: {
  src: string;
  width: number;
  height: number;
  color: string;
}) {
  return (
    <span
      className="ms-[0.12em] me-[0.02em] inline-block h-[1.02em] align-middle"
      style={{
        aspectRatio: `${width} / ${height}`,
        backgroundColor: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

export function Statement() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="max-w-[16em] text-[clamp(1.85rem,5.15vw,4.25rem)] leading-[1.16] font-normal tracking-[0.004em] text-balance text-[var(--ink)]">
        <span className="sr-only">
          Habits, training, running, meals, sleep, and fasting.
        </span>
        <span aria-hidden="true">
          <span className="whitespace-nowrap">
            Habits<AppleIcon src="/icons/checklist.png" width={150} height={150} color="#f4a8c4" />,
          </span>{" "}
          <span className="whitespace-nowrap">
            training<AppleIcon src="/icons/dumbbell.png" width={256} height={150} color="#f26b1d" />,
          </span>{" "}
          <span className="whitespace-nowrap">
            running<AppleIcon src="/icons/running.png" width={160} height={150} color="#2eae4f" />,
          </span>{" "}
          <span className="whitespace-nowrap">
            meals<AppleIcon src="/icons/carrot.png" width={148} height={150} color="#f26b1d" />,
          </span>{" "}
          <span className="whitespace-nowrap">
            sleep<AppleIcon src="/icons/sleep.png" width={150} height={150} color="#7a4dff" />,
          </span>{" "}
          and{" "}
          <span className="whitespace-nowrap">
            fasting<AppleIcon src="/icons/clock.png" width={150} height={150} color="#e23b3b" />.
          </span>
        </span>
      </h1>
      <p className="mt-6 text-[clamp(0.95rem,1.5vw,1.15rem)] leading-snug font-normal text-[var(--muted)]">
        Siwen opens soon.
      </p>
    </div>
  );
}
