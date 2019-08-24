import React from 'react'
import { Menu } from 'antd'

const { SubMenu } = Menu

export default function NavBar() {

    const handleClick = () => {

    }

    return (
        <React.Fragment>
            <Menu theme='dark' style={{ lineHeight: '64px' }} onClick={handleClick()} mode='horizontal'>
                <Menu.Item key='Home'>
                    Home
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