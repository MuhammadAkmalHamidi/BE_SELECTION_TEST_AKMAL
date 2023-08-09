const { Op } = require('sequelize');
const db = require('../models')
const absen = db.dataAbsen
const user = db.user
const salary = db.salaries

module.exports = {
    clockIn: async (req, res) => {
        try {
            const userId = req.user.id;
            const currentTime = new Date()
            const timeOffSet = 7 * 60 * 60 * 1000
            const timeInIndonesia = new Date(currentTime.getTime() + timeOffSet)
            const totalSalary = await salary.findOne(
                {where : {userId : userId}}
            )
            const dailySalary = Math.floor(totalSalary.salary / 30)
            const halfShift = Math.floor(dailySalary / 2)

            const check = await absen.findOne({
                where: {
                    userId: userId,
                    clockIn: {
                        [Op.and]: {
                            [Op.gte] : new Date(new Date().setHours(7, 0, 0, 0)),
                            [Op.lte] : new Date(new Date().setHours(30, 59, 59, 999))
                        }
                    }
                }
            });
    
            if (!check) {
                await absen.create({
                    clockIn: timeInIndonesia,
                    userId: userId,
                    dailySalary : halfShift
                });
    
                res.status(200).send({
                    message: 'Absen masuk berhasil'
                });
            } else {
                throw {
                    message: 'Sudah absen masuk'
                };
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    clockOut : async (req, res) => {
        try {
            const userId = req.user.id;
            const currentTime = new Date()
            const timeOffSet = 7 * 60 * 60 * 1000
            const timeInIndonesia = new Date(currentTime.getTime() + timeOffSet)
            const totalSalary = await salary.findOne(
                {where : {userId : userId}}
            )
            const dailySalary = Math.floor(totalSalary.salary / 30)
            const halfShift = Math.floor(dailySalary / 2)

            const check = await absen.findOne({
                where: {
                    userId: userId,
                    clockOut: {
                        [Op.and]: {
                            [Op.gte] : new Date(new Date().setHours(7, 0, 0, 0)),
                            [Op.lte] : new Date(new Date().setHours(30, 59, 59, 999))
                        }
                    }
                }
            });
            const check2 = await absen.findOne({
                where: {
                    userId: userId,
                    clockIn: {
                        [Op.and]: {
                            [Op.gte] : new Date(new Date().setHours(7, 0, 0, 0)),
                            [Op.lte] : new Date(new Date().setHours(30, 59, 59, 999))
                        }
                    }
                }
            });

            if (!check2 && !check) {
                await absen.create({
                    clockOut: timeInIndonesia,
                    userId: userId,
                    dailySalary : halfShift
                });
                res.status(200).send({
                    message: 'Absen keluar berhasil'
                })
            }

            if (!check && check2) {
                await absen.update({
                    clockOut: timeInIndonesia,
                    dailySalary : dailySalary
                },
                {
                    where : {userId : userId ,
                        clockIn: {
                            [Op.and]: {
                                [Op.gte] : new Date(new Date().setHours(7, 0, 0, 0)),
                                [Op.lte] : new Date(new Date().setHours(30, 59, 59, 999))
                            }
                        }

                    }
                }
                );
            
                res.status(200).send({
                    message: 'Absen keluar berhasil'
                });
            } else {
                throw {
                    message: 'Sudah absen keluar'
                }
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    riwayatAbsen : async (req, res) => {
        try {
            const sort = req.query.sort || "DESC"
            const sortBy = req.query.sortBy || "createdAt"
            const userId = req.user.id
            const result = await absen.findAll(
                {
                    where : {userId : userId},
                    order : [[sortBy, sort]],
                }
                )
            res.status(200).send(result)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }
}