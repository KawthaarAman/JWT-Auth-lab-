import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/api";

function EditEntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    entryBody: "",
    isPublic: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEntry() {
      try {
        const response = await api.get(`/entries/${id}`);

        setFormData({
          title: response.data.title,
          entryBody: response.data.entryBody || "",
          isPublic: response.data.isPublic,
        });
      } catch (err) {
        setError(
          err?.response?.data?.message || "Could not load entry."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchEntry();
  }, [id]);

  function handleChange(event) {
    const { name, type, value, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.put(`/entries/${id}`, formData);
      navigate("/my-entries");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Could not update entry."
      );
    }
  }

  if (loading) {
    return <p>Loading entry...</p>;
  }

  return (
    <div>
      <h1>Edit Entry</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          maxLength="100"
        />

        <label htmlFor="entryBody">Entry Body</label>
        <textarea
          id="entryBody"
          name="entryBody"
          value={formData.entryBody}
          onChange={handleChange}
          maxLength="350"
        />

        <label>
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
          />
          Make this entry public
        </label>

        <button type="submit">Save Changes</button>

        <button
          type="button"
          onClick={() => navigate("/my-entries")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditEntryPage;
