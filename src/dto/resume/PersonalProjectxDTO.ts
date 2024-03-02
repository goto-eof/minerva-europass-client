import ExperienceItemDTO from './ExperienceItemDTO';
import SectionCommonFragmentDTO from './fragment/SectionCommonFragmentDTO';

export default interface PersonalProjectsDTO extends SectionCommonFragmentDTO {
  experienceList: Array<ExperienceItemDTO>;
}
