import * as React from 'react';
import styles from './FollowedContent.module.scss';
import { IFollowedContentProps } from './IFollowedContentProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class FollowedContent extends React.Component<IFollowedContentProps, {t1:string}> {

  _testing = "wusaa";
  _followedStuff = JSON.parse(`
  {"d":{"Followed":{"results":[
    {"__metadata":{"type":"SP.Social.SocialActor"},
    "AccountName":null,
    "ActorType":1,
    "CanFollow":true,
    "ContentUri":"https://domain.sharepoint.com:443/Shared%20Documents/fileName.docx",
    "EmailAddress":null,
    "FollowedContentUri":null,
    "Id":"2.089f4944a6374a64b52b7af5ba140392.9340a4837688405daa6b83f2b58f973d.51bbb5d8e214457ba794669345d23040.98b9fc73d5224265b039586688b15b98",
    "ImageUri":null,
    "IsFollowed":true,
    "LibraryUri":null,
    "Name":"snippets.txt",
    "PersonalSiteUri":null,
    "Status":0,
    "StatusText":null,
    "TagGuid":"00000000-0000-0000-0000-000000000000",
    "Title":null,
    "Uri":"https://domain.sharepoint.com:443/Shared%20Documents/fileName.docx"},
    {"__metadata":{"type":"SP.Social.SocialActor"},
    "AccountName":null,
    "ActorType":2,
    "CanFollow":true,
    "ContentUri":"https://domain.sharepoint.com:443/",
    "EmailAddress":null,
    "FollowedContentUri":null,
    "Id":"8.089f4944a6374a64b52b7af5ba140392.9340a4837688405daa6b83f2b58f973d.089f4944a6374a64b52b7af5ba140392.98b9fc73d5224265b039586688b15b98",
    "ImageUri":null,
    "IsFollowed":true,
    "LibraryUri":null,
    "Name":"Developer Site",
    "PersonalSiteUri":null,
    "Status":0,
    "StatusText":null,
    "TagGuid":"00000000-0000-0000-0000-000000000000",
    "Title":null,
    "Uri":"https://domain.sharepoint.com:443/"},
    {"__metadata":{"type":"SP.Social.SocialActor"},
    "AccountName":null,
    "ActorType":3,
    "CanFollow":true,
    "ContentUri":null,
    "EmailAddress":null,
    "FollowedContentUri":null,
    "Id":"16.00000000000000000000000000000000.00000000000000000000000000000000.19a4a484c1dc4bc58c93bb96245ce928.98b9fc73d5224265b039586688b15b98",
    "ImageUri":null,
    "IsFollowed":true,
    "LibraryUri":null,
    "Name":"#someTag",
    "PersonalSiteUri":null,
    "Status":0,
    "StatusText":null,
    "TagGuid":"19a4a484-c1dc-4bc5-8c93-bb96245ce928",
    "Title":null,
    "Uri":"https://somecompany-my.sharepoint.com:443/_layouts/15/HashTagProfile.aspx?TermID=19a4a484-c1dc-4bc5-8c93-bb96245ce928"}
  ]}}}
  `);

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
