import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Table } from 'antd'
import RadarChart from 'react-svg-radar-chart';

import 'react-svg-radar-chart/build/css/index.css'
import '../stylesheets/Details.css'
// https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png 
// 475 x 475 image

export default function PokemonDetails(props) {
    const { history, currentPokemon } = props

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

    const formatStats = () => {
        let data = []
        let dataset = { attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 }
        currentPokemon.stats.map(stat => {
            let newStat = JSON.parse(stat)
            let name = Object.keys(newStat).toString()
            let value = +Object.values(newStat).toString() / 200
            dataset[name] = value
            return { [name]: value }
        })
        // change stats array to obj hash
        data.push({ "data": dataset, meta: { color: 'blue' }})
        return data
    }

    const radarKeys = {
        attack: 'Attack',
        defense: 'Defense',
        specialAttack: 'Special Attack',
        specialDefense: 'Special Defense',
        speed: 'Speed'
    }

    const formatMovesets = () => {
        let data = []
        currentPokemon.moveset.map((move, i) => {
            let newMove = JSON.parse(move)
            let moveName = Object.keys(newMove).toString()
            let level = Object.values(newMove).toString()

            let formattedMove = moveName.split('-').map(w => {
                return w.charAt(0).toUpperCase() + w.slice(1)
            }).join(' ')

            data.push({ key: `${i}`, name: formattedMove, level: level })
            return { key: `${i}`, name: moveName, level: level }
        })
        return data
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level'
        }
    ]

    if (currentPokemon == null)
        return <Redirect to='/' />

    return (
        <div className='details-container'>
            <div className='img-container'>
                <img src={imageUrl()} alt={currentPokemon.name} />
            </div>
            <div className='stats-container'>
                <RadarChart
                    captions={radarKeys}
                    data={formatStats()}
                    size={300}
                />
            </div>
            <div className='moveset-container'>
                <Table dataSource={formatMovesets()} columns={columns} />
            </div>
            <Button type='primary' onClick={() => history.push('/db')} > Back </Button>
        </div>
    )
}