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
let tagLength = null;
let filesLength = null;

const tagData = {};
const postData = {};
postData.release = true;  //是否发布文章

// 创建导入账号
let userInfo = {
  account: 'superAdmin',
  password: 'superAdmin',
  superAdmin: true
};
let author = null;

User.getUserByAccount(userInfo.account).then(res => {
  if (res) {
    author = res._id;
  } else {
    User.newAndSave(userInfo).then(res => {
      author = res._id;
    });
  }
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
  try {
    let files = fs.readdirSync(rootPath);
    tagLength = files.length;
    for (let tagName of files) {
      postData.tags = [];
      tagData.name = tagName;
      console.log(`正在导入标签：${tagName} ...`)
      const obj = await saveTag(tagData);
      console.log(`标签：${tagName}导入成功`)
      let subFilePath = path.join(rootPath, tagName);
      let subFiles = fs.statSync(subFilePath);
      if (subFiles.isDirectory()) {
        postData.tags.push(obj._id);
        try {
          let endFiles = fs.readdirSync(subFilePath);
          filesLength += endFiles.length;
          let content = '';
          for (let posts of endFiles) {
            postData.title = getPostTitle(posts);
            let endFilePath = path.join(subFilePath, posts)
            let endFiles = fs.statSync(endFilePath);
            if (endFiles.isFile()) {
              try {
                content = fs.readFileSync(endFilePath, 'utf-8');
                postData.content = content;
                console.log(`正在导入 ${endFilePath} ...`)
                await savePost(postData);
                console.log(`${endFilePath} 导入成功`)
              } catch(err) {
                console.log(endFilePath, err)
              }
            }
          }
        } catch (err) {
          console.log(subFilePath, err)
        }
      }
    }
  } catch (err) {
    console.log(rootPath, err)
  }
  console.log(`导入完成，共导入${tagLength}个标签, ${filesLength}篇文章`)
}

readDirSync(rootPath)


