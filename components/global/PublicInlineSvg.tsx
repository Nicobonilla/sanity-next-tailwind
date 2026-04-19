type PublicInlineSvgProps = {
  value?: string | null;
  className?: string;
  style?: React.CSSProperties;
};

export default function PublicInlineSvg({
  value,
  className,
  style,
}: PublicInlineSvgProps) {
  if (!value) return null;

  return (
    <div
      className={className}
      style={style}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}
