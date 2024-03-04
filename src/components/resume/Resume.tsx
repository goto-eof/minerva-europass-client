import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  css,
  useMediaQuery,
} from '@chakra-ui/react';
import Profile from './Profile';
import { useGlobalDispatch, useGlobalSelector } from '../store/hook';
import ResumeDTO from '../../dto/resume/ResumeDTO';
import { ReactNode, useEffect } from 'react';
import ResumeApiService from '../../service/ResumeApiService';
import Introduction from './introduction';
import Experience from './experience';
import EducationItem from './EducationItem';
import Education from './education';
import OtherSkills from './otherSkills';
import Other from './other';
import SkillMatrix from './skillMatrix';
import PersonalProjects from './personalProjects';
import Certificate from './certificate';
import { replaceProfile } from '../store/profile-slice';
import { replaceIntroduction } from '../store/introdution-slice';
import { replaceExperience } from '../store/experience-slice';
import { replaceEducation } from '../store/education-slice';
import { replaceOther } from '../store/other-slice';
import { replaceOtherSkills } from '../store/odtheSkills-slice';
import { replaceCertificates } from '../store/certificates-slice';
import { replaceSkillMatrix } from '../store/skillMatrix-slice';
import { replacePersonalProjects } from '../store/personalProjects-slice';

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

  const generatePDF = async () => {
    const stringify = JSON.stringify(profileData);
    localStorage.setItem('data', stringify);
    const byte = await new ResumeApiService().post(profileData, 'it_IT');
    saveByteArray('Resume.pdf', byte);
  };

  const dispatch = useGlobalDispatch();
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
    return <LargeScreen generatePDF={generatePDF} />;
  }
  return <SmallScreen generatePDF={generatePDF} />;
}

function LargeScreen({ generatePDF }: { generatePDF: () => void }) {
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
      <Button width={'full'} colorScheme="blue" onClick={generatePDF}>
        Save & Generate PDF
      </Button>
    </Box>
  );
}

function SmallScreen({ generatePDF }: { generatePDF: () => void }) {
  return (
    <Box>
      <Accordion allowToggle>
        <AccordionElement title={'Profile'} child={<Profile />} />
        <AccordionElement title={'Introduction'} child={<Introduction />} />
        <AccordionElement title={'Experience'} child={<Experience />} />
        <AccordionElement title={'Education'} child={<Education />} />
        <AccordionElement title={'Other Skills'} child={<OtherSkills />} />
        <AccordionElement title={'Other'} child={<Other />} />
        <AccordionElement
          title={'Personal Projects'}
          child={<PersonalProjects />}
        />
        <AccordionElement title={'Certificates'} child={<Certificate />} />
      </Accordion>
      <Divider />
      <Button width={'full'} colorScheme="blue" onClick={generatePDF}>
        Save & Generate PDF
      </Button>
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
