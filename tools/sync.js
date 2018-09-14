import { User, Tag, Article } from '../proxy'
const fs = require("fs")
const path = require("path")

// 要导入的文件路径
const rootPath = path.join(__dirname, '../jianshu');

const tagData = {};
const postData = {};

// 作者账号
let email = "371262808@qq.com";
let author = '';

User.getUserByAccount(email).then(res => {
  author = res._id;
  postData.author = author;
});

const saveTag = async(data) => {
  await Tag.newAndSave(data)
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
    await saveTag(tagData);
    let subFilePath = path.join(rootPath, tagName);
    let subFiles = fs.statSync(subFilePath);
    if (subFiles.isDirectory()) {
      await Tag.getTagByName(tagName).then(res => {
        postData.tags.push(res._id)
      });
      let endFiles = fs.readdirSync(subFilePath);
      for (let posts of endFiles) {
        postData.title = getPostTitle(posts);
        let endFilePath = path.join(subFilePath, posts)
        let endFiles = fs.statSync(endFilePath);
        if (endFiles.isFile()) {
          let content = fs.readFileSync(endFilePath, 'utf-8');
          postData.content = content;
          savePost(postData)
        }
      }
    }
  }
}

readDirSync(rootPath)

