import { defineType, defineField } from 'sanity';
import {
  isUniqueAcrossAllDocuments,
  isUniqueTrueForField,
} from '@/sanity/lib/utils';
import { BinaryDocumentIcon } from '@sanity/icons';

const page = defineType({
  name: 'page',
  title: 'Páginas Principales',
  type: 'document', // Tipo de documento
  icon: BinaryDocumentIcon,
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
      name: 'isActive',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isHome',
      title: 'Página de inicio',
      type: 'boolean',
      initialValue: false,
      validation: (rule) =>
        rule.custom((isHome, context) => isUniqueTrueForField(isHome, context)),
    }),
    defineField({
      name: 'orderRank',
      title: 'Position',
      type: 'string',
      hidden: true,
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
    defineField({
      name: 'components',
      title: 'Componentes',
      type: 'array',
      of: [{ type: 'banner' }], // Para contenido enriquecido
    }),
  ],
});

export default page;
