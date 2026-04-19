import dynamic from 'next/dynamic';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import type { ComponentType } from 'react';

export interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const iconCache = new Map<
  keyof typeof dynamicIconImports,
  ComponentType<LucideProps>
>();

function getLucideIcon(name: keyof typeof dynamicIconImports) {
  const cachedIcon = iconCache.get(name);
  if (cachedIcon) {
    return cachedIcon;
  }

  const IconComponent = dynamic(dynamicIconImports[name]);
  iconCache.set(name, IconComponent);
  return IconComponent;
}

const Icon = ({ name, ...props }: IconProps) => {
  if (!name) {
    return null;
  }
  const LucideIcon = getLucideIcon(name);

  return <LucideIcon {...props} />;
};

export default Icon;
