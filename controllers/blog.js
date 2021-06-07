/** @format */

const Blog = require("../models/blog");
const User = require("../models/user");
const slugify = require("slugify");

exports.create = (req, res) => {
  console.log(req.body);
  const slug = slugify(req.body.title).toLowerCase();
  req.body.slug = slug;
  const blog = new Blog(req.body);

  blog.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

exports.list = (req, res) => {
  Blog.find({})
    .populate("writer", "name role")
    .select("_id title body approvedbyAdmin slug  createdAt updatedAt")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};
exports.ApproveBloglist = (req, res) => {
  Blog.find({ approvedbyAdmin: true })
    .populate("writer", "name role")
    .select("_id title slug body createdAt updatedAt")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug })
    .populate("writer", "name role")
    .select("_id title body slug role createdAt updatedAt ")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.blogbyUsers = (req, res) => {
  const _id = req.params.userId;
  console.log(_id);
  Blog.find({ writer: _id })
    .populate("writer", "name role")
    .select("_id title body slug role createdAt updatedAt ")
    .exec((err, data) => {
      if (err) {
        return res.json({
          err,
        });
      }
      res.json(data);
    });
};

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOneAndRemove({ slug }).exec((err, approvedelete) => {
    if (err || !approvedelete) {
      return res.status(400).json({
        err,
      });
    }
    res.json({
      message: "delete successfully",
    });
  });
};

exports.approveBlogs = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug }).exec((err, oldStory) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    oldStory.approvedbyAdmin = req.body.approvedbyAdmin;

    oldStory.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      // result.photo = undefined;
      res.json(result);
    });
  });
};

exports.update = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug }).exec((err, oldStory) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    oldStory.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      res.json(result);
    });
  });
};
