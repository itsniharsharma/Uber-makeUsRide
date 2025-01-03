# API Documentation

## User Registration

Endpoint for registering new users in the system.

### Endpoint

```
POST /users/register
```

### Request Body

```json
{
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "password": "string"
}
```

### Validation Rules

- `firstname`: Minimum 3 characters required
- `lastname`: Optional, minimum 3 characters if provided
- `email`: Valid email format required
- `password`: Minimum 6 characters required

### Response

#### Success (201 Created)

```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "username": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}
```

#### Error (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

### Error Messages

- "First name must be 3 characters long"
- "Invalid Email"
- "Password must be 6 characters long"
- "All fields are required"

### Response Examples

#### Success Example
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### Error Examples

Invalid Email:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body",
      "value": "invalid-email"
    }
  ]
}
```

Short Password:
```json
{
  "errors": [
    {
      "msg": "Password must be 6 characters long",
      "param": "password",
      "location": "body",
      "value": "12345"
    }
  ]
}
```

Missing Required Fields:
```json
{
  "errors": [
    {
      "msg": "All fields are required",
      "param": "firstname",
      "location": "body"
    }
  ]
}
```

## User Login

Endpoint for authenticating existing users.

### Endpoint

```
POST /users/login
```

### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

### Validation Rules

- `email`: Valid email format required
- `password`: Minimum 6 characters required

### Response

#### Success (200 OK)

```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "username": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}
```

#### Error (401 Unauthorized)

```json
{
  "message": "Invalid email or password"
}
```

#### Error (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

### Response Examples

#### Success Example
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### Error Examples

Invalid Credentials:
```json
{
  "message": "Invalid email or password"
}
```

Invalid Email Format:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body",
      "value": "invalid-email"
    }
  ]
}
```
// ...existing code...

## Get User Profile

Endpoint for retrieving authenticated user's profile.

### Endpoint

### Authorization

Requires JWT token in:
- Cookie named 'token' OR
- Authorization header as 'Bearer <token>'

### Response

#### Success (200 OK)

```json
{
  "user": {
    "username": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}

{
  "message": "Authentication failed"
}

{
  "user": {
    "username": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}

GET /users/logout

{
  "message": "Logged out successfully"
}

{
  "message": "Authentication failed" 
}

// ...existing code...

## Pilot Routes

### Pilot Registration

Register new pilot with vehicle details.

#### Endpoint



#### Request Body
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}


{
  "token": "JWT_TOKEN_STRING",
  "pilot": {
    "username": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "pilot@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "Sedan"
    }
  }
}

{
  "errors": [
    {
      "msg": "Vehicle type must be 3 characters long",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}