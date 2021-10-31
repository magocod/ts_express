const fs = require("fs/promises");
const path = require("path");

/**
 *
 * @param {string} folderName
 * @param {number} from
 * @returns {Promise<*[]>}
 */
async function findDirFiles(folderName, from = 0) {
    // this array will hold sales files as they are found
    let salesFiles = [];

    async function findFiles(folderName) {
        // read all the items in the current folder
        const items = await fs.readdir(folderName, { withFileTypes: true });

        // iterate over each found item
        for (const item of items) {
            // if the item is a directory, it will need to be searched for files
            if (item.isDirectory()) {
                // search this directory for files (this is recursion!)
                await findFiles(`${folderName}/${item.name}`);
            } else {
                // store the file path in the salesFiles array
                salesFiles.push(`${folderName}/${item.name}`.substr(from));
            }
        }
    }

    // find the sales files
    await findFiles(folderName);

    // return the array of found file paths
    return salesFiles;
}

async function main() {
    const baseFolder = "src"
    const p = path.resolve(__dirname, baseFolder)
    console.log("base folder: ", p)
    // const salesFiles = await findDirFiles(__dirname + "/tmp");
    const salesFiles = await findDirFiles(p, p.length - baseFolder.length);
    console.log(salesFiles);
}

main().catch((error) => {
    console.log(error);
});
