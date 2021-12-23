const express = require('express')
const router = express.Router();
const puppeteer = require('puppeteer');




    router.post('/interaction',(req,res)=>{
        console.log(req.body)
        let overallInteractionDescription =[];

        const gettingInteractionDescription = async (name) =>{
            
            let interactionDescriptionUrl = `https://www.drugs.com/disease-interactions/${name}`
        
            let browser = await puppeteer.launch()
            let page = await browser.newPage()
            
        
            await page.goto(interactionDescriptionUrl , {waitUntil:'networkidle2'})
        
            const data = await page.evaluate(()=>{

             

                let drugAndDiseasesArrayList
          
                let interactionDescriptionArrayList
                let interactionSeverityArrayList
                
                
                // try{
                //     interactionDescriptionNodeList = [...document.querySelectorAll('.interactions-reference')]
                //     interactionDescriptionArrayList = interactionDescriptionNodeList.map(oneInteraction =>
                //         oneInteraction.getElementsByTagName('p')[1].innerHTML
                //     )
                //     interactionDescriptionSeverityArrayList = interactionDescriptionNodeList.map(oneInteraction =>
                //         oneInteraction.getElementsByTagName('p')[0].innerHTML
                //     )


                //     drugAndDiseasesNodeList1 = document.querySelector("ul.interactions")
                //     drugAndDiseasesNodeList2 = [...drugAndDiseasesNodeList1.querySelectorAll('li')]
                //     drugAndDiseasesArrayList = drugAndDiseasesNodeList2.map(oneInteraction =>
                //         oneInteraction.innerText
                //     )
                // }
                
                // catch(err){
                //     overallInteractionDescription = "Something went wrong. Try again"
                // }

                try {
                    drugAndDiseasesArrayList = [...document.querySelectorAll('.interactions-reference')]
                    interactionSeverityArrayList = drugAndDiseasesArrayList.map(eachInteraction =>
                        eachInteraction.querySelector('div').querySelector('span').innerText    
                    )
                    interactionDescriptionArrayList = drugAndDiseasesArrayList.map(eachInteraction =>
                        eachInteraction.getElementsByTagName('p')[1].innerText   
                    )
                        
                    
                                //oneInteraction.querySelector('div').querySelector('span').innerText
                                

                            
                } catch (error) {
                    //overallInteractionDescription = "An error has occurred please try again"
                }
                
    
                
                

             
                return{
                    interactionSeverityArrayList,
                    interactionDescriptionArrayList
                   
                }
            })
            await browser.close()
            
            
           



            return   {
                data
            }
        }
        const interactionDescriptionData =   gettingInteractionDescription (req.body.drugName)
        //console.log(drugNameTest)
        interactionDescriptionData.then(result =>{
            //console.log(result.data)
            for(let i =0;i<result.data.interactionSeverityArrayList.length;i++ ){
                    overallInteractionDescription.push({
                        'drugName': req.body.drugName,
                        'severity':result.data.interactionSeverityArrayList[i],
                        'description':result.data.interactionDescriptionArrayList[i]
                    })
                }

            //res.json(result.data)
      
            res.json(overallInteractionDescription)
        })
        
        
      
    })

module.exports = router;
