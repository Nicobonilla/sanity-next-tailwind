/**
 * This plugin contains all the logic for setting up the singletons
 */

import { definePlugin, type DocumentDefinition } from 'sanity';
import { type StructureResolver } from 'sanity/structure';

export const singletonPlugin = definePlugin((types: string[]) => {
  return {
    name: 'singletonPlugin',
    document: {
      // Hide 'Singletons (such as Settings)' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext, ...rest }) => {
        if (creationContext.type === 'global') {
          return prev.filter(
            (templateItem) => !types.includes(templateItem.templateId)
          );
        }

        return prev;
      },
      // Removes the "duplicate" action on the Singletons (such as Home)
      actions: (prev, { schemaType }) => {
        if (types.includes(schemaType)) {
          return prev.filter(({ action }) => action !== 'duplicate');
        }

        return prev;
      },
    },
  };
});

export const pageStructure = (
  typeDefArray: DocumentDefinition[]
): StructureResolver => {
  return (S) => {
    const hiddenDocuments = [
      'post',
      'author',
      'unitBusiness',
      'component',
      'item',
      'banner',
    ];
    
    // Crea los items de los singletons a partir de los typeDefs
    const singletonItems = typeDefArray.map((typeDef) => {
      return S.listItem()
        .title(typeDef.title!)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name)
        );
    });

    // Filtra los elementos de lista predeterminados excluyendo los singletons y los documentos ocultos
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) =>
        !typeDefArray.find(
          (singleton) => singleton.name === listItem.getId()
        ) && !hiddenDocuments.includes(listItem.getId() || '')
    );

    return S.list()
      .title('Admin Menu Principal - ONIT')
      .items([...singletonItems, S.divider(), ...defaultListItems]);
  };
};
