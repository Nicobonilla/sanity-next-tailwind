import { BinaryDocumentIcon } from '@sanity/icons';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

import {
  isUniqueAcrossAllDocuments,
  isUniqueTrueForField,
} from '@/sanity/lib/utils';

const page = defineType({
  name: 'page',
  title: 'Paginas principales',
  type: 'document',
  orderings: [orderRankOrdering],
  icon: BinaryDocumentIcon,
  fields: [
    orderRankField({ type: 'page' }),
    defineField({
      name: 'name',
      title: 'Titulo interno',
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
      name: 'showInNavbar',
      title: 'Mostrar en barra principal',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showInFooter',
      title: 'Mostrar en footer',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'title',
      title: 'Nombre visible en navegacion',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen',
      type: 'string',
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: 'isHome',
      title: 'Pagina de inicio',
      type: 'boolean',
      initialValue: false,
      validation: (rule) =>
        rule.custom((isHome, context) => isUniqueTrueForField(isHome, context)),
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    defineField({
      name: 'components',
      title: 'Componentes',
      type: 'array',
      of: [{ type: 'banner' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isHome: 'isHome',
      isActive: 'isActive',
    },
    prepare({ title, isHome, isActive }) {
      const subtitle = [
        isHome ? 'Home' : '',
        isActive ? 'Activo' : 'Inactivo',
      ].filter(Boolean);

      return {
        title,
        subtitle: subtitle.join(' | '),
      };
    },
  },
});

export default page;
