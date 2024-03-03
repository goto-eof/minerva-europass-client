import KeyValueDTO from './KeyValueDTO';

export default interface ProfileDTO {
  firstName?: string;
  lastName?: string;
  image?: string;
  city?: string;
  county?: string;
  country?: string;
  jobTitle?: string;
  citizenshipList?: Array<string>;
  emailMap?: Array<KeyValueDTO>;
  phoneNumberMap?: Array<KeyValueDTO>;
  birthDate?: string;
  urlMap?: Array<KeyValueDTO>;
  mainSkillList?: Array<string>;
  languageList?: Array<string>;
}
