const {body, validationResult} = require('express-validator');

exports.registerValidation = [
    body('username')
            .isLength({min:6}).withMessage('username must be at least 6 characters')
            .notEmpty().withMessage('Name is not be empty')
            .matches(/^[A-Za-z][A-Za-z0-9_\s]*$/).withMessage("Name must start with an alphabet"),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('enter a valid email'),
    body('password')
        // .notEmpty().withMessage('Password is required')
        // .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).withMessage("Password must contain at least one alphabet, one number, and one special character")
        // .isLength({min:5}).withMessage('password must be at least 5 characters')
]

exports.handleValidationErrors = (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      next();
    
      console.log(errors);
      
}