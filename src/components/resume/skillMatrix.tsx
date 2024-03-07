import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useGlobalDispatch, useGlobalSelector } from '../store/hook';
import SkillsMatrixDTO from '../../dto/resume/SkillsMatrixDTO';
import { replaceSkillMatrix } from '../store/skillMatrix-slice';
import SkillMatrixItemDTO from '../../dto/resume/SkillMatrixItemDTO';
import GenericList from './GenericList';
import { FaRemoveFormat } from 'react-icons/fa';
import ToastUtil from '../util/ToastUtil';

export default function SkillMatrix() {
  const data = useGlobalSelector((state) => {
    return state.skillMatrix.skillMatrix;
  });
  const dispatch = useGlobalDispatch();
  const [formData, setFormData] = useState<SkillsMatrixDTO | undefined>(data);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    setFormData(data);
    if (!data) {
      formRef.current?.reset();
    }
  }, [data]);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(
      replaceSkillMatrix({ ...formData, [e.target.id]: e.target.value })
    );
  };

  const handleOnChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(
      replaceSkillMatrix({ ...formData, [e.target.id]: e.target.value })
    );
  };

  const removeCategory = (_id: number) => {
    let list: SkillMatrixItemDTO[] = [];
    if (formData && formData.skillsMatrixList) {
      list = formData.skillsMatrixList;
    }
    const newFormData = {
      ...formData,
      skillsMatrixList: list.filter((item) => item._id !== _id),
    };
    setFormData(newFormData);
    dispatch(replaceSkillMatrix(newFormData));
  };

  const updateCategory = (category: SkillMatrixItemDTO) => {
    let list: SkillMatrixItemDTO[] = [];
    if (formData && formData.skillsMatrixList) {
      list = formData.skillsMatrixList;
    }
    const newFormData = {
      ...formData,
      skillsMatrixList: list.map((item) =>
        item._id !== category._id ? item : category
      ),
    };
    setFormData(newFormData);
    dispatch(replaceSkillMatrix(newFormData));
  };

  const addCategory = (category: SkillMatrixItemDTO) => {
    const arr = formData?.skillsMatrixList || [];
    console.log(category);

    const newFormData = {
      ...formData,
      skillsMatrixList: [
        ...arr,
        { ...category, _id: formData?.skillsMatrixList?.length },
      ],
    };
    setFormData(newFormData);
    dispatch(replaceSkillMatrix(newFormData));
  };

  return (
    <Box w={'full'}>
      <Heading textAlign={'center'}>Skills Matrix</Heading>
      <form ref={formRef}>
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
            <FormHelperText>Insert Skill Matrix section title</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              width={'full'}
              onChange={(e) => handleOnChangeTextArea(e)}
              value={formData?.description || ''}
              id="description"
            />
            <FormHelperText>Insert Skill Matrix description</FormHelperText>
          </FormControl>
        </SimpleGrid>
        <Divider />
        {formData?.skillsMatrixList?.map((item) => (
          <SkillMatrixItem
            key={item._id}
            updateCategory={updateCategory}
            removeCategory={removeCategory}
            item={item}
          />
        ))}
        <SkillMatrixItem addCategory={addCategory} />
      </form>
    </Box>
  );
}
const defaultItem = {
  name: '',
  values: [],
};
function SkillMatrixItem({
  item,
  removeCategory,
  updateCategory,
  addCategory,
}: {
  item?: SkillMatrixItemDTO;
  removeCategory?: (idx: number) => void;
  updateCategory?: (category: SkillMatrixItemDTO) => void;
  addCategory?: (category: SkillMatrixItemDTO) => void;
}) {
  const [isNewItem, setIsNewItem] = useState<boolean>(!item);
  const [editableItem, setEditableItem] = useState<SkillMatrixItemDTO>(
    item
      ? {
          ...item,
        }
      : defaultItem
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newObj = { ...editableItem, [e.target.id]: e.target.value };
    setEditableItem(newObj);
    if (updateCategory) {
      updateCategory(newObj);
    }
  };

  const toast = useToast();

  const addItem = (value: string) => {
    if (editableItem.values.indexOf(value) > -1) {
      ToastUtil.showWarning(toast, 'Duplicate value', 'Item already exists');
      return;
    }
    const newObj = {
      ...editableItem,
      values: [...editableItem.values, value],
    };
    setEditableItem(newObj);
    if (updateCategory) {
      updateCategory(newObj);
    }
  };
  const removeItem = (value: string) => {
    const newObj = {
      ...editableItem,
      values: editableItem.values.filter((it) => it !== value),
    };
    setEditableItem(newObj);
    if (updateCategory) {
      updateCategory(newObj);
    }
  };

  const removeCategoryItem = () => {
    if (removeCategory && item) {
      removeCategory(item._id!);
    }
  };

  const addNewCategory = () => {
    if (isNewItem && addCategory) {
      addCategory(editableItem);
      setEditableItem(defaultItem);
    }
  };

  return (
    <Card width={'full'}>
      <CardBody>
        <Flex justifyContent={'end'}>
          <IconButton
            aria-label="Remove"
            onClick={removeCategoryItem}
            icon={<FaRemoveFormat />}
          />
        </Flex>
        <FormControl>
          <FormLabel htmlFor="name">Category name</FormLabel>
          <Input
            type="text"
            id={'name'}
            onChange={handleOnChange}
            value={editableItem.name}
          />
        </FormControl>
        <GenericList
          key={'category_' + editableItem.name}
          title="Technologies"
          readOnly={false}
          addItem={addItem}
          removeItem={removeItem}
          list={editableItem.values}
        />
      </CardBody>
      {isNewItem && <Button onClick={addNewCategory}>Add Skills</Button>}
    </Card>
  );
}
