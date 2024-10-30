import { defineType, defineField } from 'sanity';

const banner = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document', // Tipo de documento
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título del Banner',
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Descripción del Banner',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Contenido del Banner',
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
      name: 'typeComponent',
      type: 'string',
      title: 'Tipo de Componente',
      options: {
        list: [
          { title: 'HeroImage', value: 'heroImage' },
          { title: 'Banner1', value: 'banner1' },
          { title: 'Banner3Features', value: 'banner3Features' },
        ],
      },
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'item' }],
      hidden: ({ parent }) => parent?.typeComponent !== 'banner3Features',
    }),
  ],
});

export default banner;
