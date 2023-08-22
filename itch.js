
const DomParser = require("dom-parser");
const parser = new DomParser();

function streamToString (stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  })
}

(async function () {
  let input = await streamToString(process.stdin);

  var parsed = parser.parseFromString(input);
  parsed.getElementsByTagName("item").forEach(item => {
    const before_html = parser.parseFromString(item.innerHTML).getElementsByTagName("description")[0].innerHTML;
    let description_html = before_html;
    description_html = description_html.replace("<img", "<br/><br/> <img");
    input = input.replace(before_html, description_html)
  });
  console.log(input)
}())
