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
} from '@chakra-ui/react';
import EducationItemDTO from '../../dto/resume/EducationItemDTO';
import DateUtil from '../../util/DateUtil';
import { useEffect, useState } from 'react';
import { FaEdit, FaRemoveFormat } from 'react-icons/fa';

type AdditionalFields = { readOnly?: boolean; isAlreadyExists?: boolean };

const defaultExperienceItem: EducationItemDTO & AdditionalFields = {
  dateFrom: '',
  dateTo: '',
  name: '',
  description: '',
  isAlreadyExists: false,
};
export default function EducationItem({
  exp,
  removeItem,
  updateItem,
  addItem,
  readOnly,
}: {
  removeItem?: (exp: EducationItemDTO) => void;
  addItem?: (exp: EducationItemDTO) => void;
  updateItem?: (exp: EducationItemDTO) => void;
  exp?: EducationItemDTO;
  readOnly: boolean;
}) {
  useEffect(() => {
    setItem({
      ...item,
      readOnly: readOnly,
      isAlreadyExists: readOnly,
    });
  }, []);

  const removeExperienceItem = () => {
    if (removeItem) {
      removeItem(item);
    }
  };

  const [item, setItem] = useState<EducationItemDTO & AdditionalFields>(
    exp || defaultExperienceItem
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.id]: e.target.value });
  };

  const handleOnChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setItem({ ...item, [e.target.id]: e.target.value });
  };

  const addNewItem = () => {
    if (addItem) {
      addItem(item);
    }
    setItem(defaultExperienceItem);
  };

  const updateEducationItem = () => {
    if (updateItem) {
      updateItem(item);
    }
    setItem({ ...item, readOnly: true });
  };

  const toggleReadOnly = () => {
    setItem({ ...item, readOnly: !item.readOnly });
  };
  if (item.readOnly) {
    return (
      <ReadOnlyItem
        removeExperienceItem={removeExperienceItem}
        item={item}
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
              value={item?.dateFrom}
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
              value={item?.dateTo}
              placeholder="Select Date and Time"
              size="md"
              type="date"
            />
          </FormControl>
        </SimpleGrid>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input onChange={handleOnChange} value={item.name} id="name" />
          <FormHelperText>Education item name</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            onChange={handleOnChangeTextArea}
            value={item.description || ''}
            id="description"
          />
          <FormHelperText>project description</FormHelperText>
        </FormControl>
        {!item.isAlreadyExists && (
          <Button width={'full'} onClick={() => addNewItem()}>
            Add Education item
          </Button>
        )}

        {item.isAlreadyExists && (
          <Button width={'full'} onClick={() => updateEducationItem()}>
            Update
          </Button>
        )}
      </CardBody>
    </Card>
  );
}

function ReadOnlyItem({
  item,
  toggleReadOnly,
  removeExperienceItem,
}: {
  item: EducationItemDTO;
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
            {DateUtil.dateToString(item.dateFrom)} -{' '}
            {DateUtil.dateToString(item.dateTo)}
          </Text>
          <Text>Name</Text>
          <Text>{item.name}</Text>
          <Text>Description</Text>
          <Text>{item.description}</Text>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}
