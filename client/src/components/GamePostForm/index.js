import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_GAMEPOST } from "../../utils/mutations";
import { QUERY_GAMEPOSTS, QUERY_ME } from "../../utils/queries";
import Star from "../Star";
import "./style.css";

const GamePostForm = () => {
  const [gamePlayed, setText] = useState("");
  const [review, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [reviewCharacterCount, setReviewCharacterCount] = useState(0);
  const [addGamePost, { error }] = useMutation(ADD_GAMEPOST, {
    update(cache, { data: { addGamePost } }) {
      // could potentially no exist yet, so wrap in a try/catch statement
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, gameposts: [...me.gameposts, addGamePost] } },
        });
      } catch (e) {
        console.warn("First thought insertion by user");
      }
      
      // update gamepost array's cache
      const { gameposts } = cache.readQuery({ query: QUERY_GAMEPOSTS });
      cache.writeQuery({
        query: QUERY_GAMEPOSTS,
        data: { gameposts: [addGamePost, ...gameposts] },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add gamePost to database
      await addGamePost({
        variables: { gamePlayed, review, rating },
      });

      // clear form value
      setText("");
      setCharacterCount(0);
      setReviewText("");
      setReviewCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    if (event.target.value.length <= 50) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleReviewChange = (event) => {
    if (event.target.value.length <= 280) {
      setReviewText(event.target.value);
      setReviewCharacterCount(event.target.value.length);
    }
  };
 
    const changeRating = (newRating) => {
      setRating(newRating);
      console.log(rating);
      // onChange?.(newRating);
    };

    return (
      <div>
        <form
          className="flex-row justify-center justify-space-between-md align-stretch"
          id="entry-form"
          onSubmit={handleFormSubmit}
        >
          <p
            id="game-count"
            className={`m-0 ${characterCount === 50 ? "text-error" : ""}`}
          >
            Character Count: {characterCount}/50
            {error && <span className="ml-2">Something went wrong...</span>}
          </p>
          <textarea
            id="game-name-text"
            name="gamePlayed"
            placeholder="Tell us about a new game you played..."
            value={gamePlayed}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
          ></textarea>
          <span>
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                filled={value <= rating}
                onClick={() => changeRating(value)}
              />
            ))}
          </span>
          <p
            id="review-count"
            className={`m-0 ${
              reviewCharacterCount === 280 ? "text-error" : ""
            }`}
          >
            Character Count: {reviewCharacterCount}/280
            {error && <span className="ml-2">Something went wrong...</span>}
          </p>
          <textarea
            id="game-review-text"
            name="review"
            placeholder="What did you think of this game?"
            value={review}
            className="form-input col-12 col-md-9"
            onChange={handleReviewChange}
          ></textarea>
          <button
            className="btn col-12 col-md-3"
            type="submit"
            id="submit-button"
          >
            Submit
          </button>
        </form>
      </div>
    );
};

export default GamePostForm;
