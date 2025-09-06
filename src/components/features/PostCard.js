'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Share, MoreHorizontal, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';
import { cn } from '@/utils';

const PostCard = ({ 
  post, 
  onLikeChange, 
  onCommentAdd,
  className 
}) => {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeChange = (postId, reactionType, isActive) => {
    setIsLiked(isActive);
    onLikeChange?.(postId, reactionType, isActive);
  };

  const handleCommentAdd = (comment) => {
    onCommentAdd?.(post.id, comment);
  };

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.user?.avatar} alt={post.user?.name} />
              <AvatarFallback>
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{post.user?.username || 'Anonymous'}</h3>
              <p className="text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Image */}
        <div className="relative w-full aspect-square">
          <Image
            src={post.image}
            alt={post.caption}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Actions */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <LikeButton
                postId={post.id}
                initialReactions={post.reactions || {}}
                onReactionChange={handleLikeChange}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">
                  {post.comments?.length || 0}
                </span>
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Caption */}
          {post.caption && (
            <div className="space-y-1">
              <p className="text-sm">
                <span className="font-semibold">{post.user?.name || 'Anonymous'}</span>
                {' '}
                <span>{post.caption}</span>
              </p>
              {post.description && (
                <p className="text-sm text-muted-foreground">{post.description}</p>
              )}
            </div>
          )}

          {/* Comments Section */}
          {showComments && (
            <CommentSection
              postId={post.id}
              comments={post.comments || []}
              onCommentAdd={handleCommentAdd}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
