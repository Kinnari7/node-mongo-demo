const userService = {};
const Modals = require("../../../models");
const crypto = require('crypto');

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

userService.addUserLocation = (reqData, userId) => {
  return Modals.UserLocations.findOneAndUpdate(
    {
      user_id: userId,
    },
    {
      latitude: reqData?.signUpLoc?.latitude,
      longitude: reqData?.signUpLoc?.longitude
    },
    {
      new: true,   // Return the updated document
      upsert: true // If no document matches, create a new one (optional)
    }
  );
};

userService.addUserPreference = (reqData, userId) => {
  return Modals.UserPreferences.findOneAndUpdate(
    { user_id: userId },
    {
      $set: {
        inAppNotification: reqData?.inAppNotification || false,
        notificationToMyPost: reqData?.notificationToMyPost || false,
        optOutCommunication: reqData?.optOutCommunication || false,
        language: reqData?.language || 'English'
      }
    },
    {
      new: true,
      upsert: true
    }
  );
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
