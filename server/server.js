const morgan = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const CompanyModel = require("./models/companies");
require("dotenv").config();
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const tagRoutes = require("./routes/tag");

const app = express();

const PORT = process.env.PORT || 4000;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/auth";
console.log(url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDatabase Successfully connected"))
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

  app.use(cors({ origin: `http://localhost:3000`, credentials: true }));



// routes middlewares
app.use("/api", blogRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", tagRoutes);
// cors
app.use(cors());



app.get("/", (req, res) => {
  res.json({
    "get list of all companies": "/get-companies",
    "get details of a company by id": "/get-company/?_id=<company_id>",
    "post a new company": "/create-company",
    "update company details": "/update-company/?_id=<company_id> //PUT method",
    "delete company": "/delete-company/?_id=<company_id> //DELETE method",
    "get list of all jobs using companyId": "/get-jobs",
    "post a new job": "/create-job",
    "update job details": "/update-job //PUT method",
    "delete job": "/delete-job //DELETE method",
  });
});

// get a single idea by using _id
app.get("/get-company", (req, res) => {
  try {
    if (req.query._id !== undefined) {
      CompanyModel.findOne({ _id: req.query._id }, (err, data) => {
        if (!err) {
          // console.log(data);
          res.send(data);
        } else {
          console.log(err);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// get the list of all ideas
// req.body.name / req.query.name
app.get("/get-companies", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  CompanyModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// create operations
app.post("/create-company", async (req, res) => {
  const ideaForCompany = req.body;
  const newideaForCompany = new CompanyModel(ideaForCompany);
  await newideaForCompany.save();

  res.status(201).json(newideaForCompany);
});

// * Update opertions
app.put("/update-company", async (req, res) => {
  const _id = req.query._id;

  try {
    const response = await CompanyModel.updateOne({ _id: _id }, req.body);
    res.send(req.body);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//* Delete operations
app.delete("/delete-company/:id", async (req, res) => {
  const _id = req.params.id;

  await CompanyModel.findByIdAndRemove(_id).exec();
  res.send("Deleted");
});







app.listen(PORT, (req, res) => {
  console.log(`Currently server is running at http://localhost:${PORT}`);
});
