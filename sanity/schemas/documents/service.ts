import { DocumentsIcon } from '@sanity/icons';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

import { isUniqueAcrossAllDocuments } from '@/sanity/lib/utils';

export default defineType({
  name: 'service',
  title: 'Servicios',
  type: 'document',
  orderings: [orderRankOrdering],
  icon: DocumentsIcon,
  fields: [
    orderRankField({ type: 'service' }),
    defineField({
      name: 'title',
      title: 'Titulo',
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
      type: 'icon.manager',
      name: 'iconfyIcon',
      title: 'Icon Manager',
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen',
      type: 'text',
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'content',
      title: 'Detalles del servicio',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    defineField({
      name: 'unitBusiness',
      title: 'Area de practica',
      type: 'reference',
      to: [{ type: 'unitBusiness' }],
      description: 'Selecciona el area a la que pertenece este servicio.',
    }),
    defineField({
      name: 'components',
      title: 'Componentes',
      type: 'array',
      of: [{ type: 'banner' }],
    }),
    defineField({
      name: 'contentCta',
      title: 'CTA de contacto del servicio',
      type: 'contactCta',
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
      active: 'isActive',
      unitBusiness: 'unitBusiness.title',
      icon: 'iconfyIcon.icon',
    },
    prepare({ title, active, unitBusiness, icon }) {
      return {
        title: `${title} | ${active ? 'Activo' : 'Inactivo'}`,
        subtitle: `${unitBusiness}`,
        media: icon,
      };
    },
  },
});
