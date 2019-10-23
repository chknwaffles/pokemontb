import React from 'react'
import { Menu } from 'antd'

const { SubMenu } = Menu

export default function NavBar({ currentPage, setCurrentPage }) {

    const handlePage = (page) => setCurrentPage(page)

    return (
        <React.Fragment>
            <Menu theme='dark' inlineIndent={0} mode='horizontal'>
                <Menu.Item key='Home' onClick={() => handlePage('home')}>
                    Home
                </Menu.Item>
                <Menu.Item key='Database' onClick={() => handlePage('database')}>
                    Database
                </Menu.Item>
                <Menu.Item key='Login' onClick={() => handlePage('login')}>
                    Login
                </Menu.Item>
                <SubMenu title={<span className="submenu-title-wrapper">Settings</span>}>
                    <Menu.ItemGroup key='themeButton'>
                        <Menu.Item>Switch Theme</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>

            </Menu>
        </React.Fragment>
    )
}