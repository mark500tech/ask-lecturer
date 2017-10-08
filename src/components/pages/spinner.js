import React from 'react';
import {connect} from 'react-redux'

const Spinner = ({isLoading}) => isLoading ?
  (
    <div className='spinner-page'>
      <svg className="spinner" width="100px" height="100px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"/>
      </svg>
    </div>
  )
  :
  (null);

const mapStateToProps = (state) => ({
  isLoading: state.status.status
});

export default connect(mapStateToProps)(Spinner);


