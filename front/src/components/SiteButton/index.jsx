import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Style from './index.module.css';
import Consts from '../../assets/script/constants'

function Cell (props) {
    const {
        bgColor = '',
        label = '',
        detail = '',
        labelClassName = '',
        labelStyle = {},
        scale = 200,
        onClick = () => { },
        children
    } = props;
    const width = scale;
    const height = scale;
    const GOLD = Consts.goldenSection;
    const GOLD_T = Math.sqrt(1 - GOLD * GOLD)
    const HANDLE_LENGTH = (1 - GOLD) * GOLD_T;
    const key = Math.random();
    return (
        <div className={Style['container']} >
            <svg
                viewBox={`0 0 ${width} ${height}`}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <clipPath id={`${key}`}>
                        <path d={
                            ` M ${width * (1 - GOLD)},0`
                            + ` H ${width * GOLD}`
                            + ` C ${width * (GOLD + HANDLE_LENGTH)},0 ${width},${height * (1 - GOLD - HANDLE_LENGTH)} ${width},${height * (1 - GOLD)}`
                            + ` V ${height * GOLD}`
                            + ` C ${width},${height * (GOLD + HANDLE_LENGTH)} ${width * (GOLD + HANDLE_LENGTH)},${height} ${width * GOLD},${height}`
                            + ` H ${width * (1 - GOLD)}`
                            + ` C ${width * (1 - GOLD - HANDLE_LENGTH)},${height} 0,${height * (GOLD + HANDLE_LENGTH)} 0,${height * GOLD}`
                            + ` V ${height * (1 - GOLD)}`
                            + ` C 0,${height * (1 - GOLD - HANDLE_LENGTH)} ${width * (1 - GOLD - HANDLE_LENGTH)},0 ${width * (1 - GOLD)},0`
                            + 'Z'
                        }
                        />
                    </clipPath>
                </defs>
                <g style={{ clipPath: `url(#${key})` }}>
                    <rect fill={bgColor || `hsl(${Math.random() * 360},40%,70%)`}
                        height={height}
                        width={width}
                        x="0"
                        y="0"
                        className={Style['rect']}
                    />
                    <foreignObject
                        height={height}
                        width={width}
                        x="0"
                        y="0"
                    >
                        <body
                            onClick={(e) => {
                                onClick(e)
                            }}>
                            <div className={Style['forign-container']}>
                                {children}
                            </div>
                        </body>
                    </foreignObject>
                </g>
            </svg>
            <Box sx={{ color: 'text.secondary', display: label ? 'block' : 'none', ...labelStyle }}>
                <Tooltip title={detail || label} arrow>
                    <div className={`${labelClassName} ${Style['label']}`} onClick={(e) => { onClick(e) }}>
                        {label}
                    </div>
                </Tooltip>
            </Box>
        </div>
    )
}
export default Cell;