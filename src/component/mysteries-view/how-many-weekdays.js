import getCountOf from "./get-count-of";

export default function HowManyWeekdays(dayOfWeek, startDay) {
    var date = new Date();
    var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    let startingDay = startDay;

    if (dayOfWeek === 1) {
        let monday = getCountOf(startingDay, today, 1);
        return monday;
    } else if (dayOfWeek === 2) {
        let tuesday = getCountOf(startingDay, today, 2);
        return tuesday;
    } else if (dayOfWeek === 3) {
        let wednesday = getCountOf(startingDay, today, 3);
        return wednesday;
    } else if (dayOfWeek === 4) {
        let thursday = getCountOf(startingDay, today, 4);
        return thursday;
    } else if (dayOfWeek === 5) {
        let friday = getCountOf(startingDay, today, 5);
        return friday;
    } else if (dayOfWeek === 6) {
        let saturday = getCountOf(startingDay, today, 6);
        return saturday;
    } else if (dayOfWeek === 0) {
        let sunday = getCountOf(startingDay, today, 0);
        return sunday;
    }
}