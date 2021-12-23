const express = require('express')
const router = express.Router();
const fetch =require("node-fetch")
const cheerio = require('cheerio')


router.post('/diseaseName',(req,res)=>{
    console.log(req.body)
    

    const gettingDiseaseName = async (name) =>{
        let diseaseUrl = `https://www.ncbi.nlm.nih.gov/mesh/?term=${name}`
        let response = await fetch(diseaseUrl)
        let body = await response.text()
        const $ = cheerio.load(body)

        let searchDiseaseNameSingle
        let diseaseNameSingle

        let searchDiseaseNameMultipleNodeList 
        let diseaseNameMultipleArrayList 
        searchDiseaseNameSingle = $('h1.title > span').text()
       
        if(searchDiseaseNameSingle){
            diseaseNameSingle=searchDiseaseNameSingle
        }
        else{

            diseaseNameSingle ="Check your spelling"
        }

        searchDiseaseNameMultipleNodeList  =$('p.title >a')
        diseaseNameMultipleArrayList =[...searchDiseaseNameMultipleNodeList].map(eachDiseaseName =>{
            return(
                $(eachDiseaseName).text()
            )
        })

        if(diseaseNameMultipleArrayList.length === 0 ){
         
           
            diseaseNameMultipleArrayList ="Check your spelling"
       
        }
        else{

            diseaseNameMultipleArrayList=diseaseNameMultipleArrayList.splice(0,4)
        }



        // $('.ddc-media-title').text().split(' ')[0]

        // try{
        //     diseaseNameSingle = document.querySelector('span.highlight').innerText
        // }
        // catch(err){
        //     //typeerror of undefined
        //     diseaseNameSingle = "Check your spelling"
        // }
        // try{
        //     diseaseNameMultipleNodeList=[...document.querySelectorAll('p.title')]
        //     diseaseNameMultipleArrayList= diseaseNameMultipleNodeList.map(singleDisease =>
        //         singleDisease.innerText
        //     )
        //     diseaseNameMultipleArrayList=diseaseNameMultipleArrayList.splice(0,4)
        //     if(diseaseNameMultipleArrayList.length == 0){
        //         diseaseNameMultipleArrayList = "Check your spelling"
        //     }
        // }
        // catch(err){
        //     //typeerror of undefined
        //     diseaseNameMultipleArrayList = "Check your spelling"
        // }
        
        
        //diseaseNameMultiple.splice(5,1)
        return{
            diseaseNameSingle,
            diseaseNameMultipleArrayList
        }
    }

    
    const diseaseNameData =   gettingDiseaseName (req.body.diseaseName)
    //console.log(diseaseNameData)
    diseaseNameData.then(result =>
        //console.log(result)
        res.json(result)

    )
  
})

module.exports = router;
