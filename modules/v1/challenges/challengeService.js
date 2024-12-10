const challengeService = {};
const Modals = require("../../../models");
const { size } = require('lodash');
const { ObjectId } = require('mongodb');

challengeService.getChallengesList = async () => {
  return await Modals.Hikes.aggregate([
    {
      $addFields: {
        colorGradient: "$color"
      }
    },
    {
      $unset: "color"
    }
  ]);
};

challengeService.addChallenge = async (req) => {
  return await Modals.Hikes.create(req);
};

challengeService.editChallengeByAdmin = async (data) => {
  return await Modals.Hikes.findOneAndUpdate(
    { _id: ObjectId(data._id)}, 
    { $set: {...data} }, 
    { new: true, lean: true }
  ).lean();
};

challengeService.getGuestChallengeList = async (data) => {
  return await Modals.GuestUsers.findOne({ deviceId: data?.deviceId });
};

challengeService.getChallenge = async (data) => {
  return await Modals.Hikes.aggregate([
    {
      $match: { _id: ObjectId(data.id) }
    },
    {
      $addFields: {
        colorGradient: "$color"
      }
    }
  ]);
};

challengeService.findHike = async (data) => {
  const hikeDetail = await Modals.Hikes.aggregate([
    {
      $match: { _id: ObjectId(data.id) }
    },
    {
      $addFields: {
        colorGradient: "$color"
      }
    }
  ]);
  const userHike = await Modals.UserHike.findOne({
    _id: ObjectId(data.id),
    userId: ObjectId(data.userId)
  }).lean();
  return { ...hikeDetail[0], ...userHike };
};

challengeService.getLeaderBoardData = async (data) => {
  const response = await Modals.UserHike.aggregate([
    {
      $match: { hikeId: ObjectId(data.trailId) }
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails"
      }
    },
    {
      $project: {
        _id: 1,
        createdAt: 1,
        deviceId: { $arrayElemAt: ["$userDetails.deviceId", 0] },
        duration: 1,
        rank: 1,
        trailId: {
          $literal: data.trailId
        },
        updatedAt: 1,
        userId: 1,
        userName: { $arrayElemAt: ["$userDetails.name", 0] }
      }
    }
  ]);
  const sortedData = response.sort((a, b) => a.duration - b.duration);

  sortedData.forEach((item, index) => {
    item.rank = index + 1; // Rank starts from 1
  });
  return sortedData;
};

challengeService.updateChallenge = async (id, data) => {
  const userHike = await Modals.UserHike.findOneAndUpdate({
    _id: ObjectId(id),
  },
    { $set: data },
    { lean: true });
  const hikeDetail = await Modals.Hikes.findOne({ _id: ObjectId(data.trailId) }).lean();
  return { ...userHike, ...hikeDetail };
};

challengeService.deleteChallenge = async (data) => {
  const userHike = await Modals.UserHike.findOne({
    _id: ObjectId(data.hikeId),
    userId: ObjectId(data.userId)
  }).lean();
  if (!userHike) {
    throw new Error("UserHike not found or does not exist.");
  }

  await Modals.UserHike.deleteOne({ _id: ObjectId(data.hikeId), userId: ObjectId(data.userId) });
  const hikeDetail = await Modals.Hikes.findOne({ _id: ObjectId(data.hikeId) }).lean();
  return { ...userHike, ...hikeDetail };
};

challengeService.saveChallenge = async (data) => {
  const transformedData = {
    ...data,
    hikeId: ObjectId(data.trailId),
    userId: ObjectId(data.id)
  };
  delete transformedData.id;
  const userHike = await Modals.UserHike.create(transformedData);
  const hikeDetail = await Modals.Hikes.findOne({ _id: ObjectId(data.trailId) }).lean();
  return { ...hikeDetail, ...userHike.toObject() };
};

challengeService.fetchHikeList = async (data) => {
  return await Modals.UserHike.aggregate([
    {
      $match: { userId: ObjectId(data.userId) } 
    },
    {
      // Lookup for the corresponding Hike/Challenge details
      $lookup: {
        from: "hikes", // Assuming the Hikes collection stores the challenge data
        localField: "hikeId", // The trailId from UserHike
        foreignField: "_id", // The _id field in Hikes
        as: "challenge"
      }
    },
    {
      $addFields: {
        challenge: { $arrayElemAt: ["$challenge", 0]}
      }
    },
    {
      $project: {
        _id: 1,
        challenge: {
          _id: "$challenge._id",
          colorGradient:"$challenge.color",
          distance: "$challenge.distance",
          image: "$challenge.image",
          title: "$challenge.title",
          withRedemption: "$challenge.withRedemption"
        },
        challengeType: 1,
        completionPercentage: 1,
        createdAt: 1,
        currentDistance: 1,
        duration: 1,
        endTime: 1,
        isActive: 1,
        isCompleted: 1,
        rank: 1,
        startTime: 1,
        trailId: 1,
        updatedAt: 1,
        userId: 1
      }
    }
  ])
};

module.exports = challengeService;
