import React, {Component} from 'react';
import { StyleSheet, Button, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar } from 'react-native-tab-view';

import { getTeams } from '../actions/index';

import FavoriteTeams from '../components/FavoriteTeams';
import FavoriteSchedule from '../components/FavoriteSchedule';
import DrawerButton from '../components/DrawerButton';
import * as Colors from '../constants/colors';

const AllButton = ({navigation}) => {
    return <TouchableOpacity style={{paddingRight: 20}} onPress={() => navigation.navigate("Leagues")}>
        <Text style={{color: Colors.LIGHT_TEAL}}>ALL</Text>
    </TouchableOpacity>
}

class Favorites extends Component {
    state = {
        index: 0,
        routes: [
            { key: 'FAVORITE_TEAMS', title: 'TEAMS' },
            { key: 'FAVORITE_SCHEDULE', title: 'SCHEDULE' }
        ]
    };

    componentDidMount() {
        this.props.getTeams();
    }

    _renderScene = route => {
        const scenes = {
            'FAVORITE_TEAMS': <FavoriteTeams />,
            'FAVORITE_SCHEDULE': <FavoriteSchedule />
        };
        return scenes[route.route.key];
    };

    render() {
        if(this.props.teamsError){
            return <View><Text>Error!</Text></View> // TODO Eror Screen with Retry -> this.props.getTeams();
        }

        if(this.props.isTeamsLoading){
            return <View><Text>Loading...</Text></View> // TODO Loading Spinner
        }

        return <TabView
            style={{flex: 1}}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderTabBar={
                props => <TabBar {...props} style={{backgroundColor: Colors.DARK_BLUE}} labelStyle={{color: Colors.LIGHT_TEAL}} indicatorStyle={{backgroundColor: Colors.GRAY}}/>
            }
            onIndexChange={index => this.setState({ index })}
            initialLayout={{height: 0, width: Dimensions.get("window").width}}
        />
    }
}

Favorites.navigationOptions = ({navigation}) => {
    return {
        title: 'Favorites',
        headerLeft: (props) => <DrawerButton tintColor={props.tintColor} navigation={navigation} />,
        headerRight: <AllButton navigation={navigation}/>
    }
};

const mapStateToProps = state => {
    return {
        teams: state.teams,
        isTeamsLoading: state.isTeamsLoading,
        teamsError: state.teamsError,
        favoriteTeams: state.favoriteTeams
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTeams: () => dispatch(getTeams())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);