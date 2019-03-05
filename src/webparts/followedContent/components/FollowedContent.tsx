import * as React from 'react';
import { IFollowedContentProps } from './IFollowedContentProps';
import { IFollowedContentState } from './IFollowedContentState';
import { escape } from '@microsoft/sp-lodash-subset';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { List } from 'office-ui-fabric-react/lib/List';

import '../../../../node_modules/office-ui-fabric-core/dist/css/fabric.min.css';
import styles from './FollowedContent.module.scss';

import {default as sampleDataFollow} from './sampleFollows';

export default class FollowedContent extends React.Component<IFollowedContentProps, IFollowedContentState> {

  private followedStuff = sampleDataFollow;

  constructor(props) {
    super(props);
    this.state = {
      t1:'wusa'
    }
  }

  private _testingFunc = () => {
    this.setState({t1:this.state.t1+'a'});
    console.log(this.followedStuff);
  }

  private _onRenderCell = (item: any, index: number | undefined): JSX.Element => {

    return (
      <div>
        <div>
          <div>
            <span>Item name: {item.Name} Item uri: {item.Uri}</span>
          </div>
        </div>
      </div>
    );
  }

  public render(): React.ReactElement<IFollowedContentProps> {
    const followCount = this.followedStuff.d.Followed.results.length;
    return (
      <Fabric>
        <div className={ styles.followedContent }>
          <div className={ styles.container }>
            <div className={ styles.row }>
              <div className={ styles.column }>
                <span className={ styles.title }>Welcome to SharePoint!</span>
                <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
                <p className={ styles.description }>{escape(this.props.description)}</p>
                <div className={ styles.button } onClick={this._testingFunc}>
                  <span className={ styles.label }>Learn more</span>
                  <div>You are following {followCount} element{followCount > 1 ? 's' : ''}</div>
                  <List
                    items={this.followedStuff.d.Followed.results}
                    onRenderCell={this._onRenderCell}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fabric>
    );
  }
}
