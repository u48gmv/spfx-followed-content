import {IDataToShow} from "./IDataToShow";

export interface IFollowedContentMainState {
    isLoading: boolean;
    dataToShow: IDataToShow;
    errorMessage: JSX.Element;
}
