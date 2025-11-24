interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  eyebrow?: string;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  eyebrow,
  alignment = 'center',
  className = '',
}: SectionTitleProps) {
  const alignmentClass =
    alignment === 'center'
      ? 'text-center items-center'
      : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-3 ${alignmentClass} ${className}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-500">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-semibold leading-tight text-gray-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

