import { defineType, defineField } from 'sanity';

const banner = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document', // Tipo de documento
  fields: [
    defineField({
      name: 'content',
      type: 'array',
      title:
        'Puedes escribir el contenido utilizando h1, h2, h3, bold, normal y viñetas',
      of: [{ type: 'block' }], // Portable Text
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
      title: 'Activar',
      name: 'isActive',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'typeComponent',
      type: 'reference',
      title: 'Tipo de Componente',
      to: [{ type: 'component' }],
    }),
    defineField({
      title: 'Invertir Layout Mobile',
      name: 'invertLayoutMobile',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Invertir Layout Desk',
      name: 'invertLayoutDesk',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'item' }],
    }),
  ],
  preview: {
    select: {
      content: 'content',
      type: 'typeComponent.value',
      active: 'isActive',
    },
    prepare({ content, type, active }) {
      // Si no hay título, tomamos el texto del primer bloque de content
      const previewTitle =
        content && content[0] && content[0].children && content[0].children[0]
          ? content[0].children[0].text
          : 'Sin título';

      return {
        title: previewTitle,
        subtitle: `${type} | ${active ? 'Activo' : 'Inactivo'}`,
      };
    },
  },
});

export default banner;
