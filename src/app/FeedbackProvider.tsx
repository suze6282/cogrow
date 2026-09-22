import { CheckCircle2, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { FeedbackContext, type ConfirmOptions } from './feedback-context'

export function FeedbackProvider({children}:{children:React.ReactNode}){
  const[toast,setToast]=useState('');const[dialog,setDialog]=useState<ConfirmOptions|null>(null);const timer=useRef<number|null>(null)
  function notify(message:string){setToast(message);if(timer.current)window.clearTimeout(timer.current);timer.current=window.setTimeout(()=>setToast(''),2600)}
  function accept(){if(!dialog)return;const action=dialog.onConfirm;setDialog(null);action()}
  return <FeedbackContext.Provider value={{notify,confirm:setDialog}}>{children}{toast&&<div className="app-toast" role="status"><CheckCircle2/>{toast}</div>}{dialog&&<div className="modal-backdrop" role="presentation" onMouseDown={()=>setDialog(null)}><section className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title" onMouseDown={e=>e.stopPropagation()}><button className="dialog-close" aria-label="关闭" onClick={()=>setDialog(null)}><X/></button><span>请确认操作</span><h2 id="confirm-title">{dialog.title}</h2><p>{dialog.description}</p><div><button className="secondary-button" onClick={()=>setDialog(null)}>取消</button><button className="primary-button" onClick={accept}>{dialog.confirmLabel||'确认'}</button></div></section></div>}</FeedbackContext.Provider>
}
