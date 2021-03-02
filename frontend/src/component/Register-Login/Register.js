import React, { Component } from 'react';

const generateErrorBox = message => {
    return (
        <div>
            {message}
        </div>
    )
}

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            errorMessage: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        let propertyName = {};
        propertyName[e.target.name] = e.target.value;
        this.setState(propertyName)
        if(e.target.name === 'confirm_password'){
            if(this.state.password !== e.target.value){
                this.setState({
                    errorMessage: 'Password Does Not Match'
                });
            } else{
                this.setState({
                    errorMessage: ''
                })
            }
        }
        console.log(propertyName)
        console.log(this.state)
    }
    render() {
        let box = null;
        if(this.state.errorMessage !== ''){
            box =  generateErrorBox(this.state.errorMessage);
        } else {
            box = null;
        }
        return (
            <form className={this.state}>
                {box}
                <fieldset>
                    <legend>Register Here</legend>
                    <section className='form-section'>
                        <label>Enter Name</label>
                        <input type='text' name='name' onChange={this.handleChange} className='form-input' required/>
                    </section>
                    <section className='form-section'>
                        <label>Enter Email</label>
                        <input type='email' name='email' onChange={this.handleChange} className='form-input' required/>
                    </section>
                    <section className='form-section'>
                        <label>Enter Password</label>
                        <input type='password' name='password' onChange={this.handleChange} className='form-input' required/>
                    </section>
                    <section className='form-section'>
                        <label>Confirm Password</label>
                        <input type='password' name='confirm_password' onChange={this.handleChange} className='form-input' required/>
                    </section>
                </fieldset>
            </form>
        );
    }
}

export default Register;
