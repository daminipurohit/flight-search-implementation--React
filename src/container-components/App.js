/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';
import Header from '../common-components/Header';
import FlightSearchContainer from './FlightSearchContainer';
import '../styles/appStyles.scss';

require('!!file-loader?name=../dist/[name].[ext]!../../favicon.ico');

const App = () => (
    <div className="flight-search-app">
        <Header />
        <FlightSearchContainer />
    </div>
);

export default App;
