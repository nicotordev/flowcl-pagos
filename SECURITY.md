# Política de seguridad

Gracias por ayudar a mantener `@nicotordev/flowcl-pagos` seguro.

Este repositorio contiene un SDK de TypeScript para integrar aplicaciones con la [API de Flow.cl](https://www.flow.cl/). Los reportes deben referirse a vulnerabilidades en **este paquete** (código, dependencias o documentación del SDK), no a incidentes de cuentas, pagos o infraestructura operada por Flow.cl.

## Versiones con soporte

| Versión | Soporte        |
| ------- | -------------- |
| 10.x    | ✅ Soportada   |
| < 10.0  | ❌ Sin soporte |

Solo la última versión publicada en npm recibe correcciones de seguridad cuando aplica.

## Alcance

**Dentro de alcance**

- Vulnerabilidades en el código fuente de este repositorio
- Problemas en dependencias directas o transitivas del paquete npm
- Filtrado accidental de secretos, datos sensibles o información de depuración en el SDK
- Debilidades en la generación o uso de firmas HMAC del cliente
- Manejo inseguro de errores, logs o datos de respuesta de la API

**Fuera de alcance**

- Vulnerabilidades en los servidores, panel o API de Flow.cl
- Compromiso de `apiKey`, `secretKey` o tokens por mala configuración en la aplicación que consume el SDK
- Phishing, ingeniería social o fraude en pagos
- Problemas en forks, paquetes no oficiales o versiones no publicadas por `@nicotordev`

## Cómo reportar una vulnerabilidad

**No abras un issue público** con detalles de seguridad.

Envía un reporte privado por uno de estos canales:

1. **GitHub Security Advisories** (recomendado): [Reportar una vulnerabilidad](https://github.com/nicotordev/flowcl-pagos/security/advisories/new)
2. **Correo**: [nicotordev@gmail.com](mailto:nicotordev@gmail.com) con asunto `SECURITY: flowcl-pagos`

Incluye, si es posible:

- Descripción del problema y su impacto
- Pasos para reproducirlo o un proof of concept
- Versión afectada del paquete
- Entorno (Node/Bun, SO, sandbox/production)
- Sugerencia de mitigación, si la tienes

## Qué esperar

- **Confirmación inicial**: dentro de 72 horas hábiles
- **Evaluación**: determinaremos severidad, reproducibilidad y alcance
- **Corrección**: parche en una versión parche cuando corresponda
- **Divulgación**: coordinaremos la publicación del advisory y del changelog

Si el reporte está fuera de alcance, te lo indicaremos y, cuando aplique, te orientaremos hacia el canal correcto (por ejemplo, soporte de Flow.cl).

## Buenas prácticas al usar el SDK

- Nunca expongas `secretKey` en frontend, repositorios, logs ni variables de entorno del cliente
- Usa variables de entorno o un gestor de secretos en el servidor
- Valida en tu backend los callbacks y confirmaciones de pago con `flow.webhooks.verifyPaymentConfirmation`; no confíes solo en el `token` recibido
- Mantén actualizadas las dependencias y la versión del paquete
- Usa `sandbox` para pruebas y separa credenciales de producción
- Revisa periódicamente [Dependabot](https://github.com/nicotordev/flowcl-pagos/security/dependabot) y actualiza cuando publiquemos parches

## Reconocimientos

Agradecemos de forma responsable a quienes reporten vulnerabilidades válidas. Si lo deseas, podemos mencionarte en el advisory tras la corrección.
