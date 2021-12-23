import React from 'react'
import Medical from '../assets/images/medical.png'
import StayHome from '../assets/images/stay-home.png'

const Introduction = () => {


    return(
        <div className='intro_wrapper_overall'>

            <div className='intro_wrapper'>
                <div className='app_name_wrapper'>
                    <h1 className='app_name'>Drugs and You2</h1>
                </div>
                <div className='please_read_wrapper'>
                    <h3 className='please_read'>Please Read!</h3>
                    <ul className='list_wrapper'>
                        <li>HIPPA secured.Doesn't store your data inputs</li>
                        <li>Test case: drug->ibuprofen and disease->hypertension</li>
                        <li>Currently only <strong>generic names</strong> work!</li>
                        <li><strong>No Brand Names!!!</strong></li>

                    </ul>
                </div>
            </div>
            <div className='intro_images_wrapper'>
                <div ><img src={Medical} alt='Medical' /></div>
                <div><img src={StayHome} alt='Stay Home' /></div>
            </div>
            
        </div>
    )


}

export default Introduction