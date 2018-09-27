import React, {PureComponent} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';

import * as Colors from '../constants/colors';
import League from '../components/League';

class Leagues extends PureComponent {
    static navigationOptions = { title: "Leagues" }

    state = {
        index: 0,
        routes: [
            { key: 'NFL', title: 'NFL' },
            { key: 'MLB', title: 'MLB' },
            { key: 'NBA', title: 'NBA' },
            { key: 'NHL', title: 'NHL' }
        ]
    };

    _renderScene = route => {
        const scenes = {
            'NFL': <League leagueId={'NFL'} teams={this.props.teams} onClickTeam={(team) => this.props.navigation.navigate("Schedule", {team: team})}/>,
            'MLB': <League leagueId={'MLB'} teams={this.props.teams} />,
            'NBA': <League leagueId={'NBA'} teams={this.props.teams} />,
            'NHL': <League leagueId={'NHL'} teams={this.props.teams} />
        };
        return scenes[route.route.key];
    };

    render() {
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

const mapStateToProps = state => {
    return {
        teams: state.teams
    }
};

const mapDispatchToProps = dispatch => {
    return {
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Leagues);