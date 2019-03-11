import * as React from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

class LoadingSpinner extends React.Component<{},{}> {

      public render(){
          return (
            <div>                
                <Spinner size={SpinnerSize.large} label="Inhalte werden geladen..." />
            </div>
          );
      }

}

export default LoadingSpinner;