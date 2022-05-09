const sequelize = require('../config/connection');
const { User, Vite, Comment } = require('../models');

const userData = require('./userData.json');
const viteData = require('./viteData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const vite of viteData) {
    await Vite.create({
      ...vite,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

//   const comments = await Comment.bulkCreate(commentData, {
//       
//   });

  process.exit(0);
};

seedDatabase();
