# CS (Customer Service) Module Documentation

## Overview

The CS module handles customer service functionalities including Notice, FAQ, and Inquiry management for the Nestar application.

## Structure

### 1. Enums (`libs/enums/cs.enum.ts`)

- **CsStatus**: ACTIVE, DELETE
- **CsType**: NOTICE, FAQ, INQUIRY
- **CsCategory**: PROPERTY, PAYMENT, BUYERS, AGENTS, MEMBERSHIP, COMMUNITY, OTHER
- **InquiryStatus**: PENDING, ANSWERED, CLOSED

### 2. Schema (`schemas/Cs.model.ts`)

MongoDB schema with the following fields:

- `csStatus`: Status of the CS record
- `csType`: Type (Notice/FAQ/Inquiry)
- `csCategory`: Category for classification
- `csTitle`: Title of the CS item
- `csContent`: Main content
- `csEvent`: Boolean flag for special events (for Notices)
- `inquiryStatus`: Status for inquiry type items
- `memberId`: Reference to the member who created it
- `csAnswer`: Admin's answer (for inquiries)
- `answeredAt`: Timestamp of when answered

### 3. DTOs

#### cs.ts

- **Cs**: Main GraphQL object type
- **CsList**: Response type with list and metaCounter

#### cs.input.ts

- **CsInput**: Input for creating CS items
- **CsInquiry**: Query input for fetching user's CS items
- **AllCsInquiry**: Query input for admin to fetch all CS items

#### cs.update.ts

- **CsUpdate**: Input for updating CS items

### 4. Service (`components/cs/cs.service.ts`)

Business logic methods:

**Public Methods:**

- `createCs()`: Create new CS item (Notice/FAQ/Inquiry)
- `getCs()`: Get single CS item by ID
- `getCsList()`: Get filtered list of CS items (users see only their inquiries)
- `updateCs()`: Update CS item (by owner)
- `removeCs()`: Soft delete CS item (by owner)

**Admin Methods:**

- `getAllCs()`: Get all CS items with filters
- `updateCsByAdmin()`: Update any CS item, add answers to inquiries
- `removeCsByAdmin()`: Hard delete any CS item

### 5. Resolver (`components/cs/cs.resolver.ts`)

GraphQL endpoints:

**Public Queries:**

- `getCs`: Get single CS item
- `getCsList`: Get filtered CS list

**Public Mutations:**

- `createCs`: Create new CS item
- `updateCs`: Update own CS item
- `removeCs`: Remove own CS item

**Admin Queries:**

- `getAllCs`: Get all CS items with filters

**Admin Mutations:**

- `updateCsByAdmin`: Update any CS item
- `removeCsByAdmin`: Delete any CS item

### 6. Module (`components/cs/cs.module.ts`)

NestJS module configuration:

- Imports: MongooseModule, AuthModule, MemberModule
- Providers: CsResolver, CsService
- Exports: CsService

## Features

### Notice Management

- Admins can create notices for all users
- Support for special event notices (`csEvent` flag)
- Users can view all active notices

### FAQ Management

- Categorized FAQs (Property, Payment, Buyers, Agents, etc.)
- Users can view all FAQs
- Admins can create/update/delete FAQs

### Inquiry System

- Users can submit inquiries
- Automatic status: PENDING → ANSWERED → CLOSED
- Users can only see their own inquiries
- Admins can view all inquiries and provide answers
- Timestamp tracking for answers

## Security

- **AuthGuard**: Protects create/update/delete operations
- **WithoutGuard**: Allows viewing with optional authentication
- **RolesGuard**: Restricts admin operations to ADMIN role
- Users can only modify their own CS items
- Soft delete for user operations, hard delete for admin

## Integration

The module is registered in `components.module.ts` and ready to use with the existing NestJS/GraphQL infrastructure.

## Usage Examples

### Create a Notice (Admin)

```graphql
mutation {
	createCs(
		input: {
			csType: NOTICE
			csCategory: PROPERTY
			csTitle: "New Property Listing Features"
			csContent: "We've added new features..."
			csEvent: true
		}
	) {
		_id
		csTitle
		createdAt
	}
}
```

### Create an Inquiry (User)

```graphql
mutation {
	createCs(
		input: { csType: INQUIRY, csCategory: PAYMENT, csTitle: "Payment issue", csContent: "I'm having trouble with..." }
	) {
		_id
		inquiryStatus
	}
}
```

### Get FAQs by Category

```graphql
query {
	getCsList(input: { page: 1, limit: 10, search: { csType: FAQ, csCategory: PROPERTY } }) {
		list {
			_id
			csTitle
			csContent
		}
		metaCounter {
			total
		}
	}
}
```

### Admin: Answer an Inquiry

```graphql
mutation {
	updateCsByAdmin(input: { _id: "...", csAnswer: "Thank you for your inquiry...", inquiryStatus: ANSWERED }) {
		_id
		csAnswer
		answeredAt
	}
}
```
