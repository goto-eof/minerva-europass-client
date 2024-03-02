export default interface ProfileDTO {
  firstName?: string;
  lastName?: string;
  image?: string;
  city?: string;
  county?: string;
  country?: string;
  jobTitle?: string;
  citizenshipList?: Array<string>;
  emailMap?: Map<string, string>;
  phoneNumberMap?: Map<string, string>;
  birthDate?: Date;
  urlMap?: Map<string, string>;
  mainSkillList?: Array<string>;
  languageList?: Array<string>;
}
