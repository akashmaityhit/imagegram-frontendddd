'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, User, Bell } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading activities
    setTimeout(() => {
      setActivities([
        {
          id: '1',
          type: 'like',
          user: { name: 'John Doe', avatar: null },
          post: { id: '1', caption: 'Amazing sunset today!' },
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        },
        {
          id: '2',
          type: 'comment',
          user: { name: 'Jane Smith', avatar: null },
          post: { id: '2', caption: 'Beautiful architecture' },
          comment: { text: 'This is incredible!' },
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        },
        {
          id: '3',
          type: 'follow',
          user: { name: 'Mike Johnson', avatar: null },
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow':
        return <User className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getActivityText = (activity) => {
    switch (activity.type) {
      case 'like':
        return `liked your post "${activity.post.caption}"`;
      case 'comment':
        return `commented "${activity.comment.text}" on your post`;
      case 'follow':
        return 'started following you';
      default:
        return 'interacted with your content';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>Loading activity...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Activity
            </h1>
            <p className="text-muted-foreground">
              See what&apos;s happening with your posts and followers
            </p>
          </div>

          <div className="space-y-4">
            {activities.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Bell className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">No activity yet</h2>
                  <p className="text-muted-foreground">
                    When people interact with your posts, you&apos;ll see it here
                  </p>
                </CardContent>
              </Card>
            ) : (
              activities.map((activity) => (
                <Card key={activity.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                        <AvatarFallback>
                          <User className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          {getActivityIcon(activity.type)}
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-semibold">{activity.user.name}</span>
                              {' '}
                              <span className="text-muted-foreground">
                                {getActivityText(activity)}
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatTimestamp(activity.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
