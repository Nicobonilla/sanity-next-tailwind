type Props = {
  title: string;
  description: string;
};

export function Highlight1({ title, description }: Props) {
  return (
    <div className="mx-auto max-w-screen-lg text-center lg:px-60">
      <h2 className="h2 px-9 py-1">{title}</h2>
      <p className="p2 p-9">{description}</p>
    </div>
  );
}
