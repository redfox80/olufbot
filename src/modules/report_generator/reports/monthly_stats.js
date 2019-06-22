import fs from "fs";
import image from "../image";
import {bot} from "../../../main";
import {JSDOM} from "jsdom";
import {sequelize} from "../../db/models/index";

export default async () => {

    let statsFrom = [
        '355385315575332866'
    ];

    //Defined here for later use
    let date = new Date();

    //Get timestamp for the first of last month
    let thisMonth = `${date.getFullYear()}-${((date.getMonth()) > 9) ? (date.getMonth()):'0'+(date.getMonth())}-01 00:00:00`;

    //Get top 3 chatters from this month
    let results = await sequelize.query(`SELECT author_displayname AS 'user', COUNT(id) AS 'messages' FROM olufbot.ChatLogs WHERE sent_at > '${thisMonth}' GROUP BY author_id ORDER BY COUNT(id) DESC LIMIT 3`, { type: sequelize.QueryTypes.SELECT})
        .then(results => {
            return results;
        });

    //Prepare data from database for the html template
    let string = `
        <p>
            Top chatters last month
            <table>
                <thead>
                    <th>#</th>
                    <th>User</th>
                    <th>Messages sent</th>
                </thead>
                <tbody>`;

    for (let i in results) {
        string += `
                    <tr>
                        <td>${Number(i+1)}</td>
                        <td>${results[i].user}</td>
                        <td>${results[i].messages}</td>
                    </tr>`;
    }

    string += `
                </tbody>
            </table>
        </p>`;

    //Defined here to get correct scope
    let htmlFile = "";

    //Get html report template
    try {
        htmlFile = fs.readFileSync(`${__dirname}/../../../../data/html/monthly_report.html`, 'utf8');
    } catch (err) {
        console.error(err);
    }
    
    //Create a dom object of the html template
    let dom = new JSDOM(htmlFile);
    let content = dom.window.document.getElementById('content');

    content.innerHTML = string;
    //Convert dom object to string
    htmlFile = dom.serialize();
    
    //Create image from html string
    let stats = await image(htmlFile);

    //Write to disk
    // fs.writeFile(`${__dirname}/../../../../data/reports/monthly_${date.getMonth()+1}_${date.getFullYear()}_${Math.floor((Math.random() * 10000))}.png`, stats, (err) => {
    //     if (err) console.error(err);
    // });
    
    let channel = bot.channels.get("540978236834709504");
    //Send image to discord channel
    channel.send({
        files: [{
            attachment: stats,
            name: "stats.png"
        }]
    })
}