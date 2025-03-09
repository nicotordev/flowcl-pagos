// import FlowCoupons from '../clients/flow.coupons';
// import { FlowCreateDiscountCouponRequest } from '../types/flow';

// describe('FlowCoupons API Integration Tests', () => {
//   let flowCoupons: FlowCoupons;
//   let createdCouponId: number | null = null;

//   const apiKey = process.env.FLOW_API_KEY || 'TU_API_KEY_DE_SANDBOX';
//   const secretKey = process.env.FLOW_SECRET_KEY || 'TU_SECRET_KEY_DE_SANDBOX';
//   const baseURL = process.env.FLOW_BASE_URL || 'https://sandbox.flow.cl/api';

//   beforeAll(() => {
//     flowCoupons = new FlowCoupons(apiKey, secretKey, baseURL);
//   });

//   it('Crear cupón de descuento (create)', async () => {
//     const data: FlowCreateDiscountCouponRequest = {
//       name: 'Test Coupon Jest',
//       percent_off: 10.0,
//       // O para cupón de tipo monto:
//       // amount: 1000,
//       // currency: 'CLP',
//       duration: 1, // 0 o 1
//       times: 2, // Si duration = 1, número de veces (ej: 2 meses)
//       max_redemptions: 5,
//       expires: '2030-12-31',
//     };

//     const response = await flowCoupons.create(data);
//     expect(response).toHaveProperty('id');
//     expect(response.name).toBe(data.name);
//     createdCouponId = response.id;
//   });

//   it('Editar cupón de descuento (edit)', async () => {
//     if (!createdCouponId) {
//       throw new Error(
//         'No se pudo editar porque no existe cupón creado previamente',
//       );
//     }

//     const editData = {
//       couponId: createdCouponId.toString(),
//       name: 'Test Coupon Jest (editado)',
//     };

//     const response = await flowCoupons.edit(editData);
//     expect(response).toHaveProperty('id', createdCouponId);
//   });

//   it('Obtener cupón de descuento (get)', async () => {
//     if (!createdCouponId) {
//       throw new Error(
//         'No se pudo obtener porque no existe cupón creado previamente',
//       );
//     }

//     const response = await flowCoupons.get(createdCouponId.toString());
//     expect(response).toHaveProperty('id', createdCouponId);
//   });

//   it('Listar cupones de descuento (list)', async () => {
//     // Ejemplo de filtros: { start: 0, limit: 10, filter: 'Jest', status: 1 }
//     const data = {
//       start: 0,
//       limit: 10,
//     };

//     const response = await flowCoupons.list(data);
//     expect(response).toHaveProperty('total');
//     expect(response).toHaveProperty('data');
//     // response.data es un string con los cupones listados.
//     // Podrías parsear si el backend lo retorna con formato JSON en string, etc.
//   });

//   it('Eliminar cupón de descuento (delete)', async () => {
//     if (!createdCouponId) {
//       throw new Error(
//         'No se pudo eliminar porque no existe cupón creado previamente',
//       );
//     }

//     const response = await flowCoupons.delete(createdCouponId.toString());
//     expect(response).toHaveProperty('id', createdCouponId);
//   });
// });
