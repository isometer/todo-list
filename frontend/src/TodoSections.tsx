// src/TodoSections.tsx
import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";

const TodoSections: React.FC = () => {
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axiosInstance.get("/sections");
        setSections(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchSections();
  }, []);

  return (
    <div>
      <h2>Todo Sections</h2>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            {section.title}
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoSections;
