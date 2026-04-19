type PortableTextChild = {
  _type?: string;
  text?: string;
};

type PortableTextBlock = {
  _type?: string;
  children?: PortableTextChild[];
};

export function portableTextToPlainText(
  blocks: PortableTextBlock[] | null | undefined,
  maxLength?: number
) {
  const text = (blocks || [])
    .filter((block) => block?._type === 'block')
    .flatMap((block) => block.children || [])
    .map((child) => child.text || '')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!maxLength || text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, Math.max(0, maxLength - 1)).trim()}…`;
}
