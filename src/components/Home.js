import React from 'react'
import { Button, Input } from 'antd'

import homePicture from '../images/starter_battle_cuts___kanto_by_amastroph-d35ujst.png'
import cut1 from '../images/battlecut1.jpg'
import cut2 from '../images/battlecut2.png'
import hometext from '../images/hometext2.png'

const { Search } = Input
const ButtonGroup = Button.Group

export default function Home(props) {
    const { history } = props

    const handleSearch = (s) => {

    }

    return (
        <React.Fragment>
            <img src={hometext} alt='hometext'/>
            <br/>
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
            <img style={{ width: 850, height: 400 }} src={cut2} alt='cut2'/>
            <img style={{ width: 850, height: 400 }} src={cut1} alt='cut1'/>
        </React.Fragment>
    )
}