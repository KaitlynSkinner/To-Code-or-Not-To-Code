const db = require('../config/connection');
const { User, Recommendation } = require('../models');
const userSeeds = require('./userSeeds.json');
const recommendationSeeds = require('./recommendationSeeds.json');

db.once('open', async () => {
  try {
    await Recommendation.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < recommendationSeeds.length; i++) {
      const { _id, recommendationAuthor } = await Recommendation.create(recommendationSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: recommendationAuthor },
        {
          $addToSet: {
            recommendations: _id,
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