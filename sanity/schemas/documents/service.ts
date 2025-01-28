import { defineField, defineType } from 'sanity';
import { DocumentsIcon } from '@sanity/icons';
import { isUniqueAcrossAllDocuments } from '@/sanity/lib/utils';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';

const service = defineType({
  name: 'service',
  title: 'Servicios',
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
      title: 'Activar',
      name: 'isActive',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Posición',
      name: 'orderRank',
      type: 'string',
      hidden: true,
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
      name: 'content',
      title: 'Detalles del servicio',
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
      type: 'array',
      of: [{ type: 'banner' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      active: 'isActive',
      unitBusiness: 'unitBusiness.title',
    },
    prepare({ title, active, unitBusiness }) {
      return {
        title: `${title} | ${active ? 'Activo' : 'Inactivo'}`,
        subtitle: `${unitBusiness}`,
      };
    },
  },
});

export default service;
