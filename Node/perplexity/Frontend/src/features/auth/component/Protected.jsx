import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { Globe } from 'lucide-react'

const Protected = ({children}) => {
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    if(loading){
        return (
            <div className="layout" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="dots"><span /><span /><span /></div>
            </div>
        )
    }

    if(!user){
        return <Navigate to="/login" replace />
    }

    return children;
}

export default Protected