
import { Card, CardContent } from "@material-ui/core";
import { AppBar, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, GridList, GridListTile, IconButton, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, Step, StepContent, StepLabel, Tabs, Typography } from "@material-ui/core";
import { Stepper } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import React, {Component, Fragment} from "react";
import './Checkout.css';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
            activeTabValue: 'existing_address',
            addresses: [],
            states: [],
            payments: [],
            flat: '',
            locality: '',
            city: '',
            stateUUID: '',
            pincode: '',
            paymentId: '',
            flatRequired: false,
            localityRequired: false,
            cityRequired: false,
            stateUUIDRequired: false,
            pincodeRequired: false,
            pincodeValid: true,
            selectedAddressId: undefined,
            displayChange: 'display-none',
            placeOrderMessage: undefined,
            placeOrderMessageOpen: false,
            couponId: undefined,
    }
  }

  componentDidMount() {
    // if(this.props.location.state !== undefined && sessionStorage.getItem('access-token') !== null) {
    //   this.fetchAddress();
    // }
    
  }
  
  changeActiveTab = (value) => {
    this.setState({activeTabValue: value})
    if (value === 'existing_address') {
        this.fetchAddress();
    }
  }

  /**
     * This function connects to the API server to fetch the addresses.
     */
   fetchAddress = () => {
    let token = sessionStorage.getItem('access-token');

    let xhr = new XMLHttpRequest();

    let that = this;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            that.setState({addresses: JSON.parse(this.responseText).addresses});
        }
    });

    let url = this.props.baseUrl + 'address/customer';

    xhr.open('GET', url);

    xhr.setRequestHeader('authorization', 'Bearer ' + token);
    xhr.setRequestHeader("Cache-Control", "no-cache");

    xhr.send();
  }

  render() {
    return <Fragment>
      <div className='main-container'>
        <div className='delivery-payment-section'>
          <Stepper activeStep={this.state.activeStep} orientation='vertical'>
            <Step key='Delivery' >
              <StepLabel>Delivery</StepLabel>
              <StepContent>
                <div>
                  <AppBar position={"relative"} >
                    <Tabs value={this.state.activeTabValue} variant='standard'>
                      <Tab value='existing_address' label='EXISTING ADDRESS' 
                      onClick={() => this.changeActiveTab('existing_address')}/>

                      <Tab value='new_address' label='NEW ADDRESS' 
                      onClick={() => this.changeActiveTab('new_address')}/>
                    </Tabs>
                  </AppBar>
                </div>
                <div id='existing-address-display' className={this.state.activeTabValue === 'existing_address' ? 'display-block' : 'display-none'}>
                {this.state.addresses === undefined || this.state.addresses.length === 0 ?
                  <Typography style={{margin: 10, marginBottom: 200}} color='textSecondary' component='p'>
                    There are no saved addresses! You can save an address using the 'New 
                    Address' tab or using your ‘Profile’ menu option.
                  </Typography> : 
                  <GridList style={{flexWrap: 'nowrap'}} cols={3} cellHeight='auto'>
                    {
                      (this.state.addresses || []).map((address, index) => (
                        <GridListTile key={address.id} className={this.state.selectedAddressId === address.id ? 'grid-list-tile-selected-address' : null}>
                          <div className='address-box'>
                            <p>{address.flat_building_name}</p>
                            <p>{address.locality}</p>
                            <p>{address.city}</p>
                            <p>{address.state.state_name}</p>
                            <p>{address.pincode}</p>
                          </div>
                          <Grid container>
                            <Grid item xs={6} lg={10}></Grid>
                            <Grid item xs={2}>
                              <IconButton id={'select-address-button-'+ address.id} className='select-adress-icon'
                              onClick={this.selectAdress}>
                                <CheckCircleIcon id={'select-address-icon-' + address.id}
                                className={this.state.selectedAddressId === address.id ? 'display-green-icon' : 'display-grey-icon'}/>
                              </IconButton>
                            </Grid>
                          </Grid>
                        </GridListTile>
                      ))
                    }
                  </GridList>
                }
                </div>
                <div id='new-address-display'
                className={this.state.activeTabValue === 'new_address' ? 'display-block' : 'display-none'}>
                  <FormControl style={{minWidth: 300}}>
                      <InputLabel htmlFor='flat'>Flat/Building No</InputLabel>
                      <Input id='flat' name='flat' type='text' value={this.state.flat}
                              flat={this.state.flat}
                              onChange={this.onInputFieldChangeHandler}/>
                      {this.state.flatRequired ? <FormHelperText>
                          <span style={{color: "red"}}>required</span>
                      </FormHelperText> : null}
                  </FormControl>
                  <br/>
                  <FormControl style={{minWidth: 300}}>
                      <InputLabel htmlFor='locality'>Locality</InputLabel>
                      <Input id='locality' name='locality' type='text' value={this.state.locality}
                              locality={this.state.locality}
                              onChange={this.onInputFieldChangeHandler}/>
                      {this.state.localityRequired ? <FormHelperText>
                          <span style={{color: "red"}}>required</span>
                      </FormHelperText> : null}
                  </FormControl>
                  <br/>
                  <FormControl style={{minWidth: 300}}>
                      <InputLabel htmlFor='city'>City</InputLabel>
                      <Input id='city' name='city' type='text' value={this.state.city}
                              city={this.state.city}
                              onChange={this.onInputFieldChangeHandler}/>
                      {this.state.cityRequired ? <FormHelperText>
                          <span style={{color: "red"}}>required</span>
                      </FormHelperText> : null}
                  </FormControl>
                  <br/>
                  <FormControl style={{minWidth: 300}}>
                      <InputLabel htmlFor='stateUUID'>State</InputLabel>
                      <Select id='stateUUID' name='stateUUID' value={this.state.stateUUID}
                              onChange={this.onInputFieldChangeHandler}>
                          {this.state.states.map((state, index) => (
                              <MenuItem key={state.id} value={state.id}>{state.state_name}</MenuItem>
                          ))}
                      </Select>
                      {this.state.stateUUIDRequired ? <FormHelperText>
                          <span style={{color: "red"}}>required</span>
                      </FormHelperText> : null}
                  </FormControl>
                  <br/>
                  <FormControl style={{minWidth: 300}}>
                      <InputLabel htmlFor='pincode'>Pincode</InputLabel>
                      <Input id='pincode' name='pincode' type='text' value={this.state.pincode}
                              pincode={this.state.pincode}
                              onChange={this.onInputFieldChangeHandler}/>
                      {this.state.pincodeRequired ? <FormHelperText>
                          <span style={{color: "red"}}>required</span>
                      </FormHelperText> : null}
                      {!this.state.pincodeRequired && !this.state.pincodeValid ? <FormHelperText>
                          <span style={{color: "red"}}>Pincode must contain only numbers and must be 6 digits long</span>
                      </FormHelperText> : null}
                  </FormControl>
                  <br/>
                  <br/>
                  <FormControl style={{minWidth: 150}}>
                      <Button variant='contained' color='secondary' onClick={this.saveAddress}>SAVE
                          ADDRESS</Button>
                  </FormControl>
                </div>
                <div>
                  <Button style={{margin: 5}} disabled={this.state.activeStep === 0}>Back</Button>
                  <Button style={{margin: 5}} className='button' variant="contained" color="primary"
                          onClick={this.incrementActiveStep}>Next</Button>
                </div>
              </StepContent>
            </Step>
            <Step key='Payment'>
              <StepLabel>Payment</StepLabel>
              <StepContent>
                  <div id='payment-modes'>
                      <FormControl>
                          <FormLabel>Select Mode of Payment</FormLabel>
                          <RadioGroup onChange={this.onPaymentSelection} value={this.state.paymentId}>
                              {(this.state.payments || []).map((payment, index) => (
                                  <FormControlLabel key={payment.id} value={payment.id} control={<Radio/>}
                                  label={payment.payment_name}/>
                              ))}
                          </RadioGroup>
                      </FormControl>
                  </div>
                  <Button style={{margin: 5}} onClick={this.decrementActiveStep}>Back</Button>
                  <Button style={{margin: 5}} variant="contained" color="primary"
                          onClick={this.incrementActiveStep}>Finish</Button>
              </StepContent>
            </Step>
          </Stepper>
          <div className={this.state.displayChange}>
            <Typography style={{marginLeft: 40}} variant='h5'>
                View the summary and place your order now!
            </Typography>
            <Button style={{marginLeft: 40, marginTop: 20}} onClick={this.resetActiveStep}>CHANGE</Button>
          </div>
        </div>
        <div className='summary-section'>
          <Card variant='elevation' className='summary-card'>
              <CardContent>
                  <Typography variant="h5" component="h2">
                      Summary
                  </Typography>
                  <br/>
                  <Typography variant='h6' component='h3' color='textSecondary'
                  style={{textTransform: "capitalize", marginBottom: 15}}>
                    {/* {this.props.location.state.restaurantName} */}
                  </Typography>
              </CardContent>
          </Card>
      </div>
      </div>
    </Fragment>
  }
}

export default Checkout;
