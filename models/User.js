const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true
        },
        username:{
            type: String,
            unique: false,
            default: null
        },
        id:{
            type: Number,
            unique: true,
            required: true
        },
        avatar:{
            type: String,
        },
        type:{
            type: String,
            default:"User"
        },
        email: {
            type: String,
        },
        company: {
            type: String,
        },
        blog: {
            type: String,
        },
        location: {
            type: String,
        },
        bio: {
            type: String,
        },
        public_repos: {
            type: Number,
        },
        followers: {
            type: Number,
        },
        following: {
            type: Number,
        },
        isDeleted:{
            type: Boolean,
            default: false
        },
        followers_url:{
            type: String
        },
        following_url:{
            type: String
        },
        createdAt:{
            type: String
        },
        updatedAt:{
            type: String
        }
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;