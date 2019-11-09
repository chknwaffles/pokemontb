import React from 'react'
import { Button, Input } from 'antd'

import homePicture from '../images/starter_battle_cuts___kanto_by_amastroph-d35ujst.png'

const { Search } = Input
const ButtonGroup = Button.Group

export default function Home(props) {
    const { history } = props

    const handleSearch = (s) => {
        
    }

    return (
        <React.Fragment>
            <h2>Pokemon Team Builder</h2>
            <Search
                placeholder='Search Pokemon'
                onSearch={s => handleSearch(s)}
                style={{ width: 400 }}
            />
            <br /><br />
            <ButtonGroup>
                <Button type='primary' onClick={() => history.push('/login')} > Login </Button>
                <Button type='primary' onClick={() => history.push('/signup')} > Sign Up </Button>
            </ButtonGroup>
            <br /><br />
            <img src={homePicture} alt='homepage'/>
        </React.Fragment>
    )
}