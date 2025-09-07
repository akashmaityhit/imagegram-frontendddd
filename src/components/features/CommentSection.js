'use client';

import { useState, useEffect } from 'react';
import { Send, User, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LikeButton from './LikeButton';
import { cn } from '@/utils';
import { createComment as createCommentService, updateComment as updateCommentService } from '@/services';
const CommentSection = ({  
  postId,
  comments = [], 
  postId,
  className 
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleAddComment = (e) => {
  const [commentsList, setCommentsList] = useState(comments);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');
    onCommentAdd?.({
  useEffect(() => {
    setCommentsList(comments);
  }, [comments]);

  const handleAddComment = async (e) => {

  const handleAddReply = (parentId) => {
    if (!replyText.trim()) return;
    // Create via API to ensure persistence, then update local list to rerender
    onCommentAdd?.({
      content: replyText,
      onModel: 'Post',
      postId,
      parentId,nt,
        onModel: 'Post',
        postId,
      });
      if (result?.success && result?.data) {
        setCommentsList(prev => [result.data, ...prev]);
      }
    } catch {}

    // Backward compatibility callback
    onCommentAdd?.({ content: newComment, onModel: 'Post' });
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
  const startEditing = (comment) => {
    setEditingCommentId(comment._id);
    setEditingText(comment.content || '');
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditingText('');
  };

  const saveEdit = async (commentId) => {
    if (!editingText.trim()) return;
    try {
      const result = await updateCommentService(commentId, { content: editingText });
      if (result?.success && result?.data) {
        setCommentsList(prev => prev.map(c => c._id === commentId ? { ...c, ...result.data } : c));
      } else {
        setCommentsList(prev => prev.map(c => c._id === commentId ? { ...c, content: editingText } : c));
      }
    } catch {
      setCommentsList(prev => prev.map(c => c._id === commentId ? { ...c, content: editingText } : c));
    } finally {
      cancelEditing();
    }
  };

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
          {editingCommentId === comment._id ? (
            <div className="space-y-2">
              <Input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="flex-1"
              />
              <div className="flex items-center space-x-2">
                <Button size="sm" onClick={() => saveEdit(comment._id)} disabled={!editingText.trim()}>Save</Button>
                <Button variant="ghost" size="sm" onClick={cancelEditing}>Cancel</Button>
              </div>
            </div>
          ) : (
            <p className="text-sm">{comment.content}</p>
          )}v>
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => startEditing(comment)}
              className="text-xs h-auto p-0"
            >
              Edit
            </Button>
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
