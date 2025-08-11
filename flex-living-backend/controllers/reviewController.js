const hostawayService = require('../services/hostawayService');

async function getHostawayReviews(req, res, next) {
  try {
    const filters = {
      listingName: req.query.listingName,
      minRating: req.query.minRating,
      channel: req.query.channel
    };

    const data = await hostawayService.getHostawayReviews(filters);
    res.json({
      status: 'success',
      ...data
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getHostawayReviews
};
