import React, { Component } from 'react'
import { Grid, Form, Button, Divider } from 'semantic-ui-react'

class EditProfileForm extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            bio: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            confirmpass: ''
        }
    }
    render() {
        return (
            <Form>
                <Form.Input
                    label='Username' 
                    placeholder={this.props.currentUser.username}
                />
                <Form.TextArea 
                    label='Bio'
                    placeholder={this.props.currentUser.bio}
                />
                <Form.Input
                        label='Email' 
                        placeholder={this.props.currentUser.email}
                    />
                <Form.Input
                    label='First Name' 
                    placeholder={this.props.currentUser.first_name}
                />
                <Form.Input
                    label='Last Name' 
                    placeholder={this.props.currentUser.last_name}
                />
                <Form.Input
                    label='Password' 
                    placeholder='Password'
                />
                <Form.Input
                    label='Confirm Password' 
                    placeholder='Confirm Password'
                />
                <Button basic type='submit' content='Update'/>
            </Form>
        )
    }
}

export default EditProfileForm