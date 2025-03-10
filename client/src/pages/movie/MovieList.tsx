import MovieTable from "../../components/MovieTable";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import MovieAction from "../../redux/actions/MovieAction";
import { SwitchType } from "../../services/CommonTypes";

function mapStateToProps(state: any) {
    return state.MovieReducer
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        onLoad() {
            dispatch(MovieAction.fetchMovies({
                page: 1,
                limit: 10,
                key: ""
            }))
        },
        onSwitchChange(type: SwitchType, newState: boolean, id: string) {
            dispatch(MovieAction.changeSwitch(type, newState, id))
        },
        async onDelete(id: string) {
            await dispatch(MovieAction.deleteMovie(id))
        },
        onChange(newPage: any) {
            dispatch(MovieAction.fetchMovies({
                page: newPage,
            }))
        },
        onKeyChange(key: any) {
            dispatch(MovieAction.setConditionAction({
                key
            }))
        },
        onSearch() {
            dispatch(MovieAction.fetchMovies({
                page: 1
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable)