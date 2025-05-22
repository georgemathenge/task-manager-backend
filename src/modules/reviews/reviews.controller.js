// Example DB call in controller
const getAllReviews = async (req, res) => {
  try {
    // Replace this with DB logic
    res.json([{ id: 1, name: 'Reviews 1' }]);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { getAllReviews };