import { GetComponentListQueryResult } from '@/sanity.types';

export function transformToDict(
  components: GetComponentListQueryResult | null
): Record<string, string | null> {
  if (!components) return {};

  return components.reduce(
    (acc, { value, name }) => {
      if (value) {
        acc[value] = name; // Asigna el value al nombre en el diccionario
      }
      return acc; // Devuelve el acumulador
    },
    {} as Record<string, string | null>
  );
}


