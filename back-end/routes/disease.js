const express = require('express')
const router = express.Router();
const puppeteer = require('puppeteer');


router.post('/diseaseName',(req,res)=>{
    console.log(req.body)
    

    const gettingDiseaseName = async (name) =>{
        let diseaseUrl = `https://www.ncbi.nlm.nih.gov/mesh/?term=${name}`
    
        let browser = await puppeteer.launch()
        let page = await browser.newPage()
        
    
        await page.goto(diseaseUrl , {waitUntil: 'load', timeout: 0})
    
        const data = await page.evaluate(()=>{
            let diseaseNameSingle
            let diseaseNameMultipleNodeList 
            let diseaseNameMultipleArrayList 
            try{
                diseaseNameSingle = document.querySelector('span.highlight').innerText
            }
            catch(err){
                //typeerror of undefined
                diseaseNameSingle = "Check your spelling"
            }
            try{
                diseaseNameMultipleNodeList=[...document.querySelectorAll('p.title')]
                diseaseNameMultipleArrayList= diseaseNameMultipleNodeList.map(singleDisease =>
                    singleDisease.innerText
                )
                diseaseNameMultipleArrayList=diseaseNameMultipleArrayList.splice(0,4)
                if(diseaseNameMultipleArrayList.length == 0){
                    diseaseNameMultipleArrayList = "Check your spelling"
                }
            }
            catch(err){
                //typeerror of undefined
                diseaseNameMultipleArrayList = "Check your spelling"
            }
            
           
            //diseaseNameMultiple.splice(5,1)
            return{
                diseaseNameSingle,
                diseaseNameMultipleArrayList
            }
        })
        await browser.close()
        return   {
            data
        }
    }
    const diseaseNameData =   gettingDiseaseName (req.body.diseaseName)
    //console.log(diseaseNameData)
    diseaseNameData.then(result =>
        //console.log(result.data)
        res.json(result.data)

    )
  
})

module.exports = router;
