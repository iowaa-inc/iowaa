interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="py-6 md:py-10">
      <h2 className="text-foreground text-2xl font-bold">{title}</h2>
      <p className="text-muted-foreground mt-1.5 text-base">{subtitle}</p>
    </div>
  );
}
