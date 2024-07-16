import mongoose from "mongoose"
const dishSchema = mongoose.Schema({
    dishId:{
        type: Number,
        required: true,
        unique: true,
    },
    dishName:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    },
    isPublished:{
        type: Boolean,
        required: true,
    },
},
{
    timestamps: true,
}
);
//creating model from schema
export const dish = mongoose.model('dish', dishSchema);
