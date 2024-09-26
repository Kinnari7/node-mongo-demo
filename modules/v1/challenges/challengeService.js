const challengeService = {};
const Modals = require("../../../models");

challengeService.getChallengesList = async () => {
  return await Modals.Hikes.aggregate([
    {
      $lookup: {
        from: "colorgradients",
        localField: "_id",
        foreignField: "hike_id",
        as: "colorGradient"
      }
    }
  ]);
};

challengeService.addChallenge = async (req) => {
  return await Modals.Hikes.create(req);
};

challengeService.addChallengeColor = async (id, data) => {
  return await Modals.ColorGradients.findOneAndUpdate(
    {
      hike_id: id,
    },
    {
      color: data?.color
    },
    {
      new: true,
      upsert: true
    });
};

challengeService.getGuestChallengeList = async (data) => {
  return await Modals.GuestUsers.findOne({ deviceId: data?.deviceId });
};

module.exports = challengeService;
