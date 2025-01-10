import { defineField, defineType } from 'sanity';
import { DocumentsIcon } from '@sanity/icons';

export default defineType({
  name: 'recurso',
  title: 'Recurso',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
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
      },
    }),
    defineField({
      name: 'content',
      title: 'Escribe aquí el contenido del recurso',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
        },
      ], // Para contenido enriquecido
    }),
    defineField({
      name: 'unitBusiness',
      title: 'Unidad de Negocio',
      type: 'reference',
      to: [{ type: 'unitBusiness' }],
      description: 'Select the unit business this service belongs to',
    }),
    defineField({
      name: 'components',
      title: 'Componentes',
      type: 'reference',
      to: [{ type: 'banner' }],
      description: 'Agrega un banner para este servicio',
    }),
  ],
});
