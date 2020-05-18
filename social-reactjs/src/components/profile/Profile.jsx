import React, { Component } from 'react'
import Cover from './Cover';
import Social from './Social';
import Info from './Info';
import Portfolio from './Portfolio';
import { Link } from 'react-router-dom';
class Profile extends Component {
    render() {
        const { profile } = this.props;
        return (
            <div>
                <Cover cover={profile.user.cover} />
                <main>
                    <div className="main-section">
                        <div className="container">
                            <div className="main-section-data">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className="main-left-sidebar">
                                            <div className="user_profile">
                                                <div className="user-pro-img">
                                                    <img src={profile.user.avatar} alt={profile.user.name} width="180px" height="180px" />
                                                    {/* <a href="#!" title=""><i className="fa fa-camera"></i></a> */}
                                                </div>
                                                <div className="user_pro_status">
                                                    <ul className="flw-status">
                                                        <li>
                                                            <span>Theo dõi</span>
                                                            <b>{profile.user.sentRequests.length}</b>
                                                        </li>
                                                        <li>
                                                            <span>Bạn bè</span>
                                                            <b>{profile.user.friends.length}</b>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {profile.social ? <Social social={profile.social} /> : <Social social={null} />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="main-ws-sec">
                                            <div className="user-tab-sec">
                                                <h3>{profile.user.name}</h3>
                                                <div className="star-descp">
                                                    <span>{profile.status}</span>
                                                </div>
                                            </div>
                                            <div className="product-feed-tab current" id="info-dd">
                                                <Info education={profile.education} experience={profile.experience} bio={profile.bio} skills={profile.skills} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="right-sidebar">
                                            <div className="message-btn">
                                                <Link to="/message">
                                                    <i className="fa fa-envelope"></i> Messages
                                                    </Link>
                                            </div>
                                            <div className="suggestions full-width">
                                                <div className="sd-title">
                                                    <h3>Project</h3>
                                                    <i className="la la-ellipsis-v"></i>
                                                </div>
                                                {profile.githubusername ? <Portfolio portfolio={profile.githubusername} /> : <Portfolio portfolio={null} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div >
        )
    }
}
export default Profile;