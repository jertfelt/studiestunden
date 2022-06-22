class KanbanAPI {
  
  static insertItem(columnId, content) {
    const data = read();
    const kanbanColumn = data.find(column => column.id == columnId);
    const item = {
      id: Math.floor(Math.random() * 100000),
      content
    };
    if (!kanbanColumn){
      throw new Error("Column does not exist");
    }
    kanbanColumn.items.push(item);
    save(data);
  }
  static getItems(columnId){
    const kanbanColumn = read().find(column => column.id == columnId);
    if (!kanbanColumn){
      return [];
    }
  }

  static updateItem(itemId, newProps){
    const data = read();
    const [item, currentColumn] = (() => {
			for (const column of data) {
				const item = kanbanColumn.items.find(item => item.id == itemId);

				if (item) {
					return [item, column];
				}
			}
		})();
  }

}
const Kanban = new KanbanAPI();


const save = (data) => {
  localStorage.setItem("kanban-data", JSON.stringify(data));
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

