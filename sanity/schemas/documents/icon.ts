import { defineType, defineField } from 'sanity';

const icon = defineType({
  name: 'icon',
  title: 'Icons de Lucide React',
  type: 'document', // Tipo de documento
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nombre de Icono',
    }),
    defineField({
      name: 'value',
      type: 'string',
      title: 'Valor para importar Icono',
    }),
  ],
});

export default icon;
