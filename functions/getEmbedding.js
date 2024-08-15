const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    
    const body = JSON.parse(event.body);
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            input: body.text,
            model: 'text-embedding-ada-002',
        }),
    });

    if (!response.ok) {
        return {
            statusCode: response.status,
            body: JSON.stringify({ error: 'Failed to fetch embeddings' }),
        };
    }

    const data = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};