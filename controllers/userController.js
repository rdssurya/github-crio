const userService = require("../services/userServices");

const fetchUser = async (req, res) => {
    try{
        const {username} = req.params;
        const user = await userService.fetchUser(username);
        res.status(200).json({
            userDetails: user
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

const getMutuals = async (req, res) =>{
    try {
        const {username} = req.params;
        const mutuals = await userService.getMutuals(username);
        res.status(200).json(mutuals);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


const updateUser = async (req, res) => {
    try {
        const {username} = req.params;
        const details = req.body;
        const updatedUser = await userService.updateUser(username, details);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const {username} = req.params;
        const user = await userService.deleteUser(username);
        if(user){
            res.status(204).json({
                message: "User deleted successfully",
            })
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const searchUsers = async (req, res) => {
    try {
        const query = req.query;
        const users = await userService.searchUsers(query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const sortUsers = async (req, res) => {
    try {
        const query = req.query;
        const users = await userService.sortUsers(query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


module.exports = {fetchUser, deleteUser, getMutuals, updateUser, searchUsers, sortUsers};