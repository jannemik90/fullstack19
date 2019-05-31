import React from 'react'
import NavigationMenu from './NavigationMenu'

const Layout = (props) => {

  if( props.user === null){
    return null
  }



  return(
    <div>
      <NavigationMenu />
      <h2>Blogs</h2>
      {props.children}
    </div>
  )
}



export default Layout