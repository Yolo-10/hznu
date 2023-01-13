var pizZip = require('pizzip')
var docxTemplate = require('docxtemplater')
var fs = require('fs')
var path = require('path')

const generateDoc = (data,iPath,oPath) =>{
    //获取input.docx的二进制数据
    let cnt = fs.readFileSync(path.resolve(__dirname,iPath))
    //paragraphLoop:段落空格 ; linebreaks:换行符 ; nullGetter:去除未定义项undefined
    let doc = new docxTemplate(new pizZip(cnt), {
        paragraphLoop: true,
        linebreaks: true,
        nullGetter: ()=> ''
    });

    doc.render(data);

    //使用压缩生成较小的文档
    let buf = doc.getZip().generate({type: "nodebuffer",compression: "DEFLATE"});
    fs.writeFileSync(path.resolve(__dirname, oPath), buf);
}

module.exports = {
    generateDoc,
}