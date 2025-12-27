import React, { useState } from 'react'

const ToggleTheme = () => {

    const[theme, setTheme] = useState("light");

    const btnClick = () => {
        if(theme === "light"){
            setTheme("dark")
        }else{
            setTheme("light");
        }
    };

  return (
    <div style={{
        backgroundColor: theme === "light" ? "#ffffff" : "#000",
        color: theme === "light" ? "#000000" : "#ffffff",
        padding: "20px"
    }}>
        <button onClick={btnClick}>Toggle Theme</button>
    </div>
  )
}

export default ToggleTheme