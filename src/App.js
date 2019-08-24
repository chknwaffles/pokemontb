import React from 'react'
import { Layout } from 'antd'
import PokemonContainer from './containers/PokemonContainer'
import NavBar from './components/NavBar'
import './App.css'
import "antd/dist/antd.css";

const { Header, Footer, Content } = Layout

function App() {
    return (
        <div className="App">
            <Layout>
                <Header><NavBar /></Header>
                <Content>
                    <PokemonContainer />
                </Content>
                <Footer> Powered by PokeApi.co! </Footer>
            </Layout>
        </div>
    );
}

export default App;
