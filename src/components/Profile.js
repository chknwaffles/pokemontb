import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Modal, Form, Input } from 'antd'
import "antd/dist/antd.css";
import TeamCardContainer from '../containers/TeamCardContainer'

export default function Profile(props) {
    const { currentUser, allPokemon, addToTeam } = props
    const [modal, setModal] = useState(false)
    const [teamName, setTeamName] = useState()

    const addTeam = () => {
        fetch(`http://localhost:3000/${currentUser.id}/team/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(teamName)
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                alert(data.errors)
            } else {
                setModal(false)
                console.log(data)
            }
        }) 
    }

    const renderTeams = () => {
        if (currentUser.teams.length > 0) {
            return currentUser.teams.map(team => {
                return <TeamCardContainer team={team} allPokemon={allPokemon} addToTeam={addToTeam} />
            })
        } else {
            return <p>No teams currently made.</p>
        }
    }

    const handleCancel = () => setModal(false)
    const handleChange = (e) => setTeamName(e.target.value)

    if (currentUser == null)
        return <Redirect to='/' />

    return (
        <div className='profile-container'>
            {renderTeams()}

            <Button icon="plus-circle" onClick={() => setModal(true)} > Add Team </Button>
            <Modal
                title='Add a team form'
                visible={modal}
                onOk={addTeam}
                onCancel={handleCancel}
            >
                <Form layout='vertical'>
                    <Form.Item label='Team Name'>
                        <Input
                            placeholder="Team name"
                            value={teamName}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}