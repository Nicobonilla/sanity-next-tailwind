'use client';
import { Grid, Stack, Button, Dialog, Box, Card, Heading } from '@sanity/ui';
import { useCallback, useState } from 'react';
import { AddIcon } from '@sanity/icons';
import { randomKey } from '@sanity/util/content';
import Image from 'next/image';
import {
  ArrayOfObjectsInputProps,
  BooleanSchemaType,
  FileSchemaType,
  NumberSchemaType,
  ObjectSchemaType,
  ReferenceSchemaType,
  StringSchemaType,
} from 'sanity';

type Schema =
  | BooleanSchemaType
  | FileSchemaType
  | NumberSchemaType
  | ObjectSchemaType
  | StringSchemaType
  | ReferenceSchemaType;

type PreviewProps = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  schema: Schema;
};
interface SanityItem {
  _type: string;
  _key: string;
}

const PageBuilderInput = (props: ArrayOfObjectsInputProps) => {
  const { onInsert } = props;
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);

  const onSelectItem = useCallback(
    (schema: Schema) => {
      const newItem: SanityItem = {
        _type: schema.name,
        _key: randomKey(12),
      };

      onInsert({
        items: [newItem],
        position: 'after',
        referenceItem: -1,
        open: true,
      });
      onClose();
    },
    [onInsert, onClose]
  );
  return (
    <Stack space={3}>
      {props.renderDefault({
        ...props,
        arrayFunctions: () => (
          <Button
            onClick={onOpen}
            icon={AddIcon}
            mode="ghost"
            text="Add Component"
          />
        ),
      })}

      {open && (
        <Dialog
          header="Select Component"
          id="component-selector"
          width={4}
          onClose={onClose}
        >
          <Box padding={4}>
            <Grid columns={[1, 2, 3, 4]} gap={3}>
              {props.schemaType.of.map((schema, index) => (
                <PreviewCard
                  key={index}
                  schema={schema}
                  onClick={() => onSelectItem(schema)}
                />
              ))}
            </Grid>
          </Box>
        </Dialog>
      )}
    </Stack>
  );
};

const PreviewCard = ({ schema, onClick }: PreviewProps) => (
  <Card
    padding={3}
    radius={2}
    shadow={1}
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <Stack space={3}>
      <Heading size={1}>{schema.title}</Heading>
      <Image
        src={`/sanity/${schema.name}.png`}
        alt={schema.title || ''}
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
        onError={(e: any) => (e.target.style.display = 'none')}
      />
    </Stack>
  </Card>
);

export default PageBuilderInput;
