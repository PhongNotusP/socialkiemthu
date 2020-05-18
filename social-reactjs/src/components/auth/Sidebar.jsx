import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Sidebar extends Component {
  render () {
    return (
      <div className='col-lg-3'>
        <div className='acc-leftbar'>
          <div className='nav nav-tabs'>
            <Link to='/login' className='nav-item nav-link'>
              {/* <i className='fa fa-user-secret'></i>Đăng nhâp */}
            </Link>
            <Link to='/register' className='nav-item nav-link'>
              {/* <i className='fa fa-lock'></i>Đăng ký */}
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default Sidebar
