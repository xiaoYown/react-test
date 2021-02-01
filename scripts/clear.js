const fs = require('fs');
const path = require('path');
const dir = require('../cypress.json').reporterOptions.reportDir;

const p = path.resolve(process.cwd(), dir);

function readFileList(dir, filesList) {
  const files = fs.readdirSync(dir);
  files.forEach((item) => {
    const file = path.join(dir, item);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) {
      readFileList(file + '/', filesList);
    } else {
      const obj = {};
      obj.path = dir;
      obj.filename = item;
      filesList.push(obj);
    }
  })
}

const getFiles = {
  getFileList: function (path) {
    const filesList = [];
    readFileList(path, filesList);
    return filesList;
  },
  getReportFiles: function (path) {
    const reportList = [];

    this.getFileList(path).forEach((item) => {
      reportList.push(item.filename)
    });
    return reportList;
  }
};

function clearReports (folder) {
  const reportList = getFiles.getReportFiles(folder);
  reportList.forEach(item => {
    fs.unlink(path.join(folder, item), (err) => {
      if (err) {
        throw err;
      }
    });
  });
}

clearReports(p);