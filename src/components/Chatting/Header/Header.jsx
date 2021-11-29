import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

import svgBack from "./svg_back.svg";
import svgMenu from "./svg_menu.svg";
import svgClose from "./svg_close.svg";

const BtnBack = (props) => {
	const [isHover, setHover] = useState(false);
	const history = useHistory();
	const style = useSpring({
		position: 'absolute', top: '17px', left: '10px',
		width: '50px', height: '50px', borderRadius: '25px',
		background: `rgba(0,0,0,${ isHover ? 0.05 : 0 })`,
		config: { duration: 100 }
	});
	const styleImg = {
		position: 'absolute', top: 'calc(50% - 15px)', left: 'calc(50% - 15px)',
		width: '30px', height: '30px'
	};

	return (
		<animated.div style={ style } className="BTNC" onClick={ () => history.goBack() }
		onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
			<img src={ svgBack } alt="back" style={ styleImg }/>
		</animated.div>
	)
}

const BtnMenu = (props) => {
	const [isHover, setHover] = useState(false);
	const style = useSpring({
		position: 'absolute', top: '17px', right: '10px',
		width: '50px', height: '50px', borderRadius: '25px',
		background: `rgba(0,0,0,${ isHover ? 0.05 : 0 })`,
		config: { duration: 100 }
	});
	const styleImg = {
		position: 'absolute', top: 'calc(50% - 15px)', left: 'calc(50% - 15px)',
		width: '30px', height: '30px'
	};

	return (
		<animated.div style={ style } className="BTNC" onClick={ props.onClick }
		onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
			<img src={ props.token ? svgClose : svgMenu } alt="menu" style={ styleImg }/>
		</animated.div>
	)
}
BtnMenu.propTypes = {
	onClick: PropTypes.func,
	token: PropTypes.bool
}

const Header = (props) => {
	const [isOpen, setOpen] = useState(false);
	const style = {
		position: 'fixed', top: '0px', left: '0px',
		width: '100%', height: '80px',
		background: 'white',
		boxShadow: '0px 0px 12px rgba(0,0,0,0.1)'
	}
	const styleLine = {
		width: '100%', height: '5px',
		background: 'rgb(102,61,113)'
	}
	const styleBgd = useSpring({
		position: 'fixed', top: '0px', left: '0px',
		width: '100%', height: '100%',
		background: `rgba(0,0,0,${ isOpen ? 0.6 : 0 })`
	});
	const styleTitle = {
		position: 'absolute', top: '17px', left: '70px', right: '70px',
		fontSize: '21px', fontWeight: 500,
		color: 'rgb(102,61,113)'
	}

	return (
		<>
			<animated.div style={ styleBgd } onClick={ () => setOpen(false) }/>
			<div style={ style }>
				<div style={ styleLine }/>
				<div style={ styleTitle }>{ props.title }</div>
				<BtnBack/>
				<BtnMenu token={ isOpen } onClick={ () => setOpen(!isOpen) }/>
			</div>
		</>
	)
}
Header.propTypes = {
	title: PropTypes.string
}

export default Header;
