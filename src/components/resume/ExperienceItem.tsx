import {
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import ExperienceItemDTO from '../../dto/resume/ExperienceItemDTO';
import DateUtil from '../../util/DateUtil';
import GenericList from './GenericList';
import { useEffect, useState } from 'react';
import { FaEdit, FaRemoveFormat } from 'react-icons/fa';

type AdditionalFields = { readOnly?: boolean; isAlreadyExists?: boolean };

const defaultExperienceItem: ExperienceItemDTO & AdditionalFields = {
  dateFrom: '',
  dateTo: '',
  jobTitle: '',
  mainActivities: '',
  customer: '',
  sector: '',
  toolList: new Array<string>(),
  isWorkedAsBackEndDeveloper: true,
  isWorkedAsFrontEndDeveloper: true,
  workingMethodology: '',
  backEndTechnologyList: [],
  frontEndTechnologyList: [],
  isAlreadyExists: false,
};
export default function ExperienceItem({
  exp,
  removeExperience,
  updateExperience,
  addExperience,
  readOnly,
}: {
  removeExperience?: (exp: ExperienceItemDTO) => void;
  addExperience?: (exp: ExperienceItemDTO) => void;
  updateExperience?: (exp: ExperienceItemDTO) => void;
  exp?: ExperienceItemDTO;
  readOnly: boolean;
}) {
  useEffect(() => {
    setExperience({
      ...experience,
      readOnly: readOnly,
      isAlreadyExists: readOnly,
    });
  }, []);

  const removeExperienceItem = () => {
    if (removeExperience) {
      removeExperience(experience);
    }
  };

  const [experience, setExperience] = useState<
    ExperienceItemDTO & AdditionalFields
  >(exp || defaultExperienceItem);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExperience({ ...experience, [e.target.id]: e.target.value });
  };

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExperience({ ...experience, [e.target.id]: e.target.checked });
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

  const addTool = (tech: string) => {
    addToList(tech, 'toolList');
  };

  const removeTool = (tech: string) => {
    removeFromList(tech, 'toolList');
  };

  const addNewExperience = () => {
    if (addExperience) {
      addExperience(experience);
    }
    setExperience(defaultExperienceItem);
  };

  const updateExperienceItem = () => {
    if (updateExperience) {
      updateExperience(experience);
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

  const addToList = (value: string, fieldName: string) => {
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
            <FormLabel htmlFor="dateFrom">Date from</FormLabel>
            <Input
              onChange={(e) => handleOnChange(e)}
              name="dateFrom"
              id="dateFrom"
              value={experience?.dateFrom}
              placeholder="Select Date and Time"
              size="md"
              type="date"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="dateTo">Date to</FormLabel>
            <Input
              onChange={(e) => handleOnChange(e)}
              name="dateTo"
              id="dateTo"
              value={experience?.dateTo}
              placeholder="Select Date and Time"
              size="md"
              type="date"
            />
          </FormControl>
        </SimpleGrid>
        <FormControl>
          <FormLabel htmlFor="jobTitle">Job title</FormLabel>
          <Input
            onChange={handleOnChange}
            value={experience.jobTitle}
            id="jobTitle"
          />
          <FormHelperText>
            Insert experience job title, like back-end software developer
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="mainActivities">Main activities</FormLabel>
          <Input
            onChange={handleOnChange}
            value={experience.mainActivities}
            id="mainActivities"
          />
          <FormHelperText>
            ex. software implementation and unit test
          </FormHelperText>
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
        <Checkbox
          isChecked={experience.isWorkedAsBackEndDeveloper}
          onChange={handleCheckBox}
          id={'isWorkedAsBackEndDeveloper'}
          defaultChecked={experience.backEndTechnologyList.length > 0}
        >
          I worked as back-end developer
        </Checkbox>

        <GenericList
          readOnly={false}
          key={'front-end_' + experience.frontEndTechnologyList}
          title="Front end technologies"
          addItem={addFrontEndTechnology}
          removeItem={removeFrontEndTechnology}
          list={experience.frontEndTechnologyList}
        />
        <Checkbox
          isChecked={experience.isWorkedAsFrontEndDeveloper}
          id={'isWorkedAsFrontEndDeveloper'}
          onChange={handleCheckBox}
          defaultChecked={experience.frontEndTechnologyList.length > 0}
        >
          I worked as front-end developer
        </Checkbox>
        <GenericList
          key={'tools_' + experience.toolList}
          title="Tools"
          readOnly={false}
          addItem={addTool}
          removeItem={removeTool}
          list={experience.toolList}
        />
        <FormControl>
          <FormLabel htmlFor="workingMethodology">
            Working methodology
          </FormLabel>
          <Input
            onChange={handleOnChange}
            value={experience.workingMethodology}
            id="workingMethodology"
          />
          <FormHelperText>Working methodology</FormHelperText>
        </FormControl>
        <SimpleGrid spacing={5} columns={{ base: 1, md: 2 }}>
          <FormControl>
            <FormLabel htmlFor="company">Company</FormLabel>
            <Input
              onChange={handleOnChange}
              value={experience.customer}
              id="customer"
            />
            <FormHelperText>Company</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="sector">Sector</FormLabel>
            <Input
              onChange={handleOnChange}
              value={experience.sector}
              id="sector"
            />
            <FormHelperText>Sector</FormHelperText>
          </FormControl>
        </SimpleGrid>
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
  experience: ExperienceItemDTO;
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
          <Text>
            {DateUtil.dateToString(experience.dateFrom)} -{' '}
            {DateUtil.dateToString(experience.dateTo)}
          </Text>
          <Text>Job title</Text>
          <Text>{experience.jobTitle}</Text>
          <Text>Main activities</Text>
          <Text>{experience.mainActivities}</Text>
          <Text>Description</Text>
          <Text>{experience.description}</Text>
          <Text>Back end technologies</Text>
          <Text>{experience.backEndTechnologyList.join(', ')}</Text>
          <Text>Front end technologies</Text>
          <Text>{experience.frontEndTechnologyList.join(', ')}</Text>
          <Text>Tools</Text>
          <Text>{experience.toolList.join(', ')}</Text>
          <Text>Working methodology</Text>
          <Text>{experience.workingMethodology}</Text>
          <Text>Company</Text>
          <Text>{experience.customer}</Text>
          <Text>Sector</Text>
          <Text>{experience.sector}</Text>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}
