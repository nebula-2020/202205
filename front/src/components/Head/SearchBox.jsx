import React from 'react'
import Style from './index.module.css';
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            listOpen: false,
        }
        this.input = undefined;
    }
    keyUpHandler (ev) {
        var charCode;
        if (ev.charCode) {
            charCode = ev.charCode;
        } else {
            charCode = ((ev.which) ? ev.which : ev.keyCode);
        }
        return charCode === 13 || charCode === 3;
    }
    handleSubmit (search, e) {
        const {
            onSubmit = (val, e) => { console.log(val) },
        } = this.props;
        let input = search;
        if (this.input) {
            let inputDom = this.input;
            if (inputDom && inputDom.current) {
                inputDom = inputDom.current;
            }
            inputDom = inputDom.querySelector('input');
            input = inputDom.value || input;
        }
        this.setState({ search: input });
        onSubmit(input, e)
    }
    render () {
        const { search, listOpen } = this.state;
        const {
            onChange = (e) => { return e.nativeEvent.data; },
            onBlur = (e) => { console.log(e.target.value) },
            suggests = [],
        } = this.props;
        const suggestsLen = suggests.length;
        const open = listOpen && suggestsLen > 0;
        return (
            <Autocomplete
                handleHomeEndKeys
                className={Style['input-box']}
                filterOptions={(x) => x}
                open={open}
                onOpen={() => {
                    this.setState({ listOpen: true });
                }}
                onClose={() => {
                    this.setState({ listOpen: false });
                }}
                onChange={(e) => {
                    if (e) {
                        onChange(e);
                        this.setState({ search: e.target.value });
                    }
                }}
                onInputChange={(e) => {
                    if (e) {
                        onChange(e);
                        this.setState({ search: e.target.value });
                    }
                }}
                onBlur={(e) => {
                    onBlur(e);
                    console.log(e.target.value)
                    this.setState({ search: e.target.value, listOpen: false });
                }}
                onKeyUp={(e) => {
                    if (this.keyUpHandler(e)) {
                        this.handleSubmit(search, e);
                    }
                }}
                isOptionEqualToValue={(option, value) => option['label'] === (value['label'] || `${value}`)}
                getOptionLabel={(option) => { console.log('act', option); return option.label || `${option}` }}
                options={suggests}
                // value={search}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        ref={(ele) => { this.input = ele }}
                        variant="outlined"
                        sx={{
                            '& .MuiInputBase-input': { padding: 1 },
                            '& .MuiOutlinedInput-root': { paddingRight: .5 },
                            '&:listbox': { background: 'unset' }
                        }}
                        size="small"
                        autoComplete="off"
                        InputProps={{
                            ...params.InputProps, startAdornment: (
                                <InputAdornment size="small" position="start" className={Style['s-btn']}>
                                    <IconButton
                                        size="small"
                                        onFocus={() => { this.setState({ listOpen: true }); }}
                                        onClick={(e) => {
                                            this.handleSubmit(search, e);
                                        }}
                                    >
                                        <SearchRoundedIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                )}
            />
        )
    }
}
export default SearchBox;