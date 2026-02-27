export function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`core:absolute core:mix-blend-normal core:will-change-[filter] core:rounded-[100%] ${
        small ? "core:blur-[32px]" : "core:blur-[75px]"
      } ${
        conic
          ? "core:bg-linear-to-r core:bg-red-1000 core:from-10% core:via-purple-1000 core:via-30% core:to-blue-1000 core:to-100%"
          : ""
      } ${className ?? ""}`}
    />
  );
}
