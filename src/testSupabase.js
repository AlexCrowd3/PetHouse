import { supabase } from './lib/supabase';

export async function testSupabaseConnection() {
    const { data, error } = await supabase
        .from('coworkings')
        .select('*')
        .limit(1);

    if (error) {
        console.error('❌ Ошибка подключения к Supabase:', error);
    } else {
        console.log('✅ Подключение успешно, пример данных:', data);
    }
}
