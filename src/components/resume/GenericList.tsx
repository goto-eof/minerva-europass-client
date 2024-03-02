import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
} from '@chakra-ui/react';
import { ChangeEvent, FC, ReactNode, useState } from 'react';

type ReadOnlyGenericList = {
  readOnly: boolean;
  title: string;
  list?: Array<string>;
};

type WriteOnlyGenericList = {
  readOnly: boolean;
  title: string;
  list?: Array<string>;
  addItem: (value: string) => void;
  removeItem: (value: string) => void;
};

type GenericListType = ReadOnlyGenericList | WriteOnlyGenericList;

export default function GenericList(props: GenericListType) {
  const [value, setValue] = useState<string>('');

  const updateItem = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  if (props.readOnly) {
    return (
      <Box>
        {props.title}: {props.list && props.list.join(', ')}
      </Box>
    );
  }

  const updateItems = (nationality: string) => {
    if ((props as any).addItem) {
      (props as WriteOnlyGenericList).addItem(nationality);
    }
    setValue('');
  };

  const removeElement = (value: string) => {
    if ((props as any).removeItem) {
      (props as WriteOnlyGenericList).removeItem(value);
    }
  };

  return (
    <Box width={'full'}>
      <Heading size={'sm'}>{props.title}</Heading>
      <SimpleGrid py={5} columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {props.list &&
          props.list.map((value: string) => (
            <ReadOnlyItem
              key={props.title + '_' + value}
              removeItem={removeElement}
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
