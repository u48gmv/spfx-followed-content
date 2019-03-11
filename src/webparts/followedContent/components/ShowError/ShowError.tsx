import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

import {IShowErrorProps} from './IShowErrorProps';

class ShowError extends React.Component<IShowErrorProps,{}> {
    constructor(props) {
        super(props);
        this.state = {};
      }    

      public render(){
          return (
            <MessageBar 
                messageBarType={MessageBarType.error}
                isMultiline={true}
            >
            {this.props.message}            
          </MessageBar>
          );
      }

}

export default ShowError;