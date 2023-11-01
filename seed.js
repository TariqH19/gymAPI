require("dotenv").config();
const mongoose = require("mongoose");
const Exercise = require("./models/exercises.model");
const Splits = require("./models/splits.model");
const Workout = require("./models/workouts.model");
const WorkoutExercise = require("./models/workoutsexercises.model");
const WorkoutSplit = require("./models/workoutssplits.model");
const USER_ID_1 = "65393fb693a3420884546179";
const USER_ID_2 = "653d87331b352e4de5574957";

// connecting to the database
mongoose.connect(process.env.Db_ATLAS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to the database");

  try {
    // delete existing data
    await Exercise.deleteMany({});
    await Splits.deleteMany({});
    await Workout.deleteMany({});
    await WorkoutExercise.deleteMany({});
    await WorkoutSplit.deleteMany({});

    // data to be seeded

    const exercises = await Exercise.create([
      {
        name: "Lat Pulldown",
        muscle_group: ["Back", "Biceps"],
        image: "",
        notes: ["Keep your back straight", "Don't forget to stretch"],
        user: USER_ID_1,
      },
      {
        name: "Squats",
        muscle_group: ["Quads", "Glutes", "Hamstrings"],
        notes: ["Keep your back straight", "Don't forget to stretch"],
        image: "",
        user: USER_ID_2,
      },
    ]);

    const splits = await Splits.create([
      {
        name: "Push Pull Legs",
        user: USER_ID_1,
      },
      {
        name: "Upper Lower",
        user: USER_ID_2,
      },
    ]);

    const workouts = await Workout.create([
      {
        name: "Pull A",
        notes: ["This will be a heavy back day...", "Don't forget to stretch"],
        user: USER_ID_1,
      },
      {
        name: "Push A",
        notes: ["This will be a heavy chest day...", "Don't forget to stretch"],
        user: USER_ID_2,
      },
    ]);

    // getting the _id values of the data seeded
    const exerciseIds = exercises.map((exercise) => exercise._id);
    const splitIds = splits.map((split) => split._id);
    const workoutIds = workouts.map((workout) => workout._id);

    // data for pivot tables
    const workoutExerciseData = [
      {
        workout: workoutIds[0],
        exercise: exerciseIds[0],
        setDetails: [
          {
            setNumber: 1,
            reps: 10,
            weight: 50,
          },
          {
            setNumber: 2,
            reps: 12,
            weight: 55,
          },
        ],
        user: USER_ID_1,
      },
      {
        workout: workoutIds[1],
        exercise: exerciseIds[1],
        setDetails: [
          {
            setNumber: 1,
            reps: 10,
            weight: 50,
          },
          {
            setNumber: 2,
            reps: 12,
            weight: 55,
          },
        ],
        user: USER_ID_2,
      },
    ];

    const workoutSplitData = [
      {
        workout: workoutIds[0],
        split: splitIds[0],
        notes: ["This will be a heavy back day...", "Don't forget to stretch"],
        dateStart: new Date("2011-11-11"),
        dateEnd: new Date("2012-12-12"),
        user: USER_ID_1,
      },
      {
        workout: workoutIds[1],
        split: splitIds[1],
        notes: ["This will be a heavy chest day...", "Don't forget to stretch"],
        dateStart: new Date("2011-11-11"),
        dateEnd: new Date("2012-12-12"),
        user: USER_ID_2,
      },
    ];

    // inserting the data into the pivot tables
    await WorkoutExercise.insertMany(workoutExerciseData);
    await WorkoutSplit.insertMany(workoutSplitData);

    console.log("Data has been seeded successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
});
