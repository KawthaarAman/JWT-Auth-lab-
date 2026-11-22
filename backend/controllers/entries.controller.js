
const Entry = require("../models/Entry");

// GET all public entries
async function getAllEntries(req, res) {
  try {
    const entries = await Entry.find({ isPublic: true });

    return res.status(200).json(entries);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

// POST create a new entry
async function createEntry(req, res) {
  try {
    const entryData = {
      ...req.body,
      owner: req.user._id
    };

    const entry = await Entry.create(entryData);

    return res.status(201).json(entry);
  } catch (err) {
    console.error(err);

    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.message
      });
    }

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

// GET my entries
async function getMyEntries(req, res) {
  try {
    const entries = await Entry.find({
      owner: req.user._id
    });

    return res.status(200).json(entries);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

// GET one entry
async function getEntryById(req, res) {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found."
      });
    }

    if (entry.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to view this entry."
      });
    }

    return res.status(200).json(entry);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

// PUT update an entry
async function updateEntry(req, res) {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found."
      });
    }

    if (entry.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to edit this entry."
      });
    }

    const { title, entryBody, isPublic } = req.body;

    if (title !== undefined) entry.title = title;
    if (entryBody !== undefined) entry.entryBody = entryBody;
    if (isPublic !== undefined) entry.isPublic = isPublic;

    await entry.save();

    return res.status(200).json(entry);
  } catch (err) {
    console.error(err);

    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.message
      });
    }

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

// DELETE an entry
async function deleteEntry(req, res) {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found."
      });
    }

    if (entry.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this entry."
      });
    }

    await entry.deleteOne();

    return res.status(200).json({
      message: "Entry deleted successfully."
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

module.exports = {
  getAllEntries,
  getEntryById,
  createEntry,
  getMyEntries,
  updateEntry,
  deleteEntry
};
