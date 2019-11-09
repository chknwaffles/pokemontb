import React from 'react'
import { Menu } from 'antd'

const { SubMenu } = Menu

export default function NavBar(props) {
    const { history, currentUser, logout } = props

    const handleLogin = () => {
        //logging out
        if (currentUser) {
            history.push('/')
            logout()
        } else {
            // loggin in
            history.push('/login')
        }
    }

    return (
        <React.Fragment>
            <Menu theme='dark' inlineIndent={0} mode='horizontal'>
                <Menu.Item key='Home' onClick={() => history.push('/')}>
                    Home
                </Menu.Item>
                <Menu.Item key='Database' onClick={() => history.push('/db')}>
                    Database
                </Menu.Item>

                <SubMenu title={<span className="submenu-title-wrapper">Settings</span>}>
                    <Menu.ItemGroup key='themeButton'>
                        <Menu.Item key={(currentUser) ? 'Profile' : 'Sign up' } onClick={() => history.push((currentUser) ? '/profile' : '/signup')}>
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