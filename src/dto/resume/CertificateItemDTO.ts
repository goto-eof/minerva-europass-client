import BasicItemInfoFragmentDTO from './fragment/BasicItemInfoFragmentDTO';
import TechnologiesItemFragmentDTO from './fragment/TechnologiesItemFragmentDTO';

export default interface CertificateItemDTO
  extends BasicItemInfoFragmentDTO,
    TechnologiesItemFragmentDTO {
  _id?: number;
  date: string;
  link: string;
}
