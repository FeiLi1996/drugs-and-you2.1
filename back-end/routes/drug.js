const express = require('express')
const router = express.Router();
const fetch =require("node-fetch")
const cheerio = require('cheerio')




    router.post('/drugName',(req,res)=>{
        console.log(req.body)
        

        const gettingDrugName = async (name) =>{
            let drugUrl = `https://www.drugs.com/search.php?searchterm=${name}`
        
            let response = await fetch(drugUrl)
            let body = await response.text()
            const $ = cheerio.load(body)

            let drugName;
            let searchDrug;
            searchDrug = $('.ddc-media-title').text().split(' ')[0]

            if(searchDrug){
                drugName=searchDrug
            }
            else{
                drugName = "Check your spelling"
            }
            console.log(drugName,'1??')

                

            return{

                drugName
            }


   
      
     
        }
        const drugNameTest =   gettingDrugName (req.body.drugName)
        console.log(drugNameTest,'2')
        drugNameTest.then(result =>
            //console.log(result.drugName,'2') //{ drugName: 'Aspirin ' } 2
            res.json({"drugName":result.drugName})

        )
      
    })

module.exports = router;

