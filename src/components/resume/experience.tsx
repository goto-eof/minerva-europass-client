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
import ExperienceDTO from '../../dto/resume/ExperienceDTO';
import { replaceExperience } from '../store/experience-slice';
import ExperienceItemDTO from '../../dto/resume/ExperienceItemDTO';
import ExperienceItem from './ExperienceItem';

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

  const handleAddExperience = (experience: ExperienceItemDTO) => {
    experience._id = formData?.experienceList?.length;
    const newExperience = {
      ...formData,
      experienceList: [...(formData?.experienceList || []), experience],
    };
    setFormData(newExperience);
    dispatch(replaceExperience(newExperience));
  };

  const handleRemoveExperience = (experience: ExperienceItemDTO) => {
    const newExperience = {
      ...formData,
      experienceList: (formData?.experienceList || []).filter(
        (exp) => exp._id !== experience._id
      ),
    };
    setFormData(newExperience);
    dispatch(replaceExperience(newExperience));
  };

  const equals = (exp1: ExperienceItemDTO, exp2: ExperienceItemDTO) => {
    return (
      exp1.dateFrom === exp2.dateFrom &&
      exp1.dateTo === exp2.dateTo &&
      exp1.description === exp2.description
    );
  };

  const updateExperience = (experience: ExperienceItemDTO) => {
    const newExperience = {
      ...formData,
      experienceList: (formData?.experienceList || []).map((exp) => {
        if (exp._id === experience._id) {
          return experience;
        }
        return exp;
      }),
    };
    setFormData(newExperience);
    dispatch(replaceExperience(newExperience));
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
      <Divider />
      {formData?.experienceList &&
        formData.experienceList.map((item) => (
          <ExperienceItem
            removeExperience={handleRemoveExperience}
            readOnly={true}
            exp={item}
            updateExperience={updateExperience}
          />
        ))}
      <Divider />
      <ExperienceItem readOnly={false} addExperience={handleAddExperience} />
    </VStack>
  );
}