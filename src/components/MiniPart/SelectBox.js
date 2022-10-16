import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBox(str, elm) {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    var select = elm.map((value, index) => (
        <MenuItem sx={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} key={index} value={value}>
            {value}
        </MenuItem>
    ));

    return (
        <FormControl sx={{ width: 250 }}>
            <InputLabel sx={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} id="demo-select-small">
                Chọn {str}
            </InputLabel>
            <Select labelId="select" id="select" value={value} label={str} onChange={handleChange}>
                <MenuItem sx={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} value="">
                    <em>None</em>
                </MenuItem>
                {select}
            </Select>
        </FormControl>
    );
}
