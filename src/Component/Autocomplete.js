import { AutoComplete, Typography  } from 'antd';
import react, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, getAutocompleteList } from '../redux/index.js';
import "antd/dist/antd.css";

const { Option } = AutoComplete;
const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});

function Autocomplete(){
    const count = useSelector(state => state.counter)
    const dispatch = useDispatch()
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
    const [optionsFiltered, setOptionsFiltered] = useState([]);

    useEffect(()=>{
        if(count.list.length !== 0){
            setOptions(count.list)
        }
    },[count])

    const hasTest = (data, textType) => {
        var str = data.description.toLowerCase();
        var hasTest = str.includes(textType.toLowerCase());
        return hasTest
    }

    const onSearch = (searchText) => {
        var tempList = [];
        for(let i=0; i< options.length; i++){
            if(hasTest(options[i], searchText) === true){
                tempList = [
                    ...tempList,
                    {
                        ...options[i]
                    }
                ]
            }
        }
        setOptionsFiltered(
            [
                ...tempList
            ],
        );
    };

    const onSelect = (data) => {
        console.log('onSelect', data);
    };

    const onChange = (data) => {
        setValue(data);
    };
    return(
        <div
        style={{
            width: '100%',
            margin: '0 auto',
            textAlign: 'center'
        }}>
           <Typography>Input Here</Typography>
           <AutoComplete
                style={{
                    width: 200,
                    margin: '0 auto',
                }}
                onSearch={onSearch}
                onSelect={onSelect}
                onChange={onChange}
            >
                {optionsFiltered.map((row) => (
                    <Option key={row.place_id} value={row.description}>
                        {row.description}
                    </Option>
                ))}
            </AutoComplete>
            <br />
            <br />
        </div>
    )

}
export default Autocomplete;