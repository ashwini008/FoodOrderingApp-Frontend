
import React, { Component,Fragment } from "react";
import "./Checkout.css";
import {Redirect} from 'react-router-dom';
import { StepLabel,Stepper,Step,StepContent,AppBar, Tabs, Tab, Typography , GridList, Grid, IconButton, GridListTile, FormControl, InputLabel, Input, Select, MenuItem, Button, FormLabel, RadioGroup ,FormControlLabel, Radio  } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { FormHelperText } from "@material-ui/core";
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

// componentDidMount() {
//   if(this.props.location.state !== undefined && sessionStorage.getItem('access-token')!== null) {
//     this.fetchAddress();
//   }
// }

changeActiveTab = (value) => {
  this.setState({activeTabValue: value})
  // if (value === 'existing_address') {
  //     this.fetchAddress();
  // }
}

/**
     * This function is used when a user clicks on one address tile to select the address.
     */
 selectAddress = (e) => {
  let elementId = e.target.id;
  if (elementId.startsWith('select-address-icon-')) {
      this.setState({selectedAddressId: elementId.split('select-address-icon-')[1]});
  }
  if (elementId.startsWith('select-address-button-')) {
      this.setState({selectedAddressId: elementId.split('select-address-button-')[1]})
  }
}

/**
     * This function is common for all the input changes of the new address form.
     */
 onInputFieldChangeHandler = (e) => {
  let stateKey = e.target.id;
  let stateValue = e.target.value;
  //Material UI Select doesn't return key
  if (stateKey === undefined) {
      stateKey = 'stateUUID';
  }
  //Form validation.
  let stateValueRequiredKey = stateKey + 'Required';
  let stateKeyRequiredValue = false;
  if (stateValue === '') {
      stateKeyRequiredValue = true;
  }
  let validPincode = this.state.pincodeValid;
  if (stateKey === 'pincode') {
      validPincode = this.validatePincode(stateValue);
  }
  this.setState({
      [stateKey]: stateValue,
      [stateValueRequiredKey]: stateKeyRequiredValue,
      'pincodeValid': validPincode
  });
}

/**
     * This function is used for stepper to move ahead based on user actions.
     */
 incrementActiveStep = () => {
  if (this.state.activeStep === 0 && this.state.selectedAddressId === undefined) {
      //Do nothing as it is mandatory to select an address
  } else if (this.state.activeStep === 1 && this.state.paymentId === '') {
      //Do nothing, Because user has to select payment to proceed further.
  } else {

      let activeState = this.state.activeStep + 1;
      let changeAddressPayment = 'display-none';
      if (activeState === 2) {
          changeAddressPayment = 'display-block';
      }
      this.setState({activeStep: activeState, displayChange: changeAddressPayment})
  }
}

/**
     * This function is used in step 2 of the stepper when a user selects the payment mode.
     */
 onPaymentSelection = (e) => {
  this.setState({'paymentId': e.target.value});
}

  render() {

    

    return <Fragment>
      <div className = "main-container">
        <div className="delivery-payment-section">
          <Stepper activeStep = {this.state.activeStep} orientation='vertical'>
            <Step key='Delivery'>
              <StepLabel>Delivery</StepLabel>
              <StepContent>
                <div>
                  <AppBar position={"relative"}>
                    <Tabs value={this.state.activeTabValue} variant='standard'>
                      <Tab value='existing_address' label='EXISTING ADDRESS'
                      onClick={() => this.changeActiveTab('existing_address')}/>
                      <Tab value='new_address' label='NEW ADDRESS'
                      onClick={() => this.changeActiveTab('new_address')}/>
                    </Tabs>
                  </AppBar>
                </div>
                <div id="existing-address-display" className={this.state.activeTabValue === 'existing_address' ? 'display-block' : 'display-none'}>
                  {this.state.addresses === undefined || this.state.addresses.length === 0 ? 
                    <Typography style={{margin:10, marginBottom: 200}} color='textSecondary' component='p'>
                      There are no saved addresses! You can save an address using the 'New Address' tab or using your ‘Profile’ menu option.
                    </Typography> :
                    <GridList style={{flexWrap: 'nowrap'}} cols={3} cellHeight='auto'>
                      {
                        (this.state.addresses || []).map((address,index) => (
                          <GridListTile key={address.id} className={this.state.selectedAddressId === address.id ? 'grid-list-tile-selected-addre':null}>
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
                                <IconButton id={'select-address-button-'+address.id}
                                className='select-address-icon' onClick={this.selectAddress}>
                                  <CheckCircleIcon id={'select-address-icon-'+address.id}
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

                  <div id='new-address-display' className={this.state.activeTabValue === 'new_address' ? 'display-block' : 'display-none' }>
                    <FormControl style={{minWidth : 300}}>
                      <InputLabel htmlFor='flat'>Flat/Building No</InputLabel>
                      <Input id='flat' name='flat' type='text' value={this.state.flat}
                      flat={this.state.flat} onChange={this.onInputFieldChangeHandler} />
                      {this.state.flatRequired ? 
                      <FormHelperText>
                        <span style={{color: "red"}}>required</span>
                      </FormHelperText> : null}
                    </FormControl>
                    <br/>
                    
                    <FormControl style={{minWidth: 300}}>
                      <InputLabel htmlFor='locality'>Locality</InputLabel>
                      <Input id='locality' name='locality' type='text' value={this.state.locality}
                      locality={this.state.locality} onChange={this.onInputFieldChangeHandler}/>
                      {this.state.localityRequired ? 
                      <FormHelperText>
                        <span style={{color: 'red'}}>required</span>
                      </FormHelperText> : null}
                    </FormControl>
                    <br/>

                    <FormControl style={{minWidth: 300}}>
                      <InputLabel htmlFor='city'>City</InputLabel>
                      <Input id='city' name='city' type='text' value={this.state.city}
                      city={this.state.city} onChange={this.onInputFieldChangeHandler}/>
                      {this.state.cityRequired ? 
                      <FormHelperText>
                        <span style={{color: 'red'}}>required</span>
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
                      <InputLabel htmlFor='pincode'>PinCode</InputLabel>
                      <Input id='pincode' name='pincode' type='text' value={this.state.pincode}
                      pincode={this.state.pincode} onChange={this.onInputFieldChangeHandler}/>
                      {this.state.cityRequired ? 
                      <FormHelperText>
                        <span style={{color: 'red'}}>required</span>
                      </FormHelperText> : null}
                      {!this.state.pincodeRequired && !this.state.pincodeValid ? 
                      <FormHelperText>
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
        </div>
      </div>
    </Fragment>
  }
}



export default Checkout;
