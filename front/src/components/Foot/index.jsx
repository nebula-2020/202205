import React from 'react'
import Paper from '@mui/material/Paper';
import Style from './index.module.css';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
class Foot extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        const { index = 1, range = 5, onChange = () => { } } = this.props;
        return (
            <Paper className={Style['container']} elevation={2} square>
                <Stack spacing={2}>
                    <Pagination
                        className={Style['pagination']}
                        page={index}
                        count={index + range + 1}
                        shape="rounded"
                        boundaryCount={0}
                        onChange={(e, i) => { onChange(i, e) }}
                        siblingCount={range}
                        renderItem={(item) => (
                            <PaginationItem
                                components={{ previous: ArrowBackIosNewRoundedIcon, next: ArrowForwardIosRoundedIcon }}
                                {...item}
                            />
                        )}
                    />
                </Stack>
            </Paper>
        );
    }
}

export default Foot;