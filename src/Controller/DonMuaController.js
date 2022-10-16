import Api from './api';

async function GET() {
    var body = null;
    body = await Api.Get('donmuas');
    return body;
}

export { GET };
