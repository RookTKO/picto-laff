import React, {useState} from 'react'

export default function Block({blockData, onClick}){
    //console.log('block', blockData)
    const [count, setCount] = useState(0)
    //setCount(count+1)
    console.log('I have re-rendered', count)
    return(
        <div style={{
            width: '100%',
            backgroundColor: blockData.color,
            color: 'black',
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
            onClick = {onClick}
        > {blockData.y} {blockData.x}</div>
    )
}