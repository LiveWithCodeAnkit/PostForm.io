const fs = require("fs");
const path = require("path");
const baseUrl = "";
exports.removeFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path.join(baseUrl, fileName), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(fileName);
      }
    });
  });
};

exports.getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

exports.getPaginationData = (data, page, limit) => {
  const { count: totalItems, docs } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: docs,
    ...(limit
      ? { pagination: { totalItems, totalPages, currentPage, pageSize: limit } }
      : {}),
  };
};

exports.getCount = async (Model, condition = null) => {
  if (condition) {
    return await Model.countDocuments(condition);
  }
  return await Model.estimatedDocumentCount();
};

exports.generateRandomString = (length = 12, options = {}) => {
  var generateOptions = options;

  var digits = "0123456789";
  var alphabets = "abcdefghijklmnopqrstuvwxyz";
  var upperCase = alphabets.toUpperCase();
  var specialChars = "!#$%^&*_-?";

  generateOptions.digits = generateOptions.hasOwnProperty("digits")
    ? options.digits
    : true;
  generateOptions.alphabets = generateOptions.hasOwnProperty("alphabets")
    ? options.alphabets
    : true;
  generateOptions.upperCase = generateOptions.hasOwnProperty("upperCase")
    ? options.upperCase
    : true;
  generateOptions.specialChars = generateOptions.hasOwnProperty("specialChars")
    ? options.specialChars
    : false;

  var allowsChars =
    ((generateOptions.digits || "") && digits) +
    ((generateOptions.alphabets || "") && alphabets) +
    ((generateOptions.upperCase || "") && upperCase) +
    ((generateOptions.specialChars || "") && specialChars);
  const randomNumber = (min, max) => {
    var random = Math.random();
    return Math.floor(random * (max - min) + min);
  };
  var output = "";
  for (var index = 0; index < length; ++index) {
    var charIndex = randomNumber(0, allowsChars.length - 1);
    output += allowsChars[charIndex];
  }
  return output;
};
