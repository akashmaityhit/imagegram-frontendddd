# Authentication System Implementation

This document outlines the authentication system implemented for the ImageGram frontend application.

## 🚀 Features Implemented

### ✅ Core Authentication Features
- **User Signup** - Create new accounts with email, username, and password
- **User Signin** - Authenticate existing users with email and password
- **Token Management** - Secure JWT token storage in HTTP-only cookies
- **Automatic Logout** - Automatic logout when token expires
- **Protected Routes** - Route protection for authenticated users only
- **Auth State Management** - Global authentication state using React Context

### ✅ Security Features
- **Secure Cookie Storage** - Tokens stored in secure, HTTP-only cookies
- **JWT Token Validation** - Tokens validated with backend secret on every check
- **Token Expiration Handling** - Automatic token validation and cleanup
- **Request Interceptors** - Automatic token attachment to API requests
- **Response Interceptors** - Automatic logout on 401 responses
- **Form Validation** - Client-side validation for all auth forms
- **Token Integrity** - JWT signature verification using shared secret

## 📁 File Structure

```
src/
├── contexts/
│   └── AuthContext.js          # Authentication context and provider
├── components/auth/
│   ├── SigninForm.js           # Signin form component
│   ├── SignupForm.js           # Signup form component
│   ├── ProtectedRoute.js       # Route protection wrapper
│   └── LandingPage.js          # Landing page for unauthenticated users
├── services/
│   └── authService.js          # Authentication service layer
├── utils/
│   └── cookies.js              # Cookie management utilities
├── api/
│   └── users.js                # User API endpoints (updated)
└── app/
    ├── signin/page.js          # Signin page
    ├── signup/page.js          # Signup page
    └── page.js                 # Main page with auth logic
```

## 🔧 API Endpoints

The authentication system expects the following backend endpoints:

### Signup
```
POST /api/v1/users/signup
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "username": "string",
    "email": "string",
    "role": "user"
  }
}
```

### Signin
```
POST /api/v1/users/signin
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "username": "string",
    "email": "string",
    "role": "user"
  }
}
```

## 🍪 Cookie Configuration

The system uses secure cookies with the following configuration:
- **Name**: `authToken`
- **Expiration**: 7 days (configurable)
- **Security**: `Secure`, `SameSite=Strict`
- **Path**: `/`

## 🔐 Token Management

### Token Storage
- Tokens are stored in secure HTTP-only cookies
- User data is stored in a separate cookie for quick access
- Automatic cleanup on logout or token expiration

### JWT Token Validation
- **Signature Verification**: Tokens are validated using the same secret as backend
- **Expiration Checking**: Automatic token expiration validation
- **Integrity Verification**: JWT signature is verified on every authentication check
- **User Data Extraction**: User information is extracted directly from validated token
- **Error Handling**: Invalid tokens are automatically cleared

### Token Validation Process
1. **Get Token**: Retrieve token from secure cookie
2. **Verify Signature**: Use `jwt.verify()` with backend secret
3. **Check Expiration**: Validate token hasn't expired
4. **Extract Data**: Get user data from validated token payload
5. **Handle Errors**: Clear invalid tokens and logout user

### Automatic Logout
- Logout occurs automatically when:
  - Token signature is invalid
  - Token expires
  - 401 response received from API
  - User manually signs out

## 🎯 Usage Examples

### Using Authentication Context
```javascript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, signin, signup, signout } = useAuth();
  
  // Check if user is authenticated
  if (isAuthenticated) {
    return <div>Welcome, {user.username}!</div>;
  }
  
  return <div>Please sign in</div>;
}
```

### Protecting Routes
```javascript
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  );
}
```

### Using Authentication Service
```javascript
import { authService } from '@/services/authService';

// Sign in user
const result = await authService.signin({
  email: 'user@example.com',
  password: 'password123'
});

if (result.success) {
  // User signed in successfully
  console.log('User:', result.data.user);
} else {
  // Handle error
  console.error('Error:', result.error);
}
```

## 🔄 Authentication Flow

1. **User visits the app**
   - If not authenticated: Shows landing page
   - If authenticated: Shows main app content

2. **User signs up/signs in**
   - Form validation occurs client-side
   - API call to backend with credentials
   - Token and user data stored in cookies
   - User redirected to main app

3. **User navigates the app**
   - Token automatically attached to API requests
   - Protected routes check authentication status
   - Navigation shows user-specific content

4. **Token expires or user logs out**
   - Cookies are cleared
   - User redirected to signin page
   - App state reset to unauthenticated

## 🛡️ Security Considerations

- **HTTPS Required**: Secure cookies only work with HTTPS in production
- **Token Expiration**: Tokens have limited lifetime for security
- **XSS Protection**: HTTP-only cookies prevent XSS attacks
- **CSRF Protection**: SameSite cookie attribute prevents CSRF
- **Input Validation**: All form inputs are validated client-side
- **Error Handling**: Sensitive error information is not exposed

## 🚀 Getting Started

1. **Install Dependencies**: All required packages are already in package.json
2. **Configure Backend**: Ensure your backend has the required auth endpoints
3. **Set Environment Variables**: 
   - Create a `.env.local` file in the root directory
   - Add `NEXT_PUBLIC_JWT_SECRET=your-backend-jwt-secret` (must match backend)
   - Add `NEXT_PUBLIC_API_URL=http://localhost:8000` (if different)
4. **Start Development**: Run `npm run dev` to start the development server

### Environment Variables Required:
```env
# JWT Secret - MUST match your backend secret
NEXT_PUBLIC_JWT_SECRET=your-backend-jwt-secret-key

# API Base URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📝 Notes

- The system is designed to work with JWT tokens as generated by your backend
- All authentication state is managed client-side using React Context
- The system gracefully handles network errors and token expiration
- Mobile-responsive design for all authentication components
- Clean separation of concerns with service layer architecture
