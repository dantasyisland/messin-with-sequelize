const { Sequelize, Model, DataTypes } = require("sequelize");

// Sequelize - The Library itself
// sequelize - an instance of sequelize

// The connection to the db
// Options are listed like dialect and logging

// Another way
// const sequelize = new Sequelize("sqlite::memory:");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "path/to/danny.db",
  logging: console.log,
});

// Model - models are singular - tables are plural by default
// Sequelize.Model.init(attributes,options)

// default fields id (primary key), createdAt, updatedAt

class Student extends Model {}
Student.init(
  // Attributes
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  },
  //Options
  { sequelize, modelName: "student" }
);

(async () => {
  // await Student.sync({ force: true });
  const danny = await Student.create({
    firstName: "Danny",
    lastName: "More Danny",
  });

  Student.destroy({
    where: {
      firstName: "Danny",
    },
  });

  const danny2 = await Student.create({
    firstName: "Danny Too",
    lastName: "So cute",
  });
  console.log(danny.toJSON());
  console.log(danny2.toJSON());
})();
