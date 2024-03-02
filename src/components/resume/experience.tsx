import {
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
import ExperienceDTO from '../../dto/resume/ExperienceDTO';
import { replaceExperience } from '../store/experience-slice';

export default function Experience() {
  const data = useGlobalSelector((state) => {
    return state.experience.experience;
  });
  const dispatch = useGlobalDispatch();
  const [formData, setFormData] = useState<ExperienceDTO | undefined>(data);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(replaceExperience({ ...formData, [e.target.id]: e.target.value }));
  };
  const handleOnChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(replaceExperience({ ...formData, [e.target.id]: e.target.value }));
  };
  return (
    <VStack textAlign={'left'}>
      <Heading>Experience</Heading>
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
          <FormHelperText>Insert experience section title</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            width={'full'}
            onChange={(e) => handleOnChangeTextArea(e)}
            value={formData?.description}
            id="description"
          />
          <FormHelperText>Insert experience description</FormHelperText>
        </FormControl>
      </SimpleGrid>
    </VStack>
  );
}
