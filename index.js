const obj = require("./payload.json");
var fs = require("fs");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!!! shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

export const removeNullValuesFromObj = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      if (typeof obj[key] === "object")
        obj[key] = removeNullValuesFromObj(obj[key]);
      if (typeof obj[key] === "array") {
        obj[key].forEach((item, index) => {
          if (item) {
            if (typeof obj[key][index] === "object")
              obj[key][index] = removeNullValuesFromObj(obj[key][index]);
          } else delete obj[key][index];
        });
      }
    } else {
     delete obj[key];
    }
  });
  return obj;
};
fs.appendFile(
  "newPaylaod.json",
 (removeNullValuesFromObj(obj)),
  function (err) {
    if (err) throw err;
    console.log("Saved!");
  }
);
