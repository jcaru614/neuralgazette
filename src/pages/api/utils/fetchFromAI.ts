const fetchFromAI = async (prompt: string) => {
  try {
    console.log('action!');
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': process.env.AI_API_KEY ?? '',
      },
      body: JSON.stringify({
        enable_google_results: 'true',
        enable_memory: false,
        input_text: prompt,
      }),
    };

    const response = await fetch(
      'https://api.writesonic.com/v2/business/content/chatsonic?engine=premium&language=en',
      options,
    );

    const data = response.json();
    return data;
  } catch (error) {
    console.error('Error calling writeToAI:', error);
    throw error;
  }
};

export default fetchFromAI;
