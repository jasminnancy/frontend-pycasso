import React from 'react'
import { Segment } from 'semantic-ui-react'

const CloseFriendsPage = (props) => {
    console.log(props)
    return (
        <div>
            <Segment inverted padded='very'>
                <b>Note:</b> In order to add close friends, you must first start a conversation with someone.
            </Segment>

        </div>
    )
}

export default CloseFriendsPage