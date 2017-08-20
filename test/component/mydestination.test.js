import assert from 'power-assert';
import MyDestination from '../../src/component/mydestination';
import {myDestinationChange} from '../../src/action/mydestination';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {mountWithMUI} from "./testutil";
import React from 'react';
import ReactDOM from 'react-dom';
import {DEFAULT_MY_DESTINATION} from '../../src/const/mydestination';
import {LOGIN_STATUS} from '../../src/const/login';

/**@test {MyDestination}*/
describe("<MyDestination />",()=>{
  it("renders in_business toggle, comment and contact textboxes",()=>{
    const props = {
      dispatch:sinon.spy(),
      mydestination:DEFAULT_MY_DESTINATION,
      login:{
        status:LOGIN_STATUS.SUCCESS,
        user:{
          id:"test",
          name:"テスト",
          token:"dummy"
        }
      }
    };

    const wrapper = mountWithMUI(<MyDestination {...props} />);

    assert(wrapper.ref("in_business").find("input").length === 1);
    assert(wrapper.ref("comment").find("textarea").length === 0);
    assert(wrapper.ref("contact").find("textarea").length === 0);
  });

  it("dispatches MY_DESTINATION_CHANGE action if in_business is toggled and click submit button",()=>{
    const props = {
      dispatch:sinon.spy(),
      mydestination:DEFAULT_MY_DESTINATION,
      login:{
        status:LOGIN_STATUS.SUCCESS,
        user:{
          id:"test",
          name:"テスト",
          token:"dummy"
        }
      }
    };

    const wrapper = mountWithMUI(<MyDestination {...props} />);
//    const wrapper = shallow(<mydestination {...props} />);

    wrapper.ref("in_business").find("input").simulate("change",{target:{checked:true}});
    wrapper.ref("submit").find("button").simulate("click");

    assert(props.dispatch.called);
    assert(props.dispatch.getCall(0).args[0],myDestinationChange({
      inBusiness:!DEFAULT_MY_DESTINATION.inBusiness,
      comment:DEFAULT_MY_DESTINATION.comment,
      contact:DEFAULT_MY_DESTINATION.contact
    }));
  });

  it("dispatches MY_DESTINATION_CHANGE action if comment is changed and click submit button",()=>{
    const props = {
      dispatch:sinon.spy(),
      mydestination:DEFAULT_MY_DESTINATION,
      login:{
        status:LOGIN_STATUS.SUCCESS,
        user:{
          id:"test",
          name:"テスト",
          token:"dummy"
        }
      }
    };

    const nextComment = "EAST3F";

    const wrapper = mountWithMUI(<MyDestination {...props} />);

    wrapper.ref("comment").find("input").simulate("change",{target:{value:nextComment}});
    wrapper.ref("submit").find("button").simulate("click");

    assert(props.dispatch.called);
    assert(props.dispatch.getCall(0).args[0],myDestinationChange({
      inBusiness:DEFAULT_MY_DESTINATION.inBusiness,
      comment:nextComment,
      contact:DEFAULT_MY_DESTINATION.contact
    }));
  });

  it("dispatches MY_DESTINATION_CHANGE action if contact is changed and click submit button",()=>{
    const props = {
      dispatch:sinon.spy(),
      mydestination:DEFAULT_MY_DESTINATION,
      login:{
        status:LOGIN_STATUS.SUCCESS,
        user:{
          id:"test",
          name:"テスト",
          token:"dummy"
        }
      }
    };

    const nextContact = "090-XXXX-XXXX";

    const wrapper = mountWithMUI(<MyDestination {...props} />);

    wrapper.ref("contact").find("input").simulate("change",{target:{value:nextContact}});
    wrapper.ref("submit").find("button").simulate("click");

    assert(props.dispatch.called);
    assert(props.dispatch.getCall(0).args[0],myDestinationChange({
      inBusiness:DEFAULT_MY_DESTINATION.inBusiness,
      comment:DEFAULT_MY_DESTINATION.comment,
      contact:nextContact
    }));
  });

  it("renders values which is passed as mydestination state",()=>{
    const myDestinationState = {
      inBusiness:true,
      comment:"EAST3F",
      contact:"090-XXX-XXXX",
      suggestion:DEFAULT_MY_DESTINATION.suggestion
    };

    const props = {
      dispatch:sinon.spy(),
      mydestination:myDestinationState,
      login:{
        status:LOGIN_STATUS.SUCCESS,
        user:{
          id:"test",
          name:"テスト",
          token:"dummy"
        }
      }
    };

    const wrapper = mountWithMUI(<MyDestination {...props} />);

    assert(wrapper.ref("in_business").find("input").get(0).checked);
    assert(wrapper.ref("comment").find("input").get(0).value === myDestinationState.comment);
    assert(wrapper.ref("contact").find("input").get(0).value === myDestinationState.contact);
  });
});
