export interface SendMaildData{
    subject: string,
    body: string

}

export interface MailExternal{
    sendMail: (data: SendMaildData)=>Promise<void>
}

