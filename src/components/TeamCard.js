import React from 'react'
import { Card, Col, Row } from 'antd';

export default function TeamCard(props) {
    const { team } = props

    const renderPokemon = () => {
        return team.pokemon.forEach(poke => {
            return <Card>
               
            </Card>
        })
    }

    return (
        <div className={`team-card-${team.id}`} style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Card title" bordered={false}>
                        Card content
                    </Card>
                </Col>
            </Row>
        </div>
    )
}