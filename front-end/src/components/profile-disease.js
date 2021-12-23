import React,{useState,useContext} from 'react'


import { GlobalContext } from '../GlobalContext'
import { DynamicForm } from './forms'
import httpClient from '../helper/httpClient'

const ProfileDisease = () => {
    const {diseaseProfile,setDiseaseProfile} = useContext(GlobalContext)
    const [searchResult,setSearchResult] = useState([])

    
   //api calls
   function deleteDiseaseFromProfile(idx){
        let tempCopy
        tempCopy = JSON.parse(JSON.stringify(diseaseProfile));
        tempCopy.splice(idx,1)
        setDiseaseProfile(tempCopy)
   }
   function addDiseaseProfile (newDisease){

    // let tempCopy;

    // tempCopy = JSON.parse(JSON.stringify(drugProfile));
    setDiseaseProfile([...diseaseProfile,newDisease])
    setSearchResult([])
 
   }
   function handleDiseaseFormSubmission(event){
       event.preventDefault()
       console.log(event.target.disease_name.value)
       setSearchResult('Loading...Sip a coffee.')

       httpClient.post("http://localhost:5000/diseaseName", {
        "diseaseName":event.target.disease_name.value
        }).then(response=>{
  

            let diseaseNameSingle=response.data.diseaseNameSingle
            let diseaseNameMultipleArrayList=response.data.diseaseNameMultipleArrayList
            
            let diseaseNameSingleCondition=diseaseNameSingle.includes('Check')
            let diseaseNameMultipleArrayListCondition=diseaseNameMultipleArrayList.includes('Check')
            console.log(diseaseNameSingleCondition,'single')
            console.log(diseaseNameMultipleArrayListCondition,'multiple')
            console.log(response.data)
            if( !diseaseNameSingleCondition  && diseaseNameMultipleArrayListCondition){
                setSearchResult ([diseaseNameSingle])
            }
            else if(diseaseNameSingleCondition && !diseaseNameMultipleArrayListCondition){
                setSearchResult (diseaseNameMultipleArrayList)
            }
            else{
                if( diseaseNameSingleCondition &&  diseaseNameMultipleArrayListCondition){
                    setSearchResult ("Check your spelling")
                }

            }
            

        //setSearchResult(response.data.drugName)   
        }).catch(error=>{
            console.log(error)
        })
       //setSearchResult([event.target.disease_name.value])   
      
   }

   console.log('hello')
    return(


        <div className='disease_component_wrapper'>
            <div className='component_name_title'>
                <h1>ProfileDisease</h1>
            </div>

            <div className='user_disease_profile_wrapper'>
                <ul  className="disease_list">
                    {diseaseProfile.map((disease,idx)=>
                    <li   className="disease" key={idx}> 
                        {disease} <span  className="fake_button_action_delete" onClick = {()=>deleteDiseaseFromProfile(idx)}> X</span>
                    </li>

                    )}
                                
                </ul>   
            </div>
            <DynamicForm handleFormSubmission ={handleDiseaseFormSubmission} labelName = "Disease Name:" inputName="disease_name" placeholder ="Disease Name"/>
            {(searchResult) && (!searchResult.includes("Check") && !(searchResult ==='Loading...Sip a coffee.') ) ?
                (<ul className="disease_search_list">
                    {searchResult.map((disease,idx)=>
                        <li   className="disease_search" key={idx}> 
                            {disease} <span  className="fake_button_action_add" onClick = {()=>addDiseaseProfile(disease)}> +</span>
                        </li>

                    )}
                </ul>
                )
            :
            (
                (<ul className="disease_search_list">
                    <li  className="search_disease">{searchResult} </li>
                </ul>
                )
            )}
   
        </div>
    )


}

export default ProfileDisease