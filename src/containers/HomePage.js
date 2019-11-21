import React from 'react'
import { Redirect } from 'react-router-dom'
const HomePage = () => {
    if (localStorage.jwt.length < 1) {
        return <Redirect to='/login' />
    } else {
        return (
            <div>
                Home Page
            </div>
        )
    }
}

export default HomePage