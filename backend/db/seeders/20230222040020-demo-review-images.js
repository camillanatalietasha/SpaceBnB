"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          reviewId: 1,
          imgUrl: "assets/review-images/spot1-review-image.png",
        },
        {
          reviewId: 2,
          imgUrl: "assets/review-images/spot2-review-image.png",
        },
        {
          reviewId: 3,
          imgUrl: "assets/review-images/spot3-review-image.png",
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        reviewId: {
          [Op.in]: [1, 2, 3],
        },
      },
      {}
    );
  },
};
