function parseDate(input) {
    let parts = input.split('-');
    return new Date(parts[0], parts[1] - 1, parts[2]);
}

export default function getCountOf(date1, date2, dayToSearch) {

    let dateObj1 = parseDate(date1);
    let dateObj2 = parseDate(date2);

    let count = 0;
    let week = [0, 1, 2, 3, 4, 5, 6];
    let dayIndex = week.indexOf(dayToSearch);

    while (dateObj1.getTime() <= dateObj2.getTime()) {
        if (dateObj1.getDay() === dayIndex) {
            count++
        }
        dateObj1.setDate(dateObj1.getDate() + 1);
    }
    return count;
}
