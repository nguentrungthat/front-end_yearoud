import Api from './api';

async function GET() {
    var body = null;
    body = await Api.Get('stores');
    return body;
}

export { GET };
