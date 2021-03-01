const express=require('express');
const router=express.Router();
const {isAuth,Features} = require('../Middleware/isAuth');
const puppeteer = require('puppeteer')
const Link=require('../models/link')
async function printPDF(data) {
  const browser = await puppeteer.launch({ headless:true});
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/pdf.html', {waitUntil: 'networkidle0'});

  await page.evaluate((data) => { 
    let dom=document.querySelector('#links')
    dom.innerHTML=data
  }, data);
  
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
             template=``
             result.forEach(element=>{
                 template+=`<a href="${element.Link}" target="_blank"><div class="export-tile">
                                    <b>${element.Department}</b>
                                    <b>${element.SubjectName}</b>
                                    <p> ${element.Topic}</p> 
                                    <b>${element.LinkType}</b>              
                                </div></a>
                            <hr>`
             })
             return template
         })
         .then(data=>{
            printPDF(data)
            .then(pdf => {
               res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
               res.send(pdf)
        })
        .catch(err=>{
            console.log(err)
            res.send(err);
        })
             
         })
         .catch(err=>{
             console.log(err)
         })
})

module.exports=router;