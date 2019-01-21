import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Select, Row, Col, Popover, Progress,Steps,notification,Upload,Icon ,message  } from 'antd';
import styles from './Register.less';
import {getAuthority, getHeader} from '../../utils/Global';
import {getCurrentUrl, getUploadUrl} from '../../services/api'

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const Step = Steps.Step;
var temUploadKey = '';
@connect(({ registerVerify, loading }) => ({
  registerVerify,
  submitting: loading.effects['registerVerify/upload'],
}))
@Form.create()
export default class RegisterVerify extends Component {
	state = {
    fileList1:[],
    fileList2:[],
    fileList3:[],
    fileList4:[],
    file1:{},
    file2:{},
    file3:{},
    file4:{},
    thumbUrl1:'',
    thumbUrl2:'',
    thumbUrl3:'',
    thumbUrl4:'',
	};
	renderStep = (currentStep) => {
	  const { form, submitting } = this.props;
	  const { getFieldDecorator,getFieldsValue,validateFields,setFields } = form;
	  // const { count, prefix } = this.state;

	   const formItemLayout = {
	    labelCol: {
	      xs: { span: 24 },
	      sm: { span: 8 },
	    },
	    wrapperCol: {
	      xs: { span: 24 },
	      sm: { span: 16 },
	    },
	  };
	   const url = getCurrentUrl('/llback/user/validate');
	  // const props = {
	  //     action: url,
	  //     listType: 'picture',
       //  accept:'image/*',
	  //     onChange({ file, fileList }) {
	  //         if (file.status !== 'uploading') {
	  //           // console.log(fileList);
	  //         }
	  //       }
	  //   };
    const propsImg1 = {
      action: getUploadUrl(),
      // data: {test: 123}, //传递到后台的自定义参数
      headers: getHeader(), //未封装的头信息，以满足后台对头参数的验证
      onChange: this.handleUploadChangeImg1, //回调函数通过res.filelist[i].respose获取回传的文件名
      multiple: false
    };

    const propsImg2 = {
      action: getUploadUrl(),
      // data: {test: 123}, //传递到后台的自定义参数
      headers: getHeader(), //未封装的头信息，以满足后台对头参数的验证
      onChange: this.handleUploadChangeImg2, //回调函数通过res.filelist[i].respose获取回传的文件名
      multiple: false,
    };
    const propsImg3 = {
      action: getUploadUrl(),
      // data: {test: 123}, //传递到后台的自定义参数
      headers: getHeader(), //未封装的头信息，以满足后台对头参数的验证
      onChange: this.handleUploadChangeImg3, //回调函数通过res.filelist[i].respose获取回传的文件名
      multiple: false,
    };
    const propsImg4 = {
      action: getUploadUrl(),
      // data: {test: 123}, //传递到后台的自定义参数
      headers: getHeader(), //未封装的头信息，以满足后台对头参数的验证
      onChange: this.handleUploadChangeImg4, //回调函数通过res.filelist[i].respose获取回传的文件名
      multiple: false,
    };
  const cusUpload = (e)=>{
    temUploadKey = e.target.id;
  }
	  switch(currentStep){
	    case 1 :
	        return(
	           <Form onSubmit={this.handleVerify}>
	                  <FormItem
	                    {...formItemLayout}
	                    label='公司名称'>
	                    {getFieldDecorator('companyName', {
	                      rules: [
	                        {
	                          required: true,
	                          message: '请输入公司名称！',
	                        }
	                      ]
	                    })(<Input size="large" placeholder="请填写与营业执照一致的公司名称" />)}
	                  </FormItem>
	                 <FormItem
	                    {...formItemLayout}
	                    label='联系人'>
	                    {getFieldDecorator('linkman', {
	                      rules: [
	                        {
	                          required: true,
	                          message: '请输入联系人！',
	                        }
	                      ]
	                    })(<Input size="large" placeholder="联系人姓名" />)}
	                  </FormItem>
	                  <FormItem
	                    {...formItemLayout}
	                    label='联系人电话'>
	                    {getFieldDecorator('linkmanphone', {
	                      rules: [
	                        {
	                          required: true,
	                          message: '请输入联系人电话！',
	                        }
	                      ]
	                    })(<Input size="large" placeholder="联系人手机号码" />)}
	                  </FormItem>
	                   <FormItem
	                    {...formItemLayout}
	                    label='邮箱'>
	                    {getFieldDecorator('email', {
	                      rules: [
	                        {
	                          required: true,
	                          message: '请输入联系人邮箱！',
	                        },{
	                          type:'email',
                            message: '请输入正确的邮箱！',
	                        }
	                      ]
	                    })(<Input size="large" placeholder="联系人常用邮箱且能正常收发邮件" />)}
	                  </FormItem>
                   <FormItem
                     {...formItemLayout}
                     label='网店/网站的链接'>
                     {getFieldDecorator('website', {
                       rules: [
                         {
                           required: false,
                           message: '请输入网店或网站的链接！',
                         }
                       ]
                     })(<Input size="large" placeholder="分销商需要输入网店或网站的链接" />)}
                   </FormItem>
	                   <FormItem
	                    {...formItemLayout}
	                    label='资质上传'>
	                    {getFieldDecorator('certification', {
	                      rules: [
	                        {
	                          required: true,
	                          message: '请上传资质照片！',
	                        }
	                      ]
	                    })(
	                      <div>
	                      <Row style={{marginBottom:'20px'}}>
	                        <Col span={12}>
	                           <FormItem
	                             {...formItemLayout}>
	                             {getFieldDecorator('img1')(
	                             	<Upload {...propsImg1}  >
	                             	    <Button>
	                             	      <Icon type="upload"/> 营业执照/销售端截图
	                             	    </Button>
	                             	  </Upload>
	                             	)}
	                           </FormItem>
	                        </Col>
	                        <Col span={12}>
	                           <FormItem
	                             {...formItemLayout}>
	                             {getFieldDecorator('img2')(
	                             	<Upload {...propsImg2} >
	                             	    <Button>
	                             	      <Icon type="upload" /> 组织机构代码
	                             	    </Button>
	                             	  </Upload>
	                             	)}
	                           </FormItem>
	                        </Col>
	                      </Row>
	                      <Row style={{marginBottom:'20px'}}>
	                        <Col span={12}>
	                           <FormItem
	                             {...formItemLayout}>
	                             {getFieldDecorator('img3')(
	                             	<Upload {...propsImg3} >
	                             	    <Button>
	                             	      <Icon type="upload"/> 税务登记证
	                             	    </Button>
	                             	  </Upload>
	                             	)}
	                           </FormItem>
	                        </Col>
	                        <Col span={12}>
	                           <FormItem
	                             {...formItemLayout}>
	                             {getFieldDecorator('img4')(
	                             	<Upload {...propsImg4} >
	                             	    <Button>
	                             	      <Icon type="upload" /> 营业执照（三证合一）
	                             	    </Button>
	                             	  </Upload>
	                             	)}
	                           </FormItem>
	                        </Col>
	                      </Row>
	                      <Row className={styles.uploadNote}>
	                        中国境内供应商请提交营业执照（三证合一）或者营业执照+组织结构代码+税务登记证。<br/>
	                        中国境内外供应商请提交营业执照。<br/>
	                        分销商用户请提交销售端截图（比如淘宝店，京东店）。<br/>
                          **只支持jpeg,jpg,gif,png格式的图片文件
	                      </Row>
	                      </div>
	                    )}
	                  </FormItem>
	                  <FormItem
	                   {...formItemLayout}
	                    label =' '
	                    colon={false}>
	                    <Button
	                      size="large"
	                      loading={submitting}
	                      className={styles.verifybtn}
	                      type="primary"
	                      htmlType="submit"
	                    >
	                      提交认证
	                    </Button>
	                  </FormItem>
	                </Form>
	          );
	      break;
	    case 2 :
	          return(
	            <div className={styles.verify}>
	              <h2>审核中</h2>
	              <p>认证已提交成功，正在审核中...</p>
	              <p>审核通过后，您会收到短信提示和邮件通知。</p>
	              <p>请稍后，谢谢！</p>
	              {/*<Button size="large"*/}
	                      {/*loading={submitting}*/}
	                      {/*className={styles.step3btn}*/}
	                      {/*type="primary"*/}
	                      {/*>确定</Button>*/}
                <Link className={styles.font20} to={`/user/login`}>确定</Link>
	            </div>
	            );
	          break;
	  }
	}
  handleUploadChangeImg1=(info)=>{
    this.setState({
      fileList1:info.fileList,
      file1:info.file,
      thumbUrl1:info.file.thumbUrl
    })
  }
  handleUploadChangeImg2=(info)=>{
    this.setState({
      fileList2:info.fileList,
      file2:info.file,
      thumbUrl2:info.file.thumbUrl
    })
  }
  handleUploadChangeImg3=(info)=>{
    this.setState({
      fileList3:info.fileList,
      file3:info.file,
      thumbUrl3:info.file.thumbUrl
    })
  }
  handleUploadChangeImg4=(info)=>{
    this.setState({
      fileList4:info.fileList,
      file4:info.file,
      thumbUrl4:info.file.thumbUrl
    })
  }
  beforeUpload(file) {
    const isJPG = file.type;
    let bolImg = true;
    if (isJPG !=='image/jpg' && isJPG !=='image/jpeg'&& isJPG !=='image/png') {
      message.error('只允许上传图片!');
      bolImg= false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不得超过 2MB!');
    }
    return bolImg && isLt2M;
  }

