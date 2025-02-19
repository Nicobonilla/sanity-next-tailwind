import { defineType, defineField } from 'sanity';
import { validateUniquePosition } from '@/sanity/lib/validations';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';

export default  defineType({
  name: 'item',
  title: 'Item',
  type: 'document', // Tipo de documento
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'item' }),
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
      type: 'icon.manager',
      name: 'icon',
      title: 'Icon Manager',
    }),

    defineField({
      name: 'svgIcon',
      title: 'SVG Icon',
      type: 'inlineSvg',
    }),

    defineField({
      name: 'svgIconList',
      title: 'SVG Icon List',
      type: 'iconsList',
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
      name: 'ctaLinkItem',
      title: 'Link Item',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      content: 'content',
      alt: 'alt',
      active: 'isActive',
      image: 'image',
    },
    prepare({ content, alt, active, image }) {
      const previewTitle =
        content && content[0] && content[0].children && content[0].children[0]
          ? content[0].children[0].text
          : '';
      return {
        title: `${previewTitle} |${alt ? '' : ' Sin alt |'} ${active ? 'Activo' : 'Inactivo'}`,
        media: image, // Aquí asignas la imagen para que se muestre
      };
    },
  },
});