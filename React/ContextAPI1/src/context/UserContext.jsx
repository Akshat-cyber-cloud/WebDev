import React, {createContext} from 'react'

export const UserContextData = createContext();

const UserContext = (props) => {

    const user = 'Akshat';

    return (
        <UserContextData.Provider value={user}>
            {props.children}
        </UserContextData.Provider>
    )
}

export default UserContext;