import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';
import {getToken} from "../../../utils/Global";
const userId = getToken().userId;
class Step4 extends React.PureComponent {
  componentDidMount() {
    const {match,dispatch}=this.props;
    this.props.dispatch({
      type:'goods/checkStepStatusIn',
      payload:{
        userId:userId,
        logId:match.params.id,
        status:match.params.isSuccess=='true'?'2':'3'
      },
      callback:function () {
        if (match.params.isSuccess=="true"){
          dispatch({
            type:'goods/step4TrueSupplement',
            payload:{
              userId:userId,
              logId:match.params.id
            }
          })
        } else{
          dispatch({
            type:'goods/step4FalseSupplement',
            payload:{
              userId:userId,
              logId:match.params.id
            }
          })
        }
      }
    })
  }
  renderSuccess(){
    const { dispatch, step4supplementData } = this.props;
    const onPrev = () => {
      dispatch(routerRedux.push('/goods/putaway'));
    };
    const onValidateForm = e => {
      e.preventDefault();
      dispatch(routerRedux.push('/goods/info/list'));
    };
    return (
      <div>
        <div style={{marginBottom:10}}>
          {step4supplementData.log}
        </div>
        <div style={{marginTop:'30px'}}>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            返回
          </Button>
          <Button style={{marginLeft:8}} type="primary" onClick={onValidateForm} >
            查看商品列表
          </Button>
        </div>
      </div>
    );
  }
  renderFail(){
    const { dispatch, step4supplementData } = this.props;
    const onPrev = () => {
      dispatch(routerRedux.push('/goods/putaway'));
    };
    function download() {
      window.location.href = step4supplementData.url
    }
    return (
      <div>
        <div style={{marginBottom:10}}>
          {step4supplementData.log}
        </div>

        <div style={{marginTop:'30px'}}>

          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            返回
          </Button>
          <Button style={{marginLeft:8}} type="primary" onClick={download} >
          下载入库失败的商品信息
          </Button>
        </div>

      </div>

    );
  }
  render() {
    const { dispatch, step4supplementData } = this.props;
    const onPrev = () => {
      dispatch(routerRedux.push('/goods/putaway'));
    };
    return (
        <div style={{textAlign:'center',padding:'30px',maxWidth:'400px',margin:'auto'}}>
          { this.props.match.params.isSuccess=='true' ? this.renderSuccess() : this.renderFail()}
        </div>

    );
  }
}

export default connect(({ goods }) => ({
  step4supplementData: goods.step4supplementData,
}))(Step4);
