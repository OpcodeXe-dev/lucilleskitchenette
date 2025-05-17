import { createClient } from '@supabase/supabase-js'






const supabaseUrl = 'https://fnyacxeddqjpmtovvdcv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZueWFjeGVkZHFqcG10b3Z2ZGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDcwNTYsImV4cCI6MjA1ODYyMzA1Nn0.S7qXtyHOVG3I2KXAiAooWV76znPUhzDYcqS5JhNB6gk"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase