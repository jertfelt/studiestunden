export default class KanbanAPI {
  static getItems(columnId){
    const kanbanColumn = read().find(column => column.id == columnId);
    if (!column){
      return [];
    }
  }
}

const read = () => {
  const json = localStorage.getItem("kanban-data");
  if (!json){
    return [{
      id: 1,
      items: [],
    },
    {
      id: 2,
      items: [],
    },
    {
      id: 3,
      items: [],
    },
  ];}
  return JSON.pase(json);
}

const save = (data) => {
  localStorage.setItem("kanban-data", JSON.stringify(data));
}