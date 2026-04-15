# NestJS GraphQL E-Commerce API

A NestJS + GraphQL backend for a simple e-commerce flow with users, products, carts, orders, JWT auth, and role-based access control.

## Features

- GraphQL API with Apollo Server
- JWT login with access and refresh tokens
- User, product, cart, order, and order item entities
- Auth guard for protected cart and order operations
- Role guard for admin-only user and product creation
- Rate limiting on `/graphql`
- Dev/prod GraphQL UI behavior controlled by `NODE_ENV`

## Tech Stack

- NestJS
- GraphQL
- TypeORM
- PostgreSQL
- JWT
- class-validator
- express-rate-limit

## Project Structure

- `src/app/auth` - login, guards, roles, auth response types
- `src/app/user` - user entity, service, and resolver
- `src/app/product` - product entity, service, and resolver
- `src/app/cart` - cart and cart item logic
- `src/app/order` - order and order item logic
- `src/app/graphql` - GraphQL config and generated schema
- `src/app/common` - shared exceptions and entity base class

## Setup

```bash
pnpm install
```

If you prefer npm:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV=
PORT=

DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

Use:

- `NODE_ENV=dev` to enable the GraphQL landing page in development
- `NODE_ENV=prod` to disable the GraphQL landing page and introspection in production

## Run

Development:

```bash
pnpm run start:dev
```

Production:

```bash
pnpm run build
pnpm run start:prod
```

## GraphQL Endpoint

- URL: `http://localhost:3000/graphql`

In development, the GraphQL explorer is enabled.
In production, the explorer and introspection are disabled.

## Authentication

Login returns:

- `accessToken`
- `refreshToken`

Send the access token in the `Authorization` header:

```http
Authorization: Bearer <accessToken>
```

## Authorization Rules

- Cart and order routes require a valid JWT
- Cart and order operations are tied to the logged-in user
- `createUser` requires authentication and `ADMIN` role
- `createProduct` requires authentication and `ADMIN` role

## Main API Areas

### Auth

- `login`

### Users

- `listUsers`
- `findUserById`
- `createUser`
- `updateUser`
- `deleteUser`

### Products

- `listProducts`
- `findProductById`
- `createProduct`
- `updateProduct`
- `deleteProduct`

### Cart

- `findCartByUserId`
- `addToCart`
- `updateCartItem`
- `removeFromCart`
- `clearCart`

### Orders

- `listOrders`
- `findOrderById`
- `findOrdersByUserId`
- `createOrderFromCart`
- `updateOrderStatus`

## Testing

```bash
pnpm run test
pnpm run test:e2e
pnpm run test:cov
```

## Notes

- The generated GraphQL schema is stored at `src/app/graphql/schema.gql`
- `OrderStatus` is exposed as a GraphQL enum
- Cart and order totals are stored as numeric values

