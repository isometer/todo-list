import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Section } from "../entity/Section";
import { Item } from "../entity/Item";

// Define repository for Section and Item entities
const sectionRepository = AppDataSource.getRepository(Section);
const itemRepository = AppDataSource.getRepository(Item);

export class TodoController {
  // CREATE new section
  static createSection = async (req: Request, res: Response) => {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Section title is required" });
    }

    try {
      const section = new Section();
      section.title = title;
      await sectionRepository.save(section);
      res.status(201).json(section);
    } catch (error) {
      res.status(500).json({ message: "Error creating section", error });
    }
  };

  // GET all sections
  static getSections = async (req: Request, res: Response) => {
    try {
      const sections = await sectionRepository.find();
      res.status(200).json(sections);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving sections", error });
    }
  };

  // GET a section by ID
  static getSectionById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const section = await sectionRepository.findOneBy({ id: parseInt(id) });

      if (!section) {
        return res.status(404).json({ message: "Section not found" });
      }

      res.status(200).json(section);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving section", error });
    }
  };

  // UPDATE section by ID
  static updateSection = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
      const section = await sectionRepository.findOneBy({ id: parseInt(id) });

      if (!section) {
        return res.status(404).json({ message: "Section not found" });
      }

      section.title = title || section.title;
      await sectionRepository.save(section);
      res.status(200).json(section);
    } catch (error) {
      res.status(500).json({ message: "Error updating section", error });
    }
  };

  // DELETE section by ID
  static deleteSection = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const section = await sectionRepository.findOneBy({ id: parseInt(id) });

      if (!section) {
        return res.status(404).json({ message: "Section not found" });
      }

      await sectionRepository.remove(section);
      res.status(200).json({ message: "Section deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting section", error });
    }
  };

  // GET items for a specific section
  static getItemsForSection = async (req: Request, res: Response) => {
    const { sectionId } = req.params;

    try {
      const section = await sectionRepository.findOne({
        where: { id: parseInt(sectionId) },
        relations: ["items"],
      });

      if (!section) {
        return res.status(404).json({ message: "Section not found" });
      }

      res.status(200).json(section.items);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving items", error });
    }
  };

  // CREATE item under a specific section
  static createItem = async (req: Request, res: Response) => {
    const { sectionId } = req.params;
    const { content, completed } = req.body;

    try {
      const section = await sectionRepository.findOne({
        where: { id: parseInt(sectionId) },
      });

      if (!section) {
        return res.status(404).json({ message: "Section not found" });
      }

      const item = new Item();
      item.content = content;
      item.completed = completed || false;
      item.section = section;
      await itemRepository.save(item);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: "Error creating item", error });
    }
  };

  // UPDATE item by ID
  static updateItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content, completed } = req.body;

    try {
      const item = await itemRepository.findOneBy({ id: parseInt(id) });

      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      item.content = content || item.content;
      item.completed = completed !== undefined ? completed : item.completed;
      await itemRepository.save(item);
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: "Error updating item", error });
    }
  };

  // DELETE item by ID
  static deleteItem = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const item = await itemRepository.findOneBy({ id: parseInt(id) });

      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      await itemRepository.remove(item);
      res.status(200).json({ message: "Item deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting item", error });
    }
  };
}
