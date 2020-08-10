import FuseUtils from '@fuse/utils';
import moment from 'moment';

export function getFilteredArray(data, txtCari) {
  const arr = Object.keys(data).map(id => data[id]);
  if (txtCari.length < 1) {
    return arr;
  }
  return FuseUtils.filterArrayByString(arr, txtCari);
}

export function thousandSeparator(value, separator = '.') {
  return !value ? '-' : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function lastday(y, m) {
  return new Date(y, m + 1, 0).getDate();
}

export function getFirstDateOfMonth(params) {
  return moment(params?.date || new Date())
    .set({ date: 1, hour: 0, minute: 0, second: 0, millisecond: 0 })
    .utcOffset(params?.offset || 7)
    .format('YYYY-MM-DD');
}

export function getLastDateOfMonth(params) {
  const date = params?.date ? new Date(params.date) : new Date();
  return moment(date)
    .date(lastday(date.getFullYear(), date.getMonth()))
    .set({ hour: 23, minute: 59, second: 59 })
    .utcOffset(params?.offset || 7)
    .format('YYYY-MM-DD');
}
