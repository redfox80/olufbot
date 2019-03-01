"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _puppeteer = _interopRequireDefault(require("puppeteer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async (htmlFile = null, html = null) => {
  if (htmlFile === null) {
    let htmlFile = _fs.default.readFileSync(`${__dirname}/../../../data/html/testReport.html`, 'utf8');
  }

  const browser = await _puppeteer.default.launch();
  const page = await browser.newPage();
  await page.setContent(htmlFile);
  let sc = await page.screenshot().then(screenshot => {
    return screenshot;
  }).catch(err => {
    console.error(err);
  });
  await page.close();
  await browser.close();
  return sc;
};

exports.default = _default;