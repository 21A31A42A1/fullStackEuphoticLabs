import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose"
import {dish} from "./models/dishModel.js";
import cors from "cors";
const app = express();

//Middleware for parsing request as json data
app.use(express.json());

//Middleware for handling cors
// we allow only specific origins to access our server rather than all
/*app.use(cors({
    origin : 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

})
);*/
app.use(cors())
app.get('/',(request,response) =>{
    console.log(request);
    return response.status(200).send('Welcome')
})

app.post('/dishes', async (request, response) => {
    try {
        // Check if request body contains an array of dishes
        if (!Array.isArray(request.body) || request.body.length === 0) {
            return response.status(400).send({
                message: "Request body must be a non-empty array of dishes.",
            });
        }

        for (const dish of request.body) {
            if (!dish.dishName || !dish.imageUrl || !dish.isPublished || !dish.dishId) {
                return response.status(400).send({
                    message: "All required fields are mandatory for each dish.",
                });
            }
        }

        const dishes = await dish.insertMany(request.body);
        return response.status(200).send(dishes);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
app.get('/dishes', async(request, response) => {
    try {
        const dishes = await dish.find({});
        return response.status(200).json(dishes);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
        
    }
});
app.get('/dishes/:id', async(request, response) => {
    try {
        const {id} = request.params;
        const dishes = await dish.findById(id);
        return response.status(200).send(json(dishes));
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
        
    }
});

//To update isPublished value accordingly
app.put('/dishes/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const result = await dish.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).json({message: "Dish not found"});
        }
        return res.status(200).send({message: "Dish published status is updated successfully"});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});


//To delete a dish
app.delete('/dishes/:id', async(request, response) => {
    try {
        const {id} = request.params;
        const result = await dish.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message: "Dish not found"});
        }
        return result.status(200).send({message: "Dish is deleted successfully"});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
        
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() =>{
        console.log('App is connected to db')
        app.listen(PORT, () =>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });