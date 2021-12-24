const fetch =require("node-fetch")
const cheerio = require('cheerio')



const getInteractionDescription=(req,res)=>{

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

        return{
            interactionSeverityArrayList,
            interactionDescriptionArrayList
            
        }
      
    }
    const interactionDescriptionData =   gettingInteractionDescription (req.body.drugName)

    interactionDescriptionData.then(result =>{

        for(let i =0;i<result.interactionSeverityArrayList.length;i++ ){
                overallInteractionDescription.push({
                    'drugName': req.body.drugName,
                    'severity':result.interactionSeverityArrayList[i],
                    'description':result.interactionDescriptionArrayList[i]
                })
            }

        
        res.json(overallInteractionDescription)
    
    }).catch((error) => {
        console.error(error,'error');
    })

}

module.exports = {getInteractionDescription}