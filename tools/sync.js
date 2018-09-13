import { article, tag } from '../models';
import { User, Tag } from '../proxy'
import { getDefaultCover } from "../common/article";

const fs = require("fs")
const path = require("path")

const rootPath = path.join(__dirname, '../user-71414-1536659474');
const title = [];
const posts = [];

const readDir = (rootPath) => {
  fs.readdir(rootPath, (err,files) => {
    if(err) {
      console.log(err)
    } else {
      for (let filename of files) {
        title.push(filename);
        let subFilePath = path.join(rootPath, filename);
        fs.stat(subFilePath, (err, info) => {
          if (err) {
            console.log(err)
          } else {
            if(info.isDirectory()) {
              readDir(subFilePath);
            }
            if (info.isFile()) {
              fs.readFile(subFilePath, 'utf-8', (err, data) => {
                posts.push(data);
              })
            }
          }
        })
      }
    }
  })
}

readDir(rootPath)




let email = "371262808@qq.com";
let author = '';

 User.getUserByEmail(email).then(res => {
   author = res._id;
 });

// fs.readFile('./tools/Redis-摘抄.md', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err)
//   } else {
//     let a = new article();
//     a.content = data;
//     a.title = "Redis-摘抄"
//     a.author = author;
//     a.cover = getDefaultCover();
//     a.save();
//   }
// })


// 写入标签
// fs.readdir('user-71414-1536659474', (err, data) => {
//   data.forEach(item => {
//     let t = new tag();
//     t.name = item;
//     t.article = [];
//     t.save();
//   })
// })



