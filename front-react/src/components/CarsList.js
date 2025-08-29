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
  { id: 13, name: 'Kia', model: 'Sportage', year: 2023, color: 'Teal', price: 31000 },
  { id: 14, name: 'Mazda', model: 'CX-5', year: 2022, color: 'Maroon', price: 33000 },
  { id: 15, name: 'Jeep', model: 'Wrangler', year: 2023, color: 'Olive', price: 45000 },
  { id: 16, name: 'Porsche', model: '911', year: 2023, color: 'Silver', price: 120000 },
  { id: 17, name: 'Lexus', model: 'RX 350', year: 2022, color: 'Navy', price: 47000 },
  { id: 18, name: 'Volvo', model: 'XC90', year: 2023, color: 'White', price: 60000 },
  { id: 19, name: 'Jaguar', model: 'F-Pace', year: 2022, color: 'Black', price: 68000 },
  { id: 20, name: 'Land Rover', model: 'Range Rover', year: 2023, color: 'Gray', price: 95000 },
  { id: 21, name: 'Ferrari', model: '488', year: 2023, color: 'Red', price: 250000 },
  { id: 22, name: 'Lamborghini', model: 'Huracan', year: 2022, color: 'Yellow', price: 280000 },
  { id: 23, name: 'Peugeot', model: '3008', year: 2023, color: 'Blue', price: 35000 },
  { id: 24, name: 'Renault', model: 'Clio', year: 2022, color: 'Green', price: 22000 },
  { id: 25, name: 'Citroen', model: 'C5 Aircross', year: 2023, color: 'Orange', price: 34000 },
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
      car.color.toLowerCase().includes(value.toLowerCase())
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
        car.color.toLowerCase().includes(searchText.toLowerCase())
      ));
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
          car.id === editingCar.id ? { ...car, ...values } : car
        );
        setCars(updatedCars);
        setFilteredCars(updatedCars.filter(car =>
          car.name.toLowerCase().includes(searchText.toLowerCase()) ||
          car.model.toLowerCase().includes(searchText.toLowerCase()) ||
          car.color.toLowerCase().includes(searchText.toLowerCase())
        ));
        message.success('Car updated successfully');
      } else {
        // Add new car
        const newCar = {
          id: Math.max(...cars.map(c => c.id)) + 1,
          ...values
        };
        const updatedCars = [...cars, newCar];
        setCars(updatedCars);
        setFilteredCars(updatedCars.filter(car =>
          car.name.toLowerCase().includes(searchText.toLowerCase()) ||
          car.model.toLowerCase().includes(searchText.toLowerCase()) ||
          car.color.toLowerCase().includes(searchText.toLowerCase())
        ));
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
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
      sorter: (a, b) => a.model.localeCompare(b.model),
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => a.year - b.year,
      responsive: ['md'],
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      render: (color) => (
        <span style={{ 
          display: 'inline-block',
          width: '12px',
          height: '12px',
          backgroundColor: color.toLowerCase(),
          borderRadius: '50%',
          marginRight: '8px',
          border: '1px solid #d9d9d9'
        }} />
      ),
      responsive: ['lg'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price) => `$${price.toLocaleString()}`,
      responsive: ['sm'],
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
          />
          <Popconfirm
            title="Are you sure you want to delete this car?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
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
    <div style={{ padding: '24px' }}>
      <Card>
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col xs={24} sm={12}>
            <Title level={2} style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
              <CarOutlined style={{ marginRight: '12px', color: '#1890ff' }} />
              Cars Directory
            </Title>
          </Col>
          <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddNew}
              size="large"
            >
              Add New Car
            </Button>
          </Col>
        </Row>
        
        <Divider />
        
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} md={12}>
            <Search
              placeholder="Search by name, model, or color..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              onChange={(e) => {
                if (!e.target.value) {
                  handleSearch('');
                }
              }}
            />
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
          }}
          scroll={{ x: 800 }}
          size="middle"
        />
      </Card>

      <Modal
        title={editingCar ? 'Edit Car' : 'Add New Car'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          name="carForm"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Car Name"
                rules={[{ required: true, message: 'Please enter car name' }]}
              >
                <Input placeholder="Enter car name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="model"
                label="Model"
                rules={[{ required: true, message: 'Please enter model' }]}
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
                rules={[{ required: true, message: 'Please enter year' }]}
              >
                <Input type="number" placeholder="Enter year" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="color"
                label="Color"
                rules={[{ required: true, message: 'Please enter color' }]}
              >
                <Input placeholder="Enter color" />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <Input type="number" placeholder="Enter price" prefix="$" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CarsList;