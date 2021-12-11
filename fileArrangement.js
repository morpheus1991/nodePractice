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
