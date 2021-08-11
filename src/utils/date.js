import moment from 'moment';
import 'moment/locale/es';

const now = moment();

export const dateFormat = (date, format='LL') => moment(date).format(format);

export const timeDay = (date)=>{

	var end = moment(date); // another date
	var duration = moment.duration(end.diff(now));
	var days = duration.asDays();

	return Math.round(days);
}
