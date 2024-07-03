const {
   getAll,getById,create,updateById,deleteById
  } = require("../Controller/index");
 
  const Router = require("express").Router();
  
  Router.post("/createExpense", create);
  Router.get("/getExpense", getAll);
  Router.get("/getExpense/:id",getById);
  Router.put("/updateExpense/:id",updateById);
  Router.delete("/deleteExpense/:id", deleteById);

  module.exports = Router;
  