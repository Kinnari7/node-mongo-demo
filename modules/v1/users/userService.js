const userService = {};
const Modals = require("../../../models");

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
  const records = await Modals.Users.find({}, { email: 1, name: 1 })
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
  return await Modals.Users.create(data);
};

userService.authUser = (data) => {
  return Modals.Users.findOne(data, { name: 1, email: 1, _id: 1 }).lean();
};

userService.editUsersList = (id, data) => {
  return Modals.Users.updateOne({ _id: id }, data);
};

userService.deleteUsersList = (id, data) => {
  return Modals.Users.deleteOne({ _id: id });
};

userService.getProductsList = () => {
  const pipeline = [
    { $match: { available: "yes" } },
    {
      $group: {
        _id: "$brand",
        total: { $sum: "$price" },
      },
    },
    {
      $sort: { total: -1 },
    },
  ];
  return Modals.Products.aggregate(pipeline, {});
};

module.exports = userService;
