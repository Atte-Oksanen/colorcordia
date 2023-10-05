const wrapperStyle = {
  display: "grid",
  width: 'fit-content',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr'
}

const wheelStyle = {
	aspectRatio: '1/1',
	height: '20rem',
	content: '',
	borderRadius: '50%',
}


const bottomWheelStyle = {
  ...wheelStyle,
  gridArea: '1/1/2/2',
	border: '1px solid black',
	background: `conic-gradient(rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 18%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 45%,
    rgba(47, 201, 226, 1) 48%,
    rgba(0, 127, 238, 1) 58%,
    rgba(0, 26, 255, 1) 65%,
    rgba(95, 21, 242, 1) 74%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%)`,
	transform: 'rotate(90deg)',
}

const topWheelStyle = {
  ...wheelStyle,
  gridArea: '1/1/2/2',
	background: `radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 85%)`,
	zIndex: 1,
}

const pointerStyle = {
	...wheelStyle,
	position: 'absolute',
	// left: '9rem',
	// top: '9rem',
	height: '2rem',
	background: 'black',
	content: '',
	cursor: 'crosshair',
	zIndex: 2,
	border: '1px solid white',
}


export default { pointerStyle, wheelStyle, topWheelStyle, bottomWheelStyle, wrapperStyle }
