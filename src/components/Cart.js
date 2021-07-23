import React, { Component } from "react";
import formatCurrency from "./util";

export default class Cart extends Component {
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
												{formatCurrency(item.price)} X{" "}
												{item.count}{" "}
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
					</div>
					{cartItems.length !== 0 && (
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
								<button className="button primary">
									Proceed
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}
