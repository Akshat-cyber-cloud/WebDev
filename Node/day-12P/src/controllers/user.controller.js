const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function followUserController(req, res) {
    const followerUsername = req.user.username;
    const followingUsername = req.params.username;
    status = "pending";

    if(followerUsername === followingUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isFollowingUserExist = await userModel.findOne({
        username: followingUsername
    })

    if(!isFollowingUserExist) {
        return res.status(404).json({
            message: "The user you are trying to follow does not exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        following: followingUsername,
        status: { $in: ["pending", "accepted"] }
    })

    if(isAlreadyFollowing) {
        return res.status(409).json({
            message: "You are already following this user"
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        following: followingUsername
    })

    res.status(201).json({
        message: `You are now following ${followingUsername}`,
        follow: followRecord
    })
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username;
    const followingUsername = req.params.username; 

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        following: followingUsername
    })

    if(!isUserFollowing) {
        return res.status(404).json({
            message: "You are not following this user"
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message: `You have unfollowed ${followingUsername}`
    })
}

async function acceptFollowRequestController(req, res) {
    const followingUsername = req.user.username;
    const followerUsername = req.params.username;

    const followRequest = await followModel.findOne({
        follower: followerUsername,
        following: followingUsername,
        status: "pending"
    })

    if(!followRequest) {
        return res.status(404).json({
            message: "Follow request not found"
        })
    }

    await followModel.findByIdAndUpdate(followRequest._id, { status: "accepted" });

    res.status(200).json({
        message: `You have accepted the follow request from ${followerUsername}`
    })
}

async function rejectFollowRequestController(req, res) {
    const followingUsername = req.user.username;
    const followerUsername = req.params.username;

    const followRequest = await followModel.findOne({
        follower: followerUsername,
        following: followingUsername,
        status: "pending"
    })

    if(!followRequest) {
        return res.status(404).json({
            message: "Follow request not found"
        })
    }

    await followModel.findByIdAndUpdate(followRequest._id, { status: "rejected" });

    res.status(200).json({
        message: `You have rejected the follow request from ${followerUsername}`
    })
}

module.exports = {
    followUserController,
    unfollowUserController,
    acceptFollowRequestController,
    rejectFollowRequestController
};