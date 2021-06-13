
import React, { Component,Fragment } from "react";
import "./Checkout.css";
import {Redirect} from 'react-router-dom';
import { StepLabel,Stepper,Step,StepContent,AppBar, Tabs, Tab } from "@material-ui/core";
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
                    </Tabs>
                  </AppBar>
                </div>
              </StepContent>
            </Step>
          </Stepper>
        </div>
      </div>
    </Fragment>
  }
}



export default Checkout;
