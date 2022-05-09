import{ Popover } from '@headlessui/react'
import { X } from 'phosphor-react'


export function CloseButton(){
    return(
        <Popover.Button className="top-5 right-5 absolute text-zinc-400 hover:text-zinc-100 transition-colors focus:ring-brand-500 focus:outline-none focus:ring-2" title='Fechar formulario'>
            <X className="w-4 h-4" weight='bold'/>
        </Popover.Button>
    )
}