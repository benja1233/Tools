const fs = require("fs");
const path = require("path");


let rawdata = fs.readFileSync(`traits/build/_metadata.json`);
let data = JSON.parse(rawdata);


function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}

var shuffledTopicArray = shuffle(data);

const traits = JSON.stringify(data);


fs.writeFileSync(
    'traits/shuffledMetadata.json', traits, (err) => {
        console.log("there was a problem")
    }
  );
// ...



