import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { validateEmail, validatePassword } from '../utils/validators';

const RegisterRequest = [
  ...validateEmail(),
  ...validatePassword(),

  check('name')
    .notEmpty().withMessage('Name is required')
    .bail()
    .isLength({ min: 3, max: 8 }).withMessage('Name must be between 3 and 8 characters'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default RegisterRequest;