import React, {Fragment} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Stylesheet import
import './OrderItems.css'
//Material UI imports
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

export default function OrderItems(props) {
    let totalAmount = 0;
    props.orderitems.forEach(item => totalAmount += item.qty * item.price);
    return (
        <Fragment>
            {(props.orderitems || []).map((item, index) => (
                <Grid key={item.id} container>
                    <Grid item xs={1}>
                        
                        <FontAwesomeIcon icon={["far", "stop-circle"]} style={item.type === 'VEG'?{color:"green"} : {color: "red"}} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color='textSecondary' style={{textTransform: "capitalize"}}>
                            {item.item_name}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography color='textSecondary'>
                            {item.qty}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography color='textSecondary'>
                            <FontAwesomeIcon icon="rupee-sign" className="icon" size="xs" />
                            {parseFloat(item.price * item.qty).toFixed(2)}
                            

                        </Typography>
                    </Grid>
                </Grid>
            ))
            }
            {props.divider ? <Divider style={{marginTop: 15, marginBottom: 15}}/> : null}
            <Grid container>
                <Grid item xs={9}>
                    <Typography color='textPrimary'>
                        Net Amount
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <div className='payable-bill-amount'>
                        <Typography color='textSecondary'>
                            <FontAwesomeIcon icon="rupee-sign" className="icon" size="xs" />
                        </Typography>
                        <Typography style={{marginRight: 10}} color='textPrimary'>
                            {parseFloat(totalAmount).toFixed(2)}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <FormControl className='place-order-button'>
                        <Button variant="contained" color="primary" onClick={props.placeOrder}>PLACE ORDER</Button>
                    </FormControl>
                </Grid>
            </Grid>
        </Fragment>
    )
}
