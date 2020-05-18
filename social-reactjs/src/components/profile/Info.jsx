import React, { Component } from 'react';
import Moment from 'react-moment';
class Info extends Component {
    render() {
        let Experience;
        let Education;
        let Skills;
        const { education, experience, skills } = this.props;
        if (education.length === 0) {
            Education = (
                <h3>Chưa có thông tin</h3>
            )
        } else {
            Education = (
                education.map(edu => (
                    <div key={edu._id}>
                        <h4>{edu.school} - {edu.degree}</h4>
                        <span> <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.current ? ('Hiện tại') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}</span>
                        <p>{edu.description}</p>
                    </div>
                ))
            )
        }
        if (experience.length === 0) {
            Experience = (
                <h3>Chưa có thông tin</h3>
            )
        } else {
            Experience = (
                experience.map(exp => (
                    <div key={exp._id}>
                        <h4>{exp.title} - {exp.company}</h4>
                        <span> <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.current ? ('Hiện tại') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}</span>
                        <p>{exp.description}</p>
                    </div>
                ))
            )
        }
        if (skills.length === 0) {
            Skills = (
                <li>Không có skills</li>
            )
        } else {
            Skills = (
                skills.map((skill, index) => (
                    <li key={index}><a href="#!">{skill}</a></li>
                ))
            )
        }
        return (
            <div>
                <div className="user-profile-ov">
                    <h3>Giới thiệu</h3>
                    {this.props.bio}
                </div>
                <div className="user-profile-ov st2">
                    <h3>Kinh nghiệm</h3>
                    {Experience}
                </div>
                <div className="user-profile-ov">
                    <h3>Học vấn</h3>
                    {Education}
                </div>
                <div className="user-profile-ov">
                    <h3>Skills</h3>
                    <ul>
                        {Skills}
                    </ul>
                </div>
            </div>
        )
    }
}
export default Info;
