import mongoose from "mongoose";

export default async function connect(){
await mongoose.connect("mongodb+srv://riddhybansal:admin123@quiz.fzxypcf.mongodb.net/?retryWrites=true&w=majority")
}