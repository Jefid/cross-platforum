import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_GAMEPOST } from '../../utils/mutations';
import { QUERY_GAMEPOSTS, QUERY_ME } from '../../utils/queries';

const GamePostForm = () => {
  
    const [gamePlayed, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addGamePost, { error }] = useMutation(ADD_GAMEPOST, {
      update(cache, { data: { addGamePost } }) {
        // could potentially no exist yet, so wrap in a try/catch statement
        try{
          // update me array's cache
          const { me } = cache.readQuery({ query: QUERY_ME }) ;
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, gameposts: [...me.gameposts, addGamePost] } },
          });
        } catch (e) {
          console.warn("First thought insertion by user")
        }

        // update gamepost array's cache
        const { gameposts } = cache.readQuery({ query: QUERY_GAMEPOSTS });
        cache.writeQuery({
          query: QUERY_GAMEPOSTS,
          data: { gameposts: [addGamePost, ...gameposts] },
        });
      }
    });

    const handleFormSubmit = async event => {
      event.preventDefault();

      try{
        // add gamePost to database
        await addGamePost({
          variables: { gamePlayed }
        });

        // clear form value
        setText('');
        setCharacterCount(0);
      } catch (e) {
        console.error(e);
      }
    };
  
    const handleChange = event => {
        if (event.target.value.length <= 280) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
    };

    return (
    <div>
      <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form className="flex-row justify-center justify-space-between-md align-stretch"
      onSubmit={handleFormSubmit}>
      <textarea
            placeholder="Tell us about a new game you played..."
            value={gamePlayed}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default GamePostForm;