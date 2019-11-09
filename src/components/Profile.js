import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'antd'
import "antd/dist/antd.css";
import PokeTeamView from './PokeTeamView'

export default function Profile(props) {
    const { currentUser } = props

    const addTeam = () => {
        
        fetch(`http://localhost:3000/${currentUser.id}/team/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                alert(data.errors)
            } else {
                debugger
            }
        }) 
    }

    const renderTeams = () => {
        if (currentUser.teams.length > 0) {
            currentUser.teams.map(team => {
                return <PokeTeamView team={team} />
            })
        } else {
            return <p>No teams currently made.</p>
        }
    }

    if (currentUser == null)
        return <Redirect to='/' />

    return (
        <React.Fragment>
            {renderTeams()}

            <Button icon="plus-circle" onClick={() => addTeam()} > Add Team </Button>
        </React.Fragment>
    )
}