const fetchFromAI = async (prompt: string) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': process.env.AI_API_KEY ?? '',
      },
      body: JSON.stringify({
        enable_google_results: false,
        enable_memory: true,
        input_text: prompt,
      }),
    };
    console.log('Working on your AI request sir!');
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
