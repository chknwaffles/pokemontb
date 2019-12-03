import React from 'react'
import { Card, Col, Icon, Popconfirm, message } from 'antd'

const gridStyle = {
    width: '25%',
    height: '100%',
    textAlign: 'center',
}

const cardStyle = {
    width: '75%'
}

export default function TeamCard(props) {
    const { team, addToTeam, deleteFromTeam } = props

    const confirm = (e, poke) => {
        deleteFromTeam(poke, team)
    }

    const cancel = (e) => {
        
    }

    const renderPokemon = () => {
        if (team.pokemons.length < 1) {
            return (
                <Card.Grid type='inner' onClick={() => searchPokemon()}>
                    Coming soon! Add a pokemon!
                </Card.Grid>
            )
        } else {
            return team.pokemons.map(poke => {
                return (
                    <Card 
                        style={gridStyle} 
                        cover={<img alt={poke.name} src={poke.sprites[0]} />}
                        actions={[
                            <Popconfirm 
                                title='Are you sure you want to remove this pokemon from your team?'
                                onConfirm={(e) => confirm(e, poke)}
                                onCancel={cancel}
                                okText='Yes'
                                cancelText='No'
                            >
                                <Icon type='close-circle' type='close-circle' />
                            </Popconfirm>
                        ]}
                    >
                        <Card.Meta title={poke.name} />
                    </Card>
                )
            })
        }
        
    }

    const searchPokemon = () => {

    }
    console.log(team)

    return (
        <Col xs={2} sm={4} md={6} lg={8} xl={10} xxl={14}>
            <div className={`team-card-${team.id}`} style={{ background: '#ECECEC', padding: '30px', display: 'flex' }}>
                <Card title={team.name} style={cardStyle} bodyStyle={{ display: 'flex', height: '75%' }} >
                    {renderPokemon()}
                </Card>
            </div>
        </Col>
    )
}