import { defineType, defineField } from 'sanity';
import { validateUniquePosition } from '@/sanity/lib/validations';

const item = defineType({
  name: 'item',
  title: 'Item',
  type: 'document', // Tipo de documento
  fields: [
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Activar',
      name: 'isActive',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Imagen',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'alt',
      title: 'Alt de la imagen',
      type: 'string',
    }),
    defineField({
      name: 'position',
      title: 'Posición',
      type: 'number',
      validation: (rule) =>
        rule.custom((position, context) =>
          validateUniquePosition(position, context)
        ),
    }),
    defineField({
      name: 'icon',
      title: 'Icon de Lucide React',
      type: 'reference',
      to: [{ type: 'icon' }],
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
      ], // Para contenido enriquecido
    }),
  ],
});

export default item;
