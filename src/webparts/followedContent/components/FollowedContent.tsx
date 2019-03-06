import * as React from 'react';
import { IFollowedContentProps } from './IFollowedContentProps';
import { IFollowedContentState } from './IFollowedContentState';
import { escape } from '@microsoft/sp-lodash-subset';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { List } from 'office-ui-fabric-react/lib/List';

import '../../../../node_modules/office-ui-fabric-core/dist/css/fabric.min.css';
import styles from './FollowedContent.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import {default as sampleDataFollow} from './sampleFollows';

export default class FollowedContent extends React.Component<IFollowedContentProps, IFollowedContentState> {

  constructor(props) {
    super(props);
    this.state = {}
  }

  private _onRenderCell = (item: any, index: number | undefined): JSX.Element => {
    return (
      <a href={item.Uri}><Icon iconName={item.IconName}></Icon> {item.Name}</a>
    );
  }

  private _categoriseContent = (items: any) =>{
    let catItems = {Users: [], Documents: [], Sites: [], Tags: []};

    items.forEach(element => {

      let arrayToPush = [];
      let iconName = "FavoriteStar";

      switch (element.ActorType) {
        case 0:
          arrayToPush = catItems.Users;
          iconName="ContactInfo";
        break;

        case 1:
          arrayToPush = catItems.Documents;
          iconName="Document";
        break;

        case 2:
          arrayToPush = catItems.Sites;
          iconName="Globe";
        break;

        case 3:
          arrayToPush = catItems.Tags;
          iconName="Tag";
        break;
      }

      arrayToPush.push({Name: element.Name, Uri: element.Uri, IconName: iconName});

    });


    return catItems;
  }

  public render(): React.ReactElement<IFollowedContentProps> {

    const followCount = this.props.followData.d.Followed.results.length;
    const catContent = this._categoriseContent(this.props.followData.d.Followed.results);
    const usersList = <List items={catContent.Users} onRenderCell={this._onRenderCell}/>;
    const documentsList = <List items={catContent.Documents} onRenderCell={this._onRenderCell}/>;
    const sitesList = <List items={catContent.Sites} onRenderCell={this._onRenderCell}/>;
    const tagsList = <List items={catContent.Tags} onRenderCell={this._onRenderCell}/>;

    return (
      <Fabric>
        <div>You are following {followCount} element{followCount > 1 ? 's' : ''}</div>
        <div>Your are following theese users:</div>
        {usersList}
        <div>Your are following theese documents:</div>
        {documentsList}
        <div>Your are following theese sites:</div>
        {sitesList}
        <div>Your are following theese tags:</div>
        {tagsList}
      </Fabric>
    );
  }
}
