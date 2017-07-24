import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {getGroupById} from '../module/group';
import {deleteGroupRequired,changeGroupNameRequired} from '../action/group';
import {closeGroupManagementBoard} from '../action/groupboards';
import MemberAddForm from './memberaddform';
import GroupMember from './groupmember';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

/**
* グループ管理ボード コンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class GroupManagementBoard extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);

    this.state = {
      newGroupName:""
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleDeleteGroupButton = this.handleDeleteGroupButton.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleChangeNameButton = this.handleChangeNameButton.bind(this);
  }

  /**
  * キャンセルボタンのクリックをハンドリングするhandler
  * @return {undefined}
  */
  handleClose(){
    this.setState({newGroupName:""});
    this.props.dispatch(closeGroupManagementBoard());
  }

  /**
  * グループの削除ボタンのクリックをハンドリングするhandler
  */
  handleDeleteGroupButton(){
    if(confirm("削除します。よろしいですか？")){
      this.props.dispatch(deleteGroupRequired(this.props.managementBoard.groupId));
      this.setState({newGroupName:""});
      this.props.dispatch(closeGroupManagementBoard());
    }
  }

  /**
  * グループ名の変更をハンドリングするhandler
  * @param {Object} event イベント
  * @param {string} newValue 変更後の値
  * @return {undefined}
  */
  handleNameChange(event,newValue){
    this.setState({newGroupName:newValue});
  }

  /**
  * グループ名の変更ボタンのクリックをハンドリングするhandler
  * @return {undefined}
  */
  handleChangeNameButton(){
    if(this.state.newGroupName.trim().length > 0){
      this.props.dispatch(changeGroupNameRequired(
        this.props.managementBoard.groupId,
        this.state.newGroupName
      ));
    }
  }

  /**
  * 描画メソッド
  * @return {Object} JSX
  */
  render(){
    if(!this.props.managementBoard.isOpen){
      return null;
    }

    const targetGroup = getGroupById(this.props.group.allGroups,this.props.managementBoard.groupId);
    //XXX 実装としてかっこ悪い
    //グループを作成した瞬間はまだグループが読み込まれていないのでエラーになる
    //そのバグを暫定的に防衛的プログラミングで回避
    if(!targetGroup){
      return null;
    }
    const actions = [
      <RaisedButton
            label="グループを削除"
            primary={true}
            onTouchTap={this.handleDeleteGroupButton}
            ref="deleteGroupButton"
      />,
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
        ref="Close"
/>
    ];

    const groupNameText =
      this.state.newGroupName === "" ?
      targetGroup.groupname :
      this.state.newGroupName;

    const members = targetGroup.member ? targetGroup.member.map(status => status.userid)
      .map((memberId,idx) => {
        return (
          <GroupMember
            key={idx}
            dispatch={this.props.dispatch}
            memberId={memberId}
            groupId={targetGroup.id}
            isAdmin={targetGroup.admin.indexOf(memberId) >= 0}
          />
        );
      }) : [];



    return(
      <Dialog
        title={targetGroup.groupname + "を編集" }
        actions={actions}
        modal={true}
        open={this.props.managementBoard.isOpen}
        autoScrollBodyContent={true}
      >
        <div>
          <TextField
            hintText="グループ名"
            floatingLabelText="グループ名"
            value={groupNameText}
            onChange={this.handleNameChange}
            ref="groupName"
          />
          <RaisedButton
            label="変更"
            primary={true}
            onTouchTap={this.handleChangeNameButton}
            ref="changeNameButton"
          />
        </div>
        <br />
        <div>
          <MemberAddForm
            dispatch={this.props.dispatch}
            group={targetGroup}
            memberStatus={this.props.board.memberStatus}
          />
        </div>
        <br />
        <div>
          <Table>
            <TableHeader
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>ユーザーID</TableHeaderColumn>
                <TableHeaderColumn>管理者</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members}
            </TableBody>
          </Table>
        </div>

      </Dialog>
    )
  }
}
