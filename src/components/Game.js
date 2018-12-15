import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Team from './Team';

import * as Colors from '../constants/colors';

class Game extends PureComponent {

    render(){
        let {game, opponent, isHome} = this.props;
        let momentObj = moment(game.startTime);

        return <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Text>{momentObj.format("ddd,")}</Text>
                <Text>{momentObj.format("MMM DD")}</Text>
            </View>
            <View style={{flex: 3, flexDirection: 'row'}}>
                <View>
                    <Text style={{paddingRight: 10}}>{isHome ? "vs" : "@"}</Text>
                </View>
                <Team team={opponent} showName={false} flexDirection="row" imageSize={25} />
            </View>
            <View style={{flex: 2}}>
                <Text>{momentObj.format("h:mm A")}</Text>
            </View>
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => this.props.onAlarm(game)}>
                    <Icon name="alarm" size={30} color={Colors.DARK_BLUE}/>
                </TouchableOpacity>
            </View>
        </View>
    }

}

export default Game;