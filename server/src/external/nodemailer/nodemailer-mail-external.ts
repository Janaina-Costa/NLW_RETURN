import { MailExternal, SendMaildData } from "../mail-external";
import nodemailer from 'nodemailer'


let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5403371f414332",
      pass: "8159222e528752"
    }
  });

export class NodemailerMailExternal implements MailExternal{
    async sendMail({subject,body }: SendMaildData){
        await transport.sendMail({
                from:'Equipe Forest <gump@forest.com> ',
                to:'Jana Costa <janainacosta.dev@gmail.com>',
                subject,
                html:body
        })
    }
}