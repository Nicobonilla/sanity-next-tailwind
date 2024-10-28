import { defineType, defineField } from 'sanity';
import { client } from '@/sanity/lib/client';
import { Rule } from 'sanity';
import { isUniqueAcrossAllDocuments } from '@/sanity/lib/utils';

const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document', // Tipo de documento
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre de la pagina',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniqueAcrossAllDocuments,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Activar',
      name: 'pageIsActive',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'number',
      validation: (rule) =>
        rule.custom(async (position, context) => {
          const { document } = context;

          // Si la página no está activa o si no hay posición definida, se permite
          if (
            !document?.pageIsActive ||
            position === undefined ||
            position === null
          ) {
            return true;
          }

          // Si la página está activa, se requiere una posición
          if (
            document.pageIsActive &&
            (position === undefined || position === null)
          ) {
            return 'Position is required when page is active';
          }

          // Busca posiciones existentes en la base de datos
          const existingPositions = await client.fetch(
            `*[_type == "page" && position == $position && !(_id in path("drafts.**")) && _id != $id]{_id}`,
            { position, id: document._id } // Se excluye el ID del documento actual
          );

          // Si existen posiciones duplicadas
          if (existingPositions.length > 0) {
            return 'Position must be unique';
          }

          return true; // Si la validación pasa, devuelve true
        }),
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
        },
        { type: 'banner' },
      ], // Para contenido enriquecido
    }),
  ],
});

export default page;
