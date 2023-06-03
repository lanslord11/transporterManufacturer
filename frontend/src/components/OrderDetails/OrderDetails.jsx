import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
// import { Card, CardContent, Typography } from '@material-ui/core';
import { Typography, Card, CardContent } from "@mui/material";
import "./OrderDetails.css";
import { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    margin: "20px",
    padding: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
});

const OrderDetails = (props) => {
  const { user } = props;
  const [price, setPrice] = useState("");
  const { id } = useParams();
  const [data, setData] = useState({
    to: "agra",
    from: "gwalior",
    quantity: 2,
    transporter: "6471b4ab3162aafd641f124b",
    manufacturer: "6471b2534edd43048e831bf5",
    itemsPrice: 23223,
    orderStatus: "Processing",
    _id: "647ad6c9e18c831b5c374b3f",
    createdAt: "2023-06-03T05:59:37.878Z",
  });

  //   const data = {
  //     to: "agra",
  //     from: "gwalior",
  //     quantity: 2,
  //     transporter: "6471b4ab3162aafd641f124b",
  //     manufacturer: "6471b2534edd43048e831bf5",
  //     itemsPrice: 23223,
  //     orderStatus: "Processing",
  //     _id: "647ad6c9e18c831b5c374b3f",
  //     createdAt: "2023-06-03T05:59:37.878Z",
  //   };
  const classes = useStyles();

  const retrievingData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      const data = await axios.get(
        `http://localhost:4000/api/order/${id}`,
        config
      );
      setData(data.data.order);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const updatePrice = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      const data = await axios.put(
        `http://localhost:4000/api/order/${id}`,
        {
          price: price,
        },
        config
      );
      setData(data.data.order);
      // console.log(data.data.user);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    retrievingData();
  }, [id]);

  return (
    <div className="">
      <div className="orderDetailsBox">
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Order Details
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {`From: ${data.from}`}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {`To: ${data.to}`}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {`Quantity: ${data.quantity}`}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {`Transporter: ${data.transporter}`}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {`Manufacturer: ${data.manufacturer}`}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {`Items Price:`}{" "}
              {data.itemsPrice == 0 ? (
                <span className="notConfirmedOrder">Order not confirmed</span>
              ) : (
                <span className="confirmedOrder">Order confirmed</span>
              )}
              {`{₹${data.itemsPrice}}`}
            </Typography>
            {/* <Typography color="textSecondary" gutterBottom>
            {`Order Status: ${data.orderStatus}`}
          </Typography> */}
            <Typography color="textSecondary" gutterBottom>
              {`Created At: ${new Date(data.createdAt).toLocaleString()}`}
            </Typography>
          </CardContent>
        </Card>
        {user.role == "transporter" ? (
          <div className="setPriceInput">
            <TextField
              label="Price"
              fullWidth
              // id="standard-basic"
              variant="outlined"
              sx={{ width: "100%" }}
              value={price}
              InputProps={{}}
              size="small"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
            <Button
              onClick={() => {
                if (data && data.itemsPrice == 0) updatePrice();
                else {
                  alert(
                    "can't set Price. Price already set | Order Details not Present"
                  );
                }
              }}
              variant="contained"
            >
              Set Price
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
