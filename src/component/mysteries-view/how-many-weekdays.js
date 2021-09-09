import getCountOf from "./get-count-of";
import axios from 'axios';

const endpoint = process.env.REACT_APP_DB_URL;

export default async function HowManyWeekdays(dayOfWeek) {
    var date = new Date();
    var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    let theDay = await axios.get(endpoint + '/startingday');
    let startingDay = theDay.data[0].startingDay.slice(0, 10);

    if (dayOfWeek === 1 || dayOfWeek === 6) {
        let monday = getCountOf(startingDay, today, 1);
        let saturday = getCountOf(startingDay, today, 6);
        let sum = monday + saturday;
        return sum;
    } else if (dayOfWeek === 2 || dayOfWeek === 5) {
        let tuesday = getCountOf(startingDay, today, 2);
        let friday = getCountOf(startingDay, today, 5);
        let sum = tuesday + friday;
        return sum;
    } else if (dayOfWeek === 3 || dayOfWeek === 0) {
        let wednesday = getCountOf(startingDay, today, 1);
        let sunday = getCountOf(startingDay, today, 6);
        let sum = wednesday + sunday;
        return sum;
    } else if (dayOfWeek === 4) {
        let thursday = getCountOf(startingDay, today, 4) - 1;
        return thursday;
    }
}