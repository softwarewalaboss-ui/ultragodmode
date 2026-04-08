import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import type { NotificationAlert, NotificationType } from '@/components/shared/GlobalNotificationHeader';

interface NotificationContextType {
  notifications: NotificationAlert[];
  addNotification: (type: NotificationType, message: string, eventType: string, options?: {
    actionLabel?: string;
    actionUrl?: string;
    isBuzzer?: boolean;
    roleTarget?: string[];
  }) => Promise<void>;
  dismissNotification: (id: string) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  handleAction: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
  unreadCount: number;
  buzzerNotifications: NotificationAlert[];
  hasBuzzer: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

/**
 * NotificationProvider — local in-memory notifications.
 * No edge function dependency. Notifications are session-scoped.
 */
export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const { user, userRole } = useAuth();
  const [notifications, setNotifications] = useState<NotificationAlert[]>([]);

  const addNotification = useCallback(async (
    type: NotificationType,
    message: string,
    eventType: string,
    options?: {
      actionLabel?: string;
      actionUrl?: string;
      isBuzzer?: boolean;
      roleTarget?: string[];
    }
  ) => {
    if (!user) return;

    const newNotification: NotificationAlert = {
      id: crypto.randomUUID(),
      type,
      message,
      timestamp: new Date(),
      eventType,
      actionLabel: options?.actionLabel,
      actionUrl: options?.actionUrl,
      isBuzzer: options?.isBuzzer || false,
      roleTarget: options?.roleTarget || [],
    };

    setNotifications(prev => [newNotification, ...prev].slice(0, 50));
  }, [user]);

  const dismissNotification = useCallback(async (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const markAsRead = useCallback(async (_id: string) => {
    // In-memory: no persistent read state needed
  }, []);

  const handleAction = useCallback(async (id: string) => {
    await dismissNotification(id);
  }, [dismissNotification]);

  const clearAll = useCallback(async () => {
    setNotifications(prev => prev.filter(n => n.isBuzzer));
  }, []);

  const filteredNotifications = notifications.filter(n => {
    if (!n.roleTarget || n.roleTarget.length === 0) return true;
    return n.roleTarget.includes(userRole || '') || userRole === 'boss_owner';
  });

  const buzzerNotifications = filteredNotifications.filter(n => n.isBuzzer && n.type === 'priority');
  const hasBuzzer = buzzerNotifications.length > 0;
  const unreadCount = filteredNotifications.length;

  return (
    <NotificationContext.Provider value={{
      notifications: filteredNotifications,
      addNotification,
      dismissNotification,
      markAsRead,
      handleAction,
      clearAll,
      unreadCount,
      buzzerNotifications,
      hasBuzzer,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
