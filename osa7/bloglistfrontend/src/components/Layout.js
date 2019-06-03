import React from 'react'
import NavigationMenu from './NavigationMenu'

const Layout = (props) => {

  return(
    <div>
      <NavigationMenu />
      <h2>Blogs</h2>
      {props.children}
    </div>
  )
}



export default Layout