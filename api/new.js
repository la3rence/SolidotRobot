module.exports = async (req, res) => {
    // Respond with a JSON string of all users in the collection
    console.log("test" + new Date());
    res.status(200).json({ "test": "new" })
  }