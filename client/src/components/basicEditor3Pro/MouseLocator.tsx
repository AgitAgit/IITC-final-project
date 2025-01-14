import React, { useState } from 'react'
import { Position } from './BasicEditor3ProTypes'

function MouseLocator() {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

    return (
        <div
            style={{
                border:'3px solid purple',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh'
            }}
            onMouseMove={(e) => { setPosition({ x: e.clientX, y: e.clientY }) }}
        >
            MouseLocator
            {`(x,y) : (${position.x},${position.y})`}
        </div>
    )
}

export default MouseLocator