// const faker = require('faker');
const userSeeds = require('./userSeed.json');
const gamepostSeeds = require('./gamepostSeed.json');
const db = require('../config/connection');
const { GamePost, User } = require('../models');

db.once('open', async () => {
  try {
    await GamePost.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < gamepostSeeds.length; i++) {
      const { _id, gamepostAuthor } = await GamePost.create(gamepostSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: gamepostAuthor },
        {
          $addToSet: {
            gameposts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
