import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Section } from "./Section";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    completed: boolean;

    @ManyToOne(() => Section, (section) => section.items)
    section: Section;
}
