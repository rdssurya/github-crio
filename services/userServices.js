const User = require("../models/User");

const fetchUser = async(username) => {
    try {
        const isAlreadyExists = await User.findOne({login: username});
        if (!isAlreadyExists) {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const userDetails = await response.json();
            if (!userDetails || !userDetails.login) {
                throw new Error("User details are invalid or missing.");
            }
            const user = new User(userDetails);
            user.username = username;
            await user.save();
            return userDetails;
        } else {
            isAlreadyExists.isDeleted = false;
            await isAlreadyExists.save();
            return isAlreadyExists;
        }
    } catch (error) {
        throw error;
    }
};

const getMutuals = async (username) => {
    try {
        const user = await User.findOne({login: username});
        if(!user){
            throw new Error("User not found.");
        }
        const followersUrl = user.followers_url;
        const followingUrl = user.following_url;
        const responseOne = await fetch(followersUrl);
        const responseTwo = await fetch(followingUrl.slice(0, followingUrl.length - 13));
        const followers = await responseOne.json();
        const following = await responseTwo.json();
        const mutuals = [];
        for(let i=0;i<followers.length;i++){
            for(let j=0;j<following.length;j++){
                if(followers[i].login === following[j].login){
                    mutuals.push(followers[i]);
                    break;
                }
            }
        }
        return mutuals;
    } catch (error) {
        throw error;
    }
};


const updateUser = async (username, details) => {
    try {
        const user = await User.findOne({login: username});
        if(!user){
            throw new Error("User not found.");
        }
        for(let key of Object.keys(details)){
            user[key] = details[key];
        } 
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};


const deleteUser = async (username) => {
    try {
        const user = await User.findOne({login: username});
        if(!user){
            throw new Error("User not found.");
        }
        user.isDeleted = true;
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

const searchUsers = async (query) => {
    try {
        const users = await User.find(query);
        return users;
    } catch (error) {
        throw error;
    }
};

const sortUsers = async(query) => {
    try {
        const sortingField = Object.keys(query)[0];
        const sortCriteria = {};
        sortCriteria[sortingField] = 1;
        const users = await User.find().sort(sortCriteria);
        users.sort();
        return users;
    } catch (error) {
        throw error;
    }
};

module.exports = {fetchUser, deleteUser, getMutuals, updateUser, searchUsers, sortUsers};