"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyInput = verifyInput;

function verifyInput(req, res, next) {
  //If there is no body, do nothing...
  if (req === undefined) next();
  if (req.body === undefined) next();
  let gucci = true;
  let body = req.body; //IF body is empty continue

  if (body.length === 0) {
    gucci = true;
  } //Something is not right if this case is true...


  if (body.length > 100) {
    res.sendStatus(400);
    return false;
  } //Itterate over everything in object and return false if it contains anything other than strings


  for (let key in body) {
    if (typeof body[key] === "object" && body[key] !== null) {
      if (verifyInput(body[key]) === false) {
        res.sendStatus(400);
        return false;
      }
    } else {
      if (typeof body[key] !== "string" && typeof body[key] !== "number" && typeof body[key] !== "boolean") {
        res.sendStatus(400);
        return false;
      }
    }
  }

  next();
  return true;
}