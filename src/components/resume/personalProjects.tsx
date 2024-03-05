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
import { useEffect, useRef, useState } from 'react';
import { useGlobalDispatch, useGlobalSelector } from '../store/hook';
import { replaceExperience } from '../store/experience-slice';
import ExperienceItemDTO from '../../dto/resume/ExperienceItemDTO';
import PersonalProjectsDTO from '../../dto/resume/PersonalProjectDTO';
import { replacePersonalProjects } from '../store/personalProjects-slice';
import PersonalProjectItem from './PersonalProjectItem';

export default function PersonalProjects() {
  const formRef = useRef<HTMLFormElement>(null);
  const data = useGlobalSelector((state) => {
    return state.personalProjects.personalProjects;
  });
  const dispatch = useGlobalDispatch();
  const [formData, setFormData] = useState<PersonalProjectsDTO | undefined>(
    data
  );

  useEffect(() => {
    setFormData(data);
    if (!data) {
      formRef.current?.reset();
    }
  }, [data]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(
      replacePersonalProjects({ ...formData, [e.target.id]: e.target.value })
    );
  };
  const handleOnChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(
      replacePersonalProjects({ ...formData, [e.target.id]: e.target.value })
    );
  };

  const handleAddItem = (experience: ExperienceItemDTO) => {
    const id = formData?.experienceList?.length || 0;
    const newExperience = { ...experience, _id: id };
    console.log(newExperience);
    const newItem = {
      ...formData,
      experienceList: [...(formData?.experienceList || []), newExperience],
    };
    setFormData(newItem);
    dispatch(replacePersonalProjects(newItem));
  };

  const handleRemoveExperience = (experience: ExperienceItemDTO) => {
    console.log(formData?.experienceList);
    const newItem = {
      ...formData,
      experienceList: (formData?.experienceList || []).filter(
        (exp) => exp._id !== experience._id
      ),
    };
    setFormData(newItem);
    dispatch(replacePersonalProjects(newItem));
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
      <Heading>Personal Projects</Heading>
      <form ref={formRef} style={{ width: '100%' }}>
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
              value={formData?.description || ''}
              id="description"
            />
            <FormHelperText>Insert experience description</FormHelperText>
          </FormControl>
        </SimpleGrid>
        <Divider />
        <SimpleGrid columns={{ base: 1, md: 2 }}>
          {formData?.experienceList &&
            formData.experienceList.map((item) => (
              <PersonalProjectItem
                key={'personal_project_item_' + item._id}
                removeExperience={handleRemoveExperience}
                readOnly={true}
                exp={item}
                updateExperience={updateExperience}
              />
            ))}
        </SimpleGrid>
        <Divider />
        <PersonalProjectItem readOnly={false} addExperience={handleAddItem} />
      </form>
    </VStack>
  );
}
