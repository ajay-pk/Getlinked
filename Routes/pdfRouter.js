const express=require('express');
const router=express.Router();
const {isAuth,Features} = require('../Middleware/isAuth');
const puppeteer = require('puppeteer')
const Link=require('../models/link')
const uploadData={
    uploadLinks:[]
}
 
async function printPDF() {
  const browser = await puppeteer.launch({ headless:false});
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/pdf.html', {waitUntil: 'networkidle0'});
  page.evaluvate(()=>{
      const template=``

      document.getElementById('links').innerHTML=data

  })
  const pdf = await page.pdf({ 
      format: 'A4',
      printBackground:true,
      preferCSSPageSize:true

     });
 
  await browser.close();
  return pdf
}

router.get('/mock',Features,(req,res,next)=>{
    console.log('Hi')
    Link.find({saved:req.user.id})
        .select({Topic:1,Link:1,Department:1,LinkType:1,SubjectName:1})
         .then(result=>{
             const template=``
             result.forEach(element=>{
                 template+=`<div class="export-tile">
                                <a href="${element.Link}">${element.Topic}</a>
                                <div class="link-details"></div>    
                            </div>`
             })
         })
         .catch(err=>{
             console.log('error while pdf user get')
         })
    // printPDF()
    //     .then(pdf => {
    //        res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
    //        res.send(pdf)
    // })
    // .catch(err=>{
    //     res.send('error while generating');
    // })
})

module.exports=router;