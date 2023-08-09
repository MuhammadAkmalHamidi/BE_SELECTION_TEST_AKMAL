const { Sequelize, Op } = require('sequelize')
const db = require('../models')
const salary = db.salaries
const absen = db.dataAbsen


module.exports = {
        monthSalary: async (req, res) => {
            try {
              const userId = req.user.id;
              const history = await absen.findAll({
                where: {
                  userId: userId,
                },
                attributes: [
                  [Sequelize.fn('YEAR', Sequelize.col('createdAt')), 'year'],
                  [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'month'],
                  [Sequelize.fn('SUM', Sequelize.col('dailySalary')), 'totalSalary'],
                ],
                group: [
                  Sequelize.fn('YEAR', Sequelize.col('createdAt')),
                  Sequelize.fn('MONTH', Sequelize.col('createdAt')),
                ],
              });
              res.status(200).send(history);
            }catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }
}