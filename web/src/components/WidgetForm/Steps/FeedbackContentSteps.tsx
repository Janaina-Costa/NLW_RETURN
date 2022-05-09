import { ArrowLeft, Camera } from "phosphor-react"
import { useState, FormEvent  } from "react"
import { FeedbackType, feedbackTypes } from ".."
import { app } from "../../../services/api"
import { CloseButton } from "../../CloseButton"
import { Loading } from "../Loading"
import { ScreenshotButton } from "../ScreenshotButton"

interface FeedbackContentStepsProps{
    feedbackType: FeedbackType,
    onFeedbackRestart:()=>void,
    onFeedbackSent:()=>void

}


export function FeedbackContentSteps({
    feedbackType,
    onFeedbackRestart,
    onFeedbackSent
}:FeedbackContentStepsProps){
    const feedbackTypeInfo = feedbackTypes[feedbackType]

    //armazenando a screenshot que o usuario tirou
    const[screenshot, setScreenshot] = useState<string | null>(null)

    //pegado o texto do text area
    const[comment, setComment] = useState('')

    //mostrar loading do envio
    const[isLoadingSend, setIsLoadingSend] = useState(false)

    const handleContentUser=(e:FormEvent)=>{
        e.preventDefault()
        setIsLoadingSend(true)
        // console.log({
        //     screenshot,
        //     contentUser
        // })

        app.post('/feedbacks',{
            type:feedbackType,
            comment,
            screenshot

        })

        setIsLoadingSend(false)

        onFeedbackSent()
        
    }

    return(
        <>
        <header>
            <button 
            type='button'
            onClick={onFeedbackRestart}
            className="top-5 left-4 absolute text-zinc-400 hover:text-zinc-100 focus:ring-brand-500 focus:outline-none focus:ring-2" >
                <ArrowLeft weight='bold' className='w-4 h-4' />
            </button>
           <span className="text-xl leading-6 flex items-center gap-2" >
                <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
                {feedbackTypeInfo.title}
            </span>
           
           <CloseButton/>
       </header>
   
       <form className="my-4 w-full" onSubmit={handleContentUser}>
           <textarea 
           onChange={e=>setComment(e.target.value)}
           className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md hover:border-brand-500 focus:ring-brand-500 focus:outline-none focus:ring-2 resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin" 
           placeholder="Conte com detalhes o que está acontecendo..."
           />

           
        <footer className="flex gap-2 mt-2" >
            <ScreenshotButton
                screenshot={screenshot}
                onScreenshotTook = {setScreenshot}
            />

            <button
                type="submit"
                disabled={comment.length === 0 || isLoadingSend}
                className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            >
            {isLoadingSend? <Loading/>: "Enviar Feedback"}
            </button>
        </footer>
       </form>
           
   
   </>
    )
}