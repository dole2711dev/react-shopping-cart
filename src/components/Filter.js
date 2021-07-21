import React, { Component } from "react";

export default class Filter extends Component {
	render() {
		return (
			<div className="filter">
				<div className="filter-result">{this.props.count} Product</div>
				<div className="filter-sort">
					Order{" "}
					<select
						value={this.props.sort}
						onChange={this.props.sortProduct}>
						<option>Latest</option>
						<option value="lowest">Lowest</option>
						<option value="highest">Highest</option>
					</select>
				</div>
				<div className="filter-size">
					Filter{" "}
					<select
						value={this.props.size}
						onChange={this.props.filterProduct}>
						<option value="ALL">ALL</option>
						<option value="XS">XS</option>
						<option value="S">S</option>
						<option value="L">L</option>
						<option value="XL">XL</option>
						<option value="XXL">XXL</option>
						<option value="XXXL">XXXL</option>
					</select>
				</div>
			</div>
		);
	}
}