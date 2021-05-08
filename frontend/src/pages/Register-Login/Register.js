import React from 'react';
import { Link } from 'react-router-dom';

import MessageBox from '../../component/MessageBox/MessageBox';
import FormButtons from '../../component/Register-Login/components/FormButtons';
import InputWithLabel from '../../component/Register-Login/components/InputWithLabel';
import useManageUserDetails from '../../component/Register-Login/Logic/useManageUserDetails';
import Logout from './Logout';
import './Register-Login.css';

const Register = () => {
    const {
        handleInput, handleSubmit,
        errorMessage, message
    } = useManageUserDetails();

    const FormSections = [
        { type: 'text', name: 'name', label: 'User Name', onChange: handleInput },
        { type: 'email', name: 'email', label: 'Email', onChange: handleInput },
        { type: 'password', name: 'password', label: 'Password', onChange: handleInput },
        { type: 'password', name: 'confirmPassword', label: 'Confirm', onChange: handleInput }
    ];
    
    if(localStorage.getItem('userId')){
        return <Logout successMessage={message} />;
    }

    return (
        <div className='form-container'>
            <MessageBox message={message}/>
            
            <form onSubmit={ (e) => handleSubmit('register', e) }>
                <h1 className='form-title'>Register</h1>

                <MessageBox
                isError
                styleClass='error-message'
                message={errorMessage}/>

                {
                    FormSections.map((section) => {
                        return (
                            <InputWithLabel details={{...section}} key={section.name}/>
                        )
                    })
                }

                <FormButtons/>

                <div>
                    If you have an account&nbsp;
                    <Link
                    className='form-link'
                    to='/user/login'> 
                        Login In Here.
                    </Link>
                </div>

                <div style={{
                    margin: '20px auto auto',
                    fontStyle: 'italic',
                    color: 'red'
                }}>
                    You can delete it if you want. 
                </div>
                
            </form>
        </div>
    )
}

export default Register;
