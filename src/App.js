import React from "react";
import "./App.css";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import Fade from "react-reveal/Fade";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			products: data.products,
			cartItems: JSON.parse(localStorage.getItem("CartItems"))
				? JSON.parse(localStorage.getItem("CartItems"))
				: [],
			size: "",
			sort: "",
		};
	}

	AddToCart = (product) => {
		const cartItems = this.state.cartItems.slice();
		let alreadyInCart = false;
		cartItems.forEach((items) => {
			if (items._id === product._id) {
				items.count++;
				alreadyInCart = true;
			}
		});

		if (!alreadyInCart) {
			cartItems.push({ ...product, count: 1 });
		}
		this.setState({ cartItems });
		this.SetDataToCache(cartItems);
	};

	SortProduct = (event) => {
		// Implement
		var sortValue = event.target.value;
		this.setState((state) => ({
			sort: sortValue,
			products: this.state.products
				.slice()
				.sort((firstProduct, secondProduct) => {
					switch (sortValue) {
						case "lowest":
							return firstProduct.price < secondProduct.price
								? 1
								: -1;

						case "highest":
							return firstProduct.price > secondProduct.price
								? 1
								: -1;

						default:
							return firstProduct._id > secondProduct._id
								? 1
								: -1;
					}
				}),
		}));
	};

	FilterProduct = (event) => {
		// Implement
		if (event.target.value === "ALL") {
			this.setState({
				size: event.target.value,
				products: data.products,
			});
		} else {
			this.setState({
				size: event.target.value,
				products: data.products.filter((product) =>
					product.availableSizes.includes(event.target.value)
				),
			});
		}
	};

	RemoveFromCart = (productId) => {
		this.setState({
			cartItems: this.state.cartItems.filter(
				(item) => item._id !== productId
			),
		});
		this.SetDataToCache(
			this.state.cartItems.filter((item) => item._id !== productId)
		);
	};

	SetDataToCache = (cartItems) => {
		localStorage.setItem("CartItems", JSON.stringify(cartItems));
	};

	CreateOrder = (order) => {
		alert("Need to save " + order.name);
	};

	render() {
		return (
			<div className="grid-container">
				<header>
					<a href="/">React Shopping App</a>
				</header>
				<main>
					<div className="content">
						<div className="main">
							<Filter
								count={this.state.products.length}
								size={this.state.size}
								sort={this.state.sort}
								sortProduct={this.SortProduct}
								filterProduct={this.FilterProduct}
							/>
							<Products
								products={this.state.products}
								addToCart={this.AddToCart}
							/>
						</div>
						<div className="sidebar">
							<Cart
								cartItems={this.state.cartItems}
								removeFromCart={this.RemoveFromCart}
								createOrder={this.CreateOrder}
							/>
						</div>
					</div>
				</main>
				<footer>All right is reserver.</footer>
			</div>
		);
	}
}

export default App;
