import BasicItemInfoFragmentDTO from './fragment/BasicItemInfoFragmentDTO';
import TechnologiesItemFragmentDTO from './fragment/TechnologiesItemFragmentDTO';

export default interface CertificateItemDTO
  extends BasicItemInfoFragmentDTO,
    TechnologiesItemFragmentDTO {
  date: Date;
  link: string;
}
