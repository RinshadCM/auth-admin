const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const AWS = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
// const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
// const categoryRoutes = require('./routes/category');
// const tagRoutes = require('./routes/tag');

const app = express();

// Set the region
AWS.config.update({ region: 'ap-south-1' });

// Set the credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey:process.env.ACCESS_KEY_SECRET,
});

// Create a DynamoDB instance
const dynamodb = new AWS.DynamoDB.DocumentClient();

const PORT = process.env.PORT || 4000;
console.log(dynamodb);

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// routes middlewares
// app.use('/api', blogRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
// app.use('/api', categoryRoutes);
// app.use('/api', tagRoutes);

app.get('/', (req, res) => {
  res.json({
    'get list of all companies': '/get-companies',
    'get details of a company by id': '/get-company/?_id=<company_id>',
    'post a new company': '/create-company',
    'update company details': '/update-company/?_id=<company_id> //PUT method',
    'delete company': '/delete-company/:id //DELETE method', // changed to path param
    'get list of all jobs using companyId': '/get-jobs',
    'post a new job': '/create-job',
    'update job details': '/update-job //PUT method',
    'delete job': '/delete-job //DELETE method',
  });
});

// get a single company by using _id
app.get('/get-company', (req, res) => {
  try {
    if (req.query._id !== undefined) {
      const params = {
        TableName: 'companies',
        Key: {
          _id: req.query._id,
        },
      };

      dynamodb.get(params, (err, data) => {
        if (!err) {
          // console.log(data);
          res.send(data.Item);
        } else {
          console.log(err);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// get the list of all companies
// req.body.name / req.query.name
app.get('/get-companies', (req, res) => {
  const params = {
    TableName: 'companies',
  };

  dynamodb.scan(params, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result.Items);
    }
  });
});

// create operations
app.post('/create-company', async (req, res) => {
  const params = {
    TableName: 'companies',
    Item: req.body,
  };

  await dynamodb.put(params).promise();
  res.status(201).json(params.Item);
});

// * Update operations
app.put('/update-company', async (req, res) => {
  const _id = req.query._id;
  const params = {
    TableName: 'companies',
    Key: {
      _id: _id,
    },
    UpdateExpression: 'set #name = :name, #description = :description',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#description': 'description',
    },
    ExpressionAttributeValues: {
      ':name': req.body.name,
      ':description': req.body.description,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    const result = await dynamodb.update(params).promise();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Could not update company' });
  }
});

// * Delete operations
app.delete('/delete-company/:id', async (req, res) => {
  const params = {
    TableName: 'companies',
    Key: {
      _id: req.params.id,
    },
  };

  try {
    await dynamodb.delete(params).promise();
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Could not delete company' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
