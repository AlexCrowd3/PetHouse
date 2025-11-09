import { createClient } from '@supabase/supabase-js';

// const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
// const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const SUPABASE_URL = 'https://sqebwitsrvoktcnigssq.supabase.co';
const SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZWJ3aXRzcnZva3Rjbmlnc3NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2OTExMzYsImV4cCI6MjA3ODI2NzEzNn0.5921N7Lfb8BAzUIZG_ELvVmpl8uO6razEFHOu6h-DSo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const fetchCoworkings = async () => {
    try {
        const { data, error } = await supabase.from('coworkings').select('*');
        if (error) {
            console.error('Ошибка при загрузке коворкингов:', error);
            return [];
        }

        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 8);

        const processed = data.map(cw => ({
            ...cw,
            isOpenNow: cw.open_time <= currentTime && currentTime <= cw.close_time,
        }));

        return processed;
    } catch (err) {
        console.error(err);
        return [];
    }
};
