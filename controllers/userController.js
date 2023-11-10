const db = require("../models");
const user = db.user;
const salary = db.salaries;
const role = db.role;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const transporter = require("../middleware/transporter");
const fs = require("fs");
const handlebars = require("handlebars");

module.exports = {
  sendMail: async (req, res) => {
    try {
      const { email } = req.body;

      const data = await fs.readFileSync("./index.html", "utf-8");
      const tempCompile = await handlebars.compile(data);
      const tempResult = tempCompile();

      await transporter.sendMail({
        from: "hamidiakmal@gmail.com",
        to: email,
        subject: "Create Account APPsensi",
        html: tempResult,
      });
      res.status(200).send({
        message: "send email success",
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  addEmployee: async (req, res) => {
    try {
      const { name, email, password, phoneNumber, birthDay, roleId } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const result = await user.create({
        name,
        email,
        phoneNumber,
        password: hashPassword,
        birthDay,
        roleId,
      });
      res.status(200).send({
        status: 200,
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await user.findOne({
        where: { email: email },
      });
      if (!result)
        throw {
          message: "Akun Tidak Ditemukan",
        };
      const isValid = await bcrypt.compare(password, result.password);
      if (!isValid)
        throw {
          message: "Password Salah",
        };
      const payload = { id: result.id };
      const token = jwt.sign(payload, "key", { expiresIn: "5h" });
      res.status(200).send({
        result,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  allEmploye: async (req, res) => {
    try {
      const list = req.query.list
      const filter = req.query.filter;
      const page = req.query.page || 2;
      const limit = 6;
      const sort = req.query.sort || "ASC";
      const sortBy = req.query.sortBy || "name";
      const totalKaryawan = await user.count({
        where: { [Op.not]: { roleId: 1 } },
      });
      if (list) {
        if (filter) {
          const result = await user.findAll({
            where: { roleId: filter },
            order: [[sortBy, sort]],
            include: [{ model: salary }, { model: role }],
          });
          res.status(200).send({
            totalPage: Math.ceil(totalKaryawan / limit),
            page: page,
            result,
          });
        } else {
          const result = await user.findAll({
            where: { [Op.not]: { roleId: 1 } },
            order: [[sortBy, sort]],
            include: [{ model: salary }, { model: role }],
          });
          res.status(200).send({
            totalPage: Math.ceil(totalKaryawan / limit),
            page: page,
            result,
          });
        }
      }
      else {
        const result = await user.findAll({
          where: { [Op.not]: { roleId: 1 } },
          order: [[sortBy, sort]],
          limit,
          offset: limit * (page - 1),
          include: [{ model: salary }, { model: role }],
        });
        res.status(200).send({
          totalPage: Math.ceil(totalKaryawan / limit),
          page: page,
          result,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  keepLogin: async (req, res) => {
    try {
      const id = req.user.id;
      const result = await user.findOne({ where: { id: id } });
      res.status(200).send(result);
    } catch (error) {}
  },
  addSalary: async (req, res) => {
    try {
      const { gaji, userId } = req.body;
      const check = await salary.findOne({
        where: { userId: userId },
      });
      if (!check) {
        const result = await salary.create({ salary: gaji, userId: userId });
        res.status(200).send({
          message: "Berhasil Menambahkan Gaji Karyawan",
        });
      } else {
        await salary.update({ salary: gaji }, { where: { userId: userId } });
        res.status(200).send({
          message: "Berhasil Mengganti Gaji Karyawan",
        });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getAllRole: async (req, res) => {
    try {
      const result = await role.findAll({
        where: { Id: { [Op.not]: 1 } },
      });
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
