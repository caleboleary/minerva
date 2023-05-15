import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

// Get the path and name of this file
const thisFilePath = fileURLToPath(import.meta.url);
const thisFileName = path.basename(thisFilePath);

// Read all files in the current directory
const files = fs.readdirSync(path.dirname(thisFilePath));

// Filter to .js files, excluding this file
const jsFiles = files.filter(
  (file) => file.endsWith(".js") && file !== thisFileName
);

async function getModules() {
  // Import each JS file and put it in an array
  const modules = await Promise.all(
    jsFiles.map((file) => {
      const filePath = path.join(path.dirname(thisFilePath), file);
      const fileURL = pathToFileURL(filePath);
      return import(fileURL);
    })
  );

  return modules;
}

// Export the array
export { getModules };
