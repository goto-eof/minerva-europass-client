import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { replaceProfile } from '../store/profile-slice';
import { useGlobalDispatch } from '../store/hook';

type ProfileFormData = {
  firstName?: string;
  lastName?: string;
  image?: string;
  city?: string;
  county?: string;
  country?: string;
  jobTitle?: string;
  citizenshipList?: Array<string>;
  emailMap?: Map<string, string>;
  phoneNumberMap?: Map<string, string>;
  birthDate?: Date;
  urlMap?: Map<string, string>;
  mainSkillList?: Array<string>;
  languageList?: Array<string>;
};

export default function Profile({}: {}) {
  const [formData, setFormData] = useState<ProfileFormData>();

  const dispatch = useGlobalDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(replaceProfile({ ...formData, [e.target.id]: e.target.value }));
  };

  return (
    <VStack textAlign={'left'}>
      <SimpleGrid columns={{ base: 2 }} spacing={6} width={'full'}>
        <FormControl>
          <FormLabel htmlFor="firstName">First name</FormLabel>
          <Input onChange={(e) => handleOnChange(e)} id="firstName" />
          <FormHelperText>Insert your first name</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastName">Last name</FormLabel>
          <Input onChange={(e) => handleOnChange(e)} id="lastName" />
          <FormHelperText>Insert your last name</FormHelperText>
        </FormControl>
      </SimpleGrid>
    </VStack>
  );
}
