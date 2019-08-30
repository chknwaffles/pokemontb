import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List } from 'antd'
import PokemonCard from '../components/PokemonCard'
import PokemonDetails from '../components/PokemonDetails';


export default function PokemonContainer() {
    const [allPokemon, setAllPokemon] = useState([])
    const [currentPage, setCurrentPage] = useState('home')
    const [currentPokemon, setCurrentPokemon] = useState()

    useEffect(() => {
        async function fetchPokemon() {
            const result = await axios.get(`http://localhost:3000/pokemon`)
            setAllPokemon(result.data)
        }

        fetchPokemon()
    }, [])

    const handlePokemonDetails = (pokeObj) => {
        setCurrentPage('details')
        setCurrentPokemon(pokeObj)
    }

    const setPage = (page) => setCurrentPage(page)

    const renderPage = () => {
        switch(currentPage) {
            case 'home': return (
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
            )
        
            case 'details': return (
                <PokemonDetails currentPokemon={currentPokemon} setPage={setPage} />
            )

            default: break;
        }
    }

    return (
        <React.Fragment>
            {renderPage()}
        </React.Fragment>
    )
}