import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'serviceLanding',
  title: 'Landing comercial del servicio',
  type: 'object',
  fields: [
    defineField({
      name: 'intro',
      title: 'Introduccion comercial',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.max(260),
    }),
    defineField({
      name: 'situationsTitle',
      title: 'Titulo de situaciones frecuentes',
      type: 'string',
      initialValue: 'Este servicio es para usted si...',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'situations',
      title: 'Situaciones frecuentes',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'deliverablesTitle',
      title: 'Titulo de alcance',
      type: 'string',
      initialValue: 'Que revisaremos en su caso',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'deliverables',
      title: 'Aspectos que revisa el estudio',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'documentsTitle',
      title: 'Titulo de antecedentes',
      type: 'string',
      initialValue: 'Antecedentes utiles para avanzar',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'documents',
      title: 'Antecedentes o documentos',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'processTitle',
      title: 'Titulo del proceso',
      type: 'string',
      initialValue: 'Como se trabaja este tipo de caso',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'processSteps',
      title: 'Pasos del proceso',
      type: 'array',
      of: [{ type: 'processStep' }],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'faqTitle',
      title: 'Titulo de preguntas frecuentes',
      type: 'string',
      initialValue: 'Preguntas frecuentes',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'faqItems',
      title: 'Preguntas frecuentes',
      type: 'array',
      of: [{ type: 'faqItem' }],
      validation: (rule) => rule.max(6),
    }),
  ],
  preview: {
    select: {
      intro: 'intro',
      situationsCount: 'situations',
    },
    prepare({ intro, situationsCount }) {
      const count = Array.isArray(situationsCount) ? situationsCount.length : 0;

      return {
        title: 'Landing comercial',
        subtitle:
          intro || count ? `${count} situaciones configuradas` : 'Sin contenido comercial',
      };
    },
  },
});
