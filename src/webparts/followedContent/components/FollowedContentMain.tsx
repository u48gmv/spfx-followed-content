import * as React from 'react';
import { IFollowedContentMainProps } from './IFollowedContentMainProps';
import { IFollowedContentMainState } from './IFollowedContentMainState';
import { escape } from '@microsoft/sp-lodash-subset';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { List } from 'office-ui-fabric-react/lib/List';
import { Link } from 'office-ui-fabric-react/lib/Link';
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  DocumentCardType
} from 'office-ui-fabric-react/lib/DocumentCard';

import '../../../../node_modules/office-ui-fabric-core/dist/css/fabric.min.css';
import styles from './FollowedContentMain.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import {default as sampleDataFollow} from './sampleFollows';

import {
  PivotItem,
  Pivot
} from 'office-ui-fabric-react/lib/Pivot';

import {
  SPHttpClient,
  SPHttpClientResponse
 } from '@microsoft/sp-http';

import {
   Environment,
   EnvironmentType
  } from '@microsoft/sp-core-library';

import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import {IDataToShow} from "./IDataToShow";

import ShowError from './ShowError/ShowError';

import { ImageFit } from 'office-ui-fabric-react/lib/Image';

import AppCard from './AppCard/AppCard';


export default class FollowedContentMain extends React.Component<IFollowedContentMainProps, IFollowedContentMainState> {

  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      errorMessage:null,
      dataToShow:{
        Users: [],
        Documents: [],
        Sites: [],
        Tags: []
      }
    };
  }

  private _onRenderCell = (item: any, index: number | undefined): JSX.Element => {
    // <a href={item.Uri}><Icon iconName={item.IconName}></Icon> {item.Name}</a>
    return (
      <AppCard
      message={item.Name}
      imagePath={String(require('./IconSet/'+item.IconName+'.png'))}
      title={item.Name}
      description="Some description"
      />
    );
  }

  private _categoriseContent = (items: any) =>{
    let catItems: IDataToShow = {Users: [], Documents: [], Sites: [], Tags: []};

    items.forEach(element => {

      let arrayToPush = [];
      let iconName = "FavoriteStar";

      switch (element.ActorType) {
        case 0:
          arrayToPush = catItems.Users;
          iconName="person-01";
        break;

        case 1:
          arrayToPush = catItems.Documents;
          iconName="file-02";
        break;

        case 2:
          arrayToPush = catItems.Sites;
          iconName="web-01";
        break;

        case 3:
          arrayToPush = catItems.Tags;
          iconName="ta-02";
        break;
      }

      arrayToPush.push({Name: element.Name, Uri: element.Uri, IconName: iconName});

    });


    return catItems;
  }

  private _getListData(): void {
    const getFollowedContent :string = '/_api/social.following/my/followed(types=15)';
    const baseUrl :string = this.props.context.pageContext.web.absoluteUrl;
    this.props.context.spHttpClient.get(baseUrl+getFollowedContent, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        if(response.ok){
          response.json().then(
            (respJson)=>{
              if(respJson !== null && respJson.value !== null){
                const val = respJson.value;
                const errMsg = null;
                this.setState({isLoading:false, dataToShow: this._categoriseContent(val), errorMessage:errMsg});
              }
            }
          );
        }else{
          response.text().then(
            (respText) => {
              const errorObj = JSON.parse(respText);
              const errorCode:string = errorObj.error.code;
              const errorMessage:string = errorObj.error.message;
              const errorMsg = <div>
                <div>Es liegt ein Fehler vor. Eventuell wurde Deine persönliche Seite noch nicht erstellt.</div>
                <Link href="http://spvm/my/">Besuche deine persönliche Seite, um sie zu erstellen.</Link>
                <div>Sollte der Fehler weiterhin bestehen, melde Dich bei Deinem <Link href="mailto:test@example.com">UHD</Link></div>
                <div>Genaue Fehlermeldung:</div>
                <div>{errorCode}</div>
                <div>{errorMessage}</div>
                </div>;
              this.setState({isLoading:false, dataToShow:{}, errorMessage:errorMsg});
            }
          );
        }
      });
   }

  private _getDataToShow(): void{
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint){
      this._getListData();
    }else{
      this.setState({isLoading:false, dataToShow: this._categoriseContent(sampleDataFollow.d.Followed.results), errorMessage:null});
    }
  }

  public componentDidMount(): void{
    this._getDataToShow();
  }

  public render(): React.ReactElement<IFollowedContentMainProps> {

    let spinner: JSX.Element = <span></span>;
    let pivot: JSX.Element = <span></span>;
    let showError: JSX.Element = <span></span>;


    if(this.state.isLoading){
      spinner = <LoadingSpinner />;
    }else{
      if(this.state.errorMessage === null){
        const dataToShow: IDataToShow = this.state.dataToShow;
        const usersList = <List items={dataToShow.Users} onRenderCell={this._onRenderCell}/>;
        const documentsList = <List items={dataToShow.Documents} onRenderCell={this._onRenderCell}/>;
        const sitesList = <List items={dataToShow.Sites} onRenderCell={this._onRenderCell}/>;
        const tagsList = <List items={dataToShow.Tags} onRenderCell={this._onRenderCell}/>;
        pivot = <Pivot>
        <PivotItem linkText="Personen" itemCount={dataToShow.Users.length} itemIcon="ContactInfo">
          {usersList}
        </PivotItem>
        <PivotItem linkText="Dokumente" itemCount={dataToShow.Documents.length} itemIcon="Document">
          {documentsList}
        </PivotItem>
        <PivotItem linkText="Seiten" itemCount={dataToShow.Sites.length} itemIcon="Globe">
          {sitesList}
        </PivotItem>
        <PivotItem linkText="Tags" itemCount={dataToShow.Tags.length} itemIcon="Tag">
          {tagsList}
        </PivotItem>
      </Pivot>;
      }else{
        showError = <ShowError message={this.state.errorMessage} />;
      }

    }

    return (
      <Fabric>
        <h2>{this.props.title}</h2>
        <h3>Loading from <i>{escape(this.props.context.pageContext.web.title)}</i></h3>
        {spinner}
        {pivot}
        {showError}
      </Fabric>
    );
  }
}
