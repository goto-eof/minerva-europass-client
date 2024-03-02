import CertificatesDTO from './CertificatesDTO';
import EducationDTO from './EducationDTO';
import ExperienceDTO from './ExperienceDTO';
import IntroductionDTO from './IntroductionDTO';
import OtherDTO from './OtherDTO';
import OtherSkillsDTO from './OtherSkillsDTO';
import PersonalProjectsDTO from './PersonalProjectxDTO';
import ProfileDTO from './ProfileDTO';
import SkillsMatrixDTO from './SkillsMatrixDTO';

export default interface ResumeDTO {
  profile?: ProfileDTO;
  introduction?: IntroductionDTO;
  experience?: ExperienceDTO;
  personalProjects?: PersonalProjectsDTO;
  education?: EducationDTO;
  otherSkills?: OtherSkillsDTO;
  skillsMatrix?: SkillsMatrixDTO;
  other?: OtherDTO;
  certificates?: CertificatesDTO;
  localeName?: string;
}
