import fs from "fs";
import puppeteer from "puppeteer";

export default async (htmlFile=null, html=null) => {

    if(htmlFile === null) {
        let htmlFile = fs.readFileSync(`${__dirname}/../../../data/html/testReport.html`, 'utf8');
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlFile);

    let sc = await page.screenshot()
        .then(screenshot => {
            return screenshot;
        })
        .catch(err => {
            console.error(err);
        });

    await page.close();
    await browser.close();

    return sc;
}