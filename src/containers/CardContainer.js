import React, { useState } from 'react'
import { Card, Descriptions, Tag, Button, Modal } from 'antd'
import "antd/dist/antd.css";

const imageStyle = {
    height: '96px',
    width: '96px',
    margin: '0 auto',
    cursor: 'pointer'
}

export default function CardContainer(props) {
    const { pokedex_entry, name, height, weight, types, sprites, handlePokemonDetails, teams } = props
    const [image, setImage] = useState(sprites[0])
    const [modal, showModal] = useState(false)

    const handleSprite = () => {
        if (image === sprites[0])
            setImage(sprites[1])
        else
            setImage(sprites[0])
    }

    const formatName = () => `#${pokedex_entry} ` + name.charAt(0).toUpperCase() + name.slice(1, name.length)
    
    const getColorFromType = (typeName) => {
        switch(typeName) {
            case 'poison': return '#A040A0'
            case 'fire': return '#F08030'
            case 'water': return '#6890F0'
            case 'ice': return '#98D8D8'
            case 'electric': return '#F8D030'
            case 'grass': return '#78C850'
            case 'flying': return '#CCCCFF'
            case 'bug': return '#97C01F'
            case 'normal': return '#A8A878'
            case 'fighting': return '#C03028'
            case 'dragon': return '#7038F8'
            case 'rock': return '#B8A038'
            case 'ground': return '#E0C068'
            case 'fairy': return '#EE99AC'
            case 'psychic': return '#F85888'
            case 'steel': return '#B8B8D0'
            case 'ghost': return '#705898'
            default: return 'black'
        }
    }

    const renderTypeBadges = () => {
        const resultTypes = types.map(type => JSON.parse(type))

        return resultTypes.map(type => {
            let typeName = Object.keys(type).toString()
            return <Tag color={getColorFromType(typeName)}> {typeName} </Tag>
        })
    }

    const showTeams = () => {
        // loop to return all teams on each card
    }

    return (
        <div className='card-container'>
            <Card
                style={{ width: '225px', height: '280px' }}
                cover={<img style={imageStyle} alt={name} src={image} onClick={() => handleSprite()}/>}
            > 
                <Descriptions title={formatName()} border size='small'>
                    <Descriptions.Item label='Type'> {renderTypeBadges()} </Descriptions.Item>
                    <Descriptions.Item label='Height'> {height} </Descriptions.Item>
                    <Descriptions.Item label='Weight'> {weight} </Descriptions.Item>  
                </Descriptions>

                <Button type="primary" onClick={() => handlePokemonDetails(props)}>Details</Button>
                <Button icon="plus-circle" onClick={() => showModal(true)} />
            </Card>
            <Modal
            title='Which team would you like to add this pokemon to?'
            visible={modal}
            onOk={addTeam}
            onCancel={handleCancel}
            >
                {showTeams()}
            </Modal>

        </div>
    )
}