import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '***Insert-Your-API-KEY-here***',
});

export async function getResponse(systemPrompt, userPrompt){
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": systemPrompt
          },
          {
            "role": "user",
            "content": userPrompt
          }
        ],
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      return response;
   
}

