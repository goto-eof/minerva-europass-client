import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

export default function GenericList({
  list,
  addItem,
  removeItem,
  title,
}: {
  title: string;
  list?: Array<string>;
  addItem: (value: string) => void;
  removeItem: (value: string) => void;
}) {
  const [value, setValue] = useState<string>('');

  const updateItem = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const updateItems = (nationality: string) => {
    addItem(nationality);
    setValue('');
  };

  return (
    <Box width={'full'}>
      <Heading size={'sm'}>{title}</Heading>
      <SimpleGrid py={5} columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {list &&
          list.map((value: string) => (
            <ReadOnlyItem
              key={title + '_' + value}
              removeItem={removeItem}
              value={value}
            />
          ))}
        <InputGroup size="md">
          <Input
            onChange={(e) => updateItem(e)}
            pr="4.5rem"
            type={'text'}
            value={value}
          />
          <InputRightElement width="4.5rem">
            <Button
              variant={'outline'}
              colorScheme="green"
              h="1.75rem"
              size="sm"
              onClick={() => updateItems(value)}
            >
              {'Add'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </SimpleGrid>
    </Box>
  );
}

function ReadOnlyItem({
  value,
  removeItem,
}: {
  removeItem: (value: string) => void;
  value: string;
}) {
  return (
    <InputGroup size="md">
      <Input
        value={value}
        pr="4.5rem"
        type={'text'}
        backgroundColor={'blackAlpha.300'}
        readOnly
      />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          variant={'outline'}
          colorScheme="red"
          onClick={() => removeItem(value)}
        >
          {'Remove'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
