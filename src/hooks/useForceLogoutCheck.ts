import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

/**
 * Force logout check using user_roles.force_logged_out_at column
 * No RPC needed - direct table query
 */
export function useForceLogoutCheck() {
  const navigate = useNavigate();

  const checkForceLogout = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      // Check force_logged_out_at directly from user_roles table
      const { data: roles } = await supabase
        .from('user_roles')
        .select('force_logged_out_at')
        .eq('user_id', user.id)
        .not('force_logged_out_at', 'is', null)
        .limit(1);

      if (roles && roles.length > 0) {
        const logoutTime = roles[0].force_logged_out_at;
        if (logoutTime) {
          const logoutDate = new Date(logoutTime);
          const sessionStart = sessionStorage.getItem('session_start');
          
          if (sessionStart && logoutDate > new Date(sessionStart)) {
            await supabase.auth.signOut();
            sessionStorage.clear();
            
            toast.error('Your session has been terminated by an administrator', {
              duration: 5000
            });
            
            navigate('/auth');
            return true;
          }
        }
      }
      
      return false;
    } catch (error) {
      console.error('Force logout check failed:', error);
      return false;
    }
  }, [navigate]);

  useEffect(() => {
    if (!sessionStorage.getItem('session_start')) {
      sessionStorage.setItem('session_start', new Date().toISOString());
    }

    checkForceLogout();
    const interval = setInterval(checkForceLogout, 30000);
    return () => clearInterval(interval);
  }, [checkForceLogout]);

  // Subscribe to realtime force logout events
  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const setupRealtimeSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      channel = supabase
        .channel('force-logout')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'user_roles',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            const newData = payload.new as any;
            if (newData.force_logged_out_at) {
              checkForceLogout();
            }
          }
        )
        .subscribe();
    };

    setupRealtimeSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [checkForceLogout]);

  return { checkForceLogout };
}