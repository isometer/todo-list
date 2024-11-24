import { TodoController } from "./controller/TodoController";

export const Routes = [
  {
    method: "get",
    route: "/sections",
    controller: TodoController,
    action: "getSections",
  },
  {
    method: "get",
    route: "/sections/:id",
    controller: TodoController,
    action: "getSectionById",
  },
  {
    method: "post",
    route: "/sections",
    controller: TodoController,
    action: "createSection",
  },
  {
    method: "put",
    route: "/sections/:id",
    controller: TodoController,
    action: "updateSection",
  },
  {
    method: "delete",
    route: "/sections/:id",
    controller: TodoController,
    action: "deleteSection",
  },
  {
    method: "get",
    route: "/sections/:sectionId/items",
    controller: TodoController,
    action: "getItemsForSection",
  },
  {
    method: "post",
    route: "/sections/:sectionId/items",
    controller: TodoController,
    action: "createItem",
  },
  {
    method: "put",
    route: "/items/:id",
    controller: TodoController,
    action: "updateItem",
  },
  {
    method: "delete",
    route: "/items/:id",
    controller: TodoController,
    action: "deleteItem",
  },
];
