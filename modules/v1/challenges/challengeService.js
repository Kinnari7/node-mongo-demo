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

module.exports = challengeService;
