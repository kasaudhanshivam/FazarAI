import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    name: String,
    path: String,
    keywords: {
        type: [String],
        default: [],
    }
},{_id: false})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    assistantName: {
        type: String,
        default: "Fazar AI"
    },
    bussinessName: {
        type: String,
        default: ""
    },
    bussinessType: {
        type: String,
        default: ""
    },
    bussinessDescription: {
        type: String,
        default: ""
    },
    tone: {
        type: String,
        enum: ["friendly", "professional", "sales"],
        default: "friendly"
    },
    theme: {
        type: String,
        enum: [
            "dark",
            "light",
            "glass",
            "midnight",
            "ocean",
            "aurora",
            "sunset",
            "cyber",
            "emerald",
            "rose",
            "royal",
            "ice",
            "monochrome",
            "cherry",
            "lavender",
            "neon",
            "amethyst"
        ],
        default: "dark"
    },
    enableVoice: {
        type: Boolean,
        default: true
    },
    pages: {
        type: [pageSchema],
        default: []
    },
    enableNavigation: {
        type: Boolean,
        default: true
    },
    geminiApiKey: {
        type: String,
        default: ""
    },
    geminiStatus: {
        type: String,
        enum: ["active", "invalid", "quota_exceeded"],
        default: "active"
    },
    totalMessages: {
        type: Number,
        default: 0
    },
    plan: {
        type: String,
        enum: ["free", "pro"],
        default: "free"
    },
    requestLimits: {
        type: Number,
        default: 200
    },
    proExpiresAt: {
        type: Date,
        default: null
    },
    isSetupComplete: {
        type: Boolean,
        default: false
    }

},
{timestamps : true})

const User = mongoose.model("User", userSchema)

export default User