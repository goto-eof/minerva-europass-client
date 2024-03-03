export default class DateUtil {
  static dateToString = (date: Date | string | undefined) => {
    if (!date) {
      return '';
    }
    let today = null; //new Date(date);
    console.log('TYPEOF', typeof date);
    if (typeof date === 'string') {
      today = this.stringToDate(date);
      console.log('OOOOK');
    } else {
      today = new Date(date);
    }

    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let dds = dd + '';
    let mms = mm + '';
    if (dd < 10) dds = '0' + dd;
    if (mm < 10) mms = '0' + mm;

    return yyyy + '-' + mms + '-' + dds;
  };

  static stringToDate(date: string) {
    console.log('DATE', date);
    var parts = date.split('-');
    return new Date(+parts[0], +parts[1] - 1, +parts[2]);
  }

  static dateFormat(date: string) {
    return date;
    console.log('START', date);
    console.log('DATE', date);
    var parts = date.split('-');
    const newDate = parts[2] + '-' + (+parts[0] - 1) + '-' + parts[1];
    console.log('END', newDate);
    return newDate;
  }
}
