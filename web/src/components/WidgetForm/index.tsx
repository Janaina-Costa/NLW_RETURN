import { useState } from "react";

import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { FeedbackTypesSteps } from "./Steps/FeedbackTypesSteps";
import { FeedbackContentSteps } from "./Steps/FeedbackContentSteps";
import { FeedbackSuccesSteps } from "./Steps/FeedbackSuccesSteps";

//ciando objeto para as imagens dos botões
export const feedbackTypes={
    BUG:{
       title: 'Problema',
       image:{
           source: bugImageUrl,
           alt:'imagem de um verminho representando bug'
       }
    },
    IDEA:{
        title:'Ideia',
        image:{
            source: ideaImageUrl,
            alt:'imagem de uma lampaga representando ideia'
        }
    },
    OTHER:{
        title:'Outro',
        image:{
            source: thoughtImageUrl,
            alt:'imagem de uma nuvem representando pensar'
        }
    }
}

//tipando os dados para usar na alteração do estado ao clicar no botao
export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm(){
    const[feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    
    //veerifica se já submeteu o feedback
    const[feedbackSent, setFeedbackSent]= useState(false)

    //retornando a tela de botões do widget
    function handleRestartFeedback(){
        setFeedbackSent(false)
        setFeedbackType(null)
    }

    return(
        <div className="bg-[#18181B] p-4 relative rounded-2xl flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto mb-4">
            
            {feedbackSent?(
               <FeedbackSuccesSteps 
                onFeedbackRestart = {handleRestartFeedback}
               /> 
            ):(
               <>
                 {
                    (!feedbackType)?(
                        <FeedbackTypesSteps 
                        onFeedbackTypesChaged={setFeedbackType}
                        />
                        ): (
                            <FeedbackContentSteps 
                            feedbackType={feedbackType} 
                            onFeedbackRestart = {handleRestartFeedback}
                            onFeedbackSent = {() =>setFeedbackSent(true)}
                        />
                    )}
               </>
            )}

            

            <footer className="text-xs text-neutral-400">
            Feito com ♥ pela <a className="underline underline-offset-2" href="https://www.rocketseat.com.br/" target="_blank" >Rocketseat</a> 
            </footer>
        </div>
    )
}