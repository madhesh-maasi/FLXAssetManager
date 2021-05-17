import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

// import styles from './FlxAssetManagersWebPart.module.scss';
import * as strings from 'FlxAssetManagersWebPartStrings';
import "../../ExternalRef/Css/style.css";
import "../../ExternalRef/Css/Bootstrap.min.css";
export interface IFlxAssetManagersWebPartProps {
  description: string;
}

export default class FlxAssetManagersWebPart extends BaseClientSideWebPart<IFlxAssetManagersWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <div class="container asset-manager">  
    <div class="border">
    <h5 class="bg-secondary text-light px-4 py-2">Manager View</h5>
    <div class="add-announcements px-4 py-2 border-bottom"><a class="text-info">+ Add Manager View</a></div>
    <div class="manager-view-list">
    <ul class="list-unstyled m-0"> 
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    <li class="px-4 py-2 border-bottom"><a href="">Manager view 1</a></li>
    </ul>
    </div>
    </div> 
    </div>`;  
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
