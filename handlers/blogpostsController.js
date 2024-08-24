const createOrUpdateBlogpostService = require('../services/createOrUpdateBlogpostService');
const readBlogpostService = require('../services/readBlogpostService');
const deleteBlogpostService = require('../services/deleteBlogpostService');
const listBlogpostService = require('../services/listBlogpostService');

const LIST_TOTAL_SIZE_RESPONSE_HEADER_NAME = "Pagination-Count"
const LIST_CURRENT_LIMIT_RESPONSE_HEADER_NAME = "Pagination-Limit"

const createBlogpost = async (req, res) => {
  let payload = req.body;
  let blogPost = await createOrUpdateBlogpostService.createBlogpost(payload);
  res.status(201).send(blogPost);
};
const updateBlogpostById = async (req, res) => {
  let id = req.params.id;
  let payload = req.body;
  let blogPost = await createOrUpdateBlogpostService.updateBlogpost(id, payload);
  res.status(200).send(blogPost);
};
const getBlogpostById = async (req, res) => {
  let id = req.params.id;
  let blogPost = await readBlogpostService.getBlogpostById(id);
  res.status(200).send(blogPost);
};
const deleteBlogpostById = async (req, res) => {
  let id = req.params.id;
  let blogPost = await deleteBlogpostService.deleteBlogpostById(id);
  res.status(200).send(blogPost);
};
const listBlogposts = async (req, res) => {
  let offset = req.query.offset;
  let limit = req.query.limit;
  let blogPostsData = await listBlogpostService.listBlogposts(offset, limit);
  res.status(200)
  .header(LIST_TOTAL_SIZE_RESPONSE_HEADER_NAME, blogPostsData.size)
  .header(LIST_CURRENT_LIMIT_RESPONSE_HEADER_NAME, blogPostsData.data.length)
  .send(blogPostsData.data);
};

module.exports = {
  createBlogpost,
  getBlogpostById,
  updateBlogpostById,
  deleteBlogpostById,
  listBlogposts,
};