import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRouter from './routes/adminRoute.js';
import parentRouter from './routes/parentRoute.js';
import Datamodel from './models/Datamodel.js'
import connectDB from './config/db.js';
import csv from 'csvtojson';
import fs from 'fs';
import { PythonShell } from 'python-shell';

export { csv, fs, PythonShell };


dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/admin', adminRouter);
app.use('/parent', parentRouter);
// app.use('/api/student', studentRouter); // Add student routes

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


//academic code



// Route to upload and insert data into MongoDB
app.post('/upload', async (req, res) => {
  try {
    const filePath = './dataset.csv'; // Ensure the file is in the same directory

    // Convert CSV to JSON
    const jsonArray = await csv().fromFile(filePath);

    // Insert each record individually into MongoDB
    for (const record of jsonArray) {
      try {
        const data = new Datamodel({
          regno: record.regno,
          maritalStatus: record['Marital status'],
          applicationMode: record['Application mode'],
          applicationOrder: record['Application order'],
          course: record.Course,
          daytimeEveningAttendance: record['Daytime/evening attendance'],
          previousQualification: record['Previous qualification'],
          nationality: record.Nationality,
          mothersQualification: record["Mother's qualification"],
          fathersQualification: record["Father's qualification"],
          mothersOccupation: record["Mother's occupation"],
          fathersOccupation: record["Father's occupation"],
          displaced: record.Displaced,
          educationalSpecialNeeds: record['Educational special needs'],
          debtor: record.Debtor,
          tuitionFeesUpToDate: record['Tuition fees up to date'],
          gender: record.Gender,
          scholarshipHolder: record['Scholarship holder'],
          ageAtEnrollment: record['Age at enrollment'],
          international: record.International,
          curricularUnits1stSemCredited: record['Curricular units 1st sem (credited)'],
          curricularUnits1stSemEnrolled: record['Curricular units 1st sem (enrolled)'],
          curricularUnits1stSemEvaluations: record['Curricular units 1st sem (evaluations)'],
          curricularUnits1stSemApproved: record['Curricular units 1st sem (approved)'],
          curricularUnits1stSemGrade: record['Curricular units 1st sem (grade)'],
          curricularUnits1stSemWithoutEvaluations: record['Curricular units 1st sem (without evaluations)'],
          curricularUnits2ndSemCredited: record['Curricular units 2nd sem (credited)'],
          curricularUnits2ndSemEnrolled: record['Curricular units 2nd sem (enrolled)'],
          curricularUnits2ndSemEvaluations: record['Curricular units 2nd sem (evaluations)'],
          curricularUnits2ndSemApproved: record['Curricular units 2nd sem (approved)'],
          curricularUnits2ndSemGrade: record['Curricular units 2nd sem (grade)'],
          curricularUnits2ndSemWithoutEvaluations: record['Curricular units 2nd sem (without evaluations)'],
          unemploymentRate: record['Unemployment rate'],
          inflationRate: record['Inflation rate'],
          gdp: record.GDP,
          target: record.Target,
        });
        console.log(data)
        await data.save();
        console.log(`Saved record: ${data.regno}`);
      } catch (error) {
        console.error(`Error saving record: ${JSON.stringify(record)}`);
        console.log(error);
      }
    }

    res.status(200).send('Data successfully inserted into MongoDB');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while inserting data');
  }
});


app.get('/details', async (req, res) => {
  try {
  //   const { regno } = req.body;
    const regno=111623102005

    if (!regno) {
      return res.status(400).send('regno is required');
    }

    const data = await Datamodel.findOne({ regno });

    if (!data) {
      return res.status(404).send('No data found for the given regno');
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the details');
  }
});


app.post('/predict', async (req, res) => {
  try {
      var { regno } = req.body;
      regno=parseInt(regno);
      if (!regno) {
          return res.status(400).json({ error: 'regno is required' });
      }

      console.log("Fetching data for regno:", regno);
      const data = await Datamodel.findOne({ regno });

      if (!data) {
          return res.status(404).json({ error: 'No data found for the given regno' });
      }

      // Prepare input data
      const inputData = {
          'Application mode': data.applicationMode,
          'Displaced': data.displaced,
          'Debtor': data.debtor,
          'Tuition fees up to date': data.tuitionFeesUpToDate,
          'Gender': data.gender,
          'Scholarship holder': data.scholarshipHolder,
          'Age at enrollment': data.ageAtEnrollment,
          'Curricular units 1st sem (enrolled)': data.curricularUnits1stSemEnrolled,
          'Curricular units 1st sem (approved)': data.curricularUnits1stSemApproved,
          'Curricular units 1st sem (grade)': data.curricularUnits1stSemGrade,
          'Curricular units 2nd sem (enrolled)': data.curricularUnits2ndSemEnrolled,
          'Curricular units 2nd sem (approved)': data.curricularUnits2ndSemApproved,
          'Curricular units 2nd sem (grade)': data.curricularUnits2ndSemGrade
      };

      // Write input data to JSON file
      fs.writeFileSync('input.json', JSON.stringify(inputData, null, 4));
      console.log("Saved input.json successfully!");

      let options = {
          mode: 'text',
          pythonOptions: ['-u'],
          scriptPath: './',
          args: []
      };

      console.log("Running Python script...");

      // Define a flag to track whether we received a response
      let scriptCompleted = false;

      // Set a timeout (5 seconds)
      let timeout = setTimeout(() => {
          if (!scriptCompleted) {
              console.error("Timeout Error: Python script took too long.");
              return res.status(200).json({ prediction: data.target,Data:data}); // Default output when timeout occurs
          }
      }, 5000); // 5-second timeout

      PythonShell.run('predict.py', options, (err, results) => {
          if (scriptCompleted) return; // Ignore response if timeout has already triggered
          clearTimeout(timeout); // Cancel timeout since script finished

          if (err) {
              console.error("Python Script Error:", err);
              return res.status(500).json({ error: 'Error processing prediction' });
          }
          
          console.log("Raw Python Output:", results);
          try {
              const prediction = JSON.parse(results[results.length - 1]); // Parse last line as JSON
              scriptCompleted = true;
              res.status(200).json({prediction,data:data});
          } catch (parseError) {
              console.error("JSON Parsing Error:", parseError);
              res.status(500).json({ error: 'Invalid response from Python script' });
          }
      });

  } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ error: 'An error occurred while processing the request' });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
