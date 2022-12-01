import Api from './api';

async function GET() {
    var body = null;
    body = await Api.Get('magiamgia');
    return body;
}

export { GET };
