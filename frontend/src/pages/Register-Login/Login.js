import React from 'react';
import { Link } from 'react-router-dom';

import MessageBox from '../../component/MessageBox/MessageBox';
import FormButtons from '../../component/Register-Login/components/FormButtons';
import InputWithLabel from '../../component/Register-Login/components/InputWithLabel';
import useManageUserDetails from '../../component/Register-Login/Logic/useManageUserDetails';
import Logout from './Logout';
import './Register-Login.css';

const Login = () => {
    const {
        handleInput, handleSubmit,
        errorMessage, message
    } = useManageUserDetails();

    const FormSections = [
        { type: 'email', name: 'email', label: 'Email', onChange: handleInput },
        { type: 'password', name: 'password', label: 'Password', onChange: handleInput }
    ]
    console.log(message)
    if(localStorage.getItem('userId')){
        return <Logout successMessage={message} />;
    }

    return (
        <div className='form-container'>
            <MessageBox
            message={message} />

            <form onSubmit={ (e) => handleSubmit('login', e) }>
                <h1 className='form-title'>Login</h1>

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
                
                <span>
                    If you are new here&nbsp;
                    <Link
                    className='form-link'
                    to='/user/register'>
                        Register Here.
                    </Link>
                </span>
                
            </form>
        </div>
    )
}

// class Login extends Component {
//     constructor(props){
//         super(props);

//         this.state = {
//             email: '',
//             password: '',
//             err: {
//                 email: '',
//                 password: ''
//             },
//             child: []
//         }
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//     handleChange(e){
//         let propertyName = {};
//         propertyName[e.target.name] = e.target.value;
//         // TODO add regex
//         // if(e.target.name === 'email'){
//         //     if(e.target.value){
//         //         this.setState({
//         //             err: {
//                         // ...this.state.err,
//         //                 email: 'Incorrect Email'
//         //             }
//         //         });
//         //     } else{
//         //         this.setState({
//         //             err: {
//                         // ...this.state.err,
//         //                 email: ''
//         //             }
//         //         })
//         //     }
//         // }
//         if(e.target.name === 'password'){
//             if(e.target.value.length<6){
//                 this.setState({
//                     err: {
//                         ...this.state.err,
//                         password: 'Minimum 6 characters long'
//                     }
//                 });
//             } 
//             else{
//                 this.setState({
//                     err: {
//                         ...this.state.err,
//                         password: ''
//                     }
//                 })
//             }
//         }
//         this.setState(propertyName)
//     }
//     handleSubmit(e){
//         e.preventDefault();
//         const userDetails = {
//             email: this.state.email,
//             password: this.state.password
//         }
//         if(
//             this.state.email ||
//             this.state.password
//             ){
//             if(!(
//                 this.state.err.email ||
//                 this.state.err.password
//                 )){
//                     console.log(userDetails);
//                     axios.post('http://localhost:4000/user/login', userDetails)
//                         .then(res => {
//                             this.setState({
//                                 email: '',
//                                 password: '',
//                             })
//                             localStorage.setItem('userId', res.data.userDetails._id);
//                             localStorage.setItem('username', res.data.userDetails.name);
//                             localStorage.setItem('email', res.data.userDetails.email);
//                             console.log(res);
//                         })
//                         .catch(err => console.log(err));
//             }
//         }
//     }
//     render() {
//         return (
//             <form className={this.state}>
//                 <fieldset>
//                     <legend>Login Here</legend>
//                     <section className='form-section'>
//                         <label>Email</label>
//                         <input type='email' name='email' value={this.state.email} onChange={this.handleChange} className='form-input' required/>
//                         {this.state.err.email?  generateErrorBox(this.state.err.email): null}
//                     </section>
//                     <section className='form-section'>
//                         <label>Password</label>
//                         <input 
//                             type='password'
//                             name='password'
//                             value={this.state.password}
//                             onChange={this.handleChange}
//                             className='form-input'
//                             required/>
//                         {this.state.err.password? generateErrorBox(this.state.err.password): null}
//                     </section>
//                     <section className='form-section'>
//                         <button type='submit' onClick={this.handleSubmit}>Submit</button>
//                     </section>
//                     <section className='form-section'>
//                         <button type='reset'>Reset</button>
//                     </section>
//                 </fieldset>
//             </form>
//         );
//     }
// }

export default Login;
