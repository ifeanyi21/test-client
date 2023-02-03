import {createContext, useReducer} from 'react'
import { AuthReducer } from '../reducers/AuthReducer';

const Auth = createContext()

const INITIAL_STATE = {
    loggedIn: false,
    user:null,
  };

export function LoggedInProvider({children}){

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return <Auth.Provider value={[state, dispatch]}>
        {children}
    </Auth.Provider>
}

export default Auth