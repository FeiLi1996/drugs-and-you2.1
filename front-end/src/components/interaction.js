import React, { useState,useContext } from 'react'




import { GlobalContext } from '../GlobalContext'

import httpClient from '../helper/httpClient'


const Interactions = () => {
    const {diseaseProfile,drugProfile} = useContext(GlobalContext)
    let [toggleDescriptionDisplay,setToggleDescriptionDisplay] = useState('noShow')
    let [toggleDescriptionDisplayBoolean,setToggleDescriptionDisplayBoolean] = useState(false)


    let [interactionsInfo,setInteractionsInfo] =useState([

        // {   
        //     drugName:'aspirin',
        //     diseaseName:'Asthma',
        //     description:'blah',
        //     severity:'mod'
        // },
        // {   
        //     drugName:'aspirin',
        //     diseaseName:'Fluid Retention',
        //     description:'blah',
        //     severity:'med'
        // },
   
    ]);
    let [loadingMessage,setLoadingMessage] =useState('')
   
    async function handleDrugDiseaseAnalysis (){

        if(Array.isArray(drugProfile) && drugProfile.length && Array.isArray(diseaseProfile) && diseaseProfile.length){

            console.log(drugProfile)
            console.log(diseaseProfile)
            
            setLoadingMessage('Loading...Sip a coffee.')
            
            var promiseArray=drugProfile.map(eachDrug =>{
                return httpClient.post("http://localhost:5000/interaction", {
                    "drugName":eachDrug
                    })})
            var ArrayOfResults = await Promise.all(promiseArray);
            console.log(ArrayOfResults);
            ArrayOfResults.map(result=>
                
                setInteractionsInfo(interactionsInfo=>[...interactionsInfo,...result.data]),
                setLoadingMessage('')
            )
            generatingDescriptionAndSeverityComponents()
            


        }
        else{
            setLoadingMessage('At least 1 drug and disease profile must be filled')
            
        }
       
    
        
         
        
    }    
    
    function generatingDescriptionAndSeverityComponents(){
        let displayedDescriptionAndSeverity =[]
        interactionsInfo.map((eachDrug,idx) =>{
            let eachDrugDescription = eachDrug.description.toLowerCase()
            
            for(let idx2 in diseaseProfile){
                let tempDiseaseName = diseaseProfile[idx2].toLowerCase()

                if(tempDiseaseName.includes(',')){
                    tempDiseaseName =tempDiseaseName.split(',')[0]
                    //console.log(tempDiseaseName)
                }
                if(tempDiseaseName.length >= 10){
                    tempDiseaseName = tempDiseaseName.substring(0,tempDiseaseName.length-2)
                }

                if(eachDrugDescription.includes("'s")){
                    eachDrugDescription= eachDrugDescription.replace(/'s/g, '')
                    //console.log(eachDrugDescription)
                }
                
                if(eachDrugDescription.includes(tempDiseaseName)){
         
                    displayedDescriptionAndSeverity.push(

                        <ul key ={idx +1 * parseInt(idx2)+1} className='individualInteraction_wrapper'>
                            <div className='description_header' >
                                <span id='interaction_drugName'>{eachDrug.drugName}</span><span id='preposition'>With</span><span id='interaction_diseaseName'>{diseaseProfile[idx2]}</span><span id='interaction_severity'>Severity:<span id='severity_category'>{eachDrug.severity}</span></span>
                            </div>
                            <li className={`interaction_description ${toggleDescriptionDisplay}`}>Description:{eachDrug.description}</li>
                        </ul>
                    )
                }
            
                
            }

            
            return null
        }) 

        console.log(interactionsInfo)
        console.log(displayedDescriptionAndSeverity)
        return displayedDescriptionAndSeverity
   
    }



    // arr1=[3,3,4,5,6]
// arr2=[4,6,4,7,8]

// arr = []

//     arr=arr1.map(element =>{
        
//         for(let el in arr2){
//             console.log(element,'arr1','loop1')
//             console.log(el,'arr2','loop2')
            
//             return(arr2[el] + element)
//         }
//         console.log('space')
//     })
    
    
// console.log(arr,'final arr');
// 3 'arr1' 'loop1'
// 0 arr2 loop2
// 3 'arr1' 'loop1'
// 0 arr2 loop2
// 4 'arr1' 'loop1'
// 0 arr2 loop2
// 5 'arr1' 'loop1'
// 0 arr2 loop2
// 6 'arr1' 'loop1'
// 0 arr2 loop2
// [ 7, 7, 8, 9, 10 ] 'final arr'



        

    function toggleDescription() {
        setToggleDescriptionDisplayBoolean(toggleDescriptionDisplayBoolean => !toggleDescriptionDisplayBoolean)
        console.log(toggleDescriptionDisplayBoolean)
        if(!toggleDescriptionDisplayBoolean){
            setToggleDescriptionDisplay('yesShow')
        }
        else{
            setToggleDescriptionDisplay('noShow')
        }

    } 

    

    return(


        <div className="interaction_wrapper_overall">
            <div className='component_name_title'>
                <h1>Interactions</h1>
            </div>
            <div className='interaction_buttons'>
                <button onClick={handleDrugDiseaseAnalysis}>Check Interactions</button>
                <button onClick={()=>setInteractionsInfo([])}> Clear Interactions</button>
                <button onClick={toggleDescription}> Toggle Reveal</button>
            </div>
            <div id='loading_message'>
                {loadingMessage}
            </div>

            <div className='interactionInformations_wrapper'>
                {/* {displayedDescriptionAndSeverity} */}
                {generatingDescriptionAndSeverityComponents()}
            </div>

            
          
       
        </div>
    )


}

export default Interactions