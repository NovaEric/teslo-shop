import { tittleFont } from '@/config/font';

export default function Shop() {
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <div> Hola Mundo</div>
      <div className={`font-bold ${ tittleFont.className }`} > Hola Mundo</div>
      <div className={`${ tittleFont.className }`} > Hola Mundo</div>      
    </div>
  )
}
