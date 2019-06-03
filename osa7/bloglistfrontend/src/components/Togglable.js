import React, { useState, useImperativeHandle } from 'react'
import styled from 'styled-components'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const Button = styled.button`
  background: #035a73;
  padding: 10px;
  border: 1px solid #035a73;
  color: white;
`

  const CancelButton = styled.button`
  background: white;
  padding: 10px;
  border: 1px solid #fe3761;
  color: #fe3761;
`

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return(
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonText}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <CancelButton onClick={toggleVisibility}>Peruuta</CancelButton>
      </div>
    </div>
  )
})

export default Togglable
