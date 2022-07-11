import asyncHandler from "express-async-handler";

export const getTodos = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get all Todos"});
});

export const setTodo = asyncHandler(async (req, res) => {
    console.log(req.body);
    if(!req.body || !req.body.text) {
        res.status(400);
        throw new Error("Please add text field.");
    }
    res.status(200).json({ message: "Set Todo"});
});

export const updateTodo = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Todo ${req.params.id}`});
});

export const deleteTodo = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Todo ${req.params.id}`});
});