/* eslint-disable no-useless-concat */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Tabs.scss';

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: props.tabData[0].label
        };
    }

  onClickTabItem = tab => {
      if (this.state.activeTab !== tab) {
          this.setState({ activeTab: tab });
          this.props.onClick(tab);
      }
  }

  render() {
      const { onClickTabItem,
          props: { tabData, className },
          state: { activeTab }
      } = this;

      return (
          <div className={`tabs ${className}`}>
              <ol className="tab-list">
                  {
                      tabData.map(child => {
                          const { label } = child;
                          const active = (activeTab === label ? 'active' : '');
                          return (
                              <li onClick={() => onClickTabItem(label)}
                                  key={label} className={`tab-list-item ${active}`}
                              >{label}
                              </li>
                          );
                      })
                  }
              </ol>
          </div>
      );
  }
}

Tabs.propTypes = {
    tabData: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default Tabs;
