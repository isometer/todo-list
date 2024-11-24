// src/CreateSection.tsx
import React, { useState } from "react";
import axiosInstance from "./axiosInstance";

const CreateSection: React.FC = () => {
  const [sectionTitle, setSectionTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/sections", { title: sectionTitle });
      console.log("Created section:", response.data);
    } catch (error) {
      console.error("Error creating section:", error);
    }
  };

  return (
    <div>
      <h2>Create a New Section</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          placeholder="Section Title"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateSection;
