import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";

const ReviewForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log(rating);
    const naam = localStorage.getItem("userData");
    const first = JSON.parse(naam);
    setName(first?.first_name);
    console.log(name);
  }, [rating]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, rating, comment });
    setName("");
    setRating(0);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="review-field">
      <div className="review-field2 p-3">
        <div className="d-flex align-items-center mb-3">
          <div className="profile-img mr-3">
            <img
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              alt="Profile"
              className="img-fluid rounded-circle"
            />
          </div>
          <div>
            <h3 className="text-dark">{name}</h3>
          </div>
        </div>
        <div className="form-rating mb-3">
          <label htmlFor="rating" className="d-block">
            Rating:
          </label>
          <ReactStars
            value={rating}
            half={true}
            count={5}
            onChange={(newRating) => setRating(newRating)}
            size={24}
            activeColor="#ffd700"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="comment" className="d-block">
            Comment:
          </label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
