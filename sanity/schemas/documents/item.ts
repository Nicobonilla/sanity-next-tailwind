import { defineType, defineField } from 'sanity';
import { validateUniquePosition } from '@/sanity/lib/validations';

const item = defineType({
  name: 'item',
  title: 'Item',
  type: 'document', // Tipo de documento
  fields: [
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
      name: 'position',
      title: 'Posición',
      type: 'number',
      validation: (rule) =>
        rule.custom((position, context) =>
          validateUniquePosition(position, context)
        ),
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

export default item;
