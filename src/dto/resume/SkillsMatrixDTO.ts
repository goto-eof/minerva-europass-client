import SectionCommonFragmentDTO from './fragment/SectionCommonFragmentDTO';
import SkillMatrixItemDTO from './SkillMatrixItemDTO';

export default interface SkillsMatrixDTO extends SectionCommonFragmentDTO {
  skillsMatrixList?: Array<SkillMatrixItemDTO>;
}
