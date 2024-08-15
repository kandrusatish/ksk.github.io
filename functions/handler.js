const getEmbedding = require('./getEmbedding');
const calculateMetrics = require('./calculateMetrics');

exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        // Fetch embeddings
        const embeddings = await getEmbedding(body.text, apiKey);

        // Calculate metrics
        const metrics = await calculateMetrics(body.text1, body.text2);

        // Combine results and return
        return {
            statusCode: 200,
            body: JSON.stringify({
                embeddings: embeddings,
                metrics: metrics,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
