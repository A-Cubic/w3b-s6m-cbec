import React, { Fragment,Component } from 'react';
import { connect } from 'dva';
import { Button, Row, Col ,Modal } from 'antd';
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
     // dispatch(routerRedux.push('/goods/goodsAboutS')); 修改 跳转页面 改弹窗
    // console.log(1111)
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
        <TestChild />
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



//查看弹窗
@connect(({goods }) => ({
  goods,
}))
class TestChild  extends Component {

  handleCancel = () => {
    this.props.dispatch({
      type:'goods/storesSalesCloseR',
      payload:false
    })
  }
  handleOk = () => {
    this.props.dispatch({
      type:'goods/storesSalesCloseR',
      payload:false
    })
  }

  //翻页
  handleTableChange=(pagination, filters, sorter)=>{
   // const { roleOperationDistribution:{storesSales:{childDetailsModelVisible,storesSalesDetails:{item,list,pagination}}} } = this.props;
    const orderId = this.props.goods.storesSales.storesSalesDetails.item
   // console.log('qqq',this.props.roleOperationDistribution.storesSales.storesSalesDetails)
    const params = {
      ...pagination,
      
    };
    this.props.dispatch({
      type: 'goods/getUploadviewData',
      payload: {
        ...params,
        orderId:orderId
      }
    });
  }
  render(){
    
    const { goods:{Step4:{show,tableData:{item,list,pagination}}} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
     //console.log('777', this.props.roleOperationDistribution.storesSales.storesSalesDetails.item)
  
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '销售时间',
        dataIndex: 'tradeTime',
        key: 'tradeTime',
      }, {
        title: '供货商',
        dataIndex: 'supplierName',
        key: 'supplierName',
        
      },  {
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
      }, {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
      }, {
        title: '规格',
        dataIndex: 'model',
        key: 'model',
      }, {
        title: '原产地',
        dataIndex: 'country',
        key: 'country',
      }, {
        title: '生产商',
        dataIndex: 'brand',
        key: 'brand',
      }, {
        title: '销售数量',
        dataIndex: 'num',
        key: 'num',
      }, {
        title: '零售价',
        dataIndex: 'rprice',
        key: 'rprice',
      }, {
        title: '平台采购价',
        dataIndex: 'inprice',
        key: 'inprice',
      }, {
        title: '平台供货价',
        dataIndex: 'pprice',
        key: 'pprice',
      }, {
        title: '服务费',
        dataIndex: 'platformPrice',
        key: 'platformPrice',
      }
    ];

    return(
      <div>
        <Modal
          visible= {true}
          onCancel={this.handleCancel}
          width={'80%'}
          onOk={this.handleOk}
        >
         <Table dataSource={list}
            columns={columns}
            rowKey={record => record.keyId}
            pagination={paginationProps}
            onChange={this.handleTableChange}
          />

        </Modal>
      </div>
    )
  }

}

