import React from "react";
import { connect } from 'react-redux';
const GeneralLayout = props => (
    <div>
        {props.children}
    </div >
);

GeneralLayout.propTypes = {

}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(GeneralLayout);