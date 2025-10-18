import { config } from '@/config/env';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private log(level: LogLevel, message: string, data?: any) {
    if (config.isProduction && level === 'debug') return;
    
    const timestamp = new Date().toISOString();
    const logData = { timestamp, level, message, ...(data && { data }) };
    
    console[level](JSON.stringify(logData));
    
    // In production, send to logging service
    if (config.isProduction) {
      this.sendToLoggingService(logData);
    }
  }
  
  private sendToLoggingService(logData: any) {
    // Implement your logging service integration here
    // e.g., Sentry, LogRocket, etc.
  }
  
  info(message: string, data?: any) {
    this.log('info', message, data);
  }
  
  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }
  
  error(message: string, data?: any) {
    this.log('error', message, data);
  }
  
  debug(message: string, data?: any) {
    this.log('debug', message, data);
  }
}

export const logger = new Logger();