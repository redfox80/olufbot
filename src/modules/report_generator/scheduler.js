import schedule from "node-schedule";
import monthly_stats from "./reports/monthly_stats";

export default async () => {

    //Schedules are defined with the cron syntax

    monthly_stats();

    //Monthly report 0 6 1 * * *
    let reportSchedule = schedule.scheduleJob('0 6 1 * * *', () => {
        monthly_stats();
    });

    // let test = schedule.scheduleJob('30 11 * * 1-5 *', () => {

    // });

}