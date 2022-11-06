import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBox(str, elm) {
    const [value, setValue] = React.useState('');
    const [id, setID] = React.useState('');

    const handleChange = (event, name) => {
        setValue(event.target.value);
        setID(name.props.id);
    };

    var select = elm.map((value, index) => (
        <MenuItem id={value.ID} sx={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} key={index} value={value.VALUE}>
            {value.VALUE}
        </MenuItem>
    ));
    return (
        <FormControl sx={{ width: 250 }}>
            <InputLabel sx={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}>Chọn {str} *</InputLabel>
            <Select id={`${id}`} value={value} label={str} onChange={handleChange}>
                <MenuItem sx={{ fontSize: 14, fontFamily: 'Poppins-Regular' }} value="">
                    <em>None</em>
                </MenuItem>
                {select}
            </Select>
        </FormControl>
    );
}
