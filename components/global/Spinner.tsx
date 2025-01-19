import { Loader2 } from 'lucide-react';

export function Spinner() {
  return (
    <div className="bg-background/80 h-min-screen fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <Loader2 className="size-12 animate-spin text-blue-900" />
      <span className="sr-only">Cargando...</span>
    </div>
  );
}
