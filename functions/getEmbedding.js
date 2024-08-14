const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { text } = JSON.parse(event.body);

    if (!text) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Text is required" }),
        };
    }

    const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            input: text,
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