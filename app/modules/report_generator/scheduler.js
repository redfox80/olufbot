"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));

var _monthly_stats = _interopRequireDefault(require("./reports/monthly_stats"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async () => {
  //Schedules are defined with the cron syntax
  // monthly_stats();
  //Monthly report 0 6 1 * * *
  let reportSchedule = _nodeSchedule.default.scheduleJob('0 6 1 * * *', () => {
    (0, _monthly_stats.default)();
  }); // let test = schedule.scheduleJob('30 11 * * 1-5 *', () => {
  // });

};

exports.default = _default;