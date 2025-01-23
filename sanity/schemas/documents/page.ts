import { defineType, defineField } from 'sanity';
import {
  isUniqueAcrossAllDocuments,
  isUniqueTrueForField,
} from '@/sanity/lib/utils';
import { BinaryDocumentIcon } from '@sanity/icons';
import { media } from 'sanity-plugin-media';
import { sub } from 'date-fns';

const page = defineType({
  name: 'page',
  title: 'Páginas Principales',
  type: 'document', // Tipo de documento
  orderings: [
    {
      title: 'Estado',
      name: 'activeStatus',
      by: [
        { field: 'isActive', direction: 'desc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
  icon: BinaryDocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Título de cabecera de la pagina',
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
      name: 'title',
      title: 'Nombre de la pagina para el menu de navegacion',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageHeader',
      title: 'Imagen de cabecera',
      type: 'image',
      options: {
        hotspot: true,
      },
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
  preview: {
    select: {
      title: 'title',
      isHome: 'isHome',
      isActive: 'isActive',
      media: 'imageHeader',
    },
    prepare({ title, isHome, isActive, media }) {
      const subtitle = [
        isHome ? '🏠 Home' : '',
        isActive ? 'Activo' : 'Inactivo',
      ];
      return {
        title,
        subtitle: subtitle.join(' '),
        media,
      };
    },
  },
});

export default page;
