
import React, { Component,Fragment } from "react";
import "./Checkout.css";
import {Redirect} from 'react-router-dom';
import { StepLabel,Stepper,Step,StepContent,AppBar, Tabs, Tab, Typography , GridList } from "@material-ui/core";
import { GridListTile } from "@material-ui/core";
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
                          </GridListTile>
                        ))
                      }
                    </GridList>
                  }
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
