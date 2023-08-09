const { body, validationResult } = require("express-validator");

module.exports = {
    checkRegister: async (req, res, next) => {
        try {
            await body('name').notEmpty().withMessage('Nama Harus Di Isi!').run(req)
            await body('email').notEmpty().withMessage('Email Harus Di Isi!').isEmail().withMessage('Harus Berbentuk Email').run(req)
            await body('phoneNumber').notEmpty().withMessage('Nomor Handphone Harus Di Isi!').isMobilePhone().withMessage('Masukan Nomor Handphone Yang Sesuai').run(req)
            await body('password').notEmpty().withMessage('Password Harus Di Isi!').isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }).run(req)
            const validation = validationResult(req)
            if (validation.isEmpty()) {
                next()
            }
            else{
                res.status(400).send({
                    error: validation.array()
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}