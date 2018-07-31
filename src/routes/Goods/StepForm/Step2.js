import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button,Upload, Alert, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import { digitUppercase } from '../../../utils/utils';
import styles from './style.less';

import {message, notification} from "antd/lib/index";
import {getToken, getHeader} from "../../../utils/Global";
import { getUploadUrl } from "../../../services/api"
const userId = getToken().userId;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step2 extends React.PureComponent {
  state={
    fileList1:[],
    fileList2:[],
    file1:{},
    file2:{},
    thumbUrl1:'',
    thumbUrl2:'',
  }
  componentDidMount() {
    const {match,dispatch}=this.props;
    this.props.dispatch({
      type:'goods/checkStepStatusIn',
      payload:{
        userId:userId,
        logId:match.params.id,
        status:'0'
      },
      callback:function () {
        // console.log(this.props.match)
        dispatch({
          type:'goods/step2supplement',
          payload:{
            userId:userId,
            logId:match.params.id
          }
        })
      }
    })
  }
  downloadSKU=()=>{
    const {step2supplementData}=this.props;
    window.location.href=step2supplementData.url;
  }
  handleUploadChange=(info)=>{
    this.setState({
      fileList1:info.fileList,
      file1:info.file,
      thumbUrl1:info.file.thumbUrl
    })
  }
  handleUploadChange2=(info)=>{
    this.setState({
      fileList2:info.fileList,
      file2:info.file,
      thumbUrl2:info.file.thumbUrl
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
      this.props.dispatch(routerRedux.push('/goods/step-form/wait/'+params.id));
    }
  }
  render() {
    const { form, data, dispatch, submitting,step2supplementData } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const props = {
      action: getUploadUrl(),
      // data: {test: 123}, //传递到后台的自定义参数
      headers: getHeader(), //未封装的头信息，以满足后台对头参数的验证
      onChange: this.handleUploadChange, //回调函数通过res.filelist[i].respose获取回传的文件名
      multiple: false
    };

    const props2 = {
      action: getUploadUrl(),
      // data: {test: 123}, //传递到后台的自定义参数
      headers: getHeader(), //未封装的头信息，以满足后台对头参数的验证
      onChange: this.handleUploadChange2, //回调函数通过res.filelist[i].respose获取回传的文件名
      multiple: false,
      accept: "image/*"
    };
    const onPrev = () => {
      dispatch(routerRedux.push('/goods/putaway'));
    };
    const onValidateForm = e => {
      e.preventDefault();
      if(this.state.file1.response!==undefined||this.state.file2.response!==undefined){
        this.props.dispatch({
          type: 'goods/step2Upload',
          payload: {
            userId:userId,
            fileTemp: this.state.file1.response?this.state.file1.response.fileName[0]:'',
            fileTemp1: this.state.file2.response?this.state.file2.response.fileName[0]:''
          },
          callback: this.onUploadCallback,
        });
      }else{
        message.warning('请选择需要上传的文件')
      }

      // validateFields((err, values) => {
      //   if (!err) {
      //     // dispatch({
      //     //   type: 'form/submitStepForm',
      //     //   payload: {
      //     //     ...data,
      //     //     ...values,
      //     //   },
      //     // });
      //     dispatch(routerRedux.push('/goods/step-form/wait'));
      //   }
      // });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <div style={{textAlign:'center',padding:'30px',maxWidth:'800px',margin:'auto'}}>
          <div style={{marginBottom:10}}>
            {step2supplementData.log}
          </div>
          <Button style={{ marginBottom:10 }} type="primary" ghost onClick={this.downloadSKU}>下载需上传图片的SKU商品信息模板</Button>
          {/*<Button style={{ marginBottom: 10,marginLeft:8 }} type="primary" ghost onClick={this.downloadGoodsTemp}>下载商品信息模板</Button><br/>*/}
          <div style={{display:'inline-flex'}}>
            <Upload {...props2}>
              <Button style={{marginBottom:10}} type="primary" ghost>上传商品信息</Button>
            </Upload>
            <Upload {...props} style={{marginLeft:8}}>
              <Button style={{marginBottom:10}} type="primary" ghost>上传商品图片Zip文件</Button>
            </Upload>
          </div>

          <div style={{marginTop:'30px'}}>
            <Button type="primary" onClick={onValidateForm} loading={submitting}>
              提交入库
            </Button>
            <Button onClick={onPrev} style={{ marginLeft: 8 }}>
              上一步
            </Button>
          </div>

        </div>
      </Form>
    );
  }
}

export default connect(({ goods, loading }) => ({
  submitting: loading.effects['goods/step2Upload'],
  step2supplementData: goods.step2supplementData,
}))(Step2);
