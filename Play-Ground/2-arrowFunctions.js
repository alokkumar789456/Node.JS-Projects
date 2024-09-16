const tasks = {
    tasks: [
        {
            text: "shopping",
            completed: true
        },
        {
            text: "workout",
            completed: true
        },
        {
            text: "reading",
            completed: false
        },
        {
            text: "playing",
            completed: false
        }
    ],
    getTasksToDo() {
        return this.tasks.filter(task => !task.completed);
    }
};

console.log(tasks.getTasksToDo());
