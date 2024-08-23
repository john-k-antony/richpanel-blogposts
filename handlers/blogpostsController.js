const readBlogpostService = require('../services/readBlogpostService');

const getBlogpostById = async (req, res) => {
  let id = req.params.id;
  let blogPost = await readBlogpostService.getBlogpostById(id);
  res.status(200).send(blogPost);
};

module.exports = {
  createBlogpost: (req, res) => res.status(201).send({}),
  getBlogpostById,
  updateBlogpostById: (req, res) => res.status(200).send({}),
  deleteBlogpostById: (req, res) => res.status(200).send({}),
  listBlogposts: (req, res) => res.status(200).send([]),
};