import BasicItemInfoFragmentDTO from './BasicItemInfoFragmentDTO';

export default interface ExperienceItemFragmentCommonDTO
  extends BasicItemInfoFragmentDTO {
  dateFrom: Date;
  dateTo: Date;
}
