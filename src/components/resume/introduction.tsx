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
import IntroductionDTO from '../../dto/resume/IntroductionDTO';
import { useState } from 'react';
import { useGlobalDispatch, useGlobalSelector } from '../store/hook';
import { replaceIntroduction } from '../store/introdution-slice';

export default function Introduction() {
  const data = useGlobalSelector((state) => {
    return state.introduction.introduction;
  });
  const dispatch = useGlobalDispatch();
  const [formData, setFormData] = useState<IntroductionDTO | undefined>(data);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(
      replaceIntroduction({ ...formData, [e.target.id]: e.target.value })
    );
  };
  const handleOnChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(
      replaceIntroduction({ ...formData, [e.target.id]: e.target.value })
    );
  };
  return (
    <VStack textAlign={'left'}>
      <Heading>Profile</Heading>
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 1 }}
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
          <FormHelperText>Insert introductions title</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="firstName">Content</FormLabel>
          <Textarea
            noOfLines={30}
            minH={'60vh'}
            width={'full'}
            onChange={(e) => handleOnChangeTextArea(e)}
            value={formData?.description}
            id="description"
          />
          <FormHelperText>Insert introductions content</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="footer">Introduction Footer</FormLabel>
          <Textarea
            width={'full'}
            onChange={(e) => handleOnChangeTextArea(e)}
            value={formData?.footer}
            id="description"
          />
          <FormHelperText>Insert introduction content</FormHelperText>
        </FormControl>
      </SimpleGrid>
    </VStack>
  );
}
