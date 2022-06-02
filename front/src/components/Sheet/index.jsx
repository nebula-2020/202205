import React from 'react'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Style from './index.module.css';
import IconButton from '@mui/material/IconButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
class Sheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data || [],
        }
    }
    render () {
        const { data } = this.state;
        const { meta = {}, mutiDelete = false } = this.props;
        let i = 0;
        let tableHead = {};
        data.forEach(row => {
            for (let key in row) {
                const ele = meta[key] || key;
                console.log(ele)
                if (typeof ele == 'string') {
                    tableHead[`${ele}`] = { name: `${ele}`, index: 2147483647, dom: (<TableCell component="th">{`${ele}`}</TableCell>) };
                } else {
                    const { label = '', name = '', index = 2147483647, ...etc } = ele;
                    tableHead[label] = { name: name || label || key, index: Math.max(0, index), dom: (<TableCell component="th" {...etc}>{label || key}</TableCell>), ...etc };
                }
            }
        });
        let ths = [];
        Object.keys(tableHead).forEach(key => {
            ths.push(tableHead[key])
        })
        ths.sort((a, b) => a.index > b.index);
        let body = [];
        data.forEach((row) => {
            let cells = [];
            ths.forEach(cols => {
                const { name, label, index, dom, ...etc } = cols;
                const cell = (
                    <TableCell key={`&${i++}`} scope="row" component="td" {...etc} className={Style['table-cell']}>
                        {row[name] || ''}
                    </TableCell>
                );
                cells.push(cell);
            });
            body.push((
                <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell key={`&${i++}`} scope="row" component="td" className={Style['table-cell']}>
                        {
                            mutiDelete ? (
                                <Checkbox />
                            ) : (
                                <IconButton>
                                    <DeleteRoundedIcon />
                                </IconButton>
                            )
                        }
                        &ensp;
                        <IconButton>
                            <EditRoundedIcon />
                        </IconButton>
                    </TableCell>
                    {cells}
                </TableRow>
            ));
        });
        ths.unshift({
            name: '',
            index: -1,
            dom: (
                <TableCell component="th" >
                    {
                        mutiDelete ? [
                            (
                                <IconButton>
                                    <DeleteRoundedIcon />
                                </IconButton>
                            ),
                            <>&ensp;</>
                        ] : ''
                    }

                    <IconButton>
                        <AddCircleRoundedIcon />
                    </IconButton>
                </TableCell>
            )
        });
        return (
            <div>
                <TableContainer className={Style['container']}  >
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                {ths.map((ele) => ele.dom)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {body}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default Sheet;