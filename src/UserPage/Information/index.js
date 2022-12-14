import clsx from 'clsx';
import { useEffect, useState, useRef } from 'react';
import styles from './Information.module.scss';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const KH = require('../../Controller/KhachHangController');

function Information() {
    const [khachhang, setKhachHang] = useState([]);
    const [account, setAcount] = useState([]);
    const [gender, setGender] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [date, setDate] = useState('');
    const [file, setFile] = useState({});

    const id = localStorage.getItem('id');

    useEffect(() => {
        async function Get() {
            setKhachHang(await KH.GET_KH(id));
            setAcount(await KH.GET_ACCOUNT(id));
            setName((await KH.GET_KH(id))[0]?.TEN_KHACHHANG);
            setGender((await KH.GET_KH(id))[0]?.GIOITINH);
            setEmail((await KH.GET_KH(id))[0]?.EMAIL);
            setSdt((await KH.GET_KH(id))[0]?.SDT);
            setDate((await KH.GET_KH(id))[0]?.NGAYSINH.slice(0, 10));
            return;
        }
        Get();
    }, [id]);

    const fileInput = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await KH.UPDATE({
            ID_KHACHHANG: id,
            TEN_KHACHHANG: name,
            SDT: sdt,
            GIOITINH: gender,
            NGAYSINH: date,
        });
    };
    const handleChangeFile = (event) => {
        const url = event.target.files[0];
        url.review = URL.createObjectURL(url);
        setFile(url);
    };

    return (
        <div className={clsx(styles.main)}>
            <div className={clsx(styles.head)}>
                <div className={clsx(styles.h1)}>H??? s?? c???a t??i</div>
                <div>Qu???n l?? th??ng tin h??? s?? ????? b???o m???t t??i kho???n</div>
            </div>
            <div className={clsx(styles.inline_flex)}>
                <form onSubmit={handleSubmit} className={clsx(styles.infor_details)}>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}>T??n ????ng nh???p</div>
                        <div className={clsx(styles.right)}>
                            <div>{account[0]?.TAIKHOAN}</div>
                        </div>
                    </div>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}>T??n</div>
                        <div className={clsx(styles.right)}>
                            <input
                                className={clsx(styles.input)}
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}>E-mail</div>
                        <div className={clsx(styles.right)}>
                            <input
                                style={{ backgroundColor: '#ebebeb' }}
                                readOnly
                                className={clsx(styles.input)}
                                type="text"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}>S??? ??i???n tho???i</div>
                        <div className={clsx(styles.right)}>
                            <input
                                className={clsx(styles.input)}
                                type="text"
                                value={sdt}
                                onChange={(event) => setSdt(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}>Gi???i t??nh</div>
                        <div className={clsx(styles.right)}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    value={gender}
                                    onChange={(event) => setGender(Number(event.target.value))}
                                >
                                    <FormControlLabel
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: '2.4rem',
                                            },
                                            '& .MuiTypography-root': {
                                                fontSize: '1.6rem',
                                            },
                                        }}
                                        value={1}
                                        control={<Radio />}
                                        label="Nam"
                                    />
                                    <FormControlLabel
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: '2.4rem',
                                            },
                                            '& .MuiTypography-root': {
                                                fontSize: '1.6rem',
                                            },
                                        }}
                                        value={2}
                                        control={<Radio />}
                                        label="N???"
                                    />
                                    <FormControlLabel
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: '2.4rem',
                                            },
                                            '& .MuiTypography-root': {
                                                fontSize: '1.6rem',
                                            },
                                        }}
                                        value={3}
                                        control={<Radio />}
                                        label="Kh??c"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}>Ng??y sinh</div>
                        <div className={clsx(styles.right)}>
                            <LocalizationProvider sx={{ width: '100%' }} dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    inputProps={{ style: { fontSize: '1.6rem' } }}
                                    label="Ng??y sinh"
                                    value={date}
                                    inputFormat="DD/MM/YYYY"
                                    onChange={(newValue) => {
                                        setDate(`${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className={clsx(styles.inline_flex)}>
                        <div className={clsx(styles.left)}></div>
                        <div className={clsx(styles.right)}>
                            <Button
                                type="submit"
                                sx={{
                                    width: '7rem',
                                    height: '4rem',
                                    fontSize: '1.4rem',
                                    textTransform: 'capitalize',
                                }}
                                variant="contained"
                            >
                                L??u
                            </Button>
                        </div>
                    </div>
                </form>
                <div className={clsx(styles.update_avatar)}>
                    <div className={clsx(styles.avatar)}>
                        <Avatar
                            src={file?.review}
                            sx={{ width: '10rem', height: '10rem' }}
                            alt={khachhang[0]?.TEN_KHACHHANG}
                        />
                    </div>
                    <input style={{ display: 'none' }} type="file" onChange={handleChangeFile} ref={fileInput} />
                    <Button
                        onClick={() => fileInput.current.click()}
                        sx={{ width: '10rem', height: '4rem', fontSize: '1.4rem', textTransform: 'capitalize' }}
                        variant="outlined"
                    >
                        Ch???n ???nh
                    </Button>
                    <span className={clsx(styles.text_format)}>
                        D???ng l?????ng file t???i ??a 1 MB
                        <br />
                        ?????nh d???ng:.JPEG, .PNG
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Information;
