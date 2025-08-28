import React, { useState, useEffect } from 'react';
import {
  Table,
  Input,
  Button,
  Space,
  Modal,
  Form,
  message,
  Popconfirm,
  Card,
  Row,
  Col,
  Typography,
  Divider
} from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CarOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;
const { Search } = Input;

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [form] = Form.useForm();

  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Mock data for demonstration (replace with actual API calls)
  const mockCars = [
    { id: 1, name: 'Tesla', model: 'Model S', year: 2023, color: 'Red', price: 89990 },
    { id: 2, name: 'BMW', model: 'X5', year: 2022, color: 'Black', price: 65000 },
    { id: 3, name: 'Audi', model: 'A4', year: 2023, color: 'White', price: 45000 },
    { id: 4, name: 'Mercedes', model: 'C-Class', year: 2022, color: 'Silver', price: 55000 },
    { id: 5, name: 'Toyota', model: 'Camry', year: 2023, color: 'Blue', price: 28000 },
    { id: 6, name: 'Honda', model: 'Accord', year: 2022, color: 'Gray', price: 32000 },
    { id: 7, name: 'Ford', model: 'Mustang', year: 2023, color: 'Yellow', price: 42000 },
    { id: 8, name: 'Chevrolet', model: 'Camaro', year: 2022, color: 'Green', price: 38000 },
    { id: 9, name: 'Nissan', model: 'Altima', year: 2023, color: 'Purple', price: 26000 },
    { id: 10, name: 'Hyundai', model: 'Sonata', year: 2022, color: 'Orange', price: 24000 },
    { id: 11, name: 'Volkswagen', model: 'Passat', year: 2023, color: 'Brown', price: 29000 },
    { id: 12, name: 'Subaru', model: 'Legacy', year: 2022, color: 'Pink', price: 27000 },
    { id: 13, name: 'Mazda', model: 'CX-5', year: 2023, color: 'Blue', price: 31000 },
    { id: 14, name: 'Lexus', model: 'RX', year: 2022, color: 'White', price: 52000 },
    { id: 15, name: 'Infiniti', model: 'Q50', year: 2023, color: 'Black', price: 41000 },
    { id: 16, name: 'Acura', model: 'TLX', year: 2022, color: 'Silver', price: 38000 },
    { id: 17, name: 'Cadillac', model: 'XT5', year: 2023, color: 'Red', price: 48000 },
    { id: 18, name: 'Lincoln', model: 'MKZ', year: 2022, color: 'Gray', price: 39000 },
    { id: 19, name: 'Genesis', model: 'G90', year: 2023, color: 'Blue', price: 73000 },
    { id: 20, name: 'Volvo', model: 'XC60', year: 2022, color: 'White', price: 44000 },
  ];

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      // const response = await axios.get('/api/cars');
      // setCars(response.data);
      
      // Using mock data for demonstration
      setCars(mockCars);
      setFilteredCars(mockCars);
      setPagination(prev => ({ ...prev, total: mockCars.length }));
    } catch (error) {
      message.error('Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = cars.filter(car =>
      car.name.toLowerCase().includes(value.toLowerCase()) ||
      car.model.toLowerCase().includes(value.toLowerCase()) ||
      car.color.toLowerCase().includes(value.toLowerCase()) ||
      car.year.toString().includes(value)
    );
    setFilteredCars(filtered);
    setPagination(prev => ({ ...prev, current: 1, total: filtered.length }));
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    form.setFieldsValue(car);
    setIsModalVisible(true);
  };

  const handleDelete = async (carId) => {
    try {
      // Replace with actual API call
      // await axios.delete(`/api/cars/${carId}`);
      
      const updatedCars = cars.filter(car => car.id !== carId);
      setCars(updatedCars);
      setFilteredCars(updatedCars.filter(car =>
        car.name.toLowerCase().includes(searchText.toLowerCase()) ||
        car.model.toLowerCase().includes(searchText.toLowerCase()) ||
        car.color.toLowerCase().includes(searchText.toLowerCase()) ||
        car.year.toString().includes(searchText)
      ));
      setPagination(prev => ({ ...prev, total: updatedCars.length }));
      message.success('Car deleted successfully');
    } catch (error) {
      message.error('Failed to delete car');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingCar) {
        // Update existing car
        const updatedCars = cars.map(car =>
          car.id === editingCar.id ? { ...car, ...values, year: parseInt(values.year), price: parseFloat(values.price) } : car
        );
        setCars(updatedCars);
        setFilteredCars(updatedCars.filter(car =>
          car.name.toLowerCase().includes(searchText.toLowerCase()) ||
          car.model.toLowerCase().includes(searchText.toLowerCase()) ||
          car.color.toLowerCase().includes(searchText.toLowerCase()) ||
          car.year.toString().includes(searchText)
        ));
        message.success('Car updated successfully');
      } else {
        // Add new car
        const newCar = {
          id: Math.max(...cars.map(c => c.id)) + 1,
          ...values,
          year: parseInt(values.year),
          price: parseFloat(values.price)
        };
        const updatedCars = [...cars, newCar];
        setCars(updatedCars);
        setFilteredCars(updatedCars.filter(car =>
          car.name.toLowerCase().includes(searchText.toLowerCase()) ||
          car.model.toLowerCase().includes(searchText.toLowerCase()) ||
          car.color.toLowerCase().includes(searchText.toLowerCase()) ||
          car.year.toString().includes(searchText)
        ));
        setPagination(prev => ({ ...prev, total: updatedCars.length }));
        message.success('Car added successfully');
      }
      
      setIsModalVisible(false);
      setEditingCar(null);
      form.resetFields();
    } catch (error) {
      message.error('Please fill in all required fields');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingCar(null);
    form.resetFields();
  };

  const handleAddNew = () => {
    setEditingCar(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <strong style={{ color: '#1890ff' }}>{text}</strong>,
      width: 120,
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
      sorter: (a, b) => a.model.localeCompare(b.model),
      width: 120,
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => a.year - b.year,
      responsive: ['md'],
      width: 80,
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      render: (color) => (
        <Space>
          <span style={{ 
            display: 'inline-block',
            width: '16px',
            height: '16px',
            backgroundColor: color.toLowerCase(),
            borderRadius: '50%',
            border: '2px solid #d9d9d9',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
          }} />
          <span>{color}</span>
        </Space>
      ),
      responsive: ['lg'],
      width: 120,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price) => (
        <span style={{ fontWeight: 'bold', color: '#52c41a' }}>
          ${price.toLocaleString()}
        </span>
      ),
      responsive: ['sm'],
      width: 120,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
            style={{ backgroundColor: '#1890ff' }}
          />
          <Popconfirm
            title="Delete Car"
            description="Are you sure you want to delete this car?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Card style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col xs={24} sm={12}>
            <Title level={2} style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
              <CarOutlined style={{ marginRight: '12px', color: '#1890ff', fontSize: '28px' }} />
              Cars Directory
            </Title>
            <p style={{ margin: '8px 0 0 40px', color: '#666' }}>
              Manage your car inventory with ease
            </p>
          </Col>
          <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddNew}
              size="large"
              style={{ 
                backgroundColor: '#52c41a',
                borderColor: '#52c41a',
                boxShadow: '0 2px 8px rgba(82, 196, 26, 0.3)'
              }}
            >
              Add New Car
            </Button>
          </Col>
        </Row>
        
        <Divider />
        
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} md={12}>
            <Search
              placeholder="Search by name, model, color, or year..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              onChange={(e) => {
                if (!e.target.value) {
                  handleSearch('');
                }
              }}
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            />
          </Col>
          <Col xs={24} md={12}>
            <div style={{ textAlign: 'right', paddingTop: '8px' }}>
              <span style={{ color: '#666', fontSize: '14px' }}>
                Total: <strong>{filteredCars.length}</strong> cars
              </span>
            </div>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredCars}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} cars`,
            onChange: (page, pageSize) => {
              setPagination(prev => ({ ...prev, current: page, pageSize }));
            },
            onShowSizeChange: (current, size) => {
              setPagination(prev => ({ ...prev, current: 1, pageSize: size }));
            },
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          scroll={{ x: 800 }}
          size="middle"
          style={{ backgroundColor: 'white' }}
          rowClassName={(record, index) => 
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }
        />
      </Card>

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CarOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            {editingCar ? 'Edit Car' : 'Add New Car'}
          </div>
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        destroyOnClose
        okText={editingCar ? 'Update Car' : 'Add Car'}
        cancelText="Cancel"
        okButtonProps={{
          style: { backgroundColor: '#1890ff' }
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="carForm"
          style={{ marginTop: '20px' }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Car Name"
                rules={[
                  { required: true, message: 'Please enter car name' },
                  { min: 2, message: 'Car name must be at least 2 characters' }
                ]}
              >
                <Input placeholder="Enter car name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="model"
                label="Model"
                rules={[
                  { required: true, message: 'Please enter model' },
                  { min: 2, message: 'Model must be at least 2 characters' }
                ]}
              >
                <Input placeholder="Enter model" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="year"
                label="Year"
                rules={[
                  { required: true, message: 'Please enter year' },
                  { 
                    validator: (_, value) => {
                      if (value && (value < 1900 || value > new Date().getFullYear() + 1)) {
                        return Promise.reject('Please enter a valid year');
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input type="number" placeholder="Enter year" min="1900" max={new Date().getFullYear() + 1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="color"
                label="Color"
                rules={[
                  { required: true, message: 'Please enter color' },
                  { min: 3, message: 'Color must be at least 3 characters' }
                ]}
              >
                <Input placeholder="Enter color" />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: 'Please enter price' },
              { 
                validator: (_, value) => {
                  if (value && value <= 0) {
                    return Promise.reject('Price must be greater than 0');
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input type="number" placeholder="Enter price" prefix="$" min="1" />
          </Form.Item>
        </Form>
      </Modal>

      <style jsx>{`
        .table-row-light {
          background-color: #fafafa;
        }
        .table-row-dark {
          background-color: white;
        }
        .ant-table-tbody > tr:hover > td {
          background-color: #e6f7ff !important;
        }
      `}</style>
    </div>
  );
};

export default CarsList;