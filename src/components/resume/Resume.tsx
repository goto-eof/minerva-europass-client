import { Button, Container, Divider } from '@chakra-ui/react';
import Profile from './Profile';
import ProfileDTO from '../../dto/resume/ProfileDTO';
import { useState } from 'react';

export default function Resume() {
  const [pinger, setPinger] = useState<boolean>(false);

  const pullProfile = (profile: ProfileDTO): void => {
    console.log(profile);
  };

  return (
    <Container>
      <Profile pullData={pullProfile} pinger={pinger} />
      <Divider />
      <Button
        width={'full'}
        colorScheme="blue"
        onClick={() => setPinger(!pinger)}
      >
        Submit
      </Button>
    </Container>
  );
}
