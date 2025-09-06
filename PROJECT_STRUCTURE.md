# ImageGram - Project Structure

## 📁 **Organized Layer Architecture**

This project follows a clean, layered architecture pattern with clear separation of concerns:

```
src/
├── api/                          # 🌐 API Layer - Backend Communication
│   ├── client.js                 # Axios configuration & interceptors
│   ├── posts.js                  # Post-related API endpoints
│   ├── users.js                  # User-related API endpoints
│   ├── comments.js               # Comment-related API endpoints
│   └── index.js                  # Centralized API exports
│
├── services/                     # 🔧 Services Layer - Business Logic
│   ├── postService.js            # Post business logic & error handling
│   ├── userService.js            # User business logic & error handling
│   ├── commentService.js         # Comment business logic & error handling
│   └── index.js                  # Centralized services exports
│
├── hooks/                        # 🎣 Custom Hooks - State Management
│   ├── usePosts.js               # Posts state & operations
│   ├── useComments.js            # Comments state & operations
│   ├── useUser.js                # User state & operations
│   └── index.js                  # Centralized hooks exports
│
├── components/                   # 🧩 UI Components
│   ├── ui/                       # Base UI Components (Shadcn/UI)
│   │   ├── button.js
│   │   ├── input.js
│   │   ├── card.js
│   │   ├── avatar.js
│   │   └── dialog.js
│   ├── features/                 # Feature-specific Components
│   │   ├── PostCard.js           # Post display component
│   │   ├── LikeButton.js         # Reaction system
│   │   ├── CommentSection.js     # Comments & replies
│   │   └── UploadForm.js         # Image upload form
│   └── layout/                   # Layout Components
│       ├── Navigation.js         # Main navigation
│       └── Layout.js             # App layout wrapper
│
├── utils/                        # 🛠️ Utility Functions
│   ├── cn.js                     # Class name utility
│   ├── format.js                 # Date & number formatting
│   ├── validation.js             # Form validation
│   └── index.js                  # Centralized utils exports
│
├── constants/                    # 📋 Constants & Configuration
│   ├── demoData.js               # Demo data for testing
│   ├── reactions.js              # Reaction types & config
│   └── index.js                  # Centralized constants exports
│
└── app/                          # 📱 Next.js App Router Pages
    ├── layout.js                 # Root layout
    ├── page.js                   # Home/Feed page
    ├── upload/page.js            # Upload page
    ├── search/page.js            # Search page
    ├── activity/page.js          # Activity page
    └── profile/page.js           # Profile page
```

## 🏗️ **Architecture Benefits**

### **1. Separation of Concerns**
- **API Layer**: Handles all backend communication
- **Services Layer**: Contains business logic and error handling
- **Hooks Layer**: Manages component state and side effects
- **Components Layer**: Pure UI components with clear responsibilities

### **2. Scalability**
- Easy to add new features without affecting existing code
- Clear boundaries between different layers
- Reusable components and services

### **3. Maintainability**
- Each layer has a single responsibility
- Easy to locate and modify specific functionality
- Consistent patterns across the application

### **4. Testability**
- Each layer can be tested independently
- Services can be easily mocked for component testing
- Clear interfaces between layers

## 🔄 **Data Flow**

```
User Interaction → Component → Hook → Service → API → Backend
                ←          ←      ←        ←     ←
```

1. **User interacts** with a component
2. **Component** calls a custom hook
3. **Hook** calls the appropriate service
4. **Service** makes API calls and handles business logic
5. **API layer** communicates with the backend
6. **Data flows back** through the same layers

## 🎯 **Key Features**

### **API Layer**
- Centralized axios configuration
- Request/response interceptors
- Error handling and token management
- Organized by feature (posts, users, comments)

### **Services Layer**
- Business logic encapsulation
- Error handling and fallback strategies
- Demo data integration for development
- Consistent response format

### **Hooks Layer**
- Custom hooks for state management
- Reusable logic across components
- Automatic loading and error states
- Optimistic updates

### **Components Layer**
- Feature-based organization
- Reusable UI components
- Clear prop interfaces
- Separation of layout and feature components

## 🚀 **Usage Examples**

### **Using a Service**
```javascript
import { postService } from '@/services';

const result = await postService.createPost(postData);
if (result.success) {
  // Handle success
} else {
  // Handle error
}
```

### **Using a Hook**
```javascript
import { usePosts } from '@/hooks';

const { posts, loading, createPost, likePost } = usePosts();
```

### **Using Components**
```javascript
import PostCard from '@/components/features/PostCard';
import { Button } from '@/components/ui/button';
```

This architecture ensures the codebase is maintainable, scalable, and follows React/Next.js best practices while providing a clear separation between frontend logic and backend communication.
