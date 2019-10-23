import React from 'react'
import { Menu } from 'antd'

const { SubMenu } = Menu

export default function NavBar(props) {
    const { setCurrentPage, currentUser, logout } = props
    const handlePage = (page) => setCurrentPage(page)

    const handleLogin = () => {
        //logging out
        if (currentUser) {
            setCurrentPage('home')
            logout()
        } else {
            // loggin in
            setCurrentPage('login')
        }
    }

    return (
        <React.Fragment>
            <Menu theme='dark' inlineIndent={0} mode='horizontal'>
                <Menu.Item key='Home' onClick={() => handlePage('home')}>
                    Home
                </Menu.Item>
                <Menu.Item key='Database' onClick={() => handlePage('database')}>
                    Database
                </Menu.Item>

                

                <SubMenu title={<span className="submenu-title-wrapper">Settings</span>}>
                    <Menu.ItemGroup key='themeButton'>
                        <Menu.Item key={(currentUser) ? 'Profile' : 'Sign up' } onClick={() => handlePage((currentUser) ? 'profile' : 'signup')}>
                            {currentUser ? 'Profile' : 'Sign up'}
                        </Menu.Item>
                        <Menu.Item key={(currentUser) ? 'Logout' : 'Login'} onClick={() => handleLogin()}>
                            {currentUser ? 'Logout' : 'Login'}
                        </Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>

            </Menu>
        </React.Fragment>
    )
}