	handleVerify = (e) => {
    // if(this.state.file1.response!==undefined||this.state.file2.response!==undefined){
    //   this.props.dispatch({
    //     type: 'goods/step2Upload',
    //     payload: {
    //       logId:match.params.id,
    //       userId:userId,
    //       fileTemp: this.state.file1.response?this.state.file1.response.fileName[0]:'',
    //       fileTemp1: this.state.file2.response?this.state.file2.response.fileName[0]:''
    //     },
    //     callback:(res)=> this.onUploadCallback(res, match.params.id),
    //   });
    // }else{
    //   message.warning('请选择需要上传的文件')
    // }


	    e.preventDefault();
	    this.props.form.validateFields({ force: true }, (err, values) => {
	    	// console.log(values);
	      // const img1Vaule = values.img1 !== undefined ? values.img1.file.thumbUrl : '';
	      // const img2Vaule = values.img2 !== undefined ? values.img2.file.thumbUrl : '';
	      // const img3Vaule = values.img3 !== undefined ? values.img3.file.thumbUrl : '';
	      // const img4Vaule = values.img4 !== undefined ? values.img4.file.thumbUrl : '';

	      if (!err) {

	      	var data = {
	      		...values,
	      		img1 : this.state.file1.response?this.state.file1.response.fileName[0]:'',
	      		img2 : this.state.file2.response?this.state.file2.response.fileName[0]:'',
	      		img3 : this.state.file3.response?this.state.file3.response.fileName[0]:'',
	      		img4 : this.state.file4.response?this.state.file4.response.fileName[0]:'',
	      	};
	         this.props.dispatch({
	          type: 'registerVerify/upload',
	          payload: {
	            ...data,
	          },
	          callback: this.onUploadCallback,
	        });
	      }
	    });
	  }

