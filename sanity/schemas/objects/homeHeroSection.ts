import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeHeroSection',
  title: 'Hero de inicio',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Etiqueta',
      type: 'string',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'title',
      title: 'Titulo principal',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'description',
      title: 'Descripcion',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: 'panelTitle',
      title: 'Titulo del panel sobre imagen',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (rule) => rule.required().max(120),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'leaderLabel',
      title: 'Etiqueta del nombre responsable',
      type: 'string',
      initialValue: 'Direccion profesional',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'areasLabel',
      title: 'Etiqueta del contador de areas',
      type: 'string',
      initialValue: 'Areas activas',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'areasSuffix',
      title: 'Texto despues del numero de areas',
      type: 'string',
      initialValue: 'especialidades principales',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'contactLabel',
      title: 'Etiqueta de contacto',
      type: 'string',
      initialValue: 'Contacto',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'trustBullets',
      title: 'Puntos de confianza',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'primaryLabel',
      title: 'Texto boton principal',
      type: 'string',
      initialValue: 'Solicitar orientacion',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'secondaryLabel',
      title: 'Texto boton secundario',
      type: 'string',
      initialValue: 'Ver areas de practica',
      validation: (rule) => rule.max(40),
    }),
  ],
  preview: {
    select: {
      media: 'heroImage',
      title: 'title',
      subtitle: 'eyebrow',
    },
  },
});
