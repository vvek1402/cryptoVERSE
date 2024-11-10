import { check } from 'express-validator';

export const validateEmail = () => [
  check('email')
    .notEmpty().withMessage('Email is required').bail()
    .isEmail().withMessage('Invalid email address').bail()
    .isLength({ max: 30 }).withMessage('Email must be below 30 characters'),
];

export const validatePassword = () => [
  check('password')
    .notEmpty().withMessage('Password is required').bail()
    .isLength({ min: 4, max: 8 }).withMessage('Password must be between 4 and 8 characters'),
];
