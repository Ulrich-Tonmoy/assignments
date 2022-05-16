import Navbar from "./components/Navbar";
import Home from "./page/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsDetails from "./page/NewsDetails";

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <hr className="border" />
                <Routes>
                    <Route path="/prothom-alo/" element={<Home />} />
                    <Route path="/prothom-alo/news/:id" element={<NewsDetails />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
