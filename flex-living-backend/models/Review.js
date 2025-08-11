class Review {
  constructor({
    id,
    source = 'hostaway',
    listingId = null,
    listingName = null,
    type = 'other',
    status = 'unknown',
    ratingOverall = null,
    ratingCategories = {},
    channel = 'hostaway',
    publicReview = null,
    privateReview = null,
    guestName = null,
    submittedAt = null,
    approvedForWebsite = false,
    raw = {}
  }) {
    this.id = String(id);
    this.source = source;
    this.listingId = listingId;
    this.listingName = listingName;
    this.type = type;
    this.status = status;
    this.ratingOverall = ratingOverall;
    this.ratingCategories = ratingCategories;
    this.channel = channel;
    this.publicReview = publicReview;
    this.privateReview = privateReview;
    this.guestName = guestName;
    this.submittedAt = submittedAt;
    this.approvedForWebsite = approvedForWebsite;
    this.raw = raw;
  }
}

module.exports = Review;