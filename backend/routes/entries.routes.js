const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");

const entriesController = require("../controllers/entries.controller");

// Get all public entries
router.get("/", entriesController.getAllEntries);

// Get my entries
router.get("/my-entries", verifyToken, entriesController.getMyEntries);

// Get one entry
router.get("/:id", verifyToken, entriesController.getEntryById);

// Create a new entry
router.post("/", verifyToken, entriesController.createEntry);

// Update an entry
router.put("/:id", verifyToken, entriesController.updateEntry);

// Delete an entry
router.delete("/:id", verifyToken, entriesController.deleteEntry);

module.exports = router;
