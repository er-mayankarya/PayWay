import express, { Router } from 'express';
import mongoose from 'mongoose';
import { authMiddleware } from '../middleware.js';
import { accountModel } from '../db.js';

export const accountRouter = Router();

accountRouter.get('/balance' , authMiddleware , async (req , res) => {

    const account = await accountModel.findOne({
        userId : req.userId
    })

    res.json({
        balance : account.balance
    })

})

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await accountModel.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        });
    }

    const toAccount = await accountModel.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        });
    }

    // Perform the transfer
    await accountModel.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await accountModel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer Successful"
    });
});