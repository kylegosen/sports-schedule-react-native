import React, {PureComponent} from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';

import ImagesMap from '../images/ImageMap';


class Team extends PureComponent {
    render(){
        let team = this.props.team;
        let imgSrc = ImagesMap[`${team.image}`];

        let showName = this.props.showName !== undefined ? this.props.showName : true;
        let flexDirection = this.props.flexDirection || 'column';
        let rowPadding = flexDirection === 'row' ? 5 : 0;
        let imageSize = this.props.imageSize || 75;
        let fontSize = this.props.fontSize || 14;
        
        return (
            <TouchableOpacity onPress={() => this.props.onClick && this.props.onClick(team)}>
                <View style={{flex: 0, flexDirection: flexDirection, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={imgSrc} style={{width: imageSize, height: imageSize}}/>
                    <Text style={{textAlign: 'center', fontSize: fontSize, paddingLeft: rowPadding, paddingRight: rowPadding}}>{team.city}</Text>
                    {showName && <Text style={{textAlign: 'center', fontSize: fontSize}}>{team.name}</Text>}
                </View>
            </TouchableOpacity>
        )
    }
}

export default Team;