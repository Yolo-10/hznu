var pizZip = require('pizzip')
var docxTemplate = require('docxtemplater')
var fs = require('fs')
var path = require('path')

const ZIP_OPTIONS = {type: "nodebuffer",compression: "DEFLATE",}

/**
 * 生成单个文件
 * @param {*} data 数据
 * @param {*} iName 模板文件名
 * @param {*} oName 渲染后文件名
 */
const generateDoc = (data,iName,oName) =>{
    fs.writeFileSync(path.resolve(__dirname, `../${oName}`), getFileBuf(data,iName));
}

/**
 * 生成zip
 * @param {} data 数据
 * @param {*} iName 模板文件名
 * @param {*} oName 渲染后文件名
 * @param {*} item.fname doc文件名
 */
const generateZip = (data,iName,oName) =>{
    let zip = new pizZip()
    
    //文件放入zip包中，生成zip
    data.map((item,i)=>{
        zip.file(item.fname, getFileBuf(data[i],iName));
    })

    let buf = zip.generate(ZIP_OPTIONS);    
    fs.writeFileSync(path.resolve(__dirname, `../${oName}`), buf);
}


/**
 * 获取模板文件渲染数据后的buf
 * @param {*} data 数据
 * @param {*} iName 模板文件名
 * @returns 模板文件渲染后的buf
 */
const getFileBuf = (data,iName) =>{
    //获取文件的二进制数据
    let cnt = fs.readFileSync(path.resolve(__dirname,`../${iName}`))
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