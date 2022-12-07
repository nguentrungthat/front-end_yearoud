import Api from './api';

async function GET() {
    let body = await Api.Get('magiamgia');
    let rows = [];
    let arrCheck = [];
    let index = 0;
    for (const code of body) {
        let check = true;
        if (code.ACTIVE === 0) check = false;
        arrCheck.push(check);
        var row = {
            id: code.ID_MGG,
            col1: code.MAGIAMGIA,
            col2: new Date(code.TG_BATDAU).toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0, 10),
            col3: new Date(code.TG_KETTHUC).toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0, 10),
            col4: code.GIATRI_GIAM * 100 + '%',
            col5: code.ACTIVE,
            index: index,
        };
        index++;
        rows.push(row);
    }
    return [rows, arrCheck];
}

async function CREATE(body) {
    return await Api.Post('magiamgia/create', body);
}

async function UPDATE(body) {
    return await Api.Post('magiamgia/update', body);
}

async function DELETE(body) {
    return await Api.Post('magiamgia/delete', body);
}

export { GET, CREATE, DELETE, UPDATE };
