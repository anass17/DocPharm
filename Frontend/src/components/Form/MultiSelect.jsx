import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 400,
        },
    },
};

function getStyles(name, data, theme) {
  return {
    fontWeight: data.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

function MultiSelect({label, name, data, setData, error, items = []}) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
        target: { value },
    } = event;

    setData(
        {
            ...data,
            [name]: (typeof value === 'string' ? value.split(',') : value)
        }
        
    );
  };

  return (
    <div>
      <FormControl sx={{ width: '100%' }} error={error}>
        <InputLabel id={name + "-label"}>{label}</InputLabel>
        <Select
          labelId={name + "-label"}
          id="name"
          name = {name}
          multiple
          value={data[name] ? data[name] : []}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem
              key={item}
              value={item}
              style={getStyles(item, data[name] ? data[name] : [], theme)}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultiSelect;