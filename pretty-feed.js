
const prettifyXml = require('prettify-xml')
const fs = require("fs")

const feed = fs.readFileSync("feed.xml").toString()
const resultFeed = prettifyXml(feed, { indent: 2, newline: '\n' })

fs.writeFileSync("feed.xml.new", resultFeed)
