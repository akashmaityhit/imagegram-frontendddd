'use client';

import { useState } from 'react';
import { Send, User, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LikeButton from './LikeButton';
import { cn } from '@/utils';

const CommentSection = ({  
  comments = [], 
  onCommentAdd,
  className 
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onCommentAdd?.({
      content: newComment,
      onModel: 'Post'
    });
    setNewComment('');
  };

  const handleAddReply = (parentId) => {
    if (!replyText.trim()) return;

    onCommentAdd?.(postId, {
      text: replyText,
      parentId: parentId,
    });
    setReplyText('');
    setReplyingTo(null);
  };

  const handleLikeChange = (commentId, reactionType, isActive) => {
    // Handle comment like changes
    console.log('Comment like changed:', commentId, reactionType, isActive);
  };

  const renderComment = (comment, isReply = false) => (
    <div key={comment._id} className={cn("space-y-2", isReply && "ml-8")}>
      <div className="flex items-start space-x-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment.userId?.avatar} alt={comment.userId?.name} />
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm">{comment.userId?.username || 'Anonymous'}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm">{comment.content}</p>
          <div className="flex items-center space-x-4">
            <LikeButton
              postId={comment._id}
              initialReactions={comment?.reactions || {}}
              onReactionChange={handleLikeChange}
              className="text-xs"
            />
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(comment._id)}
                className="text-xs h-auto p-0"
              >
                <Reply className="w-3 h-3 mr-1" />
                Reply
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Reply form */}
      {replyingTo === comment._id && (
        <div className="ml-11 space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleAddReply(comment._id)}
            />
            <Button
              size="sm"
              onClick={() => handleAddReply(comment._id)}
              disabled={!replyText.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setReplyingTo(null);
                setReplyText('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Render replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-2">
          {comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div className={cn("space-y-4", className)}>
      {/* Comments list */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => renderComment(comment))
        )}
      </div>

      {/* Add comment form */}
      <form onSubmit={handleAddComment} className="flex items-center space-x-2">
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1"
        />
        <Button
          type="submit"
          size="sm"
          disabled={!newComment.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default CommentSection;