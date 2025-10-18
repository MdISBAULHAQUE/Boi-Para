// Analytics utility for tracking user interactions
export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    // In production, integrate with Google Analytics, Mixpanel, etc.
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event, properties);
    }
    
    // Example Google Analytics 4 integration
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, properties);
    }
  },

  page: (path: string, title?: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path,
        page_title: title,
      });
    }
  },

  // E-commerce tracking
  purchase: (transactionId: string, items: any[], value: number) => {
    analytics.track('purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'INR',
      items: items
    });
  },

  addToCart: (item: any) => {
    analytics.track('add_to_cart', {
      currency: 'INR',
      value: parseFloat(item.price.replace('₹', '')),
      items: [item]
    });
  },

  viewItem: (item: any) => {
    analytics.track('view_item', {
      currency: 'INR',
      value: parseFloat(item.price.replace('₹', '')),
      items: [item]
    });
  }
};