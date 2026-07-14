import { defineType, defineField } from 'sanity';
import {
  isUniqueAcrossAllDocuments,
  isUniqueTrueForField,
} from '@/sanity/lib/utils';
import { BinaryDocumentIcon } from '@sanity/icons';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import PageBuilderInput from '@/sanity/PageBuilderInput';

const page = defineType({
  name: 'page',
  title: 'Páginas Principales',
  type: 'document',
  orderings: [orderRankOrdering],
  icon: BinaryDocumentIcon,
  fields: [
    orderRankField({ type: 'page' }),
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
      name: 'resumen',
      title: 'Breve descripcion de  la pagina',
      type: 'string',
    }),
    defineField({
      name: 'seo',
      title: 'SEO y redes sociales',
      type: 'seo',
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
  ],
  preview: {
    select: {
      title: 'title',
      isHome: 'isHome',
      isActive: 'isActive',
    },
    prepare({ title, isHome, isActive }) {
      const subtitle = [
        isHome ? '🏠 Home' : '',
        isActive ? 'Activo' : 'Inactivo',
      ];
      return {
        title,
        subtitle: subtitle.join(' '),
      };
    },
  },
});

export default page;
