const express = require('express');
const router = express.Router();
const Task = require('../models/task');

//all tasks
router.get('/',async (req,res) => {
    const tasks = await Task.find();
    res.render('index',{
        tasks
    })
});
//add task
router.post('/add', async(req,res) => {
    const newTask = new Task(req.body);
    console.log(newTask)
    await newTask.save();
    res.redirect('/')
});
//edit task
router.get('/edit/:id', async (req,res) => {
    const {id} = req.params;
    const task = await Task.findById(id);
    res.render('edit',{
        task
    })
});
router.post('/edit/:id', async(req,res) => {
    const {id} = req.params;
    await Task.updateOne({_id:id}, req.body);
    res. redirect('/')
});
router.get('/delete/:id', async(req,res) => {
    const {id} = req.params;
    await Task.deleteOne({_id:id});
    res.redirect('/')
});
router.get('/status/:id', async(req,res) => {
    const {id} = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/')
});


module.exports= router;