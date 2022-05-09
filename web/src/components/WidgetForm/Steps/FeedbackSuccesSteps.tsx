import { CloseButton } from "../../CloseButton";
import sucesso from '../../../assets/success.svg'

interface FeedbackSuccesStepsProps{
    onFeedbackRestart:()=>void
}

export function FeedbackSuccesSteps({onFeedbackRestart}:FeedbackSuccesStepsProps){
    return(
       <>
        <header>
            <CloseButton/>
        </header>

        <div className='flex flex-col items-center py-10 w-[304px]'>
            <img src={sucesso} alt="Imagem com sinal de checagem ok" />
            <span>Agradecemos o feedback!</span>
            <button
                onClick={onFeedbackRestart}
                className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent tst-sm leading-6 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
            >
                Quero enviar outro
            </button>
            
        </div>
       </>
    )
}