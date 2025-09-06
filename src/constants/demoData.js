// Demo data for testing the application
export const demoPosts = [
  {
    id: '1',
    user: {
      name: 'Alex Chen',
      username: '@alexchen',
      avatar: null,
    },
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-14b5e6b4e5b5?w=800&h=800&fit=crop',
    caption: 'Golden hour in the mountains 🏔️',
    description: 'Captured this beautiful sunset during my hiking trip. The colors were absolutely incredible!',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    reactions: {
      like: 12,
      love: 8,
      support: 3,
      congrats: 1,
      smile: 2,
    },
    comments: [
      {
        id: 'c1',
        user: { name: 'Sarah Johnson', avatar: null },
        text: 'This is absolutely stunning! Where was this taken?',
        createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
        reactions: { like: 2, love: 1 },
        replies: [
          {
            id: 'r1',
            user: { name: 'Alex Chen', avatar: null },
            text: 'Thanks! This was taken at Mount Rainier National Park',
            createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
            reactions: {},
          },
        ],
      },
      {
        id: 'c2',
        user: { name: 'Mike Wilson', avatar: null },
        text: 'The lighting is perfect! Great shot!',
        createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        reactions: { like: 1 },
        replies: [],
      },
    ],
  },
  {
    id: '2',
    user: {
      name: 'Emma Rodriguez',
      username: '@emmarod',
      avatar: null,
    },
    imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=800&fit=crop',
    caption: 'Coffee and creativity ☕️',
    description: 'My morning ritual - a perfect cup of coffee and some time to think and create.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    reactions: {
      like: 24,
      love: 15,
      support: 5,
      congrats: 2,
      smile: 8,
    },
    comments: [
      {
        id: 'c3',
        user: { name: 'David Kim', avatar: null },
        text: 'Love the aesthetic! What coffee are you drinking?',
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        reactions: { like: 3 },
        replies: [],
      },
    ],
  },
  {
    id: '3',
    user: {
      name: 'Jordan Smith',
      username: '@jordansmith',
      avatar: null,
    },
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=800&fit=crop',
    caption: 'Urban exploration 🏙️',
    description: 'Found this amazing street art in downtown. The colors and composition are incredible!',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    reactions: {
      like: 18,
      love: 12,
      support: 4,
      congrats: 1,
      smile: 6,
    },
    comments: [],
  },
];

export const demoUser = {
  id: 'user1',
  name: 'John Doe',
  username: '@johndoe',
  email: 'john@example.com',
  bio: 'Photographer & Creative Director',
  avatar: null,
  followers: 1234,
  following: 567,
  posts: 89,
  joinDate: new Date('2023-01-15'),
};

