export default class DateUtil {
  static dateToString = (date: Date | undefined) => {
    if (!date) {
      return '';
    }
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let dds = dd + '';
    let mms = mm + '';
    if (dd < 10) dds = '0' + dd;
    if (mm < 10) mms = '0' + mm;

    return yyyy + '-' + mms + '-' + dds;
  };
}
