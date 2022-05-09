import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

//verifica se função foi chamada
const createSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    {create: async()=>{}},
    {sendMail: async()=>{}}
)
describe('Submit feedback', () => {
    it('should be able to submit a feedback', async()=>{
        //testa se é possivel enviar o feedback
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'EXEMPLE',
            screenshot:'data:image/png;base64,353444ghgygd'

        })).resolves.not.toThrow()

        //verifica se função foi chamada
        expect(createSpy).toHaveBeenCalled;
        expect(sendMailSpy).toHaveBeenCalled;
    });

    //verifica de o throw error está funcionando
    it('should not be able to submit a feedback without type', async()=>{
        await expect(submitFeedback.execute({
            type:'',
            comment:'exmplo comentario',
            screenshot:'data:image/png;base64,353444ghgygd'

        })).rejects.toThrow()
    })
    it('should not be able to submit a feedback without comment', async()=>{
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'',
            screenshot:'data:image/png;base64,353444ghgygd'

        })).rejects.toThrow()
    })
    it('should not be able to submit a feedback wit valid screenshot format', async()=>{
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'teste comnte',
            screenshot:'datasss:image/png;base64,353444ghgygd'

        })).rejects.toThrow()
    })
})