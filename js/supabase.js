import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

export const supabase = createClient(
  'https://eiphlylrwwijogoyqwns.supabase.co',
  'sb_publishable_afTPTTSnyflSQpDVZLzlvA_1G08TBJp',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'ambiorix-auth'
    }
  }
);