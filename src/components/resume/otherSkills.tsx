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
import { useEffect, useState } from 'react';
import { useGlobalDispatch, useGlobalSelector } from '../store/hook';
import OtherSkillsDTO from '../../dto/resume/OtherSkillsDTO';
import { replaceOtherSkills } from '../store/odtheSkills-slice';
import GenericList from './GenericList';

export default function OtherSkills() {
  const data = useGlobalSelector((state) => {
    return state.otherSkills.otherSkills;
  });
  const dispatch = useGlobalDispatch();
  const [formData, setFormData] = useState<OtherSkillsDTO | undefined>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const removeFromList = (value: string, fieldName: string) => {
    let values = [value];
    if (formData && fieldName in formData) {
      values = [
        ...(formData as any)[fieldName].filter((nat: string) => nat !== value),
      ];
    }
    setFormData({
      ...formData,
      [fieldName]: values,
    });
    dispatch(replaceOtherSkills({ ...formData, [fieldName]: values }));
  };

  const addToList = (value: string, fieldName: string) => {
    let values = [value];
    if (formData && fieldName in formData) {
      const list: Array<string> = (formData as any)[fieldName];
      values = [...list, value];
    }
    setFormData({
      ...formData,
      [fieldName]: values,
    });
    dispatch(replaceOtherSkills({ ...formData, [fieldName]: values }));
  };

  const addOrganizationalItem = (tech: string) => {
    addToList(tech, 'organizationalList');
  };

  const removeOrganizationalItem = (tech: string) => {
    removeFromList(tech, 'organizationalList');
  };

  const addSocialItem = (tech: string) => {
    addToList(tech, 'socialList');
  };

  const removeSocialItem = (tech: string) => {
    removeFromList(tech, 'socialList');
  };

  const addOtherItem = (tech: string) => {
    addToList(tech, 'otherList');
  };

  const removeOtherItem = (tech: string) => {
    removeFromList(tech, 'otherList');
  };

  return (
    <VStack textAlign={'left'}>
      <Heading>Other Skills</Heading>
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
      <GenericList
        readOnly={false}
        key={'organizationalList_' + formData?.organizationalList}
        title="Organizational list"
        addItem={addOrganizationalItem}
        removeItem={removeOrganizationalItem}
        list={formData?.organizationalList}
      />
      <GenericList
        readOnly={false}
        key={'socialList_' + formData?.socialList}
        title="Social list"
        addItem={addSocialItem}
        removeItem={removeSocialItem}
        list={formData?.socialList}
      />
      <GenericList
        readOnly={false}
        key={'otherList_' + formData?.otherList}
        title="Other list"
        addItem={addOtherItem}
        removeItem={removeOtherItem}
        list={formData?.otherList}
      />
    </VStack>
  );
}
