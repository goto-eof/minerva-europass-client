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
  useToast,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useGlobalDispatch, useGlobalSelector } from '../store/hook';
import OtherDTO from '../../dto/resume/OtherDTO';
import { replaceOther } from '../store/other-slice';
import KeyValueDTO from '../../dto/resume/KeyValueDTO';
import GenericMap from './GenericMap';
import ToastUtil from '../util/ToastUtil';

export default function Other() {
  const formRef = useRef<HTMLFormElement>(null);
  const data = useGlobalSelector((state) => {
    return state.other.other;
  });
  const dispatch = useGlobalDispatch();
  const [formData, setFormData] = useState<OtherDTO | undefined>(data);

  useEffect(() => {
    setFormData(data);
    if (!data) {
      formRef.current?.reset();
    }
  }, [data]);

  const toast = useToast();

  const addToMap = (keyValue: KeyValueDTO, fieldName: string) => {
    if (
      formData &&
      (formData as any)[fieldName] &&
      !!((formData as any)[fieldName] as Array<KeyValueDTO>).find(
        (item) => item.key === keyValue.key
      )
    ) {
      ToastUtil.showWarning(
        toast,
        'Duplicate found',
        'Item "' + keyValue.key + '" already exists'
      );
      return;
    }
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

      <Divider />
      <form ref={formRef} style={{ width: '100%' }}>
        <GenericMap
          key={'others'}
          title="Other"
          keyTitle="Category"
          valueTitle="Content"
          addButtonTitle={'Add other skill'}
          addItem={addItem}
          removeItem={removeItem}
          map={formData?.otherList}
        />
      </form>
    </VStack>
  );
}
