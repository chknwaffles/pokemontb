import React, { useState } from 'react'
import { Card, Col, Row } from 'antd'

const gridStyle = {
    width: '25%',
    textAlign: 'center',
}

export default function TeamCard(props) {
    const { team, currentUser, allPokemon } = props
    const [showSearch, setSearch] = useState(false)

    const renderPokemon = () => {
        if (team.pokemons == null) {
            return <Card type='inner' hoverable={true} onClick={() => searchPokemon()}>
                Add a pokemon!
            </Card>
        } else {
            return team.pokemons.forEach(poke => {
                return <Card.Grid style={gridStyle}>
                    {poke.name}
                </Card.Grid>
            })
        }
        
    }

    const searchPokemon = () => {
        console.log('yesy')
    }

    const addPokemon = (poke) => {
        // used for showing a search bar to find a pokemon
        fetch(`http://localhost:3000/${currentUser.id}/team/${team.id}/add/${poke.id}`, {
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
                
            }
        })
    }

    return (
        <div className={`team-card-${team.id}`} style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
                <Col span={8}>
                    <Card title={team.name} bordered={false} >
                        {renderPokemon()}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}