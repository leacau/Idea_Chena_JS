const fs = require("fs");

let objectToSave = { variable: "1", variable2: "2" };

fs.writeFile("archivo.json", JSON.stringify(objectToSave), "utf8", (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
});