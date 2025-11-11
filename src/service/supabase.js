import { createClient } from '@supabase/supabase-js';



const SUPABASE_URL = 'https://fdsajoyzxvtawsuiaabu.supabase.co';
const SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkc2Fqb3l6eHZ0YXdzdWlhYWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NzE1ODgsImV4cCI6MjA3ODQ0NzU4OH0.LfTcOZPKftzrBdUSKDjh8-S2XPfJ1Zr6NtSQBwsbI_o';

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
