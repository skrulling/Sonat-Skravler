import { supabase } from '../lib/supabaseClient'

export async function LoadAllMessages(){
    return await supabase.from('Messages').select(`
        id,
        created_at,
        user,
        message,
        topic (
            name
        ),
        reply_to
    `);
}

export async function LoadAllTopics(){
    return await supabase.from('Topic').select('*');
}

export async function SendMessage(username, message, topic = 1) {
    return { data, error } = await supabase
        .from('Messages')
        .insert([
            { user: username, message: message, topic: topic }
        ])
}