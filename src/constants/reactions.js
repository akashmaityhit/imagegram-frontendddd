// Reaction types and their configurations
export const REACTION_TYPES = {
  LIKE: 'like',
  LOVE: 'love',
  SUPPORT: 'support',
  CONGRATS: 'congrats',
  SMILE: 'smile',
};

export const REACTION_CONFIG = [
  { 
    type: REACTION_TYPES.LIKE, 
    icon: 'ThumbsUp', 
    color: 'text-blue-500', 
    label: 'Like' 
  },
  { 
    type: REACTION_TYPES.LOVE, 
    icon: 'Heart', 
    color: 'text-red-500', 
    label: 'Love' 
  },
  { 
    type: REACTION_TYPES.SUPPORT, 
    icon: 'Star', 
    color: 'text-yellow-500', 
    label: 'Support' 
  },
  { 
    type: REACTION_TYPES.CONGRATS, 
    icon: 'PartyPopper', 
    color: 'text-green-500', 
    label: 'Congrats' 
  },
  { 
    type: REACTION_TYPES.SMILE, 
    icon: 'Smile', 
    color: 'text-purple-500', 
    label: 'Smile' 
  },
];

