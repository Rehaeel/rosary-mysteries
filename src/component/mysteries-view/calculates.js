let startDay = Math.floor(Date.now() / 86400000);
let daySpent = Math.floor(Date.now() / 86400000) % startDay;


export function returnMystery() {
    console.log(daySpent);
}