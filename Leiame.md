10/03/22

> npm i   # instala as dependências

. Criado o arquivo /tsconfig.js (vazio)

> npm install --save-dev @types/react @types/node

> npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

> npm install @mui/material @mui/styled-engine-sc styled-components

> npm install react-input-mask@next --save

> npm i @mui/x-data-grid


Gerar container: (14/03/22)

  > docker image build -t mtximai/portal-processual:1.0 .
  > docker image ls

  > docker run -p 3000:3000 -it --name portal-processual mtximai/portal-processual:1.0

  > docker login --username=mtximai
  > docker push mtximai/portal-processual:1.0

Atualizar kubernetes

  > cd f:\zProjetos\kubernetes\portal-processual

  Verifique se o context aponta para sisaud-d

  > kubectl delete -f .\portal-deploy.yml
  
  > kubectl apply -f .\portal-deploy.yml

  > kubectl get pod -n mauro-teste --watch

  imagePullPolicy: Always|IfNotPresent


> npm i react-split
  # https://github.com/nathancahill/split


Para instalar o Treeview (em desenvolvimento)

  > npm i @mui/lab

Para rodar a API no server-side:
  
  https://github.com/node-fetch/node-fetch

  > npm i node-fetch

PDF.js (28/03/22)
  
  https://mozilla.github.io/pdf.js/examples/

  > npm install pdfjs-dist
  > copy ./node_modules/pdfjs-dist/build/pdf.worker.min.js ./public/

pspdfkit

  > npm install pspdfkit
  > cp -R ./node_modules/pspdfkit/dist/pspdfkit-lib public/pspdfkit-lib



https://pdfobject.com  (open-source)

https://www.npmjs.com/package/react-pdfobject

> npm i react-pdfobject


