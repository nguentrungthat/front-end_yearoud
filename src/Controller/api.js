const axios = require('axios').default;
const url = 'http://localhost:8081';

async function Get(data) {
    var body = null;
    await axios
        .get(`${url}/${data}`)
        .then(function (response) {
            body = response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    return body;
}

async function Post(link, data) {
    var body = null;
    await axios
        .post(`${url}/${link}`, data)
        .then(function (response) {
            body = response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    return body;
}

async function GHN_Create(KH, store, items, PAYMENT) {
    var body = null;
    const config = {
        headers: {
            ShopId: 120728,
            Token: '3b20c4b2-6689-11ed-b8cc-a20ef301dcd7',
        },
    };
    let arrItems = [];
    for (let item of items) {
        const temp = {
            name: item.TEN_VATPHAM,
            code: item.ID_VATPHAM.toString(),
            quantity: item.SOLUONG,
            price: item.GIABAN,
            length: 5,
            width: 20,
            height: 15,
            category: {
                level1: 'Áo',
            },
        };
        arrItems.push(temp);
    }
    const data = {
        payment_type_id: 2,
        note: 'Yearoud đơn hàng',
        from_name: store.TEN_STORE,
        from_phone: store.SDT,
        from_address: store.ADDRESS,
        from_ward_name: store.WARD,
        from_district_name: store.DISTRICT,
        from_province_name: store.PROVINCE,
        required_note: 'KHONGCHOXEMHANG',
        client_order_code: '',
        to_name: KH.TEN_KHACHHANG,
        to_phone: KH.SDT,
        to_address: PAYMENT.ADDRESS,
        to_ward_name: PAYMENT.XA,
        to_district_name: PAYMENT.HUYEN,
        to_province_name: PAYMENT.TINH,
        cod_amount: PAYMENT.TOTAL,
        content: 'Giao hàng',
        weight: 500,
        length: 1,
        width: 19,
        height: 10,
        pick_station_id: null,
        deliver_station_id: null,
        insurance_value: 100000,
        service_id: 0,
        service_type_id: 2,
        coupon: null,
        pick_shift: null,
        pickup_time: null,
        items: arrItems,
    };
    console.log(data);
    await axios
        .post('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create', data, config)
        .then(function (response) {
            body = response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    return body;
}

async function GHN_Preview(KH, store, items, PAYMENT) {
    var body = null;
    const config = {
        headers: {
            ShopId: 120728,
            Token: '3b20c4b2-6689-11ed-b8cc-a20ef301dcd7',
        },
    };
    let arrItems = [];
    for (let item of items) {
        const temp = {
            name: item.TEN_VATPHAM,
            code: item.ID_VATPHAM.toString(),
            quantity: item.SOLUONG,
            price: item.GIABAN,
            length: 5,
            width: 20,
            height: 15,
            category: {
                level1: 'Áo',
            },
        };
        arrItems.push(temp);
    }
    const data = {
        payment_type_id: 2,
        note: 'Yearoud đơn hàng',
        from_name: store.TEN_STORE,
        from_phone: store.SDT,
        from_address: store.ADDRESS,
        from_ward_name: store.WARD,
        from_district_name: store.DISTRICT,
        from_province_name: store.PROVINCE,
        required_note: 'KHONGCHOXEMHANG',
        client_order_code: '',
        to_name: KH.TEN_KHACHHANG,
        to_phone: KH.SDT,
        to_address: PAYMENT.ADDRESS,
        to_ward_name: PAYMENT.XA,
        to_district_name: PAYMENT.HUYEN,
        to_province_name: PAYMENT.TINH,
        cod_amount: PAYMENT.TOTAL,
        content: 'Giao hàng',
        weight: 500,
        length: 1,
        width: 19,
        height: 10,
        pick_station_id: null,
        deliver_station_id: null,
        insurance_value: 100000,
        service_id: 0,
        service_type_id: 2,
        coupon: null,
        pick_shift: null,
        pickup_time: null,
        items: arrItems,
    };

    await axios
        .post('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/preview', data, config)
        .then(function (response) {
            body = response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    return body;
}

module.exports = { Get, Post, GHN_Create, GHN_Preview };
