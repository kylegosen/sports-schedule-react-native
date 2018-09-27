import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const DrawerButton = ({tintColor, navigation}) => (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon name="menu"style={{color: tintColor}} size={30}/>
    </TouchableOpacity>
)

export default DrawerButton;