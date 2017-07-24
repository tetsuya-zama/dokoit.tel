import {fork} from 'redux-saga/effects'
import {loginSaga,logoutSaga,loginFailureSaga,loginFromRememberMeSaga} from './login'
import {signupSaga} from './signup'
import {loadDestinationSaga,changeDestinationSaga} from './mydestination'
import {loadMemberStatusSaga,watchMemberStatusSaga} from './board'
import {changeAccountInfoSaga} from './accountboard'
import {loadSuggestionSaga,changeSuggestionSaga} from './suggestion'
import {groupSaga} from './group'
import {updateDateSaga} from './updatedate';
import {secretQuestionSaga} from './secretquestion';
import {noticeSaveCompleteSaga} from './notice';
import {destinationHistorySaga} from './historyboard';

/**
* Sagaの起点ポイント。ここから各Sagaをforkする
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export default function* rootSaga(){
  yield fork(loginSaga);
  yield fork(signupSaga);
  yield fork(logoutSaga);
  yield fork(loginFailureSaga);
  yield fork(loginFromRememberMeSaga);
  yield fork(loadDestinationSaga);
  yield fork(changeDestinationSaga);
  yield fork(loadMemberStatusSaga);
  yield fork(changeAccountInfoSaga);
  yield fork(loadSuggestionSaga);
  yield fork(changeSuggestionSaga);
  yield fork(watchMemberStatusSaga);
  yield fork(groupSaga);
  yield fork(updateDateSaga);
  yield fork(secretQuestionSaga);
  yield fork(noticeSaveCompleteSaga);
  yield fork(destinationHistorySaga);

}
