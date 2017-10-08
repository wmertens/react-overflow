import React, {Component, PropTypes} from 'react'
import ResizeDetector from './ResizeDetector'

export default class OverflowDetector extends Component {
	static propTypes = {
		onOverflowChange: PropTypes.func,
		children: PropTypes.node,
		style: PropTypes.object,
		className: PropTypes.string,
	}

	static defaultProps = {
		style: {},
	}

	constructor(props) {
		super(props)
		this.isOverflowed = false
		this.domElement = null
		this.scrollState = {
			atTop: true,
			atBottom: true,
			atLeft: true,
			atRight: true,
		}
		this.setDOMElement = this.setDOMElement.bind(this)
		this.checkOverflow = this.checkOverflow.bind(this)
		this.handleScroll = this.handleScroll.bind(this)
	}

	componentDidMount() {
		this.checkOverflow()
	}

	componentDidUpdate() {
		this.checkOverflow()
	}

	setDOMElement(domElement) {
		this.domElement = domElement
	}

	checkOverflow() {
		const isOverflowed =
			this.domElement.scrollWidth > this.domElement.clientWidth ||
			this.domElement.scrollHeight > this.domElement.clientHeight

		if (isOverflowed !== this.isOverflowed) {
			this.isOverflowed = isOverflowed
			if (this.props.onOverflowChange) {
				this.props.onOverflowChange(isOverflowed)
			}
			if (!isOverflowed) {
				this.handleScroll()
			}
		}
	}

	handleScroll() {
		const {
			clientHeight,
			clientWidth,
			scrollTop,
			scrollLeft,
			scrollHeight,
			scrollWidth,
		} = this.domElement
		const atTop = scrollTop === 0
		const atBottom = scrollTop + clientHeight === scrollHeight
		const atLeft = scrollLeft === 0
		const atRight = scrollLeft + clientWidth === scrollWidth
		const s = this.scrollState
		if (
			s.atTop !== atTop ||
			s.atBottom !== atBottom ||
			s.atLeft !== atLeft ||
			s.atRight !== atRight
		) {
			const scrollState = {atTop, atBottom, atLeft, atRight}
			this.scrollState = scrollState
			this.props.onScrolled(scrollState)
		}
	}

	render() {
		const {style, className, children, onScrolled} = this.props
		return (
			<div
				ref={this.setDOMElement}
				style={{...style, position: 'relative'}}
				className={className}
				onScroll={this.isOverflowed && onScrolled && this.handleScroll}
			>
				{children}
				<ResizeDetector onResize={this.checkOverflow} />
			</div>
		)
	}
}
