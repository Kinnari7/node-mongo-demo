const challengeService = {};
const Modals = require("../../../models");
const { size } = require('lodash');

challengeService.getChallengesList = async () => {
  return await Modals.Hikes.aggregate([
    {
      $lookup: {
        from: "colorgradients",
        localField: "id",
        foreignField: "hike_id",
        as: "colorGradient"
      }
    },
    {
      $addFields: {
        colorGradient: {
          $map: {
            input: "$colorGradient",
            as: "gradient",
            in: "$$gradient.color"
          }
        }
      }
    }
  ]);
};

challengeService.addChallenge = async (req) => {
  return await Modals.Hikes.create(req);
};

challengeService.addChallengeColor = async (id, data) => {
  const colorGradient = await Modals.ColorGradients.findOne({ hike_id: id });

  if (size(colorGradient) > 0) {
    // Step 2: If it exists, update the color field
    await Modals.ColorGradients.updateOne(
      { hike_id: id },
      { $set: { color: data?.color } }
    );

    // Optional: Return updated color gradient
    return await Modals.ColorGradients.findOne({ hike_id: id });
  } else {
    // Step 3: If no record is found, create a new one
    const newColorGradient = await Modals.ColorGradients.create({
      hike_id: id,
      color: data?.color,
    });

    // Return newly created color gradient
    return newColorGradient;
  }
};

challengeService.getGuestChallengeList = async (data) => {
  return await Modals.GuestUsers.findOne({ deviceId: data?.deviceId });
};

challengeService.getChallenge = async (data) => {
  return await Modals.Hikes.aggregate([
    {
      $match: { id: data.id } // Filter to find the specific hike
    },
    {
      $lookup: {
        from: "colorgradients",
        localField: "id",
        foreignField: "hike_id",
        as: "colorGradient"
      }
    },
    {
      $addFields: {
        colorGradient: {
          $map: {
            input: "$colorGradient",
            as: "gradient",
            in: "$$gradient.color"
          }
        }
      }
    }
  ]);
};

challengeService.getLeaderBoardData = async (data) => {
  return await Modals.UserHike.aggregate([
    {
      $match: { hikeId: data.trailId }
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "id",
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
        trailId: 1,
        updatedAt: 1,
        userId: 1,
        userName: { $arrayElemAt: ["$userDetails.name", 0] } 
      }
    }
  ]);
};

challengeService.getColorGradientForLB = async (data) => {
  return await Modals.ColorGradients.find({ hike_id: data.trailId })
}

challengeService.updateChallenge = async (req) => {
  const userHike = await Modals.UserHike.updateOne({
    id: req.id
  }, {
    $set: req.data
  });
  const details = await Modals.UserHike.aggregate([
    {
      $match: { userId: userId } // Filter by userId
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "id",
        as: "userDetails"
      }
    },
    {
      $lookup: {
        from: "hikes",
        localField: "hikeId",
        foreignField: "id",
        as: "trailDetails"
      }
    },
    {
      $match: { "hikeId": hikeId }
    },
    {
      $project: {
        userDetails: 1,
        trailDetails: 1,
        "*": 1
      }
    }
  ]);
  return {...userHike, ...details};
}

challengeService.deleteChallenge = async (data) => {
  await Modals.Hikes.deleteOne({ id: data.hikeId });
};

module.exports = challengeService;
