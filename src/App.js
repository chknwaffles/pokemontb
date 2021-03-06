import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'
import { Layout } from 'antd'

import PokemonContainer from './containers/PokemonContainer'
import DetailsPage from './containers/DetailsContainer'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Login from './components/Login'
import ProfilePage from './containers/ProfileContainer'

import './App.css'
import "antd/dist/antd.css"

const { Header, Footer, Content } = Layout

function App() {
    const [allPokemon, setAllPokemon] = useState([])
    const [currentPokemon, setCurrentPokemon] = useState()
    const [currentUser, setCurrentUser] = useState(null)
    const match = useRouteMatch()

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
          .then(res => {
                if (res.errors)    {
                    localStorage.removeItem("user_id")
                    alert(res.errors)
                } else {
                    setCurrentUser(res)
                    console.log(res)
                }
            })
        }
    }, [])

    const logout = () => {
        setCurrentUser(null)
        localStorage.removeItem('token')
    }

    const setPokemon = (pokeObj) => setCurrentPokemon(pokeObj)

    const addToTeam = (team, poke) => {
        // used for showing a search bar to find a pokemon
        fetch(`http://localhost:3000/${currentUser.id}/team/${team}/add/${poke}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ team_id: team, poke_id: poke })
        })
        .then(res => res.json())
        .then(res => {
            if (res.errors) {
                alert(res.errors)
            } else {
                setCurrentUser(res)
            }
        })
    }

    return (
        <Router >
            <div className="App">
                <Layout>
                    <Header>
                        <NavBar currentUser={currentUser} logout={logout} />
                    </Header>
                    <Content>
                        <Switch>
                            <Route path='/db'>
                                <PokemonContainer allPokemon={allPokemon} setPokemon={setPokemon} currentUser={currentUser} addToTeam={addToTeam} />
                            </Route>
                            <Route path='/login'>
                                <Login signup={false} />
                            </Route>
                            <Route path='/signup'>
                                <Login signup={true} />
                            </Route>
                            <Route path='/profile'>
                                <ProfilePage currentUser={currentUser} setCurrentUser={setCurrentUser} allPokemon={allPokemon} addToTeam={addToTeam} />
                            </Route>
                            <Route path={`${match.path}poke/:pokemonId`}>
                                <DetailsPage currentPokemon={currentPokemon} />
                            </Route>
                            <Route path='/'>
                                <Home currentUser={currentUser} allPokemon={allPokemon} />
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
