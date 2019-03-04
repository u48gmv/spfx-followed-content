import * as React from 'react';
import styles from './FollowedContent.module.scss';
import { IFollowedContentProps } from './IFollowedContentProps';
import { IFollowedContentState } from './IFollowedContentState';
import { escape } from '@microsoft/sp-lodash-subset';
import {default as sampleDataFollow} from './sampleFollows';

export default class FollowedContent extends React.Component<IFollowedContentProps, IFollowedContentState> {

  _testing = "wusaa";

  _followedStuff = sampleDataFollow;

  constructor(props) {
    super(props);
    this.state = {
      t1:'wusa'
    }
  }

  _testingFunc = () => {
    this.setState({t1:this.state.t1+'a'});
    console.log(this._followedStuff);
  }

  public render(): React.ReactElement<IFollowedContentProps> {
    const followCount = this._followedStuff.d.Followed.results.length;
    return (
      <div className={ styles.followedContent }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <p className={ styles.description }>{this._testing}<br/>{this.state.t1}</p>
              <div className={ styles.button } onClick={this._testingFunc}>
                <span className={ styles.label }>Learn more</span>
                <div>You are following {followCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
