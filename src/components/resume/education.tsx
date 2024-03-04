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
import EducationDTO from '../../dto/resume/EducationDTO';
import EducationItemDTO from '../../dto/resume/EducationItemDTO';
import { replaceEducation } from '../store/education-slice';
import EducationItem from './EducationItem';

export default function Education() {
  const data = useGlobalSelector((state) => {
    return state.education.education;
  });
  const dispatch = useGlobalDispatch();
  const [formData, setFormData] = useState<EducationDTO | undefined>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(replaceEducation({ ...formData, [e.target.id]: e.target.value }));
  };
  const handleOnChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(replaceEducation({ ...formData, [e.target.id]: e.target.value }));
  };

  const handleAddItem = (item: EducationItemDTO) => {
    item._id = formData?.educationList?.length;
    const newItem = {
      ...formData,
      educationList: [...(formData?.educationList || []), item],
    };
    setFormData(newItem);
    dispatch(replaceEducation(newItem));
  };

  const handleRemoveItem = (item: EducationItemDTO) => {
    const newItem = {
      ...formData,
      educationList: (formData?.educationList || []).filter(
        (exp) => exp._id !== item._id
      ),
    };
    setFormData(newItem);
    dispatch(replaceEducation(newItem));
  };

  const updateItem = (item: EducationItemDTO) => {
    const newItem = {
      ...formData,
      educationList: (formData?.educationList || []).map((exp) => {
        if (exp._id === item._id) {
          return item;
        }
        return exp;
      }),
    };
    setFormData(newItem);
    dispatch(replaceEducation(newItem));
  };

  return (
    <VStack textAlign={'left'}>
      <Heading>Education</Heading>
      <SimpleGrid
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
      </SimpleGrid>
      <Divider />
      {formData?.educationList &&
        formData.educationList.map((item, idx) => (
          <EducationItem
            key={'education_' + idx}
            removeItem={handleRemoveItem}
            readOnly={true}
            exp={item}
            updateItem={updateItem}
          />
        ))}
      <Divider />
      <EducationItem readOnly={false} addItem={handleAddItem} />
    </VStack>
  );
}
