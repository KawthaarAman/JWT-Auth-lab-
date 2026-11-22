import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function EntriesPage() {
  const { user } = useAuth();

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    async function fetchEntries() {
      try {
        const response = await api.get("/entries");
        setEntries(response.data);
      } catch (err) {
        setError("Could not load public entries.");
      } finally {
        setLoading(false);
      }
    }

    fetchEntries();
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

      setDeleteError("");
    } catch (err) {
      setDeleteError("Could not delete entry.");
    }
  }

  if (loading) {
    return <p>Loading public entries...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Public Entries</h1>

      {deleteError && <p>{deleteError}</p>}

      {entries.length === 0 ? (
        <p>No public entries available yet.</p>
      ) : (
        entries.map((entry) => {
          const isOwner =
            user && entry.owner.toString() === user._id.toString();

          return (
            <div key={entry._id}>
              <h2>{entry.title}</h2>
              <p>{entry.entryBody}</p>

              {isOwner && (
                <>
                  <Link to={`/entries/${entry._id}/edit`}>
                    Edit
                  </Link>

                  <button onClick={() => handleDelete(entry._id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default EntriesPage;
