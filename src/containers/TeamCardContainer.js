import React, { useState } from 'react'
import { Card, Col, Row } from 'antd'

const gridStyle = {
    width: '25%',
    textAlign: 'center',
}

export default function TeamCardContainer(props) {
    const { team, allPokemon, addToTeam } = props
    const [showSearch, setSearch] = useState(false)

    const renderPokemon = () => {
        if (team.pokemons == null) {
            return <Card type='inner' hoverable={true} onClick={() => searchPokemon()}>
                Coming soon! Add a pokemon!
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