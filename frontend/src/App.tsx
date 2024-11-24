import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoSections from "./TodoSections";
import CreateSection from "./CreateSection";
import SectionItems from "./SectionItems";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Todo List</h1>
        <Routes>
          <Route path="/" element={<CreateSection />} />
          <Route path="/sections" element={<TodoSections />} />
          <Route path="/sections/:id/items" element={<SectionItems />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
