import React, { Component } from 'react'
import isEmpty from '../../utils/isEmpty';
class Social extends Component {
    render() {
        const { social } = this.props;
        return (
            <div>
                {social ?
                    (
                        <ul className="social_links">
                            {isEmpty(social.global) ? null : (
                                <li><a href={social.global} target="_blank" rel="noopener noreferrer"><i className="la la-globe"></i>Website cá nhân</a></li>
                            )}
                            {isEmpty(social.facebook) ? null : (
                                <li><a href={social.facebook} target="_blank" rel="noopener noreferrer"><i className="la la-facebook-square"></i>Facebook</a></li>
                            )}
                            {isEmpty(social.youtube) ? null : (
                                <li><a href={social.youtube} target="_blank" rel="noopener noreferrer"><i className="la la-youtube"></i>Youtube</a></li>
                            )}
                            {isEmpty(social.twitter) ? null : (
                                <li><a href={social.twitter} target="_blank" rel="noopener noreferrer"><i className="la la-twitter"></i>Twitter</a></li>
                            )}
                            {isEmpty(social.linkedin) ? null : (
                                <li><a href={social.linkedin} target="_blank" rel="noopener noreferrer"><i className="la la-linkedin"></i>Linkedin</a></li>
                            )}
                            {isEmpty(social.instagram) ? null : (
                                <li><a href={social.instagram} target="_blank" rel="noopener noreferrer"><i className="la la-instagram"></i>Instagram</a></li>
                            )}
                        </ul>
                    ) : (
                        <ul className="social_links">
                            <li><i className="la la-globe"></i>Chưa cập nhật mạng xã hội</li>
                        </ul>
                    )
                }

            </div>
        )
    }
}
export default Social;
