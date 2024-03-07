import { CreateToastFnReturn } from '@chakra-ui/react';

export default class ToastUtil {
  public static showWarning(
    toast: CreateToastFnReturn,
    title: string,
    description: string
  ) {
    toast({
      title,
      description,
      status: 'warning',
      duration: 9000,
      isClosable: true,
    });
  }

  public static showError(
    toast: CreateToastFnReturn,
    title: string,
    description: string
  ) {
    toast({
      title,
      description,
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  }

  public static showSuccess(
    toast: CreateToastFnReturn,
    title: string,
    description: string
  ) {
    toast({
      title,
      description,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  }
}
