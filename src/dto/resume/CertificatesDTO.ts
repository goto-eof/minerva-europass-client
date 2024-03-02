import CertificateItemDTO from './CertificateItemDTO';
import SectionCommonFragmentDTO from './fragment/SectionCommonFragmentDTO';

export default interface CertificatesDTO extends SectionCommonFragmentDTO {
  certificateList: Array<CertificateItemDTO>;
}
