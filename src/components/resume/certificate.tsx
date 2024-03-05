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
import CertificateItemDTO from '../../dto/resume/CertificateItemDTO';
import CertificatesDTO from '../../dto/resume/CertificatesDTO';
import { replaceCertificates } from '../store/certificates-slice';
import CertificateItem from './CertificateItem';

export default function Certificate() {
  const formRef = useRef<HTMLFormElement>(null);
  const data = useGlobalSelector((state) => {
    return state.certificates.certificates;
  });
  const dispatch = useGlobalDispatch();
  const [formData, setFormData] = useState<CertificatesDTO | undefined>(data);

  useEffect(() => {
    setFormData(data);
    if (!data) {
      formRef.current?.reset();
    }
  }, [data]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(
      replaceCertificates({ ...formData, [e.target.id]: e.target.value })
    );
  };
  const handleOnChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(
      replaceCertificates({ ...formData, [e.target.id]: e.target.value })
    );
  };

  const handleAddItem = (experience: CertificateItemDTO) => {
    const id = formData?.certificateList?.length || 0;
    const newExperience = { ...experience, _id: id };
    console.log(newExperience);
    const newItem = {
      ...formData,
      certificateList: [...(formData?.certificateList || []), newExperience],
    };
    setFormData(newItem);
    dispatch(replaceCertificates(newItem));
  };

  const handleRemoveExperience = (experience: CertificateItemDTO) => {
    console.log(formData?.certificateList);
    const newItem = {
      ...formData,
      certificateList: (formData?.certificateList || []).filter(
        (exp) => exp._id !== experience._id
      ),
    };
    setFormData(newItem);
    dispatch(replaceCertificates(newItem));
  };

  const updateExperience = (experience: CertificateItemDTO) => {
    const newExperience = {
      ...formData,
      certificateList: (formData?.certificateList || []).map((exp) => {
        if (exp._id === experience._id) {
          return experience;
        }
        return exp;
      }),
    };
    setFormData(newExperience);
    dispatch(replaceCertificates(newExperience));
  };

  return (
    <VStack textAlign={'left'}>
      <Heading>Certificates</Heading>{' '}
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
        <SimpleGrid w={'full'} columns={{ base: 1, md: 2 }}>
          {formData?.certificateList &&
            formData.certificateList.map((item) => (
              <CertificateItem
                key={'certificate_' + item._id}
                remove={handleRemoveExperience}
                readOnly={true}
                exp={item}
                update={updateExperience}
              />
            ))}
        </SimpleGrid>
        <Divider />
        <CertificateItem readOnly={false} add={handleAddItem} />
      </form>
    </VStack>
  );
}
