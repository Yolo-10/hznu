var PizZip = require('pizzip')
var Doc = require('docxtemplater')
var fs = require('fs')
var path = require('path')

//使用压缩生成较小的文档
const OPTIONS = {type: "nodebuffer",compression: "DEFLATE"}


const generateDoc = (data,iPath,oPath) =>{
    //获取input.docx的二进制数据
    let DOC_CNT = fs.readFileSync(path.resolve(__dirname,iPath))  
    //
    let ZIP = new PizZip(DOC_CNT); 
    //paragraphLoop 段落空格  linebreaks 换行符 nullGetter去除未定义项undefined
    let DOC = new Doc(ZIP, {
        paragraphLoop: true,
        linebreaks: true,
        nullGetter: ()=> ''
    });

    DOC.render(data);

    let buf = DOC.getZip().generate(OPTIONS);
    fs.writeFileSync(path.resolve(__dirname, oPath), buf);
}

module.exports = {
    generateDoc,
}