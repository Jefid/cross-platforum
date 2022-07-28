import React from 'react';

const SingleGamePost = props => {
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            Username
          </span>{' '}
          gamePlayed on createdAt
        </p>
        <div className="card-body">
          <p>What game did you play?</p>
        </div>
      </div>
    </div>
  );
};

export default SingleGamePost;
