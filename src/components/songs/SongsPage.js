import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as songActions from '../../actions/songActions';
import SongList from './SongList';
import {browserHistory} from 'react-router';
// container component
class SongsPage extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            song: {title: ""}
        };
        //bind this of the two functions below to the component context 
        //better to do binding here as in render() would cause performance issues
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        this.redirectToAddSongPage = this.redirectToAddSongPage.bind(this);
    }
    redirectToAddSongPage(){
        browserHistory.push('/song');
    }
    onTitleChange(event){
        const song = this.state.song;
        song.title = event.target.value;
        this.setState({song: song});
    }
    onClickSave(){
        //thanks to connect function below we can dispatch an action
        this.props.createSong(this.state.song);
    }
    songRow(song, index){
        return <div key={index}>{song.title}</div>;
    }
    render(){
        const {songs} = this.props;
        return(
            <div className="row">
                <div className="col-xs-12">
                    <h1>Songs</h1>
                    <input 
                        type="submit"
                        value="Add Course"
                        className="btn btn-primary"
                        onClick={this.redirectToAddSongPage}/>
                    <SongList songs = {songs}/>
                </div>
            </div>
        );
    }
}
SongsPage.propTypes = {
    songs: PropTypes.array.isRequired,
    createSong: PropTypes.func.isRequired
};
function mapStateToProps(state, ownProps){
    return {
        songs: state.songs 
    };
}
//this function determines which actions are available in the component
//it's useful beacuse it allows to dispatch actions from component in a cleaner way
function mapDispatchToProps(dispatch){
    return{
        createSong: song => dispatch(songActions.createSong(song))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SongsPage); 