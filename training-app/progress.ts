
import { supabase } from './db';

export async function markLessonComplete(userId, lessonId) {
  const { data, error } = await supabase
    .from('lesson_progress')
    .upsert([{ user_id: userId, lesson_id: lessonId, completed: true }]);
  return { data, error };
}

export async function getProgress(userId) {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
}
