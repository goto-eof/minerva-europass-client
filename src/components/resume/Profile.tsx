import {
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { replaceProfile } from '../store/profile-slice';
import { useGlobalDispatch, useGlobalSelector } from '../store/hook';
import ProfileDTO from '../../dto/resume/ProfileDTO';
import { useEffect, useRef, useState } from 'react';
import GenericList from './GenericList';
import GenericMap from './GenericMap';
import KeyValueDTO from '../../dto/resume/KeyValueDTO';
import ToastUtil from '../util/ToastUtil';

export default function Profile() {
  const formRef = useRef<HTMLFormElement>(null);
  const profileData = useGlobalSelector((state) => {
    return state.profile.profile;
  });
  const [formData, setFormData] = useState<ProfileDTO | undefined>(profileData);

  useEffect(() => {
    setFormData(profileData);
    if (!profileData) {
      formRef.current?.reset();
    }
  }, [profileData]);

  const dispatch = useGlobalDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(replaceProfile({ ...formData, [e.target.id]: e.target.value }));
  };

  const handleOnChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    dispatch(
      replaceProfile({
        ...formData,
        [e.target.id]: e.target.value,
      })
    );
  };

  const addNationality = (value: string) => {
    addToList(value, 'citizenshipList');
  };

  const toast = useToast();

  const addToList = (value: string, fieldName: string) => {
    if (
      formData &&
      (formData as any)[fieldName] &&
      ((formData as any)[fieldName] as Array<string>).indexOf(value) > -1
    ) {
      ToastUtil.showWarning(
        toast,
        'Duplicate found',
        'Item "' + value + '" already exists'
      );
      return;
    }
    let values = [value];
    if (formData && fieldName in formData) {
      const list: Array<string> = (formData as any)[fieldName];
      values = [...list, value];
    }
    setFormData({
      ...formData,
      [fieldName]: values,
    });
    dispatch(replaceProfile({ ...formData, [fieldName]: values }));
  };

  const addMainSkill = (value: string) => {
    addToList(value, 'mainSkillList');
  };

  const addLanguage = (value: string) => {
    addToList(value, 'languageList');
  };

  const addEmail = (keyValue: KeyValueDTO) => {
    addToMap(keyValue, 'emailMap');
  };

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
    dispatch(replaceProfile({ ...formData, [fieldName]: newMap }));
  };

  const addPhoneNumber = (keyValue: KeyValueDTO) => {
    addToMap(keyValue, 'phoneNumberMap');
  };

  const addUrl = (keyValue: KeyValueDTO) => {
    addToMap(keyValue, 'urlMap');
  };

  const removeNationality = (nationality: string) => {
    removeFromList(nationality, 'citizenshipList');
  };

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
    dispatch(replaceProfile({ ...formData, [fieldName]: values }));
  };

  const removeMainSkill = (value: string) => {
    removeFromList(value, 'mainSkillList');
  };

  const removeLanguage = (value: string) => {
    removeFromList(value, 'languageList');
  };

  const removeEmail = (keyValue: KeyValueDTO) => {
    removeFromMap(keyValue, 'emailMap');
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
    dispatch(replaceProfile({ ...formData, [fieldName]: itemsMap }));
  };

  const removePhoneNumber = (keyValue: KeyValueDTO) => {
    removeFromMap(keyValue, 'phoneNumberMap');
  };

  const removeUrl = (keyValue: KeyValueDTO) => {
    removeFromMap(keyValue, 'urlMap');
  };

  return (
    <VStack textAlign={'left'}>
      <Heading>Profile</Heading>
      <form ref={formRef} style={{ width: '100%' }}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2 }}
          spacing={6}
          width={'full'}
        >
          <FormControl>
            <FormLabel htmlFor="firstName">First name</FormLabel>
            <Input
              onChange={(e) => handleOnChange(e)}
              value={formData?.firstName}
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
              value={formData?.lastName}
              id="lastName"
            />
            <FormHelperText>Insert your last name</FormHelperText>
          </FormControl>
        </SimpleGrid>
        <SimpleGrid width={'full'}>
          <FormControl>
            <FormLabel htmlFor="birthDate">Birth date</FormLabel>
            <Input
              onChange={(e) => handleOnChangeDate(e)}
              name="birthDate"
              id="birthDate"
              value={formData?.birthDate}
              placeholder="Select Date and Time"
              size="md"
              type="date"
            />
          </FormControl>
        </SimpleGrid>
        <SimpleGrid
          columns={{ base: 1, sm: 3, md: 3 }}
          spacing={6}
          width={'full'}
        >
          <FormControl>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input
              onChange={(e) => handleOnChange(e)}
              value={formData?.city}
              name="city"
              id="city"
            />
            <FormHelperText>Insert your city</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="county">County</FormLabel>
            <Input
              onChange={(e) => handleOnChange(e)}
              name="county"
              value={formData?.county}
              id="county"
            />
            <FormHelperText>Insert your county</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input
              onChange={(e) => handleOnChange(e)}
              name="country"
              value={formData?.country}
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
              value={formData?.jobTitle}
              id="jobTitle"
            />
            <FormHelperText>Insert your Job title</FormHelperText>
          </FormControl>
        </SimpleGrid>
        <GenericList
          readOnly={false}
          key={'nationalities'}
          title="Nationalities"
          removeItem={removeNationality}
          list={formData?.citizenshipList}
          addItem={addNationality}
        />
        <GenericMap
          keyTitle="E-mail type"
          valueTitle="E-mail"
          key={'e-mails'}
          title="E-Mails"
          addButtonTitle={'Add E-Mail'}
          addItem={addEmail}
          removeItem={removeEmail}
          map={formData?.emailMap}
        />
        <GenericMap
          keyTitle="Phone type"
          valueTitle="Phone number"
          key={'phone-numbers'}
          title="Phone numbers"
          addButtonTitle={'Add Phone number'}
          addItem={addPhoneNumber}
          removeItem={removePhoneNumber}
          map={formData?.phoneNumberMap}
        />

        <GenericMap
          keyTitle="URL type"
          valueTitle="URL"
          key={'urls'}
          title="URLs"
          addButtonTitle={'Add URL'}
          addItem={addUrl}
          removeItem={removeUrl}
          map={formData?.urlMap}
        />

        <GenericList
          readOnly={false}
          key={'mainSkills'}
          title="Main Skills"
          removeItem={removeMainSkill}
          list={formData?.mainSkillList}
          addItem={addMainSkill}
        />

        <GenericList
          readOnly={false}
          key={'languages'}
          title="Languages"
          removeItem={removeLanguage}
          list={formData?.languageList}
          addItem={addLanguage}
        />
      </form>
    </VStack>
  );
}
