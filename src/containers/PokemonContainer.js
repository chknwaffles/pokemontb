import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List } from 'antd'
import PokemonCard from '../components/PokemonCard'


export default function PokemonContainer({ setPage, setPokemon }) {
    const [allPokemon, setAllPokemon] = useState([])

    useEffect(() => {
        async function fetchPokemon() {
            const result = await axios.get(`http://localhost:3000/pokemon`)
            setAllPokemon(result.data)
        }

        fetchPokemon()
    }, [])

    const handlePokemonDetails = (pokeObj) => {
        setPage('details')
        setPokemon(pokeObj)
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