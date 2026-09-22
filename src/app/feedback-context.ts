import { createContext, useContext } from 'react'
export type ConfirmOptions={title:string;description:string;confirmLabel?:string;onConfirm:()=>void}
export type FeedbackContextValue={notify:(message:string)=>void;confirm:(options:ConfirmOptions)=>void}
export const FeedbackContext=createContext<FeedbackContextValue|null>(null)
export function useFeedback(){const value=useContext(FeedbackContext);if(!value)throw new Error('useFeedback must be used inside FeedbackProvider');return value}
