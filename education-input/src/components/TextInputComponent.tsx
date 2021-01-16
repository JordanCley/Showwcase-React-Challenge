import React from 'react'

export interface Props {
    textInstructions: string
}
 
const TextInputComponent : React.SFC<Props> = ({ textInstructions }) => {
    return ( <>
        <p>{textInstructions}</p>
        <input type="text"/>
    </> );
}
 
export default TextInputComponent;