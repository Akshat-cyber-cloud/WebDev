import {Route, Routes} from "react-router-dom"
import Home from "../pages/Home"
import Recipies from "../pages/Recipes"
import About from "../pages/About"
import CreateRecipes from "../pages/CreateRecipes"

const Mainroutes = () => {
  return (
    <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/recipes" element= {<Recipies />} />
        <Route path="/about" element= {<About />} />
        <Route path="/create" element= {<CreateRecipes />} />
    </Routes>
  )
}

export default Mainroutes