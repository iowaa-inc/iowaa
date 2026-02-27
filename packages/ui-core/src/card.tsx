import { type ReactNode } from "react";

export function Card({
  title,
  children,
  href,
}: {
  title: string;
  children: ReactNode;
  href: string;
}) {
  return (
    <a
      className="core:group core:rounded-lg core:border core:border-transparent core:px-5 core:py-4 core:transition-colors hover:core:border-neutral-700 hover:core:bg-neutral-800/30"
      href={`${href}?utm_source=create-turbo&utm_medium=with-tailwind&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <h2 className="core:mb-3 core:text-2xl core:font-semibold">
        {title}{" "}
        <span className="core:inline-block core:transition-transform group-hover:core:translate-x-1 motion-reduce:core:transform-none">
          -&gt;
        </span>
      </h2>
      <p className="core:m-0 core:max-w-[30ch] core:text-sm core:opacity-50">
        {children}
      </p>
    </a>
  );
}
