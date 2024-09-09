const express = require('express');
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { User } = require('../models'); 
const { generateToken, verifyToken } = require('./utils/jwt');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
       user: 'jasmin92@ethereal.email',
        pass: 'gqbbSQUQhcpJwpPPhd'
    }
});

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already in use"
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

    
        const newUser = await User.create(
            { first_name, last_name, email,  
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            data: newUser,
            message: "User created successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

    
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

    
        const token = generateToken(user.id);

        res.status(200).json({
            success: true,
            user,
            token,
            message: "Login successful"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


router.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user,
            message: "User found"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetToken = resetToken;
        user.tokenTime = new Date();
        await user.save();

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`; // Update as needed

        const mailOptions = {
            from: 'deepak',
            to: user.email,
            subject: 'Password Reset',
            text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Password reset link sent to email"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
  router.post('/reset_pass/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { password, confirmPassword } = req.body;

    
        const user = await User.findOne({ where: { id: id } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid or expired reset token"
            });
        }



    
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        user.password = hashedPassword;
        user.resetToken = null;
        user.tokenTime = null;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

module.exports = router;
