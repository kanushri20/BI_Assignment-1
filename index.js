const {initializeDatabase} = require("./db/db.connect")
const express = require("express")
const Meet = require("./models/meetup.models")
const app = express()
app.use(express.json())

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


async function createMeet(newMeet){
    try {
        const meet = new Meet(newMeet)
        const savedMeet = await meet.save()
        return savedMeet
    } catch (error) {
        throw error
    }
}

app.post("/meet", async(req, res) => {
    try {
        const meet = await createMeet(req.body)
        res.status(200).json({message: "Meetup added successfully.", meetup: meet})
    } catch (error) {
        res.status(500).json({error: "Failed to post meet."})
    }
})
initializeDatabase()


const readAll = async() => {
    try {
        const meet = await Meet.find()
        return meet
    } catch (error) {
        console.log(error)
    }
}

const searchById = async(meetId) => {
    try {
        const meet = await Meet.findById(meetId)
        return meet
    } catch (error) {
        throw error
    }
}

app.get("/meet/:id", async(req, res) => {
    try {
      const meet = await searchById(req.params.id)
      res.status(200).json({meetup: meet})  
    } catch (error) {   
        res.status(500).json({error: "Failed to fetch the meet."})
    }
})

app.get("/meet", async(req, res) => {
    try {
       const meet = await readAll()
       res.json(meet) 
    } catch (error) {
        res.status(500).json({error: "Failed to fetch the meets."})
    }
})

const deleteById = async(meetId) => {
    try {
        const meet = await Meet.findByIdAndDelete(meetId) 
        return meet
    } catch (error) {
        console.log(error)
    }
}

app.delete("/meet/:id", async(req, res) => {
    try {
        const meet = await deleteById(req.params.id)
        res.status(200).json({message: "Deleted meet successfully."})
    } catch (error) {
        res.status(500).json({error: "Failed to delete the meet."})
    }
})
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Server running on port: ", PORT)
})