const Model = require('../Models/model')

 const create = async (req, res) => {
    try {
      const newData = new Model({...req.body,createdAt: new Date() });
      await newData.save();
      res.status(201).json({success:"true", message: "Expense created successfully"});
    } catch (error) {
      res.status(500).json({success:"false", message: error.message });
    }
  };
  
   const getAll = async (req, res) => {
    try {
        const Data = await Model.find();
        if (!Data || Data.length === 0) {
          return res.status(404).json({ success:"false",message: "No data found" });
        }
        return res.status(200).json({success:"true",data:Data});
      } catch (error) {
        res.status(500).json({success:"false", message: error.message });
      }
  };

   const getById = async (req, res) => {
    try {
        const Data = await Model.findById(req.params.id);
        if (!Data) {
          return res.status(404).json({ success:"false",message: "No data found" });
        }
        return res.status(200).json({success:"true",data:Data});
      } catch (error) {
        res.status(500).json({success:"false", message: error.message });
      }
  };

  const updateById = async (req, res) => {
    try {
        const updatedData = await Model.findByIdAndUpdate(
            req.params.id,
            { 
                ...req.body,
                updatedAt: new Date() // Update the updatedAt field
            },
            { new: true }
        );

        if (!updatedData) {
            return res.status(404).json({ success: false, message: "Update failed" });
        }

        return res.status(200).json({ success: true, message:"Expense Updated sucessfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
  }

 const deleteById = async (req, res) => {
    try {
      const dataExist = await Model.findById(req.params.id);
      if (!dataExist) {
        return res.status(404).json({ success: false, message: "data not found." });
      }
      await Model.findByIdAndDelete(req.params.id);
      res.status(200).json({success: true, message: "Expense deleted successfully." });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message});
    }
  };
  
 module.exports = { getAll,getById,create,updateById,deleteById} 

  