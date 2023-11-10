const { Op } = require("sequelize");
const db = require("../models");
const absen = db.dataAbsen;
const user = db.user;
const salary = db.salaries;

module.exports = {
  clockIn: async (req, res) => {
    try {
      const userId = req.user.id;
      const { shiftId } = req.query;
      const currentTime = new Date();
      const timeOffSet = 7 * 60 * 60 * 1000;
      const timeInIndonesia = new Date(currentTime.getTime() + timeOffSet);
      const totalSalary = await salary.findOne({ where: { userId: userId } });
      const dailySalary = Math.floor(totalSalary.salary / 25);

      const check = await absen.findOne({
        where: {
          userId: userId,
          clockIn: {
            [Op.and]: {
              [Op.gte]: new Date(new Date().setHours(7, 0, 0, 0)),
              [Op.lte]: new Date(new Date().setHours(30, 59, 59, 999)),
            },
          },
        },
      });

      if (!check) {
        if (shiftId == 1) {
          const targetTime = new Date(timeInIndonesia);
          targetTime.setHours(13, 30, 0, 0)
          const halfShift = Math.floor(dailySalary / 2);
          const telat = Math.floor((timeInIndonesia.getTime() - targetTime.getTime()) /(60 * 60 * 1000));          
          console.log(targetTime);
          console.log(halfShift);
          console.log(telat);
          if (telat >= 1) {
            try {
              await absen.create({
                clockIn: timeInIndonesia,
                userId: userId,
                dailySalary: halfShift - 5000 * telat,
                shiftId,
              });
              res.status(200).send({
                message: "Absen masuk berhasil",
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              await absen.create({
                clockIn: timeInIndonesia,
                userId: userId,
                dailySalary: halfShift,
                shiftId,
              });
              res.status(200).send({
                message: "Absen masuk berhasil",
              });
            } catch (error) {
              console.log(error);
            }
          }
        }else if (shiftId == 2) {
          const targetTime = new Date(timeInIndonesia);
          targetTime.setHours(18, 0, 0, 0)
          const halfShift = Math.floor(dailySalary / 2);
          const telat = Math.floor((timeInIndonesia.getTime() - targetTime.getTime()) /(60 * 60 * 1000));          
          console.log(targetTime);
          console.log(halfShift);
          console.log(telat);
          if (telat >= 1) {
            try {
              await absen.create({
                clockIn: timeInIndonesia,
                userId: userId,
                dailySalary: halfShift - 5000 * telat,
                shiftId,
              });
              res.status(200).send({
                message: "Absen masuk berhasil",
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              await absen.create({
                clockIn: timeInIndonesia,
                userId: userId,
                dailySalary: halfShift,
                shiftId,
              });
              res.status(200).send({
                message: "Absen masuk berhasil",
              });
            } catch (error) {
              console.log(error);
            }
          }
        }
      } else {
        throw {
          message: "Sudah absen masuk",
        };
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  clockOut: async (req, res) => {
    try {
      const userId = req.user.id;
      const { shiftId } = req.query;
      const currentTime = new Date();
      const timeOffSet = 7 * 60 * 60 * 1000;
      const timeInIndonesia = new Date(currentTime.getTime() + timeOffSet);
      const totalSalary = await salary.findOne({ where: { userId: userId } });
      const dailySalary = Math.floor(totalSalary.salary / 25);
      const halfShift = Math.floor(dailySalary / 2);

      const check = await absen.findOne({
        where: {
          userId: userId,
          clockOut: {
            [Op.and]: {
              [Op.gte]: new Date(new Date().setHours(7, 0, 0, 0)),
              [Op.lte]: new Date(new Date().setHours(30, 59, 59, 999)),
            },
          },
        },
      });
      const check2 = await absen.findOne({
        where: {
          userId: userId,
          clockIn: {
            [Op.and]: {
              [Op.gte]: new Date(new Date().setHours(7, 0, 0, 0)),
              [Op.lte]: new Date(new Date().setHours(30, 59, 59, 999)),
            },
          },
        },
      });

      if (!check2 && !check) {
        await absen.create({
          clockOut: timeInIndonesia,
          userId: userId,
          dailySalary: halfShift,
          shiftId,
        });
        res.status(200).send({
          message: "Absen keluar berhasil",
        });
      }

      if (!check && check2) {
        await absen.update(
          {
            clockOut: timeInIndonesia,
            dailySalary: check2.dailySalary + halfShift,
          },
          {
            where: {
              userId: userId,
              clockIn: {
                [Op.and]: {
                  [Op.gte]: new Date(new Date().setHours(7, 0, 0, 0)),
                  [Op.lte]: new Date(new Date().setHours(30, 59, 59, 999)),
                },
              },
            },
          }
        );

        res.status(200).send({
          message: "Absen keluar berhasil",
        });
      } if (check) {
        throw {
          message: "Sudah absen keluar",
        };
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  riwayatAbsen: async (req, res) => {
    try {
      const sort = req.query.sort || "DESC";
      const sortBy = req.query.sortBy || "createdAt";
      const userId = req.user.id;
      const result = await absen.findAll({
        where: { userId: userId },
        order: [[sortBy, sort]],
      });
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
