import { MergeDeep } from 'type-fest';

import { Database as DatabaseGenerated } from './supabase';

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        user_settings: {
          Row: {
            // Override preferences to always be type 'Json' (from src/types/supabase.ts)
            preferences: {};
          };
          Insert: {
            preferences?: {};
          };
          Update: {
            preferences?: {};
          };
        };
      };
    };
  }
>;
