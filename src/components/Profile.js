import React from 'react'
import { Button } from 'antd'
import "antd/dist/antd.css";

export default function Profile(props) {

    const addTeam = () => {
        
    }

    return (
        <React.Fragment>
            <p>No Teams currently made</p>

            <Button icon="plus-circle" onClick={() => addTeam()} > Add Team </Button>
        </React.Fragment>
    )
}