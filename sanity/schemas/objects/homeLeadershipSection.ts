import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeLeadershipSection',
  title: 'Seccion liderazgo',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Encabezado',
      type: 'sectionHeading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'leaderNameOverride',
      title: 'Nombre responsable (opcional)',
      description:
        'Si se deja vacio, el frontend usa el nombre configurado en Settings.',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'leaderCardLabel',
      title: 'Etiqueta del recuadro de responsable',
      type: 'string',
      initialValue: 'Responsable del estudio',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'bullets',
      title: 'Puntos destacados',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: 'heading.title',
      subtitle: 'heading.eyebrow',
    },
  },
});
