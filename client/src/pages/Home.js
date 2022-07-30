import React from "react";
import GamePostList from "../components/GamePostList";
import FriendList from "../components/FriendList";

import Auth from '../utils/auth';
import { useQuery } from "@apollo/client";
import { QUERY_GAMEPOSTS, QUERY_ME_BASIC } from "../utils/queries";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_GAMEPOSTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const gameposts = data?.gameposts || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <GamePostList
             gameposts={gameposts}
              title="Games you nerds have completed:"
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
