import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const SectionItems: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Access the sectionId from the URL
  const sectionId = parseInt(id || "0", 10); // Convert to a number, default to 0 if not found
  const [items, setItems] = useState<any[]>([]);
  const [itemContent, setItemContent] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get(`/sections/${sectionId}/items`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    if (sectionId) fetchItems();
  }, [sectionId]);

  const handleItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/sections/${sectionId}/items`, {
        content: itemContent,
      });
      setItems([...items, response.data]);
      setItemContent(""); // Clear the input after submitting
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div>
      <h3>Items for Section {sectionId}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.content} - {item.completed ? "Completed" : "Not completed"}
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleItemSubmit}>
        <input
          type="text"
          value={itemContent}
          onChange={(e) => setItemContent(e.target.value)}
          placeholder="Item Content"
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default SectionItems;
