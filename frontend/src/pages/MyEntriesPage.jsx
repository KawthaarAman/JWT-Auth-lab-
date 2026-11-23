import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../services/api";

function MyEntriesPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMyEntries() {
      try {
        const response = await api.get("/entries/my-entries");
        setEntries(response.data);
      } catch (err) {
        setError("Could not load your entries.");
      } finally {
        setLoading(false);
      }
    }

    fetchMyEntries();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/entries/${id}`);
      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry._id !== id)
      );
    } catch (err) {
      setError("Could not delete entry.");
    }
  }

  if (loading) return <p>Loading your entries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>My Entries</h1>

      {entries.length === 0 ? (
        <p>No Entries made yet</p>
      ) : (
        entries.map((entry) => (
          <div key={entry._id}>
            <h2>{entry.title}</h2>
            <p>{entry.entryBody}</p>
            <p>{entry.isPublic ? "Public" : "Private"}</p>

            <Link to={`/entries/${entry._id}/edit`}>Edit</Link>

            <button onClick={() => handleDelete(entry._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyEntriesPage;
