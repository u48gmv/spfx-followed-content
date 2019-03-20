import * as React from 'react';

import {IAppCardProps} from './IAppCardProps';

import { Icon } from 'office-ui-fabric-react/lib/Icon';

import './AppCardStyles.scss';

class AppCard extends React.Component<IAppCardProps,{}> {
    constructor(props) {
        super(props);
        this.state = {};
      }

      private _followCardLink = () => {
        window.location.href = this.props.link;
      }

      public render(){
          return (
          <div className="app-card-container" onClick={this._followCardLink}>
            <Icon className="app-card-ico" iconName={this.props.imagePath} />
            <div className="app-card-overlay">{this.props.title}</div>
          </div>
          );
      }

}

export default AppCard;
