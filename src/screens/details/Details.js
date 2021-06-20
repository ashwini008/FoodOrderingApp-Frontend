
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Card, Divider, Grid, IconButton, Snackbar, Typography } from "@material-ui/core";
import { Add, Close, Remove, ShoppingCart } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import './Details.css';
import * as Constants from "../../common/Constants";
import Header from "../../common/header/Header";
const Details = props => {

  const [restaurantDetails, setDetails] = useState({});
  const [cartData, setCart] = useState([]);
  const [isNotification, toggleNotification] = useState(false);
  const [notiMsg, setNotiMsg] = useState('');

  useEffect(() => {
    // fetch restaurant details
    fetch(`http://localhost:8080/api/restaurant/${props.match.params.id}`)
      .then(rsp => {
        if (rsp.status === 200) {
          rsp.json().then(res => {
            setDetails(res);
          })
        }
      }, err => console.error(err))
      .catch(err => console.error(err));
  }, [props.match.params.id]);
  
  const addToCart = (data) => {
    const cartDataIndex = cartData.findIndex((item) => item.id === data.id);
    setCart(state => {
      if (cartDataIndex > -1) {
        state[cartDataIndex].qty++;
      } else {
        state.push({...data, qty: 1})
      }
      return [...state];
    });
    setNotiMsg("Item added to cart!");
    toggleNotification(true);
  }

  const updateCart = (index, isInc) => () => {
    let isRemoved = false;
    setCart(state => {
      if (isInc) {
        state[index].qty++;
      } else {
        state[index].qty--;
      }

      if (state[index].qty === 0) {
        state.splice(index, 1);
        isRemoved = true;
      }

      return [...state];
    });
    setNotiMsg(isInc ? 'Item quantity increased by 1!' : isRemoved ? 'Item removed from cart!' : 'Item quantity decreased by 1!');
    toggleNotification(true);
  }

  const checkout = () => {
    // check if cart is empty
    if (!cartData.length) {
      setNotiMsg("Please add an item to your cart!");
      toggleNotification(true);
    } else if (!true) { // check if user is logged in
      setNotiMsg("Please login first!");
      toggleNotification(true);
    } else {
      localStorage.cartData = JSON.stringify(cartData);
      localStorage.restaurantDetails = JSON.stringify(restaurantDetails);
      
      props.history.push('/checkout');
    }
  }
    
  // Logout action from drop down menu on profile icon
  const loginredirect = () => {
      sessionStorage.clear();
      props.history.push({
        pathname: "/"
      });
  }

  let totalAmount = 0;
  cartData.forEach(item => totalAmount += item.qty * item.price);
  
  return (
    <>
      <Header logoutHandler={loginredirect} baseUrl= {Constants.API_BASE_URL}/>
      <Grid container className="restaurant-info">
        <Grid item md={3} sm={12} xs={12}>
          <img src={restaurantDetails.photo_URL} alt="restaurant-img" />
        </Grid>
        <Grid item md={9} sm={12} xs={12}>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h4" gutterBottom>{restaurantDetails.restaurant_name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom>{restaurantDetails.address?.locality}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" gutterBottom>{restaurantDetails.categories?.map(item => item.category_name).join(', ')}</Typography>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="body1"><FontAwesomeIcon icon="star" className="icon" />{restaurantDetails.customer_rating}</Typography>
                <Typography variant="overline" color="textSecondary">AVERAGE RATING BY</Typography>
                <Typography variant="overline" color="textSecondary" className="rest-sub-info"><b>{restaurantDetails.number_customers_rated}</b> CUSTOMERS</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><FontAwesomeIcon icon="rupee-sign" className="icon" />{restaurantDetails.average_price}</Typography>
                <Typography variant="overline" color="textSecondary">AVERAGE COST FOR</Typography>
                <Typography variant="overline" color="textSecondary" className="rest-sub-info">TWO PEOPLE</Typography>
              </Grid>
            </Grid>
        </Grid>
        </Grid>
      </Grid>
    
      <Grid container className="restaurant-details">
        <Grid item md={6} sm={12} xs={12}>
          {
            restaurantDetails?.categories?.map(item => (
              <div className="item-group" key={item.id}>
                <Typography variant="body1" gutterBottom className="category-name">{item.category_name}</Typography>
                <Divider />
                {
                  item.item_list.map(data => (
                    <Grid container key={data.id} className="item-row" alignItems="center">
                      <Grid item xs={7}>
                        <Typography className="item-name"><FontAwesomeIcon icon={"circle"} className={`item-type ${data.item_type === "VEG" ? 'item-veg' : 'item-non-veg'}`} />{data.item_name}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography><FontAwesomeIcon icon="rupee-sign" className="icon" size="xs" />{parseFloat(data.price).toFixed(2)}</Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton onClick={() => addToCart(data)} >
                          <Add />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))
                }
                
              </div>
            ))
          }
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Card variant={"outlined"} raised className="paper-root">
            <Typography variant="h5" className="cart-header">
              <Badge className="item-type" showZero badgeContent={cartData.length} color="primary">
                <ShoppingCart />
              </Badge>
              My Cart
            </Typography>

            
            {
              cartData.map((data, index) => (
                <Grid container key={data.id} className="item-row" alignItems="center">
                  <Grid item xs={7}>
                    <Typography className="item-name"><FontAwesomeIcon icon={["far", "stop-circle"]} className={`item-type ${data.item_type === "VEG" ? 'item-veg' : 'item-non-veg'}`} />{data.item_name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <IconButton size="small" onClick={updateCart(index, false)} >
                      <Remove />
                    </IconButton>
                    {data.qty}
                    <IconButton size="small" onClick={updateCart(index, true)} >
                      <Add />
                    </IconButton>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography style={{ textAlign: 'right' }}><FontAwesomeIcon icon="rupee-sign" className="icon" size="xs" />{parseFloat(data.price * data.qty).toFixed(2)}</Typography>
                  </Grid>
                </Grid>
              ))
            }
            <div className="amount">
              <Typography>total amount</Typography>
              <Typography><FontAwesomeIcon size="xs" className="icon" icon="rupee-sign" />{parseFloat(totalAmount).toFixed(2)}</Typography>
            </div>
            <Button color="primary" variant="contained" fullWidth onClick={checkout}>checkout</Button>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isNotification}
        autoHideDuration={6000}
        onClick={() => toggleNotification(false)}
        message={notiMsg}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => toggleNotification(false)}>
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default Details;
