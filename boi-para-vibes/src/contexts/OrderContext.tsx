import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface OrderItem {
  id: number;
  title: string;
  author: string;
  price: string;
  cover: string;
  quantity: number;
  condition: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  paymentMethod: 'online' | 'cod';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  expectedDeliveryDate?: string;
  deliveryAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    phone: string;
  };
}

interface OrderState {
  orders: Order[];
}

type OrderAction = 
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: Order['status'] } }
  | { type: 'CANCEL_ORDER'; payload: string }
  | { type: 'LOAD_ORDERS'; payload: Order[] };

const getInitialState = (): OrderState => {
  try {
    const savedOrders = localStorage.getItem('boi-para-orders');
    return {
      orders: savedOrders ? JSON.parse(savedOrders) : []
    };
  } catch {
    return { orders: [] };
  }
};

const initialState: OrderState = getInitialState();

const orderReducer = (state: OrderState, action: OrderAction, userId?: string): OrderState => {
  let newState: OrderState;
  
  switch (action.type) {
    case 'LOAD_ORDERS':
      return {
        orders: action.payload
      };
    case 'ADD_ORDER':
      newState = {
        ...state,
        orders: [action.payload, ...state.orders]
      };
      break;
    case 'UPDATE_ORDER_STATUS':
      newState = {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        )
      };
      break;
    case 'CANCEL_ORDER':
      newState = {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload
            ? { ...order, status: 'cancelled' as const }
            : order
        )
      };
      break;
    default:
      return state;
  }
  
  // Save to user-specific localStorage
  if (userId) {
    try {
      localStorage.setItem(`boi-para-orders-${userId}`, JSON.stringify(newState.orders));
    } catch (error) {
      console.error('Failed to save orders to localStorage:', error);
    }
  }
  
  return newState;
};

interface OrderContextType {
  state: OrderState;
  addOrder: (order: Omit<Order, 'id' | 'orderDate'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  cancelOrder: (orderId: string) => void;
}
const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer((state: OrderState, action: OrderAction) => 
    orderReducer(state, action, user?.id), { orders: [] });

  useEffect(() => {
    if (user?.id) {
      try {
        const savedOrders = localStorage.getItem(`boi-para-orders-${user.id}`);
        const orders = savedOrders ? JSON.parse(savedOrders) : [];
        dispatch({ type: 'LOAD_ORDERS', payload: orders });
      } catch {
        dispatch({ type: 'LOAD_ORDERS', payload: [] });
      }
    } else {
      dispatch({ type: 'LOAD_ORDERS', payload: [] });
    }
  }, [user?.id]);

  const addOrder = (orderData: Omit<Order, 'id' | 'orderDate'>) => {
    const order: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderDate: new Date().toISOString()
    };
    dispatch({ type: 'ADD_ORDER', payload: order });
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status } });
  };


  const cancelOrder = (orderId: string) => {
    dispatch({ type: 'CANCEL_ORDER', payload: orderId });
  };
  
  return (
    <OrderContext.Provider value={{ state, addOrder, updateOrderStatus, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};