import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

class EditProfileForm extends Component {
    constructor() {
        super()

        this.state = {
            bio: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            confirmpass: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    submitHandler = (e, values, user) => {
        e.preventDefault()

        let updatedValues = {}
        for (let [key, value] of Object.entries(values)) {
            if (values[key] !== '') {
                updatedValues[key] = value
            }
        }

        if (values.password === values.confirmpass) {
            fetch(`http://localhost:3000/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.jwt}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(updatedValues)
            })
            .then(r => r.json())
            .then(window.location.href = "/profile")
        }
    }

    render() {
        return (
            <Form 
                size='small' 
                onChange={(e) => this.changeHandler(e)}
                onSubmit={(e) => this.submitHandler(e, this.state, this.props.currentUser)}
            >                
                <Form.Group widths='equal'>
                    <Form.Input
                        id='first_name'
                        label='First Name' 
                        placeholder={this.props.currentUser.first_name}
                    />
                    <Form.Input
                        id='last_name'
                        label='Last Name' 
                        placeholder={this.props.currentUser.last_name}
                    />
                </Form.Group>  

                <Form.TextArea 
                    id='bio'
                    label='Bio'
                    placeholder={this.props.currentUser.bio}
                />

                <Form.Input
                    id='email'
                    label='Email' 
                    placeholder={this.props.currentUser.email}
                /> 

                <Form.Group widths='equal'>
                    <Form.Input
                        id='password'
                        label='Password' 
                        placeholder='Password'
                    />
                    <Form.Input
                        id='confirmpass'
                        label='Confirm Password' 
                        placeholder='Confirm Password'
                    />
                </Form.Group><br/>    
                <Button basic type='submit' content='Update'/>
            </Form>
        )
    }
}

export default EditProfileForm