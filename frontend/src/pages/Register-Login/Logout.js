import React, { useEffect, useState } from 'react';
import axios from 'axios';

import API from '../../common-functions/apiEndpoints';
import MessageBox from '../../component/MessageBox/MessageBox';
import './Logout.css';

function useHandleClick(propsMessage){
    const [message, setMessage] = useState();

    useEffect(() => {
        setMessage(propsMessage);

        return () => setMessage()
    }, [])

    function handleLogout(){
        localStorage.clear();
        
        setMessage('You are logged out!!');
        window.location.href = '/user/login';
    }

    function handleDelete() {
        console.log(API.user.delete);
        const email = localStorage.getItem('email');

        localStorage.clear();

        axios.post(API.user.delete, { email: email })
        .then((res) => {
            console.log(res);

            if(res.data.isError){
                return setMessage(res.data.isError);
            }

            setMessage(res.data.message);
            window.location.href = '/user/register';
        })
        .catch((err) => (console.log(err)));
    }

    return [message, handleLogout, handleDelete];
}

const Logout = (props) => {
    const { successMessage } = props;

    const [message, handleLogout, handleDelete] = useHandleClick(successMessage);
    
    return (
        <div className='logout-container'>
            <MessageBox message={message} />

            <button
            onClick={handleLogout}
            className='logout-btn'>
                Logout
            </button>
            <button
            onClick={handleDelete}
            className='logout-btn delete'>
                Delete Account
            </button>
        </div>
    );
}

export default Logout;
