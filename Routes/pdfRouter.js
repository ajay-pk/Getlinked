const express=require('express');
const router=express.Router();
const {isAuth,Features} = require('../Middleware/isAuth');
const puppeteer = require('puppeteer')
const Link=require('../models/link')
let template=``
 
async function printPDF() {
  const browser = await puppeteer.launch({ headless:false});
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/pdf.html', {waitUntil: 'networkidle0'});
  await page.evaluate(()=>
  {
    let dom = document.querySelector('#links');
    dom.innerHTML = "hiii"
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
             console.log(result)
             result.forEach(element=>{
                 template+=`<div class="export-tile">
                                <a href="${element.Link}">${element.Topic}</a>
                                <div class="link-details">
                                    <p> ${element.SubjectName}</p>
                                    <p>${element.Department}</p>    
                                </div>    
                            </div>`
             })
         })
         .catch(err=>{
             console.log(err)
         })
    printPDF()
        .then(pdf => {
           res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
           res.send(pdf)
    })
    .catch(err=>{
        res.send('error while generating');
    })
})

module.exports=router;