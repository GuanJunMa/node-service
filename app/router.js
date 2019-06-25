'use strict';
const fs = require('fs');
const dirList = fs.readdirSync('./app/routers');
const routeList = [];

dirList.forEach(item => {
  const subFileList = fs.readdirSync('./app/routers/' + item);
  subFileList.forEach(subItem => {
    routeList.push(require(`./routers/${item}/${subItem}`));
  });
});


const asyncFile = app => {
  routeList.forEach(item => {
    item(app);
  });
};

module.exports = app => asyncFile(app);
