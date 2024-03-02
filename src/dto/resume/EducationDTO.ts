import EducationItemDTO from './EducationItemDTO';
import SectionCommonFragmentDTO from './fragment/SectionCommonFragmentDTO';

export default interface EducationDTO extends SectionCommonFragmentDTO {
  educationList: Array<EducationItemDTO>;
}
