import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@material-ui/core";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static defaultProps = {
    }

    render () {
        const { children, theme } = this.props;
        return (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </StyledEngineProvider>
        );
    }
}

export default App;
