import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <>
      <header className="app-header">
        <div className="container">
          <h1 className="header-title">천개의 레시피</h1>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<DetailPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
