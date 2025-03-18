import dynamic from 'next/dynamic';
import { type LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

export interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const iconCache: Record<string, any> = {};

const Icon = ({ name, ...props }: IconProps) => {
  if (!name) return null;

  if (!iconCache[name]) {
    iconCache[name] = dynamic(dynamicIconImports[name]);
  }

  const LucideIcon = iconCache[name];

  return <LucideIcon {...props} />;
};

export default Icon;
