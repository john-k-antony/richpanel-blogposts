const createOrUpdateBlogpostService = require('../services/createOrUpdateBlogpostService');
const readBlogpostService = require('../services/readBlogpostService');
const deleteBlogpostService = require('../services/deleteBlogpostService');
const listBlogpostService = require('../services/listBlogpostService');
const ErrorHandler = require('../handlers/errorResponseHandler');

const LIST_TOTAL_SIZE_RESPONSE_HEADER_NAME = "Pagination-Count"
const LIST_CURRENT_LIMIT_RESPONSE_HEADER_NAME = "Pagination-Limit"

const createBlogpost = async (req, res) => {
  try {
    let payload = req.body;
    let blogPost = await createOrUpdateBlogpostService.createBlogpost(req.callContext, payload);
    res.status(201).send(blogPost);
  } catch (err) {
    return ErrorHandler.getResponseError(err, res); 
  }
};
const updateBlogpostById = async (req, res) => {
  try {
    let id = req.params.id;
    let payload = req.body;
    let blogPost = await createOrUpdateBlogpostService.updateBlogpost(req.callContext, id, payload);
    res.status(200).send(blogPost);
  } catch (err) {
    return ErrorHandler.getResponseError(err, res); 
  }
};
const getBlogpostById = async (req, res) => {
  try {
    let id = req.params.id;
    let blogPost = await readBlogpostService.getBlogpostById(req.callContext, id);
    res.status(200).send(blogPost);
  } catch (err) {
    return ErrorHandler.getResponseError(err, res); 
  }
};
const deleteBlogpostById = async (req, res) => {
  try {
    let id = req.params.id;
    let blogPost = await deleteBlogpostService.deleteBlogpostById(req.callContext, id);
    res.status(200).send(blogPost);
  } catch (err) {
    return ErrorHandler.getResponseError(err, res); 
  }
};
const listBlogposts = async (req, res) => {
  try {
    let offset = req.query.offset;
    let limit = req.query.limit;
    let blogPostsData = await listBlogpostService.listBlogposts(req.callContext, offset, limit);
    res.status(200)
    .header(LIST_TOTAL_SIZE_RESPONSE_HEADER_NAME, blogPostsData.size)
    .header(LIST_CURRENT_LIMIT_RESPONSE_HEADER_NAME, blogPostsData.data.length)
    .send(blogPostsData.data);
  } catch (err) {
    return ErrorHandler.getResponseError(err, res); 
  }
};

module.exports = {
  createBlogpost,
  getBlogpostById,
  updateBlogpostById,
  deleteBlogpostById,
  listBlogposts,
};