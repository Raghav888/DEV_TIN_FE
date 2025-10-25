import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Body } from "./Body";
import { Login } from "./Login";
import { Profile } from "./Profile";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          {/*  to render login and profile components, we will need to have outlet
          in Body component */}
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
