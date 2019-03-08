import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version,
  Environment,
  EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'FollowedContentWebPartStrings';
import FollowedContent from './components/FollowedContent';
import { IFollowedContentProps } from './components/IFollowedContentProps';

import {default as sampleDataFollow} from './components/sampleFollows';

import {
  SPHttpClient,
  SPHttpClientResponse   
 } from '@microsoft/sp-http';

export interface IFollowedContentWebPartProps {
  title: string;
}



export default class FollowedContentWebPart extends BaseClientSideWebPart<IFollowedContentWebPartProps> {

  public render(): void {
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint){
      const out = this._getListData();
    }
    
    const ctx = this.context.pageContext;
    const element: React.ReactElement<IFollowedContentProps > = React.createElement(
      FollowedContent,
      {
        title: this.properties.title,
        followData: sampleDataFollow,
        context: ctx
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _getListData(): Promise<any> {
    const getFollowedContent :string = '/_api/social.following/my/followed(types=15)';
    const baseUrl :string = this.context.pageContext.web.absoluteUrl;
    return this.context.spHttpClient.get(baseUrl+getFollowedContent, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        const out = response.json();
        console.log('Retrieve some data => '+out);
        return out;
      });
   }  
}
