import React, { Component } from 'react'

class Cover extends Component {
    render() {
        const { cover } = this.props;
        return (
            <div>
                <section className="cover-sec">
                    <img src={cover} style={{ width: '1903px', height: '475px' }} alt="Cover" />
                </section>
            </div>
        )
    }
}
export default Cover;
