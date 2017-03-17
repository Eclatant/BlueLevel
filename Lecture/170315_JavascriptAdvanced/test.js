function ToDoList() {}

ToDoList.prototype = {
  list: [],
  addTask: function(task) {
    this.list.push(task);
  },
  completeTask: function(task) {
    this.list.splice(this.list.indexOf(task), 1);
  },
  showAllTask: function() {
    return this.list;
  }
};

const manager = new ToDoList();
manager.addTask("공부");
manager.addTask("휴식");
manager.completeTask("휴식");
console.log(manager.showAllTask());