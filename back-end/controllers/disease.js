const fetch =require("node-fetch")
const cheerio = require('cheerio')



const getDiseaseName =(req,res)=>{

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

        return{
            diseaseNameSingle,
            diseaseNameMultipleArrayList
        }
    }
    const diseaseNameData =   gettingDiseaseName (req.body.diseaseName)

    diseaseNameData.then(result =>
  
        res.json(result)

    ).catch((error) => {
        console.error(error,'error');
    })
}

module.exports = {getDiseaseName}