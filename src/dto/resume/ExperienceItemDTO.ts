import ExperienceItemFragmentCommonDTO from './fragment/ExperienceItemCommonFragmentDTO';
import TechnologiesItemFragmentDTO from './fragment/TechnologiesItemFragmentDTO';
import UrlDTO from './UrlDTO';

export default interface ExperienceItemDTO
  extends ExperienceItemFragmentCommonDTO,
    TechnologiesItemFragmentDTO {
  _id?: number;
  jobTitle: string;
  url?: string;
  urlList?: Array<UrlDTO>;
  mainActivities: string;
  customer: string;
  sector: string;
  toolList: Array<string>;
  isWorkedAsBackEndDeveloper: boolean;
  isWorkedAsFrontEndDeveloper: boolean;
  workingMethodology: string;
}
