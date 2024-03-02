import OtherItemDTO from './OtherItemDTO';
import SectionCommonFragmentDTO from './fragment/SectionCommonFragmentDTO';

export default interface OtherDTO extends SectionCommonFragmentDTO {
  otherList: Array<OtherItemDTO>;
}
