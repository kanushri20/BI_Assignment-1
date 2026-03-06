const mongoose = require("mongoose")

const meetupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    speakers: [
    {
      name: {
        type: String,
        required: true
      },
      photo: {
        type: String
      },
      designation: {
        type: String
      },
      bio: {
        type: String
      }
    }
  ],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Online", "Offline"]
    },
    location: String,
    details: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    dressCode: String,
    ageRestriction: String,
    eventTags: [
        {type: String}
    ],
    backPhoto: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const Meet = mongoose.model("Meet", meetupSchema)
module.exports = Meet

