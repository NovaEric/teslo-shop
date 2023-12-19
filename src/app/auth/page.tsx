import { titleFont } from '@/config/font';

export default function Auth() {
  return (
    <div className="flex flex-col items-center justify-between p-24">      
      <div className={`font-bold ${ titleFont.className }`} > Auth</div>         
    </div>
  )
}
