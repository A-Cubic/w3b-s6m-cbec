import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

class Step4 extends React.PureComponent {
  state={
    num1:'150',
    success:false
  }
  constructor(props){
    super(props)
    this.setState({
      success:props.match.params.isSuccess
    })
  }
  renderSuccess(){
    const { dispatch, data } = this.props;
    const onPrev = () => {
      dispatch(routerRedux.push('/goods/putaway'));
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/submitStepForm',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };
    return (

      <div>
        <div style={{marginBottom:10}}>
          恭喜您！<br/>
          您共上传了{`${this.state.num1}`}个SKU，已审核成功。
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
    const { dispatch, data } = this.props;
    const onPrev = () => {
      dispatch(routerRedux.push('/goods/putaway'));
    };
    function download() {
      console.log('下载')
    }
    return (

      <div>
        <div style={{marginBottom:10}}>
          您共上传了{`${this.state.num1}`}个SKU，其中30个SKU已成功入库，<br/>
          5个SKU未成功入库的原因是：商品条码有误，请核对后重新上传。
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
    console.log('1',this.props)

    const { dispatch, data } = this.props;
    const onPrev = () => {
      dispatch(routerRedux.push('/goods/putaway'));
    };
    return (
        <div style={{textAlign:'center',padding:'30px',maxWidth:'400px',margin:'auto'}}>
          { this.state.success ? this.renderSuccess() : this.renderFail()}
        </div>

    );
  }
}

export default connect(({ goods }) => ({
  data: goods.step,
}))(Step4);
