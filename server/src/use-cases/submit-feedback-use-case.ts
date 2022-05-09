//usando principio da inversaõ da dependencia. injeta inversamente o prisma na aplicação
//caso precise trocar o orm este codigo de serviço nao será impeditivo
//pois não está amarrado o orm especifico

import { MailExternal } from "../external/mail-external"
import { FeedbackRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest{
    type:string,
    comment:string,
    screenshot?:string
}

export class SubmitFeedbackUseCase{
    constructor(
        private feedbackReposytory: FeedbackRepository,
        private mailExternal:  MailExternal
    ){}
    async execute(request:SubmitFeedbackUseCaseRequest){
        const {type, comment, screenshot} = request

        if(!type){
            throw new Error('Type is requered.')
        }
        if(!comment){
            throw new Error('Comment is requered.')
        }
        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format')
        }

        await this.feedbackReposytory.create({
            type,
            comment,
            screenshot
        })

        await this.mailExternal.sendMail({
            subject:'Feedback novo',
            body:[
                `<div style= "font-family: sans-serif; font-size:16px; color:#00008B">`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                 screenshot? `<img width ="240px" src="${screenshot} "/>` : '',
                `</div>`
                
            ].join('\n')
        })


    }
}