import React,{useState} from 'react'


import { GlobalContext } from '../GlobalContext'
import Interactions from '../components/interaction'
import ProfileDisease from '../components/profile-disease'
import ProfileDrug from '../components/profile-drug'
import Introduction from '../components/intro'


const HomePage = () => {
    const [drugProfile,setDrugProfile] = useState(['Ibuprofen','Aspirin','Propranolol']);
    const [diseaseProfile,setDiseaseProfile] = useState(['Asthma','Glaucoma','Hyperlipidemia']);

    return(


        <div>

            <GlobalContext.Provider value = {{drugProfile,setDrugProfile,diseaseProfile,setDiseaseProfile}}>
                
                < Introduction/>
               
                <div className='profile_wrapper_overall'>
                    <ProfileDrug />
                    <ProfileDisease />
                </div>
                
                <Interactions />
               
            </GlobalContext.Provider>
        </div>
    )


}

export default HomePage