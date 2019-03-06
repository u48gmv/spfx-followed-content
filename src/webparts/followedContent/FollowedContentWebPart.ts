import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'FollowedContentWebPartStrings';
import FollowedContent from './components/FollowedContent';
import { IFollowedContentProps } from './components/IFollowedContentProps';

import {default as sampleDataFollow} from './components/sampleFollows';

export interface IFollowedContentWebPartProps {
  description: string;
}

export default class FollowedContentWebPart extends BaseClientSideWebPart<IFollowedContentWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IFollowedContentProps > = React.createElement(
      FollowedContent,
      {
        description: this.properties.description,
        followData: sampleDataFollow
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
