import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'FollowedContentWebPartStrings';
import FollowedContentMain from './components/FollowedContentMain';
import { IFollowedContentMainProps } from './components/IFollowedContentMainProps';



export interface IFollowedContentWebPart {
  title: string;
}


export default class FollowedContentWebPart extends BaseClientSideWebPart<IFollowedContentWebPart> {
  
  public render(): void {
    
    const ctx = this.context;
    const element: React.ReactElement<IFollowedContentMainProps> = React.createElement(
      FollowedContentMain,
      {
        title: this.properties.title,        
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
}
