# ImageGram - Dark-Themed Image Sharing Platform

A modern, dark-themed image sharing and discussion platform built with Next.js, inspired by Instagram and Framer's design aesthetic.

## Features

- 🖼️ **Image Sharing**: Upload and share images with captions and descriptions
- 💬 **Comments & Replies**: Full comment system with nested replies
- ❤️ **Multiple Reaction Types**: Like, Love, Support, Congrats, and Smile reactions
- 🔍 **Search**: Find posts by caption or description
- 👤 **User Profiles**: View user profiles with stats and posts
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🌙 **Dark Theme**: Beautiful dark theme inspired by Framer's design
- ⚡ **Real-time Updates**: Live updates for likes, comments, and posts

## Technology Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS, Shadcn/UI, Radix UI
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Language**: JavaScript (no TypeScript)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

The application expects the following backend API endpoints:

- `POST /api/v1/users` - Create user
- `POST /api/v1/users/signup` - User signup
- `POST /api/v1/posts` - Create post (accepts single image)
- `GET /api/v1/posts?offset=0&limit=30` - Get posts with pagination
- `PUT /api/v1/posts/:id` - Update post
- `POST /api/v1/comments/comment` - Create comment

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and dark theme
│   ├── layout.js          # Root layout
│   ├── page.js            # Home/Feed page
│   ├── upload/            # Upload page
│   ├── search/            # Search page
│   ├── activity/          # Activity page
│   └── profile/           # Profile page
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── layout.js         # Main layout wrapper
│   ├── navigation.js     # Navigation component
│   ├── post-card.js      # Post display component
│   ├── like-button.js    # Reaction system
│   ├── comment-section.js # Comments and replies
│   └── upload-form.js    # Image upload form
└── lib/                  # Utilities and services
    ├── api.js            # API service layer
    └── utils.js          # Utility functions
```

## Key Components

### PostCard
Displays individual posts with:
- User information and avatar
- Image with proper aspect ratio
- Like button with multiple reaction types
- Comment section with replies
- Share functionality

### LikeButton
Interactive reaction system with:
- 5 different reaction types (Like, Love, Support, Congrats, Smile)
- Visual feedback and counts
- Toggle functionality

### CommentSection
Full-featured commenting system with:
- Nested replies
- Real-time updates
- Reaction support for comments
- Form validation

### UploadForm
Image upload interface with:
- Drag-and-drop support
- Image preview
- Caption and description fields
- Form validation

## Styling

The application uses a comprehensive dark theme with:
- Custom CSS variables for consistent theming
- Glass morphism effects
- Gradient text elements
- Smooth animations and transitions
- Mobile-responsive design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.