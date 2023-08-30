
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require('sharp');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs/promises');


async function walkTree(directory) {
  let dir = await fs.readdir(directory);
  let output = [];
  for (let i = 0; i < dir.length; i++) {
    let path = `${directory}/${dir[i]}`;
    let stats = await fs.stat(path);
    if (stats.isDirectory()) {
      output.push(...await walkTree(path));
    }
    if (stats.isFile()) {
      output.push(path)
    }
  }
  return output;
}

async function main() {
  const mediaFiles = await walkTree("./media");
  const imagesToOptimize = mediaFiles.filter((file) => file.endsWith(".png") || file.endsWith(".jpg"))
  for (let i = 0; i < imagesToOptimize.length; i++) {
    const image = sharp(imagesToOptimize[i]);
    const meta = await image.metadata();
    const width = meta.width > 300 ? 300 : meta.width;
    await image
      .toFormat("webp")
      .resize(width)
      .toFile(`${imagesToOptimize[i]}.webp`)
  }
}
main();
