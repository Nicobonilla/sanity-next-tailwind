import { ShoppingCart, Lightbulb, BarChart2, Smartphone, Mail, Code } from 'lucide-react'

export const iconMap: Record<string, React.ComponentType<{ size: number } | any >> = {
  shoppingCart: ShoppingCart,
  lightbulb: Lightbulb,
  barChart2: BarChart2,
  smartphone: Smartphone, 
  mail: Mail,
  code: Code
  // Agrega más íconos aquí según sea necesario
};
