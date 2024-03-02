import ExperienceItemDTO from './ExperienceItemDTO';
import SectionCommonFragmentDTO from './fragment/SectionCommonFragmentDTO';

export default interface ExperienceDTO extends SectionCommonFragmentDTO {
  experienceList?: Array<ExperienceItemDTO>;
}
