import {
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import GenericList from './GenericList';
import { useEffect, useState } from 'react';
import { FaEdit, FaRemoveFormat } from 'react-icons/fa';
import CertificateItemDTO from '../../dto/resume/CertificateItemDTO';
import ToastUtil from '../util/ToastUtil';
import DateUtil from '../../util/DateUtil';

type AdditionalFields = { readOnly?: boolean; isAlreadyExists?: boolean };

const defaultExperienceItem: CertificateItemDTO & AdditionalFields = {
  backEndTechnologyList: [],
  frontEndTechnologyList: [],
  date: '',
  link: '',
  description: '',
  name: '',
  readOnly: false,
  isAlreadyExists: false,
};
export default function CertificateItem({
  exp,
  remove,
  update,
  add,
  readOnly,
}: {
  remove?: (exp: CertificateItemDTO) => void;
  add?: (exp: CertificateItemDTO) => void;
  update?: (exp: CertificateItemDTO) => void;
  exp?: CertificateItemDTO;
  readOnly: boolean;
}) {
  const [experience, setExperience] = useState<
    CertificateItemDTO & AdditionalFields
  >(defaultExperienceItem);

  useEffect(() => {
    setExperience({
      ...(exp || defaultExperienceItem),
      readOnly: readOnly,
      isAlreadyExists: readOnly,
    });
  }, []);

  const removeExperienceItem = () => {
    if (remove) {
      remove(experience);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExperience({ ...experience, [e.target.id]: e.target.value });
  };

  const handleOnChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setExperience({ ...experience, [e.target.id]: e.target.value });
  };

  const addBackEndTechnology = (tech: string) => {
    addToList(tech, 'backEndTechnologyList');
  };

  const removeBackEndTechnology = (tech: string) => {
    removeFromList(tech, 'backEndTechnologyList');
  };

  const addFrontEndTechnology = (tech: string) => {
    addToList(tech, 'frontEndTechnologyList');
  };

  const removeFrontEndTechnology = (tech: string) => {
    removeFromList(tech, 'frontEndTechnologyList');
  };

  const addNewExperience = () => {
    if (add) {
      add(experience);
    }
    setExperience(defaultExperienceItem);
  };

  const updateExperienceItem = () => {
    if (update) {
      update(experience);
    }
    setExperience({ ...experience, readOnly: true });
  };

  const removeFromList = (value: string, fieldName: string) => {
    let values = [value];
    if (experience && fieldName in experience) {
      values = [
        ...(experience as any)[fieldName].filter(
          (nat: string) => nat !== value
        ),
      ];
    }
    setExperience({
      ...experience,
      [fieldName]: values,
    });
  };
  const toast = useToast();

  const addToList = (value: string, fieldName: string) => {
    if (
      experience &&
      (experience as any)[fieldName] &&
      ((experience as any)[fieldName] as Array<string>).indexOf(value) > -1
    ) {
      ToastUtil.showWarning(
        toast,
        'Duplicate found',
        'Item "' + value + '" already exists'
      );
      return;
    }
    let values = [value];
    if (experience && fieldName in experience) {
      const list: Array<string> = (experience as any)[fieldName];
      values = [...list, value];
    }
    setExperience({
      ...experience,
      [fieldName]: values,
    });
  };
  const toggleReadOnly = () => {
    setExperience({ ...experience, readOnly: !experience.readOnly });
  };
  if (experience.readOnly) {
    return (
      <ReadOnlyItem
        removeExperienceItem={removeExperienceItem}
        experience={experience}
        toggleReadOnly={toggleReadOnly}
      />
    );
  }

  return (
    <Card width={'full'}>
      <CardBody>
        <SimpleGrid width={'full'} spacing={5} columns={{ base: 1, md: 2 }}>
          <FormControl>
            <FormLabel htmlFor="dateFrom">Date</FormLabel>
            <Input
              onChange={(e) => handleOnChange(e)}
              id="date"
              value={experience?.date}
              placeholder="Select Date and Time"
              size="md"
              type="date"
            />
          </FormControl>
        </SimpleGrid>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input onChange={handleOnChange} value={experience.name} id="name" />
          <FormHelperText>name</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            onChange={handleOnChangeTextArea}
            value={experience.description || ''}
            id="description"
          />
          <FormHelperText>project description</FormHelperText>
        </FormControl>
        <GenericList
          key={'back-end_' + experience.backEndTechnologyList}
          title="Back end technologies"
          readOnly={false}
          addItem={addBackEndTechnology}
          removeItem={removeBackEndTechnology}
          list={experience.backEndTechnologyList}
        />

        <GenericList
          readOnly={false}
          key={'front-end_' + experience.frontEndTechnologyList}
          title="Front end technologies"
          addItem={addFrontEndTechnology}
          removeItem={removeFrontEndTechnology}
          list={experience.frontEndTechnologyList}
        />

        <FormControl>
          <FormLabel htmlFor="link">Link</FormLabel>
          <Input onChange={handleOnChange} value={experience.link} id="link" />
          <FormHelperText>url</FormHelperText>
        </FormControl>

        {!experience.isAlreadyExists && (
          <Button width={'full'} onClick={() => addNewExperience()}>
            Add Experience
          </Button>
        )}
        {experience.isAlreadyExists && (
          <Button width={'full'} onClick={() => updateExperienceItem()}>
            Update
          </Button>
        )}
      </CardBody>
    </Card>
  );
}

function ReadOnlyItem({
  experience,
  toggleReadOnly,
  removeExperienceItem,
}: {
  experience: CertificateItemDTO;
  toggleReadOnly: () => void;
  removeExperienceItem: () => void;
}) {
  return (
    <Card width={'full'}>
      <CardBody>
        <Flex justifyContent={'end'}>
          <IconButton
            onClick={toggleReadOnly}
            icon={<FaEdit />}
            aria-label="Edit"
          />{' '}
          <IconButton
            onClick={() => removeExperienceItem()}
            icon={<FaRemoveFormat />}
            aria-label="Delete"
          />
        </Flex>
        <SimpleGrid width={'full'} columns={{ base: 1, sm: 2, md: 2 }}>
          <Text>Dates</Text>
          <Text>{DateUtil.dateToString(experience.date)}</Text>
          <Text>Name</Text>
          <Text>{experience.name}</Text> <Text>Description</Text>
          <Text>{experience.description}</Text>
          <Text>Back end technologies</Text>
          <Text>{experience.backEndTechnologyList.join(', ')}</Text>
          <Text>Front end technologies</Text>
          <Text>{experience.frontEndTechnologyList.join(', ')}</Text>
          <Text>Link</Text>
          <Text>{experience.link}</Text>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}
