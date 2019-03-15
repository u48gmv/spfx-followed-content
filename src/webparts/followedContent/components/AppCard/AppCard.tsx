import * as React from 'react';

import {IAppCardProps} from './IAppCardProps';

import { Icon } from 'office-ui-fabric-react/lib/Icon';

import './AppCardStyles.scss';

class AppCard extends React.Component<IAppCardProps,{}> {
    constructor(props) {
        super(props);
        this.state = {};
      }

      public render(){
/*
            <div className="app-card-card">
              <img className="app-card-img" src={this.props.imagePath} alt="Avatar" />
              <div className="app-card-container">
                <h4><b>{this.props.title}</b></h4>
                <p>{this.props.description}</p>
              </div>
            </div>
*/
          return (
          <div className="app-card-container">
            <Icon className="app-card-ico" iconName={this.props.imagePath} />
            <div className="app-card-overlay">{this.props.title}</div>
          </div>
          );
      }

}

export default AppCard;
