import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd'

export default function Login(props) {
    const { signup } = props
    const [fields, setFields] = useState({user: '', password: ''})
    const history = useHistory()

    const handleChange = (e) => setFields({...fields, [e.target.id]: e.target.value})

    const handleSubmit = (e) => {
        e.preventDefault()

        const URL = (signup) ? 'signup' : 'login'
        fetch(`http://localhost:3000/${URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                alert(data.errors)
            } else {
                localStorage.setItem("token", data.token)
                history.push('/profile')
            }
        }) 
    }

    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    id='user'
                    value={fields.user}
                    onChange={(e) => handleChange(e)}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    id='password'
                    placeholder="Password"
                    value={fields.password}
                    onChange={(e) => handleChange(e)}
                />
            </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            {signup ? "Sign up" : "Log In"}
          </Button>
        </Form.Item>
      </Form>
    )
}