import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://nawtfguapclxbylcurfb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hd3RmZ3VhcGNseGJ5bGN1cmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDMzMTcsImV4cCI6MjA2NDQxOTMxN30.5mKbW93B4RFG4jVwHpj8mbwKN5cncaPZ8l2hYOTLt6A"
);
 