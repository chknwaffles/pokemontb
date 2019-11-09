import React, { useState, useEffect } from 'react'
import { List } from 'antd'
import PokemonCard from '../components/PokemonCard'


export default function PokemonContainer(props) {
    const { history, allPokemon, setPokemon } = props
    
    const handlePokemonDetails = (pokeObj) => {
        setPokemon(pokeObj)
        console.log(pokeObj)
        history.push(`/poke/${pokeObj.id}`)
    }

    return (
        <React.Fragment>
            <List
                bordered={true}
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 8,
                }}
                dataSource={allPokemon}
                renderItem={item => (
                    <List.Item key={item.id} >
                        <PokemonCard {...item} handlePokemonDetails={handlePokemonDetails} />
                    </List.Item>
                )}
            />
        </React.Fragment>
    )
}