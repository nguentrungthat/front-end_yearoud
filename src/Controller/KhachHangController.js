import Api from './api';

async function GET() {
    var body = null;
    body = await Api.Get('khachhangs');
    return body;
}

export { GET };
