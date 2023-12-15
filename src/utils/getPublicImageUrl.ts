import supabase from '@/lib/supabase';

const getPublicImageUrl = async (filepath) => {
  try {
    const { data } = await supabase.storage
      .from('images')
      .getPublicUrl(filepath);

    return data.publicUrl;
  } catch (error) {
    console.error('Unexpected error:', error);
    return null;
  }
};

export default getPublicImageUrl;
