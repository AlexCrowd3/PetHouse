import { supabase } from '../service/supabase';

export async function getAllServices() {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('rating', { ascending: false });

    if (error) {
        console.error('Ошибка загрузки:', error);
        return [];
    }

    return data;
}