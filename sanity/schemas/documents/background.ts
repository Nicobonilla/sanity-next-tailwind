import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'background',
  title: 'Fondo del Componente',
  type: 'document',
  groups: [
    {
      name: 'general',
      title: 'General',
      default: true,
    },
    {
      name: 'colors',
      title: 'Colores',
    },
    {
      name: 'responsive',
      title: 'responsive',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Fondo',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'backgroundMode',
      title: 'Modo de Fondo',
      type: 'string',
      options: {
        list: [
          { title: 'Transparente', value: 'transparent' },
          { title: 'Imagen de Fondo', value: 'image' },
          { title: 'Colores de Fondo', value: 'colors' },
          { title: 'Video de Fondo', value: 'video' },
          { title: 'Con Items', value: 'items' },
        ],
      },
      group: 'general',
    }),
    defineField({
      name: 'imageBackgroundType',
      title: 'Interacción de la Imagen de Fondo con el Scroll',
      type: 'string',
      options: {
        list: [
          { title: 'Fija', value: 'fixed' },
          { title: 'Móvil', value: 'dynamic' },
        ],
      },
      group: 'general',
      hidden: ({ parent }) => parent.backgroundMode !== 'image',
    }),
    defineField({
      name: 'colorWithDarkMode',
      title: 'Agregar Modo Oscuro',
      type: 'boolean',
      initialValue: false,
      group: 'colors',
    }),
    defineField({
      name: 'colorList',
      title: 'Elije Colores',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'colorItem' }],
        },
      ],
      group: 'colors',
    }),
    defineField({
      name: 'directionDeg',
      title: 'Angulo de Inclinación del Degradado',
      type: 'number',
      group: 'colors',
    }),
    defineField({
      name: 'backgroundLayer',
      title: 'Capa/Layer de Fondo',
      type: 'reference',
      to: [{ type: 'layer' }],
      group: 'colors',
    }),
    // GROUP RESPONSIVE
    defineField({
      name: 'responsiveHeight',
      title: 'Tamaño Responsivo del Componente',
      type: 'string',
      group: 'responsive',
      options: {
        list: [
          { title: 'fit-max', value: 'fit-max' },
          { title: 'h-900', value: 'h-900' },
        ],
      },
    }),
    defineField({
      name: 'invertLayoutMobile',
      title: 'Invertir Layout Mobile',
      type: 'boolean',
      initialValue: false,
      group: 'responsive',
    }),
    defineField({
      name: 'invertLayoutDesk',
      title: 'Invertir Layout Desk',
      type: 'boolean',
      initialValue: false,
      group: 'responsive',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      type: 'backgroundMode.value',
    },
    prepare({ name, type }) {
      return {
        title: name,
        subtitle: type,
      };
    },
  },
});
