import React from 'react'
import Paper from '@mui/material/Paper';
import Style from './index.module.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
// import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SearchBox from './SearchBox';
// import { min, format, parse } from 'date-fns';
const DATE_FORMAT = 'yyyy-MM-dd';
class HeaderInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clear: false,
        }
    }
    render () {
        const { clear } = this.state;
        const { onBlur = (val) => { console.log(val) }, label = '' } = this.props;
        const props = {
            label: label,
            variant: "outlined",
            size: "small",
            onBlur: (e) => { onBlur(e.target.value, e); },
            InputProps: {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            edge="end"
                            onClick={() => {
                                onBlur('', undefined);
                                const that = this;
                                setTimeout(() => { that.setState({ clear: true }); }, 1)
                            }}
                        >
                            <ClearRoundedIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }
        };
        if (clear) {
            this.setState({ clear: false });
        }
        return clear ? (
            <TextField value=""{...props} />
        ) : (
            <TextField {...props} />
        );
    }
}
class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exists: '',
            exclude: '',
            site: '',
            earliestSeconds: Date.now(),
            latestSeconds: Date.now(),
            expanded: false,
        }
    }
    handleChange (newValue) {
        this.setState(newValue);
    }
    render () {
        const { expanded, earliestSeconds, latestSeconds, exists, exclude, site } = this.state;
        const {
            onChange = (e) => { return e.nativeEvent.data; },
            onBlur = (e) => { console.log(e.target.value) },
            onSubmit = (e) => { console.log(e.target.value) },
            suggests = [],
            items = [],
        } = this.props;
        return (
            <Paper className={Style['container']} elevation={2} square>
                <div className={Style['content']}>
                    <div className={Style['flex-item']}>
                    </div>
                    <div className={Style['flex-center']}>
                        <Accordion
                            square
                            disableGutters
                            elevation={0}
                            className={`gold-width-fixed ${Style['accordion']}`}
                            sx={{
                                '& root': { bgColor: 'none' },
                                '&:before': { display: 'none' },
                                '& .Mui-focusVisible': { background: 'unset', backgroundColor: 'unset !important' },
                                m: 0,
                                p: 0,
                                '& .MuiAccordionSummary-root': { m: 0, p: 0, minHeight: 'unset' }
                            }}
                            TransitionProps={{ unmountOnExit: true }}
                            onChange={() => { }}
                            expanded={expanded}
                        >
                            <AccordionSummary
                                expandIcon={(
                                    <IconButton onClick={() => { this.setState({ expanded: !expanded }) }}>
                                        <ExpandMoreIcon />
                                    </IconButton>
                                )}
                                sx={{ bgColor: 'none', m: 0, p: 0, '& .MuiAccordionSummary-content': { m: 0, p: 0, minHeight: 'none' } }}
                                disableRipple
                                disableFocusRipple
                            >
                                <SearchBox
                                    onChange={(e) => { onChange(e) }}
                                    onBlur={(e) => { onBlur(e) }}
                                    onSubmit={(search, e) => {
                                        onSubmit(search, [earliestSeconds, latestSeconds], exists, exclude, site, e)
                                    }}
                                    suggests={suggests}
                                />
                            </AccordionSummary>
                            <AccordionDetails sx={{ m: 0, p: 0 }}>
                                <Stack direction="column" spacing={1} sx={{ pl: '1.5rem', pr: '3rem', pt: 2, pb: 1 }}>
                                    <HeaderInput
                                        label="在站点中搜索"
                                        onBlur={(value, _) => {
                                            this.setState({ site: value });
                                        }}
                                    />
                                    <HeaderInput
                                        label="包含关键词"
                                        onBlur={(value, _) => {
                                            this.setState({ exists: value });
                                        }}
                                    />
                                    <HeaderInput
                                        label="排除关键词"
                                        onBlur={(value, _) => {
                                            this.setState({ exclude: value });
                                        }}
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <div className={Style['date-picker']}>
                                            <DatePicker
                                                value={earliestSeconds}
                                                inputFormat={DATE_FORMAT}
                                                onChange={(v) => {
                                                    this.setState({
                                                        earliestSeconds: v,
                                                    });
                                                }}
                                                className={Style['date-picker-input']}
                                                renderInput={(params) => <TextField size="small" {...params} />}
                                            />
                                            &emsp;<ArrowForwardRoundedIcon color="disabled" />&emsp;
                                            <DatePicker
                                                value={latestSeconds}
                                                inputFormat={DATE_FORMAT}
                                                onChange={(v) => {
                                                    this.setState({
                                                        latestSeconds: v,
                                                    });
                                                }}
                                                className={Style['date-picker-input']}
                                                renderInput={(params) => <TextField size="small" {...params} />}
                                            />
                                        </div>
                                    </LocalizationProvider>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <Stack
                        direction="row"
                        spacing={0}
                        className={`${Style['flex-item']} early-hidden`}
                        justifyContent="flex-end"
                    >
                        {items}
                        &emsp;
                    </Stack>
                </div>
            </Paper>
        );
    }
}

export default Head;