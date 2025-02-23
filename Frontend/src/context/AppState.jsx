import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'

export default function AppState(props) {

    const [login,setLogin] = useState(false);

  return (
    <AppContext.Provider value={{login,setLogin}}>
        {props.children}
    </AppContext.Provider>
  )
}
