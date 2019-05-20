import React from 'react'


const Filter = ({value, onChange}) => {
 return(
    <div>
        <p>rajaa näytettäviä:</p> 
        <input 
        value={value} 
        onChange={onChange}
        />
    </div>
 )
}

export default Filter