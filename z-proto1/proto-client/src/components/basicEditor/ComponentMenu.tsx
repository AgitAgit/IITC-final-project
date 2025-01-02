import React, { ReactNode } from 'react'


const componentMenuItemStyle = {
    width:"8rem",
    height:"4rem",
    border:"3px solid green"
}

function ComponentMenuItem({component}){
    
    return(
        <div
        style={componentMenuItemStyle}>
            {component}
        </div>
    )
}

function ComponentMenu() {
    const components = [

    ]
  return (
    <div>

    </div>
  )
}

export default ComponentMenu