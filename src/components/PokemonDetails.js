import React from 'react'
import { Button } from 'antd'
import { ResponsiveRadar } from '@nivo/radar'
import '../stylesheets/Details.css'
// https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png 
// 475 x 475 image

export default function PokemonDetails(props) {
    const { currentPokemon, setPage } = props

    const imageUrl = () => {
        let pokedexEntry = currentPokemon.pokedex_entry
        if (pokedexEntry < 100) {
            pokedexEntry = pokedexEntry.toString()
            for(let i = pokedexEntry.length; i < 3; i++) {
                pokedexEntry = '0' + pokedexEntry
            }
        }
        
        return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokedexEntry}.png`
    }

    console.log(currentPokemon)

    const formatStats = () => {
        let stats = currentPokemon.stats.map(stat => {
            let newStat = JSON.parse(stat)
            let name = newStat[':name']
            let value = newStat[':stat']

            return { [name]: value }
        })
        return stats
    }

    return (
        <div className='details-container'>
            <div className='img-container'>
                <img src={imageUrl()} alt={currentPokemon.name} />
            </div>
            <div className='stats-container'>
                Radar graph here
                <ResponsiveRadar 
                    data={formatStats()}
                    dotSize={10}
                    dotBorderWidth={2}
                    dotBorderColor={{ from: 'color' }}
                    fillOpacity={0.8}
                />
            </div>
            <div>
                More information about the pokemon here
            </div>
            <div>
                Pokemon moveset information here
            </div>
            <Button type='primary' onClick={() => setPage('home')} > Back </Button>
        </div>
    )
}