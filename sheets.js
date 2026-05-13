const GS_URL = 'https://script.google.com/macros/s/AKfycbyPChh01cyyxmDjBATpMBos1t2blMdD3XHR4wiTBbO3xOF5gKpyU85gJjigtMVkREQr/exec';

exports.handler = async function(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod === 'GET') {
      const sheet = event.queryStringParameters?.sheet;
      const res = await fetch(`${GS_URL}?sheet=${encodeURIComponent(sheet)}`);
      const data = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      const res = await fetch(GS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
};
