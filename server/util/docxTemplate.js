var pizZip = require('pizzip')
var docxTemplate = require('docxtemplater')
var fs = require('fs')
var path = require('path')

const ZIP_OPTIONS = {type: "nodebuffer",compression: "DEFLATE",}

/**
 * 生成单个文件
 * @param {*} data 数据
 * @param {*} iPath 模板文件位置
 * @param {*} oPath 文件生成后存储位置
 */
const generateDoc = (data,iPath,oPath) =>{
    fs.writeFileSync(path.resolve(__dirname, oPath), getFileBuf(data,iPath));
}

/**
 * 生成zip
 * @param {} data 数据
 * @param {*} iPath 模板文件地址
 * @param {*} oPath 生成的zip存储位置
 * @param {*} item.fname doc文件名
 */
const generateZip = (data,iPath,oPath) =>{
    let zip = new pizZip()
    
    //文件放入zip包中，生成zip
    data.map((item,i)=>{
        zip.file(item.fname, getFileBuf(data[i],iPath));
    })

    let buf = zip.generate(ZIP_OPTIONS);    
    fs.writeFileSync(path.resolve(__dirname, oPath), buf);
}


/**
 * 获取模板文件渲染数据后的buf
 * @param {*} data 数据
 * @param {*} iPath 模板文件位置
 * @returns 
 */
const getFileBuf = (data,iPath) =>{
    //获取文件的二进制数据
    let cnt = fs.readFileSync(path.resolve(__dirname,iPath))
    //paragraphLoop:段落空格 ; linebreaks:换行符 ; nullGetter:去除未定义项undefined
    let file = new docxTemplate(new pizZip(cnt), {
        paragraphLoop: true,
        linebreaks: true,
        nullGetter: ()=> ''
    });
    file.render(data);

    //使用压缩生成较小的文档
    return file.getZip().generate(ZIP_OPTIONS);
} 

module.exports = {
    generateDoc,
    generateZip,
}