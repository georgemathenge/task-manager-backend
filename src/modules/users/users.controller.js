// Example DB call in controller
const getAllUsers = async (req, res) => {
  try {
    // Replace this with DB logic
    res.json([{ id: 1, name: 'Users 1' }]);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { getAllUsers };