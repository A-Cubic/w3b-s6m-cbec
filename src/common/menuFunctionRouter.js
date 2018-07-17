export default function(dynamicWrapper,app){
  return {
    '/orderManagement/supplierOrder': {
      // name: '分步表单（完成）',
      component: dynamicWrapper(app, ['orderManagement'], () => import('../routes/OrderManagement/supplierOrder')),
    },
  };
};
