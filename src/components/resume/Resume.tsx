import { Button, Container, Divider } from '@chakra-ui/react';
import Profile from './Profile';
import { useProfileSelector } from '../hook';

export default function Resume() {
  const profileData = useProfileSelector((state) => {
    console.log(state.profile);
    return state.profile;
  });
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
