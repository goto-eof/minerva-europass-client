import { Button, Container, Divider } from '@chakra-ui/react';
import Profile from './Profile';

export default function Resume() {
  return (
    <Container>
      <Profile />
      <Divider />
      <Button width={'full'} colorScheme="blue">
        Submit
      </Button>
    </Container>
  );
}
