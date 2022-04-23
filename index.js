const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/danny.db',
});

class Student extends Model {}
Student.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  },
  { sequelize, modelName: 'student' }
);

(async () => {
  await sequelize.sync();
  const danny = await Student.create({
    firstName: 'Danny',
    lastName: 'More Danny',
  });
  console.log(danny.toJSON());
})();
