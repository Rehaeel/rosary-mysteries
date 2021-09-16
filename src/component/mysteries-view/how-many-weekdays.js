import getCountOf from "./get-count-of";

export default function HowManyWeekdays(dayOfWeek, startDay) {
    var date = new Date();
    var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    if (dayOfWeek === 1) {
        let monday = getCountOf(startDay, today, 1);
        return monday;
    } else if (dayOfWeek === 2) {
        let tuesday = getCountOf(startDay, today, 2);
        return tuesday;
    } else if (dayOfWeek === 3) {
        let wednesday = getCountOf(startDay, today, 3);
        return wednesday;
    } else if (dayOfWeek === 4) {
        let thursday = getCountOf(startDay, today, 4);
        return thursday;
    } else if (dayOfWeek === 5) {
        let friday = getCountOf(startDay, today, 5);
        return friday;
    } else if (dayOfWeek === 6) {
        let saturday = getCountOf(startDay, today, 6);
        return saturday;
    } else if (dayOfWeek === 0) {
        let sunday = getCountOf(startDay, today, 0);
        return sunday;
    }
}
