import express from "express";
import fs from "fs";

const app = express();
const ROOt_FOLDER = "./approutes/";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function handleRegularRoutes(fileUrl, req, res) {
  try {
    const module = await import(fileUrl);
    let data = null;
    const httpVerb = req.method.toLowerCase();
    console.log(httpVerb);
    if (module[httpVerb]) {
      data = module[httpVerb](req, res);
    } else {
      data = module.handler(req, res);
    }
    return data;
  } catch (e) {
    console.log(e);
    res.statusCode = 404;
    return false;
  }
}

async function handleDynamicRoutes(folder) {
  try {
    const files =  await fs.promises.readdir(folder);

    const dynamicfileName = await files.find((fname) => {
      return fname.match(/\[[a-zA-Z0-9\._]+\]/);
    });
    return {
      file: dynamicfileName,
      params: dynamicfileName.replace("[", "").replace("].js", ""),
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}

app.all("/*", async (req, res) => {
  let fileUrl = (ROOt_FOLDER + req.url).replace("//", "/");
  console.log(fileUrl);

  let isFile = fs.existsSync(fileUrl + ".js");

  if (!isFile) {
    fileUrl += "/index.js";
  } else {
    fileUrl += ".js";
  }

  console.log(fileUrl);

  let result = await handleRegularRoutes(fileUrl, req, res);

  if (result === false) {
    //return res.send("Route not found ");

    const PathArray = (ROOt_FOLDER + req.url).replace("//", "/").split("/");
    console.log(PathArray);
    const lastElement = PathArray.pop();
    console.log(lastElement);
    const folderToCheck = PathArray.join("/");
    const dynamicHandler = await handleDynamicRoutes(folderToCheck);
    if (!dynamicHandler) {
      return res.send("Route not found");
    }
    req.params = { ...req.params, [dynamicHandler.params]: lastElement };

    result = await handleRegularRoutes([folderToCheck, dynamicHandler.file].join("/"), req, res);
  } else {
    res.send(result);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
