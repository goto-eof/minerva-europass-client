import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  VStack,
  useStatStyles,
} from '@chakra-ui/react';
import ProfileDTO from '../../dto/resume/ProfileDTO';
import { useEffect, useRef, useState } from 'react';
import ErrorDTO from '../../dto/resume/ErrorDTO';

export default function Profile({
  pullData,
  pinger,
}: {
  pinger: boolean;
  pullData: (profile: ProfileDTO) => void;
}) {
  const [errorMessages, setErrorMessages] = useState<Array<ErrorDTO>>([]);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const firstNameErrRef = useRef<HTMLDivElement>(null);
  const lastNameErrRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isInputValid()) {
      return;
    }
    const data: ProfileDTO = retrieveDataAndBuildObject();
    pullData(data);
  }, [pinger]);

  const isInputValid = () => {
    let errors: Array<ErrorDTO> = [];
    errors = errors.concat(validateField(firstNameRef, firstNameErrRef));
    errors = errors.concat(validateField(lastNameRef, lastNameErrRef));
    setErrorMessages(errors);
    return errors.length == 0;
  };

  const validateField = (
    ref: React.RefObject<HTMLInputElement>,
    errRef: React.RefObject<HTMLDivElement>
  ): Array<ErrorDTO> => {
    const errMessages: Array<ErrorDTO> = [];
    if (!ref.current!.value) {
      ref.current!.style.backgroundColor = '#FFF3F3';
      const errMessage =
        'Invalid value. The field should be not isEmptyBindingElement.';
      errMessages.push({
        key: ref.current!.id,
        value: errMessage,
      });
      errRef.current!.textContent = errMessage;
      errRef.current!.style.color = 'red';

      return errMessages;
    }
    ref.current!.style.backgroundColor = '';
    errRef.current!.textContent = '';
    errRef.current!.style.color = '';

    return [];
  };

  const retrieveDataAndBuildObject = (): ProfileDTO => {
    return {
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
    };
  };

  return (
    <VStack textAlign={'left'}>
      <SimpleGrid columns={{ base: 2 }} spacing={6} width={'full'}>
        <FormControl>
          <FormLabel htmlFor="firstName">First name</FormLabel>
          <Input id="firstName" ref={firstNameRef} />
          <FormHelperText ref={firstNameErrRef}>
            Insert your first name
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastName">Last name</FormLabel>
          <Input id="lastName" ref={lastNameRef} />
          <FormHelperText ref={lastNameErrRef}>
            Insert your last name
          </FormHelperText>
        </FormControl>
      </SimpleGrid>
    </VStack>
  );
}
