import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu } from 'antd'

const { SubMenu } = Menu

export default function NavBar(props) {
    const { currentUser, logout } = props
    const history = useHistory()

    const handleRoute = (dest) => {
        switch(dest) {
            case 'home':
                history.push('/')
                break;
            case 'db':
                history.push('/db')
                break;
            case 'login':
                history.push('/login')
                break;
            case 'signup':
                history.push('/signup')
                break;
            case 'profile':
                history.push('/profile')
                break;
            case 'logout':
                history.push('/')
                logout()
                break;
            default:
                break;
        }
        
    }

    return (
        <React.Fragment>
            <Menu theme='dark' inlineIndent={0} mode='horizontal'>
                <Menu.Item key='Home' onClick={() => handleRoute('home')}>
                    Home
                </Menu.Item>
                <Menu.Item key='Database' onClick={() => handleRoute('db')}>
                    Database
                </Menu.Item>

                <SubMenu title={<span className="submenu-title-wrapper">Settings</span>}>
                    <Menu.ItemGroup key='themeButton'>
                        <Menu.Item key={(currentUser) ? 'Profile' : 'Sign up' } onClick={() => handleRoute((currentUser) ? 'profile' : 'signup')}>
                            {currentUser ? 'Profile' : 'Sign up'}
                        </Menu.Item>
                        <Menu.Item key={(currentUser) ? 'Logout' : 'Login'} onClick={() => handleRoute((currentUser) ? 'logout' : 'login')}>
                            {currentUser ? 'Logout' : 'Login'}
                        </Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>

            </Menu>
        </React.Fragment>
    )
}