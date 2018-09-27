import React from 'react';
import { createDrawerNavigator, createStackNavigator } from "react-navigation";

import SideMenu from '../containers/SideMenu';
import Favorites from '../containers/Favorites';
import Leagues from '../containers/Leagues';
import Schedule from '../containers/Schedule';
import Settings from '../containers/Settings';

import * as Colors from '../constants/colors';

const FavoritesNavigator = createStackNavigator(
    {
      Favorites: Favorites,
      Leagues: Leagues,
      Schedule: Schedule
    },
    {
      initialRouteName: 'Favorites',
      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: Colors.DARK_BLUE
        },
        headerTintColor: Colors.LIGHT_TEAL, // Color of Back Button and Title
        headerTitleStyle: {
          
        }
      })
    }
);

const DrawerNavigator = createDrawerNavigator(
    {
      Favorites: { screen: FavoritesNavigator },
      Settings: { screen: Settings }
    },
    {
      initialRouteName: "Favorites",
      contentComponent: props => <SideMenu {...props} />,
    }
);

export default DrawerNavigator;