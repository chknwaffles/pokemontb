import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import PokemonContainer from './containers/PokemonContainer'
import PokemonDetails from './components/PokemonDetails';
import NavBar from './components/NavBar'
import Login from './components/Login'
import Profile from './components/Profile'

import homePicture from './images/starter_battle_cuts___kanto_by_amastroph-d35ujst.png'
import './App.css'
import "antd/dist/antd.css";

const { Header, Footer, Content } = Layout

function App() {
    const [currentPage, setCurrentPage] = useState('home')
    const [currentPokemon, setCurrentPokemon] = useState()
    const [currentUser, setCurrentUser] = useState(null)

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

    const renderPage = () => {
        switch(currentPage) {
            case 'home':
                return (
                    <React.Fragment>
                        <h2>Pokemon Team Builder</h2>
                        <img src={homePicture} />
                    </React.Fragment>
                )
            case 'database': 
                return <PokemonContainer setPage={setPage} setPokemon={setPokemon} />
            case 'login':
                return <Login signup={false} setCurrentPage={setCurrentPage} />
            case 'signup':
                return <Login signup={true} setCurrentPage={setCurrentPage} />
            case 'profile':
                return <Profile currentUser={currentUser} setCurrentPage={setCurrentPage} setCurrentUser={setCurrentUser} />
            case 'details': 
                return <PokemonDetails currentPokemon={currentPokemon} setPage={setPage} />
            default:
                return
        }
    }

    const setPage = (page) => setCurrentPage(page)

    const setPokemon = (pokeObj) => setCurrentPokemon(pokeObj)

    return (
        <div className="App">
            <Layout>
                <Header>
                    <NavBar setCurrentPage={setCurrentPage} currentUser={currentUser} logout={logout} />
                </Header>
                <Content>
                    {renderPage()}
                </Content>
                <Footer> Powered by PokeApi.co! </Footer>
            </Layout>
        </div>
    );
}

export default App;
