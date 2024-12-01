const userService = {};
const Modals = require("../../../models");
const crypto = require('crypto');
const { size } = require('lodash');

userService.getUsersList = async (reqData) => {
  // const pipeline = [
  //   {
  //     $match: { password: "123" },
  //   },
  //   {
  //     $lookup: {
  //       from: "products",
  //       localField: "products",
  //       foreignField: "_id",
  //       as: "productData",
  //     },
  //   },
  //   {
  //     $unwind: { path: "$productData", preserveNullAndEmptyArrays: true },
  //   },
  //   {
  //     $project: {
  //       name: 1,
  //       email: 1,
  //       "productData.product": 1,
  //     },
  //   },
  // ];

  let page = Number(reqData.page);
  let perPage = Number(reqData.perPage);

  if (!page) page = 1;
  if (!perPage) perPage = 2;
  const skipData = (page - 1) * perPage;
  const totalRecord = await Modals.Users.countDocuments();
  const records = await Modals.Users.find({})
    .skip(skipData)
    .limit(perPage);
  const totalPages = Math.ceil(totalRecord / perPage);
  const response = {
    totalRecord,
    page,
    records,
    totalPages,
  };
  return response;
};

userService.addUsersList = async (data) => {
  const token = crypto.randomBytes(12).toString('hex');
  data.verificationToken = token;
  return await Modals.Users.create(data);
};

userService.addUserLocation = async (reqData, userId) => {
  let userLocation = await Modals.UserLocations.findOne({ user_id: userId });
  if (size(userLocation) < 0) {
    // Use create to ensure the auto-increment works
    userLocation = await Modals.UserLocations.create({
      user_id: userId,
      latitude: reqData?.signUpLoc?.latitude,
      longitude: reqData?.signUpLoc?.longitude
    });
  }

  return userLocation;
};

userService.addUserPreference = async (reqData, userId) => {
  let userPreferences = await Modals.UserPreferences.findOne({ user_id: userId });
  if (size(userPreferences) > 0) {
    // If the document exists, update the necessary fields
    userPreferences.inAppNotification = reqData?.inAppNotification || false;
    userPreferences.notificationToMyPost = reqData?.notificationToMyPost || false;
    userPreferences.optOutCommunication = reqData?.optOutCommunication || false;
    userPreferences.language = reqData?.language || 'English';
    // Save the updated document
    await userPreferences.save();
  } else {
    // If the document does not exist, create it to trigger the auto-increment functionality
    userPreferences = await Modals.UserPreferences.create({
      user_id: userId,
      inAppNotification: reqData?.inAppNotification || false,
      notificationToMyPost: reqData?.notificationToMyPost || false,
      optOutCommunication: reqData?.optOutCommunication || false,
      language: reqData?.language || 'English'
    });
  }

  return userPreferences;
};

userService.authUser = (data) => {
  return Modals.Users.findOne({ email: data.email, password: data.password }).lean();
};

userService.addGuestUser = (data) => {
  data.lastLoginDate = new Date();
  return Modals.GuestUsers.create(data);
};

userService.verifyEmail = (data) => {
  return Modals.Users.findOneAndUpdate({ verificationToken: data.token }, {
    isVerified: true
  }, { new: true, lean: true }).lean();
};

module.exports = userService;
