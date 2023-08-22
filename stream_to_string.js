// 
// https://stackoverflow.com/a/49428486
function streamToString (stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  })
}
// i can change this to something else if need be, but this is CC-BY SA 4.0, and I can't tell if this
// repo counts as needing to be the same license, but I literally hate StackOverflow as a platform
// because they take effective ownership of everything you post there (even if they give you credit).
// you can never delete "correct answers" there because they technically own your answer now and
// you can't revoke that, so if you answer something and later realize you are wrong, you can't do anything
// except accept bad karma or delete your account (if you change your answer, you will be accused of "vandalism"),
// and I realize the license is irrevocable, but posts on a website should be able to be unpublished 
// even if the underlying content is irrevocably licensed.
//
// TLDR; fuck stackoverflow, as a platform, but massive ty to the person who posted 
// this under CC-BY SA 4.0: Marlon Bernardes, and if I need to change this to my own 
// code due to licensing issues, I will.
//
module.exports = streamToString
