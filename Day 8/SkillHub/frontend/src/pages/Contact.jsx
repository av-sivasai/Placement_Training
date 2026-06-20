import { useState } from "react";

import API from "../api/courseApi";

import { toast } from "react-toastify";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.message
    ) {
      toast.error("All Fields Required");

      return;
    }

    try {
      await API.post(
        "/contact",
        formData
      );

      toast.success(
        "Message Sent Successfully"
      );

      setFormData({
        name: "",
        email: "",
        message: ""
      });
    }

    catch (error) {
      toast.error(
        "Failed To Send Message"
      );
    }
  }

  async function fetchMessages() {
    setLoading(true);

    try {
      const response =
        await API.get("/contact");

      setMessages(response.data);
    }

    catch (error) {
      toast.error(
        "Failed To Fetch Messages"
      );
    }

    finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container">

      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value
            })
          }
        />

        <br /><br />

        <input
          type="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value
            })
          }
        />

        <br /><br />

        <textarea
          rows="5"
          placeholder="Enter Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value
            })
          }
        />

        <br /><br />

        <button type="submit">
          Send Message
        </button>

      </form>

      <br /><br />

      <button
        type="button"
        onClick={fetchMessages}
      >
        Received Messages
      </button>

      <br /><br />

      {loading && (
        <p>Loading messages...</p>
      )}

      {!loading &&
        messages.length > 0 && (

          <div className="messages-section">

            <h2>Received Messages</h2>

            <div className="messages-container">

              {messages.map((msg) => (

                <div
                  key={msg._id}
                  className="message-card"
                >

                  <p>
                    <strong>Name:</strong>{" "}
                    {msg.name}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {msg.email}
                  </p>

                  <p>
                    <strong>Message:</strong>{" "}
                    {msg.message}
                  </p>

                </div>

              ))}

            </div>

          </div>

        )}

    </div>
  );
}

export default Contact;