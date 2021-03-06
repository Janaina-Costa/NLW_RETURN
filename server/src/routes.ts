import express from 'express'
import nodemailer from 'nodemailer'
import { NodemailerMailExternal } from './external/nodemailer/nodemailer-mail-external';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()




routes.post('/feedbacks', async(req, res)=>{
    const {type, comment, screenshot} = req.body
    
    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const nodemailerMailExternal = new NodemailerMailExternal()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbackRepository, 
        nodemailerMailExternal
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })
    
   return res.status(201).send()
})