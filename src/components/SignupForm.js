import React, { Component } from 'react'
import { Segment, Form, Button, Select } from 'semantic-ui-react'

class SignupForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            confirmpass: '',
            email: '',
            userType: '',
            user: false
        }
    }

    changeHandler = (e) => {
        if (e.target.id !== 'userType') {
            this.setState({
                [e.target.id]: e.target.value
            })
        } else {
            this.setState({
                userType: e.target.innerText
            })
        }
        console.log(this.state)
    }

    handleSubmit = (e, values) => {
        e.preventDefault()

        if ( values.password === values.confirmpass ) {
            let userObject = {
                username: values.username, 
                password: values.password, 
                email: values.email,
                user_type: values.userType
            }

            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({user: userObject})
            }, this.setState({
                username: '',
                password: '',
                confirmpass: '',
                email: '',
                userType: ''
            }))
            .then(r => r.json())
            .then(data => {
                localStorage.setItem('jwt', data.jwt)
                this.setState({
                    ...this.state,
                    user: true
                })
            })
        } else {
            alert("passwords don't match")
        }
    }

    render() {
        if (this.state.user) {
            return window.location.href = "/"
        } else {
            return (
                <Segment padded='very' className='landing-page-forms'>
                    <Form onSubmit={(e) => this.handleSubmit(e, this.state)}>
                        <Form.Group>
                            <Form.Input 
                                id='username'
                                label='Username'
                                type='text' 
                                placeholder='Username'
                                value={this.state.username}
                                onChange={(e) => this.changeHandler(e)}
                            />
                            <Form.Input 
                                id='email'
                                label='Email'
                                type='text' 
                                placeholder='Email'
                                value={this.state.email}
                                onChange={(e) => this.changeHandler(e)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input 
                                id='password'
                                label='Password'
                                type='password' 
                                placeholder='Password'
                                value={this.state.password}
                                onChange={(e) => this.changeHandler(e)}
                            />
                            <Form.Input 
                                id='confirmpass'
                                label='Confirm Password'
                                type='password' 
                                placeholder='Confirm Password'
                                value={this.state.confirmpass}
                                onChange={(e) => this.changeHandler(e)}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field
                                id='userType'
                                control={Select}
                                label='User Type'
                                options={options}
                                placeholder='Account Type'
                                onChange={(e) => this.changeHandler(e)}
                            />
                        </Form.Group><br/>
                        <Button fluid type='submit'>Sign Up</Button>
                    </Form>
                </Segment>
            )
        }
    }
}

const options = [
    { id: 'userType', text: 'Photographer', value: 'Photographer' },
    { id: 'userType', text: 'Model', value: 'Model' },
    { id: 'userType', text: 'Other', value: 'Other' },
  ]

export default SignupForm