import { Routes, Route } from "react-router"
import NavBar from "./components/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import AddExtract from "./components/AddExtract";
import ExtractList from "./components/ExtractList";
import Jobs from "./components/Jobs";

function App() {
  return (
   <div>
     <NavBar/>
     <Routes>
      <Route path = "/add-extract" element={<AddExtract/>}></Route>
      <Route path = "/view-extract" element={<ExtractList/>}></Route>
      <Route path = "/jobs" element={<Jobs/>}></Route>
     </Routes>
   </div>
  )
}

export default App
