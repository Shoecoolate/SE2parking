// React router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import { HomePage } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
