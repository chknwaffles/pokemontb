import React from 'react'
import { useHistory } from 'react-router-dom'
import { List } from 'antd'
import CardContainer from './CardContainer'

export default function PokemonContainer(props) {
    const { allPokemon, setPokemon, teams } = props
    const history = useHistory()

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
                        <CardContainer {...item} handlePokemonDetails={handlePokemonDetails} teams={teams} />
                    </List.Item>
                )}
            />
        </React.Fragment>
    )
}