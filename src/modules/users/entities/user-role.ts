export enum UserRole {

  // MANAGER + gestion de usuarios
  ADMIN = 'ADMIN',

  // OPERATOR + gestion de productos ( completo )
  MANAGER = 'MANAGER',

  // Solo puede actualizar precio, gestionar proveedores, gestionar ordenes de compra
  OPERATOR = 'OPERATOR',
}