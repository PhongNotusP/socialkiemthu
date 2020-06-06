import React, { Component } from 'react'
import { connect } from 'react-redux'

export default class Jobs extends Component {
  render () {
    return (
      <div className='wrapper'>
        <div>
          <main>
            <div className='main-section'>
              <div className='container'>
                <div className='main-section-data'>
                  <div className='row'>
                    <div className='col-lg-3'>
                      <div className='filter-secs'>
                        <div className='filter-heading'>
                          <h3>Bộ lọc</h3>
                          <a href='#' title=''>
                            Xóa bộ lọc
                          </a>
                        </div>
                        <div className='paddy'>
                          <div className='filter-dd'>
                            <div className='filter-ttl'>
                              <h3>Kỹ năng</h3>
                              <a href='#' title=''>
                                Xóa
                              </a>
                            </div>
                            <form>
                              <input
                                type='text'
                                name='search-skills'
                                placeholder=''
                              />
                            </form>
                          </div>
                          <div className='filter-dd'>
                            <div className='filter-ttl'>
                              <h3>Hiện có</h3>
                              <a href='#' title>
                                Xóa
                              </a>
                            </div>
                            <ul className='avail-checks'>
                              <li>
                                <input type='radio' name='cc' id='c2' />
                                <label htmlFor='c2'>
                                  <span />
                                </label>
                                <small>Part-Time</small>
                              </li>
                              <li>
                                <input type='radio' name='cc' id='c3' />
                                <label htmlFor='c3'>
                                  <span />
                                </label>
                                <small>Full-Time</small>
                              </li>
                            </ul>
                          </div>
                          <div className='filter-dd'>
                            <div className='filter-ttl'>
                              <h3>Ngôn ngữ</h3>
                              <a href='#' title>
                                Xóa
                              </a>
                            </div>
                            <form className='job-tp'>
                              <select>
                                <option>Chọn loại</option>
                                <option>NodeJS</option>
                                <option>PHP</option>
                                <option>Java</option>
                                <option>C/C++</option>
                                <option>Ruby</option>
                                <option>HTML/CSS/JS</option>
                              </select>
                              <i
                                className='fa fa-ellipsis-v'
                                aria-hidden='true'
                              />
                            </form>
                          </div>
                        </div>
                      </div>
                      {/*filter-secs end*/}
                    </div>
                    <div className='col-lg-6'>
                      <div className='main-ws-sec'>
                        <div className='posts-section'>
                          <div className='post-bar'>
                            <div className='post_topbar'>
                              <div className='usy-dt'>
                                <img src='images/resources/us-pic.png' alt='' />
                                <div className='usy-name'>
                                  <h3>Anh Bảo</h3>
                                  <span>
                                    <img src='images/clock.png' alt='' />
                                    10 hours ago
                                  </span>
                                </div>
                              </div>
                              <div className='ed-opts'>
                                <a href='#' title className='ed-opts-open'>
                                  <i className='la la-ellipsis-v' />
                                </a>
                                <ul className='ed-options'>
                                  <li>
                                    <a href='#' title>
                                      Bỏ lưu
                                    </a>
                                  </li>

                                  <li>
                                    <a href='#' title>
                                      Đóng
                                    </a>
                                  </li>
                                  <li>
                                    <a href='#' title>
                                      Ẩn bài viết
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className='epi-sec'>
                              <ul className='descp'>
                                <li>
                                  <img src='images/icon8.png' alt='' />
                                  <span>Coder</span>
                                </li>
                                <li>
                                  <img src='images/icon9.png' alt='' />
                                  <span>6M+ Exp</span>
                                </li>
                              </ul>
                              <ul className='bk-links'>
                                <li>
                                  <a href='#' title>
                                    <i className='la la-bookmark' />
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    <i className='la la-envelope' />
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className='job_descp'>
                              <h3>PHP Developer</h3>
                              <ul className='job-dt'>
                                <li>
                                  <a href='#' title>
                                    Full-Time
                                  </a>
                                </li>
                                <li>
                                  <span>$4 / hr</span>
                                </li>
                              </ul>
                              <p>
                                Tham gia nhóm phát triển cũng như viết các
                                modules, plugin mã nguồn mở áp dụng thanh toán
                                trên mã nguồn mở trên WordPress, Joomla,
                                OpenCart, Magento cũng như trên mô hình MVC
                                trong PHP..
                                <a href='#' title>
                                  Xem thêm
                                </a>
                              </p>
                              <ul className='skill-tags'>
                                <li>
                                  <a href='#' title>
                                    HTML
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    PHP
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    CSS
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    Javascript
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    Wordpress
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className='posts-section'>
                          <div className='post-bar'>
                            <div className='post_topbar'>
                              <div className='usy-dt'>
                                <img src='images/resources/us-pic.png' alt='' />
                                <div className='usy-name'>
                                  <h3>Ngân hàng á châu (ACB)</h3>
                                  <span>
                                    <img src='images/clock.png' alt='' />
                                    20 hours ago
                                  </span>
                                </div>
                              </div>
                              <div className='ed-opts'>
                                <a href='#' title className='ed-opts-open'>
                                  <i className='la la-ellipsis-v' />
                                </a>
                                <ul className='ed-options'>
                                  <li>
                                    <a href='#' title>
                                      Bỏ lưu
                                    </a>
                                  </li>

                                  <li>
                                    <a href='#' title>
                                      Đóng
                                    </a>
                                  </li>
                                  <li>
                                    <a href='#' title>
                                      Ẩn bài viết
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className='epi-sec'>
                              <ul className='descp'>
                                <li>
                                  <img src='images/icon8.png' alt='' />
                                  <span>Coder</span>
                                </li>
                                <li>
                                  <img src='images/icon9.png' alt='' />
                                  <span>3Y+ Exp</span>
                                </li>
                              </ul>
                              <ul className='bk-links'>
                                <li>
                                  <a href='#' title>
                                    <i className='la la-bookmark' />
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    <i className='la la-envelope' />
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className='job_descp'>
                              <h3>Back-End Developer</h3>
                              <ul className='job-dt'>
                                <li>
                                  <a href='#' title>
                                    Full-Time
                                  </a>
                                </li>
                                <li>
                                  <span>$12 / hr</span>
                                </li>
                              </ul>
                              <p>
                                Thiết kế và phát triển các back-ends APIs cho hệ
                                thống ứng dụng có khả năng xử lý hàng triệu giao
                                dịch mỗi ngày...
                                <a href='#' title>
                                  Xem thêm
                                </a>
                              </p>
                              <ul className='skill-tags'>
                                <li>
                                  <a href='#' title>
                                    Golang
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    RESTful
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    .NET
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    Java
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    Python
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className='posts-section'>
                          <div className='post-bar'>
                            <div className='post_topbar'>
                              <div className='usy-dt'>
                                <img src='images/resources/us-pic.png' alt='' />
                                <div className='usy-name'>
                                  <h3>Sun*</h3>
                                  <span>
                                    <img src='images/clock.png' alt='' />5 hours
                                    ago
                                  </span>
                                </div>
                              </div>
                              <div className='ed-opts'>
                                <a href='#' title className='ed-opts-open'>
                                  <i className='la la-ellipsis-v' />
                                </a>
                                <ul className='ed-options'>
                                  <li>
                                    <a href='#' title>
                                      Bỏ lưu
                                    </a>
                                  </li>

                                  <li>
                                    <a href='#' title>
                                      Đóng
                                    </a>
                                  </li>
                                  <li>
                                    <a href='#' title>
                                      Ẩn bài viết
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className='epi-sec'>
                              <ul className='descp'>
                                <li>
                                  <img src='images/icon8.png' alt='' />
                                  <span>Coder</span>
                                </li>
                                <li>
                                  <img src='images/icon9.png' alt='' />
                                  <span>1Y+ Exp</span>
                                </li>
                              </ul>
                              <ul className='bk-links'>
                                <li>
                                  <a href='#' title>
                                    <i className='la la-bookmark' />
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    <i className='la la-envelope' />
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className='job_descp'>
                              <h3>C++ Developer</h3>
                              <ul className='job-dt'>
                                <li>
                                  <a href='#' title>
                                    Full-Time
                                  </a>
                                </li>
                                <li>
                                  <span>$6 / hr</span>
                                </li>
                              </ul>
                              <p>
                                Trở thành lập trình viên của Sun*, bạn sẽ có cơ
                                hội làm việc trong môi trường quốc tế năng động,
                                có nhiều cơ hội thăng tiến, phát triển bản thân,
                                hợp tác với những chuyên gia hàng đầu và cơ hội
                                làm việc onsite tại Nhật Bản..
                                <a href='#' title>
                                  Xem thêm
                                </a>
                              </p>
                              <ul className='skill-tags'>
                                <li>
                                  <a href='#' title>
                                    IOS
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    C++
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    Android
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className='posts-section'>
                          <div className='post-bar'>
                            <div className='post_topbar'>
                              <div className='usy-dt'>
                                <img src='images/resources/us-pic.png' alt='' />
                                <div className='usy-name'>
                                  <h3>Trâm Anh</h3>
                                  <span>
                                    <img src='images/clock.png' alt='' />3 hours
                                    ago
                                  </span>
                                </div>
                              </div>
                              <div className='ed-opts'>
                                <a href='#' title className='ed-opts-open'>
                                  <i className='la la-ellipsis-v' />
                                </a>
                                <ul className='ed-options'>
                                  <li>
                                    <a href='#' title>
                                      Bỏ lưu
                                    </a>
                                  </li>

                                  <li>
                                    <a href='#' title>
                                      Đóng
                                    </a>
                                  </li>
                                  <li>
                                    <a href='#' title>
                                      Ẩn bài viết
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className='epi-sec'>
                              <ul className='descp'>
                                <li>
                                  <img src='images/icon8.png' alt='' />
                                  <span>Coder</span>
                                </li>
                                <li>
                                  <img src='images/icon9.png' alt='' />
                                  <span>1Y+ Exp</span>
                                </li>
                              </ul>
                              <ul className='bk-links'>
                                <li>
                                  <a href='#' title>
                                    <i className='la la-bookmark' />
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    <i className='la la-envelope' />
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className='job_descp'>
                              <h3>Freelance/Remote Developer</h3>
                              <ul className='job-dt'>
                                <li>
                                  <a href='#' title>
                                    Full-Time/Part-Time
                                  </a>
                                </li>
                                <li>
                                  <span>$5 / hr</span>
                                </li>
                              </ul>
                              <p>
                                Location: Anywhere: Your home / Your office
                                <br />
                                Salary: Negotiable, depend on your experience.
                                You'll receive bonus if you pass our
                                Qualification Process and sign our first
                                contract..
                                <a href='#' title>
                                  Xem thêm
                                </a>
                              </p>
                              <ul className='skill-tags'>
                                <li>
                                  <a href='#' title>
                                    C#
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    Javascript
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    Java
                                  </a>
                                </li>
                                <li>
                                  <a href='#' title>
                                    PHP
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-3'>
                      <div className='right-sidebar'>
                        <div className='widget widget-jobs'>
                          <div className='sd-title'>
                            <h3>Top</h3>
                            <i className='la la-ellipsis-v' />
                          </div>
                          <div className='jobs-list'>
                            <div className='job-info'>
                              <div className='job-details'>
                                <h3>
                                  BACK-END SOFTWARE ENGINEER (GO/NODEJS/PYTHON)
                                </h3>
                                <p>
                                  Cho Tot team is expanding to continuously
                                  innovate our marketplace ecosystem to better
                                  serve Vietnamese via advance technology. We
                                  are looking for talented and passionate
                                  individuals to join our foundation software
                                  engineering team.
                                </p>
                              </div>
                              <div className='hr-rate'>
                                <span>$20/hr</span>
                              </div>
                            </div>

                            <div className='job-info'>
                              <div className='job-details'>
                                <h3>Quality Assurance Engineer</h3>
                                <p>
                                  Prepare test plans based on project
                                  requirements Perform testing, including
                                  developing test cases, writing test scripts,
                                  executing tests, analyzing test results.
                                </p>
                              </div>
                              <div className='hr-rate'>
                                <span>$8/hr</span>
                              </div>
                            </div>

                            <div className='job-info'>
                              <div className='job-details'>
                                <h3>Lập Trình Viên Python</h3>
                                <p>
                                  Xây dựng sản phẩm giải pháp chăm sóc khách
                                  hàng cho doanh nghiệp SME. Chịu trách nhiệm
                                  lập trình, phối hợp với CTO để lên giải pháp
                                  và tính năng cho khách hàng.
                                </p>
                              </div>
                              <div className='hr-rate'>
                                <span>$5/hr</span>
                              </div>
                            </div>

                            <div className='job-info'>
                              <div className='job-details'>
                                <h3>
                                  Senior Developer (Microsoft Cloud, Azure,
                                  SSIS)
                                </h3>
                                <p>
                                  The role is responsible for designing, coding
                                  and modifying websites, from layout to
                                  function and according to business
                                  specifications. Strive to create visually
                                  appealing sites that feature user-friendly
                                  design and clear navigation.
                                </p>
                              </div>
                              <div className='hr-rate'>
                                <span>$15/hr</span>
                              </div>
                            </div>

                            <div className='job-info'>
                              <div className='job-details'>
                                <h3>ART 2D</h3>
                                <p>
                                  Thiết kế art cho game Casual, vẽ nhân vật,
                                  background Thiết kế, sáng tác, thay đổi phong
                                  cách đồ hoạ (reskin - style art 2D, 3D) cho
                                  các sản phẩm game của công ty và đối tác.
                                </p>
                              </div>
                              <div className='hr-rate'>
                                <span>$12/hr</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
}
