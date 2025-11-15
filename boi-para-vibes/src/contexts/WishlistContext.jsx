import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Book } from './CartContext';
import { useAuth } from './AuthContext';

interface WishlistState {
  items: Book[];
}

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: Book }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'LOAD_WISHLIST'; payload: Book[] };

const WishlistContext = createContext<{
  state: WishlistState;
  addToWishlist: (book: Book) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
} | null>(null);

const getInitialWishlistState = (): WishlistState => {
  // Remove old global wishlist data
  localStorage.removeItem('boi-para-wishlist');
  return { items: [] };
};



const wishlistReducer = (state: WishlistState, action: WishlistAction, userId?: string): WishlistState => {
  let newState: WishlistState;
  
  switch (action.type) {
    case 'LOAD_WISHLIST':
      // Validate payload is an array
      const items = Array.isArray(action.payload) ? action.payload : [];
      return {
        items: items
      };
    case 'ADD_TO_WISHLIST':
      // Check if user is authenticated
      if (!userId) {
        console.warn('Cannot add to wishlist: No user ID provided');
        return state;
      }
      
      // Check if item already exists
      if (state.items.find(item => item.id === action.payload.id)) {
        return state;
      }
      
      newState = {
        ...state,
        items: [...state.items, action.payload],
      };
      break;
    case 'REMOVE_FROM_WISHLIST':
      // Check if user is authenticated
      if (!userId) {
        console.warn('Cannot remove from wishlist: No user ID provided');
        return state;
      }
      
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
      break;
    default:
      return state;
  }
  
  // Save to user-specific localStorage only if user is authenticated
  if (userId) {
    try {
      localStorage.setItem(`boi-para-wishlist-${userId}`, JSON.stringify(newState.items));
    } catch (error) {
      console.error('Failed to save wishlist to localStorage:', error);
    }
  }
  
  return newState;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer((state: WishlistState, action: WishlistAction) => 
    wishlistReducer(state, action, user?.id), getInitialWishlistState());

  useEffect(() => {
    if (user?.id) {
      try {
        const userSpecificKey = `boi-para-wishlist-${user.id}`;
        const savedWishlist = localStorage.getItem(userSpecificKey);
        const items = savedWishlist ? JSON.parse(savedWishlist) : [];
        
        // Validate that items is an array and belongs to current user
        if (Array.isArray(items)) {
          dispatch({ type: 'LOAD_WISHLIST', payload: items });
        } else {
          // Clear invalid data and start fresh
          localStorage.removeItem(userSpecificKey);
          dispatch({ type: 'LOAD_WISHLIST', payload: [] });
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
        // Clear corrupted data
        localStorage.removeItem(`boi-para-wishlist-${user.id}`);
        dispatch({ type: 'LOAD_WISHLIST', payload: [] });
      }
    } else {
      // Clear current state when no user is logged in
      dispatch({ type: 'LOAD_WISHLIST', payload: [] });
    }
  }, [user?.id]); // Only depend on user.id to avoid unnecessary re-renders

  const addToWishlist = (book: Book) => {
    if (!user?.id) {
      console.warn('Cannot add to wishlist: User not authenticated');
      return;
    }
    dispatch({ type: 'ADD_TO_WISHLIST', payload: book });
  };

  const removeFromWishlist = (id: number) => {
    if (!user?.id) {
      console.warn('Cannot remove from wishlist: User not authenticated');
      return;
    }
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const isInWishlist = (id: number) => {
    if (!user?.id) return false;
    return state.items.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        state,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

