import React, { useContext,useState } from 'react'



import { GlobalContext } from '../GlobalContext'
import {DynamicForm} from './forms'
import httpClient from '../helper/httpClient'

const ProfileDrug = () => {
    const {drugProfile,setDrugProfile} = useContext(GlobalContext)
    const [searchResult,setSearchResult] = useState('Search a drug')


   function deleteDrugFromProfile(idx){
        let tempCopy
        tempCopy = JSON.parse(JSON.stringify(drugProfile));
        tempCopy.splice(idx,1)
        setDrugProfile(tempCopy)
   }
   function addDrugProfile (newDrug){

    setDrugProfile([...drugProfile,newDrug])
    setSearchResult('Search a drug')
   }
   function handleDrugFormSubmission(event){
       event.preventDefault()
       setSearchResult('Loading...Sip a coffee.')

       httpClient.post("http://localhost:5000/drugName", {
        "drugName":event.target.drug_name.value
        }).then(response=>{


        setSearchResult(response.data.drugName)
          
        }).catch(error=>{
            console.log(error)
        })

   }
    
    return(


        <div className='drug_component_wrapper'>
            <div className='component_name_title'>
                <h1>ProfileDrug</h1>
            </div>
            <div className='user_drug_profile_wrapper'>
                <ul  className="medication_list">
                    {drugProfile.map((drug,idx)=>
                    <li   className="medication" key={idx}> 
                        {drug} <span   className="fake_button_action_delete" onClick = {()=>deleteDrugFromProfile(idx)}> X</span>
                    </li>

                    )}
                                
                </ul>   
            </div>
     
            
            <DynamicForm handleFormSubmission={handleDrugFormSubmission} labelName = "Drug Name:" inputName="drug_name" placeholder ="Drug Name"/>


            {(searchResult) && !searchResult.includes("Check") && !searchResult.includes("Search") && !(searchResult ==='Loading...Sip a coffee.') ?
                <ul  className="drug_search">
                    <li>{searchResult} <span  className="fake_button_action_add" onClick = {()=>addDrugProfile(searchResult)}>+</span></li>
                </ul>
                
            :
            (
                <ul  className="drug_search">
                    <li>{searchResult} </li>
                </ul>
                
            )}
        </div>
    )


}

export default ProfileDrug