import React, { Component } from 'react'
import { getAllRoom } from '../../actions/messageActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import Feed from './Feed';
import Messages from './Messages';
class Room extends Component {
	componentDidMount() {
		this.props.getAllRoom();
	}
	render() {
		const { rooms, loading, live, room } = this.props.room;
		let roomLoading;
		if (!loading) {
			if (rooms.rooms !== undefined) {
				roomLoading = <Feed rooms={rooms.rooms} live={live} />
			}
		} else {
			roomLoading = <Spinner />
		}
		return (
			<section className="messages-page">
				<div className="container">
					<div className="messages-sec">
						<div className="row">
							<div className="col-lg-4 col-md-12 no-pdd">
								<div className="msgs-list">
									<div className="msg-title">
										<h3>Messages</h3>
										<ul>
											<li><a href="#!" title=""><i className="fa fa-cog"></i></a></li>
											<li><a href="#!" title=""><i className="fa fa-ellipsis-v"></i></a></li>
										</ul>
									</div>
									{roomLoading}
								</div>
							</div>
							<div className="col-lg-8 col-md-12 pd-right-none pd-left-none">
								<Messages room={room} />
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	}
}
Room.propTypes = {
	getAllRoom: PropTypes.func.isRequired,
	room: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	room: state.room
});
export default connect(mapStateToProps, { getAllRoom })(Room);
