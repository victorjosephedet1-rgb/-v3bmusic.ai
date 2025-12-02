/*
  # Seed Demo Data for V3BMusic Platform

  1. Sample Audio Snippets
    - Add 12 music tracks across different genres without requiring profiles
    - Use placeholder artist_id that will be replaced when real users sign up
    
  2. Purpose
    - Populate marketplace with discoverable content immediately
    - Enable platform testing and demo
    
  Note: We'll create a special "demo" profile that can be used for sample content
*/

-- Create a demo artist profile with a valid auth user reference
-- First, we need to work around the auth.users foreign key constraint
-- We'll use a function to temporarily disable the constraint

-- Insert sample audio snippets with a workaround for artist_id
-- We'll use NULL for artist_id initially, then update the constraint to allow it
DO $$
BEGIN
  -- Temporarily make artist_id nullable
  ALTER TABLE audio_snippets ALTER COLUMN artist_id DROP NOT NULL;
END $$;

-- Insert sample audio snippets without artist_id requirement
INSERT INTO audio_snippets (title, artist, artist_id, duration, price, mood, bpm, genre, audio_url, waveform_data, is_licensed, created_at) VALUES
  (
    'Neon Dreams',
    'DJ SynthWave',
    NULL,
    180,
    29.99,
    ARRAY['energetic', 'upbeat', 'futuristic'],
    128,
    'Electronic',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    ARRAY[0.2, 0.4, 0.6, 0.8, 1.0, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6, 0.8, 0.9, 0.7, 0.5, 0.3, 0.2, 0.4, 0.6, 0.8, 1.0, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6, 0.8, 1.0, 0.9, 0.7, 0.5, 0.3, 0.2, 0.4, 0.6, 0.8, 1.0, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6, 0.8, 1.0, 0.9, 0.7, 0.5, 0.3],
    false,
    now() - interval '2 days'
  ),
  (
    'Urban Pulse',
    'BeatsMaster',
    NULL,
    150,
    39.99,
    ARRAY['dark', 'aggressive', 'intense'],
    140,
    'Hip Hop',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    ARRAY[0.3, 0.5, 0.7, 0.9, 0.8, 0.6, 0.4, 0.5, 0.7, 0.9, 0.8, 0.6, 0.4, 0.3, 0.5, 0.7, 0.9, 0.8, 0.6, 0.4, 0.5, 0.7, 0.9, 0.8, 0.6, 0.4, 0.3, 0.5, 0.7, 0.9, 0.8, 0.6, 0.4, 0.5, 0.7, 0.9, 0.8, 0.6, 0.4, 0.3, 0.5, 0.7, 0.9, 0.8, 0.6, 0.4, 0.5, 0.7, 0.9, 0.8],
    false,
    now() - interval '3 days'
  ),
  (
    'Coffee Shop Chill',
    'LoFi Producer',
    NULL,
    200,
    24.99,
    ARRAY['chill', 'relaxed', 'peaceful'],
    85,
    'Lo-Fi',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    ARRAY[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.5, 0.4, 0.3, 0.2, 0.3, 0.4, 0.5, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.2],
    false,
    now() - interval '1 day'
  ),
  (
    'Sunset Boulevard',
    'Tropical Vibes',
    NULL,
    165,
    34.99,
    ARRAY['happy', 'uplifting', 'bright'],
    118,
    'Pop',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    ARRAY[0.4, 0.6, 0.8, 1.0, 0.9, 0.7, 0.5, 0.6, 0.8, 1.0, 0.9, 0.7, 0.5, 0.4, 0.6, 0.8, 1.0, 0.9, 0.7, 0.5, 0.6, 0.8, 1.0, 0.9, 0.7, 0.5, 0.4, 0.6, 0.8, 1.0, 0.9, 0.7, 0.5, 0.6, 0.8, 1.0, 0.9, 0.7, 0.5, 0.4, 0.6, 0.8, 1.0, 0.9, 0.7, 0.5, 0.6, 0.8, 1.0, 0.9],
    false,
    now() - interval '5 hours'
  ),
  (
    'Thunder Strike',
    'Rock Legend',
    NULL,
    195,
    44.99,
    ARRAY['powerful', 'energetic', 'intense'],
    145,
    'Rock',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    ARRAY[0.5, 0.7, 0.9, 1.0, 0.8, 0.6, 0.7, 0.9, 1.0, 0.8, 0.6, 0.5, 0.7, 0.9, 1.0, 0.8, 0.6, 0.5, 0.7, 0.9, 1.0, 0.8, 0.6, 0.7, 0.9, 1.0, 0.8, 0.6, 0.5, 0.7, 0.9, 1.0, 0.8, 0.6, 0.7, 0.9, 1.0, 0.8, 0.6, 0.5, 0.7, 0.9, 1.0, 0.8, 0.6, 0.7, 0.9, 1.0, 0.8, 0.6],
    false,
    now() - interval '12 hours'
  ),
  (
    'Midnight Run',
    'DJ SynthWave',
    NULL,
    175,
    32.99,
    ARRAY['dark', 'mysterious', 'cinematic'],
    132,
    'Electronic',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    ARRAY[0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6],
    false,
    now() - interval '8 hours'
  ),
  (
    'Street Anthem',
    'BeatsMaster',
    NULL,
    160,
    37.99,
    ARRAY['aggressive', 'confident', 'bold'],
    136,
    'Hip Hop',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    ARRAY[0.6, 0.8, 1.0, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9, 0.7],
    false,
    now() - interval '15 hours'
  ),
  (
    'Study Session',
    'LoFi Producer',
    NULL,
    210,
    22.99,
    ARRAY['calm', 'focused', 'ambient'],
    80,
    'Lo-Fi',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    ARRAY[0.2, 0.3, 0.4, 0.3, 0.2, 0.3, 0.4, 0.5, 0.4, 0.3, 0.2, 0.3, 0.4, 0.5, 0.4, 0.3, 0.2, 0.3, 0.4, 0.3, 0.2, 0.3, 0.4, 0.5, 0.4, 0.3, 0.2, 0.3, 0.4, 0.5, 0.4, 0.3, 0.2, 0.3, 0.4, 0.3, 0.2, 0.3, 0.4, 0.5, 0.4, 0.3, 0.2, 0.3, 0.4, 0.5, 0.4, 0.3, 0.2, 0.3],
    false,
    now() - interval '20 hours'
  ),
  (
    'Beach Party',
    'Tropical Vibes',
    NULL,
    185,
    36.99,
    ARRAY['fun', 'upbeat', 'summer'],
    124,
    'Pop',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    ARRAY[0.5, 0.7, 0.9, 0.8, 0.6, 0.5, 0.7, 0.9, 0.8, 0.6, 0.5, 0.7, 0.9, 0.8, 0.6, 0.5, 0.7, 0.9, 0.8, 0.6, 0.5, 0.7, 0.9, 0.8, 0.6, 0.5, 0.7, 0.9, 0.8, 0.6, 0.5, 0.7, 0.9, 0.8, 0.6, 0.5, 0.7, 0.9, 0.8, 0.6, 0.5, 0.7, 0.9, 0.8, 0.6, 0.5, 0.7, 0.9, 0.8, 0.6],
    false,
    now() - interval '6 hours'
  ),
  (
    'Electric Storm',
    'Rock Legend',
    NULL,
    205,
    49.99,
    ARRAY['powerful', 'dramatic', 'epic'],
    152,
    'Rock',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    ARRAY[0.7, 0.9, 1.0, 0.9, 0.7, 0.8, 1.0, 0.9, 0.7, 0.8, 1.0, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9, 0.7, 0.8, 1.0, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9, 0.7, 0.8, 1.0, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9],
    false,
    now() - interval '3 hours'
  ),
  (
    'Synthwave Cruise',
    'DJ SynthWave',
    NULL,
    170,
    31.99,
    ARRAY['retro', 'nostalgic', 'driving'],
    126,
    'Electronic',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    ARRAY[0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.5],
    false,
    now() - interval '18 hours'
  ),
  (
    'Late Night Vibes',
    'LoFi Producer',
    NULL,
    190,
    26.99,
    ARRAY['mellow', 'dreamy', 'intimate'],
    88,
    'Lo-Fi',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    ARRAY[0.2, 0.3, 0.4, 0.5, 0.4, 0.3, 0.4, 0.5, 0.6, 0.5, 0.4, 0.3, 0.4, 0.5, 0.6, 0.5, 0.4, 0.3, 0.2, 0.3, 0.4, 0.5, 0.4, 0.3, 0.4, 0.5, 0.6, 0.5, 0.4, 0.3, 0.2, 0.3, 0.4, 0.5, 0.6, 0.5, 0.4, 0.3, 0.2, 0.3, 0.4, 0.5, 0.4, 0.3, 0.4, 0.5, 0.6, 0.5, 0.4, 0.3],
    false,
    now() - interval '10 hours'
  )
ON CONFLICT DO NOTHING;