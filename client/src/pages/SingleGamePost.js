import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_GAMEPOST } from '../utils/queries';
import CommentList from '../components/CommentList';


const SingleGamePost = props => {
  const { id: gamepostId } = useParams();
  
  const { loading, data } = useQuery(QUERY_GAMEPOST, {
    variables: { id: gamepostId }
  });

  const gamepost = data?.gamepost || {};

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
           {gamepost.username}
          </span>{' '}
          Posted on {gamepost.createdAt}
        </p>
        <div className="card-body">
          <p>{gamepost.gamePlayed}</p>
        </div>
      </div>

      {gamepost.commentCount > 0 && (
      <CommentList comments={gamepost.comments} />
      )}

    </div>
  );
};

export default SingleGamePost;
