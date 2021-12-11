import fs from "fs";
import zlib from "zlib";
// let i = 0;
// const changeFileText = async (fileAdress, changeText) => {
//   let asIsText = await fs.promises.readFile(fileAdress);
//   await fs.promises.writeFile(fileAdress, changeText);
//   let tobeText = await fs.promises.readFile(fileAdress);
//   console.log(`${asIsText}에서 ${i} ${tobeText}`);
// };

// changeFileText("./text.txt", "hello node!");

// const beforeMemory = process.memoryUsage().rss;
// fs.readFile("./text.txt", (_, data) => {
//   fs.writeFile("./text2.txt", "ㅇㅇㅇ", () => {});
//   const afterMomory = process.memoryUsage().rss;
//   const diff = afterMomory - beforeMemory;
//   const consumed = diff / 1024 / 1024;
//   console.log(diff);
//   console.log(`Consumed Memory: ${consumed}MB`);
// });

// const readStream = fs.createReadStream("./text.txt", {
//   highWaterMark: 8, //64kbyte
//   encoding: "utf-8",
// });
// const writeStream = fs.createWriteStream("./text2.zip");
// const data = [];
// readStream.on("data", (chunk) => {
//   console.log(chunk);
//   data.push(chunk);
//   console.count("data");
// });
// readStream.on("end", () => {
//   console.log(data.join(""));
// });
// readStream.on("error", (error) => {
//   console.log(error);
// });

// const writeStream = fs.createReadStream("./text.txt");
// writeStream.on("finish", () => {
//   console.log("finish");
// });

// const zlibStream = zlib.createGzip();
// const piping = readStream.pipe(zlibStream).pipe(writeStream);
// console.time("stream start");
// piping.on("finish", () => {
//   console.log("done");
// });
// console.timeEnd("stream start");

// fs.readdir("./", (err, files) => {
//   const TXTFOLDER = "texts";
//   !fs.existsSync(TXTFOLDER) && fs.mkdirSync(TXTFOLDER);
//   console.log(fs.existsSync("texts"));
//   files.forEach((item) => {
//     const itemSliceName = item.split(".");
//     const itemSliceLength = itemSliceName.length;
//     const itemTypeName = itemSliceLength[itemSliceLength];
//     console.log(itemSliceName);
//     if (itemSliceName[itemSliceLength - 1] === "txt") {
//       console.log(`${item}은 txt파일입니다.`);
//     } else {
//       console.log("검출결과없음");
//     }

//     const TXT = "txt";
//     const ZIP = "zip";
//     switch (itemTypeName) {
//       case TXT:
//         break;

//       default:
//         break;
//     }
//   });
// });

// fs.readFile("text2.txt", (err, data) => {
//   console.log(data);
// });
// console.log("hi");
// fs.writeFile("text3.txt", "data text", "utf-8", (err) => {
//   if (err) throw err;
//   console.log("write");
// });

// fs.promises
// fs.appendFile("text3.txt", "append data text", "utf-8", (err) => {
//   if (err) throw err;
//   console.log("append");
// });
// console.log("end");

// fs.readdir("./", (err, files) => {
//   console.log(Array.isArray(files));
//   if (err) throw err;
//   files.forEach((item) => {
//     console.log(item);
//   });
//   console.log("readdir");
// });

// fs.mkdir("./aaa", (err) => {
//   if (err) throw err;
// });

// fs.rmdir("./aaa", (err) => {
//   if (err) throw err;
// });

const validateFile = (folderInfos, file, path) => {
  const hasExtensionName = file.includes(".");
  let result = {
    validate: false,
    extensionName: null,
    folderName: null,
    path,
    file,
  };
  if (hasExtensionName) {
    const extensionNameArray = folderInfos.map((item) => item.extensionName);
    const splitItem = file.split(".");
    const extensionName = splitItem[splitItem.length - 1];
    const index = extensionNameArray.indexOf(extensionName);
    console.log(index);

    if (index !== -1) {
      result.folderName = folderInfos[index].folderName;
      result.validate = true;
      console.log(result);
    }
  }
  return result;
};

const makeFolderAndFileRename = ({ validate, folderName, path, file }) => {
  console.log("makeFolderAndFileRename실행");

  if (validate) {
    if (!fs.existsSync(`${path}${folderName}`))
      fs.mkdirSync(`${path}${folderName}`);
    fs.rename(`${path}${file}`, `${path}${folderName}/${file}`, (err) => {
      if (err) throw err;
    });
  }
};

const fileArrangement = (
  { path, folderInfos } = {
    path: "./",
    folderInfos: [{ folderName: "folderName", extensionName: "extensionName" }],
  }
) => {
  fs.readdir(path, (errror, files) => {
    if (errror) throw errror;
    files.forEach((file, i) => {
      makeFolderAndFileRename(validateFile(folderInfos, file, path));
    });
  });
};

fileArrangement({
  path: "./",
  folderInfos: [{ extensionName: "txt", folderName: "newText" }],
});
