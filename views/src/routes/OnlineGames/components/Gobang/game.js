import React, { PropTypes } from 'react'

const GObangMain = ({socket, room_data}) => {
	console.log(socket)
	console.log(room_data)
	return (
		<h1>NightCat Game.</h1>
	)
}

GObangMain.propTypes = {
  socket: PropTypes.object.isRequired,
  room_data: PropTypes.object.isRequired
}

export default GObangMain