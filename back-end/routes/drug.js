const express = require('express')
const router = express.Router();
const puppeteer = require('puppeteer');




    router.post('/drugName',(req,res)=>{
        console.log(req.body)
        

        const gettingDrugName = async (name) =>{
            let drugUrl = `https://www.drugs.com/search.php?searchterm=${name}`
        
            let browser = await puppeteer.launch()
            let page = await browser.newPage()
            
        
            await page.goto(drugUrl , {waitUntil: 'load', timeout: 0})
        
            const data = await page.evaluate(()=>{
                let drugName
                try{
                    drugName = document.querySelectorAll('.ddc-media-title')[0].innerText; 
                }
                catch(err){
                    drugName = "Check your spelling"
                }
               
               
                return{
                    drugName
                }
            })
            await browser.close()
            return   {
                data
            }
        }
        const drugNameTest =   gettingDrugName (req.body.drugName)
        //console.log(drugNameTest)
        drugNameTest.then(result =>
            //console.log(result.data)
            res.json(result.data)

        )
      
    })

module.exports = router;

