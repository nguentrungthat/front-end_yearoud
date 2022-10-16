import Api from './api';

async function GET() {
    var body = null;
    body = await Api.Get('dashboards');
    return body;
}

export { GET };
