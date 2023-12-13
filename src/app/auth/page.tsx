import { tittleFont } from '@/config/font';

export default function Auth() {
  return (
    <div className="flex flex-col items-center justify-between p-24">      
      <div className={`font-bold ${ tittleFont.className }`} > Auth</div>         
    </div>
  )
}
