import React from 'react';
import { Link } from 'react-router-dom';
import Star from '../Star';
import './style.css';

const GamePostList = ({ gameposts, title }) => {
  if (!gameposts.length) {
    return <h3>No Completed Games Yet</h3>;
  }

  return (
    <div id= "game-list-display">
      <h3>{title}</h3>
      {gameposts &&
        gameposts.map(gamepost => (
          <div key={gamepost._id} className="card mb-3">
            <p className="card-header">
              <Link
              to={`/profile/${gamepost.username}`}
              style={{ fontWeight: 700 }}
              className="text-light"
              >
                {gamepost.username}
              </Link>{' '}
                played on {gamepost.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/gamepost/${gamepost._id}`}>
                <p>{gamepost.gamePlayed}</p>
                <p>    <span>
            {[1,2,3,4,5].map((value) => (
            <Star
            key={gamepost.rating}
            filled={value <=gamepost.rating}
            />))}
            </span></p>
                <p className="mb-0">
                  Comments: {gamepost.commentCount} -- Click to{' '}
                  {gamepost.commentCount ? 'see' : 'start'} comments!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default GamePostList;