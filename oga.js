
const DomParser = require("dom-parser");
const parser = new DomParser();

const { decode, encode } = require("html-entities");
const streamToString = require("./stream_to_string.js");

(async function () {
  let input = await streamToString(process.stdin);

  var parsed = parser.parseFromString(input);
  parsed.getElementsByTagName("item").forEach(item => {
    const before_html = parser.parseFromString(item.innerHTML).getElementsByTagName("description")[0].innerHTML;
    let description_html = decode(before_html);
    const description = parser.parseFromString(description_html);
  /*
    const field_item = description.getElementsByClassName("field-item");
    field_item.forEach(item => {
      description_html.replace(item.outerHTML, item.outerHTML.replace("<div ", "<p ").replace("</div>", "</p>"))
    })*/
    const anchors = description.getElementsByTagName("a").filter(a => a.attributes.filter(a => a.name === "download").length !== 0);
    for (var i = 0; i < anchors.length; i++) {
      var a = anchors[i];
      description_html = description_html.replace(a.outerHTML, `<img src="${a.getAttribute("href")}" alt="${a.innerHTML}" /> <br/> ${a.outerHTML}`);
    }
    const bad_images = description.getElementsByClassName("file-icon")
    bad_images.forEach(img => {
      description_html = description_html.replace(img.outerHTML.replace("/>", " />"), "")
    })
    input = input.replace(before_html, encode(description_html))
  });
  console.log(input)
}())
