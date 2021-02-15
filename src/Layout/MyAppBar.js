import * as React from 'react';
import axios from 'axios';
import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    bgImage: {
        // backgroundImage: 'url(https://static.wixstatic.com/media/daa771_7af8fed8fcb44bbaa0fc7b2c60bba024~mv2_d_6011_3439_s_4_2.png/v1/fill/w_200,h_115,al_c,q_85,usm_0.66_1.00_0.01/Charity_Guard%20LOGO%202018.webp)',
        width: '100%',
        margin: '0 auto',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPositionX: 'left',
    },
    spacer: {
        flex: 1,
    },
    topBar: {
        backgroundColor: '#1e1e1e',
        boxShadow: 'none',
        borderBottom: '1px solid #e1e1e1',
        position: 'relative',
        height: '45px',
    }
});
class SelectBar extends React.Component {
    constructor() {
        super();
        this.getMerchants = this.getMerchants.bind(this);
        this.state = {
            merchants: []
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        const select = document.getElementById('merchants')
        if (select[select.selectedIndex]) {
            const selectedValue = select[select.selectedIndex].value
            global.select = selectedValue;
        }
        this.getMerchants();
    }
    async getMerchants() {
        let merchantsData = await axios.get('/api/merchants')
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
            })
        this.setState({
            merchants: merchantsData
        }, () => { })
    }
    handleChange(event) {
        // this.getMerchants();
        if (location.toString().split('/').length >= 6) {
            const currLocation = location.toString().split('/');
            const select = document.getElementById('merchants')
            const selectedValue = select[select.selectedIndex].value
            const newLocation = currLocation[0] + '//' + currLocation[2] + '/' + currLocation[3] + '/' + currLocation[4] + '/' + selectedValue
            console.log(newLocation);
            location.replace(newLocation);
            location.reload();
        }
        const select = document.getElementById('merchants')
        const selectedValue = select[select.selectedIndex].value
        global.select = selectedValue;
        console.log(global.select)
    }
    render() {
        const { merchants } = this.state;
        return (
            <select id="merchants" defaultValue={global.select} onChange={this.handleChange}>
                <option value="">Vælg merchant</option>
                {
                    merchants && merchants.map((merchant, index) => {
                        if (location.toString().split('/')[5] === merchant.content.id) {
                            return (<option className="merchantsclass" key={index + 1} value={merchant.content.id}>{merchant.content.name}</option>)
                        }
                        else if (index === 0) {
                            return (<option className="merchantsclass" key={index + 1} value={merchant.content.id}>{merchant.content.name}</option>)
                        }
                        else {
                            return (<option className="merchantsclass" key={index + 1} value={merchant.content.id}>{merchant.content.name}</option>)
                        }
                    })
                }
            </select>
        )
    }
}
const MyAppBar = props => {
    const classes = useStyles();
    return (
        <AppBar {...props} className={classes.topBar}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <SelectBar />
            <div className={classes.bgImage} />
            <span className={classes.spacer} />
        </AppBar>
    );
}
export default MyAppBar;