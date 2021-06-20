import React, { Component } from "react";
import "../home/Home.css";
import PropTypes from "prop-types";
import Header from "../../common/header/Header";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Constants from "../../common/Constants";
const styles = {
  card: {
    maxWidth: 285,
    marginBottom: '24px'
  },
  media: {
    height: 140
  }
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [{}]
    };
  }

  componentDidMount() {
    this.findAllRestaurant();
  }

  searchChangeHandler = e => {
    let restaurantName = e.target.value;
    this.searchRestaurantByName(restaurantName);
  };

  /**
   * Find Restaurant By Name
   */
  searchRestaurantByName(restaurantName) {
    if (restaurantName === "") {
      this.findAllRestaurant();
      return;
    }

    let resourcePath = "restaurant/name/" + restaurantName;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4 && !!this.responseText && JSON.parse(this.responseText).restaurants !== null) {
        that.setState({
          restaurants: JSON.parse(this.responseText).restaurants
        });
      } else {
        console.log("No Restaurant");
        that.setState({ errorResponse: this.responseText, restaurants: [] });
        console.log(this.responseText);
      }
    });

    xhr.open("GET", Constants.API_BASE_URL + resourcePath);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send();
  }

  findAllRestaurant() {
    let resourcePath = "/restaurant";
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        that.setState({
          restaurants: JSON.parse(this.responseText).restaurants
        });
      } else {
        that.setState({ errorResponse: this.responseText });
      }
    });

    xhr.open("GET", 'http://localhost:8080/api' + resourcePath);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send();
  }

  cardClickHandler = restaurantID => {
    this.props.history.push({
      pathname: "/restaurant/" + restaurantID
    });
  };
  //Logout action from drop down menu on profile icon
  loginredirect = () => {
    sessionStorage.clear();
    this.props.history.push({
      pathname: "/"
    });
    window.location.reload();
  }
  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div>
          {
            <Header logoutHandler={this.loginredirect} baseUrl={Constants.API_BASE_URL}
              searchRestaurantByName={this.searchRestaurantByName.bind(this)} showSearch={true} history={this.props.history} />
          }
        </div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={16}
          className="grid-container home-grid"
        >
          {this.state.restaurants.map(restaurant => (
            <Grid item lg={3} sm={6} key={"filtered" + restaurant.id}>
              <Card
                className={classes.card}
                onClick={() => this.cardClickHandler(restaurant.id)}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={restaurant.restaurant_name}
                    className={classes.media}
                    image={restaurant.photo_URL}
                    title={restaurant.restaurant_name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {restaurant.restaurant_name}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography component="p">
                      {restaurant.categories}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className="action-container">
                  <div className="customer-rating">
                    <FontAwesomeIcon icon="star" size="xs" />
                    {/* <i className="fa fa-star" aria-hidden="true" /> */}
                    <span>
                      {" "}
                      {restaurant.customer_rating} (
                      {restaurant.number_customers_rated})
                    </span>
                  </div>
                  <div className="customer-price">
                    <FontAwesomeIcon icon="rupee-sign" size="xs" />
                    {/* <i className="fas fa-rupee-sign"> */}
                    <span> {restaurant.average_price} for two</span>{" "}
                    {/* </i> */}
                  </div>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);