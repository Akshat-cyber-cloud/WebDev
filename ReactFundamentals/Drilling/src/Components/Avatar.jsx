import React from 'react'

const Avatar = ({ name, isPremium, avatarUrl }) => {

    if (isPremium === 'true') {
        console.log("Premium");
    }
    return (
        <div>
            <h1> Hello {name}</h1>
            <img
                src={avatarUrl}
                alt={name}
                style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: isPremium ? '3px solid gold' : '3px solid transparent'
                }}
            />

        </div>
    )
}

export default Avatar;