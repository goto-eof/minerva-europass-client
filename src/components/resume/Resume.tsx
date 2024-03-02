import {
  Button,
  Container,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  css,
} from '@chakra-ui/react';
import Profile from './Profile';
import { useGlobalSelector } from '../store/hook';
import ResumeDTO from '../../dto/resume/ResumeDTO';
import { useEffect } from 'react';
import ResumeApiService from '../../service/ResumeApiService';
import Introduction from './introduction';
import Experience from './experience';

export default function Resume() {
  const profileData = useGlobalSelector((state) => {
    const resume: ResumeDTO = {
      profile: state.profile.profile,
      introduction: state.introduction.introduction,
      experience: state.experience.experience,
    };
    return resume;
  });

  const generatePDF = async () => {
    const byte = await new ResumeApiService().post(profileData, 'it_IT');
    saveByteArray('Resume.pdf', byte);
  };

  function saveByteArray(reportName: string, byte: ArrayBuffer) {
    var blob = new Blob([byte], { type: 'application/pdf' });
    console.log(typeof blob, blob);
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  }
  useEffect(() => {
    console.log(profileData);
  }, [profileData]);
  return (
    <Container>
      <Tabs>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Introduction</Tab>
          <Tab>Experience</Tab>
          <Tab>Education</Tab>
          <Tab>Skill matrix</Tab>
          <Tab>Personal projects</Tab>
          <Tab>Certificates</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Profile />
          </TabPanel>
          <TabPanel>
            <Introduction />
          </TabPanel>
          <TabPanel>
            <Experience />
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Divider />
      <Button width={'full'} colorScheme="blue" onClick={generatePDF}>
        Submit
      </Button>
    </Container>
  );
}
