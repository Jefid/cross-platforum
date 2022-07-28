import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_GAMEPOSTS } from "../utils/queries";
import GamePostList from "../components/GamePostList";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_GAMEPOSTS);
  const gameposts = data?.gameposts || [];
  console.log(gameposts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <GamePostList gameposts={gameposts} title="Games you nerds have completed:" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
