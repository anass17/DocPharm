import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@mui/icons-material';

const SearchInput = ({onchange, model}) => (
    <>
        <label htmlFor='search-input' style={{ marginBottom: '7px', display: 'block', fontFamily: 'Roboto', fontSize: '14px' }}>Search for {model}</label>
        <Input id='search-input' onChange={onchange} size="large" placeholder="Type in something ..." prefix={<SearchOutlined style={{ marginRight: '5px' }} />} style={{borderRadius: '4px' }} />
    </>
);
export default SearchInput;