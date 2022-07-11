import asyncHandler from "express-async-handler";
import Todo from "../models/todoModel.js";

export const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find();
    res.status(200).json(todos);
});

export const setTodo = asyncHandler(async (req, res) => {
    console.log(req.body);
    if(!req.body || !req.body.text) {
        res.status(400);
        throw new Error("Please add text field.");
    }

    const todo = await Todo.create({
        text: req.body.text
    });
    res.status(200).json(todo);
});

export const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if(!todo) {
        res.status(400);
        throw new Error("Todo not found");
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedTodo);
});

export const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if(!todo) {
        res.status(400);
        throw new Error("Todo not found"); 
    }
    await todo.remove();
    res.status(200).json({ id: req.params.id });
});