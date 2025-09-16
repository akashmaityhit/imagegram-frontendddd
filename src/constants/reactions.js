// Reaction types and their configurations
export const REACTION_TYPES = {
  LOVE: 'love',
  CELEBRATE: 'celebrate',
  FUNNY: 'funny',
  ANGRY: 'angry',
};

export const REACTION_CONFIG = [
  { 
    type: REACTION_TYPES.LOVE, 
    icon: 'Heart', 
    color: 'text-red-500', 
    label: 'Love' 
  },
  { 
    type: REACTION_TYPES.CELEBRATE, 
    icon: 'PartyPopper', 
    color: 'text-green-500', 
    label: 'Celebrate' 
  },
  { 
    type: REACTION_TYPES.FUNNY, 
    icon: 'Smile', 
    color: 'text-yellow-500', 
    label: 'Funny' 
  },
  { 
    type: REACTION_TYPES.ANGRY, 
    icon: 'Angry', 
    color: 'text-orange-500', 
    label: 'Angry' 
  },
];

