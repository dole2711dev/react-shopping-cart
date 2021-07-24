import React, { Component } from "react";
import formatCurrency from "./util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { thisExpression } from "@babel/types";

export default class Products extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product: null,
		};
	}

	OpenModal = (product) => {
		this.setState({
			product,
		});
	};

	CloseModal = () => {
		this.setState({
			product: null,
		});
	};

	render() {
		const { product } = this.state;

		return (
			<div>
				<Fade bottom cascade>
					<ul className="products">
						{this.props.products.map((product) => (
							<li key={product._id} data={product}>
								<div className="product">
									<a
										href={"#" + product._id}
										onClick={() => this.OpenModal(product)}>
										<img
											src={product.image}
											alt={product.title}></img>
										<p>{product.title}</p>
									</a>
									<div className="product-price">
										<div>
											{formatCurrency(product.price)}
										</div>
										<button
											className="button primary"
											onClick={() =>
												this.props.addToCart(product)
											}>
											Add To Cart
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				</Fade>
				{product && (
					<Modal isOpen={true} onRequestClose={this.CloseModal}>
						<Zoom>
							<button
								className="close-modal"
								onClick={() => this.CloseModal()}>
								X
							</button>
							<div className="product-details">
								<img
									src={product.image}
									alt={product.title}></img>
								<div className="product-details-description">
									<p>
										<strong>{product.title}</strong>
									</p>
									<p>{product.description}</p>
									<p>
										Available Sizes{" "}
										{product.availableSizes.map((size) => (
											<span>
												{" "}
												<button className="button">
													{size}
												</button>
											</span>
										))}
									</p>
									<div className="product-price">
										<div>
											{formatCurrency(product.price)}
										</div>
										<button
											className="button primary"
											onClick={() => {
												this.props.addToCart(product);
												this.CloseModal();
											}}>
											Add To Cart
										</button>
									</div>
								</div>
							</div>
						</Zoom>
					</Modal>
				)}
			</div>
		);
	}
}
