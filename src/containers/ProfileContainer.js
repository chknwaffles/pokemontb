import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Modal, Form, Input, Row } from 'antd'
import "antd/dist/antd.css"
import TeamCard from '../components/TeamCard'

const containerStyle = {
    width: '100%',
    display: 'flex'
}

export default function Profile(props) {
    const { currentUser, setCurrentUser, allPokemon, addToTeam } = props
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
        .then(res => res.json())
        .then(res => {
            if (res.errors) {
                alert(res.errors)
            } else {
                setModal(false)
                setCurrentUser(res)
            }
        }) 
    }

    const deleteFromTeam = (poke, team) => {
        fetch(`http://localhost:3000/${currentUser.id}/team/${team.id}/del/${poke.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ team_id: team.id, poke_id: poke.id })
        })
        .then(res => res.json())
        .then(res => {
            if (res.errors) {
                alert(res.errors)
            } else {
                setCurrentUser(res)
            }
        }) 
    }

    const renderTeams = () => {
        if (currentUser.teams.length > 0) {
            return currentUser.teams.map(team => {
                return (
                    <TeamCard key={team.id} team={team} addToTeam={addToTeam} deleteFromTeam={deleteFromTeam} />
                )
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
        <div className='profile-container' style={containerStyle}>
            <Row type='flex' justify='space-between' align='middle'>
                    {renderTeams()}
            </Row>

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