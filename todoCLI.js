const fs = require("fs");

const { Command } = require("commander");
const cmd = new Command();

let todo_list = [];
let ctr = todo_list.length;

function loadTasks() {
    try {
        const data = fs.readFileSync("todos.json", "utf8");
        todo_list = JSON.parse(data);
        ctr = todo_list.length;
    } catch (err) {
        console.log("No existing todo list found, starting fresh.");
    }
}

function saveTasks() {
    const json_data = JSON.stringify(todo_list, null, 4);
    fs.writeFileSync("todos.json", json_data, "utf-8");
}

function addTask(task) {
    todo_list.push({ id: ctr, _task: task, completed: false });
    ctr++;
    saveTasks();
    console.log("Task added to the list !");
}

function deleteTask(ind) {
    if (ind >= todo_list.length) {
        console.log("Task index is out of bound !");
    } else {
        todo_list.splice(ind, 1);
        saveTasks();
        console.log("Task deleted from the list !");
    }
}

function updateTask(ind, newTask) {
    if (ind >= todo_list.length) {
        console.log("Task index is out of bound !");
    } else {
        todo_list[ind]._task = newTask;
        saveTasks();
        console.log("Task updated in the list");
    }
}

function completeTask(ind) {
    if (ind >= todo_list.length) {
        console.log("Task index is out of bound !");
    } else {
        todo_list[ind].completed = true;
        saveTasks();
        console.log("Task marked as completed");
    }
}

cmd.name("todo").description("CLI to make a todo list").version("1.0.0");

cmd.command("todo")
    .description("maintaining a todo from CLI")
    .option("-a <task>  ", "to add a task in the list")
    .option("-d <taskId> ", "to delete a task from the list")
    .option("-u <taskId> ", "to update the task in the list")
    .option("-c <taskId> ", "to mark the task as completed")
    .option("-p ", "to print all the tasks")
    .action((options) => {
        loadTasks();
        if (options.a) {
            addTask(options.a);
        } else if (options.d) {
            deleteTask(parseInt(options.d));
        } else if (options.u) {
            const [ind, newTask] = options.u.split(" ");
            newTask = newTaskArr.join(" ");
            updateTask(parseInt(ind), newTask);
        } else if (options.c) {
            completeTask(parseInt(options.c));
        } else if (options.p) {
            console.log(todo_list);
        } else {
            console.log("No valid option provided");
        }
    });

cmd.parse(process.argv);
