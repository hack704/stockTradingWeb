import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  // ✅ useContext to access closeBuyWindow properly
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = async () => {
    try {
      await axios.post("https://stocktradingweb.onrender.com/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: parseFloat(stockPrice),
        mode: "BUY",
      });
      generalContext.closeBuyWindow(); // ✅ correct
    } catch (err) {
      console.error("Order failed:", err);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow(); // ✅ correct
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          {/* ✅ button instead of Link */}
          <button className="btn btn-blue" onClick={handleBuyClick}>Buy</button>
          <button className="btn btn-grey" onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;