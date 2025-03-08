# @nicotordev/flowcl-pagos

Cliente de TypeScript para la API de Flow.cl, que permite procesar pagos en línea de manera sencilla y segura.

## 🚀 Instalación

Puedes instalar este paquete con npm o yarn:

```sh
npm install @nicotordev/flowcl-pagos
```

o con yarn:

```sh
yarn add @nicotordev/flowcl-pagos
```

## 🔑 Configuración

Para utilizar el cliente, necesitas una **API Key** y una **Secret Key** de Flow.cl.

## 📌 Uso

### 1️⃣ Importar y crear una instancia del cliente

```typescript
import FlowClient from '@nicotordev/flowcl-pagos';

const flow = new FlowClient('TU_API_KEY', 'TU_SECRET_KEY');
```

### 2️⃣ Crear un pago

```typescript
const paymentData = {
  commerceOrder: '123456',
  subject: 'Compra de servicio',
  amount: 10000,
  currency: 'CLP',
  email: 'cliente@example.com',
  paymentMethod: 1, // 1: Webpay, 2: Servipag, 3: Multicaja
  urlReturn: 'https://tudominio.com/retorno',
  urlConfirmation: 'https://tudominio.com/confirmacion',
};

async function createPayment() {
  try {
    const response = await flow.createOrder(paymentData);
    console.log('Pago creado:', response);
  } catch (error) {
    console.error('Error al crear el pago:', error);
  }
}

createPayment();
```

### 3️⃣ Obtener el estado de un pago

```typescript
async function checkPaymentStatus(token: string) {
  try {
    const response = await flow.getPaymentStatus(token);
    console.log('Estado del pago:', response);
  } catch (error) {
    console.error('Error al consultar el estado del pago:', error);
  }
}

// Llamar a la función con un token válido
checkPaymentStatus('TOKEN_DE_PAGO');
```

## 📜 Métodos disponibles

### `new FlowClient(apiKey: string, secretKey: string, baseURL?: string)`

Crea una instancia del cliente de Flow.

- **apiKey** (string) - Clave de acceso a la API de Flow.
- **secretKey** (string) - Clave secreta para firmar las solicitudes.
- **baseURL** (string) - URL base de la API de Flow (por defecto, `https://www.flow.cl/api`).

---

### `createOrder(data: Omit<FlowCreatePaymentRequest, 'apiKey' | 's'>): Promise<FlowCreatePaymentResponse>`

Crea un nuevo pago en Flow.cl.

- **data** (FlowCreatePaymentRequest) - Datos del pago, como el monto, correo del cliente, URLs de retorno y confirmación, etc.
- **Retorna** (Promise<FlowCreatePaymentResponse>) - Respuesta de la API con detalles del pago creado.

---

### `getPaymentStatus(token: string): Promise<FlowPaymentStatusResponse>`

Obtiene el estado de un pago en Flow.cl.

- **token** (string) - Token del pago generado en `createOrder`.
- **Retorna** (Promise<FlowPaymentStatusResponse>) - Respuesta con el estado del pago.

## 📌 Notas

- Recuerda que debes configurar las **URLs de retorno y confirmación** en tu cuenta de Flow.
- La firma de las solicitudes es generada automáticamente con **HMAC-SHA256**.

## 📝 Licencia

Este proyecto está bajo la **licencia MIT**.

---

🤖 **Desarrollado por [@nicotordev](https://github.com/acidkid)**
