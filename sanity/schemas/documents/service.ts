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
  groups: [
    { name: 'content', title: 'Contenido', default: true },
    { name: 'conversion', title: 'Landing y conversion' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    orderRankField({ type: 'service' }),
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Activar',
      name: 'isActive',
      type: 'boolean',
      initialValue: false,
      group: 'content',
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
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'icon.manager',
      name: 'iconfyIcon',
      title: 'Icon Manager',
      group: 'content',
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen',
      type: 'text',
      group: 'content',
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'content',
      title: 'Detalles del servicio',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    defineField({
      name: 'unitBusiness',
      title: 'Area de practica',
      type: 'reference',
      to: [{ type: 'unitBusiness' }],
      description: 'Selecciona el area a la que pertenece este servicio.',
      group: 'content',
    }),
    defineField({
      name: 'components',
      title: 'Componentes',
      type: 'array',
      group: 'content',
      of: [{ type: 'banner' }],
    }),
    defineField({
      name: 'landing',
      title: 'Landing comercial',
      description:
        'Estructura resumida para consultas de alta intención. No reemplaza el contenido largo; lo ordena comercialmente.',
      type: 'serviceLanding',
      group: 'conversion',
    }),
    defineField({
      name: 'contentCta',
      title: 'CTA de contacto del servicio',
      type: 'contactCta',
      group: 'conversion',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
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
