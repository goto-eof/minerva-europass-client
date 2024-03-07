import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from '@chakra-ui/react';
import Profile from './Profile';
import { useGlobalDispatch, useGlobalSelector } from '../store/hook';
import ResumeDTO from '../../dto/resume/ResumeDTO';
import { ReactNode, useEffect } from 'react';
import ResumeApiService from '../../service/ResumeApiService';
import Introduction from './introduction';
import Experience from './experience';
import Education from './education';
import OtherSkills from './otherSkills';
import Other from './other';
import SkillMatrix from './skillMatrix';
import PersonalProjects from './personalProjects';
import Certificate from './certificate';
import { replaceProfile, resetProfile } from '../store/profile-slice';
import {
  replaceIntroduction,
  resetIntroduction,
} from '../store/introdution-slice';
import { replaceExperience, resetExperience } from '../store/experience-slice';
import { replaceEducation, resetEducation } from '../store/education-slice';
import { replaceOther, resetOther } from '../store/other-slice';
import {
  replaceOtherSkills,
  resetOtherSkills,
} from '../store/odtheSkills-slice';
import {
  replaceCertificates,
  resetCertificates,
} from '../store/certificates-slice';
import {
  replaceSkillMatrix,
  resetSkillMatrix,
} from '../store/skillMatrix-slice';
import {
  replacePersonalProjects,
  resetPersonalProjects,
} from '../store/personalProjects-slice';

export default function Resume() {
  const profileData: ResumeDTO = useGlobalSelector((state) => {
    const resume: ResumeDTO = {
      profile: state.profile.profile,
      introduction: state.introduction.introduction,
      experience: state.experience.experience,
      education: state.education.education,
      otherSkills: state.otherSkills.otherSkills,
      other: state.other.other,
      certificates: state.certificates.certificates,
      skillsMatrix: state.skillMatrix.skillMatrix,
      personalProjects: state.personalProjects.personalProjects,
    };
    return resume;
  });
  const dispatch = useGlobalDispatch();

  const generatePDF = async () => {
    const stringify = JSON.stringify(profileData);
    localStorage.setItem('data', stringify);
    const byte = await new ResumeApiService().post(profileData, 'it_IT');
    saveByteArray('Resume.pdf', byte);
  };

  const saveDataOnLocal = () => {
    const stringify = JSON.stringify(profileData);
    localStorage.setItem('data', stringify);
  };

  const clearAllData = () => {
    localStorage.removeItem('data');
    dispatch(resetProfile());
    dispatch(resetIntroduction());
    dispatch(resetExperience());
    dispatch(resetEducation());
    dispatch(resetOtherSkills());
    dispatch(resetOther());
    dispatch(resetCertificates());
    dispatch(resetSkillMatrix());
    dispatch(resetPersonalProjects());
  };

  useEffect(() => {
    const data = localStorage.getItem('data');
    const resume: ResumeDTO = JSON.parse(data || '{}');
    if (resume.profile) {
      dispatch(replaceProfile(resume.profile));
    }
    if (resume.introduction) {
      dispatch(replaceIntroduction(resume.introduction));
    }
    if (resume.experience) {
      dispatch(replaceExperience(resume.experience));
    }
    if (resume.education) {
      dispatch(replaceEducation(resume.education));
    }
    if (resume.otherSkills) {
      dispatch(replaceOtherSkills(resume.otherSkills));
    }
    if (resume.other) {
      dispatch(replaceOther(resume.other));
    }
    if (resume.certificates) {
      dispatch(replaceCertificates(resume.certificates));
    }
    if (resume.skillsMatrix) {
      dispatch(replaceSkillMatrix(resume.skillsMatrix));
    }
    if (resume.personalProjects) {
      dispatch(replacePersonalProjects(resume.personalProjects));
    }
  }, []);

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

  const [isLargerThan800] = useMediaQuery('(min-width: 900px)');
  if (isLargerThan800) {
    return (
      <Flex justifyContent={'center'} p={10}>
        <LargeScreen
          saveDataOnLocal={saveDataOnLocal}
          clearAllData={clearAllData}
          generatePDF={generatePDF}
        />
      </Flex>
    );
  }
  return (
    <Flex justifyContent={'center'} p={5}>
      {' '}
      <SmallScreen
        saveDataOnLocal={saveDataOnLocal}
        clearAllData={clearAllData}
        generatePDF={generatePDF}
      />
    </Flex>
  );
}

function LargeScreen({
  generatePDF,
  clearAllData,
  saveDataOnLocal,
}: {
  generatePDF: () => void;
  clearAllData: () => void;
  saveDataOnLocal: () => void;
}) {
  return (
    <Box w={'full'}>
      <Tabs>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Introduction</Tab>
          <Tab>Experience</Tab>
          <Tab>Education</Tab>
          <Tab>Other skills</Tab>
          <Tab>Other</Tab>
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
            <Education />
          </TabPanel>
          <TabPanel>
            <OtherSkills />
          </TabPanel>
          <TabPanel>
            <Other />
          </TabPanel>
          <TabPanel>
            <SkillMatrix />
          </TabPanel>
          <TabPanel>
            <PersonalProjects />
          </TabPanel>
          <TabPanel>
            <Certificate />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Divider />
      <SimpleGrid spacing={3} columns={{ base: 1, md: 3 }}>
        <Button colorScheme="red" onClick={clearAllData}>
          Clear all data
        </Button>
        <Button colorScheme="green" onClick={saveDataOnLocal}>
          Save on local storage
        </Button>
        <Button colorScheme="blue" onClick={generatePDF}>
          Save & Generate PDF
        </Button>
      </SimpleGrid>
    </Box>
  );
}

function SmallScreen({
  generatePDF,
  clearAllData,
  saveDataOnLocal,
}: {
  generatePDF: () => void;
  clearAllData: () => void;
  saveDataOnLocal: () => void;
}) {
  return (
    <Box w={'full'}>
      <Accordion allowToggle>
        <AccordionElement title={'Profile'} child={<Profile />} />
        <AccordionElement title={'Introduction'} child={<Introduction />} />
        <AccordionElement title={'Experience'} child={<Experience />} />
        <AccordionElement title={'Education'} child={<Education />} />
        <AccordionElement title={'Other Skills'} child={<OtherSkills />} />
        <AccordionElement title={'Other'} child={<Other />} />
        <AccordionElement title={'Skills Matrix'} child={<SkillMatrix />} />
        <AccordionElement
          title={'Personal Projects'}
          child={<PersonalProjects />}
        />
        <AccordionElement title={'Certificates'} child={<Certificate />} />
      </Accordion>
      <Divider />
      <SimpleGrid spacing={3} columns={{ base: 1, md: 3 }}>
        <Button colorScheme="red" onClick={clearAllData}>
          Clear all data
        </Button>
        <Button colorScheme="green" onClick={saveDataOnLocal}>
          Save on local storage
        </Button>
        <Button colorScheme="blue" onClick={generatePDF}>
          Save & Generate PDF
        </Button>
      </SimpleGrid>
    </Box>
  );
}

function AccordionElement({
  title,
  child,
}: {
  title: string;
  child: ReactNode;
}) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{child}</AccordionPanel>
    </AccordionItem>
  );
}
