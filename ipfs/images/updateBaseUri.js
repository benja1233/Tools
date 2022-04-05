"use strict";

const fs = require("fs");
const path = require("path");

const baseUri  = "ipfs://QmTfk14vPkuxp1F1uAqPQUtZ16EyhJbadrVQmP6FXtWFLe";

// read json data
let rawdata = fs.readFileSync(`traits/build/_metadata.json`);
let data = JSON.parse(rawdata);

data.forEach((item) => {
  item.image = `${baseUri}/${item.tokenId}.png`;
  fs.writeFileSync(
    `traits/build/${item.tokenId}.json`,
    JSON.stringify(item, null, 2)
  );
});


fs.writeFileSync(
  `traits/build/_metadata.json`,
  JSON.stringify(data, null, 2)
);

console.log(`Updated baseUri for images to ===> ${baseUri}`);