import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Sidebar from "./components/Sidebar";
import View1 from "../pages/View1";
import View2 from "../pages/View2";
function App() {
  return (
    <>
      <Router>
        <div>
          <Sidebar />
          <div className="ml-96 lg:p-6 max-md:ml-0 max-lg:p-4 max-md:mt-16 ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/view1" element={<View1 />} />
              <Route path="/view2" element={<View2 />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
