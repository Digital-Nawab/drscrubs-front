import React from "react";
import ReactStars from "react-rating-stars-component";

const Review = ({ name, rating, comment }) => {
  return (
    <div className="d-flex justify-content-center" style={{
      width:"100%"
    }}>
      <div
        className="testimonial-box"
        style={{
          width: "",
        }}
      >
        {/*top-----------------------*/}
        <div className="box-top">
          {/*profile---*/}
          <div className="profile">
            {/*img--*/}
            <div className="profile-img">
              <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" />
            </div>
            {/*name-and-username*/}
            <div className="name-user">
              <strong>{name}</strong>
            </div>
          </div>
          {/*reviews----*/}
          <div className="rating-container">
            <ReactStars
              value={rating}
              half={true}
              count={5}
              size={24}
              activeColor="#ffd700"
            />
          </div>
        </div>
        {/*Comments--------------------------------------*/}
        <div className="client-comment">
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
