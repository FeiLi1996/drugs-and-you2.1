const express = require('express')
const router = express.Router();
const fetch =require("node-fetch")
const cheerio = require('cheerio')




    router.post('/interaction',(req,res)=>{
        console.log(req.body)
        let overallInteractionDescription =[];

        const gettingInteractionDescription = async (name) =>{
            
            let interactionDescriptionUrl = `https://www.drugs.com/disease-interactions/${name}`
            let response = await fetch(interactionDescriptionUrl)
            let body = await response.text()
            const $ = cheerio.load(body)


   
            let interactionDescriptionNodeList
            let interactionDescriptionArrayList
            let interactionSeverityNodeList
            let interactionSeverityArrayList
            interactionSeverityNodeList = $('.ddc-status-label')
            interactionSeverityArrayList =[...interactionSeverityNodeList].map(eachInteractionSeverity =>{
                return(
                    $(eachInteractionSeverity).text()
                )
            })
          
            interactionDescriptionNodeList =$('.interactions-reference> :nth-child(2)')
            interactionDescriptionArrayList =[...interactionDescriptionNodeList].map(eachInteractionDescription =>{
                return(
                    $(eachInteractionDescription).text()
                )
            })


            


            // try {
            //     drugAndDiseasesArrayList = [...document.querySelectorAll('.interactions-reference')]
            //     interactionSeverityArrayList = drugAndDiseasesArrayList.map(eachInteraction =>
            //         eachInteraction.querySelector('div').querySelector('span').innerText    
            //     )
            //     interactionDescriptionArrayList = drugAndDiseasesArrayList.map(eachInteraction =>
            //         eachInteraction.getElementsByTagName('p')[1].innerText   
            //     )
                    
                
            //                 //oneInteraction.querySelector('div').querySelector('span').innerText
                            

                        
            // } catch (error) {
            //     //overallInteractionDescription = "An error has occurred please try again"
            // }

            return{
                interactionSeverityArrayList,
                interactionDescriptionArrayList
                
            }
          
        }
        const interactionDescriptionData =   gettingInteractionDescription (req.body.drugName)
        //console.log(drugNameTest)
        interactionDescriptionData.then(result =>{
            //console.log(result.data)
        
            for(let i =0;i<result.interactionSeverityArrayList.length;i++ ){
                    overallInteractionDescription.push({
                        'drugName': req.body.drugName,
                        'severity':result.interactionSeverityArrayList[i],
                        'description':result.interactionDescriptionArrayList[i]
                    })
                }

            //res.json(result.data)
            
            res.json(overallInteractionDescription)
            //console.log(overallInteractionDescription)
        })
        
        
        
      
    })

module.exports = router;
