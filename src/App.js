import React, { useState } from 'react'
import { Layout } from 'antd'
import PokemonContainer from './containers/PokemonContainer'
import PokemonDetails from './components/PokemonDetails';
import NavBar from './components/NavBar'
import Login from './components/Login'
import './App.css'
import "antd/dist/antd.css";

const { Header, Footer, Content } = Layout

function App() {
    const [currentPage, setCurrentPage] = useState('home')
    const [currentPokemon, setCurrentPokemon] = useState()

    const renderPage = () => {
        switch(currentPage) {
            case 'home': 
                return <PokemonContainer setPage={setPage} setPokemon={setPokemon} />
            case 'login':
                return <Login setCurrentPage={setCurrentPage} />
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
                    <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
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
