import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form,message, Input, Button, Select,Upload, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';
import {notification} from "antd/lib/index";
import {getToken, getHeader} from "../../../utils/Global";
const userId = getToken().userId;
const token = getToken().token;
const { Option } = Select;

@Form.create()
class Step1 extends React.PureComponent {
  state={
    fileList:[],
    file:{},
    thumbUrl:'',
  }
  handleUploadChange=(info)=>{
    // console.log(info)
    this.setState({
      fileList:info.fileList,
      file:info.file,
      thumbUrl:info.file.thumbUrl
    })
  }
  onUploadCallback = (params) => {
    const msg = params.msg;
    if(params.type==="0"){
      message.error(msg);
      // notification.error({
      //   message: "提示",
      //   description: msg,
      // });
    }else {
      message.success(msg);
      // notification.success({
      //   message: "提示",
      //   description: msg,
      // });
      this.props.dispatch(routerRedux.push('/goods/step-form/confirm/'+params.id));
    }
  }
  render() {
    const { form, dispatch,submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const props = {
      action: '/llback/Upload/Temp',
      // data: {test: 123}, //传递到后台的自定义参数
      headers: getHeader(), //未封装的头信息，以满足后台对头参数的验证
      onChange: this.handleUploadChange, //回调函数通过res.filelist[i].respose获取回传的文件名
      multiple: true
    };
    const onValidateForm = () => {
      if(this.state.file!==undefined){
        this.props.dispatch({
          type: 'goods/step1Upload',
          payload: {
            userId:userId,
            fileTemp: this.state.file.response.fileName[0]
          },
          callback: this.onUploadCallback,
        });
      }else{
        message.warning('请选择需要上传的.xlsx文件')
      }
    };
    return (
      <Fragment>
        <div style={{textAlign:'center',padding:'30px',maxWidth:'400px',margin:'auto'}}>
          <Upload {...props}>
            <Button type="primary" ghost>选择商品信息文件</Button>
          </Upload>
          <Button style={{marginTop:'30px'}} type="primary" loading={submitting} onClick={onValidateForm}>
            提交入库
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default connect(({ goods,loading }) => ({
  submitting: loading.effects['goods/step1Upload'],
  data: goods.step,
}))(Step1);
