import React from 'react';
import ReactDOM from 'react-dom';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {
  red600,
  grey400
} from 'material-ui/styles/colors';
import {getDestHistory} from '../action/historyboard';

/**
* メンバーごとの行き先コンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class MemberRow extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.handleMemberRow = this.handleMemberRow.bind(this);
  }
    
  /**
   * メンバーのクリックをハンドルするメソッド
   */

  handleMemberRow(){
    this.props.dispatch(getDestHistory(this.props.member.userid));
  }

  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){

    // this.props.updatedate.date //データ取得日時
    // this.props.member.lastUpdate //最終更新日 そのままでは、getTime()が使えない
    const updatedate = this.props.updatedate.date.getTime();

    const lastUpdate = new Date(
      this.props.member.lastUpdate.substr(0,4),
      this.props.member.lastUpdate.substr(5,2) - 1, //月は0～11
      this.props.member.lastUpdate.substr(8,2),
      this.props.member.lastUpdate.substr(11,2),
      this.props.member.lastUpdate.substr(14,2),
      this.props.member.lastUpdate.substr(17,2)
    ).getTime();

    const Elapsedtime = updatedate - lastUpdate;
    
    const ElapsedtimeText =
      (Math.round(Elapsedtime / 1000) <= 59) ? (Math.round(Elapsedtime / 1000) + "秒"):
      (Math.round(Elapsedtime / 1000 / 60) <= 59) ? (Math.round(Elapsedtime / 1000 / 60) + "分"):
      (Math.round(Elapsedtime / 1000 / 60 / 60) <= 23) ? (Math.round(Elapsedtime / 1000 / 60 / 60) + "時間"):
      (Math.round(Elapsedtime / 1000 / 60 / 60 / 24) <= 30) ? (Math.round(Elapsedtime / 1000 / 60 / 60 / 24) + "日"):
      (Math.round(Elapsedtime / 1000 / 60 / 60 / 24 / 31) <= 11) ? (Math.round(Elapsedtime / 1000 / 60 / 60 / 24 / 31) + "ヶ月"):
      (Math.round(Elapsedtime / 1000 / 60 / 60 / 24 / 31 / 12) + "年");

    return (
      <List>
        <ListItem
          primaryText={this.props.member.name + "：" + (this.props.member.comment == null ? "" : this.props.member.comment)}
            secondaryText={
              <p>
                {this.props.member.contact}  <br />
                {"最終更新日:" + this.props.member.lastUpdate.substr(0,16) + " (" + ElapsedtimeText + "前)"}
              </p>
            }
            secondaryTextLines={2}
//              tertiaryText={"最終更新日:" + this.props.member.lastUpdate.substr(0,16)}
          leftAvatar={<Avatar backgroundColor={this.props.member.inBusiness ? red600 : grey400} > {this.props.member.inBusiness ? "出" : "退"}</Avatar>} 
          onTouchTap={this.handleMemberRow}
          />
      </List>
    );
  }
}
