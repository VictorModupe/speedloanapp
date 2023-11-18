const express = require('express')
var app = express();
const cors = require("cors")
const path = require('path')
const logger = require("morgan")
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
app.use(cors())
app.use(logger('dev'));
app.use(express.json());

app.use(async (req,res,next)=>{
  const routeHandler = app._router.stack.find(layer => {
    if (layer.route) {
      return layer.route.path === req.path;
    }
  });
  if (routeHandler) {
    const expectedMethod = routeHandler.route.stack[0].method;
    console.log(expectedMethod,req.method);
    if (req.method.toLowerCase() !== expectedMethod) {
      return res.status(405).json({ error: 'Method Not Allowed',statusCode:405, });
    }
  }
  res.data = {
      status:true,
      data:{},
      statusCode:200
  }
  next();
});

app.use(express.urlencoded({ extended:false,limit:1024 * 1024 * 20 *1024}));

app.use(express.static(path.join(__dirname, 'public')));
app.get("/",async (req,res)=>{
    res.data.data = {
      message:"Hello Explorer! Welcome to SPEEDLOAN BACKEND SERVICE. Enjoy the World beyond!"
    }
    res.status(200).send(res.data)
  })

  // SWAGGER UI ROUTE
const { readFileSync } = require("fs");
// const YAML = require("yaml");
// const file = readFileSync("./SPEEDLOAN.postman_collection.yml", "utf8");
// const swaggerDocument = YAML.parse(file);
// app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  module.exports = app;
