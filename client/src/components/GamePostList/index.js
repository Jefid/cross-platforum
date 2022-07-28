import React from 'react';

const GamePostList = ({ gameposts, title }) => {
  if (!gameposts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {gameposts &&
        gameposts.map(gamepost => (
          <div key={gamepost._id} className="card mb-3">
            <p className="card-header">
              {gamepost.username} <t/>
                completed at: {gamepost.createdAt}
            </p>
            <div className="card-body">
              <p>{gamepost.gamePlayed}</p>
              <p className="mb-0">
                Comments: {gamepost.commentCount} || Click to{' '}
                {gamepost.commentCount ? 'see' : 'start'} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default GamePostList;