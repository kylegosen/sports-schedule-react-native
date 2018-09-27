import React, {PureComponent} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-easy-toast';

import { RecyclerListView, LayoutProvider, DataProvider } from 'recyclerlistview';

import Game from '../components/Game';
import Team from '../components/Team';

import * as Colors from '../constants/colors';

const _ScheduleLayoutProvider = new LayoutProvider(
    () => {
      return 'GAME';
    },
    (type, dim) => {
      switch (type) {
        case 'GAME':
          dim.width = Dimensions.get('window').width;
          dim.height = 50;
          break;
        default:
          dim.width = 0;
          dim.heigh = 0;
      }
    }
);

class Schedule extends PureComponent {
    static navigationOptions = { title: "Schedule" }

    constructor(props){
        super(props);

        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

        let team = this.props.navigation.getParam("team");

        this.state = {
            team: team,
            isFavorite: false,
            dataProvider: dataProvider.cloneWithRows(team.games),
            layoutProvider: _ScheduleLayoutProvider
          };
    }

    rowRenderer = (type, data) => {
        let isHome = data.homeTeamId === this.state.team.id;
        let opponentId = isHome ? data.awayTeamId : data.homeTeamId;
        let opponent = this.props.teams.find(team => team.id === opponentId); 

        return <Game game={data} opponent={opponent} isHome={isHome} onAlarm={this._onAlarm}/>;
    };

    _onFavorite = () => {
        let newValue = !this.state.isFavorite;
        this.setState({isFavorite: newValue});
        let toastMessage = newValue ? "Favorite Added!" : "Favorite Removed!";
        this.refs.toast.show(
            <View>
                <Text style={{paddingRight: 10, paddingLeft: 10, backgroundColor: Colors.DARK_BLUE, color: Colors.LIGHT_TEAL}}>{toastMessage}</Text>
            </View>
            , 750);
    }

    _onAlarm = (game) => {
        this.refs.toast.show(
            <View>
                <Text style={{paddingRight: 10, paddingLeft: 10, backgroundColor: Colors.DARK_BLUE, color: Colors.LIGHT_TEAL}}>ALARM</Text>
            </View>
            , 750);
    }

    render() {
        return <View style={{flex: 1}}>
            <View style={{flex: 0, flexDirection: 'row', 
                    justifyContent: 'space-between', alignItems: 'center', 
                    width: '100%', paddingLeft: 20, paddingRight: 20,
                    borderBottomColor: Colors.DARK_BLUE, borderBottomWidth: 1}}>
                <Team team={this.state.team} flexDirection="row" imageSize={50} fontSize={18}/>
                <TouchableOpacity onPress={() => this._onFavorite()}>
                    <Icon name={this.state.isFavorite ? "heart" : "heart-o"} size={30} color={Colors.DARK_BLUE}/>
                </TouchableOpacity>
            </View>
            <RecyclerListView
              style={{ flex: 1 }}
              contentContainerStyle={{ margin: 3 }}
              //onEndReached={this.handleListEnd}
              dataProvider={this.state.dataProvider}
              layoutProvider={this.state.layoutProvider}
              rowRenderer={this.rowRenderer}
              //renderFooter={this.renderFooter}
            />
            <Toast ref="toast"/>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);