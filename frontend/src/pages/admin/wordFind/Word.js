import React, { useRef, useState,useEffect } from 'react';
import { SearchOutlined,PlusOutlined,DeleteOutlined,EditOutlined  } from '@ant-design/icons';
import { Button, Input, Space, Table, FloatButton,Popconfirm,message } from 'antd';
import Modal from "./Modal";
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import baseUrl from '../../../baseUrl'

const App = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [word, setWord] = useState([]);
  const [refresh, setRefresh]=useState(false)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const openModal = (id) => {
    setSelectedId(id);
    setOpen(true);
};
useEffect(()=>{
  axios.get(baseUrl+`word`).then((res)=>{
    setWord(res.data)
  }).catch(e=>console.log(e));
},[])
const closeModal = () => {
    setSelectedId(null);
    setRefresh([...word],true)
    setOpen(false);
};
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'İngilizcesi',
      dataIndex: 'word',
      key: 'word',
      width: '30%',
      ...getColumnSearchProps('word'),
      sorter: (a, b) => a.word.length - b.word.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Türkçesi',
      dataIndex: 'answer',
      key: 'answer',
      width: '20%',
      ...getColumnSearchProps('answer'),
      sorter: (a, b) => a.answer.length - b.answer.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      dataIndex: '',
      render: (_, record) => (
        <Space size="middle">
            <a onClick={() => openModal(2)}><EditOutlined  style={{color:"orange"}} /></a>
            <Popconfirm
                title="Kategori"
                description="Silmek istediğinize emin misiniz?"
                onConfirm={() => deleteWord(record.id)}
                okText="Evet"
                cancelText="Hayır"
            >
                <a><DeleteOutlined  style={{color:"red"}} /></a>
            </Popconfirm>

        </Space>
    ),
    },
  ];
  const deleteWord = (item) => {
    if(item){

        axios.post(baseUrl+`word-delete/${item}`,{
            headers: {
                Authorization: 'Bearer ' + props
            }
        }).then((res)=>{
            if (item){
                message.success('Silme işilemi başarılı.');
                setRefresh([...word],true)
            } else{
                message.warning('Silme işilemi başarısız.');
            }
        }).catch( e => console.log(e))
    }
}
  return(
    <> 
    <Modal visible={open} onCancel={closeModal} wordId={selectedId} />
    <FloatButton
      onClick={() => openModal()}
      shape="circle"
      type="primary"
      style={{
        right: 94,
      }}
      icon={<PlusOutlined />}
    />
    <Table columns={columns} dataSource={word} />
    </>
  ) 
};
export default App;