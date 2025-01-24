import { defineType, defineField } from 'sanity';

const validIdItems = [
  { bannerWithItems: '564a16c7-6618-4c3c-aeef-6f98d0597a7c' },
  { carousel: '0cfd5a3b-5c9e-4410-85c8-820e96ebec2d' },
  { iconList: '38c27cb0-402a-46bb-afb7-6aabf1c3e1d6' },
  { bannerList: '67f4dffb-23de-4cf6-b79a-d491dd67e234' },
  { banner4Images: '25ec25b1-ee22-4d28-ab77-436614616723' },
].map((item) => Object.values(item)[0]);

const hiddenColors = (mode: string) =>
  !['colors', 'items', 'image'].includes(mode);

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
      name: 'colors',
      title: 'Colores',
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
      name: 'responsiveHeight',
      title: 'Tamaño Responsivo del Componente',
      type: 'string',
      group: 'exterior',
      options: {
        list: [
          { title: 'fit-max', value: 'fit-max' },
          { title: 'h-900', value: 'h-900' },
        ],
      },
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
      group: 'exterior',
    }),
    defineField({
      name: 'colorWithDarkMode',
      title: 'Agregar Modo Oscuro',
      type: 'boolean',
      initialValue: false,
      group: 'colors',
      hidden: ({ parent }) => parent.backgroundMode !== 'colors',
    }),
    defineField({
      name: 'directionDeg',
      title: 'Angulo de Inclinación del Degradado',
      type: 'number',
      group: 'colors',
      hidden: ({ parent }) =>
        parent.colorBackgroundDark2 !== false ||
        parent.colorBackground2 !== false,
    }),
    defineField({
      name: 'colorBackground1',
      title: 'Color de Fondo 1',
      type: 'color',
      group: 'colors',
      hidden: ({ parent }) => hiddenColors(parent.backgroundMode),
    }),
    defineField({
      name: 'colorBackground2',
      title: 'Color de Fondo 2',
      type: 'color',
      group: 'colors',
      hidden: ({ parent }) => hiddenColors(parent.backgroundMode),
    }),
    defineField({
      name: 'colorBackground3',
      title: 'Color de Fondo 3',
      type: 'color',
      group: 'colors',
      hidden: ({ parent }) => hiddenColors(parent.backgroundMode),
    }),
    defineField({
      name: 'colorBackgroundDark1',
      title: 'Color de Fondo 1 (Dark)',
      type: 'color',
      group: 'colors',
      hidden: ({ parent }) =>
        hiddenColors(parent.backgroundMode) ||
        parent.colorWithDarkMode === false,
    }),
    defineField({
      name: 'colorBackgroundDark2',
      title: 'Color de Fondo 2 (Dark)',
      type: 'color',
      group: 'colors',
      hidden: ({ parent }) =>
        hiddenColors(parent.backgroundMode) ||
        parent.colorWithDarkMode === false,
    }),
    defineField({
      name: 'colorBackgroundDark3',
      title: 'Color de Fondo 3 (Dark)',
      type: 'color',
      group: 'colors',
      hidden: ({ parent }) =>
        hiddenColors(parent.backgroundMode) ||
        parent.colorWithDarkMode === false,
    }),
    defineField({
      name: 'colorBackground1Position',
      title: 'Posicion Color de Fondo 1',
      type: 'number',
      group: 'colors',
      hidden: ({ parent }) =>
        hiddenColors(parent.backgroundMode) ||
        parent.colorBackground2 === false,
    }),
    defineField({
      name: 'colorBackground2Position',
      title: 'Posicion Color de Fondo 2',
      type: 'number',
      group: 'colors',
      hidden: ({ parent }) =>
        hiddenColors(parent.backgroundMode) ||
        parent.colorBackground2 === false,
    }),
    defineField({
      name: 'colorBackground3Position',
      title: 'Posicion Color de Fondo 3',
      type: 'number',
      group: 'colors',
      hidden: ({ parent }) =>
        hiddenColors(parent.backgroundMode) ||
        parent.colorBackground3 === false,
    }),
    defineField({
      name: 'imageBackground',
      title: 'Imagen de Fondo',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
                return 'Required';
              }
              return true;
            });
          },
        },
      ],
      group: 'exterior',
      validation: (rule) => rule.required(),
      hidden: ({ parent }) => parent.backgroundMode !== 'image',
    }),
    defineField({
      name: 'imageBackgroundType',
      title: 'Interacción de la Imagen de Fondo con el Scroll',
      type: 'string',
      options: {
        list: [
          { title: 'Fija', value: 'fixed' },
          { title: 'Movible', value: 'dynamic' },
        ],
      },
      group: 'exterior',
      hidden: ({ parent }) => parent.backgroundMode !== 'image',
    }),
    defineField({
      name: 'imageBackgroundLayer',
      title:
        'Elige una capa para usar sobre el componente con la imagen de fondo',
      type: 'string',
      options: {
        list: [
          { title: 'Layer1', value: 'layer1' },
          { title: 'Layer2', value: 'layer2' },
          { title: 'Layer3', value: 'layer3' },
          { title: 'Layer4', value: 'layer4' },
          { title: 'Layer5', value: 'layer5' },
          { title: 'Layer6', value: 'layer6' },
        ],
      },
      group: 'exterior',
      hidden: ({ parent }) => parent.backgroundMode !== 'image',
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL del video para ser usado de fondo', // Campo para el video
      type: 'url',
      group: 'exterior',
      hidden: ({ parent }) => parent.backgroundMode !== 'video', // Solo visible si el backgroundMode es "video"
    }),
    defineField({
      name: 'videoType',
      title: 'Indica formato del archivo de video', // Campo para el video
      type: 'string',
      group: 'exterior',
      options: {
        list: [
          { title: 'mp4', value: 'mp4' },
          { title: 'webm', value: 'webm' },
        ],
      },
      hidden: ({ parent }) => parent.backgroundMode !== 'video', // Solo visible si el backgroundMode es "video"
    }),
    defineField({
      name: 'responsiveComponent',
      title: 'Tamaño Responsivo del Componente (Usado por Banner1)',
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
          { title: 'Arriba', value: 'top' },
          { title: 'Abajo', value: 'bottom' },
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
        subtitle: `${active ? 'Activo' : 'Inactivo'} | ${type}`,
      };
    },
  },
});
