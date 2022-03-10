// 23/02/22 - Mauro
import Link from "next/link"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as S from '../styles/index'
import styles from '../styles/notFound.module.css'

interface NotFoundProps {
   timeout?: boolean
}


export default function NotFound( props: NotFoundProps ) {

   // Uso do optional chaining (?.)
   const timeout = (props?.timeout) ?? true;

   const router = useRouter();
   const [tempo, setTempo] = useState(10)

   useEffect(() => {
      if (tempo == 0) {
         router.push('/')
      }
      else {
         if (timeout) {
            setTimeout(() => {
               setTempo(tempo -1)
            }, 1000)
         }
      }
   })

   return (
      <div className={styles.notFound}>
         <S.Logo
            src="/img/oops.jpg"
            alt=""
            width='80px'
         />

         <h1>Página não encontrada!</h1>

         <h2>Volte para a <Link href='/'><a>página inicial</a></Link></h2>

         {timeout && <h2>(Você será redirecionado em {tempo} segundos!)</h2>}

         <style jsx>{`
            .not-found {
               padding: 30px;
            }
         `}</style>

      </div>
   )
}
