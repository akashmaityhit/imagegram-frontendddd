'use client';

import { useState } from 'react';
import { Heart, ThumbsUp, Smile, PartyPopper, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils';
import { REACTION_CONFIG } from '@/constants';

const LikeButton = ({ 
  postId, 
  initialReactions = {}, 
  onReactionChange,
  className 
}) => {
  const [reactions, setReactions] = useState(initialReactions);
  const [showReactions, setShowReactions] = useState(false);

  const handleReaction = (reactionType) => {
    const newReactions = { ...reactions };
    const currentCount = newReactions[reactionType] || 0;
    
    // Toggle reaction (if already reacted, remove it)
    if (currentCount > 0) {
      newReactions[reactionType] = 0;
    } else {
      newReactions[reactionType] = 1;
    }
    
    setReactions(newReactions);
    onReactionChange?.(postId, reactionType, newReactions[reactionType] > 0);
    setShowReactions(false);
  };

  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);
  const hasAnyReaction = totalReactions > 0;

  const iconMap = {
    ThumbsUp,
    Heart,
    Star,
    PartyPopper,
    Smile,
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center space-x-2">
        {/* Main like button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowReactions(!showReactions)}
          className={cn(
            "flex items-center space-x-2 transition-colors",
            hasAnyReaction && "text-red-500"
          )}
        >
          <Heart className={cn("w-5 h-5", hasAnyReaction && "fill-current")} />
          <span className="text-sm">
            {totalReactions > 0 ? totalReactions : 'Like'}
          </span>
        </Button>

        {/* Reaction counts display */}
        {hasAnyReaction && (
          <div className="flex items-center space-x-1">
            {REACTION_CONFIG.map(({ type, icon, color }) => {
              const count = reactions[type] || 0;
              if (count === 0) return null;
              
              const IconComponent = iconMap[icon] || Heart;
              return (
                <div key={type} className="flex items-center space-x-1">
                  <IconComponent className={cn("w-4 h-4", color)} />
                  <span className="text-xs text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reaction picker */}
      {showReactions && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-card border border-border rounded-lg shadow-lg z-10">
          <div className="flex items-center space-x-2">
            {REACTION_CONFIG.map(({ type, icon, color, label }) => {
              const IconComponent = iconMap[icon] || Heart;
              return (
                <Button
                  key={type}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReaction(type)}
                  className={cn(
                    "flex items-center space-x-1 hover:bg-accent",
                    reactions[type] > 0 && color
                  )}
                  title={label}
                >
                  <IconComponent className="w-5 h-5" />
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeButton;

