import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
class Header extends Component {
  onLogoutClick (e) {
    e.preventDefault()
    this.props.logoutUser()
  }
  render () {
    const { isAuthenticated, user } = this.props.auth
    //Lấy thông tin user khi đăng nhập thành công
    const authLinks = (
      <div className='header-data'>
        <div className='logo'>
          <Link to='/'>
            <img
              style={{ borderRadius: '50%' }}
              src={window.location.origin + '/template/images/logo.png'}
              alt='Logo'
            />
          </Link>
        </div>
        <div className='search-bar'></div>
        <nav>
          <ul>
            <li>
              <Link to='/'>
                <span>
                  <img
                    src={window.location.origin + '/template/images/icon1.png'}
                    alt='Logo'
                  />
                </span>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to='/jobs'>
                <span>
                  <img
                    src={window.location.origin + '/template/images/icon5.png'}
                    alt='Logo'
                  />
                </span>
                Tuyển dụng
              </Link>
            </li>
            <li>
              <Link to='/doc'>
                <span>
                  <img
                    src={window.location.origin + '/template/images/icon2.png'}
                    alt='Logo'
                  />
                </span>
                Tài liệu
              </Link>
            </li>
            <li>
              <Link to='/friends'>
                <span>
                  <img
                    src={window.location.origin + '/template/images/icon4.png'}
                    alt='Logo'
                  />
                </span>
                Bạn bè
              </Link>
            </li>
            <li>
              <Link to='/profile'>
                <span>
                  <img
                    src={window.location.origin + '/template/images/icon3.png'}
                    alt='Logo'
                  />
                </span>
                Cá nhân
              </Link>
            </li>
            <li>
              <Link to='/chat'>
                <span>
                  <img
                    src={window.location.origin + '/template/images/icon6.png'}
                    alt='Logo'
                  />
                </span>
                Tin nhắn
              </Link>
            </li>
          </ul>
        </nav>
        <div className='menu-btn'>
          <a href='#!'>
            <i className='fa fa-bars' />
          </a>
        </div>
        <div className='user-account'>
          <div className='user-info'>
            <img src={user.avatar} alt={user.name} width='30px' height='30px' />
            {user.name ? (
              <a href='#!'>
                {user.name
                  .split(' ')
                  .slice(-1)
                  .join(' ')}
              </a>
            ) : null}
            <i
              style={{ transform: 'translate(50%,-40%)' }}
              className='la la-sort-down'
            />
          </div>
          <div className='user-account-settingss'>
            <h3>Online Status</h3>
            <ul className='on-off-status'>
              <li>
                <div className='fgt-sec'>
                  <input type='radio' name='cc' id='c5' />
                  <label htmlFor='c5'>
                    <span />
                  </label>
                  <small>Online</small>
                </div>
              </li>
              <li>
                <div className='fgt-sec'>
                  <input type='radio' name='cc' id='c6' />
                  <label htmlFor='c6'>
                    <span />
                  </label>
                  <small>Offline</small>
                </div>
              </li>
            </ul>

            <ul className='us-links'>
              <li>
                <Link to='/account'>Chỉnh sửa thông tin</Link>
              </li>
            </ul>
            <h3 className='tc'>
              <a href='#!' onClick={this.onLogoutClick.bind(this)}>
                Đăng xuất
              </a>
            </h3>
          </div>
        </div>
      </div>
    )
    const guestLinks = (
      <div className='header-data'>
        <div className='logo'>
          <Link to='/'>
            <img
              style={{ borderRadius: '50%' }}
              src={window.location.origin + '/template/images/logo.png'}
              alt='Logo'
            />
          </Link>
        </div>
        <div className='search-bar'></div>
        <nav>
          <ul>
            <li>
              <Link to='/login'>
                <span>
                  <img
                    src={window.location.origin + '/template/images/icon4.png'}
                    alt='Logo'
                  />
                </span>
                Đăng nhập
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <span>
                  <img
                    src={window.location.origin + '/template/images/icon2.png'}
                    alt='Logo'
                  />
                </span>
                Đăng ký
              </Link>
            </li>
          </ul>
        </nav>
        <div className='menu-btn'>
          <a href='#!'>
            <i className='fa fa-bars' />
          </a>
        </div>
      </div>
    )
    return (
      <header>
        <div className='container'>{isAuthenticated ? authLinks : ''}</div>
      </header>
    )
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { logoutUser })(Header)
