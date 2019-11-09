import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import { Layout } from 'antd'

import PokemonContainer from './containers/PokemonContainer'
import PokemonDetails from './components/PokemonDetails'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Profile from './components/Profile'

import './App.css'
import "antd/dist/antd.css"

const { Header, Footer, Content } = Layout

function App() {
    const [allPokemon, setAllPokemon] = useState([])
    const [currentPokemon, setCurrentPokemon] = useState()
    const [currentUser, setCurrentUser] = useState(null)
    const match = useRouteMatch()
    const history = useHistory()

    useEffect(() => {
        fetch('http://localhost:3000/pokemon')
        .then(res => res.json())
        .then(res => {
            if (res.errors) {

            } else {
                setAllPokemon(res)
            }
        })
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
          fetch('http://localhost:3000/auto_login', {
            headers: {
              "Authorization": token
            }
          })
          .then(res => res.json())
          .then(response => {
                if (response.errors)    {
                    localStorage.removeItem("user_id")
                    alert(response.errors)
                } else {
                    setCurrentUser(response)
                    console.log(response)
                }
            })
        }
    }, [])

    const logout = () => {
        setCurrentUser(null)
        localStorage.removeItem('token')
    }

    const setPokemon = (pokeObj) => setCurrentPokemon(pokeObj)

    return (
        <Router>
            <div className="App">
                <Layout>
                    <Header>
                        <NavBar history={history} currentUser={currentUser} logout={logout} />
                    </Header>
                    <Content>
                        <Switch>
                            <Route path='/db'>
                                <PokemonContainer history={history} allPokemon={allPokemon} setPokemon={setPokemon} />
                            </Route>
                            <Route path='/login'>
                                <Login history={history} signup={false} />
                            </Route>
                            <Route path='/signup'>
                                <Login history={history} signup={true} />
                            </Route>
                            <Route path='/profile'>
                                <Profile history={history} currentUser={currentUser} />
                            </Route>
                            <Route path={`${match.path}poke/:pokemonId`}>
                                <PokemonDetails history={history} currentPokemon={currentPokemon} />
                            </Route>
                            <Route exact path='/'>
                                <Home history={history} />
                            </Route>
                        </Switch>
                    </Content>
                    <Footer> Powered by PokeApi.co! </Footer>
                </Layout>
            </div>
        </Router>
    );
}

export default App;
