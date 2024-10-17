import { defineType, defineField } from 'sanity';

const bannerSchema = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document', // Tipo de documento
  fields: [
    defineField({
      name: 'content',
      type: 'array',
      title: 'Contenido del Banner',
      of: [{ type: 'block' }], // Portable Text
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Imagen',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export default bannerSchema;