  onUploadCallback = (params) => {
    const msg = params.msg;
    if(params.type==="0"){
      notification.error({
        message: "提示",
        description: msg,
      });
    }else {
      notification.success({
        message: "提示",
        description: msg,
      });
    }
  }
  	componentWillMount(){
  		//获取注册用户状态接口（用于判断跳转到第几步）
      const auth = getAuthority();
      if (auth !== 'unaudited-s' && auth !== 'unaudited-p') {
        this.props.dispatch(routerRedux.push('/user/login'));
      } else {
        this.props.dispatch({
          type: 'registerVerify/status',
          payload: {},
        });
      }
  	}
  	// setStep(step){
  	// 	const verifycode = step.verifycode*1;
      //
  	// 	var stepc;
  	// 	if (verifycode == 2) {
       //  stepc = 1
  	// 	}else if (verifycode == 3 || verifycode == -1) {
       //  stepc = 2
  	// 	}
		//   this.props.setState({
		// 	  currentStep : stepc
		//   });
  	// }
	render() {
    const { registerVerify: { currentStep } } = this.props;
    return (
      <div>
        <Steps current={currentStep} className={styles.steps}>
          <Step title="注册账号"/>
          <Step title="认证提交"/>
          <Step title="审核认证"/>
        </Steps>
        <div className={styles.main}>
          {this.renderStep(currentStep)}
      </div>
      </div>

    );
  }
}
