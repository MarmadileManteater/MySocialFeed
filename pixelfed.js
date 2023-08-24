
const DomParser = require("dom-parser");
const { fetch } = require('undici');
const parser = new DomParser();

const { decode, encode } = require("html-entities");
const streamToString = require("./stream_to_string.js");

(async function () {
  let input = await streamToString(process.stdin);

  var parsed = parser.parseFromString(input);
  await Promise.all(parsed.getElementsByTagName("entry").map(async entry => {
    const id = entry.getElementsByTagName("id")[0];
    const url = id.innerHTML;
    const json = await (await fetch(url, {
      headers: {
        'Accept': 'application/activity+json'
      }
    })).json();

    for (var i = 1; i < json.attachment.length; i++) {
      var attachment = json.attachment[i]
      if (input.indexOf(attachment.url) === -1) {
        input = input.replace(`<media:content url="${json.attachment[0].url}" type="${json.attachment[0].mediaType}" medium="image" />`, `<media:content url="${json.attachment[0].url}" type="${json.attachment[0].mediaType}" medium="image" />\r\n				<media:content url="${attachment.url}" type="${attachment.mediaType}" medium="image" />`)
        input = input.replace(` alt="${json.attachment[0].name.replaceAll("\"", "&quot;")}">`, ` alt="${json.attachment[0].name.replaceAll("\"", "&quot;")}"> <img src="${attachment.url}" alt="${attachment.name}" />`)
      }
    }
  }));
  console.log(input)
}())
