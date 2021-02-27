const express=require('express');
const router=express.Router();
const {isAuth,Features} = require('../Middleware/isAuth');
const puppeteer = require('puppeteer')
 
async function printPDF() {
  const browser = await puppeteer.launch({ headless:false});
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/bookmarks.html', {waitUntil: 'networkidle0'});
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