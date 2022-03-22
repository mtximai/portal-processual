// 14/03/22 - Lib padrão (Mauro)


// Chamada ao serviço
// 1) Retorna uma promise
// 2) Se der resposta diferente de 200 retorna null
// 204 No content
export async function getServicePromise(url: string) {

  return new Promise( (resolve, reject) => {
    fetch(url)
      .then((response) => {
        return (response.status == 200) ? response.json() : null
      })
      .then( (data) => {
        resolve(data)
      })
      .catch(e => reject(e))
  })
}


/*
const d = getService(`${mEtcm}/api/portaljurisdicionado/AreaAtual`)
          .then( (r: object[]) => {

            let dados = (r == null ? [] : r)

            setDados(dados)
            setLoading(false)
            setMsg(`Processamento concluído: ${dados.length} registro(s) encotrados!`)
          })
          .catch( (e) => {
            setDados([])
            setLoading(false)
            setMsg('Erro: falha na obtenção dos dados!')
            console.log(e)
          })
*/

export async function getServiceCallback(url: string, cbSucesso: any, cbErro: any) {

  fetch(url)
    .then((response) => {
      return (response.status == 200) ? response.json() : null
    })
    .then( (data) => {
      cbSucesso(data)
    })
    .catch(e => cbErro(e))
}
