import React from 'react'
import { connect } from 'react-redux'
import { Segment, Grid, Icon } from 'semantic-ui-react'

const Status = (props) => {
    let created = props.status.created_at
    let date = created.split('T')[0]
    let splitDate = date.split('-')
    let formattedDate = splitDate[1] + '-' + splitDate[2] + '-' + splitDate[0]

    let time = created.split('T')[1]
    let splitTime = time.split(':')
    let formattedTime = splitTime[0] > 12 
        ? splitTime[0] - 12 + ':' + splitTime[1] + ' PM ' 
            : splitTime[0] + ':' + splitTime[1] + ' AM ' 

    const selectedUser = props.selectedUser.length > 0 ? props.selectedUser : props.user

    const handleHeartClick = (status) => {
        fetch(`http://localhost:3000/statuses/${status.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                status: status
            })
        })
        .then(r => r.json())
        .then(data => {
            let newNumber = parseInt(
                document.querySelector(`#status${status.id}`
            ).textContent) + 1
            document.querySelector(`#status${status.id}`).innerHTML 
                = `<div class="right aligned column">
                        ${newNumber} 
                        <i aria-hidden="true" class="heart outline link icon"/>
                    </div>`
            props.addHeart(data, selectedUser)
        })
    }

    const handleDelete = (status) => {
        let component = document.querySelector(`#component${status.id}`)
        component.innerHTML = ''
        component.className = ''

        fetch(`http://localhost:3000/statuses/${status.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(r => r.json())
        .then(data => {
            props.deleteStatus(status, selectedUser)
        })
    }

    return (
        <Segment.Group size='small' id={`component${props.status.id}`}>
            <Segment inverted>
                <Grid>
                    <Grid.Column width={10} textAlign='left'>
                        {selectedUser.username 
                            ? selectedUser.username 
                                : selectedUser.user.username} posted:
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='right'>
                        {formattedDate} at {formattedTime}
                        {window.location.pathname === '/profile'
                            ? <Icon 
                                link 
                                name='delete' 
                                onClick={() => handleDelete(props.status)}/>
                                : null}
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment inverted>
                <Grid>
                    <Grid.Column textAlign='left'>
                        {props.status.content}
                    </Grid.Column>
                </Grid>
                <Grid id={'status' + props.status.id}>
                    <Grid.Column textAlign='right'>
                        {props.status.hearts} {props.selectedUser.id === props.currentUser.id || window.location.pathname === '/profile'
                            ? <Icon name='heart' />
                                : <Icon 
                                    link 
                                    name='heart outline' 
                                    onClick={() => handleHeartClick(props.status)}/>}
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteStatus: (deletedStatus, user) => { 
            let selectedUser
            user.username 
                ? selectedUser = user 
                    : selectedUser = user.user
            selectedUser.statuses.filter(status => status.id !== deletedStatus.id)

            dispatch({
                type: 'DELETED_STATUS',
                payload: selectedUser
            })
        },
        addHeart: (editedStatus, user) => {
            let selectedUser
            user.username
                ? selectedUser = user
                    : selectedUser = user.user
            let statusIndex = selectedUser.statuses.findIndex(status => status.id === editedStatus.id)
            selectedUser.statuses = Object.assign([], selectedUser.statuses, {[statusIndex]: editedStatus}).reverse()
        }
    }
}

export default connect(null, mapDispatchToProps)(Status)