const db = require("../models");
const jadwal = db.jadwal;
const user = db.user;
const shift = db.shift;
const role = db.role;

module.exports = {
  getAllJadwal: async (req, res) => {
    try {
      const result = await jadwal.findAll({
        include: [{ model: user , include : {model : role}}, { model: shift }],
      });
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  addShiftUser : async (req, res) => {
    try {
      const {userId, shiftId} = req.params
      const checkUser = await jadwal.findOne(
        {where : {userId : userId}}
      )
      if (checkUser) {
        await jadwal.update(
          {shiftId : shiftId},
          {where : {userId: userId}}
        )
        res.status(200).send({
          message:"Perubahan di simpan"
        })
      }else {
        await jadwal.create({shiftId, userId})
        res.status(200).send({
          message:"Karyawan berhasil di tambahkan"
        })
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error)
    }
  },
  deleteShift : async (req,res) => {
    try {
      const {userId} = req.params
      const result = await jadwal.destroy(
        {where: {userId: userId}}
      )
      res.status(200).send({
        message:"Karyawan berhasil dihapus dari shift"
      })
    } catch (error) {
      console.log(error);
      res.status(400).send(error)
    }
  },
  cekShift : async (req, res) => {
    try {
      const id = req.user.id
      console.log(id);
      const result = await jadwal.findOne(
        {where : {userId : id}}
      )
      res.status(200).send(result)
    } catch (error) {
      console.log(error);
      res.status(400).send(error)
    }
  }
};
