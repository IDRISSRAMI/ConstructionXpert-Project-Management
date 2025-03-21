import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import AddProject from "./pages/AddProject";
import AddTask from "./pages/AddTask";
import EditProject from "./pages/EditProject";
import EditResource from "./pages/EditResource";
import EditTask from "./pages/EditTask";
import ResourcesList from "./pages/ResourcesList";
import Tasks from "./pages/Tasks";
import AddResource from "./pages/AddResource";
import About from "./pages/About"; // Import the About page

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects/add" element={<AddProject />} />
        <Route path="/tasks/add" element={<AddTask />} />
        <Route path="/projects/edit/:id" element={<EditProject />} />
        <Route path="/resources/edit/:id" element={<EditResource />} />
        <Route path="/tasks/edit/:id" element={<EditTask />} />
        <Route path="/resources" element={<ResourcesList />} />
        <Route path="/resources/add" element={<AddResource />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;