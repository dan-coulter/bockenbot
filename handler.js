'use strict';
const axios = require('axios').default;
const FormData = require('form-data');

module.exports.postBocken = async (event) => {
    const timestamp = new Date().getTime();
    const stream = await axios.get(
        `https://bocken.gavle.se/kamera/bocken.jpg?t=${timestamp}`,
        {
            responseType: 'stream',
            headers: { Referer: 'https://www.visitgavle.se/en/gavlebocken' },
        }
    );

    const form = new FormData();
    form.append('image', stream.data, 'bocken.jpg');

    await axios.post(process.env.DISCORD_WEBHOOK, form, {
        headers: {
            ...form.getHeaders(),
        },
    });

    console.log('all done');

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message:
                    'Go Serverless v1.0! Your function executed successfully!',
                input: event,
            },
            null,
            2
        ),
    };

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
