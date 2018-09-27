import React, {PureComponent} from 'react';
import { RecyclerListView, LayoutProvider, DataProvider } from 'recyclerlistview';
import { Dimensions } from 'react-native';
import Team from './Team';

const _LeagueLayoutProvider = new LayoutProvider(
    () => {
      return 'TEAM';
    },
    (type, dim) => {
      switch (type) {
        case 'TEAM':
          dim.width = (Math.round(Dimensions.get('window').width * 1000) / 1000 - 6) / 3;
          dim.height = 150;
          break;
        default:
          dim.width = 0;
          dim.heigh = 0;
      }
    }
);

class League extends PureComponent {
    constructor(props){
        super(props);

        let filteredTeams = props.teams.filter(team => team.leagueId === props.leagueId);

        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

        this.state = {
            leagueId: props.leagueId,
            teams: filteredTeams,
            dataProvider: dataProvider.cloneWithRows(filteredTeams),
            layoutProvider: _LeagueLayoutProvider
          };
    }

    _onClickTeam = (team) => {
        this.props.onClickTeam(team);
    }

    rowRenderer = (type, data) => {
        return <Team team={data} onClick={this._onClickTeam}/>;
    };

    render(){
        return (
            <RecyclerListView
              style={{ flex: 1 }}
              contentContainerStyle={{ margin: 3 }}
              //onEndReached={this.handleListEnd}
              dataProvider={this.state.dataProvider}
              layoutProvider={this.state.layoutProvider}
              rowRenderer={this.rowRenderer}
              //renderFooter={this.renderFooter}
            />
        )
    }
}

export default League;