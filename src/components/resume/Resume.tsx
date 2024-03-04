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
import { useGlobalDispatch, useGlobalSelector } from '../store/hook';
import ResumeDTO from '../../dto/resume/ResumeDTO';
import { useEffect } from 'react';
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
  return (
    <Container>
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
        Generate PDF
      </Button>
    </Container>
  );
}
