import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@mui/icons-material';

const SearchInput = ({model}) => (
    <>
        <label htmlFor='search-input' style={{ marginBottom: '7px', display: 'block', fontFamily: 'Roboto', fontSize: '14px' }}>Search for {model}</label>
        <Input id='search-input' size="large" placeholder="Type in something ..." prefix={<SearchOutlined style={{ marginRight: '5px' }} />} style={{ maxWidth: '420px', borderRadius: '4px' }} />
    </>
);
export default SearchInput;