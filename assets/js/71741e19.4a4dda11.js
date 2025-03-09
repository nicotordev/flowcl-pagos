"use strict";(self.webpackChunkmy_docs=self.webpackChunkmy_docs||[]).push([[594],{1955:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>t});const r=JSON.parse('{"id":"flow-payments-api","title":"Pagos - FlowPayments","description":"La clase FlowPayments permite interactuar con la API de Pagos de Flow.cl, proporcionando m\xe9todos para crear, consultar y gestionar pagos realizados mediante la plataforma.","source":"@site/docs/payments.md","sourceDirName":".","slug":"/flow-payments-api","permalink":"/flowcl-pagos/docs/flow-payments-api","draft":false,"unlisted":false,"editUrl":"https://github.com/nicotordev/flowcl-pagos/edit/main/docusaurus/docs/docs/payments.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"id":"flow-payments-api","sidebar_position":3,"title":"Pagos - FlowPayments"},"sidebar":"tutorialSidebar","previous":{"title":"Flow.cl SDK para Node.js","permalink":"/flowcl-pagos/docs/intro"},"next":{"title":"Reembolsos - FlowRefunds","permalink":"/flowcl-pagos/docs/flow-refunds-api"}}');var d=s(4848),l=s(8453);const i={id:"flow-payments-api",sidebar_position:3,title:"Pagos - FlowPayments"},c="API de Pagos - FlowPayments",o={},t=[{value:"Inicializaci\xf3n",id:"inicializaci\xf3n",level:2},{value:"M\xe9todos Disponibles",id:"m\xe9todos-disponibles",level:2},{value:"Crear Pagos",id:"crear-pagos",level:3},{value:"Crear un pago",id:"crear-un-pago",level:4},{value:"Crear Pago por Email",id:"crear-pago-por-email",level:3},{value:"Consultar Estado del Pago",id:"consultar-estado-del-pago",level:2},{value:"Estado por Token",id:"estado-por-token",level:3},{value:"Estado por ID del Comercio",id:"estado-por-id-del-comercio",level:3},{value:"Estado por N\xfamero de Orden Flow",id:"estado-por-n\xfamero-de-orden-flow",level:3},{value:"Estado Extendido del Pago",id:"estado-extendido-del-pago",level:3},{value:"Por Token",id:"por-token",level:4},{value:"Por n\xfamero de orden Flow",id:"por-n\xfamero-de-orden-flow",level:4},{value:"Consultas de Pagos",id:"consultas-de-pagos",level:2},{value:"Listar Pagos Recibidos por Fecha",id:"listar-pagos-recibidos-por-fecha",level:3},{value:"Pagos Recibidos Extendidos por Fecha",id:"pagos-recibidos-extendidos-por-fecha",level:3},{value:"Manejo de Errores",id:"manejo-de-errores",level:2}];function a(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.header,{children:(0,d.jsx)(n.h1,{id:"api-de-pagos---flowpayments",children:"API de Pagos - FlowPayments"})}),"\n",(0,d.jsxs)(n.p,{children:["La clase ",(0,d.jsx)(n.code,{children:"FlowPayments"})," permite interactuar con la API de Pagos de Flow.cl, proporcionando m\xe9todos para crear, consultar y gestionar pagos realizados mediante la plataforma."]}),"\n",(0,d.jsx)(n.h2,{id:"inicializaci\xf3n",children:"Inicializaci\xf3n"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-typescript",children:"import Flow from '@nicotordev/flowcl-pagos';\n\nconst flow: Flow = new Flow(\n  'tu_api_key', // string\n  'tu_secret_key',\n  'sandbox', // o 'production'\n);\n\nconst payments = flow.payments;\n"})}),"\n",(0,d.jsx)(n.h2,{id:"m\xe9todos-disponibles",children:"M\xe9todos Disponibles"}),"\n",(0,d.jsx)(n.h3,{id:"crear-pagos",children:"Crear Pagos"}),"\n",(0,d.jsx)(n.h4,{id:"crear-un-pago",children:"Crear un pago"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-typescript",children:"payments.create(data: FlowCreatePaymentRequest): Promise<FlowCreatePaymentResponse>\n"})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"Request"})," (",(0,d.jsx)(n.code,{children:"FlowCreatePaymentRequest"}),"):"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"commerceOrder"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"subject"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"currency"}),": ",(0,d.jsx)(n.code,{children:"string"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"amount"}),": ",(0,d.jsx)(n.code,{children:"number"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"email"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"paymentMethod"}),": ",(0,d.jsx)(n.code,{children:"string"})," ",(0,d.jsx)(n.code,{children:"FlowPaymentMethods"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})," // Este parametro es un numero en la API de Flow, se hace una conversi\xf3n interna a string"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"urlReturn"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"urlConfirmation"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"optional"}),": ",(0,d.jsx)(n.code,{children:"Record<string, string>"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"timeout"}),": ",(0,d.jsx)(n.code,{children:"number"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"merchantId"}),": ",(0,d.jsx)(n.code,{children:"string"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"paymentCurrency"}),": ",(0,d.jsx)(n.code,{children:"string"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"Response"})," (",(0,d.jsx)(n.code,{children:"FlowCreatePaymentResponse"}),"):"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"token"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"url"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"flowOrder"}),": ",(0,d.jsx)(n.code,{children:"number"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"redirectUrl"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"crear-pago-por-email",children:"Crear Pago por Email"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-typescript",children:"payments.createByEmail(data: FlowCreatePaymentByEmailRequest): Promise<FlowCreatePaymentByEmailResponse>\n"})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"Request"})," (",(0,d.jsx)(n.code,{children:"FlowCreatePaymentByEmailRequest"}),"):"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"commerceOrder"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"subject"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"currency"}),": ",(0,d.jsx)(n.code,{children:"string"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"amount"}),": ",(0,d.jsx)(n.code,{children:"number"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"email"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"paymentMethod"}),": ",(0,d.jsx)(n.code,{children:"string"})," ",(0,d.jsx)(n.code,{children:"FlowPaymentMethods"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})," // Este parametro es un numero en la API de Flow, se hace una conversi\xf3n interna a string"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"urlConfirmation"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"urlReturn"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"optional"}),": ",(0,d.jsx)(n.code,{children:"string"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"timeout"}),": ",(0,d.jsx)(n.code,{children:"number"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"merchantId"}),": ",(0,d.jsx)(n.code,{children:"string"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"payment_currency"}),": ",(0,d.jsx)(n.code,{children:"string"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"Response"})," (",(0,d.jsx)(n.code,{children:"FlowCreatePaymentByEmailResponse"}),"):"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"token"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"url"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"flowOrder"}),": ",(0,d.jsx)(n.code,{children:"number"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"redirectUrl"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"consultar-estado-del-pago",children:"Consultar Estado del Pago"}),"\n",(0,d.jsx)(n.h3,{id:"estado-por-token",children:"Estado por Token"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-typescript",children:"payments.status.byToken(token: string): Promise<FlowPaymentStatusResponse>\n"})}),"\n",(0,d.jsx)(n.h3,{id:"estado-por-id-del-comercio",children:"Estado por ID del Comercio"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-typescript",children:"payments.status.byCommerceId(commerceId: string): Promise<FlowPaymentStatusResponse>\n"})}),"\n",(0,d.jsx)(n.h3,{id:"estado-por-n\xfamero-de-orden-flow",children:"Estado por N\xfamero de Orden Flow"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-typescript",children:"payments.status.byFlowOrder(flowOrder: number): Promise<FlowPaymentStatusResponse>\n"})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"Response"})," (",(0,d.jsx)(n.code,{children:"FlowPaymentStatusResponse"}),"):"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"flowOrder"}),": ",(0,d.jsx)(n.code,{children:"number"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"commerceOrder"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"requestDate"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"status"}),": ",(0,d.jsx)(n.code,{children:"number"})," ",(0,d.jsx)(n.code,{children:"1 | 2 | 3 | 4"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"statusStr"}),": ",(0,d.jsx)(n.code,{children:"FlowPaymentStatus"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"subject"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"currency"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"amount"}),": ",(0,d.jsx)(n.code,{children:"number"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"payer"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"optional"}),": ",(0,d.jsx)(n.code,{children:"string | null"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"pendingInfo"}),": ",(0,d.jsx)(n.code,{children:"{"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"media"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"date"}),": ",(0,d.jsx)(n.code,{children:"string"}),"\n",(0,d.jsx)(n.code,{children:"}"})]}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"paymentData"}),": ",(0,d.jsx)(n.code,{children:"{"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"date"}),": string | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"media"}),": string | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"conversionDate"}),": string | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"conversionRate"}),": number | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"amount"}),": number | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"currency"}),": string | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"fee"}),": number | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"balance"}),": number | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"transferDate"}),": string | null;\n",(0,d.jsx)(n.code,{children:"}"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"merchantId"}),": ",(0,d.jsx)(n.code,{children:"string"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"estado-extendido-del-pago",children:"Estado Extendido del Pago"}),"\n",(0,d.jsx)(n.h4,{id:"por-token",children:"Por Token"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-typescript",children:"payments.statusExtended.byToken(token: string): Promise<FlowPaymentsStatusExtendedResponse>\n"})}),"\n",(0,d.jsx)(n.h4,{id:"por-n\xfamero-de-orden-flow",children:"Por n\xfamero de orden Flow"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-typescript",children:"payments.statusExtended.byFlowOrder(flowOrder: number): Promise<FlowPaymentsStatusExtendedResponse>\n"})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.strong,{children:"Response"})," (",(0,d.jsx)(n.code,{children:"FlowPaymentsStatusExtendedResponse"}),"):","\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"flowOrder"}),": ",(0,d.jsx)(n.code,{children:"number"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"commerceOrder"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"requestDate"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"status"}),": ",(0,d.jsx)(n.code,{children:"1 | 2 | 3 | 4"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"statusStr"}),": ",(0,d.jsx)(n.code,{children:"FlowPaymentStatus"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"subject"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"currency"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"amount"}),": ",(0,d.jsx)(n.code,{children:"number"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"payer"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"optional"}),": ",(0,d.jsx)(n.code,{children:"Record<string, unknown> | null"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"pendingInfo"}),": ",(0,d.jsx)(n.code,{children:"{"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"media"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"date"}),": ",(0,d.jsx)(n.code,{children:"string"}),"\n",(0,d.jsx)(n.code,{children:"}"})]}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"paymentData"}),": ",(0,d.jsx)(n.code,{children:"{"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"date"}),": string | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"media"}),": string | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"conversionDate"}),": string | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"conversionRate"}),": number | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"amount"}),": number | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"currency"}),": string | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"fee"}),": number | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"balance"}),": number | null;"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"transferDate"}),": string | null;\n",(0,d.jsx)(n.code,{children:"}"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"paymentCurrency"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"paymentAmount"}),": ",(0,d.jsx)(n.code,{children:"number"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"paymentMethod"}),": ",(0,d.jsx)(n.code,{children:"string"})," ",(0,d.jsx)(n.code,{children:"FlowPaymentMethods"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})," // Este parametro es un numero en la API de Flow, se hace una conversi\xf3n interna a string"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"merchantId"}),": ",(0,d.jsx)(n.code,{children:"string"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"lastError"}),": ",(0,d.jsx)(n.code,{children:"{"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"medioCode"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"code"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"message"}),": ",(0,d.jsx)(n.code,{children:"string"}),"\n",(0,d.jsx)(n.code,{children:"}"}),(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"consultas-de-pagos",children:"Consultas de Pagos"}),"\n",(0,d.jsx)(n.h3,{id:"listar-pagos-recibidos-por-fecha",children:"Listar Pagos Recibidos por Fecha"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-typescript",children:"payments.listPaymentsByDate(data: FlowPaymentsReceivedByDateRequest): Promise<FlowPaymentsReceivedByDateResponse>\n"})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"Request"})," (",(0,d.jsx)(n.code,{children:"FlowPaymentsReceivedByDateRequest"}),"):"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"date"}),": ",(0,d.jsx)(n.code,{children:"string | Date"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"start"}),": ",(0,d.jsx)(n.code,{children:"number"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"limit"}),": ",(0,d.jsx)(n.code,{children:"number"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"Response"})," (",(0,d.jsx)(n.code,{children:"FlowPaymentsReceivedByDateResponse"}),"):"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"total"}),": ",(0,d.jsx)(n.code,{children:"number"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"hasMore"}),": ",(0,d.jsx)(n.code,{children:"0 | 1"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"data"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"pagos-recibidos-extendidos-por-fecha",children:"Pagos Recibidos Extendidos por Fecha"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-typescript",children:"payments.listPaymentsExtendedByDate(data: FlowTransactionsReceivedByDateRequest): Promise<FlowTransactionsReceivedByDateResponse>\n"})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"Request"})," (",(0,d.jsx)(n.code,{children:"FlowTransactionsReceivedByDateRequest"}),"):"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"date"}),": ",(0,d.jsx)(n.code,{children:"string | Date"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"start"}),": ",(0,d.jsx)(n.code,{children:"number"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"limit"}),": ",(0,d.jsx)(n.code,{children:"number"})," ",(0,d.jsx)(n.em,{children:"(opcional)"})]}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"Response"})," (",(0,d.jsx)(n.code,{children:"FlowTransactionsReceivedByDateResponse"}),"):"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"total"}),": ",(0,d.jsx)(n.code,{children:"number"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"hasMore"}),": ",(0,d.jsx)(n.code,{children:"0 | 1"})]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"data"}),": ",(0,d.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"manejo-de-errores",children:"Manejo de Errores"}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Error"}),(0,d.jsx)(n.th,{children:"Descripci\xf3n"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"FlowAPIError"})}),(0,d.jsx)(n.td,{children:"Error general de API de Flow."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"FlowCreatePaymentError"})}),(0,d.jsx)(n.td,{children:"Error al crear un pago."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"FlowCreatePaymentByEmailError"})}),(0,d.jsx)(n.td,{children:"Error al crear un pago por email."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"FlowPaymentStatusError"})}),(0,d.jsx)(n.td,{children:"Error al obtener el estado del pago."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"FlowPaymentsListError"})}),(0,d.jsx)(n.td,{children:"Error al listar pagos por fecha."})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:(0,d.jsx)(n.code,{children:"FlowPaymentsStatusExtendedError"})}),(0,d.jsx)(n.td,{children:"Error al obtener el estado extendido del pago."})]})]})]}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsxs)(n.p,{children:["Para informaci\xf3n adicional, visita la documentaci\xf3n oficial: ",(0,d.jsx)(n.a,{href:"https://www.flow.cl/docs/api.html#tag/payment",children:"Flow.cl API Docs - Payments"}),"."]}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.strong,{children:"Nota:"})," Implementa siempre control de errores robusto en tu aplicaci\xf3n."]})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>c});var r=s(6540);const d={},l=r.createContext(d);function i(e){const n=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:i(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);