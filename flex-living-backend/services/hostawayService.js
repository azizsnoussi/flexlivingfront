const fs = require('fs').promises;
const path = require('path');
const Review = require('../models/Review');
const axios = require('axios');
const config = require('../config/hostaway');

let cachedToken = null;
let tokenExpiry = null;

async function getToken() {
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry - 60000) {
    return cachedToken;
  }

  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: config.clientId,
    client_secret: config.clientSecret,
    scope: 'general'
  });
  const response = await axios.post(
    `${config.hostawayApiBaseUrl}/v1/accessTokens`,
    params.toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache'
      }
    }
  );

  cachedToken = response.data.access_token;
  tokenExpiry = Date.now() + response.data.expires_in * 1000;

  return cachedToken;
}

async function fetchApiReviews() {
  try {
    const token = await getToken();

    const response = await axios.get(
      `${config.hostawayApiBaseUrl}/api/v1/reviews?accountId=${config.accountId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.data || !Array.isArray(response.data.result)) {
      return [];
    }

    return response.data.result;
  } catch (err) {
    console.error('Erreur récupération reviews API:', err.message);
    return [];
  }
}

async function fetchMockReviews() {
  try {
    const filePath = path.join(__dirname, '../data/mock_hostaway.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(jsonData);

    if (!Array.isArray(parsed.result)) {
      return [];
    }

    return parsed.result;
  } catch (err) {
    console.error('Erreur lecture fichier mock:', err.message);
    return [];
  }
}

function normalizeHostawayReview(raw) {
  let ratingOverall = raw.rating ?? null;
  if (!ratingOverall && Array.isArray(raw.reviewCategory)) {
    const vals = raw.reviewCategory.map(c => c.rating).filter(r => typeof r === 'number');
    if (vals.length) ratingOverall = vals.reduce((a, b) => a + b, 0) / vals.length;
  }

  const ratingCategories = {};
  if (Array.isArray(raw.reviewCategory)) {
    raw.reviewCategory.forEach(c => {
      if (c.category) ratingCategories[c.category] = c.rating ?? null;
    });
  }

  let submittedAt = null;
  if (raw.submittedAt) {
    const date = new Date(raw.submittedAt.replace(' ', 'T'));
    submittedAt = !isNaN(date) ? date.toISOString() : null;
  }

  return new Review({
    id: raw.id,
    listingId: raw.listingId ?? null,
    listingName: raw.listingName ?? null,
    type: raw.type ?? 'other',
    status: raw.status ?? 'unknown',
    ratingOverall,
    ratingCategories,
    channel: raw.channel ?? null,
    publicReview: raw.publicReview ?? null,
    privateReview: raw.privateReview ?? null,
    guestName: raw.guestName ?? null,
    submittedAt,
    raw
  });
}

function applyFilters(reviews, filters) {
  let result = [...reviews];
  if (filters.listingName) {
    result = result.filter(r => r.listingName?.toLowerCase().includes(filters.listingName.toLowerCase()));
  }
  if (filters.minRating) {
    const minRatingNum = parseFloat(filters.minRating);
    if (!isNaN(minRatingNum)) {
      result = result.filter(r => r.ratingOverall >= minRatingNum);
    }
  }
  if (filters.channel) {
    result = result.filter(r => (r.channel || '').toLowerCase() === filters.channel.toLowerCase());
  }
  return result;
}

function countByListing(reviews) {
  return reviews.reduce((acc, r) => {
    const key = r.listingName || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

async function getHostawayReviews(filters = {}) {
  const [apiRawReviews, mockRawReviews] = await Promise.all([
    fetchApiReviews(),
    fetchMockReviews()
  ]);

  const combinedRaw = [...apiRawReviews, ...mockRawReviews];

  let normalized = combinedRaw.map(normalizeHostawayReview);

  normalized = applyFilters(normalized, filters);

  return {
    count: normalized.length,
    byListing: countByListing(normalized),
    reviews: normalized
  };
}

module.exports = {
  getHostawayReviews
};
