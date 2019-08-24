import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List } from 'antd'
import PokemonCard from '../components/PokemonCard'


export default function PokemonContainer() {
    const [allPokemon, setAllPokemon] = useState([])

    useEffect(() => {
        async function fetchPokemon() {
            const result = await axios.get(`http://localhost:3000/pokemon`)
            setAllPokemon(result.data)
        }

        fetchPokemon()
    }, [])

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
                    xxl: 7,
                  }}
                  dataSource={allPokemon}
                  renderItem={item => (
                    <List.Item>
                        <PokemonCard {...item} />
                    </List.Item>
                  )}
            />
        </React.Fragment>
    )
}