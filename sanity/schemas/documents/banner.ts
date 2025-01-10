import { defineType, defineField } from 'sanity';

const validIdItems = [
  { bannerWithItems: '564a16c7-6618-4c3c-aeef-6f98d0597a7c' },
  { carousel: '0cfd5a3b-5c9e-4410-85c8-820e96ebec2d' },
  { iconList: '38c27cb0-402a-46bb-afb7-6aabf1c3e1d6' },
  { bannerList: '67f4dffb-23de-4cf6-b79a-d491dd67e234' },
].map((item) => Object.values(item)[0]);

export default defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  groups: [
    {
      name: 'exterior',
      title: 'Exterior',
      default: true,
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
    // Configuración Exterior
    defineField({
      name: 'isActive',
      title: 'Activar',
      type: 'boolean',
      initialValue: false,
      group: 'exterior',
    }),
    defineField({
      name: 'typeComponent',
      title: 'Tipo de Componente',
      type: 'reference',
      to: [{ type: 'component' }],
      group: 'exterior',
    }),
    defineField({
      name: 'responsiveComponent',
      title: 'Tamaño Responsivo del Componente',
      type: 'string',
      group: 'exterior',
    }),
    defineField({
      name: 'invertLayoutMobile',
      title: 'Invertir Layout Mobile',
      type: 'boolean',
      initialValue: false,
      group: 'exterior',
    }),
    defineField({
      name: 'invertLayoutDesk',
      title: 'Invertir Layout Desk',
      type: 'boolean',
      initialValue: false,
      group: 'exterior',
    }),

    // Contenido Interno
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
      hidden: ({ parent }) => parent.content == undefined,
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
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
          { title: 'Centro', value: 'center' },
          { title: 'Background', value: 'background' },
          { title: 'Arriba', value: 'arriba' },
        ],
      },
      group: 'content',
      hidden: ({ parent }) => parent.image === undefined,
    }),
    defineField({
      name: 'imageClass',
      title: 'Class',
      type: 'string',
      group: 'content',
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
  ],
  preview: {
    select: {
      content: 'content',
      type: 'typeComponent.name',
      active: 'isActive',
    },
    prepare({ content, type, active }) {
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
