import { Button, Container, Divider } from '@chakra-ui/react';
import Profile from './Profile';
import { useGlobalSelector } from '../store/hook';
import ResumeDTO from '../../dto/resume/ResumeDTO';
import { useEffect } from 'react';

export default function Resume() {
  const profileData = useGlobalSelector((state) => {
    const resume: ResumeDTO = {
      profile: state.profile.profile,
      introduction: state.introduction.introduction,
    };
    return resume;
  });

  useEffect(() => {
    console.log(profileData);
  }, [profileData]);
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
