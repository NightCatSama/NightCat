require('babel-core/register')(
  {
    presets: ['stage-2', 'es2015']
  }
);
require('babel-polyfill');
process.env.NODE_ENV = 'development';

const fs = require('fs');
const path = require('path');
const {User, Tag, Article} = require('../proxy');

// 要导入的文件路径
const rootPath = path.join(__dirname, '../jianshu');

const tagData = {};
const postData = {};
postData.release = true;  //是否发布文章

// 作者账号
let email = '371262808@qq.com';

User.getUserByAccount(email).then(res => {
  author = res._id;
  postData.author = author;
});

const saveTag = async(data) => {
  return await Tag.newAndSave(data)
}

const savePost = async(data) => {
  let newArticle = await Article.newAndSave(data)
  await Tag.patchesTag(newArticle._id, data.tags)
}

const getPostTitle = (data) => {
  data = data.replace('.md', '')
  data = data.replace('.html', '')
  return data;
}

const readDirSync = async(rootPath) => {
  let files = fs.readdirSync(rootPath);
  for (let tagName of files) {
    postData.tags = [];
    tagData.name = tagName;
    const obj = await saveTag(tagData);
    let subFilePath = path.join(rootPath, tagName);
    let subFiles = fs.statSync(subFilePath);
    if (subFiles.isDirectory()) {
      postData.tags.push(obj._id);
      let endFiles = fs.readdirSync(subFilePath);
      let content = '';
      for (let posts of endFiles) {
        postData.title = getPostTitle(posts);
        let endFilePath = path.join(subFilePath, posts)
        let endFiles = fs.statSync(endFilePath);
        if (endFiles.isFile()) {
          content = fs.readFileSync(endFilePath, 'utf-8');
          postData.content = content;
          await savePost(postData);
        }
      }
    }
  }
}

readDirSync(rootPath)

