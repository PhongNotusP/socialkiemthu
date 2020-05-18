import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const AccountLayout = props => (
    <section className="profile-account-setting">
        <div className="container">
            <div className="account-tabs-setting">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="acc-leftbar">
                            <div className="nav nav-tabs">
                                <Link to="/account" className="nav-item nav-link"><i className="fa fa-group"></i>Thông tin</Link>
                                <Link to="/account/education" className="nav-item nav-link"><i className="fa fa-fa fa-line-chart"></i>Học vấn</Link>
                                <Link to="/account/experience" className="nav-item nav-link"><i className="fa fa-flash"></i>Kinh nghiệm</Link>
                                <Link to="/account/social" className="nav-item nav-link"><i className="fa fa-paw"></i>Mạng xã hội</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="tab-content">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

AccountLayout.propTypes = {

}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(AccountLayout);
