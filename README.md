# Express GraphQL API

A GraphQL-based e-commerce backend built with Express and Apollo Server.

## Features

- **Authentication** - JWT-based login with access and refresh tokens
- **User Management** - Create and fetch users
- **Products** - Add, remove, and list products
- **Shopping Cart** - Add/remove items, clear cart
- **Orders** - Place orders, view order history

## Tech Stack

- Express.js
- Apollo Server
- GraphQL
- PostgreSQL
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=4000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

### Running

```bash
npm start
```

Server runs at `http://localhost:4000/graphql`

## GraphQL Schema

### Queries

```graphql
# Users
users: [User!]!
user(userId: ID!): User

# Products
products: [Product!]!
product(id: ID!): Product

# Cart
cart(userId: ID!): Cart
cartItems(userId: ID!): [CartItem!]!
cartItem(id: ID!): CartItem

# Orders
orders(userId: ID!): [Order!]!
order(id: ID!): Order
```

### Mutations

```graphql
# Auth
login(email: String!, password: String!): AuthPayload!

# Users
createUser(name: String!, email: String!, password: String!): User!

# Products
addProduct(name: String!, price: Float!): Product!
removeProduct(id: ID!): Boolean!

# Cart
addToCart(productId: ID!, quantity: Int!, userId: ID!): CartItem!
removeFromCart(id: ID!): Boolean!
clearCart(userId: ID!): Boolean!

# Orders
placeOrder(userId: ID!): Order!
```

## License

None