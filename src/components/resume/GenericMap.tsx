import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import KeyValueDTO from '../../dto/resume/KeyValueDTO';

const defaultKeyValue: KeyValueDTO = { key: '', value: '' };

export default function GenericMap({
  map,
  addItem,
  removeItem,
  title,
  addButtonTitle,
}: {
  title: string;
  addButtonTitle: string;
  map?: Array<KeyValueDTO>;
  addItem: (value: KeyValueDTO) => void;
  removeItem: (value: KeyValueDTO) => void;
}) {
  const [keyValue, setKeyValue] = useState<KeyValueDTO>(defaultKeyValue);

  const updateItem = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyValue({ ...keyValue, [e.target.id]: e.target.value });
  };

  const updateItems = () => {
    addItem(keyValue);
    setKeyValue(defaultKeyValue);
  };

  return (
    <Box width={'full'}>
      <Heading size={'sm'}>{title}</Heading>
      {map &&
        map.map((keyValue: KeyValueDTO) => (
          <ReadOnlyItem
            key={title + '_' + keyValue.key}
            removeItem={removeItem}
            keyValue={keyValue}
          />
        ))}
      <SimpleGrid py={5} columns={{ base: 1, md: 3 }} spacing={6}>
        <FormControl>
          <FormLabel htmlFor="key">Type</FormLabel>
          <Input
            onChange={(e) => updateItem(e)}
            type={'text'}
            id="key"
            value={keyValue.key}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="value">Value</FormLabel>
          <Input
            onChange={(e) => updateItem(e)}
            type={'text'}
            id="value"
            value={keyValue.value}
          />
        </FormControl>
        <FormControl>
          <Box py={4}></Box>

          <Button
            variant={'outline'}
            colorScheme="green"
            onClick={() => updateItems()}
          >
            {addButtonTitle}
          </Button>
        </FormControl>
      </SimpleGrid>
    </Box>
  );
}

function ReadOnlyItem({
  keyValue,
  removeItem,
}: {
  removeItem: (keyValue: KeyValueDTO) => void;
  keyValue: KeyValueDTO;
}) {
  return (
    <SimpleGrid spacing={6} columns={{ base: 1, md: 3 }} py={5}>
      <FormControl>
        <FormLabel htmlFor="key">Type</FormLabel>
        <Input
          value={keyValue.key}
          type={'text'}
          backgroundColor={'rgb(240, 240, 240)'}
          readOnly
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="key">Value</FormLabel>
        <Input
          value={keyValue.value}
          type={'text'}
          backgroundColor={'rgb(240, 240, 240)'}
          readOnly
        />
      </FormControl>
      <FormControl>
        <Box py={4}></Box>
        <Button
          variant={'outline'}
          colorScheme="red"
          onClick={() => removeItem(keyValue)}
        >
          Delete
        </Button>
      </FormControl>
    </SimpleGrid>
  );
}
