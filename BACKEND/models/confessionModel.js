import mongoose from "mongoose";

const confessionSchema = mongoose.Schema({
    user: {
        type : String,
        required: true
    },
    confession: {
        type: String,
        required: true
    }
})
const confessionModel = mongoose.model("confession", confessionSchema);
export default confessionModel;