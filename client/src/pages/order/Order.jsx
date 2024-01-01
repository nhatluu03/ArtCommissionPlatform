import React, { useState } from "react";
import "./Order.scss";
function Order() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ["Standard Packaging"];

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <div className="order">
      <div className="container">
        <div className="left">
          <div className="deliveryInfo">
            <span className="header">Delivery Information</span>
            <form className="deliveryForm">
              <div className="deliveryFormLeft">
                <div className="deliveryFormGroup">
                  <span>Recipient's fullname</span>
                  <input placeholder="Enter your username" name="fullname" />
                </div>
                <div className="deliveryFormGroup">
                  <span>Country</span>
                  <input placeholder="Enter your country" name="country" />
                </div>
                <div className="deliveryFormGroup">
                  <span>City</span>
                  <input placeholder="Enter your city" name="city" />
                </div>
              </div>
              <div className="deliveryFormRight">
                <div className="deliveryFormGroup">
                  <span>Mobile Number</span>
                  <input placeholder="Enter your phone number" name="mobile" />
                </div>
                <div className="deliveryFormGroup">
                  <span>Province</span>
                  <input placeholder="Enter your province" name="province" />
                </div>
                <div className="deliveryFormGroup">
                  <span>Street No</span>
                  <input
                    placeholder="Enter your street number"
                    name="streetNo"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="packagingInfo">
            <span className="header">Packaging (for premium artist only)</span>
            <div className="packageContainer">
              <div className="packageMethods">
                <span>Packaging methods</span>
                <div className="packageHeader" onClick={handleToggleDropdown}>
                  {selectedOption || "--Choose packaging method--"}
                </div>

                {isOpen && (
                  <div className="packageOptions">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="option"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="packageNotes">
                <span> Additional notes </span>
                <input
                  placeholder="Notes for talent about packaging"
                  name="notes"
                />
              </div>
            </div>
          </div>
          <div className="paymentMethod">
            <span>Banking method</span>
            <div className="paymentOption">
              <input checked type="radio" />
              <span>Credit card</span>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="orderSummary">
            <span>Order Summary</span>
            <div className="container">
              <div className="artworks">
              </div>
              <div className="coupons">
                <div className="couponsLabel">
                  <span className="mainLabel">Coupons</span>
                  <span >--</span>
                </div>
                <div className="couponsRight"></div>
              </div>
              <div className="deliver">
                <div className="deliverTop">
                  <span>Deliver in 3 days</span>
                  <span className="deliverPrice">$20.0</span>
                </div>
                <div className="deliverDetail">
                  <span>VN-EXPRESS</span>
                  <span>Deliver to 406 Le Loi, TP Quang Ngai, Viet Nam</span>

                </div>
              </div>
              <div className="subtotal">
                <div className="subtotalInfo">
                  <span className="subtotalLabel">
                    Subtotal
                  </span>
                  <span className="subtotalPrice">
                    $118.50
                  </span>
                </div>
                <div className="packagingInfo">
                  <span className="packagingLabel">Packaging</span>
                  <span className="packagingMethod">--</span>
                </div>
              </div>
              <div className="confirm">
                <div className="total">
                  <span className="totalLabel">Total(USD)</span>
                  <span className="totalPrice">$138.50</span>
                </div>
                <button className="confirmButton">Confirm Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
