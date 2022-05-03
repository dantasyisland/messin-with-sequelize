const { Sequelize, Model, DataTypes, Op } = require("sequelize");

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

  // Create
  const first = await Student.create({
    firstName: "Glen",
    lastName: "Student",
  });

  const second = await Student.create({
    firstName: "Student",
    lastName: "McStudenton",
  });

  console.log(second.firstName);
  console.log(first.toJSON());

  const jane = await Student.create({
    firstName: "Jane",
    lastName: "The Student",
  });

  // Update - using save -
  second.firstName = "The";
  second.save();

  // Update - using update
  await jane.update({ lastName: "Is Jane" });

  // Delete
  Student.destroy({
    where: {
      firstName: "1",
    },
  });

  /* ---------------------------------- READ ---------------------------------- */

  // Find by ID

  // const notJill = await Student.findByPk(53);
  // console.log(notJill.toJSON());

  // Not Jill
  console.log((await Student.findByPk(53)).toJSON());

  // Reload - Generates a select query to get up-to-date data from DB
  const JaneReloaded = await Student.create({
    firstName: "Jane",
  });
  console.log(JaneReloaded.firstName);

  JaneReloaded.lastName = "Reloaded";

  console.log(JaneReloaded.lastName);

  await JaneReloaded.reload();
  console.log(JaneReloaded.lastName);

  const search = "Student";

  // FIND ALL

  // SELECT firstName AS FIRST, lastName FROM students
  const allTheStudents = await Student.findAll({
    attributes: [["firstName", "FIRST"], "lastName"],
  });

  // console.log(allTheStudents);
  // console.log(allTheStudents.every((student) => student instanceof Student));
  console.log("All users:", JSON.stringify(allTheStudents, null, 2));

  // WHERE Clause

  const whereTheStudents = await Student.findAll({
    where: {
      firstName: {
        [Op.eq]: "Jane",
      },
    },
  });

  console.log(JSON.stringify(whereTheStudents, null, 2));
})();
