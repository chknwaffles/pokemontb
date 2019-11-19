import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Input } from 'antd'

import cut1 from '../images/battlecut1.jpg'
import cut2 from '../images/battlecut2.png'
import hometext from '../images/hometext2.png'

const { Search } = Input
const ButtonGroup = Button.Group

export default function Home(props) {
    const { currentUser } = props
    const history = useHistory()

    const handleSearch = (s) => {

    }

    const renderLoginButtons = () => {
        if (currentUser == null) {
            return (
                <ButtonGroup>
                    <Button type='primary' onClick={() => history.push('/login')} > Login </Button>
                    <Button type='primary' onClick={() => history.push('/signup')} > Sign Up </Button>
                </ButtonGroup>
            )
        }
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

            {renderLoginButtons()}
            
            <br /><br />
            <img style={{ width: 850, height: 400 }} src={cut2} alt='cut2'/>
            <img style={{ width: 850, height: 400 }} src={cut1} alt='cut1'/>
        </React.Fragment>
    )
}