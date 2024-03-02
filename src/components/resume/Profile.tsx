import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { replaceProfile } from '../store/profile-slice';
import { useGlobalDispatch } from '../store/hook';
import ProfileDTO from '../../dto/resume/ProfileDTO';
import { useState } from 'react';
import GenericList from './GenericList';
import GenericMap from './GenericMap';
import KeyValueDTO from '../../dto/resume/KeyValueDTO';

export default function Profile({}: {}) {
  const [formData, setFormData] = useState<ProfileDTO>();

  const dispatch = useGlobalDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(replaceProfile({ ...formData, [e.target.id]: e.target.value }));
  };

  const addNationality = (nationality: string) => {
    const nationalities = [...(formData?.citizenshipList || []), nationality];
    setFormData({
      ...formData,
      citizenshipList: nationalities,
    });
    dispatch(replaceProfile({ ...formData, citizenshipList: nationalities }));
  };

  const addEmail = (keyValue: KeyValueDTO) => {
    const itemsMap: Map<string, string> =
      formData?.emailMap || new Map<string, string>();
    const newMap: Map<string, string> = new Map<string, string>(itemsMap);
    console.log(newMap);
    newMap.set(keyValue.key, keyValue.value);
    console.log('ok');
    setFormData({
      ...formData,
      emailMap: newMap,
    });
    dispatch(replaceProfile({ ...formData, emailMap: newMap }));
  };

  const addPhoneNumber = (keyValue: KeyValueDTO) => {
    const itemsMap: Map<string, string> =
      formData?.phoneNumberMap || new Map<string, string>();
    const newMap: Map<string, string> = new Map<string, string>(itemsMap);
    console.log(newMap);
    newMap.set(keyValue.key, keyValue.value);
    console.log('ok');
    setFormData({
      ...formData,
      phoneNumberMap: newMap,
    });
    dispatch(replaceProfile({ ...formData, phoneNumberMap: newMap }));
  };

  const removeNationality = (nationality: string) => {
    const nationalities = [
      ...(formData?.citizenshipList || []).filter((nat) => nat !== nationality),
    ];
    setFormData({
      ...formData,
      citizenshipList: nationalities,
    });
    dispatch(replaceProfile({ ...formData, citizenshipList: nationalities }));
  };

  const removeEmail = (keyValue: KeyValueDTO) => {
    const itemsMap = new Map<string, string>(
      formData?.emailMap || new Map<string, string>()
    );
    itemsMap.delete(keyValue.key);
    setFormData({
      ...formData,
      emailMap: itemsMap,
    });
    dispatch(replaceProfile({ ...formData, emailMap: itemsMap }));
  };

  const removePhoneNumber = (keyValue: KeyValueDTO) => {
    const itemsMap = new Map<string, string>(
      formData?.phoneNumberMap || new Map<string, string>()
    );
    itemsMap.delete(keyValue.key);
    setFormData({
      ...formData,
      phoneNumberMap: itemsMap,
    });
    dispatch(replaceProfile({ ...formData, phoneNumberMap: itemsMap }));
  };

  return (
    <VStack textAlign={'left'}>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 2 }}
        spacing={6}
        width={'full'}
      >
        <FormControl>
          <FormLabel htmlFor="firstName">First name</FormLabel>
          <Input
            onChange={(e) => handleOnChange(e)}
            name="firstName"
            id="firstName"
          />
          <FormHelperText>Insert your first name</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastName">Last name</FormLabel>
          <Input
            onChange={(e) => handleOnChange(e)}
            name="lastName"
            id="lastName"
          />
          <FormHelperText>Insert your last name</FormHelperText>
        </FormControl>
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, sm: 3, md: 3 }}
        spacing={6}
        width={'full'}
      >
        <FormControl>
          <FormLabel htmlFor="city">City</FormLabel>
          <Input onChange={(e) => handleOnChange(e)} name="city" id="city" />
          <FormHelperText>Insert your city</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="county">County</FormLabel>
          <Input
            onChange={(e) => handleOnChange(e)}
            name="county"
            id="county"
          />
          <FormHelperText>Insert your county</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="country">Country</FormLabel>
          <Input
            onChange={(e) => handleOnChange(e)}
            name="country"
            id="country"
          />
          <FormHelperText>Insert your country</FormHelperText>
        </FormControl>
      </SimpleGrid>
      <SimpleGrid width={'full'}>
        <FormControl>
          <FormLabel htmlFor="jobTitle">Job title</FormLabel>
          <Input
            onChange={(e) => handleOnChange(e)}
            name="jobTitle"
            id="jobTitle"
          />
          <FormHelperText>Insert your Job title</FormHelperText>
        </FormControl>
      </SimpleGrid>
      <GenericList
        title="Nationalities"
        removeItem={removeNationality}
        list={formData?.citizenshipList}
        addItem={addNationality}
      />
      <GenericMap
        key={'e-mails'}
        title="E-Mails"
        addButtonTitle={'Add E-Mail'}
        addItem={addEmail}
        removeItem={removeEmail}
        map={formData?.emailMap}
      />
      <GenericMap
        key={'phone-numbers'}
        title="Phone numbers"
        addButtonTitle={'Add Phone number'}
        addItem={addPhoneNumber}
        removeItem={removePhoneNumber}
        map={formData?.phoneNumberMap}
      />
    </VStack>
  );
}
