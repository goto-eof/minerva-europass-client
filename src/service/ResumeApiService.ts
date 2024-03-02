import axios from 'axios';
import ResumeDTO from '../dto/resume/ResumeDTO';

const BASE_API_URL = 'http://localhost:8081';

export default class ResumeApiService {
  public async post(formData: ResumeDTO, locale: string): Promise<ArrayBuffer> {
    return (
      await axios.post<ArrayBuffer>(
        `${BASE_API_URL}/api/v1/resume/generate/templateName/basic/locale/${locale}`,
        formData,
        { responseType: 'arraybuffer' }
      )
    ).data;
  }
}
