import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import { defineType, defineField } from 'sanity';

const validIdItems = [
  '564a16c7-6618-4c3c-aeef-6f98d0597a7c',
  '0cfd5a3b-5c9e-4410-85c8-820e96ebec2d',
  '38c27cb0-402a-46bb-afb7-6aabf1c3e1d6',
  '67f4dffb-23de-4cf6-b79a-d491dd67e234',
  '25ec25b1-ee22-4d28-ab77-436614616723',
];
export default defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  orderings: [orderRankOrdering],
  groups: [
    {
      name: 'general',
      title: 'General',
      default: true,
    },
    {
      name: 'background',
      title: 'Background',
    },
    {
      name: 'content',
      title: 'Interno',
    },
    {
      name: 'items',
      title: 'Items',
    },
  ],
  fields: [
    orderRankField({ type: 'banner' }),
    // Configuración General
    defineField({
      name: 'isActive',
      title: 'Activar',
      type: 'boolean',
      initialValue: false,
      group: 'general',
    }),
    defineField({
      name: 'typeComponent',
      title: 'Tipo de Componente',
      type: 'reference',
      to: [{ type: 'component' }],
      group: 'general',
    }),
    defineField({
      name: 'variant',
      title: 'Variante de Componente',
      type: 'string',
      group: 'general',
      hidden: ({ parent }) => !parent?.typeComponent,
      options: {
        list: [{ title: 'Hero', value: 'hero' }],
      },
    }),
    defineField({
      name: 'background',
      title: 'Estilo de Fondo',
      type: 'reference',
      to: [{ type: 'background' }],
      group: 'background',
    }),
    defineField({
      name: 'imageBackground',
      title: 'Imagen de fondo',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'background',
    }),
    // GROUP VIDEO
    defineField({
      name: 'videoUrl',
      title: 'URL del video para ser usado de fondo', // Campo para el video
      type: 'url',
      group: 'background',
    }),
    defineField({
      name: 'videoType',
      title: 'Indica formato del archivo de video', // Campo para el video
      type: 'string',
      group: 'background',
      options: {
        list: [
          { title: 'mp4', value: 'mp4' },
          { title: 'webm', value: 'webm' },
        ],
      },
    }),
    // CONTENT
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),
    defineField({
      name: 'PTextBanner',
      title: 'Estilo de Letras Banner',
      type: 'string',
      group: 'content',
      hidden: ({ parent }) => parent?.content,
    }),
    defineField({
      name: 'imageContent',
      title: 'Imagen adicional para el contenido',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'content',
    }),
    defineField({
      name: 'imagePosition',
      title: 'Ubicación de la Imagen',
      type: 'string',
      options: {
        list: [
          { title: 'Izquierda', value: 'left' },
          { title: 'Derecha', value: 'right' },
          { title: 'Arriba', value: 'top' },
          { title: 'Abajo', value: 'bottom' },
        ],
      },
      group: 'content',
      hidden: ({ parent }) => parent.image === undefined,
    }),
    // ITEMS
    defineField({
      name: 'layoutItems',
      title: 'Layout Items',
      type: 'string',
      group: 'items',
      hidden: ({ parent }) => parent.items === undefined,
    }),
    defineField({
      name: 'PTextItem',
      title: 'Estilo de Letras Items',
      type: 'string',
      group: 'items',
      hidden: ({ parent }) => parent.items === undefined,
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'item' }],
      group: 'items',
      hidden: ({ parent }) =>
        !validIdItems.includes(parent?.typeComponent?._ref),
    }),
  ],
  preview: {
    select: {
      content: 'content',
      type: 'typeComponent.name',
      variant: 'variant',
      active: 'isActive',
    },
    prepare({ content, type, variant, active }) {
      const previewTitle =
        content && content[0] && content[0].children && content[0].children[0]
          ? content[0].children[0].text
          : '';

      return {
        title: previewTitle,
        subtitle: `${active ? 'Activo' : 'Inactivo'} | ${type}${variant ? ` - ${variant}` : ''}`,
      };
    },
  },
});
