import {
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useGlobalDispatch, useGlobalSelector } from '../store/hook';
import OtherDTO from '../../dto/resume/OtherDTO';
import { replaceOther } from '../store/other-slice';
import KeyValueDTO from '../../dto/resume/KeyValueDTO';
import GenericMap from './GenericMap';

export default function Other() {
  const data = useGlobalSelector((state) => {
    return state.other.other;
  });
  const dispatch = useGlobalDispatch();
  const [formData, setFormData] = useState<OtherDTO | undefined>(data);

  const addToMap = (keyValue: KeyValueDTO, fieldName: string) => {
    let itemsMap: Array<KeyValueDTO> = new Array<KeyValueDTO>();
    if (formData && fieldName in formData) {
      console.log(formData);
      itemsMap = (formData as any)[fieldName];
    }
    console.log(itemsMap);
    const newMap: Array<KeyValueDTO> = [...itemsMap];
    newMap.push(keyValue);
    setFormData({
      ...formData,
      [fieldName]: newMap,
    });
    dispatch(replaceOther({ ...formData, [fieldName]: newMap }));
  };

  const removeFromMap = (keyValue: KeyValueDTO, fieldName: string) => {
    let itemsMap = new Array<KeyValueDTO>();
    if (formData && fieldName in formData) {
      itemsMap = (formData as any)[fieldName].filter(
        (item: KeyValueDTO) => item.key !== keyValue.key
      );
    }
    setFormData({
      ...formData,
      [fieldName]: itemsMap,
    });
    dispatch(replaceOther({ ...formData, [fieldName]: itemsMap }));
  };

  const addItem = (item: KeyValueDTO) => {
    addToMap(item, 'otherList');
  };

  const removeItem = (item: KeyValueDTO) => {
    removeFromMap(item, 'otherList');
  };

  return (
    <VStack textAlign={'left'}>
      <Heading>Other</Heading>
      {/* <SimpleGrid
        columns={{ base: 1, sm: 2, md: 2 }}
        spacing={6}
        width={'full'}
      >
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            onChange={(e) => handleOnChange(e)}
            value={formData?.title}
            id="title"
          />
          <FormHelperText>Insert education section title</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            width={'full'}
            onChange={(e) => handleOnChangeTextArea(e)}
            value={formData?.description}
            id="description"
          />
          <FormHelperText>Insert education description</FormHelperText>
        </FormControl>
      </SimpleGrid> */}
      <Divider />
      <GenericMap
        key={'others'}
        title="Other"
        addButtonTitle={'Add other skill'}
        addItem={addItem}
        removeItem={removeItem}
        map={formData?.otherList}
      />
    </VStack>
  );
}
