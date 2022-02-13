const fs = require("fs/promises");
const path = require("path");

/**
 *
 * @param {string} folderName
 * @param {number} from
 * @returns {Promise<*[]>}
 */
async function findDirFiles(folderName, from) {
  // this array will hold sales files as they are found
  let salesFiles = [];

  async function findFiles(folderName) {
    // read all the items in the current folder
    const items = await fs.readdir(folderName, { withFileTypes: true });

    // iterate over each found item
    for (const item of items) {
      // if the item is a directory, it will need to be searched
      if (item.isDirectory()) {
        // call this method recursively, appending the folder name to make a new path
        await findFiles(path.join(folderName, item.name));
      } else {
        // store the file path in the salesFiles array
        salesFiles.push(path.join(folderName, item.name).substr(from));
      }
    }
  }

  await findFiles(folderName);

  return salesFiles;
}

async function main() {
  const baseFolder = "src";
  const p = path.resolve(__dirname, baseFolder);
  console.log("base folder: ", p);
  // const salesFiles = await findDirFiles(path.join(__dirname, "tmp"));
  const salesFiles = await findDirFiles(p, p.length - baseFolder.length);
  console.log(salesFiles);
}

main().catch((error) => {
  console.log(error);
});
