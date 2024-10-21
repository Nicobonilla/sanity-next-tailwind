type Props = {
  title: string;
  description: string;
};

export function Highlight1({ title, description }: Props) {
  return (
    <div className="container mx-auto text-center lg:px-60">
      <h2 className="h2 py-1 px-9">{title}</h2>
      <p className="p2 p-9">{description}</p>
    </div>
  );
}
