import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input,notification } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import baseUrl from '../../../baseUrl';
import axios from 'axios';
import { Formik } from 'formik';

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const App = ({ visible, onCancel, wordId }) => {

  const [api, contextHolder] = notification.useNotification();
  const [word, setWord] = useState({})
  const createWordSuccess = (type) => {
    api[type]({
        message: 'Kelime',
        description:
            'Kelime düzenlendi.',
    });
};
const createWordWarning = (type) => {
    api[type]({
        message: 'Kategori',
        description:
            'Kelime düzenlenemedi.',
    });
  };
  useEffect(()=>{
    if(wordId){
    axios.get(baseUrl+`word/${wordId}`).then((res)=>{
      setWord(res.data[0])
    }).catch(e=>console.log(e));
  }
  },[])

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    const data = new FormData();
    data.append('word', values.word);
    data.append('answer', values.answer);
  
    if (wordId) {
      axios
        .post(baseUrl + `word/${wordId}`, data)
        .then((res) => {
          createWordSuccess('success');
          resetForm({});
          setSubmitting(false); 
        })
        .catch((e) => createWordWarning('error'));
    } else {
      axios
        .post(baseUrl + `word`, data)
        .then((res) => {
          createWordSuccess('success');
          resetForm({});
          setSubmitting(false);
        })
        .catch((e) => createWordWarning('error'));
    }
  };

  return (
    <Modal
      centered
      title={wordId ? 'Kelime Düzenle':'Kelime Ekle'}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      {contextHolder}
      <Formik
      enableReinitialize
      initialValues={{ word: word.word, answer: word.answer }}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
      <Form
        name="dynamic_form_item"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="İngilizce"
          name="word"
          style={{ width:325 }}
          rules={[{ required: true, message: 'Lütfen doldurun!' }]}
        >
          <Input name="word" value={values.word} onChange={handleChange('word')} />
        </Form.Item>
        <Form.Item
          label="Türkçe"
          name="answer"
          style={{ width:325 }}
          rules={[{ required: true, message: 'Lütfen doldurun!' }]}
        >
          <Input name="answer" value={values.answer} onChange={handleChange('answer')} />
        </Form.Item>
        <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 20, offset: 4 } }}>
          {wordId ?
          <Button  type="primary" htmlType="submit"> Güncelle</Button> :  <Button onClick={handleSubmit} type="primary" htmlType="submit"> Ekle</Button>
        }  
        </Form.Item>
      </Form>
            )}
            </Formik>
    </Modal>
  );
};

export default App;
