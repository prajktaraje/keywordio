import Layout from "./pages/Layout";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import LoginReg from "./pages/auth/LoginReg";
import StudentView from "./pages/StudentView";
import BookEditDelete from "./pages/BookEditDelete";
import UpdateBook from "./pages/UpdateBook";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LoginReg/>} />
        <Route path="home" element={<Home/>}/>
        <Route path="student" element={<StudentView/>}/>
        <Route path="editdelete" element={<BookEditDelete/>}/>
        <Route path="updatebook" element={<UpdateBook/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
    </>
  
  );
}

export default App;
