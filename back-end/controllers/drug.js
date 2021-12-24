const fetch =require("node-fetch")
const cheerio = require('cheerio')

const getDrugName =(req,res)=>{

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
        return{

            drugName
        }

    }
    const   drugNameData =   gettingDrugName (req.body.drugName)

    drugNameData.then(result =>

        res.json({"drugName":result.drugName})

    ).catch((error) => {
        console.error(error,'error');
    })
  
}


module.exports={getDrugName}