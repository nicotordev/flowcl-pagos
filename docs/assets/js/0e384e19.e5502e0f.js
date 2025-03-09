"use strict";(self.webpackChunkmy_docs=self.webpackChunkmy_docs||[]).push([[976],{7879:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>p,frontMatter:()=>r,metadata:()=>i,toc:()=>t});const i=JSON.parse('{"id":"intro","title":"Flow.cl SDK para Node.js","description":"Flow.cl","source":"@site/docs/intro.md","sourceDirName":".","slug":"/intro","permalink":"/flowcl-pagos/docs/intro","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/intro.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"id":"intro","sidebar_position":2,"title":"Flow.cl SDK para Node.js"},"sidebar":"tutorialSidebar","previous":{"title":"Gu\xeda R\xe1pida de Integraci\xf3n","permalink":"/flowcl-pagos/docs/quick-start"},"next":{"title":"Pagos - FlowPayments","permalink":"/flowcl-pagos/docs/flow-payments-api"}}');var l=s(4848),o=s(8453);const r={id:"intro",sidebar_position:2,title:"Flow.cl SDK para Node.js"},c="Flow.cl SDK para Node.js",a={},t=[{value:"\ud83d\ude80 \xbfQu\xe9 es este SDK?",id:"-qu\xe9-es-este-sdk",level:2},{value:"\ud83d\udcda Funcionalidades principales",id:"-funcionalidades-principales",level:2},{value:"\ud83d\udce6 Instalaci\xf3n",id:"-instalaci\xf3n",level:2},{value:"\u2699\ufe0f Uso r\xe1pido",id:"\ufe0f-uso-r\xe1pido",level:2},{value:"\ud83d\udcd6 Documentaci\xf3n Completa",id:"-documentaci\xf3n-completa",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"flowcl-sdk-para-nodejs",children:"Flow.cl SDK para Node.js"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.img,{src:"https://www.flow.cl/images/header/logo-flow.svg",alt:"Flow.cl"})}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.a,{href:"https://www.npmjs.com/package/@nicotordev/flowcl-pagos",children:(0,l.jsx)(n.img,{src:"https://img.shields.io/npm/v/@nicotordev/flowcl-pagos.svg",alt:"NPM Version"})}),"\n",(0,l.jsx)(n.img,{src:"https://img.shields.io/github/license/nicotordev/flowcl-pagos",alt:"LICENSE"}),"\n",(0,l.jsx)(n.img,{src:"https://github.com/nicotordev/flowcl-pagos/actions/workflows/test.yml/badge.svg?style=flat-square",alt:"Tests"})]}),"\n",(0,l.jsx)(n.h2,{id:"-qu\xe9-es-este-sdk",children:"\ud83d\ude80 \xbfQu\xe9 es este SDK?"}),"\n",(0,l.jsxs)(n.p,{children:["Este SDK proporciona una forma sencilla y eficiente de integrar la API de ",(0,l.jsx)(n.a,{href:"https://www.flow.cl/",children:"Flow.cl"})," en aplicaciones Node.js y TypeScript, facilitando procesos de pagos y gesti\xf3n de transacciones."]}),"\n",(0,l.jsx)(n.h2,{id:"-funcionalidades-principales",children:"\ud83d\udcda Funcionalidades principales"}),"\n",(0,l.jsx)(n.p,{children:"Este paquete permite gestionar f\xe1cilmente:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u2705 ",(0,l.jsx)(n.strong,{children:"Pagos"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u2705 ",(0,l.jsx)(n.strong,{children:"Clientes"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u2705 ",(0,l.jsx)(n.strong,{children:"Planes de suscripci\xf3n"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u2705 ",(0,l.jsx)(n.strong,{children:"Suscripciones e \xedtems de suscripci\xf3n"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u2705 ",(0,l.jsx)(n.strong,{children:"Reembolsos"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u2705 ",(0,l.jsx)(n.strong,{children:"Cupones"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u2705 ",(0,l.jsx)(n.strong,{children:"Facturas (Invoices)"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u2705 ",(0,l.jsx)(n.strong,{children:"Liquidaciones (Settlements)"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u2705 ",(0,l.jsx)(n.strong,{children:"Informaci\xf3n del comercio (Merchant)"})]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"-instalaci\xf3n",children:"\ud83d\udce6 Instalaci\xf3n"}),"\n",(0,l.jsx)(n.p,{children:"Con npm:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sh",children:"npm install @nicotordev/flowcl-pagos\n"})}),"\n",(0,l.jsx)(n.p,{children:"O utilizando Yarn:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sh",children:"yarn add @nicotordev/flowcl-pagos\n"})}),"\n",(0,l.jsx)(n.h2,{id:"\ufe0f-uso-r\xe1pido",children:"\u2699\ufe0f Uso r\xe1pido"}),"\n",(0,l.jsx)(n.p,{children:"Importa y configura el cliente de forma sencilla:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-typescript",children:"import Flow from '@nicotordev/flowcl-pagos';\n\nconst flow = new Flow(\n  'tu_api_key',\n  'tu_secret_key',\n  'sandbox', // Cambia a 'production' en entorno real\n);\n"})}),"\n",(0,l.jsx)(n.p,{children:"\xa1Listo! Ya puedes empezar a interactuar con la API de Flow.cl."}),"\n",(0,l.jsx)(n.h2,{id:"-documentaci\xf3n-completa",children:"\ud83d\udcd6 Documentaci\xf3n Completa"}),"\n",(0,l.jsx)(n.p,{children:"Explora la documentaci\xf3n detallada para aprovechar al m\xe1ximo todas las funcionalidades del SDK:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://www.flow.cl/docs/api.html",children:"\ud83d\udcd8 Documentaci\xf3n Oficial"})}),"\n"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"./quick-start",children:"\ud83d\udee0\ufe0f Gu\xeda de Integraci\xf3n R\xe1pida"})}),"\n"]}),"\n",(0,l.jsx)(n.hr,{}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Nota:"})," Aseg\xfarate siempre de manejar correctamente los errores en tu aplicaci\xf3n para ofrecer una mejor experiencia a tus usuarios."]})]})}function p(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>c});var i=s(6540);const l={},o=i.createContext(l);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:r(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);