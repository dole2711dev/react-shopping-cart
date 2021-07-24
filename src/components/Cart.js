import React, { Component } from "react";
import formatCurrency from "./util";
import Fade from "react-reveal/Fade";

export default class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			address: "",
			showCheckOut: false,
		};
	}
	HandlerInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	createOrder = (e) => {
		e.preventDefault();
		const infoOrder = {
			email: this.state.email,
			name: this.state.name,
			address: this.state.address,
			cartItems: this.state.cartItems,
		};

		console.log(infoOrder);
		this.props.createOrder(infoOrder);
	};

	render() {
		const { cartItems } = this.props;
		return (
			<div>
				<div className="cart cart-header">
					{cartItems.length === 0
						? `You cart no item`
						: `You cart have ${cartItems.length} items in cart`}
				</div>
				<div>
					<div className="cart">
						<Fade left cascade>
							<ul className="cart-items">
								{cartItems.map((item) => {
									return (
										<li key={item._id}>
											<div>
												<img
													src={item.image}
													alt={item.title}
												/>
											</div>
											<div>
												<div>{item.title}</div>
												<div className="right">
													{formatCurrency(item.price)}{" "}
													X {item.count}{" "}
													<button
														className="button"
														onClick={() =>
															this.props.removeFromCart(
																item._id
															)
														}>
														Remove
													</button>
												</div>
											</div>
										</li>
									);
								})}
							</ul>
						</Fade>
					</div>
					{cartItems.length !== 0 && (
						<div>
							<div className="cart">
								<div className="total">
									<div>
										Total{" "}
										{formatCurrency(
											cartItems.reduce(
												(a, b) => a + b.price * b.count,
												0
											)
										)}
									</div>
									<button
										className="button primary"
										onClick={() =>
											this.setState({
												showCheckOut: true,
											})
										}>
										Proceed
									</button>
								</div>
							</div>
							<Fade right cascade>
								{this.state.showCheckOut && (
									<div className="cart">
										<form onSubmit={this.createOrder}>
											<ul className="form-container">
												<li>
													<label htmlFor="email">
														Email
													</label>
													<input
														id="email"
														name="email"
														type="email"
														required
														onChange={
															this.HandlerInput
														}
													/>
												</li>
												<li>
													<label htmlFor="name">
														Name
													</label>
													<input
														id="name"
														name="name"
														type="text"
														required
														onChange={
															this.HandlerInput
														}
													/>
												</li>
												<li>
													<label htmlFor="address">
														Address
													</label>
													<input
														id="address"
														name="address"
														type="text"
														required
														onChange={
															this.HandlerInput
														}
													/>
												</li>
												<li>
													<button
														className="button primary"
														type="submit">
														Checkout
													</button>
												</li>
											</ul>
										</form>
									</div>
								)}
							</Fade>
						</div>
					)}
				</div>
			</div>
		);
	}
}
