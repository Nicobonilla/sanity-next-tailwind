// positionValidation.js
import { client } from '@/sanity/lib/client';
import { ValidationContext } from 'sanity';

export const validateUniquePosition = async (
  position: number | null | undefined,
  context: ValidationContext // Cambia a ValidationContext en lugar de Promise<ValidationContext>
) => {
  const { document } = context; // No es necesario esperar aquí, ya que context es un objeto

  // Si la página no está activa o si no hay posición definida, se permite
  if (!document?.isActive || position === undefined || position === null) {
    return true;
  }

  // Si la página está activa, se requiere una posición
  if (document.isActive && (position === undefined || position === null)) {
    return 'Position is required when page is active';
  }

  // Busca posiciones existentes en la base de datos, ignorando el documento actual solo si la posición está cambiando
  const existingPositions = await client.fetch(
    `*[_type == "page" && position == $position && !(_id in path("drafts.**")) && _id != $id]{_id}`,
    { position, id: document._id } // Se excluye el ID del documento actual
  );

  // Si el valor de position no ha cambiado, no hay que hacer nada
  if (existingPositions.length > 0 && position !== document.position) {
    return 'Position must be unique';
  }

  return true; // Si la validación pasa, devuelve true
};
