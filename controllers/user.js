/** @format */

const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.user = user;
    next();
  });
};

exports.read = (req, res) => {
  User.find({})
    .select("_id name email role createdAt updatedAt")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.approveforContentWriter = (req, res) => {
  console.log(req.body);
  const _id = req.params.userId;
  console.log(_id);

  User.findOne({ _id }).exec((err, approverole) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    console.log(approverole);

    approverole.role = req.body.role;
    approverole.save((err, result) => {
      if (err) {
        return res.status(400).json({
          err,
        });
      }
      // result.photo = undefined;
      res.json(result);
    });
  });
};

exports.deleteUser = (req, res) => {
  const _id = req.params.userId;
  console.log(_id);
  User.findOneAndRemove({ _id }).exec((err, approverole) => {
    if (err || !approverole) {
      return res.status(400).json({
        err,
      });
    }
    res.json({
      message: "delete successfully",
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }
    let user = req.profile;
    user = _.extend(user, fields);

    if (fields.password && fields.password.length < 6) {
      return res.status(400).json({
        error: "Password should be min 6 characters long",
      });
    }

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb",
        });
      }
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: "All filds required",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      user.photo = undefined;
      res.json(user);
    });
  });
};
