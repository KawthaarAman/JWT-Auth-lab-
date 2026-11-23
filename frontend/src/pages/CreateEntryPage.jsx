import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

function CreateEntryPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    entryBody: "",
    isPublic: false,
  });

  const [error, setError] = useState("");

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
      await api.post("/entries", formData);
      navigate("/my-entries");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Could not create entry."
      );
    }
  }

  return (
    <div>
      <h1>Create a New Entry</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          maxLength="100"
        />

        <label htmlFor="entryBody"> Entry Body: </label>
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
      
        <button type="submit"> Create Entry</button>
      </form>
    </div>
  );
}

export default CreateEntryPage;
