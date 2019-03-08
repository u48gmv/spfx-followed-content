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

import { PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';

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

    const catContent = this._categoriseContent(this.props.followData.d.Followed.results);
    const usersList = <List items={catContent.Users} onRenderCell={this._onRenderCell}/>;
    const documentsList = <List items={catContent.Documents} onRenderCell={this._onRenderCell}/>;
    const sitesList = <List items={catContent.Sites} onRenderCell={this._onRenderCell}/>;
    const tagsList = <List items={catContent.Tags} onRenderCell={this._onRenderCell}/>;

    return (
      <Fabric>
        <h2>{this.props.title}</h2>
        <h3>Loading from <i>{escape(this.props.context.web.title)}</i></h3>
        <Pivot>
          <PivotItem linkText="Personen" itemCount={catContent.Users.length} itemIcon="ContactInfo">
            {usersList}
          </PivotItem>
          <PivotItem linkText="Dokumente" itemCount={catContent.Documents.length} itemIcon="Document">
            {documentsList}
          </PivotItem>
          <PivotItem linkText="Seiten" itemCount={catContent.Sites.length} itemIcon="Globe">
            {sitesList}
          </PivotItem>
          <PivotItem linkText="Tags" itemCount={catContent.Tags.length} itemIcon="Tag">
            {tagsList}
          </PivotItem>
        </Pivot>
      </Fabric>
    );
  }
}
