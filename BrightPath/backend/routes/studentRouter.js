// import express from "express";

// const studentRouter = express.Router();

// // Mock Student Data (Replace with DB in production)
// const studentDatabase = {
//   "12345": { regno: "12345", course: "Computer Science", ageAtEnrollment: 18, scholarshipHolder: true },
//   "67890": { regno: "67890", course: "Electrical Engineering", ageAtEnrollment: 19, scholarshipHolder: false },
// };

// // Student Details Route
// studentRouter.post("/details", (req, res) => {
//   const { regno } = req.body;

//   if (!regno || !studentDatabase[regno]) {
//     return res.status(404).json({ error: "No data found for this Registration Number." });
//   }

//   res.json(studentDatabase[regno]);
// });

// // Prediction Route (Mock Logic)
// studentRouter.post("/predict", (req, res) => {
//   const { regno } = req.body;

//   if (!regno || !studentDatabase[regno]) {
//     return res.status(404).json({ error: "No student data available for prediction." });
//   }

//   // Mock prediction logic
//   const prediction = studentDatabase[regno].scholarshipHolder
//     ? "Likely to Succeed"
//     : "Needs Academic Support";

//   res.json({ prediction });
// });

// export default studentRouter;
