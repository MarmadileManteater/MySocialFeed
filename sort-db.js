
const db = require('./db.json');
const fs = require('fs');

let sortedFeedKeys = Object.keys(db.rss).sort();
let newRss = {};
for (key of sortedFeedKeys) {
  newRss[key] = db.rss[key]
}
db.rss = newRss;

fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
