import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import KeyValueDTO from '../../dto/resume/KeyValueDTO';
import ToastUtil from '../util/ToastUtil';

const defaultKeyValue: KeyValueDTO = { key: '', value: '' };

export default function GenericMap({
  map,
  addItem,
  removeItem,
  title,
  addButtonTitle,
  keyTitle,
  valueTitle,
}: {
  title: string;
  keyTitle?: string;
  valueTitle?: string;
  addButtonTitle: string;
  map?: Array<KeyValueDTO>;
  addItem: (value: KeyValueDTO) => void;
  removeItem: (value: KeyValueDTO) => void;
}) {
  const [keyValue, setKeyValue] = useState<KeyValueDTO>(defaultKeyValue);

  const updateItem = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyValue({ ...keyValue, [e.target.id]: e.target.value });
  };

  const toast = useToast();

  const updateItems = () => {
    if (!keyValue.key) {
      ToastUtil.showWarning(toast, 'Empty value', 'Invalid value');
      return;
    }
    addItem(keyValue);
    setKeyValue(defaultKeyValue);
  };

  return (
    <Box width={'full'}>
      <Heading size={'sm'}>{title}</Heading>
      {map &&
        map.map((keyValue: KeyValueDTO) => (
          <ReadOnlyItem
            keyTitle={keyTitle}
            valueTitle={valueTitle}
            key={title + '_' + keyValue.key}
            removeItem={removeItem}
            keyValue={keyValue}
          />
        ))}
      <SimpleGrid py={5} columns={{ base: 1, md: 3 }} spacing={6}>
        <FormControl>
          <FormLabel htmlFor="key">{keyTitle ? keyTitle : 'Type'}</FormLabel>
          <Input
            onChange={(e) => updateItem(e)}
            type={'text'}
            id="key"
            value={keyValue.key}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="value">
            {valueTitle ? valueTitle : 'Value'}
          </FormLabel>
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
  keyTitle,
  valueTitle,
  removeItem,
}: {
  keyTitle?: string;
  valueTitle?: string;
  removeItem: (keyValue: KeyValueDTO) => void;
  keyValue: KeyValueDTO;
}) {
  return (
    <SimpleGrid spacing={6} columns={{ base: 1, md: 3 }} py={5}>
      <FormControl>
        <FormLabel htmlFor="key">{keyTitle ? keyTitle : 'Type'}</FormLabel>
        <Input
          value={keyValue.key}
          type={'text'}
          backgroundColor={'blackAlpha.300'}
          readOnly
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="key">{valueTitle ? valueTitle : ''}</FormLabel>
        <Input
          value={keyValue.value}
          type={'text'}
          backgroundColor={'blackAlpha.300'}
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
