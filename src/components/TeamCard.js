import React from 'react'
import { Card, Col, Row } from 'antd';

export default function TeamCard(props) {
    const { team } = props

    console.log(team)

    const renderTeam = () => {
        // team.forEach(t => {
        //     return (
        //         <Col span={8}>
        //             <Card title="Card title" bordered={false}>
        //                 Card content
        //             </Card>
        //         </Col>
        //     )
        // })
    }

    return (
        <div className={`team-card-${team.id}`} style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
                {renderTeam()}
                <Col span={8}>
                    <Card title="Card title" bordered={false}>
                        Card content
                    </Card>
                </Col>
            </Row>
        </div>
    )
}